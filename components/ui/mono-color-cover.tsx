"use client";

import React from "react";

interface MonoColorCoverProps {
  title: string;
  category?: string;
  tags?: string[];
  date?: string;
  readingTime?: number;
  wordCount?: number;
  className?: string;
}

export function MonoColorCover({
  title,
  category = "ESSAY",
  tags = [],
  date = "2026.09",
  readingTime = 5,
  wordCount = 1200,
  className = "",
}: MonoColorCoverProps) {
  // Generate a deterministic hash/number from title for specimen id & frame number
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const specimenNo = String((hash % 99) + 1).padStart(2, "0");
  const frameNo = `${(hash % 36) + 1}A`;
  const formattedCategory = category.toUpperCase();

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border-plate bg-substrate p-6 sm:p-8 shadow-elevated transition-colors duration-300 select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(var(--halftone-dot-color, rgba(33, 72, 184, 0.15)) 1.5px, transparent 1.5px)`,
        backgroundSize: `16px 16px`,
      }}
    >
      {/* Corner Precision Registration Marks */}
      <div className="pointer-events-none absolute top-3 left-3 flex h-6 w-6 items-center justify-center opacity-60 text-ink-dominant">
        <svg viewBox="0 0 24 24" className="h-full w-full stroke-current stroke-[1.5] fill-none">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-3 right-3 flex h-6 w-6 items-center justify-center opacity-60 text-ink-dominant">
        <svg viewBox="0 0 24 24" className="h-full w-full stroke-current stroke-[1.5] fill-none">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 w-6 items-center justify-center opacity-60 text-ink-dominant">
        <svg viewBox="0 0 24 24" className="h-full w-full stroke-current stroke-[1.5] fill-none">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center opacity-60 text-ink-dominant">
        <svg viewBox="0 0 24 24" className="h-full w-full stroke-current stroke-[1.5] fill-none">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>

      {/* Top 35mm Perforation Sprocket Header */}
      <div className="flex items-center justify-between border-b border-border-plate pb-2 font-telemetry text-[11px] font-bold tracking-widest text-ink-dominant opacity-85">
        <div className="flex items-center gap-3">
          <span className="rounded bg-ink-dominant/10 px-1.5 py-0.5 text-ink-dominant">
            KODAK 400TX
          </span>
          <span className="tracking-widest">[{frameNo}]</span>
          <span className="hidden sm:inline">SPECIMEN #{specimenNo}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-widest">{formattedCategory}</span>
          <span>·</span>
          <span>RISOGRAPH SPEC</span>
        </div>
      </div>

      {/* Left Print Calibration Ruler */}
      <div className="pointer-events-none absolute left-3 top-16 bottom-16 hidden w-4 flex-col justify-between opacity-40 sm:flex text-ink-dominant">
        <div className="h-px w-2 bg-current" />
        <div className="h-px w-3 bg-current" />
        <div className="h-px w-2 bg-current" />
        <div className="h-px w-4 bg-current" />
        <div className="h-px w-2 bg-current" />
        <div className="h-px w-3 bg-current" />
        <div className="h-px w-2 bg-current" />
      </div>

      {/* Main Content Body */}
      <div className="relative z-10 flex h-[calc(100%-48px)] flex-col justify-between pt-4 sm:pl-6 sm:pr-4">
        {/* Editorial Headline */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-border-plate/80 bg-chamber/60 px-2 py-0.5 font-telemetry text-[10px] tracking-wider text-text-secondary uppercase"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h2 className="line-clamp-3 font-display text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            {title}
          </h2>
        </div>

        {/* Bottom Technical Telemetry Cluster */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border-plate/60 pt-3 text-xs font-telemetry text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-[10px] uppercase text-muted/80 block">DATE FILED</span>
              <span className="font-semibold text-text-primary tabular-nums">{date.slice(0, 10)}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-muted/80 block">EST. READ</span>
              <span className="font-semibold text-ink-dominant tabular-nums">{readingTime} MIN</span>
            </div>
            {wordCount > 0 && (
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase text-muted/80 block">VOLUME</span>
                <span className="font-semibold text-text-primary tabular-nums">{wordCount} WORDS</span>
              </div>
            )}
          </div>

          {/* Micro Barcode Stamp */}
          <div className="flex items-center gap-1.5 opacity-70">
            <div className="flex h-5 items-center gap-[2px]">
              <div className="h-full w-[2px] bg-ink-dominant" />
              <div className="h-full w-[1px] bg-ink-dominant" />
              <div className="h-full w-[3px] bg-ink-dominant" />
              <div className="h-full w-[1px] bg-ink-dominant" />
              <div className="h-full w-[2px] bg-ink-dominant" />
              <div className="h-full w-[4px] bg-ink-dominant" />
              <div className="h-full w-[1px] bg-ink-dominant" />
            </div>
            <span className="font-mono text-[9px] tracking-tighter text-ink-dominant">
              LZZ-ATELIER-{specimenNo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
