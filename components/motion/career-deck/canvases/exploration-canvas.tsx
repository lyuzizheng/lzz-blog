import React from "react";

/**
 * Act 2 Thematic Canvas: Modernist Typographic Backdrop (MariBank & SeaMoney & Bondee)
 *
 * Clean, architectural branding backdrop:
 * - Bold layered brand names: MARIBANK + SEAMONEY + BONDEE
 * - Solid faint ink fill + razor-sharp hollow outline
 * - Minimalist corner framing & subtle ambient wash
 */
export function ExplorationCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at 25% 65%, var(--ink-dominant) 0%, transparent 60%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-500 select-none"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Subtle architectural frame accents */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.8" opacity="0.12">
          <path d="M 60 70 L 60 50 L 80 50" />
          <path d="M 940 70 L 940 50 L 920 50" />
          <path d="M 60 730 L 60 750 L 80 750" />
          <path d="M 940 730 L 940 750 L 920 750" />
          <line x1="100" y1="400" x2="900" y2="400" strokeDasharray="4 8" opacity="0.4" />
        </g>

        {/* --- High-Impact Editorial Typographic Backing --- */}
        {/* 1. Primary Solid: MARIBANK */}
        <text
          x="500"
          y="350"
          textAnchor="middle"
          fill="var(--ink-dominant)"
          opacity="0.04"
          className="font-display font-black tracking-tighter uppercase"
          style={{ fontSize: "145px", letterSpacing: "-0.05em" }}
        >
          MARIBANK
        </text>

        {/* 2. Secondary Outline: SEAMONEY */}
        <text
          x="500"
          y="470"
          textAnchor="middle"
          fill="none"
          stroke="var(--ink-dominant)"
          strokeWidth="1.6"
          opacity="0.065"
          className="font-display font-black tracking-tighter uppercase"
          style={{ fontSize: "125px", letterSpacing: "-0.04em" }}
        >
          SEAMONEY
        </text>

        {/* 3. Tertiary Accent: BONDEE */}
        <text
          x="500"
          y="565"
          textAnchor="middle"
          fill="var(--ink-dominant)"
          opacity="0.03"
          className="font-display font-black tracking-tighter uppercase"
          style={{ fontSize: "75px", letterSpacing: "-0.03em" }}
        >
          BONDEE
        </text>

        {/* Minimalist Telemetry Meta */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.25"
        >
          <text x="70" y="70">MARIBANK // DIGITAL CREDIT CORE</text>
          <text x="930" y="70" textAnchor="end">SEA GROUP · SINGAPORE</text>
          <text x="70" y="745">MAS COMPLIANCE // DISTRIBUTED CONSISTENCY</text>
          <text x="930" y="745" textAnchor="end">CLOUD-NATIVE K8S</text>
        </g>
      </svg>
    </div>
  );
}
