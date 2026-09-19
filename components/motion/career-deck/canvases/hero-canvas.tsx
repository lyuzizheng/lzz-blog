import React from "react";

interface HeroCanvasProps {
  mode?: "hero" | "education";
}

/**
 * Act 0 & 5 Thematic Canvas: Modernist Typographic Backdrop (Profile & Products/NTU)
 *
 * Mode "hero" (\ Layout):
 *  - Top-Left: Solid bold "PROFILE"
 *  - Bottom-Right: Razor-sharp outline "SINGAPORE"
 * Mode "education" (/ Layout):
 *  - Top-Right: Solid bold "PRODUCTS"
 *  - Bottom-Left: Razor-sharp outline "NTU"
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
          {/* 1. Top-Right: Solid Bold PRODUCTS */}
          <div className="absolute -top-2 sm:top-2 md:top-6 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.035] dark:opacity-[0.045]">
              PRODUCTS
            </span>
          </div>

          {/* 2. Bottom-Left: Razor-Sharp Outline NTU */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span
              className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.2px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.055,
              }}
            >
              NTU
            </span>
          </div>
        </>
      ) : (
        <>
          {/* 1. Top-Left: Solid Bold PROFILE */}
          <div className="absolute -top-2 sm:top-2 md:top-6 left-2 sm:left-6 md:left-10 text-left leading-none">
            <span className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12.5rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.035] dark:opacity-[0.045]">
              PROFILE
            </span>
          </div>

          {/* 2. Bottom-Right: Razor-Sharp Outline SINGAPORE */}
          <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 right-2 sm:right-6 md:right-10 text-right leading-none">
            <span
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
              style={{
                WebkitTextStroke: "1.2px var(--ink-dominant)",
                color: "transparent",
                opacity: 0.055,
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
