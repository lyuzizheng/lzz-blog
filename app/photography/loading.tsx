import React from "react";

/**
 * BRAWUKA-84 · Photography gallery & map loading fallback.
 * Darkroom light table skeleton with aperture pulse.
 */
export default function PhotographyLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading photography darkroom"
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-substrate text-primary"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[2px] border border-border-plate bg-surface shadow-[var(--shadow-plate)]">
          <div className="h-8 w-8 rounded-full border border-dashed border-ink-dominant/60 animate-spin [animation-duration:8s]" />
          <div className="absolute h-2.5 w-2.5 rounded-full bg-ink-dominant animate-ping" />
        </div>
        <div className="flex items-center gap-2 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-dominant animate-pulse" />
          <span>CALIBRATING LIGHT TABLE // 35MM NEGATIVES</span>
        </div>
      </div>
    </div>
  );
}
