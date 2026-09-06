import React from "react";

/**
 * BRAWUKA-78 · AmbientBackdrop — the darkroom light table atmosphere.
 *
 * Pure CSS/SVG, zero JS runtime cost:
 * - One slow-drifting safelight/cobalt glow (36s ease loop).
 * - Eight dust motes floating upward through the beam (7–19s linear loops).
 * - All animation lives in globals.css (`ambient-glow`, `dust-mote`) and is
 *   flattened by the global prefers-reduced-motion media query.
 */

const MOTES: ReadonlyArray<{
  left: string;
  bottom: string;
  size: number;
  duration: string;
  delay: string;
  dx: string;
  opacity: number;
}> = [
  { left: "12%", bottom: "18%", size: 3, duration: "15s", delay: "0s", dx: "18px", opacity: 0.28 },
  { left: "24%", bottom: "64%", size: 2, duration: "19s", delay: "-6s", dx: "-14px", opacity: 0.22 },
  { left: "38%", bottom: "30%", size: 2.5, duration: "13s", delay: "-3s", dx: "10px", opacity: 0.3 },
  { left: "52%", bottom: "72%", size: 2, duration: "17s", delay: "-9s", dx: "22px", opacity: 0.2 },
  { left: "63%", bottom: "22%", size: 3, duration: "14s", delay: "-5s", dx: "-18px", opacity: 0.26 },
  { left: "74%", bottom: "56%", size: 2, duration: "18s", delay: "-12s", dx: "12px", opacity: 0.22 },
  { left: "85%", bottom: "34%", size: 2.5, duration: "12s", delay: "-2s", dx: "-10px", opacity: 0.3 },
  { left: "46%", bottom: "12%", size: 2, duration: "16s", delay: "-8s", dx: "16px", opacity: 0.24 },
];

export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Slow safelight/cobalt breathing glow, off-center like a lamp over the bench */}
      <div
        className="ambient-glow absolute -top-1/4 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full opacity-[0.05] dark:opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at center, var(--ink-dominant) 0%, transparent 55%)",
        }}
      />
      {/* Dust drifting through the beam */}
      {MOTES.map((mote, i) => (
        <span
          key={i}
          className="dust-mote absolute rounded-full bg-[var(--text-muted)]"
          style={{
            left: mote.left,
            bottom: mote.bottom,
            width: mote.size,
            height: mote.size,
            ["--dust-duration" as string]: mote.duration,
            ["--dust-dx" as string]: mote.dx,
            ["--dust-opacity" as string]: mote.opacity,
            animationDelay: mote.delay,
          }}
        />
      ))}
    </div>
  );
}
