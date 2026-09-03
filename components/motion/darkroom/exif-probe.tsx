"use client";

import React from "react";
import { motion } from "framer-motion";
import { motionPhysics } from "@/tokens";
import { darkroomReadoutRows, type DarkroomPhoto } from "@/lib/darkroom";

/**
 * BRAWUKA-38 · Mechanical EXIF probe.
 * Hover / focus / long-press summons a monospace telemetry panel
 * (DESIGN.md §5.3, §7.3). Opacity + translate only — compositor work,
 * zero layout shift. `tabular-nums` pins every digit column.
 */
export function ExifProbe({ photo, visible }: { photo: DarkroomPhoto; visible: boolean }) {
  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ type: "spring", ...motionPhysics.springs.snappy }}
      className="pointer-events-none absolute inset-x-2 bottom-2 z-20 rounded-sm border border-border-plate bg-chamber/95 p-2.5 shadow-elevated backdrop-blur-sm"
    >
      <div className="mb-1.5 flex items-center justify-between border-b border-border-plate pb-1 font-telemetry text-[10px] tracking-[0.12em] text-muted">
        <span>EXIF // MECHANICAL PROBE</span>
        <span className="text-safelight">{photo.frame}</span>
      </div>
      <dl className="space-y-1 font-telemetry text-[10px] leading-relaxed tabular-nums">
        {darkroomReadoutRows(photo.exif).map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="w-24 shrink-0 tracking-[0.08em] text-muted">{k}</dt>
            <dd className="min-w-0 flex-1 truncate text-primary">{v}</dd>
          </div>
        ))}
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 tracking-[0.08em] text-muted">CHEMISTRY</dt>
          <dd className="min-w-0 flex-1 truncate text-terracotta">{photo.chemistry}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
