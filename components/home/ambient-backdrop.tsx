import React from "react";

/**
 * BRAWUKA-78 · AmbientBackdrop — the darkroom light table atmosphere.
 * BRAWUKA-83 · extended with the workbench etching layer.
 *
 * Pure CSS/SVG, zero JS runtime cost:
 * - One slow-drifting safelight/cobalt glow (36s ease loop).
 * - Eight dust motes floating upward through the beam (7–19s linear loops).
 * - A workbench etching in a single cobalt 1px line family: the light table
 *   panel (hairline rectangle + inner glow + ruler ticks + registration
 *   marks), a film canister and an enlarger lens — all decorative, all
 *   anchored with CSS so the etching never shifts layout.
 * - All animation lives in globals.css (`ambient-glow`, `dust-mote`) and is
 *   flattened by the global prefers-reduced-motion media query; the etching
 *   itself is static.
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

const INK = "var(--ink-dominant)";
const HAIRLINE = { fill: "none", stroke: INK, strokeWidth: 1, vectorEffect: "non-scaling-stroke" } as const;

/** Crosshair + circle registration mark. */
function RegistrationMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <circle cx={14} cy={14} r={9} {...HAIRLINE} />
      <line x1={14} y1={0} x2={14} y2={28} {...HAIRLINE} />
      <line x1={0} y1={14} x2={28} y2={14} {...HAIRLINE} />
    </svg>
  );
}

/**
 * The light table panel: hairline rectangle with an inner glow, ruler ticks
 * along the top and left edges, and small registration crosses at two inner
 * corners — the surface the chapter negatives rest on.
 */
function LightTable({ className }: { className: string }) {
  const topTicks = Array.from({ length: 49 }, (_, i) => 10 + i * 20);
  const leftTicks = Array.from({ length: 13 }, (_, i) => 10 + i * 20);
  return (
    <svg viewBox="0 0 980 260" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="workbench-table-glow" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor={INK} stopOpacity={0.16} />
          <stop offset="70%" stopColor={INK} stopOpacity={0.05} />
          <stop offset="100%" stopColor={INK} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x={1} y={1} width={978} height={258} fill="url(#workbench-table-glow)" stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {/* Ruler ticks — top edge */}
      {topTicks.map((x, i) => (
        <line
          key={`t${x}`}
          x1={x}
          y1={1}
          x2={x}
          y2={i % 5 === 0 ? 15 : 8}
          {...HAIRLINE}
          opacity={i % 5 === 0 ? 0.9 : 0.55}
        />
      ))}
      {/* Ruler ticks — left edge */}
      {leftTicks.map((y, i) => (
        <line
          key={`l${y}`}
          x1={1}
          y1={y}
          x2={i % 5 === 0 ? 15 : 8}
          y2={y}
          {...HAIRLINE}
          opacity={i % 5 === 0 ? 0.9 : 0.55}
        />
      ))}
      {/* Registration crosses at two inner corners */}
      <g opacity={0.8}>
        <circle cx={40} cy={220} r={7} {...HAIRLINE} />
        <line x1={40} y1={210} x2={40} y2={230} {...HAIRLINE} />
        <line x1={30} y1={220} x2={50} y2={220} {...HAIRLINE} />
        <circle cx={940} cy={40} r={7} {...HAIRLINE} />
        <line x1={940} y1={30} x2={940} y2={50} {...HAIRLINE} />
        <line x1={930} y1={40} x2={950} y2={40} {...HAIRLINE} />
      </g>
    </svg>
  );
}

/** A 35mm film canister, drawn as a cylinder outline. */
function FilmCanister({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 72 96" className={className} aria-hidden="true">
      <ellipse cx={36} cy={14} rx={30} ry={10} {...HAIRLINE} />
      <line x1={6} y1={14} x2={6} y2={78} {...HAIRLINE} />
      <line x1={66} y1={14} x2={66} y2={78} {...HAIRLINE} />
      <path d="M6 78 A30 10 0 0 0 66 78" {...HAIRLINE} />
      <ellipse cx={36} cy={11} rx={21} ry={6} {...HAIRLINE} opacity={0.7} />
      <line x1={6} y1={34} x2={66} y2={34} {...HAIRLINE} opacity={0.5} />
      <line x1={6} y1={40} x2={66} y2={40} {...HAIRLINE} opacity={0.5} />
    </svg>
  );
}

/** An enlarger lens: concentric circles with six aperture ticks. */
function EnlargerLens({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <circle cx={48} cy={48} r={40} {...HAIRLINE} />
      <circle cx={48} cy={48} r={30} {...HAIRLINE} opacity={0.7} />
      <circle cx={48} cy={48} r={18} {...HAIRLINE} opacity={0.5} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={48 + 18 * Math.cos(rad)}
            y1={48 + 18 * Math.sin(rad)}
            x2={48 + 30 * Math.cos(rad)}
            y2={48 + 30 * Math.sin(rad)}
            {...HAIRLINE}
            opacity={0.6}
          />
        );
      })}
      <line x1={48} y1={8} x2={48} y2={0} {...HAIRLINE} opacity={0.6} />
    </svg>
  );
}

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

      {/*
       * Workbench etching — one cobalt 1px line family at very low opacity.
       * Static, decorative-only; hidden pieces degrade gracefully on small
       * screens, the light table panel stays everywhere.
       */}
      <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.16]">
        <LightTable className="absolute bottom-[7%] left-1/2 w-[min(92vw,980px)] -translate-x-1/2" />
        <FilmCanister className="absolute bottom-[8%] left-[6%] hidden w-[72px] sm:block" />
        <EnlargerLens className="absolute left-[7%] top-[13%] hidden w-[92px] sm:block" />
        <RegistrationMark className="absolute right-[6%] top-[30%] hidden w-[26px] sm:block" />
        <RegistrationMark className="absolute bottom-[30%] left-[5%] hidden w-[26px] sm:block" />
      </div>

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
