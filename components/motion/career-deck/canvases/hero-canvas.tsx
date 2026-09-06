import React from "react";

/**
 * Act 0 Thematic Canvas: Optical Bench & Mission Control Radar
 *
 * Monochromatic ink line art representing optical calibration,
 * coordinates telemetry, and mission trajectory origins.
 */
export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle radial ambient glow */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--ink-dominant) 0%, transparent 60%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-25 dark:opacity-20 transition-opacity duration-300"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--ink-faint)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Background micro grid */}
        <rect width="1000" height="800" fill="url(#hero-grid)" opacity="0.6" />

        {/* Central Radar / Range Rings */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.8" opacity="0.35">
          <circle cx="500" cy="400" r="100" strokeDasharray="3 3" />
          <circle cx="500" cy="400" r="200" />
          <circle cx="500" cy="400" r="300" strokeDasharray="6 4" />
          <circle cx="500" cy="400" r="390" />
        </g>

        {/* Reticle Crosshairs */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.9" opacity="0.45">
          <line x1="500" y1="50" x2="500" y2="750" strokeDasharray="4 4" />
          <line x1="100" y1="400" x2="900" y2="400" strokeDasharray="4 4" />
          {/* Tick marks on crosshairs */}
          <line x1="492" y1="200" x2="508" y2="200" />
          <line x1="492" y1="300" x2="508" y2="300" />
          <line x1="492" y1="500" x2="508" y2="500" />
          <line x1="492" y1="600" x2="508" y2="600" />
          <line x1="300" y1="392" x2="300" y2="408" />
          <line x1="400" y1="392" x2="400" y2="408" />
          <line x1="600" y1="392" x2="600" y2="408" />
          <line x1="700" y1="392" x2="700" y2="408" />
        </g>

        {/* Diagonal Horizon Sightlines */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.6" opacity="0.2">
          <line x1="217" y1="117" x2="783" y2="683" strokeDasharray="2 6" />
          <line x1="217" y1="683" x2="783" y2="117" strokeDasharray="2 6" />
        </g>

        {/* Technical Corner Brackets */}
        <g stroke="var(--ink-dominant)" strokeWidth="1.2" opacity="0.5">
          {/* Top Left */}
          <path d="M 60 90 L 60 60 L 90 60" />
          {/* Top Right */}
          <path d="M 940 90 L 940 60 L 910 60" />
          {/* Bottom Left */}
          <path d="M 60 710 L 60 740 L 90 740" />
          {/* Bottom Right */}
          <path d="M 940 710 L 940 740 L 910 740" />
        </g>

        {/* Telemetry Annotations */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.6"
        >
          <text x="70" y="80">SYS.ORIGIN // 01°20&apos;N 103°49&apos;E</text>
          <text x="70" y="96">AZIMUTH: 358.4° T</text>
          <text x="70" y="730">MISSION CONTROL // ARCHIVES 2017-2026</text>
          <text x="800" y="80" textAnchor="end">FRAME: ACT-00 COVER</text>
          <text x="800" y="96" textAnchor="end">OPTICAL RETICLE: 35MM</text>
          <text x="930" y="730" textAnchor="end">VERIFIED RECORD</text>
        </g>
      </svg>
    </div>
  );
}
