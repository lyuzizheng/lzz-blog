import React from "react";

interface BytedanceCanvasProps {
  mode?: "im" | "infra";
}

/**
 * Act 3 & 4 Thematic Canvas: Modernist Typographic Backdrop (ByteDance & TikTok)
 *
 * Clean, architectural branding backdrop:
 * - Bold layered brand names: BYTEDANCE + TIKTOK
 * - Solid faint ink fill + razor-sharp hollow outline
 * - Mode support: "im" vs "infra"
 * - Minimalist corner framing & subtle ambient wash
 */
export function BytedanceCanvas({ mode = "im" }: BytedanceCanvasProps) {
  const isIm = mode === "im";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient background wash */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, var(--ink-dominant) 0%, transparent 65%)",
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
        {isIm ? (
          <>
            {/* 1. Primary Solid: TIKTOK */}
            <text
              x="500"
              y="370"
              textAnchor="middle"
              fill="var(--ink-dominant)"
              opacity="0.04"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "175px", letterSpacing: "-0.05em" }}
            >
              TIKTOK
            </text>

            {/* 2. Secondary Outline: BYTEDANCE */}
            <text
              x="500"
              y="490"
              textAnchor="middle"
              fill="none"
              stroke="var(--ink-dominant)"
              strokeWidth="1.6"
              opacity="0.065"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "120px", letterSpacing: "-0.04em" }}
            >
              BYTEDANCE
            </text>
          </>
        ) : (
          <>
            {/* 1. Primary Solid: BYTEDANCE */}
            <text
              x="500"
              y="370"
              textAnchor="middle"
              fill="var(--ink-dominant)"
              opacity="0.04"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "145px", letterSpacing: "-0.05em" }}
            >
              BYTEDANCE
            </text>

            {/* 2. Secondary Outline: INFRA */}
            <text
              x="500"
              y="490"
              textAnchor="middle"
              fill="none"
              stroke="var(--ink-dominant)"
              strokeWidth="1.6"
              opacity="0.065"
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "135px", letterSpacing: "-0.04em" }}
            >
              INFRA
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
            {isIm ? "TIKTOK // SOCIAL MESSAGING CORE" : "BYTEDANCE // OVERSEAS INFRASTRUCTURE"}
          </text>
          <text x="930" y="70" textAnchor="end">
            SINGAPORE R&amp;D CENTER
          </text>
          <text x="70" y="745">
            {isIm
              ? "PRESENCE ENGINE // 20+ GO MICROSERVICES"
              : "LOCATION PLATFORM // SPARK ETL"}
          </text>
          <text x="930" y="745" textAnchor="end">
            {isIm ? "7×24 ONCALL" : "MULTI-DC SYNC"}
          </text>
        </g>
      </svg>
    </div>
  );
}
