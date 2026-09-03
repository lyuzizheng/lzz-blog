"use client";

import React from "react";
import Image from "next/image";
import type { DarkroomPhoto } from "@/lib/photos";
/**
 * BRAWUKA-38 · mono-color photo renderer.
 * Four modes, zero hardcoded inks — every plate derives from the
 * design-system CSS vars (day cobalt / night safelight-red), so the
 * Darkroom automatically follows the SafelightSwitch theme:
 * - normal: 真实底片色
 * - risograph: 双色孔版 — dominant 油墨 multiply 叠印 + accent 副版 screen
 * - cyanotype: 蓝晒 — dominant 加深版 multiply
 * - halftone: 单色网点 — grayscale + halftone-screen 点阵叠印
 */

export type MonoMode = "normal" | "risograph" | "cyanotype" | "halftone";

export const MONO_MODES: Array<{ id: MonoMode; label: string }> = [
  { id: "normal", label: "底片 TRUE" },
  { id: "risograph", label: "孔版 RISO" },
  { id: "cyanotype", label: "蓝晒 CYANO" },
  { id: "halftone", label: "网点 HALF" },
];

export interface MonoPhotoProps {
  photo: DarkroomPhoto;
  mode: MonoMode;
  eager?: boolean;
  className?: string;
}

export function MonoPhoto({ photo, mode, eager = false, className = "" }: MonoPhotoProps) {
  if (mode === "normal") {
    return (
      <Image
        src={photo.src}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={eager}
        draggable={false}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  if (mode === "halftone") {
    return (
      <span className={`relative block h-full w-full overflow-hidden ${className}`}>
        <Image
          src={photo.src}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={eager}
          draggable={false}
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.18) brightness(1.03)" }}
        />
        <span
          aria-hidden
          className="halftone-screen ink-overprint pointer-events-none absolute inset-0 opacity-45"
        />
      </span>
    );
  }

  // risograph / cyanotype: physical overprint — grayscale plate multiplied
  // onto an ink substrate, plus (riso) a faint accent second plate.
  const substrate =
    mode === "risograph"
      ? "var(--ink-dominant)"
      : "color-mix(in srgb, var(--ink-dominant) 62%, black)";
  return (
    <span
      className={`relative block h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: substrate }}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 80vw"
        priority={eager}
        draggable={false}
        className="h-full w-full object-cover"
        style={{
          filter: "grayscale(1) contrast(1.12) brightness(1.04)",
          mixBlendMode: "multiply",
        }}
      />
      {mode === "risograph" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--ink-accent) 26%, transparent)",
            mixBlendMode: "screen",
          }}
        />
      )}
      <span
        aria-hidden
        className="halftone-screen-dense pointer-events-none absolute inset-0 opacity-20"
      />
    </span>
  );
}
