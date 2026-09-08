import React from "react";

interface HeroCanvasProps {
  mode?: "hero" | "education";
}

/**
 * Act 0 & 5 Thematic Canvas: Modernist Typographic Backdrop (Profile & NTU)
 *
 * Clean, architectural branding backdrop:
 * - Bold layered brand names: PROFILE + SINGAPORE or NTU + SINGAPORE
 * - Solid faint ink fill + razor-sharp hollow outline
 * - Minimalist corner framing & subtle ambient wash
 */
export function HeroCanvas({ mode = "hero" }: HeroCanvasProps) {
  const isEducation = mode === "education";

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
          <line x1="500" y1="60" x2="500" y2="740" strokeDasharray="4 8" opacity="0.4" />
        </g>

        {/* --- High-Impact Editorial Typographic Backing --- */}
        {isEducation ? (
          <>
            {/* 1. Primary Solid: NTU */}
            <text
              x="500"
              y="380"
              textAnchor="middle"
              fill="var(--ink-dominant)"
              opacity="0.04"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "200px", letterSpacing: "-0.05em" }}
            >
              NTU
            </text>

            {/* 2. Secondary Outline: SINGAPORE */}
            <text
              x="500"
              y="500"
              textAnchor="middle"
              fill="none"
              stroke="var(--ink-dominant)"
              strokeWidth="1.6"
              opacity="0.065"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "110px", letterSpacing: "-0.04em" }}
            >
              SINGAPORE
            </text>
          </>
        ) : (
          <>
            {/* 1. Primary Solid: PROFILE */}
            <text
              x="500"
              y="380"
              textAnchor="middle"
              fill="var(--ink-dominant)"
              opacity="0.04"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "165px", letterSpacing: "-0.05em" }}
            >
              PROFILE
            </text>

            {/* 2. Secondary Outline: SINGAPORE */}
            <text
              x="500"
              y="500"
              textAnchor="middle"
              fill="none"
              stroke="var(--ink-dominant)"
              strokeWidth="1.6"
              opacity="0.065"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "110px", letterSpacing: "-0.04em" }}
            >
              SINGAPORE
            </text>
          </>
        )}

        {/* Minimalist Telemetry Meta */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.25"
        >
          <text x="70" y="70">
            {isEducation ? "NTU // COMPUTER ENGINEERING" : "LZZ ATELIER // CAREER & SYSTEMS"}
          </text>
          <text x="930" y="70" textAnchor="end">
            SINGAPORE
          </text>
          <text x="70" y="745">
            {isEducation ? "FULL MERIT SCHOLARSHIP // U-WAVE" : "FULL-STACK & DISTRIBUTED SYSTEMS"}
          </text>
          <text x="930" y="745" textAnchor="end">
            {isEducation ? "CLASS OF 2021" : "2017–PRESENT"}
          </text>
        </g>
      </svg>
    </div>
  );
}
