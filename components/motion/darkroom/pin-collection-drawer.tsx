"use client";

import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { MapPin as MapPinIcon, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { DarkroomPhoto, MonoMode } from "@/lib/darkroom";
import type { PhotoMapPin } from "@/lib/photo-map";
import { MotionDomMax } from "../lazy-motion-dom-max";
import { PhotoPlate } from "./photo-plate";

interface PinCollectionDrawerProps {
  readonly pin: PhotoMapPin | null;
  readonly mode: MonoMode;
  readonly reducedMotion: boolean;
  readonly onClose: () => void;
  readonly onOpenPhoto?: (photo: DarkroomPhoto) => void;
}

/**
 * BRAWUKA-271 · Pin collection slide-over drawer.
 *
 * Extracted from PhotoMap and loaded via next/dynamic: it is the map's only
 * framer-motion consumer (drawer slide + PhotoPlate layout reflow), so
 * deferring it keeps the whole animation runtime out of the /photography
 * first-load chunk.
 */
export function PinCollectionDrawer({
  pin,
  mode,
  reducedMotion,
  onClose,
  onOpenPhoto,
}: PinCollectionDrawerProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <MotionDomMax>
      <AnimatePresence>
        {pin && (
          <m.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto absolute top-16 right-4 bottom-12 left-4 z-30 flex w-auto max-w-md flex-col overflow-hidden rounded-sm border-2 border-border-strong bg-surface shadow-2xl sm:top-20 sm:right-8 sm:bottom-14 sm:left-auto sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="collection-title"
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-border-default bg-chamber p-4 sm:p-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-telemetry text-[11px] font-bold tracking-widest uppercase text-ink-dominant">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  <span>{pin.primaryPhoto.frame} · {isZh ? "已定位" : "LOCATED"}</span>
                </div>
                <h2 id="collection-title" className="font-display text-2xl font-normal text-primary">
                  {pin.title}
                </h2>
                <p className="font-telemetry text-xs text-muted">
                  {pin.locationName} · {pin.gpsRaw}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-sm p-1 text-muted hover:bg-surface hover:text-text-primary transition-colors"
                aria-label={isZh ? "关闭抽屉" : "Close drawer"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Collection Photo Plates List */}
            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6" data-lenis-prevent>
              <div className="space-y-1 font-telemetry text-[11px] text-muted">
                <p className="uppercase tracking-wider">
                  {isZh ? "底片展藏" : "DARKROOM SPECIMENS"} ({pin.photos.length})
                </p>
                <p className="text-[10px]">CAPTURED: {pin.takenAt}</p>
              </div>

              <div className="space-y-6">
                {pin.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="space-y-3 rounded-sm border border-border-plate bg-substrate p-3 sm:p-4"
                  >
                    <PhotoPlate
                      photo={photo}
                      mode={mode}
                      onOpen={onOpenPhoto}
                    />

                    <div className="flex items-center justify-between font-telemetry text-xs">
                      <span className="font-bold text-ink-dominant">{photo.frame}</span>
                      <button
                        type="button"
                        onClick={() => onOpenPhoto?.(photo)}
                        className="rounded-sm border border-border-default bg-surface px-2.5 py-1 font-semibold uppercase tracking-wider text-text-primary hover:border-ink-dominant hover:text-ink-dominant transition-colors"
                      >
                        {isZh ? "进入暗房检视 (LIGHTBOX)" : "ENTER DARKROOM"} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-border-default bg-chamber px-4 py-3 font-telemetry text-[11px] text-muted sm:px-6">
              <span className="tabular-nums">
                ILFORD & KODAK EMULSION · MULTIGRADE MONO
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </MotionDomMax>
  );
}
