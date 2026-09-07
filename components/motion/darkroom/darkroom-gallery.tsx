"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionPhysics } from "@/tokens";
import { useI18n } from "@/lib/i18n";
import {
  DARKROOM_PHOTOS,
  MONO_MODES,
  type DarkroomPhoto,
  type MonoMode,
} from "@/lib/darkroom";
import { PhotoPlate } from "./photo-plate";
import { DarkroomLightbox } from "./darkroom-lightbox";

export type GalleryView = "masonry" | "reel" | "immersive";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/**
 * BRAWUKA-38 · The Darkroom gallery — three layout scrolls, one ink state.
 *
 * - masonry: CSS-columns fluid grid (no JS measuring → Zero CLS).
 * - reel: horizontal 35mm strip with sprocket rail; wheel maps to x-travel
 *   on desktop, native swipe on touch. `data-lenis-prevent` keeps the
 *   global inertial scroller from fighting the strip.
 * - immersive: full-bleed single frame stepper with telemetry rail.
 * Mono mode is gallery-global: one switch re-inks every plate at once.
 */
export function DarkroomGallery() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const [view, setView] = useState<GalleryView>("masonry");
  const [mode, setMode] = useState<MonoMode>("true");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [reelIndex, setReelIndex] = useState(0);
  const reelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const openAt = useCallback((photo: DarkroomPhoto) => {
    const i = DARKROOM_PHOTOS.findIndex((p) => p.id === photo.id);
    if (i >= 0) setLightboxIndex(i);
  }, []);

  /* Reel: track nearest frame for the telemetry rail + edge fade. */
  useEffect(() => {
    if (view !== "reel") return;
    const el = reelRef.current;
    if (!el) return;
    const onScroll = (): void => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
      let best = 0;
      let bestDist = Infinity;
      const center = el.scrollLeft + el.clientWidth / 2;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setReelIndex(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [view]);

  const stepReel = useCallback(
    (dir: 1 | -1) => {
      const el = reelRef.current;
      if (!el) return;
      el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 560), behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  return (
    <div>
      {/* Control deck: view switch + mono-color ink switch */}
      <div className="mb-6 flex flex-col gap-3 border-y border-border-plate py-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label={isZh ? "展厅排布模式" : "Gallery view layout"}
          className="flex items-center gap-1 rounded-sm border border-border-plate bg-chamber p-1 font-telemetry text-xs"
        >
          {[
            { id: "masonry" as const, label: t.photography.views.masonry, hint: isZh ? "流式网格排布" : "CSS columns masonry" },
            { id: "reel" as const, label: t.photography.views.reel, hint: isZh ? "胶卷横卷漫游" : "Horizontal reel scroll" },
            { id: "immersive" as const, label: t.photography.views.immersive, hint: isZh ? "大图单栏沉浸" : "Single column plate stack" },
          ].map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              title={v.hint}
              className={`cursor-pointer rounded-xs px-3 py-1.5 uppercase transition-colors ${
                view === v.id
                  ? "border border-border-strong bg-substrate font-semibold text-primary shadow-xs"
                  : "text-secondary hover:bg-surface/50 hover:text-primary"
              }`}
            >
              [{v.label}]
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 font-telemetry text-xs">
          <span className="tracking-[0.14em] text-muted">{t.photography.inkLabel}</span>
          <div role="radiogroup" aria-label={isZh ? "Mono-color 艺术模式" : "Mono-color art mode"} className="flex items-center gap-1 rounded-sm border border-border-plate bg-chamber p-1">
            {MONO_MODES.map((m) => (
              <button
                key={m.id}
                role="radio"
                aria-checked={mode === m.id}
                onClick={() => setMode(m.id)}
                title={m.hint}
                className={`cursor-pointer rounded-xs px-2.5 py-1 uppercase transition-colors ${
                  mode === m.id
                    ? "bg-ink-dominant font-semibold text-white shadow-xs"
                    : "text-secondary hover:bg-surface/50 hover:text-primary"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reel telemetry rail */}
      {view === "reel" && (
        <div className="mb-3 flex items-center justify-between font-telemetry text-[11px] tracking-[0.14em] text-muted">
          <span>
            REEL // {String(reelIndex + 1).padStart(2, "0")} / {String(DARKROOM_PHOTOS.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => stepReel(-1)} aria-label="上一帧" className="cursor-pointer border border-border-plate px-2 py-0.5 hover:border-ink-dominant hover:text-primary">
              ← PREV
            </button>
            <button onClick={() => stepReel(1)} aria-label="下一帧" className="cursor-pointer border border-border-plate px-2 py-0.5 hover:border-ink-dominant hover:text-primary">
              NEXT →
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {view === "masonry" && (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
              {DARKROOM_PHOTOS.map((photo, i) => (
                <PhotoPlate key={photo.id} photo={photo} mode={mode} onOpen={openAt} eager={i < 2} />
              ))}
            </div>
          )}

          {view === "reel" && (
            <div className="overflow-hidden rounded-lg border border-border-plate bg-surface">
              {/* 35mm sprocket rail */}
              <div aria-hidden className="flex items-center justify-between border-b border-border-plate px-4 py-2 opacity-70">
                {Array.from({ length: 24 }, (_, i) => (
                  <span key={i} className="inline-block h-2.5 w-4 rounded-[2px] border border-border-plate bg-chamber" />
                ))}
              </div>
              <div
                ref={reelRef}
                data-lenis-prevent
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-5"
              >
                {DARKROOM_PHOTOS.map((photo) => (
                  <div key={photo.id} data-frame className="w-[78vw] shrink-0 snap-center sm:w-[420px]">
                    <PhotoPlate photo={photo} mode={mode} onOpen={openAt} />
                  </div>
                ))}
              </div>
              <div aria-hidden className="flex items-center justify-between border-t border-border-plate px-4 py-2 opacity-70">
                {Array.from({ length: 24 }, (_, i) => (
                  <span key={i} className="inline-block h-2.5 w-4 rounded-[2px] border border-border-plate bg-chamber" />
                ))}
              </div>
            </div>
          )}

          {view === "immersive" && (
            <ImmersiveFrame mode={mode} onOpen={openAt} reduced={reduced} />
          )}
        </motion.div>
      </AnimatePresence>

      <DarkroomLightbox
        index={lightboxIndex}
        mode={mode}
        onClose={() => setLightboxIndex(null)}
        onStep={setLightboxIndex}
      />
    </div>
  );
}

/* Full-bleed single frame with keyboard stepper + telemetry rail. */
function ImmersiveFrame({
  mode,
  onOpen,
  reduced,
}: {
  mode: MonoMode;
  onOpen: (photo: DarkroomPhoto) => void;
  reduced: boolean;
}) {
  const [i, setI] = useState(0);
  const photo = DARKROOM_PHOTOS[i];

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, DARKROOM_PHOTOS.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border-plate bg-surface">
      <div className="flex items-center justify-between border-b border-border-plate px-4 py-2 font-telemetry text-[11px] tracking-[0.14em] text-muted">
        <span>
          IMMERSIVE // {photo.frame} — {photo.title}
        </span>
        <span className="tabular-nums">
          {String(i + 1).padStart(2, "0")} / {String(DARKROOM_PHOTOS.length).padStart(2, "0")}
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={photo.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }}
          transition={{ type: "spring", ...motionPhysics.springs.trayFloat }}
        >
          <PhotoPlate photo={photo} mode={mode} onOpen={onOpen} eager />
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between border-t border-border-plate px-4 py-3">
        <button
          onClick={() => setI((v) => Math.max(v - 1, 0))}
          disabled={i === 0}
          className="cursor-pointer border border-border-plate px-3 py-1 font-telemetry text-xs text-secondary hover:border-ink-dominant hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← PREV
        </button>
        <div className="flex gap-1.5">
          {DARKROOM_PHOTOS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setI(idx)}
              aria-label={`跳转到 ${p.title}`}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${idx === i ? "w-8 bg-ink-dominant" : "w-3 bg-border-plate hover:bg-ink-dominant/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setI((v) => Math.min(v + 1, DARKROOM_PHOTOS.length - 1))}
          disabled={i === DARKROOM_PHOTOS.length - 1}
          className="cursor-pointer border border-border-plate px-3 py-1 font-telemetry text-xs text-secondary hover:border-ink-dominant hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
