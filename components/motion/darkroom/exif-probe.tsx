"use client";

import React from "react";
import type { DarkroomPhoto } from "@/lib/photos";

/**
 * BRAWUKA-38 · mechanical EXIF probe.
 * Only file-level facts (dimensions measured, size from disk, publishing
 * source). Camera EXIF was stripped at publish time — the probe says so
 * explicitly instead of inventing bodies/lenses/exposure values.
 */

export function formatTelemetry(photo: DarkroomPhoto): string {
  const ext = photo.src.split(".").pop()?.toUpperCase() ?? "IMG";
  return `${photo.width}×${photo.height} · ${ext} · ${photo.sizeKB}KB`;
}

export function ExifProbe({ photo, className = "" }: { photo: DarkroomPhoto; className?: string }) {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(photo.width, photo.height);
  const aspect = `${photo.width / divisor}:${photo.height / divisor}`;
  return (
    <div
      className={`rounded border border-border-plate bg-substrate/95 p-3 font-telemetry text-[11px] leading-relaxed backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border-plate pb-1.5">
        <span className="tracking-[0.14em] text-ink-dominant">{photo.id} {"//"} PROBE</span>
        <a href={photo.source.href} className="text-muted hover:text-primary">
          {photo.source.label} ↗
        </a>
      </div>
      <dl className="mt-1.5 space-y-1 tabular-nums">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">FRAME</dt>
          <dd className="text-primary">
            {photo.width}×{photo.height} · {aspect}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">FILE</dt>
          <dd className="text-primary">
            {photo.src.split(".").pop()?.toUpperCase()} · {photo.sizeKB}KB
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">CAMERA EXIF</dt>
          <dd className="text-muted">已剥离 — 禁止编造</dd>
        </div>
      </dl>
      <p className="mt-1.5 border-t border-border-plate pt-1.5 text-secondary">{photo.title}</p>
    </div>
  );
}
