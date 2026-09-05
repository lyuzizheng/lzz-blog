"use client";

import React, { useState, useCallback } from "react";
import {
  DARKROOM_PHOTOS,
  type DarkroomPhoto,
  type MonoMode,
} from "@/lib/darkroom";
import { PhotoMap } from "./photo-map";
import { DarkroomGallery } from "./darkroom-gallery";
import { DarkroomLightbox } from "./darkroom-lightbox";
import { PhotographyHeader } from "./photography-header";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Map, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export type PhotographyMainView = "map" | "gallery";

interface PhotographyMasterViewProps {
  readonly initialView?: PhotographyMainView;
}

/**
 * BRAWUKA-65 · Photography Master View
 *
 * Defaults to the full-screen interactive paper map with visited pins (Phase 2-4).
 * Supports seamless switching to the classic masonry/reel/immersive gallery (BRAWUKA-38),
 * sharing a single physical Lightbox instance so navigation flow is never broken.
 */
export function PhotographyMasterView({
  initialView = "map",
}: PhotographyMasterViewProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const [activeView, setActiveView] = useState<PhotographyMainView>(initialView);
  const [mode, setMode] = useState<MonoMode>("true");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openPhoto = useCallback((photo: DarkroomPhoto) => {
    const idx = DARKROOM_PHOTOS.findIndex((p) => p.id === photo.id);
    if (idx >= 0) {
      setLightboxIndex(idx);
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const stepLightbox = useCallback((next: number) => {
    setLightboxIndex(next);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-substrate text-primary">
      {activeView === "map" ? (
        <PhotoMap
          photos={DARKROOM_PHOTOS}
          mode={mode}
          onOpenPhoto={openPhoto}
          onSwitchToMasonry={() => setActiveView("gallery")}
        />
      ) : (
        <div className="relative flex min-h-screen flex-col justify-between">
          <SiteHeader />

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
            {/* Top Switcher Bar to return to Map */}
            <div className="mb-6 flex items-center justify-between border-b border-border-default pb-3">
              <div className="flex items-center gap-2 font-telemetry text-xs text-muted">
                <span className="font-bold uppercase tracking-wider text-ink-dominant">
                  THE DARKROOM
                </span>
                <span>/</span>
                <span>{isZh ? "传统画廊视图" : "MASONRY & REEL ARCHIVE"}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveView("map")}
                className="flex items-center gap-1.5 rounded-sm border-2 border-border-strong bg-surface px-3 py-1.5 font-telemetry text-xs font-bold uppercase tracking-wider text-ink-dominant hover:bg-chamber transition-colors shadow-xs"
                title={isZh ? "切换至全屏漫游地图" : "Switch to Fullscreen Map"}
              >
                <Map className="h-3.5 w-3.5" />
                <span>{isZh ? "返回全屏漫游地图" : "RETURN TO MAP"} →</span>
              </button>
            </div>

            <PhotographyHeader />

            <DarkroomGallery />
          </main>

          <SiteFooter variant="darkroom" />
        </div>
      )}

      {/* Shared Physical Lightbox on top of both Map and Gallery */}
      <DarkroomLightbox
        index={lightboxIndex}
        mode={mode}
        onClose={closeLightbox}
        onStep={stepLightbox}
      />
    </div>
  );
}
