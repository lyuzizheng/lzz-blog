/**
 * BRAWUKA-38 gate: validates the Darkroom gallery contracts.
 *
 * Source-text gate (same convention as flight-path.check.mjs): pins the
 * acceptance criteria — 3 view modes, EXIF probe, mono-color ink modes,
 * drag-to-dismiss threshold, keyboard contract, Zero-CLS aspect ratios,
 * reduced-motion fallbacks — without spinning up a browser.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const data = read("lib/darkroom.ts");
const probe = read("components/motion/darkroom/exif-probe.tsx");
const plate = read("components/motion/darkroom/photo-plate.tsx");
const gallery = read("components/motion/darkroom/darkroom-gallery.tsx");
const lightbox = read("components/motion/darkroom/darkroom-lightbox.tsx");
const page = read("app/photography/page.tsx");
const chrome = read("components/site/site-header.tsx");

// 1. Dataset: structured EXIF on every photo, ≥6 frames, fixed aspects.
// BRAWUKA-45: frames live in content/photos.json (no TS edits to publish);
// lib/darkroom.ts hydrates them with derived blur placeholders.
const photosJson = JSON.parse(read("content/photos.json"));
const photoCount = Array.isArray(photosJson.photos) ? photosJson.photos.length : 0;
check(photoCount >= 6, `dataset must hold ≥6 photos (got ${photoCount})`);
check(data.includes("../content/photos.json"), "lib/darkroom.ts must hydrate from content/photos.json");
for (const photo of photosJson.photos ?? []) {
  for (const field of ["id", "title", "frame", "alt", "width", "height", "chemistry", "exif"]) {
    check(photo[field] !== undefined, `photo ${photo.id ?? "?"} must carry ${field}`);
  }
  for (const field of ["camera", "lens", "focal", "aperture", "shutter", "iso", "takenAt"]) {
    check(photo.exif?.[field] !== undefined, `photo ${photo.id ?? "?"} exif must carry ${field}`);
  }
}
for (const field of ["camera", "lens", "focal", "aperture", "shutter", "iso", "takenAt"]) {
  check(data.includes(field), `DarkroomExif must carry ${field}`);
}
check(data.includes("aspectRatio") || data.includes("width"), "dataset must carry intrinsic dimensions for Zero CLS");

// 2. EXIF engine: format + fault-tolerant parse (never blocking)
check(data.includes("formatDarkroomTelemetry"), "must export formatDarkroomTelemetry");
check(data.includes("parseExifString"), "must export parseExifString for pasted telemetry");
check(data.includes("unknown"), "parser must preserve unclassified segments in `unknown` instead of dropping them");

// 3. Three layout scrolls
for (const view of ["masonry", "reel", "immersive"]) {
  check(gallery.includes(`"${view}"`), `gallery must implement the ${view} view`);
}
check(gallery.includes("columns-"), "masonry must use CSS columns (no JS measuring → Zero CLS)");
check(gallery.includes("data-lenis-prevent"), "reel strip must opt out of global Lenis");
for (const mode of ["riso", "cyano", "halftone"]) {
  check(data.includes(`"${mode}"`), `mono mode "${mode}" must exist in lib/darkroom.ts`);
}
check(gallery.includes("MONO_MODES"), "gallery ink switch must render from MONO_MODES");
check(probe.includes("tabular-nums"), "probe digits must use tabular-nums");
check(probe.includes("CHEMISTRY"), "probe must show darkroom chemistry row");
check(plate.includes("ExifProbe"), "plate must mount the EXIF probe");
check(/onMouseEnter|onFocus/.test(plate) && plate.includes("onTouchStart"), "probe must summon on hover, focus AND touch long-press");

check(plate.includes("mix-blend-multiply") || plate.includes("multiply"), "riso/halftone must overprint ink via multiply blend");
check(plate.includes("halftone-screen"), "mono modes must lay halftone dot matrices");
check(/var\(--ink-dominant\)/.test(plate), "ink layers must derive from theme vars (day/night adaptive)");

// 6. Lightbox physics: 120px dismiss, zoom bounds, keyboard
check(/LIGHTBOX_DISMISS_PX\s*=\s*120/.test(lightbox), "drag-to-dismiss threshold must be 120px");
check(lightbox.includes('"Escape"'), "lightbox must close on ESC");
check(lightbox.includes('"ArrowRight"') && lightbox.includes('"ArrowLeft"'), "lightbox must step on Arrow keys");
check(lightbox.includes("Math.min(4") && lightbox.includes("Math.max(1"), "zoom must clamp to 1–4x");
check(lightbox.includes("e.touches.length !== 2") || lightbox.includes("touches"), "lightbox must handle two-finger pinch");
check(lightbox.includes("overflow") && lightbox.includes("hidden"), "lightbox must scroll-lock the page");

// 7. Reduced-motion + a11y
for (const [name, src] of [["gallery", gallery], ["lightbox", lightbox]]) {
  check(src.includes("prefers-reduced-motion"), `${name} must honor prefers-reduced-motion`);
}
check(lightbox.includes('role="dialog"') && lightbox.includes('aria-modal="true"'), "lightbox must be an accessible modal dialog");
check(plate.includes('role="button"') && plate.includes("tabIndex"), "plates must be keyboard-operable");

// 8. Route + nav wiring
check(page.includes("DarkroomGallery"), "app/photography must render the gallery");
check(chrome.includes("/photography"), "site header must link to /photography");

if (failures.length > 0) {
  console.error("darkroom check FAILED:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `darkroom OK: ${photoCount} framed photos, 3 views, 4 ink modes, EXIF probe + parser, 120px dismiss lightbox, a11y + reduced-motion.`,
);
