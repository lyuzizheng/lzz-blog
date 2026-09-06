"use client";

import React, { useRef, useState, useEffect } from "react";
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

function LoadDevelopingFrame({
  spec,
  index,
  developProgress,
}: {
  spec: FrameSpec;
  index: number;
  developProgress: number; // 0 to 1
}) {
  // Staggered develop windows: 80ms stagger between frames (0.16 window offset per frame)
  // Frame i develops across [i * 0.16, 0.68 + i * 0.16]
  const start = index * 0.16;
  const end = Math.min(1, start + 0.68);
  const frameProgress = Math.max(0, Math.min(1, (developProgress - start) / (end - start)));
  
  const opacity = 0.2 + frameProgress * 0.8;
  const y = (1 - frameProgress) * 20;
  const scale = 0.96 + frameProgress * 0.04;

  return (
    <figure
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        transition: developProgress === 1 ? "none" : "opacity 0.25s ease-out, transform 0.25s ease-out",
      }}
      className="min-w-0"
    >
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

function DevelopingFrame({
  spec,
  progress,
  index,
}: {
  spec: FrameSpec;
  progress: MotionValue<number>;
  index: number;
}) {
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
export interface FilmUnfurlProps {
  /** Optional controlled timeline progress (0 to 1) */
  timelineProgress?: number;
  /** Force fully developed stills */
  isDeveloped?: boolean;
  /** Callback when timeline completes */
  onComplete?: () => void;
}

export function FilmUnfurl({
  timelineProgress: externalProgress,
  isDeveloped: externalDeveloped,
  onComplete,
}: FilmUnfurlProps = {}) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  
  // Internal autonomous timeline state if externalProgress not provided
  const [internalProgress, setInternalProgress] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduceMotion || externalDeveloped) {
      setSettled(true);
      setInternalProgress(1);
      return;
    }

    let animFrame: number;
    let startTime: number | null = null;
    // t0 (0ms): paper ready
    // t1 (100ms-360ms): name & bio
    // t2 (360ms-960ms): 3 frames stagger (80ms between frames) + hairline line
    // Total convergence < 1.2s (finishes by ~960ms)
    const DURATION = 600; // ms for the t2 development phase
    const DELAY = 360;    // start t2 at 360ms

    const interrupt = () => {
      setInternalProgress(1);
      setSettled(true);
      onComplete?.();
    };

    // Interruptible on user interaction
    window.addEventListener("wheel", interrupt, { passive: true, once: true });
    window.addEventListener("touchstart", interrupt, { passive: true, once: true });
    window.addEventListener("keydown", interrupt, { once: true });
    window.addEventListener("pointerdown", interrupt, { passive: true, once: true });

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < DELAY) {
        animFrame = requestAnimationFrame(step);
      } else {
        const devElapsed = elapsed - DELAY;
        const p = Math.min(1, devElapsed / DURATION);
        setInternalProgress(p);

        if (p < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          setSettled(true);
          onComplete?.();
        }
      }
    };

    animFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("pointerdown", interrupt);
    };
  }, [reduceMotion, externalDeveloped, onComplete]);

  const effectiveProgress = externalProgress !== undefined
    ? externalProgress
    : settled
    ? 1
    : internalProgress;

  if (reduceMotion || settled) {
    return (
      <div ref={ref} className="w-full">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {FRAMES.map((spec) => (
            <StillFrame key={spec.frame} spec={spec} />
          ))}
        </div>
        <div className="mt-5 h-px w-full bg-border-plate/60" aria-hidden="true">
          <div className="h-px w-full origin-left bg-safelight" />
        </div>
        <p className="mt-2 font-telemetry text-[10px] tracking-[0.2em] text-muted">
          {t.home.developing}
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {FRAMES.map((spec, i) => (
          <LoadDevelopingFrame
            key={spec.frame}
            spec={spec}
            index={i}
            developProgress={effectiveProgress}
          />
        ))}
      </div>
      {/* Hairline progress line — runs and stops when finished */}
      <div className="mt-5 h-px w-full bg-border-plate/40" aria-hidden="true">
        <div
          className="h-px origin-left bg-safelight transition-all duration-75 ease-out"
          style={{ width: `${Math.round(effectiveProgress * 100)}%` }}
        />
      </div>
      <p className="mt-2 font-telemetry text-[10px] tracking-[0.2em] text-muted">
        {t.home.developing}
      </p>
    </div>
  );
}
