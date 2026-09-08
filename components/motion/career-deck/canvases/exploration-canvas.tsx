import React from "react";

/**
 * Act 2 Thematic Canvas: Modernist Typographic Backdrop (MariBank & SeaMoney & Bondee)
 *
 * Diagonal Composition (\ Layout):
 * - Top-Left: Solid bold "MARIBANK"
 * - Bottom-Right: Razor-sharp outline "SEAMONEY"
 * - Bottom-Left: Subtle accent "BONDEE"
 * Placed in corners to ensure 100% visibility without being occluded by center cards.
 */
export function ExplorationCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      {/* Subtle corner architectural hairline crosshairs */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30 text-right">
        <span>+ 02 // MARIBANK · SEAMONEY · BONDEE</span>
      </div>
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30">
        <span>MAS REGULATED // DISTRIBUTED LEDGER +</span>
      </div>

      {/* 1. Top-Left: Solid Bold MARIBANK */}
      <div className="absolute -top-2 sm:top-2 md:top-6 left-2 sm:left-6 md:left-10 text-left leading-none">
        <span className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12.5rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
          MARIBANK
        </span>
      </div>

      {/* 2. Bottom-Right: Razor-Sharp Outline SEAMONEY */}
      <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 right-2 sm:right-6 md:right-10 text-right leading-none">
        <span
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter leading-none"
          style={{
            WebkitTextStroke: "1.6px var(--ink-dominant)",
            color: "transparent",
            opacity: 0.12,
          }}
        >
          SEAMONEY
        </span>
      </div>

      {/* 3. Bottom-Left Accent: BONDEE */}
      <div className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-3 sm:left-8 md:left-12 text-left leading-none hidden sm:block">
        <span className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-ink-dominant opacity-[0.045] dark:opacity-[0.065]">
          BONDEE
        </span>
      </div>
    </div>
  );
}
