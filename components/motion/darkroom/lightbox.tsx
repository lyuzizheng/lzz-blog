"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionPhysics } from "@/tokens";
import type { DarkroomPhoto } from "@/lib/photos";
import { useFlightKeyboard } from "@/components/motion/flight-path";
import { usePrefersReducedMotion } from "@/components/motion/flight-path";
import { MonoPhoto, type MonoMode } from "./mono-photo";
import { ExifProbe } from "./exif-probe";

/**
 * BRAWUKA-38 · physical Lightbox.
 * - Drag-to-dismiss: vertical drag past 120px (or fast fling) closes with
 *   a spring parabolic exit. Disabled while zoomed (drag pans instead).
 * - Zoom: wheel, double-click toggle, two-finger pinch.
 * - Keyboard: Esc closes, ArrowLeft/J / ArrowRight/L step (shared hook).
 */

const DISMISS_PX = 120;
const MIN_SCALE = 1;
const MAX_SCALE = 3;

export interface LightboxProps {
  photos: DarkroomPhoto[];
  index: number;
  mode: MonoMode;
  onIndex: (next: number) => void;
  onMode: (mode: MonoMode) => void;
  onClose: () => void;
}

export function Lightbox({ photos, index, mode, onIndex, onMode, onClose }: LightboxProps) {
  const photo = photos[index];
  const reduced = usePrefersReducedMotion();
  const [scale, setScale] = useState(MIN_SCALE);
  const frameRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<{ start: number; base: number } | null>(null);

  useEffect(() => {
    setScale(MIN_SCALE);
  }, [index]);

  useFlightKeyboard({
    count: photos.length,
    index,
    onStep: useCallback((next: number) => onIndex(next), [onIndex]),
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const zoomBy = useCallback((delta: number, cx?: number, cy?: number) => {
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * (delta > 0 ? 0.9 : 1.1)));
      return Math.round(next * 100) / 100;
    });
    void cx;
    void cy;
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (reduced) return;
      e.preventDefault();
      zoomBy(e.deltaY);
    },
    [reduced, zoomBy],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const pinch = pinchRef.current;
      if (!pinch) {
        pinchRef.current = { start: dist, base: scale };
        return;
      }
      if (pinch.start > 0) {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, (pinch.base * dist) / pinch.start));
        setScale(Math.round(next * 100) / 100);
      }
    },
    [scale],
  );

  const onTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  if (!photo) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-substrate/97 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Darkroom 灯箱 — ${photo.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between px-4 py-3 font-telemetry text-[11px] text-muted tabular-nums">
        <span>
          {photo.id} · {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <span className="tracking-[0.12em]">DRAG ↓ 120px dismiss · 滚轮缩放 · 双击 2×</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭灯箱"
          className="cursor-pointer rounded border border-border-plate px-2 py-0.5 text-primary hover:border-ink-dominant"
        >
          ESC ✕
        </button>
      </div>

      {/* Stage */}
      <div
        ref={frameRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4"
        onWheel={onWheel}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.figure
          key={photo.id}
          className="relative max-h-full"
          style={{ aspectRatio: `${photo.width} / ${photo.height}`, maxWidth: "min(92vw, 90vh)" }}
          drag={reduced ? false : scale <= MIN_SCALE ? "y" : true}
          dragConstraints={scale <= MIN_SCALE ? { top: 0, bottom: 0 } : frameRef}
          dragElastic={scale <= MIN_SCALE ? 0.6 : 0.05}
          onDragEnd={(_, info) => {
            if (reduced || scale > MIN_SCALE) return;
            if (info.offset.y > DISMISS_PX || info.velocity.y > 500) onClose();
          }}
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale, y: 0 }}
          transition={{ type: "spring", ...motionPhysics.springs.snappy }}
        >
          <div
            className="h-full w-full touch-none overflow-hidden rounded border border-border-plate"
            onDoubleClick={() => setScale((s) => (s > MIN_SCALE ? MIN_SCALE : 2))}
          >
            <MonoPhoto photo={photo} mode={mode} eager className="h-full w-full" />
          </div>
        </motion.figure>

        {/* Prev / next */}
        <button
          type="button"
          aria-label="上一张"
          onClick={() => onIndex((index - 1 + photos.length) % photos.length)}
          className="absolute left-3 cursor-pointer rounded border border-border-plate bg-substrate/80 px-2.5 py-1.5 font-telemetry text-sm text-primary backdrop-blur-sm hover:border-ink-dominant"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="下一张"
          onClick={() => onIndex((index + 1) % photos.length)}
          className="absolute right-3 cursor-pointer rounded border border-border-plate bg-substrate/80 px-2.5 py-1.5 font-telemetry text-sm text-primary backdrop-blur-sm hover:border-ink-dominant"
        >
          →
        </button>
      </div>

      {/* Bottom dock: EXIF probe + mono switch */}
      <div className="flex flex-col gap-2 px-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <ExifProbe photo={photo} className="sm:max-w-sm" />
        <div className="flex items-center gap-1 rounded border border-border-plate bg-chamber p-1 font-telemetry text-[11px]">
          {(
            [
              ["normal", "底片"],
              ["risograph", "孔版"],
              ["cyanotype", "蓝晒"],
              ["halftone", "网点"],
            ] as Array<[MonoMode, string]>
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => onMode(m)}
              aria-pressed={mode === m}
              className={`cursor-pointer rounded-xs px-2.5 py-1 ${
                mode === m
                  ? "bg-substrate font-semibold text-primary shadow-xs"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LightboxHost(props: LightboxProps & { open: boolean }) {
  const { open, ...rest } = props;
  return <AnimatePresence>{open && <Lightbox {...rest} />}</AnimatePresence>;
}
