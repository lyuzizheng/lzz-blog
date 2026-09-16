"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  DARKROOM_PHOTOS,
  type DarkroomPhoto,
  type MonoMode,
} from "@/lib/darkroom";
import { PhotoMap } from "./photo-map";

/* BRAWUKA-271: the lightbox stays off the first-load chunk and mounts on
   first use. ssr:false keeps it out of the SSR preload list; the page-level
   <noscript> fallback covers no-JS crawlers. */
const DarkroomLightbox = dynamic(
  () => import("./darkroom-lightbox").then((mod) => mod.DarkroomLightbox),
  { ssr: false }
);

/**
 * BRAWUKA-343 · Photography Master View
 *
 * The Darkroom Atlas (OSM world map + GPS pins) is the single, official
 * /photography interface — the classic masonry gallery is retired (Owner
 * directive 2026-09-16). The shared physical lightbox survives as the map's
 * photo inspector: pin → collection drawer → lightbox.
 */
export function PhotographyMasterView() {
  const mode: MonoMode = "true";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  /* Mount the lightbox chunk only after the first open; keep it mounted
     afterwards so AnimatePresence can play the exit animation. */
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const openPhoto = useCallback((photo: DarkroomPhoto) => {
    const index = DARKROOM_PHOTOS.findIndex((p) => p.id === photo.id);
    if (index >= 0) {
      setLightboxMounted(true);
      setLightboxIndex(index);
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
      <PhotoMap mode={mode} onOpenPhoto={openPhoto} />
      {/* Shared Physical Lightbox — deferred chunk mounts on first open, then
          stays mounted for exit animations. */}
      {lightboxMounted && (
        <DarkroomLightbox
          index={lightboxIndex}
          mode={mode}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}
    </div>
  );
}
