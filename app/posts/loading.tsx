import React from "react";

/**
 * BRAWUKA-84 · Posts archive loading fallback.
 * Darkroom archive skeleton with ruled dividers and mono telemetry.
 */
export default function PostsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading posts archive"
      className="min-h-screen w-full bg-substrate px-6 py-12 text-primary sm:px-12 sm:py-16"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Eyebrow placeholder */}
        <div className="flex items-center justify-between border-b border-border-plate pb-4 font-telemetry text-xs uppercase tracking-widest text-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-dominant animate-pulse" />
            <span>ARCHIVE // READING ROOM</span>
          </div>
          <span>DEVELOPING...</span>
        </div>

        {/* Heading skeleton */}
        <div className="space-y-3">
          <div className="h-10 w-48 rounded-[2px] bg-chamber animate-pulse" />
          <div className="h-4 w-72 rounded-[2px] bg-chamber/70 animate-pulse" />
        </div>

        {/* Post list skeleton entries */}
        <div className="space-y-6 pt-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="space-y-2 border-b border-border-plate/60 pb-6"
            >
              <div className="flex items-center gap-3 font-telemetry text-xs text-muted">
                <div className="h-3 w-20 rounded-[2px] bg-chamber animate-pulse" />
                <span>·</span>
                <div className="h-3 w-16 rounded-[2px] bg-chamber animate-pulse" />
              </div>
              <div className="h-6 w-3/4 rounded-[2px] bg-chamber animate-pulse" />
              <div className="h-4 w-full rounded-[2px] bg-chamber/60 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
