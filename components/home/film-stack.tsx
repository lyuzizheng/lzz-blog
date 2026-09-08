"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { openWipModal } from "@/components/ui";

/**
 * BRAWUKA-83 · FilmStack — the darkroom workbench, top layer.
 *
 * The five chapter negatives (Blogs / Career / Photography / Projects / Records) lie
 * permanently scattered on the light table in organic poses — nothing is
 * stacked away, every frame is a live link.
 * - Zero layout JS: percentage poses + CSS individual transform properties;
 *   hover/focus straighten + lift + exposure flash are pure CSS transitions.
 * - Idle breathing drift via `film-idle` keyframes (inner wrapper, composited).
 * - Keyboard: digits 1–5 jump straight to a chapter; all frames are real
 *   links with visible focus rings.
 * - prefers-reduced-motion: global CSS flattens idle drift + transitions.
 */

type FilmKey = "blogs" | "career" | "photography" | "projects" | "records";
type EmblemKind = "lines" | "flight" | "aperture" | "bento" | "timeline";

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
    pose: "left-[3%] top-[1%] -rotate-[4deg] sm:left-[0.5%] sm:top-[6%] sm:-rotate-[4deg]",
  },
  {
    key: "career",
    href: "/resume",
    frameNo: "▶ 02A",
    stock: "ILFORD HP5+",
    emblem: "flight",
    pose: "left-[55%] top-[2%] rotate-[3deg] sm:left-[20.5%] sm:top-[2%] sm:rotate-[3deg]",
  },
  {
    key: "photography",
    href: "/photography",
    frameNo: "▶ 03A",
    stock: "PORTRA 400",
    emblem: "aperture",
    pose: "left-[29%] top-[37%] -rotate-[3deg] sm:left-[40.5%] sm:top-[8%] sm:-rotate-[3deg]",
  },
  {
    key: "projects",
    href: "/products",
    frameNo: "▶ 04A",
    stock: "FUJI C200",
    emblem: "bento",
    pose: "left-[3%] top-[74%] rotate-[4deg] sm:left-[60.5%] sm:top-[4%] sm:rotate-[4deg]",
  },
  {
    key: "records",
    href: "/weekly-records",
    frameNo: "▶ 05A",
    stock: "CINESTILL 800T",
    emblem: "timeline",
    pose: "left-[55%] top-[74%] -rotate-[4deg] sm:left-[80.5%] sm:top-[7%] sm:-rotate-[4deg]",
  },
];

const MOBILE_LABEL_POSE: Record<FilmKey, string> = {
  blogs: "right-2 top-2 text-right",
  career: "left-2 top-2",
  photography: "bottom-2 left-2",
  projects: "bottom-2 left-2",
  records: "bottom-2 right-2 text-right",
};

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
  if (kind === "bento") {
    return (
      <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x={14} y={14} width={44} height={24} fill="none" style={{ stroke: INK }} strokeWidth={1.25} />
        <rect x={64} y={14} width={42} height={24} style={{ fill: INK }} opacity={0.75} />
        <rect x={14} y={44} width={28} height={22} style={{ fill: INK }} opacity={0.4} />
        <rect x={48} y={44} width={58} height={22} fill="none" style={{ stroke: INK }} strokeWidth={1.25} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <line x1={28} y1={12} x2={28} y2={68} style={{ stroke: INK }} strokeWidth={1.25} opacity={0.65} />
      {[
        [28, 18, 78],
        [28, 40, 64],
        [28, 62, 84],
      ].map(([cx, cy, width], index) => (
        <g key={cy}>
          <circle cx={cx} cy={cy} r={index === 0 ? 3.5 : 2.75} style={{ fill: INK }} />
          <rect x={40} y={cy - 2} width={width - 40} height={4} style={{ fill: INK }} opacity={0.75 - index * 0.15} />
        </g>
      ))}
    </svg>
  );
}

function FrameBody({ film, label }: { film: FilmSpec; label: string }) {
  const isWip = film.key === "photography";

  return (
    <div className="overflow-hidden rounded-[2px] border border-border-plate bg-surface shadow-[var(--shadow-plate)]">
      {/* Top rebate: sprocket perforations + frame number */}
      <div className="relative h-4 w-full bg-[var(--bg-chamber)]">
        <div className="film-sprockets absolute inset-0" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-telemetry text-[8px] tracking-[0.2em] text-muted">
          {isWip && (
            <span className="rounded-[1px] bg-amber-500/25 border border-amber-500/40 px-1 py-0.2 text-[7px] font-bold text-amber-600 dark:text-amber-400 tracking-wider">
              WIP
            </span>
          )}
          <span>{film.frameNo}</span>
        </div>
      </div>
      {/* Negative image area */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--bg-surface)] transition-[filter] duration-300 group-hover:brightness-110 group-focus-within:brightness-110">
        <FilmEmblem kind={film.emblem} />
        <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />
        <div className="film-exposure absolute inset-0 bg-[var(--color-phosphor)]" />
        <span
          className={`absolute z-10 font-display text-base leading-none text-primary sm:hidden ${MOBILE_LABEL_POSE[film.key]}`}
        >
          {label}
        </span>
        <span className="absolute bottom-1.5 left-2 hidden font-display text-lg leading-none text-primary sm:block">
          {label}
        </span>
        {isWip && (
          <span className="absolute top-1.5 right-1.5 rounded-[1px] bg-amber-500/20 border border-amber-500/40 px-1 text-[8px] font-bold text-amber-600 dark:text-amber-400 font-telemetry tracking-widest uppercase">
            WIP
          </span>
        )}
      </div>
      {/* Bottom rebate: stock telemetry */}
      <div className="flex h-5 items-center justify-between bg-[var(--bg-chamber)] px-2 font-telemetry text-[8px] tracking-[0.16em] text-muted">
        <span>{film.stock}</span>
        <span>{isWip ? "WIP // 显影中" : "EXP 36"}</span>
      </div>
    </div>
  );
}

export function FilmStack() {
  const { t } = useI18n();
  const router = useRouter();

  // Keyboard contract: digits 1–5 jump straight to a chapter.
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
      const digit = ["1", "2", "3", "4", "5"].indexOf(e.key);
      if (digit >= 0) {
        e.preventDefault();
        const targetFilm = FILMS[digit]!;
        if (targetFilm.key === "photography") {
          openWipModal();
        } else {
          router.push(targetFilm.href);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto h-[310px] w-full max-w-[680px] sm:h-[220px] md:h-[230px] sm:max-w-[800px] md:max-w-[880px] lg:max-w-[940px]"
        role="group"
        aria-label={t.home.films.label}
      >
        {/* Top layer: five chapter negatives; mobile reads as 2 / 1 / 2. */}
        {FILMS.map((film, i) => (
          <Link
            key={film.key}
            href={film.href}
            prefetch={false}
            onClick={(e) => {
              if (film.key === "photography") {
                e.preventDefault();
                openWipModal();
              }
            }}
            onMouseEnter={() => router.prefetch(film.href)}
            onFocus={() => router.prefetch(film.href)}
            aria-label={`${film.frameNo} · ${t.home.films[film.key]}`}
            className={`film-frame-shell group absolute z-10 block w-[42%] rounded-[2px] transition-[rotate,scale,translate] duration-300 ease-out hover:z-50 hover:rotate-0 hover:scale-[1.06] hover:-translate-y-2 focus-visible:z-50 focus-visible:rotate-0 focus-visible:scale-[1.06] focus-visible:-translate-y-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-dominant)] sm:w-[19%] md:w-[19%] ${film.pose}`}
          >
            <div
              className="film-idle"
              style={
                {
                  "--idle-duration": `${5.6 + i * 0.8}s`,
                  animationDelay: `${i * -1.5}s`,
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
