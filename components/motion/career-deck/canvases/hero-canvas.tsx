import React from "react";

interface HeroCanvasProps {
  mode?: "hero" | "education";
}

/**
 * Act 0 & 5 Thematic Canvas: Modernist Typographic Backdrop (Profile & NTU)
 *
 * Mode "hero" (\ Layout):
 *  - Top-Left: Solid bold "PROFILE"
 *  - Bottom-Right: Razor-sharp outline "SINGAPORE"
 * Mode "education" (/ Layout):
 *  - Top-Right: Solid bold "NTU"
 *  - Bottom-Left: Razor-sharp outline "SINGAPORE"
 * Placed in corners to ensure 100% visibility without being occluded by center cards.
 */
export function HeroCanvas({ mode = "hero" }: HeroCanvasProps) {
  const isEducation = mode === "education";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background: isEducation
            ? "radial-gradient(circle at 80% 25%, var(--ink-dominant) 0%, transparent 65%)"
            : "radial-gradient(circle at 20% 25%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      {isEducation ? (
        <>
          {/* Subtle corner architectural telemetry */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30">
            <span>+ 05 // NTU · COMPUTER ENGINEERING</span>
          </div>
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30 text-right">
            <span>FULL MERIT SCHOLARSHIP // HONORS +</span>
          </div>

          {/* 1. Top-Right: Solid Bold NTU */}
          <div className="absolute -top-2 sm:top-2 md:top-6 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span className="font-display text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
              NTU
            </span>
          </div>

          {/* 2. Bottom-Left: Razor-Sharp Outline SINGAPORE */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.6px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.12,
              }}
            >
              SINGAPORE
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Subtle corner architectural telemetry */}
          <div className="absolute top-3 right-3 sm:top-6 sm:right-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30 text-right">
            <span>+ 00 // OVERVIEW · LZZ ATELIER</span>
          </div>
          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30">
            <span>PRODUCT &amp; SYSTEMS ENGINEER +</span>
          </div>

          {/* 1. Top-Left: Solid Bold PROFILE */}
          <div className="absolute -top-2 sm:top-2 md:top-6 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12.5rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
              PROFILE
            </span>
          </div>

          {/* 2. Bottom-Right: Razor-Sharp Outline SINGAPORE */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.6px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.12,
              }}
            >
              SINGAPORE
            </span>
          </div>
        </>
      )}
    </div>
  );
}
