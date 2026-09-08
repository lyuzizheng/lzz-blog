"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { motionPhysics } from "@/tokens";
import { useI18n } from "@/lib/i18n";
import type { DarkroomPhoto, MonoMode } from "@/lib/darkroom";
import { ExifProbe } from "./exif-probe";

/**
 * BRAWUKA-38 · Photo plate with mono-color ink modes.
 *
 * - No `src` → deterministic duotone SVG specimen plate (seeded by id),
 *   so the gallery stands without binary assets. Real captures
 *   (`public/darkroom/*.avif`) slot into the same frame later.
 * - Mono-color is physical: grayscale conversion + dominant/accent ink
 *   overprint layers (`multiply`/`screen`, theme-aware vars) + halftone
 *   dot overlay. CSS only — no canvas, no per-frame JS, no jank.
 * - Fixed `aspect-ratio` from intrinsic w/h → Zero CLS by construction.
 */

function seedOf(id: string): number {
  return id.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
}

/** Deterministic specimen artwork: sun-arc + ridge masses + paper cut. */
function SpecimenArt({ photo }: { photo: DarkroomPhoto }) {
  const seed = seedOf(photo.id);
  const w = 400;
  const h = Math.round((400 * photo.height) / photo.width);
  const sunX = 90 + (seed % 220);
  const sunY = 70 + (seed % 90);
  const ridge = (seed % 5) + 2;
  const ridges = Array.from({ length: ridge }, (_, i) => {
    const y = h * (0.45 + (i * 0.52) / ridge);
    const amp = 14 + ((seed >> (i + 2)) % 22);
    return `M0 ${y} Q ${w * 0.25} ${y - amp}, ${w * 0.5} ${y} T ${w} ${y - amp / 2} V ${h} H 0 Z`;
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={photo.alt}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={w} height={h} fill="var(--bg-chamber)" />
      <circle cx={sunX} cy={sunY} r={34 + (seed % 26)} fill="var(--ink-dominant)" opacity="0.85" />
      <circle cx={sunX} cy={sunY} r={52 + (seed % 20)} fill="none" stroke="var(--ink-accent)" strokeWidth="2" opacity="0.7" />
      {ridges.map((d, i) => (
        <path key={i} d={d} fill={i % 2 ? "var(--ink-dominant)" : "var(--ink-accent)"} opacity={0.28 + i * 0.12} />
      ))}
      {/* Exposed-paper cut: the sheet tears through the ink mass */}
      <polygon
        points={`0,${h} ${w * 0.38},${h * 0.62} ${w * 0.55},${h} `}
        fill="var(--bg-substrate)"
        opacity="0.9"
      />
      <text
        x={w - 12}
        y={h - 12}
        textAnchor="end"
        fontSize="13"
        letterSpacing="2"
        fill="var(--text-muted)"
        fontFamily="var(--font-geist-mono), monospace"
      >
        {photo.frame}
      </text>
    </svg>
  );
}

const IMG_FILTER: Record<MonoMode, string> = {
  true: "none",
  // Physical duotone: neutral silver gelatin base, inks arrive as overprint layers.
  riso: "grayscale(1) contrast(1.18) brightness(1.02)",
  cyano: "grayscale(1) sepia(1) hue-rotate(165deg) saturate(2.4) brightness(0.92) contrast(1.12)",
  halftone: "grayscale(1) contrast(1.3) brightness(1.05)",
};

export interface PhotoPlateProps {
  photo: DarkroomPhoto;
  mode: MonoMode;
  onOpen?: (photo: DarkroomPhoto) => void;
  eager?: boolean;
}

export function PhotoPlate({ photo, mode, onOpen, eager = false }: PhotoPlateProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [probe, setProbe] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /* Set when a long-press summons the probe: the release click is swallowed
     so peeking at telemetry on touch never accidentally opens the lightbox.
     The next tap dismisses the probe instead of opening. */
  const peekedRef = useRef(false);

  useEffect(
    () => () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
    },
    [],
  );

  const open = (): void => onOpen?.(photo);

  const onSelect = (): void => {
    if (peekedRef.current) {
      peekedRef.current = false;
      setProbe(false);
      return;
    }
    open();
  };

  const onKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  /* Long-press (touch) summons the probe without opening the lightbox. */
  const pressStart = (): void => {
    clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      pressTimer.current = undefined;
      peekedRef.current = true;
      setProbe(true);
    }, 450);
  };
  const pressEnd = (wasTap: boolean): void => {
    if (pressTimer.current) {
      /* Released before the long-press fired: plain tap, click proceeds. */
      clearTimeout(pressTimer.current);
      pressTimer.current = undefined;
      if (wasTap && probe) setProbe(false);
    }
    /* After a fired long-press the probe stays up; the release click is
       swallowed by onSelect and the next tap dismisses it. */
  };

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", ...motionPhysics.springs.trayFloat }}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      onMouseEnter={() => setProbe(true)}
      onMouseLeave={() => setProbe(false)}
      onFocus={() => setProbe(true)}
      onBlur={() => setProbe(false)}
      onTouchStart={pressStart}
      onTouchEnd={() => pressEnd(true)}
      onTouchMove={() => pressEnd(false)}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${photo.title} — ${photo.alt}. ${isZh ? "打开暗房灯箱" : "Open lightbox"}`}
      className="group relative w-full cursor-zoom-in overflow-hidden rounded-md border border-border-plate bg-chamber outline-none focus-visible:border-ink-dominant"
    >
      {photo.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ filter: IMG_FILTER[mode] }}
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-300"
        />
      ) : (
        <div style={{ filter: IMG_FILTER[mode] }} className="absolute inset-0 transition-[filter] duration-300">
          <SpecimenArt photo={photo} />
        </div>
      )}

      {/* Physical overprint: dominant ink (multiply) + accent ink (screen). */}
      {mode === "riso" && (
        <>
          <div className="ink-overprint pointer-events-none absolute inset-0 bg-ink-dominant/35 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-ink-accent/20 mix-blend-screen" />
          <div className="halftone-screen pointer-events-none absolute inset-0 opacity-25" />
        </>
      )}
      {mode === "cyano" && <div className="halftone-screen-dense pointer-events-none absolute inset-0 opacity-20" />}
      {mode === "halftone" && (
        <>
          <div className="ink-overprint pointer-events-none absolute inset-0 bg-ink-dominant/25 mix-blend-multiply" />
          <div className="halftone-screen-dense pointer-events-none absolute inset-0 opacity-60" />
        </>
      )}

      {/* Registration drift: 1px accent edge on hover, print-shop misregistration. */}
      <div className="pointer-events-none absolute inset-0 rounded-md opacity-0 shadow-[1.5px_1.5px_0_0_var(--ink-accent)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />

      {/* Title strip */}
      <figcaption className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/55 to-transparent px-3 pb-5 pt-2 font-telemetry text-[10px] tracking-[0.14em] text-white/90">
        <span className="truncate">{photo.title}</span>
        <span className="shrink-0 tabular-nums opacity-70">{photo.frame}</span>
      </figcaption>

      <ExifProbe photo={photo} visible={probe} />
    </motion.figure>
  );
}
