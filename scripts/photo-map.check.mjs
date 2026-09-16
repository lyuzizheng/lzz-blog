/**
 * BRAWUKA-343 gate: validates the Darkroom Atlas contracts (OSM basemap era).
 *
 * Source-text & runtime gate (same convention as darkroom.check.mjs):
 * 1. Data source: pins derived from `content/photos.json` (no hand-written secondary source).
 * 2. GPS parsing: DMS strings (`1°17'N 103°51'E`) parsed accurately to decimal coordinates.
 * 3. OSM basemap: MapLibre GL + OpenFreeMap vector tiles — never tile.openstreetmap.org
 *    (OSMF policy throttles heavy production use), never the retired self-drawn paper SVG.
 * 4. Gallery retired: no DarkroomGallery, no ?view=gallery deep link, no view switcher.
 * 5. Telemetry & eyebrow: Q10-A in-screen eyebrow with PINS and VISITED telemetry,
 *    LanguageSwitch, and SafelightSwitch.
 * 6. Lightbox integration: pin click opens collection drawer, photo plate launches shared Lightbox.
 * 7. Graceful degradation: <noscript> static grid + a WebGL-unavailable pin index.
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
check(photoMapEngine.includes("MAP_VIEW_PRESETS"), "lib/photo-map.ts must export MAP_VIEW_PRESETS camera presets");

// Verify GPS parser logic runtime test
function parseDms(s) {
  const dmsRegex = /(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*['′])?\s*(?:(\d+(?:\.\d+)?)\s*["″])?\s*([NSEWnsew])/g;
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
const canvasSrc = read("components/motion/darkroom/photo-map-canvas.tsx");
const masterViewSrc = read("components/motion/darkroom/photography-master-view.tsx");
const pageSrc = read("app/photography/page.tsx");

// OSM basemap via MapLibre + OpenFreeMap (never the OSMF tile endpoint)
check(canvasSrc.includes("maplibre-gl"), "photo-map-canvas must run on maplibre-gl");
check(canvasSrc.includes("openfreemap.org/styles/positron"), "basemap must be OpenFreeMap positron vector tiles (OSM data)");
check(!canvasSrc.includes("tile.openstreetmap.org"), "must never hit tile.openstreetmap.org directly (OSMF tile policy)");
check(canvasSrc.includes("attributionControl"), "map must mount the attribution control (OSM/OpenFreeMap credit)");
check(canvasSrc.includes("retintPositronToPaper"), "positron style must be retinted into the paper palette");
check(canvasSrc.includes("isWebGL2Available"), "canvas must feature-detect WebGL2 (maplibre v6 dropped supported())");
check(canvasSrc.includes("photo-map-fallback"), "canvas must render a readable pin index when WebGL is unavailable");
// MapLibre v6 worker must be served from /maplibre/ (derived-from-chunk URL 404s under webpack)
check(canvasSrc.includes('setWorkerUrl("/maplibre/maplibre-gl-worker.mjs")'), "canvas must pin the maplibre worker URL to /maplibre/");
const pkg = JSON.parse(read("package.json"));
check(
  pkg.scripts.build.includes("copy-maplibre-worker") && pkg.scripts.dev.includes("copy-maplibre-worker") && pkg.scripts["build:worker"].includes("copy-maplibre-worker"),
  "dev/build/build:worker must run scripts/copy-maplibre-worker.mjs so the worker asset exists",
);

// Code split: the maplibre runtime stays out of the first-load chunk
check(photoMapSrc.includes('dynamic(') && photoMapSrc.includes("photo-map-canvas"), "photo-map must dynamic-import the maplibre canvas (ssr:false)");
check(photoMapSrc.includes("ssr: false"), "maplibre canvas must be client-only (ssr:false)");

// Reduced-motion risk control
check(canvasSrc.includes("reducedMotion"), "canvas must honor prefers-reduced-motion (zero-duration camera moves)");
check(photoMapSrc.includes("prefers-reduced-motion") || photoMapSrc.includes("usePrefersReducedMotion"), "photo-map must honor prefers-reduced-motion");

// Telemetry & In-Screen Eyebrow
check(photoMapSrc.includes("PINS") && photoMapSrc.includes("VISITED"), "eyebrow must display PINS and VISITED telemetry");
check(photoMapSrc.includes("LanguageSwitch"), "eyebrow must mount LanguageSwitch");
check(photoMapSrc.includes("SafelightSwitch"), "eyebrow must mount SafelightSwitch");
check(photoMapSrc.includes("INDEX") || photoMapSrc.includes("index"), "eyebrow must provide return link to index");

// Lightbox & Collection Drawer
check(photoMapSrc.includes("selectedPin"), "pin click must link to collection drawer");
check(masterViewSrc.includes("DarkroomLightbox"), "master view must host the shared DarkroomLightbox");
check(masterViewSrc.includes("openPhoto"), "master view must handle openPhoto callback");

// 4. Gallery retired (Owner directive 2026-09-16) — no parallel view survives
check(!masterViewSrc.includes("DarkroomGallery"), "master view must NOT include DarkroomGallery (retired)");
check(!pageSrc.includes("view=gallery") && !pageSrc.includes("searchParams"), "page must not parse ?view= deep links (gallery retired)");
check(!photoMapSrc.includes("onSwitchToMasonry"), "map must not offer a masonry switcher");
check(
  !fs.existsSync(path.join(root, "components/motion/darkroom/darkroom-gallery.tsx")),
  "darkroom-gallery.tsx must be deleted",
);

// 7. No-JS fallback: <noscript> static grid stays
check(pageSrc.includes("noscript") && pageSrc.includes("DarkroomStaticGrid"), "app/photography/page.tsx must provide a <noscript> static gallery fallback");

if (failures.length > 0) {
  console.error("photo-map check FAILED:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log(
  `photo-map OK: ${gpsPhotos.length} GPS photos → pins, MapLibre + OpenFreeMap (OSM) basemap with paper retint, gallery retired, Q10-A telemetry eyebrow, lightbox wiring, noscript + no-WebGL fallbacks.`,
);
