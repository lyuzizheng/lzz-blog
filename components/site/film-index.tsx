"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

export interface FilmPillar {
  readonly href: string;
  readonly label: string;
}

/** 35mm frame dressing: edge codes + fan scatter within -3.5° ~ +2.8°. */
const FRAMES: ReadonlyArray<{ code: string; scatter: string; stock: string }> = [
  { code: "▶ 01A", scatter: "-3.5deg", stock: "KODAK 400TX · 5063" },
  { code: "▶ 02A", scatter: "-1.4deg", stock: "KODAK 400TX · 5064" },
  { code: "▶ 03A", scatter: "+0.9deg", stock: "KODAK 400TX · 5065" },
  { code: "▶ 04A", scatter: "+2.8deg", stock: "KODAK 400TX · 5066" },
  { code: "▶ 05A", scatter: "-2.2deg", stock: "KODAK 400TX · 5067" },
];

/**
 * BRAWUKA-45 · Scattered Film Strips Unfurl Navigation.
 *
 * Collapsed: a single compact film-clip toggle in the header (fixed h-14,
 * Zero CLS — the panel is an absolute overlay, never in flow).
 * Open: five 35mm frames fan-scatter via CSS `--scatter`; hover/focus
 * "develops" the frame (straighten + lift + ink glow).
 * Keys: 1–5 jump (scoped to open panel, form fields excluded),
 * Escape collapses. Mobile: Pocket Slide Deck (snap-x scroll, flat frames).
 */
export function FilmIndex({ pillars }: { pillars: ReadonlyArray<FilmPillar> }) {
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const router = useRouter();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // CSS gate can't reach the framer-motion panel spring — opt out via matchMedia,
  // same precedent as components/motion/route-transition.tsx.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      const slot = Number.parseInt(event.key, 10);
      if (slot >= 1 && slot <= pillars.length) {
        event.preventDefault();
        close();
        router.push(pillars[slot - 1].href);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, pillars, router]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="film-index-panel"
        aria-label={open ? "收拢胶卷索引" : "展开胶卷索引：五大支柱"}
        className="flex items-center gap-1.5 rounded-xs border border-border-plate px-2.5 py-1 font-telemetry text-[11px] text-text-primary transition-colors hover:border-ink-dominant"
      >
        <Clapperboard className="h-3 w-3 text-ink-dominant" />
        <span>FILM INDEX // 胶卷索引</span>
        <span aria-hidden="true" className="text-muted">{open ? "▾" : "▸"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="film-index-panel"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={reducedMotion ? { duration: 0 } : { stiffness: 450, damping: 30, mass: 0.8, type: "spring" }}
            className="absolute inset-x-0 top-14 z-40 border-b border-border-plate bg-substrate/95 backdrop-blur-md"
          >
            <nav
              aria-label="胶卷支柱导航"
              className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-5 sm:px-6 md:snap-none md:justify-between md:gap-4 md:overflow-visible"
            >
              {pillars.map((pillar, i) => {
                const frame = FRAMES[i % FRAMES.length];
                return (
                  <Link
                    key={pillar.href}
                    href={pillar.href}
                    onClick={close}
                    style={{ "--scatter": frame.scatter, "--i": i } as React.CSSProperties}
                    className="film-frame flex w-44 shrink-0 snap-center flex-col border border-border-plate bg-chamber md:w-auto md:min-w-0 md:flex-1"
                  >
                    <span aria-hidden="true" className="film-sprockets block h-2.5 w-full border-b border-border-plate/60" />
                    <span className="flex flex-1 flex-col gap-1.5 px-3 py-3">
                      <span className="font-telemetry text-[10px] tracking-[0.14em] text-muted">
                        {frame.code}
                      </span>
                      <span className="font-telemetry text-xs tracking-[0.08em] text-text-primary">
                        {pillar.label}
                      </span>
                      <span className="mt-auto font-telemetry text-[10px] tracking-[0.1em] text-muted">
                        {frame.stock}
                      </span>
                      <span className="font-telemetry text-[10px] text-ink-dominant">
                        [{i + 1}]
                      </span>
                    </span>
                    <span aria-hidden="true" className="film-sprockets block h-2.5 w-full border-t border-border-plate/60" />
                  </Link>
                );
              })}
            </nav>
            <p className="mx-auto max-w-6xl px-4 pb-3 font-telemetry text-[10px] tracking-[0.12em] text-muted sm:px-6">
              KEYS 1–5 跳格 · ESC 收卷 · TAB 逐格显影
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
