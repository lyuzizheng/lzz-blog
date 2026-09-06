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

      {/* BRAWUKA-86 · Workbench line art — integrated darkroom light-table frame:
          large easel frame enclosing identity and chapter negatives, with ruler ticks,
          canister, and loupe. Single 1px hairline family, faint ink, decorative only. */}
      {/* BRAWUKA-86 · Workbench line art — integrated darkroom light-table frame:
          large easel frame enclosing avatar, identity, and chapter negatives, with ruler ticks,
          canister, and loupe. Responsive desktop (1000x1000) and mobile (400x800) SVGs. */}

      {/* Desktop workbench frame (sm: and up) */}
      <svg
        className="hidden sm:block absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="var(--ink-faint)" strokeWidth={1}>
          {/* Large light-table easel frame enclosing avatar, identity, and chapter negatives */}
          <rect x={140} y={440} width={720} height={530} rx={4} />
          <rect x={156} y={456} width={688} height={498} rx={2} strokeDasharray="2 5" opacity={0.6} />
          {/* Ruler ticks along the panel's top edge */}
          {Array.from({ length: 37 }, (_, i) => (
            <line
              key={`tick-desktop-${i}`}
              x1={156 + i * (688 / 36)}
              y1={440}
              x2={156 + i * (688 / 36)}
              y2={i % 6 === 0 ? 428 : 434}
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
        {/* Subtle accent: the light table's live edge at the top */}
        <line x1={156} y1={456} x2={844} y2={456} stroke="var(--ink-dominant)" strokeWidth={1} opacity={0.25} />
      </svg>

      {/* Mobile workbench frame (< sm) */}
      <svg
        className="block sm:hidden absolute inset-0 h-full w-full"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="var(--ink-faint)" strokeWidth={1}>
          {/* Large light-table easel frame enclosing avatar, identity, and chapter negatives */}
          <rect x={16} y={48} width={368} height={704} rx={4} />
          <rect x={24} y={56} width={352} height={688} rx={2} strokeDasharray="2 4" opacity={0.6} />
          {/* Ruler ticks along the panel's top edge */}
          {Array.from({ length: 23 }, (_, i) => (
            <line
              key={`tick-mobile-${i}`}
              x1={24 + i * (352 / 22)}
              y1={48}
              x2={24 + i * (352 / 22)}
              y2={i % 4 === 0 ? 38 : 42}
              opacity={0.8}
            />
          ))}
          {/* Registration crosshair, lower right corner of the panel */}
          <circle cx={356} cy={724} r={8} />
          <line x1={356} y1={712} x2={356} y2={736} />
          <line x1={344} y1={724} x2={368} y2={724} />
        </g>
        {/* Subtle accent: the light table's live edge at the top */}
        <line x1={24} y1={56} x2={376} y2={56} stroke="var(--ink-dominant)" strokeWidth={1} opacity={0.25} />
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
