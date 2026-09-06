"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-78 · FilmStack — four 35mm negatives stacked on the light table.
 *
 * Stacked by default with organic rotations and a breathing idle drift;
 * a click scatters them across the bench with spring physics, turning each
 * frame into a chapter entrance: Blogs / Career / Photography / Projects.
 *
 * - GPU-only transforms (x / y / rotate / scale) → 60fps+, Zero CLS
 *   (absolute positioning inside a fixed-height container).
 * - Keyboard: the stacked deck is a single button; scattered frames are
 *   real links; Esc collects; digits 1–4 jump straight to a chapter.
 * - prefers-reduced-motion: instant pose swap, idle drift flattened by the
 *   global CSS media query, every destination stays reachable.
 */

type FilmKey = "blogs" | "career" | "photography" | "projects";
type EmblemKind = "lines" | "flight" | "aperture" | "bento";

interface FilmSpec {
  key: FilmKey;
  href: string;
  frameNo: string;
  stock: string;
  emblem: EmblemKind;
}

const FILMS: ReadonlyArray<FilmSpec> = [
  { key: "blogs", href: "/posts", frameNo: "▶ 01A", stock: "KODAK 400TX", emblem: "lines" },
  { key: "career", href: "/resume", frameNo: "▶ 02A", stock: "ILFORD HP5+", emblem: "flight" },
  { key: "photography", href: "/photography", frameNo: "▶ 03A", stock: "PORTRA 400", emblem: "aperture" },
  { key: "projects", href: "/products", frameNo: "▶ 04A", stock: "FUJI C200", emblem: "bento" },
];

/** Organic stacked poses: rotation (deg) + pixel offset from deck center. */
const STACK_POSES = [
  { r: -5, dx: -8, dy: -6 },
  { r: 3.5, dx: 7, dy: 2 },
  { r: -1.5, dx: -5, dy: 8 },
  { r: 6, dx: 10, dy: -3 },
] as const;

/** Scattered poses as fractions of the free space, desktop fan / mobile 2×2. */
const SCATTER_DESKTOP = [
  { fx: 0, fy: 0.12, r: -6 },
  { fx: 1, fy: 0.55, r: 4 },
  { fx: 0.5, fy: 0.02, r: -3 },
  { fx: 0.75, fy: 0.45, r: 7 },
] as const;
const SCATTER_MOBILE = [
  { fx: 0, fy: 0.02, r: -5 },
  { fx: 1, fy: 0.1, r: 6 },
  { fx: 0.06, fy: 0.88, r: 3 },
  { fx: 0.94, fy: 0.98, r: -7 },
] as const;

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

export function FilmStack() {
  const { t } = useI18n();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [scattered, setScattered] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // Measure the bench so scatter poses are computed in pixels (GPU transforms).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize({ width: rect.width, height: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keyboard contract: Esc collects, digits 1–4 jump straight to a chapter.
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
      if (e.key === "Escape") {
        setScattered(false);
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

  const width = size?.width ?? 0;
  const height = size?.height ?? 0;
  const isMobile = width < 520;
  const frameW = isMobile
    ? Math.min(148, width * 0.44)
    : Math.min(172, width * 0.24);
  const frameH = frameW * (2 / 3) + 36;

  const poseOf = (index: number) => {
    if (!scattered) {
      const pose = STACK_POSES[index]!;
      return {
        x: (width - frameW) / 2 + pose.dx,
        y: (height - frameH) / 2 + pose.dy,
        r: pose.r,
      };
    }
    const pose = (isMobile ? SCATTER_MOBILE : SCATTER_DESKTOP)[index]!;
    return {
      x: pose.fx * (width - frameW),
      y: pose.fy * (height - frameH),
      r: pose.r,
    };
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative mx-auto h-[340px] w-full max-w-[640px] sm:h-[300px]"
        role="group"
        aria-label={t.home.films.open}
      >
        {/* Backdrop collector — click anywhere off-frame to re-stack. */}
        {scattered && (
          <button
            type="button"
            aria-label={t.home.films.collectHint}
            onClick={() => setScattered(false)}
            className="fixed inset-0 z-30 cursor-default"
          />
        )}

        {FILMS.map((film, i) => {
          const pose = poseOf(i);
          const isHovered = hovered === i;
          const zIndex = scattered ? (isHovered ? 50 : 40 + i) : 40 + (FILMS.length - i);
          const label = t.home.films[film.key];
          const inner = (
            <div
              className={!scattered && !reduceMotion ? "film-idle" : undefined}
              style={
                {
                  "--idle-duration": `${6.4 + i * 0.9}s`,
                  animationDelay: `${i * -1.7}s`,
                } as React.CSSProperties
              }
            >
              <FrameBody film={film} label={label} />
            </div>
          );

          return (
            <motion.div
              key={film.key}
              className="absolute left-0 top-0"
              style={{ width: frameW, zIndex }}
              initial={false}
              animate={{
                x: pose.x,
                y: pose.y + (isHovered && scattered ? -8 : 0),
                rotate: isHovered && scattered ? 0 : pose.r,
                scale: isHovered && scattered ? 1.06 : 1,
                opacity: size ? 1 : 0,
              }}
              transition={
                reduceMotion
                  ? { duration: 0.15 }
                  : {
                      type: "spring",
                      stiffness: 240,
                      damping: 24,
                      delay: scattered ? i * 0.045 : 0,
                    }
              }
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            >
              {scattered ? (
                <Link
                  href={film.href}
                  className="film-frame-shell group block rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-dominant)]"
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${film.frameNo} · ${label}`}
                >
                  {inner}
                </Link>
              ) : i === 0 ? (
                <button
                  type="button"
                  onClick={() => setScattered(true)}
                  aria-label={t.home.films.open}
                  aria-expanded={scattered}
                  className="film-frame-shell group block w-full cursor-pointer rounded-[2px] text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-dominant)]"
                >
                  {inner}
                </button>
              ) : (
                <div className="film-frame-shell group" aria-hidden="true">
                  {inner}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bench telemetry line */}
      <p className="mt-3 text-center font-telemetry text-[10px] uppercase tracking-[0.24em] text-muted">
        {scattered ? t.home.films.collectHint : t.home.films.scatterHint}
      </p>
    </div>
  );
}
