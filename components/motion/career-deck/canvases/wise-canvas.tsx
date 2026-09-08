import React from "react";

/**
 * Act 1 Thematic Canvas: Modernist Typographic Backdrop (Wise Payments)
 *
 * Diagonal Composition (/ Layout):
 * - Top-Right: Solid bold "WISE"
 * - Bottom-Left: Razor-sharp outline "PAYMENTS"
 * Placed in corners to ensure 100% visibility without being occluded by center cards.
 */
export function WiseCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 25%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      {/* Subtle corner architectural hairline crosshairs */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30">
        <span>+ 01 // WISE · PAYOUTS DEFECTS</span>
      </div>
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-8 font-telemetry text-[9px] uppercase tracking-widest text-ink-dominant opacity-30 text-right">
        <span>LONDON · SINGAPORE // £80K/MO +</span>
      </div>

      {/* 1. Top-Right: Solid Bold WISE */}
      <div className="absolute -top-2 sm:top-2 md:top-6 right-2 sm:right-6 md:right-10 text-right leading-none">
        <span className="font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] font-black uppercase tracking-tighter leading-none text-ink-dominant opacity-[0.07] dark:opacity-[0.09]">
          WISE
        </span>
      </div>

      {/* 2. Bottom-Left: Razor-Sharp Outline PAYMENTS */}
      <div className="absolute -bottom-2 sm:bottom-3 md:bottom-8 left-2 sm:left-6 md:left-10 text-left leading-none">
        <span
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-black uppercase tracking-tighter leading-none"
          style={{
            WebkitTextStroke: "1.6px var(--ink-dominant)",
            color: "transparent",
            opacity: 0.12,
          }}
        >
          PAYMENTS
        </span>
      </div>
    </div>
  );
}
