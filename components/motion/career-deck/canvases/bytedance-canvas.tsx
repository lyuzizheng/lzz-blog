import React from "react";

interface BytedanceCanvasProps {
  mode?: "im" | "infra";
}

/**
 * Act 3 & 4 Thematic Canvas: Modernist Typographic Backdrop (ByteDance & TikTok)
 *
 * Mode "im" (/ Layout):
 *  - Top-Right: Solid bold "TIKTOK"
 *  - Bottom-Left: Razor-sharp outline "BYTEDANCE"
 * Mode "infra" (\ Layout):
 *  - Top-Left: Solid bold "BYTEDANCE"
 *  - Bottom-Right: Razor-sharp outline "INFRA"
 * Placed in corners to ensure 100% visibility without being occluded by center cards.
 */
export function BytedanceCanvas({ mode = "im" }: BytedanceCanvasProps) {
  const isIm = mode === "im";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background: isIm
            ? "radial-gradient(circle at 80% 25%, var(--ink-dominant) 0%, transparent 65%)"
            : "radial-gradient(circle at 20% 25%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      {isIm ? (
        <>
          {/* 1. Top-Right: Solid Bold TIKTOK */}
          <div className="absolute -top-2 sm:top-2 md:top-6 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span className="font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
              TIKTOK
            </span>
          </div>

          {/* 2. Bottom-Left: Razor-Sharp Outline BYTEDANCE */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.6px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.12,
              }}
            >
              BYTEDANCE
            </span>
          </div>
        </>
      ) : (
        <>


          {/* 1. Top-Left: Solid Bold BYTEDANCE */}
          <div className="absolute -top-2 sm:top-2 md:top-6 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12.5rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
              BYTEDANCE
            </span>
          </div>

          {/* 2. Bottom-Right: Razor-Sharp Outline RESILIENCE */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span
              className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11.5rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.6px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.12,
              }}
            >
              RESILIENCE
            </span>
          </div>
        </>
      )}
    </div>
  );
}
