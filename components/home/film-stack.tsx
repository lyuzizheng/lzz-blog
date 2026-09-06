"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-83 · FilmStack — the darkroom workbench, top layer.
 *
 * No more stacked deck / click-to-scatter state machine: the four chapter
 * negatives lie permanently scattered across the light table in irregular
 * poses, each one directly a link to Blogs / Career / Photography / Projects.
 * Beneath them sits a decorative pile of unlabeled 35mm negatives — low
 * opacity, blur(1.5px), pointer-events: none — the "freshly developed sheets
 * still on the bench" depth layer.
 *
 * - GPU-only transforms (x / y / rotate / scale) → 60fps+, Zero CLS
 *   (absolute positioning inside a fixed-height container).
 * - Hover: frame straightens, lifts and flashes an exposure; idle breathing
 *   drift otherwise. Keyboard: digits 1–4 jump straight to a chapter.
 * - prefers-reduced-motion: instant poses, idle drift flattened by the
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

/**
 * Permanent scatter poses as fractions of the free space, desktop fan /
 * mobile 2×2. Desktop keeps the lower half of the bench open for the pile.
 */
const SCATTER_DESKTOP = [
  { fx: 0.02, fy: 0.08, r: -6 },
  { fx: 0.63, fy: 0.02, r: 3.5 },
  { fx: 0.3, fy: 0.34, r: -2.5 },
  { fx: 0.98, fy: 0.3, r: 6.5 },
] as const;
const SCATTER_MOBILE = [
  { fx: 0, fy: 0.02, r: -5 },
  { fx: 1, fy: 0.1, r: 6 },
  { fx: 0.06, fy: 0.88, r: 3 },
  { fx: 0.94, fy: 0.98, r: -7 },
] as const;

/**
 * The under-layer pile: seven unlabeled negatives heaped on the lower half
 * of the bench, center-weighted so the chapter frames above stay legible.
 * `o` is per-frame opacity — organic depth inside the shared blur.
 */
const PILE_POSES = [
  { fx: 0.3, fy: 0.6, r: -9, o: 0.5 },
  { fx: 0.37, fy: 0.74, r: 5, o: 0.58 },
  { fx: 0.43, fy: 0.56, r: -3, o: 0.44 },
  { fx: 0.5, fy: 0.8, r: 8, o: 0.54 },
  { fx: 0.57, fy: 0.64, r: -6, o: 0.48 },
  { fx: 0.63, fy: 0.84, r: 2, o: 0.42 },
  { fx: 0.47, fy: 0.92, r: -1, o: 0.38 },
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

/** One unlabeled pile negative — rebates and sprockets only, no text. */
function PileNegative() {
  return (
    <div className="overflow-hidden rounded-[2px] border border-border-plate bg-surface">
      <div className="relative h-3.5 w-full bg-[var(--bg-chamber)]">
        <div className="film-sprockets absolute inset-0" />
      </div>
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--bg-surface)]">
        {/* Backlit by the light table: a soft luminous core inside the negative,
            otherwise the unlabeled frame would vanish against the bench. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, var(--ink-dominant) 0%, transparent 72%)",
            opacity: 0.16,
          }}
        />
        <div className="halftone-screen pointer-events-none absolute inset-0 opacity-10" />
      </div>
      <div className="h-4 w-full bg-[var(--bg-chamber)]" />
    </div>
  );
}

export function FilmStack() {
  const { t } = useI18n();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Measure the bench so poses are computed in pixels (GPU transforms).
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

  const width = size?.width ?? 0;
  const height = size?.height ?? 0;
  const isMobile = width < 520;
  const frameW = isMobile
    ? Math.min(148, width * 0.44)
    : Math.min(172, width * 0.24);
  const frameH = frameW * (2 / 3) + 36;
  const pileW = frameW * 0.84;
  const pileH = pileW * (2 / 3) + 30;

  const poseOf = (index: number) => {
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
        {/*
         * Under-layer pile: unlabeled negatives heaped on the lower bench.
         * Pure decoration — no pointer events, no text, one shared blur.
         * Static translate3d poses, so zero animation cost; hidden until
         * the bench is measured to keep Zero CLS.
         */}
        <div
          className="pointer-events-none absolute inset-0 z-10 blur-[1.5px]"
          aria-hidden="true"
          style={{ opacity: size ? 1 : 0 }}
        >
          {PILE_POSES.map((pose, i) => (
            <div
              key={i}
              className="absolute left-0 top-0"
              style={{
                width: pileW,
                opacity: pose.o,
                transform: `translate3d(${pose.fx * (width - pileW)}px, ${pose.fy * (height - pileH)}px, 0) rotate(${pose.r}deg)`,
              }}
            >
              <PileNegative />
            </div>
          ))}
        </div>

        {FILMS.map((film, i) => {
          const pose = poseOf(i);
          const isHovered = hovered === i;
          const zIndex = isHovered ? 50 : 40 + i;
          const label = t.home.films[film.key];
          return (
            <motion.div
              key={film.key}
              className="absolute left-0 top-0"
              style={{ width: frameW, zIndex }}
              initial={false}
              animate={{
                x: pose.x,
                y: pose.y + (isHovered ? -8 : 0),
                rotate: isHovered ? 0 : pose.r,
                scale: isHovered ? 1.06 : 1,
                opacity: size ? 1 : 0,
              }}
              transition={
                reduceMotion
                  ? { duration: 0.15 }
                  : {
                      type: "spring",
                      stiffness: 240,
                      damping: 24,
                    }
              }
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            >
              <Link
                href={film.href}
                className="film-frame-shell group block rounded-[2px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-dominant)]"
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-label={`${film.frameNo} · ${label}`}
              >
                <div
                  className={!reduceMotion ? "film-idle" : undefined}
                  style={
                    {
                      "--idle-duration": `${6.4 + i * 0.9}s`,
                      animationDelay: `${i * -1.7}s`,
                    } as React.CSSProperties
                  }
                >
                  <FrameBody film={film} label={label} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bench telemetry line */}
      <p className="mt-3 text-center font-telemetry text-[10px] uppercase tracking-[0.24em] text-muted">
        {t.home.films.hint}
      </p>
    </div>
  );
}
