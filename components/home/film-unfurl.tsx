"use client";

import React, { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * BRAWUKA-57 · FilmUnfurl — the homepage's only hero object.
 *
 * Three 35mm negatives, centered, developing as you scroll:
 * latent (thin, quiet) → fully developed (dense ink) across the
 * hero's journey from viewport-entry to viewport-center.
 *
 * - GPU-only transforms (opacity / y / scale) → 60/120fps, Zero CLS
 *   (fixed aspect-ratio cells, no image fetch, no layout shift).
 * - `prefers-reduced-motion` → fully developed stills, no scroll linkage.
 * - Pure CSS/SVG frames: sprocket strips + halftone overlay, theme-aware
 *   via design-token vars (Daylight cobalt / Safelight kodak red).
 */

interface FrameSpec {
  frame: string;
  caption: string;
  sunX: number;
  sunY: number;
  ridgeSeed: number;
}

const FRAMES: ReadonlyArray<FrameSpec> = [
  { frame: "FRAME 01", caption: "F1.4 · 1/250 · ISO 100", sunX: 66, sunY: 30, ridgeSeed: 2 },
  { frame: "FRAME 07", caption: "F2.8 · 1/500 · ISO 100", sunX: 34, sunY: 42, ridgeSeed: 4 },
  { frame: "FRAME 12", caption: "F1.4 · 1/125 · ISO 400", sunX: 52, sunY: 26, ridgeSeed: 3 },
];

/** Deterministic ridge silhouettes — same negative every visit. */
function Ridges({ seed }: { seed: number }) {
  const paths = [
    "M0 78 L28 52 L55 70 L86 44 L110 62 L110 100 L0 100 Z",
    "M0 86 L34 62 L62 78 L92 60 L110 70 L110 100 L0 100 Z",
    "M0 72 L24 58 L48 72 L74 50 L98 66 L110 60 L110 100 L0 100 Z",
  ];
  return (
    <path
      d={paths[seed % paths.length]}
      className="fill-[var(--bg-chamber)]"
      opacity={0.9}
    />
  );
}

function Negative({ spec }: { spec: FrameSpec }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-chamber)]">
      <svg viewBox="0 0 110 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="110" height="100" className="fill-[var(--bg-surface)]" />
        <circle cx={spec.sunX} cy={spec.sunY} r={13} className="fill-[var(--ink-dominant)]" opacity={0.85} />
        <circle cx={spec.sunX} cy={spec.sunY} r={20} fill="none" className="stroke-[var(--ink-dominant)]" strokeWidth={0.75} opacity={0.4} />
        <Ridges seed={spec.ridgeSeed} />
      </svg>
      {/* Physical overprint: halftone dots over the duotone wash */}
      <div className="halftone-screen pointer-events-none absolute inset-0 opacity-30" />
      {/* Frame number etched on the negative edge */}
      <span className="absolute bottom-1.5 left-2 font-telemetry text-[9px] tracking-[0.2em] text-primary/80">
        {spec.frame}
      </span>
    </div>
  );
}

function Sprockets() {
  return (
    <div className="flex items-center justify-between bg-[var(--bg-surface)] px-1.5 py-1" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="h-1 w-1.5 rounded-[1px] bg-primary/25" />
      ))}
    </div>
  );
}

function DevelopingFrame({
  spec,
  progress,
  index,
}: {
  spec: FrameSpec;
  progress: MotionValue<number>;
  index: number;
}) {
  // Staggered develop windows: frame i develops across [i*0.22, 0.45+i*0.22].
  const start = index * 0.22;
  const opacity = useTransform(progress, [start, start + 0.45], [0.22, 1]);
  const y = useTransform(progress, [start, start + 0.45], [28, 0]);
  const scale = useTransform(progress, [start, start + 0.45], [0.96, 1]);
  return (
    <motion.figure style={{ opacity, y, scale }} className="min-w-0">
      <div className="overflow-hidden rounded-[2px] border border-border-plate">
        <Sprockets />
        <Negative spec={spec} />
        <Sprockets />
      </div>
      <figcaption className="mt-2 truncate font-telemetry text-[10px] tracking-[0.14em] text-muted">
        {spec.caption}
      </figcaption>
    </motion.figure>
  );
}

function StillFrame({ spec }: { spec: FrameSpec }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-[2px] border border-border-plate">
        <Sprockets />
        <Negative spec={spec} />
        <Sprockets />
      </div>
      <figcaption className="mt-2 truncate font-telemetry text-[10px] tracking-[0.14em] text-muted">
        {spec.caption}
      </figcaption>
    </figure>
  );
}

export function FilmUnfurl() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  if (reduceMotion) {
    return (
      <div ref={ref} className="grid grid-cols-3 gap-3 sm:gap-4">
        {FRAMES.map((spec) => (
          <StillFrame key={spec.frame} spec={spec} />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {FRAMES.map((spec, i) => (
          <DevelopingFrame key={spec.frame} spec={spec} progress={scrollYProgress} index={i} />
        ))}
      </div>
      {/* Develop progress hairline — the unfurl narrative in one line */}
      <div className="mt-5 h-px w-full bg-primary/10" aria-hidden="true">
        <motion.div className="h-px w-full origin-left bg-safelight" style={{ scaleX: scrollYProgress }} />
      </div>
      <p className="mt-2 font-telemetry text-[10px] tracking-[0.2em] text-muted">
        {t.home.developing}
      </p>
    </div>
  );
}
