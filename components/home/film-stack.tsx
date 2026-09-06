"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-83 · FilmStack — the darkroom workbench, top layer.
 *
 * The four chapter negatives (Blogs / Career / Photography / Projects) lie
 * permanently scattered on the light table in organic poses — nothing is
 * stacked away, every frame is a live link. Beneath them a pile of blank,
 * blurred negatives gives the bench its depth.
 *
 * - Zero layout JS: percentage poses + CSS individual transform properties;
 *   hover/focus straighten + lift + exposure flash are pure CSS transitions.
 * - Idle breathing drift via `film-idle` keyframes (inner wrapper, composited).
 * - Keyboard: digits 1–4 jump straight to a chapter; all frames are real
 *   links with visible focus rings.
 * - prefers-reduced-motion: global CSS flattens idle drift + transitions.
 */

type FilmKey = "blogs" | "career" | "photography" | "projects";
type EmblemKind = "lines" | "flight" | "aperture" | "bento";

interface FilmSpec {
  key: FilmKey;
  href: string;
  frameNo: string;
  stock: string;
  emblem: EmblemKind;
  /** Irregular resting pose: percentage offsets + rotation, mobile / desktop. */
  pose: string;
}

const FILMS: ReadonlyArray<FilmSpec> = [
  {
    key: "blogs",
    href: "/posts",
    frameNo: "▶ 01A",
    stock: "KODAK 400TX",
    emblem: "lines",
    pose: "left-[1%] top-[2%] -rotate-[6deg] sm:left-[2%] sm:top-[8%] sm:-rotate-[7deg]",
  },
  {
    key: "photography",
    href: "/photography",
    frameNo: "▶ 03A",
    stock: "PORTRA 400",
    emblem: "aperture",
    pose: "left-[55%] top-[8%] rotate-[5deg] sm:left-[52%] sm:top-[2%] sm:-rotate-[3deg]",
  },
  {
    key: "career",
    href: "/resume",
    frameNo: "▶ 02A",
    stock: "ILFORD HP5+",
    emblem: "flight",
    pose: "left-[5%] top-[50%] rotate-[3deg] sm:left-[27%] sm:top-[40%] sm:rotate-[4deg]",
  },
  {
    key: "projects",
    href: "/products",
    frameNo: "▶ 04A",
    stock: "FUJI C200",
    emblem: "bento",
    pose: "left-[57%] top-[56%] -rotate-[8deg] sm:left-[76%] sm:top-[32%] sm:rotate-[8deg]",
  },
];

/** Blank blurred negatives forming the pile beneath the chapter frames. */
const PILE: ReadonlyArray<{ className: string; idle?: string }> = [
  { className: "left-[6%] top-[26%] w-[30%] -rotate-[9deg] opacity-45" },
  { className: "left-[24%] top-[14%] w-[34%] rotate-[2deg] opacity-40", idle: "8.8s" },
  { className: "left-[46%] top-[30%] w-[28%] rotate-[11deg] opacity-45" },
  { className: "left-[64%] top-[16%] w-[32%] -rotate-[4deg] opacity-40", idle: "11.3s" },
  { className: "left-[12%] top-[54%] w-[36%] rotate-[6deg] opacity-35" },
  { className: "left-[42%] top-[58%] w-[30%] -rotate-[12deg] opacity-40", idle: "12.6s" },
  { className: "left-[66%] top-[52%] w-[26%] rotate-[1deg] opacity-35" },
];

const INK = "var(--ink-dominant)";

/** Single-ink cobalt emblems — one per chapter, drawn like a negative's image. */
function FilmEmblem({ kind }: { kind: EmblemKind }) {
  if (kind === "lines") {
    return (
      <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x={14} y={14} width={52} height={7} style={{ fill: INK }} opacity={0.9} />
        <rect x={14} y={32} width={92} height={2.5} style={{ fill: INK }} opacity={0.45} />
        <rect x={14} y={40} width={84} height={2.5} style={{ fill: INK }} opacity={0.45} />
        <rect x={14} y={48} width={88} height={2.5} style={{ fill: INK }} opacity={0.45} />
        <rect x={14} y={62} width={24} height={2} style={{ fill: INK }} opacity={0.7} />
      </svg>
    );
  }
  if (kind === "flight") {
    return (
      <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M12 62 C 40 58, 55 44, 72 34 S 100 18, 110 14"
          fill="none"
          style={{ stroke: INK }}
          strokeWidth={1.5}
          opacity={0.85}
        />
        <line x1={10} y1={68} x2={112} y2={68} style={{ stroke: INK }} strokeWidth={0.75} strokeDasharray="3 3" opacity={0.4} />
        {[
          [12, 62],
          [48, 48],
          [72, 34],
          [110, 14],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.5} style={{ fill: INK }} />
        ))}
      </svg>
    );
  }
  if (kind === "aperture") {
    return (
      <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx={60} cy={40} r={17} fill="none" style={{ stroke: INK }} strokeWidth={1.5} opacity={0.85} />
        <circle cx={60} cy={40} r={7} fill="none" style={{ stroke: INK }} strokeWidth={1.25} />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={60 + 7 * Math.cos(rad)}
              y1={40 + 7 * Math.sin(rad)}
              x2={60 + 17 * Math.cos(rad)}
              y2={40 + 17 * Math.sin(rad)}
              style={{ stroke: INK }}
              strokeWidth={1}
              opacity={0.6}
            />
          );
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect x={14} y={14} width={44} height={24} fill="none" style={{ stroke: INK }} strokeWidth={1.25} />
      <rect x={64} y={14} width={42} height={24} style={{ fill: INK }} opacity={0.75} />
      <rect x={14} y={44} width={28} height={22} style={{ fill: INK }} opacity={0.4} />
      <rect x={48} y={44} width={58} height={22} fill="none" style={{ stroke: INK }} strokeWidth={1.25} />
    </svg>
  );
}

function FrameBody({ film, label }: { film: FilmSpec; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2px] border border-border-plate bg-surface shadow-[var(--shadow-plate)]">
      {/* Top rebate: sprocket perforations + frame number */}
      <div className="relative h-4 w-full bg-[var(--bg-chamber)]">
        <div className="film-sprockets absolute inset-0" />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 font-telemetry text-[8px] tracking-[0.2em] text-muted">
          {film.frameNo}
        </span>
      </div>
      {/* Negative image area */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--bg-surface)] transition-[filter] duration-300 group-hover:brightness-110 group-focus-within:brightness-110">
        <FilmEmblem kind={film.emblem} />
        <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />
        <div className="film-exposure absolute inset-0 bg-[var(--color-phosphor)]" />
        <span className="absolute bottom-1.5 left-2 font-display text-lg leading-none text-primary">
          {label}
        </span>
      </div>
      {/* Bottom rebate: stock telemetry */}
      <div className="flex h-5 items-center justify-between bg-[var(--bg-chamber)] px-2 font-telemetry text-[8px] tracking-[0.16em] text-muted">
        <span>{film.stock}</span>
        <span>EXP 36</span>
      </div>
    </div>
  );
}

/** A blank negative in the under-pile: sprockets + dim halftone, no label. */
function PileFrame() {
  return (
    <div className="overflow-hidden rounded-[2px] border border-border-plate/60 bg-surface">
      <div className="relative h-3 w-full bg-[var(--bg-chamber)]">
        <div className="film-sprockets absolute inset-0" />
      </div>
      <div className="relative aspect-[3/2] w-full bg-[var(--bg-chamber)]">
        <div className="halftone-screen pointer-events-none absolute inset-0 opacity-15" />
      </div>
      <div className="relative h-3 w-full bg-[var(--bg-chamber)]">
        <div className="film-sprockets absolute inset-0" />
      </div>
    </div>
  );
}

export function FilmStack() {
  const { t } = useI18n();
  const router = useRouter();

  // Keyboard contract: digits 1–4 jump straight to a chapter.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }
      const digit = ["1", "2", "3", "4"].indexOf(e.key);
      if (digit >= 0) {
        e.preventDefault();
        router.push(FILMS[digit]!.href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto h-[340px] w-full max-w-[680px] sm:h-[300px]"
        role="group"
        aria-label={t.home.films.label}
      >
        {/* Under-pile: blurred blank negatives, decorative only */}
        {PILE.map((frame, i) => (
          <div
            key={`pile-${i}`}
            aria-hidden="true"
            className={`pointer-events-none absolute blur-[1.5px] ${frame.className}`}
          >
            <div
              className={frame.idle ? "film-idle" : undefined}
              style={
                frame.idle
                  ? ({ "--idle-duration": frame.idle } as React.CSSProperties)
                  : undefined
              }
            >
              <PileFrame />
            </div>
          </div>
        ))}

        {/* Top layer: the four chapter negatives, permanently scattered */}
        {FILMS.map((film, i) => (
          <Link
            key={film.key}
            href={film.href}
            aria-label={`${film.frameNo} · ${t.home.films[film.key]}`}
            className={`film-frame-shell group absolute z-10 block w-[44%] rounded-[2px] transition-[rotate,scale,translate] duration-300 ease-out hover:z-50 hover:rotate-0 hover:scale-[1.06] hover:-translate-y-2 focus-visible:z-50 focus-visible:rotate-0 focus-visible:scale-[1.06] focus-visible:-translate-y-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-dominant)] sm:w-[24%] ${film.pose}`}
          >
            <div
              className="film-idle"
              style={
                {
                  "--idle-duration": `${6.4 + i * 0.9}s`,
                  animationDelay: `${i * -1.7}s`,
                } as React.CSSProperties
              }
            >
              <FrameBody film={film} label={t.home.films[film.key]} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
