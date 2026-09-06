import React from "react";

/**
 * BRAWUKA-84 · Products atelier loading fallback.
 * Mono-color laboratory skeleton.
 */
export default function ProductsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading products atelier"
      className="min-h-screen w-full bg-substrate px-6 py-12 text-primary sm:px-12 sm:py-16"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between border-b border-border-plate pb-4 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-dominant animate-pulse" />
            <span>LAB // ACTIVE EXPERIMENTS</span>
          </div>
          <span>DEVELOPING...</span>
        </div>

        <div className="space-y-4">
          <div className="h-10 w-48 rounded-[2px] bg-chamber animate-pulse" />
          <div className="h-4 w-80 rounded-[2px] bg-chamber/70 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-[2px] border border-border-plate bg-surface/50 p-5 space-y-3"
            >
              <div className="h-4 w-20 rounded-[2px] bg-chamber animate-pulse" />
              <div className="h-6 w-32 rounded-[2px] bg-chamber animate-pulse" />
              <div className="h-3 w-full rounded-[2px] bg-chamber/60 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
