/**
 * BRAWUKA-65 · Photo Map & GPS Data Engine
 *
 * Derives map pins and regional collections strictly from `content/photos.json` (via DARKROOM_PHOTOS).
 * Supports DMS (`1°17'N 103°51'E`), DMS with seconds (`1°17'30"N 103°51'15"E`), and decimal coordinates.
 * No external hand-written pin datasets permitted (Q8 / Phase 2-4 invariant).
 */

import { DARKROOM_PHOTOS, type DarkroomPhoto } from "./darkroom";

export interface GeoCoordinates {
  readonly lat: number;
  readonly lng: number;
}

export interface PhotoMapPin {
  readonly id: string;
  readonly title: string;
  readonly locationName: string;
  readonly coordinates: GeoCoordinates;
  readonly gpsRaw: string;
  readonly takenAt: string;
  readonly photos: ReadonlyArray<DarkroomPhoto>;
  readonly primaryPhoto: DarkroomPhoto;
}

/**
 * Parse DMS or decimal GPS string into `{ lat, lng }`.
 * Handles:
 * - DMS: `1°17'N 103°51'E`
 * - DMS with seconds: `1°17'30"N 103°51'15"E`
 * - Decimal: `1.2833, 103.85` or `1.2833°N 103.85°E`
 * - Hemispheres: N/S for latitude, E/W for longitude
 */
function parseGpsCoordinates(gpsStr?: string | null): GeoCoordinates | null {
  if (!gpsStr || typeof gpsStr !== "string") return null;
  const s = gpsStr.trim();

  // Comma-separated decimal degrees: e.g. "1.2833, 103.85"
  const decMatch = s.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (decMatch) {
    const lat = parseFloat(decMatch[1]);
    const lng = parseFloat(decMatch[2]);
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return { lat, lng };
    }
  }

  // DMS format: degree° [minute'] [second"] [NSEW]
  const dmsRegex = /(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*['\u2032])?\s*(?:(\d+(?:\.\d+)?)\s*["\u2033])?\s*([NSEWnsew])/g;
  const matches: Array<{ deg: number; min: number; sec: number; dir: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = dmsRegex.exec(s)) !== null) {
    matches.push({
      deg: parseFloat(m[1]),
      min: m[2] ? parseFloat(m[2]) : 0,
      sec: m[3] ? parseFloat(m[3]) : 0,
      dir: m[4].toUpperCase(),
    });
  }

  if (matches.length >= 2) {
    let lat: number | null = null;
    let lng: number | null = null;
    for (const match of matches) {
      const val = match.deg + match.min / 60 + match.sec / 3600;
      if (match.dir === "N") lat = val;
      else if (match.dir === "S") lat = -val;
      else if (match.dir === "E") lng = val;
      else if (match.dir === "W") lng = -val;
    }
    if (lat !== null && lng !== null) {
      return { lat, lng };
    }
  }

  return null;
}

/**
 * Format decimal coordinates into archival telemetry: `1°17'N · 103°51'E`.
 */
export function formatGpsCoordinates(coords: GeoCoordinates): string {
  const latDir = coords.lat >= 0 ? "N" : "S";
  const lngDir = coords.lng >= 0 ? "E" : "W";
  const absLat = Math.abs(coords.lat);
  const absLng = Math.abs(coords.lng);

  const latDeg = Math.floor(absLat);
  const latMin = Math.round((absLat - latDeg) * 60);

  const lngDeg = Math.floor(absLng);
  const lngMin = Math.round((absLng - lngDeg) * 60);

  return `${latDeg}°${latMin.toString().padStart(2, "0")}'${latDir} · ${lngDeg}°${lngMin.toString().padStart(2, "0")}'${lngDir}`;
}

/**
 * Friendly geodetic place names derived from coordinate clusters.
 */
function deriveLocationName(title: string, _gpsRaw: string, coords: GeoCoordinates): string {
  // Singapore bounds: ~1.15°N - 1.48°N, 103.6°E - 104.05°E
  if (coords.lat >= 1.15 && coords.lat <= 1.48 && coords.lng >= 103.55 && coords.lng <= 104.1) {
    if (coords.lng <= 103.75) return "Singapore · Nanyang / Jurong";
    if (coords.lat <= 1.26) return "Singapore · Southern Coast & Keppel";
    if (coords.lat >= 1.35) return "Singapore · North Reserve";
    if (title.includes("蓝调") || title.includes("Merlion")) return "Singapore · Marina Bay";
    if (title.includes("战役") || title.includes("war-room")) return "Singapore · CBD / Raffles Quay";
    if (title.includes("夜市")) return "Singapore · Chinatown Quarter";
    if (title.includes("静物") || title.includes("印社")) return "Singapore · Bras Basah Atelier";
    return "Singapore · Maritime Core";
  }

  // Xinjiang bounds: ~35°N - 49°N, 73°E - 96°E
  if (coords.lat >= 35 && coords.lat <= 50 && coords.lng >= 73 && coords.lng <= 96) {
    if (coords.lat >= 46) return "Xinjiang · Altay Mountains";
    if (coords.lat >= 43 && coords.lng <= 85) return "Xinjiang · Sayram Lake";
    return "Xinjiang · Silk Road Basin";
  }

  // Fallback to title segment or raw GPS
  return title.replace(/^[A-Z0-9-]+\s*·\s*/i, "");
}

/**
 * Derive grouped pins from DARKROOM_PHOTOS.
 */
export function derivePhotoMapPins(photos: ReadonlyArray<DarkroomPhoto>): ReadonlyArray<PhotoMapPin> {
  const pins: PhotoMapPin[] = [];

  for (const photo of photos) {
    const coords = parseGpsCoordinates(photo.exif.gps);
    if (!coords) continue;

    // Cluster threshold ~0.005° (~500m)
    const existing = pins.find(
      (p) =>
        Math.abs(p.coordinates.lat - coords.lat) < 0.005 &&
        Math.abs(p.coordinates.lng - coords.lng) < 0.005,
    );

    if (existing) {
      (existing.photos as DarkroomPhoto[]).push(photo);
    } else {
      pins.push({
        id: `pin-${photo.id}`,
        title: photo.title,
        locationName: deriveLocationName(photo.title, photo.exif.gps ?? "", coords),
        coordinates: coords,
        gpsRaw: photo.exif.gps ?? "",
        takenAt: photo.exif.takenAt,
        photos: [photo],
        primaryPhoto: photo,
      });
    }
  }

  return pins;
}

export const PHOTO_MAP_PINS: ReadonlyArray<PhotoMapPin> = derivePhotoMapPins(DARKROOM_PHOTOS);

/**
 * Web Mercator projection (normalized 0..1 coordinates).
 */
export function projectMercator(coords: GeoCoordinates): { nx: number; ny: number } {
  const nx = (coords.lng + 180) / 360;
  const latRad = Math.max(Math.min(coords.lat, 85.051129), -85.051129) * (Math.PI / 180);
  const ny = (1 - Math.log(Math.tan(Math.PI / 4 + latRad / 2)) / Math.PI) / 2;
  return { nx, ny };
}

/**
 * Inverse Web Mercator projection.
 */
export function unprojectMercator(nx: number, ny: number): GeoCoordinates {
  const lng = nx * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * ny)));
  const lat = (latRad * 180) / Math.PI;
  return { lat, lng };
}
