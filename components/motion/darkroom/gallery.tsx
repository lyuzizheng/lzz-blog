"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { motionPhysics } from "@/tokens";
import { DARKROOM_PHOTOS, aspectRatio, type DarkroomPhoto } from "@/lib/photos";
import { usePrefersReducedMotion } from "@/components/motion/flight-path";
import { MonoPhoto, MONO_MODES, type MonoMode } from "./mono-photo";
import { ExifProbe, formatTelemetry } from "./exif-probe";
import { LightboxHost } from "./lightbox";

/**
 * BRAWUKA-38 · The Darkroom gallery.
 * Three arrangements: masonry 瀑布流 / reel 胶卷横卷 / immersive 沉浸大图.
 * Every frame reserves its aspect ratio up front (Zero CLS); the EXIF
 * probe appears on hover/focus/tap; any click opens the physical Lightbox.
 */

export type GalleryView = "masonry" | "reel" | "immersive";

const VIEW_TABS: Array<{ id: GalleryView; label: string }> = [
  { id: "masonry", label: "瀑布 MASONRY" },
  { id: "reel", label: "胶卷 REEL" },
  { id: "immersive", label: "沉浸 IMMERSE" },
];

export function DarkroomGallery({ photos = DARKROOM_PHOTOS }: { photos?: DarkroomPhoto[] }) {
  const [view, setView] = useState<GalleryView>("masonry");
  const [mode, setMode] = useState<MonoMode>("normal");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <div className="darkroom">
      {/* Control deck */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-1 rounded border border-border-plate bg-chamber p-1 font-telemetry text-[11px]"
          role="tablist"
          aria-label="展厅排布"
        >
          {VIEW_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={view === t.id}
              onClick={() => setView(t.id)}
              className={`cursor-pointer rounded-xs px-3 py-1.5 ${
                view === t.id
                  ? "bg-substrate font-semibold text-primary shadow-xs"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded border border-border-plate bg-chamber p-1 font-telemetry text-[11px]">
          {MONO_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={`cursor-pointer rounded-xs px-2.5 py-1.5 ${
                mode === m.id
                  ? "bg-substrate font-semibold text-primary shadow-xs"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {view === "masonry" && (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo, i) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              mode={mode}
              index={i}
              total={photos.length}
              reduced={reduced}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>
      )}

      {view === "reel" && (
        <div className="overflow-hidden rounded-lg border border-border-plate bg-surface">
          <SprocketRail />
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-3">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`打开 ${photo.title}`}
                className="h-64 w-auto shrink-0 cursor-pointer snap-center overflow-hidden rounded border border-border-plate focus-visible:outline-2 focus-visible:outline-ink-dominant"
                style={{ aspectRatio: aspectRatio(photo) }}
              >
                <MonoPhoto photo={photo} mode={mode} />
              </button>
            ))}
          </div>
          <SprocketRail />
        </div>
      )}

      {view === "immersive" && (
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {photos.map((photo, i) => (
            <figure key={photo.id} className="overflow-hidden rounded-lg border border-border-plate bg-surface">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`打开 ${photo.title}`}
                className="block w-full cursor-pointer"
                style={{ aspectRatio: aspectRatio(photo) }}
              >
                <MonoPhoto photo={photo} mode={mode} />
              </button>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border-plate px-4 py-2.5 font-telemetry text-[11px] text-muted tabular-nums">
                <span>
                  {photo.id} · {photo.title}
                </span>
                <span>{formatTelemetry(photo)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <LightboxHost
        open={lightbox !== null}
        photos={photos}
        index={lightbox ?? 0}
        mode={mode}
        onIndex={(next) => setLightbox(next)}
        onMode={setMode}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}

function SprocketRail() {
  return (
    <div className="flex items-center justify-between px-4 py-1.5" aria-hidden>
      <div className="flex gap-1.5">
        {Array.from({ length: 24 }).map((_, k) => (
          <span key={k} className="inline-block h-2 w-3 rounded-[2px] bg-ink-dominant/30" />
        ))}
      </div>
      <span className="font-telemetry text-[10px] text-muted">KODAK 400TX</span>
    </div>
  );
}

interface GalleryCardProps {
  photo: DarkroomPhoto;
  mode: MonoMode;
  index: number;
  total: number;
  reduced: boolean;
  onOpen: () => void;
}

function GalleryCard({ photo, mode, index, total, reduced, onOpen }: GalleryCardProps) {
  const [probe, setProbe] = useState(false);
  const card = (
    <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border-plate bg-surface">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`打开 ${photo.title}（第 ${index + 1} / ${total} 张）`}
        className="block w-full cursor-pointer"
        style={{ aspectRatio: aspectRatio(photo) }}
        onMouseEnter={() => setProbe(true)}
        onMouseLeave={() => setProbe(false)}
        onFocus={() => setProbe(true)}
        onBlur={() => setProbe(false)}
      >
        <MonoPhoto photo={photo} mode={mode} eager={index < 3} />
      </button>
      {/* Frame footer */}
      <div className="flex items-center justify-between border-t border-border-plate px-3 py-1.5 font-telemetry text-[10px] text-muted tabular-nums">
        <span>
          {photo.id} · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => setProbe((v) => !v)}
          aria-expanded={probe}
          className="cursor-pointer text-ink-dominant hover:underline"
        >
          EXIF {probe ? "−" : "+"}
        </button>
      </div>
      {/* Probe overlay */}
      <div
        className={`absolute inset-x-3 bottom-10 transition-opacity duration-200 ${
          probe ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ExifProbe photo={photo} />
      </div>
    </div>
  );
  if (reduced) return card;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", ...motionPhysics.springs.trayFloat }}
    >
      {card}
    </motion.div>
  );
}
