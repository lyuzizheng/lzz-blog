/**
 * BRAWUKA-343 · Copy MapLibre's web worker into public/.
 *
 * MapLibre v6 computes its worker URL from the running script's URL — under
 * webpack the script is a hashed `/_next/static/chunks/*.js`, so the derived
 * `/…/maplibre-gl-worker.mjs` 404s and tile loading silently stalls forever.
 * We serve the worker (and its shared import) from `/maplibre/` and point
 * `setWorkerUrl` at it (components/motion/darkroom/photo-map-canvas.tsx).
 *
 * Runs before `dev` / `build` / `build:worker` so the files always match the
 * installed maplibre-gl version without committing derived binaries.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const distDir = path.dirname(require.resolve("maplibre-gl/package.json"));
const outDir = path.join(process.cwd(), "public", "maplibre");
mkdirSync(outDir, { recursive: true });

for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(path.join(distDir, "dist", file), path.join(outDir, file));
}
console.log("maplibre worker copied → public/maplibre/");
