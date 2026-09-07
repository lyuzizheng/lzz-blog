/**
 * BRAWUKA-38 · The Darkroom dataset & EXIF engine.
 * BRAWUKA-45 · Dataset decoupled: frames live in `content/photos.json`
 * (plain data, no TypeScript). Adding a photo = append one JSON object +
 * drop the file into `public/darkroom/`; no business-logic edits.
 *
 * Photos are described structurally (EXIF + chemistry + aspect) so every
 * plate reserves layout space before pixels arrive (Zero CLS). `src` is
 * optional: entries without a file render a deterministic duotone SVG
 * specimen plate — no binary assets required for the gallery to stand up.
 * When real captures land in `public/darkroom/` (WebP/AVIF + blur
 * placeholder), only the `src` field changes; nothing else moves.
 */
import photosData from "../content/photos.json";

export interface DarkroomExif {
  readonly camera: string;
  readonly lens: string;
  readonly focal: string;
  readonly aperture: string;
  readonly shutter: string;
  readonly iso: string;
  readonly takenAt: string;
  readonly gps?: string;
  readonly ev?: string;
}

export interface DarkroomPhoto {
  readonly id: string;
  readonly title: string;
  readonly frame: string;
  /** Optional served file, e.g. `/darkroom/sg-night.avif`. Absent → SVG plate. */
  readonly src?: string;
  readonly alt: string;
  /** Intrinsic ratio — drives `aspect-ratio` so the grid never shifts. */
  readonly width: number;
  readonly height: number;
  readonly exif: DarkroomExif;
  readonly chemistry: string;
  /** Tiny inline placeholder (SVG shimmer); swapped for blurhash when real files land. */
  readonly blurDataURL: string;
}

export type MonoMode = "true" | "riso" | "cyano" | "halftone";

export const MONO_MODES: ReadonlyArray<{
  readonly id: MonoMode;
  readonly label: string;
  readonly hint: string;
}> = [
  { id: "true", label: "TRUE FILM", hint: "真实底片色" },
  { id: "riso", label: "RISO DUO", hint: "钴蓝 × 陶土双色孔版" },
  { id: "cyano", label: "CYANOTYPE", hint: "蓝晒法" },
  { id: "halftone", label: "HALFTONE", hint: "单色网点" },
];

function shimmer(w: number, h: number, seed: number): string {
  const a = (seed * 37) % 360;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='hsl(${a},12%,16%)'/>` +
    `<stop offset='1' stop-color='hsl(${(a + 40) % 360},14%,26%)'/>` +
    `</linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

type PhotoJsonEntry = Omit<DarkroomPhoto, "blurDataURL">;
interface PhotosJsonFile {
  readonly photos: ReadonlyArray<PhotoJsonEntry>;
}
function isPhotoJsonEntry(value: unknown): value is PhotoJsonEntry {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.frame === "string" &&
    typeof v.alt === "string" &&
    typeof v.width === "number" &&
    typeof v.height === "number" &&
    typeof v.chemistry === "string" &&
    typeof v.exif === "object" &&
    v.exif !== null
  );
}
function entry(raw: PhotoJsonEntry): DarkroomPhoto {
  const seed = raw.id.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return {
    ...raw,
    blurDataURL: shimmer(24, Math.max(8, Math.round((24 * raw.height) / raw.width)), seed),
  };
}
const photoEntries = (photosData as PhotosJsonFile).photos;
if (!Array.isArray(photoEntries) || !photoEntries.every(isPhotoJsonEntry)) {
  throw new Error("[darkroom] content/photos.json is malformed: expected { photos: PhotoJsonEntry[] }");
}
export const DARKROOM_PHOTOS: ReadonlyArray<DarkroomPhoto> = photoEntries.map(entry);

/* ------------------------------------------------------------------ */
/* EXIF telemetry readout                                              */
/* ------------------------------------------------------------------ */

/** Multi-row mechanical readout for the hover probe (DESIGN.md §5.3). */
export function darkroomReadoutRows(exif: DarkroomExif): Array<readonly [string, string]> {
  const rows: Array<readonly [string, string]> = [
    ["OPTICAL APPARATUS", `${exif.camera} · ${exif.lens}`],
    ["FOCAL PLANE", exif.focal],
    ["EXPOSURE TRIANGLE", `${exif.aperture} · ${exif.shutter} · ISO ${exif.iso.replace(/^ISO\s*/i, "")}${exif.ev ? ` · ${exif.ev}` : ""}`],
    ["CAPTURED", exif.takenAt],
  ];
  if (exif.gps) rows.push(["GEODETIC", exif.gps]);
  return rows;
}
