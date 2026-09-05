"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { motionPhysics } from "@/tokens";
import { useI18n } from "@/lib/i18n";
import {
  DARKROOM_PHOTOS,
  darkroomReadoutRows,
  type MonoMode,
} from "@/lib/darkroom";

export const LIGHTBOX_DISMISS_PX = 120;

function matchLightboxKey(key: string): "next" | "prev" | "close" | null {
  switch (key) {
    case "ArrowRight":
    case "l":
    case "L":
      return "next";
    case "ArrowLeft":
    case "j":
    case "J":
      return "prev";
    case "Escape":
      return "close";
    default:
      return null;
  }
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

interface DarkroomLightboxProps {
  index: number | null;
  mode: MonoMode;
  onClose: () => void;
  onStep: (next: number) => void;
}

/**
 * BRAWUKA-38 · Physical lightbox.
 * - Drag-to-dismiss: vertical drag past 120px (or fast flick) exits on a
 *   spring arc; background dims with drag distance.
 * - Zoom: wheel / ctrl+wheel scales 1–4x around center; double-click toggles.
 * - Keys: ESC closes, ←/→ (J/L) step, Home/End jump. Typing surfaces opt out.
 * - Touch: single-finger vertical drag dismisses; two-finger pinch zooms.
 * prefers-reduced-motion → no drag arc, instant state swaps.
 */
export function DarkroomLightbox({ index, mode, onClose, onStep }: DarkroomLightboxProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const [scale, setScale] = useState(1);
  const [reduced, setReduced] = useState(false);
  const pinchRef = useRef<number | null>(null);
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [0, 240], [0.92, 0.2]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Reset zoom + drag offset whenever the frame changes. */
  useEffect(() => {
    setScale(1);
    dragY.set(0);
  }, [index, dragY]);

  /* Scroll-lock the page while open (Lenis-safe: overflow hidden on body). */
  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [index]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = Math.min(Math.max(index + dir, 0), DARKROOM_PHOTOS.length - 1);
      if (next !== index) onStep(next);
    },
    [index, onStep],
  );

  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent): void => {
      if (e.defaultPrevented || isEditableTarget(e.target)) return;
      const intent = matchLightboxKey(e.key);
      if (!intent) {
        if (e.key === "Home") {
          e.preventDefault();
          onStep(0);
        } else if (e.key === "End") {
          e.preventDefault();
          onStep(DARKROOM_PHOTOS.length - 1);
        }
        return;
      }
      e.preventDefault();
      if (intent === "close") onClose();
      else step(intent === "next" ? 1 : -1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onStep, step]);

  const onWheel = (e: React.WheelEvent): void => {
    // Trackpad pinch (ctrl+wheel) or plain wheel both drive zoom; page is locked.
    const delta = e.deltaY;
    setScale((s) => Math.min(4, Math.max(1, s - delta * 0.002)));
  };

  const onTouchMove = (e: React.TouchEvent): void => {
    if (e.touches.length !== 2) {
      pinchRef.current = null;
      return;
    }
    const [a, b] = [e.touches[0], e.touches[1]];
    const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if (pinchRef.current !== null) {
      const delta = dist - pinchRef.current;
      setScale((s) => Math.min(4, Math.max(1, s + delta * 0.008)));
    }
    pinchRef.current = dist;
  };

  const photo = index !== null ? DARKROOM_PHOTOS[index] : null;

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.title} 灯箱大图`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex flex-col"
          onClick={onClose}
        >
          {/* Dimmed backdrop: drag distance bleeds light back in. */}
          <motion.div aria-hidden style={{ opacity: backdropOpacity }} className="absolute inset-0 bg-black" />
          {/* Top telemetry bar */}
          <div
            className="relative z-10 flex items-center justify-between px-4 py-3 font-telemetry text-[11px] tracking-[0.14em] text-white/80"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tabular-nums">
              {photo.frame} — {String(index + 1).padStart(2, "0")} / {String(DARKROOM_PHOTOS.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline">{t.photography.lightbox.hint}</span>
            <button
              onClick={onClose}
              aria-label={isZh ? "关闭灯箱 (ESC)" : "Close lightbox (ESC)"}
              className="cursor-pointer border border-white/30 px-2.5 py-1 text-white/90 hover:border-white hover:text-white"
            >
              ✕ {t.photography.lightbox.close}
            </button>
          </div>

          {/* Stage: drag-to-dismiss on Y, arrows step on X */}
          <div
            className="relative z-10 flex flex-1 touch-none items-center justify-center overflow-hidden px-4"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onTouchMove={onTouchMove}
            onDoubleClick={() => setScale((s) => (s > 1 ? 1 : 2.2))}
          >
            <AnimatePresence mode="wait" initial={false} custom={index}>
              <motion.figure
                key={photo.id}
                drag={reduced || scale > 1 ? false : "y"}
                style={{ y: dragY, scale, aspectRatio: `${photo.width} / ${photo.height}` }}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.y > LIGHTBOX_DISMISS_PX || info.velocity.y > 600) onClose();
                }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 48 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: -48 }}
                transition={{ type: "spring", ...motionPhysics.springs.dossierDrawer }}
                className="relative max-h-[68vh] w-full max-w-4xl cursor-grab overflow-hidden rounded-md border border-white/20 bg-chamber active:cursor-grabbing"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center bg-chamber font-display text-2xl text-muted"
                  aria-hidden
                >
                  {photo.title}
                </div>
                {photo.src ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={photo.src} alt={photo.alt} draggable={false} className="absolute inset-0 h-full w-full object-contain" />
                ) : (
                  <SpecimenStage id={photo.id} title={photo.title} frame={photo.frame} alt={photo.alt} />
                )}
                {mode !== "true" && (
                  <div className="ink-overprint pointer-events-none absolute inset-0 bg-ink-dominant/30 mix-blend-multiply" />
                )}
                {mode !== "true" && (
                  <div className="halftone-screen pointer-events-none absolute inset-0 opacity-25" />
                )}
              </motion.figure>
            </AnimatePresence>

            {/* Step arrows (desktop) */}
            <button
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label="上一张 (←/J)"
              className="absolute left-3 z-20 hidden cursor-pointer border border-white/30 bg-black/40 px-3 py-2 font-telemetry text-sm text-white/90 hover:border-white disabled:opacity-30 sm:block"
            >
              ←
            </button>
            <button
              onClick={() => step(1)}
              disabled={index === DARKROOM_PHOTOS.length - 1}
              aria-label="下一张 (→/L)"
              className="absolute right-3 z-20 hidden cursor-pointer border border-white/30 bg-black/40 px-3 py-2 font-telemetry text-sm text-white/90 hover:border-white disabled:opacity-30 sm:block"
            >
              →
            </button>
          </div>

          {/* Bottom EXIF console */}
          <div
            className="relative z-10 border-t border-white/15 bg-black/70 px-4 py-3 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-6 gap-y-1 font-telemetry text-[11px] tabular-nums sm:grid-cols-2">
              {darkroomReadoutRows(photo.exif).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="w-28 shrink-0 tracking-[0.1em] text-white/50">{k}</span>
                  <span className="truncate text-white/90">{v}</span>
                </div>
              ))}
            </div>
            {/* Mobile swipe strip */}
            <div className="mx-auto mt-2 flex max-w-4xl items-center justify-between sm:hidden">
              <button onClick={() => step(-1)} disabled={index === 0} className="cursor-pointer border border-white/30 px-3 py-1 font-telemetry text-xs text-white/90 disabled:opacity-30">
                ← PREV
              </button>
              <span className="font-telemetry text-[11px] text-white/60">SWIPE ↓ CLOSE · PINCH ZOOM</span>
              <button onClick={() => step(1)} disabled={index === DARKROOM_PHOTOS.length - 1} className="cursor-pointer border border-white/30 px-3 py-1 font-telemetry text-xs text-white/90 disabled:opacity-30">
                NEXT →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Large-format deterministic specimen artwork for file-less entries. */
function SpecimenStage({ id, title, frame, alt }: { id: string; title: string; frame: string; alt: string }) {
  const seed = id.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  void alt;
  return (
    <svg viewBox="0 0 800 600" role="img" aria-label={title} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="600" fill="var(--bg-chamber)" />
      <circle cx={200 + (seed % 400)} cy={140 + (seed % 120)} r={90} fill="var(--ink-dominant)" opacity="0.85" />
      <circle cx={200 + (seed % 400)} cy={140 + (seed % 120)} r={130} fill="none" stroke="var(--ink-accent)" strokeWidth="3" opacity="0.7" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M0 ${330 + i * 60} Q 200 ${300 + i * 60 - (seed % 30)}, 400 ${330 + i * 60} T 800 ${310 + i * 60} V 600 H 0 Z`}
          fill={i % 2 ? "var(--ink-dominant)" : "var(--ink-accent)"}
          opacity={0.25 + i * 0.12}
        />
      ))}
      <polygon points="0,600 300,380 440,600" fill="var(--bg-substrate)" opacity="0.9" />
      <text x={760} y={560} textAnchor="end" fontSize="22" letterSpacing="4" fill="var(--text-muted)" fontFamily="monospace">
        {frame}
      </text>
    </svg>
  );
}
