/**
 * BRAWUKA-38 gate: validates The Darkroom contracts
 * (zero-dependency, plain node — no build required).
 *
 * Run: `node scripts/darkroom.check.mjs`
 * Checks:
 *  1. Photo manifest: 10 entries, unique ids, positive dimensions,
 *     files exist on disk, no camera-EXIF claims (exifStripped: true).
 *  2. Four mono modes registered (normal/risograph/cyanotype/halftone),
 *     no hardcoded hex inks (CSS vars only).
 *  3. Three gallery views (masonry/reel/immersive) + aspect-ratio
 *     reservation (Zero CLS).
 *  4. Lightbox: 120px drag-dismiss, Esc, arrow-key stepping via the
 *     shared keyboard hook.
 *  5. EXIF probe honesty: no invented camera/lens/exposure strings.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const manifest = read("lib/photos.ts");
const mono = read("components/motion/darkroom/mono-photo.tsx");
const gallery = read("components/motion/darkroom/gallery.tsx");
const lightbox = read("components/motion/darkroom/lightbox.tsx");
const probe = read("components/motion/darkroom/exif-probe.tsx");

// 1. Manifest integrity
const entries = [...manifest.matchAll(/id:\s*"(P-\d+)",\n\s*src:\s*"([^"]+)",\n\s*width:\s*(\d+),\n\s*height:\s*(\d+),\n\s*sizeKB:\s*(\d+)/g)];
check(entries.length >= 10, `expected >=10 photos, found ${entries.length}`);
const ids = entries.map((m) => m[1]);
check(new Set(ids).size === ids.length, "photo ids must be unique");
for (const m of entries) {
  const [, id, src, w, h] = m;
  check(Number(w) > 0 && Number(h) > 0, `${id} needs positive dimensions`);
  const disk = path.join(root, "public", src.replace(/^\//, ""));
  check(fs.existsSync(disk), `${id} file missing on disk: ${src}`);
}
check(/exifStripped:\s*true/.test(manifest), "manifest must flag exifStripped (no EXIF claims)");

// 2. Mono modes + token-only inks
for (const m of ["normal", "risograph", "cyanotype", "halftone"]) {
  check(mono.includes(`"${m}"`), `mono-photo must register mode ${m}`);
}
const hexLiterals = mono.match(/#[0-9a-fA-F]{3,8}/g) ?? [];
check(hexLiterals.length === 0, `mono-photo must not hardcode hex inks (found ${hexLiterals.join(",")})`);
check(mono.includes("var(--ink-dominant)"), "mono plates must derive from --ink-dominant");

// 3. Views + CLS reservation
for (const v of ["masonry", "reel", "immersive"]) {
  check(gallery.includes(`"${v}"`), `gallery must implement view ${v}`);
}
check(gallery.includes("aspectRatio"), "gallery frames must reserve aspect ratio (Zero CLS)");
check(gallery.includes("break-inside-avoid"), "masonry cards must not break across columns");

// 4. Lightbox physics + keys
check(/DISMISS_PX\s*=\s*120/.test(lightbox), "lightbox drag-dismiss threshold must be 120px");
check(lightbox.includes("Escape"), "lightbox must close on Esc");
check(lightbox.includes("useFlightKeyboard"), "lightbox must reuse the shared keyboard hook");
check(/MAX_SCALE\s*=\s*3/.test(lightbox), "lightbox zoom must cap at 3x");

// 5. Probe honesty — forbid invented camera metadata vocabulary
const probeLower = probe.toLowerCase();
for (const invented of ["sony", "canon", "nikon", "f/1.4", "1/250", "iso 100", "35mm"]) {
  check(!probeLower.includes(invented), `probe must not invent camera data (${invented})`);
}
check(probe.includes("已剥离"), "probe must disclose stripped EXIF");

if (failures.length > 0) {
  console.error(`DARKROOM CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `darkroom OK: ${entries.length} photos on disk, 4 mono modes (token inks), 3 views, 120px dismiss, honest probe.`,
);
