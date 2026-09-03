/**
 * BRAWUKA-38 · The Darkroom dataset & EXIF engine.
 *
 * Photos are described structurally (EXIF + chemistry + aspect) so every
 * plate reserves layout space before pixels arrive (Zero CLS). `src` is
 * optional: entries without a file render a deterministic duotone SVG
 * specimen plate — no binary assets required for the gallery to stand up.
 * When real captures land in `public/darkroom/` (WebP/AVIF + blur
 * placeholder), only the `src` field changes; nothing else moves.
 */

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

function entry(
  id: string,
  title: string,
  frame: string,
  alt: string,
  width: number,
  height: number,
  exif: DarkroomExif,
  chemistry: string,
  src?: string,
): DarkroomPhoto {
  const seed = id.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return { id, title, frame, alt, width, height, exif, chemistry, src, blurDataURL: shimmer(24, Math.max(8, Math.round((24 * height) / width)), seed) };
}

export const DARKROOM_PHOTOS: ReadonlyArray<DarkroomPhoto> = [
  entry("sg-merlion-blue", "狮城蓝调时刻", "FRAME 01", "Singapore skyline at blue hour, duotone specimen", 4, 3,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 35mm F1.4 GM", focal: "35mm", aperture: "f/1.4", shutter: "1/250s", iso: "ISO 100", ev: "EV 8.9", takenAt: "2026.08.14 19:42 +08:00", gps: "1°17'N 103°51'E" },
    "ILFORD WARMTONE FB · Multigrade 1+9 · 20.5°C"),
  entry("ntu-dawn-chem", "南洋破晓药水", "FRAME 07", "Campus lake at dawn, long exposure specimen", 3, 4,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 24-70mm F2.8 GM II", focal: "24mm", aperture: "f/8.0", shutter: "1/15s", iso: "ISO 100", takenAt: "2026.05.02 06:18 +08:00", gps: "1°20'N 103°40'E" },
    "KODAK D-76 · 1+1 · 20.0°C"),
  entry("tiktok-war-room", "战役暗房一角", "FRAME 12", "Engineering war-room interior, available light specimen", 16, 9,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 35mm F1.4 GM", focal: "35mm", aperture: "f/2.0", shutter: "1/125s", iso: "ISO 800", takenAt: "2026.07.30 22:05 +08:00" },
    "ILFORD HP5+ · HC-110 Dil.B · 21.0°C"),
  entry("reel-coast-grain", "海岸颗粒卷", "FRAME 18", "Coastline with film grain, telephoto specimen", 3, 2,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 70-200mm F2.8 GM II", focal: "135mm", aperture: "f/4.0", shutter: "1/500s", iso: "ISO 200", takenAt: "2026.06.21 17:56 +08:00", gps: "1°15'N 103°49'E" },
    "FUJI ACROS 100 · Rodinal 1+50 · 20.0°C"),
  entry("night-market-neon", "夜市安全灯", "FRAME 24", "Night market stalls under tungsten light specimen", 4, 5,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 50mm F1.2 GM", focal: "50mm", aperture: "f/1.2", shutter: "1/320s", iso: "ISO 1600", takenAt: "2026.09.01 21:12 +08:00" },
    "CINESTILL 800T · C-41 · 38.0°C"),
  entry("atelier-still-life", "印社静物台", "FRAME 31", "Print atelier still life, top-down specimen", 1, 1,
    { camera: "Sony A7M4 · ILCE-7M4", lens: "FE 35mm F1.4 GM", focal: "35mm", aperture: "f/5.6", shutter: "1/60s", iso: "ISO 100", takenAt: "2026.08.02 10:24 +08:00" },
    "ILFORD MGIV FB · Multigrade 1+14 · 20.5°C"),
];

/* ------------------------------------------------------------------ */
/* EXIF telemetry: format + fault-tolerant parse                       */
/* ------------------------------------------------------------------ */

/** Canonical one-line telemetry, e.g. `Sony A7M4 · FE 35mm F1.4 GM · f/1.4 · 1/250s · ISO 100`. */
export function formatDarkroomTelemetry(exif: DarkroomExif): string {
  return `${exif.camera} · ${exif.lens} · ${exif.aperture} · ${exif.shutter} · ISO ${exif.iso.replace(/^ISO\s*/i, "")}`;
}

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

export interface ParsedExif {
  readonly camera?: string;
  readonly lens?: string;
  readonly focal?: string;
  readonly aperture?: string;
  readonly shutter?: string;
  readonly iso?: string;
  readonly takenAt?: string;
  readonly gps?: string;
  /** Segments the parser could not classify — never dropped, never blocking. */
  readonly unknown: ReadonlyArray<string>;
}

const APERTURE_RE = /^f\/\d+(\.\d+)?$/i;
const SHUTTER_RE = /^1\/\d+s$|^\d+(\.\d+)?s$/i;
const ISO_RE = /^iso\s*\d+$/i;
const FOCAL_RE = /^\d+mm$/i;
const LENS_HINT_RE = /(GM|FE|RF|EF|mm\s+F\d|F\d\.\d)/i;
const GPS_RE = /[°'″NSnsEeWw].*[°'″NSnsEeWw]|^\d+\.\d+,\s*-?\d+\.\d+$/;
const DATE_RE = /^\d{4}[.\-/]\d{2}[.\-/]\d{2}/;

/**
 * Parse a pasted telemetry line (`A · B · C …`) into structured EXIF.
 * Classification is best-effort: unrecognized segments land in `unknown`
 * so parsing is accurate where possible and never blocks the UI.
 */
export function parseExifString(input: string): ParsedExif {
  const unknown: string[] = [];
  const out: Record<string, string> = {};
  for (const raw of input.split(/[·|]/)) {
    const seg = raw.trim();
    if (!seg) continue;
    if (APERTURE_RE.test(seg)) out.aperture ??= seg.toLowerCase().startsWith("f") ? seg : seg;
    else if (SHUTTER_RE.test(seg)) out.shutter ??= seg;
    else if (ISO_RE.test(seg)) out.iso ??= seg.replace(/^iso\s*/i, "");
    else if (FOCAL_RE.test(seg) && !LENS_HINT_RE.test(seg)) out.focal ??= seg;
    else if (DATE_RE.test(seg)) out.takenAt ??= seg;
    else if (GPS_RE.test(seg)) out.gps ??= seg;
    else if (LENS_HINT_RE.test(seg)) out.lens ??= seg;
    else if (!out.camera) out.camera ??= seg;
    else unknown.push(seg);
  }
  return { ...out, unknown };
}
