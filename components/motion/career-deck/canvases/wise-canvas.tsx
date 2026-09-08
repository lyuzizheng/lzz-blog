import React from "react";

/**
 * Act 1 Thematic Canvas: Modernist Typographic Backdrop (Wise Payments)
 *
 * Clean, architectural branding backdrop:
 * - Bold layered brand names: WISE + PAYMENTS
 * - Solid faint ink fill + razor-sharp hollow outline
 * - Minimalist corner framing & subtle ambient wash
 */
export function WiseCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient background wash */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, var(--ink-dominant) 0%, transparent 65%)",
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
          {/* Minimal corner crosshairs */}
          <path d="M 60 70 L 60 50 L 80 50" />
          <path d="M 940 70 L 940 50 L 920 50" />
          <path d="M 60 730 L 60 750 L 80 750" />
          <path d="M 940 730 L 940 750 L 920 750" />
          {/* Subtle center hairline */}
          <line x1="500" y1="60" x2="500" y2="740" strokeDasharray="4 8" opacity="0.4" />
        </g>

        {/* --- High-Impact Editorial Typographic Backing --- */}
        {/* 1. Primary Solid Brand Name */}
        <text
          x="500"
          y="390"
          textAnchor="middle"
          fill="var(--ink-dominant)"
          opacity="0.04"
          className="font-display font-black tracking-tighter uppercase"
          style={{ fontSize: "190px", letterSpacing: "-0.05em" }}
        >
          WISE
        </text>

        {/* 2. Secondary Architectural Outline Brand */}
        <text
          x="500"
          y="520"
          textAnchor="middle"
          fill="none"
          stroke="var(--ink-dominant)"
          strokeWidth="1.6"
          opacity="0.065"
          className="font-display font-black tracking-tighter uppercase"
          style={{ fontSize: "115px", letterSpacing: "-0.04em" }}
        >
          PAYMENTS
        </text>

        {/* Minimalist Telemetry Meta */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.25"
        >
          <text x="70" y="70">WISE // FINTECH CORE</text>
          <text x="930" y="70" textAnchor="end">LONDON · SINGAPORE</text>
          <text x="70" y="745">DEFECTS GOVERNANCE // DETERMINISTIC AI</text>
          <text x="930" y="745" textAnchor="end">£80K/MO ROI</text>
        </g>
      </svg>
    </div>
  );
}
