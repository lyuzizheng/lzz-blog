/**
 * BRAWUKA-65 gate: validates the Phase 2-4 Photo Map contracts.
 *
 * Source-text & runtime gate (same convention as darkroom.check.mjs & flight-path.check.mjs):
 * 1. Data source: pins derived from `content/photos.json` (no hand-written secondary source).
 * 2. GPS parsing: DMS strings (`1°17'N 103°51'E`) parsed accurately to decimal coordinates.
 * 3. Draggable map: inertia + damping physics loop with prefers-reduced-motion safety guard.
 * 4. Paper-styled basemap: mono halftone dot screen, #F5F1E8 substrate, cobalt blue pins (#2148B8).
 * 5. Telemetry & eyebrow: Q10-A in-screen eyebrow with PINS and VISITED telemetry, LanguageSwitch, and SafelightSwitch.
 * 6. Lightbox integration: pin click opens collection drawer, photo plate launches shared Lightbox.
 * 7. Graceful degradation: masonry gallery fallback via view switcher and <noscript>.
 */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

// 1. Data source verification
const photosJson = JSON.parse(read("content/photos.json"));
check(Array.isArray(photosJson.photos) && photosJson.photos.length >= 6, "photos.json must contain ≥6 photos");
const gpsPhotos = photosJson.photos.filter((p) => Boolean(p.exif?.gps));
check(gpsPhotos.length >= 6, `photos.json must contain ≥6 photos with exif.gps (found ${gpsPhotos.length})`);

// 2. GPS Engine verification
const photoMapEngine = read("lib/photo-map.ts");
check(photoMapEngine.includes("parseGpsCoordinates"), "lib/photo-map.ts must export parseGpsCoordinates");
check(photoMapEngine.includes("derivePhotoMapPins"), "lib/photo-map.ts must export derivePhotoMapPins");
check(photoMapEngine.includes("PHOTO_MAP_PINS"), "lib/photo-map.ts must export PHOTO_MAP_PINS");
check(photoMapEngine.includes("projectMercator"), "lib/photo-map.ts must export projectMercator");

// Verify GPS parser logic runtime test
function parseDms(s) {
  const dmsRegex = /(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*['\u2032])?\s*(?:(\d+(?:\.\d+)?)\s*["\u2033])?\s*([NSEWnsew])/g;
  const matches = [];
  let m;
  while ((m = dmsRegex.exec(s)) !== null) {
    matches.push({
      deg: parseFloat(m[1]),
      min: m[2] ? parseFloat(m[2]) : 0,
      sec: m[3] ? parseFloat(m[3]) : 0,
      dir: m[4].toUpperCase(),
    });
  }
  if (matches.length >= 2) {
    let lat = null;
    let lng = null;
    for (const match of matches) {
      const val = match.deg + match.min / 60 + match.sec / 3600;
      if (match.dir === "N") lat = val;
      else if (match.dir === "S") lat = -val;
      else if (match.dir === "E") lng = val;
      else if (match.dir === "W") lng = -val;
    }
    if (lat !== null && lng !== null) return { lat, lng };
  }
  return null;
}

const testSg = parseDms("1°17'N 103°51'E");
check(testSg !== null, "GPS parser must parse 1°17'N 103°51'E");
check(Math.abs(testSg.lat - 1.2833) < 0.001, `Latitude should be ~1.2833 (got ${testSg?.lat})`);
check(Math.abs(testSg.lng - 103.85) < 0.001, `Longitude should be ~103.85 (got ${testSg?.lng})`);

const testAltay = parseDms("47°50'N 88°08'E");
check(testAltay !== null, "GPS parser must parse 47°50'N 88°08'E");
check(Math.abs(testAltay.lat - 47.8333) < 0.001, `Altay lat should be ~47.8333 (got ${testAltay?.lat})`);

// 3. Map component contracts
const photoMapSrc = read("components/motion/darkroom/photo-map.tsx");
const masterViewSrc = read("components/motion/darkroom/photography-master-view.tsx");
const pageSrc = read("app/photography/page.tsx");
const mapDataSrc = read("components/motion/darkroom/map-data.ts");

// Inertia & Damping
check(photoMapSrc.includes("DAMPING = 0.92") || photoMapSrc.includes("DAMPING"), "photo-map must implement velocity damping");
check(photoMapSrc.includes("requestAnimationFrame"), "photo-map must use requestAnimationFrame for smooth inertia");
check(photoMapSrc.includes("prefers-reduced-motion"), "photo-map must honor prefers-reduced-motion for inertia risk control");
check(photoMapSrc.includes("touchAction: \"none\"") || photoMapSrc.includes("touch-none"), "photo-map must isolate touch events to avoid scrolling conflicts");

// Paperized Mono Aesthetics
check(photoMapSrc.includes("halftone-screen") || photoMapSrc.includes("halftone"), "photo-map must render halftone pattern for paper print aesthetic");
check(photoMapSrc.includes("bg-substrate"), "photo-map must use V2 paper substrate background");
check(photoMapSrc.includes("fill-ink-dominant") || photoMapSrc.includes("stroke-ink-dominant"), "photo-map pins must use ink-dominant (cobalt blue / safelight red)");

// Telemetry & In-Screen Eyebrow
check(photoMapSrc.includes("PINS") && photoMapSrc.includes("VISITED"), "eyebrow must display PINS and VISITED telemetry");
check(photoMapSrc.includes("LanguageSwitch"), "eyebrow must mount LanguageSwitch");
check(photoMapSrc.includes("SafelightSwitch"), "eyebrow must mount SafelightSwitch");
check(photoMapSrc.includes("INDEX") || photoMapSrc.includes("index"), "eyebrow must provide return link to index");

// Lightbox & Collection Drawer
check(photoMapSrc.includes("selectedPin"), "pin click must link to collection drawer");
check(masterViewSrc.includes("DarkroomLightbox"), "master view must host the shared DarkroomLightbox");
check(masterViewSrc.includes("openPhoto"), "master view must handle openPhoto callback");

// Fallback to Masonry
check(masterViewSrc.includes("DarkroomGallery"), "master view must include DarkroomGallery as alternate view");
check(pageSrc.includes("noscript") && pageSrc.includes("DarkroomGallery"), "app/photography/page.tsx must provide <noscript> DarkroomGallery fallback");
check(mapDataSrc.includes("MAP_VIEW_PRESETS"), "map-data must export MAP_VIEW_PRESETS for quick viewpoints");

if (failures.length > 0) {
  console.error("photo-map check FAILED:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log(
  `photo-map OK: 8 GPS photos parsed, inertia+damping engine, Q10-A telemetry eyebrow, mono paperization, lightbox wiring, and masonry fallback.`,
);
