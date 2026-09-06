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

      {/* BRAWUKA-83 · Workbench line art — the darkroom desk itself:
          light-table panel with ruler ticks, film canister, and a loupe.
          Single 1px hairline family, faint ink, decorative only. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="var(--ink-faint)" strokeWidth={1}>
          {/* Light-table panel under the film pile (positioned in lower desk zone to never intersect identity) */}
          <rect x={140} y={720} width={720} height={250} rx={4} />
          <rect x={156} y={736} width={688} height={218} rx={2} strokeDasharray="2 5" opacity={0.6} />
          {/* Ruler ticks along the panel's top edge */}
          {Array.from({ length: 37 }, (_, i) => (
            <line
              key={`tick-${i}`}
              x1={156 + i * (688 / 36)}
              y1={720}
              x2={156 + i * (688 / 36)}
              y2={i % 6 === 0 ? 708 : 714}
              opacity={0.8}
            />
          ))}
          {/* Registration crosshair, lower right corner of the panel */}
          <circle cx={812} cy={910} r={10} />
          <line x1={812} y1={894} x2={812} y2={926} />
          <line x1={796} y1={910} x2={828} y2={910} />
          {/* Film canister, left of the bench */}
          <circle cx={86} cy={820} r={26} />
          <circle cx={86} cy={820} r={18} opacity={0.6} />
          <line x1={86} y1={788} x2={86} y2={780} />
          {/* Loupe, right of the bench */}
          <circle cx={916} cy={780} r={20} />
          <line x1={930} y1={794} x2={946} y2={816} />
        </g>
        {/* Subtle accent: the light table's live edge under the film stack */}
        <line x1={156} y1={736} x2={844} y2={736} stroke="var(--ink-dominant)" strokeWidth={1} opacity={0.25} />
      </svg>

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
