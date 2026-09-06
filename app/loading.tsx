import React from "react";

/**
 * BRAWUKA-84 · Root / Atelier workbench loading fallback.
 * Renders an instant darkroom exposure shell during Next.js streaming / hydration.
 *
 * 0 CLS: fixed 100dvh matching HomePage layout.
 * Monochrome darkroom aesthetic: border-plate, chamber substrate, ink-dominant aperture.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading darkroom atelier"
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-substrate text-primary"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-[2px] border border-border-plate bg-surface shadow-[var(--shadow-plate)]">
          <div className="h-6 w-6 rounded-full border border-dashed border-ink-dominant/50 animate-spin [animation-duration:6s]" />
          <div className="absolute h-2 w-2 rounded-full bg-ink-dominant" />
        </div>
        <div className="flex items-center gap-2 font-telemetry text-[10px] uppercase tracking-[0.24em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-dominant animate-pulse" />
          <span>DEVELOPING EXPOSURE // 35MM</span>
        </div>
      </div>
    </div>
  );
}
