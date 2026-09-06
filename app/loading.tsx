import React from "react";

/**
 * BRAWUKA-84 / BRAWUKA-92 · Root / Atelier workbench loading fallback.
 * Renders an instant darkroom / daylight exposure shell during Next.js streaming / hydration.
 *
 * 0 CLS: fixed 100dvh matching HomePage layout.
 * Dual-mode aesthetic:
 *   - Night: Safelight Darkroom (Obsidian substrate #100F0E, Safelight Red #E05454)
 *   - Day: Daylight Atelier (Paper substrate #F5F1E8, Cobalt Blue #2148B8)
 * Bilingual support:
 *   - English: DEVELOPING EXPOSURE // 35MM
 *   - Chinese: 胶片显影中 // 35MM
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-substrate text-primary"
    >
      <span className="sr-only veil-text-en">Loading darkroom atelier</span>
      <span className="sr-only veil-text-zh">暗房显影加载中</span>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-[2px] border border-border-plate bg-surface shadow-[var(--shadow-plate)]">
          <div className="h-6 w-6 rounded-full border border-dashed border-ink-dominant/50 animate-spin [animation-duration:6s]" />
          <div className="absolute h-2 w-2 rounded-full bg-ink-dominant" />
        </div>
        <div className="flex items-center gap-2 font-telemetry text-[10px] uppercase tracking-[0.24em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-dominant animate-pulse" />
          <span className="veil-text-en">DEVELOPING EXPOSURE // 35MM</span>
          <span className="veil-text-zh">胶片显影中 // 35MM</span>
        </div>
      </div>
    </div>
  );
}
