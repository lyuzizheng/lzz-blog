"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * BRAWUKA-84 · ExposureProgress — The Darkroom Exposure Beam & Route Progress Bar.
 *
 * Implements a high-precision, 60fps GPU-rendered exposure progress line
 * at the top of the viewport. Serves dual roles:
 * 1. Initial first-screen loading: visual feedback simulating silver halide
 *    exposure development while web fonts and hydration settle.
 * 2. Route transitions: instantaneous interactive response on navigation clicks,
 *    eliminating the feeling of frozen UI between route chunks.
 *
 * - 0 CLS: fixed positioning at top: 0, height: 2px, pointer-events: none.
 * - Single-ink palette: cobalt blue (day) / safelight red with phosphor glow (night).
 * - Honors prefers-reduced-motion: completes immediately without animation.
 */
export function ExposureProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // First-screen mount: exposure sweep
  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setProgress(25);

    const t1 = setTimeout(() => setProgress(65), 100);
    const t2 = setTimeout(() => setProgress(90), 220);
    const t3 = setTimeout(() => {
      setProgress(100);
      const t4 = setTimeout(() => setVisible(false), 240);
      timerRef.current = t4;
    }, 380);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduceMotion]);

  // Route transition trigger on pathname change.
  // Skips the initial mount: the first-screen exposure sweep above owns that
  // sequence — running both at mount would make the bar jump backwards
  // (95 → 65 → 100 → 90 → 100) on every full page load.
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (reduceMotion) return;

    setVisible(true);
    setProgress(95);

    const tDone = setTimeout(() => {
      setProgress(100);
      const tHide = setTimeout(() => setVisible(false), 220);
      timerRef.current = tHide;
    }, 120);

    return () => {
      clearTimeout(tDone);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, reduceMotion]);

  // Global link click interceptor for instant <16ms interaction feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (!target || !(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:")) {
        return;
      }

      // Check if clicking the same pathname
      const targetPath = href.split("?")[0].split("#")[0];
      if (targetPath === window.location.pathname) return;

      if (!reduceMotion) {
        setVisible(true);
        setProgress(35);
        setTimeout(() => setProgress(75), 120);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [reduceMotion]);

  if (!visible && progress >= 100) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] overflow-hidden"
    >
      <div
        className="h-full w-full origin-left bg-[var(--ink-dominant,#2148B8)] transition-transform duration-200 ease-out"
        style={{
          transform: `scaleX(${progress / 100})`,
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px var(--ink-dominant)",
        }}
      />
    </div>
  );
}
