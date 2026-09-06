"use client";

import { useEffect } from "react";

/**
 * BRAWUKA-87 · AtelierVeilDismiss — Coordinates dismissal of the 0ms instant loading veil.
 *
 * Once React finishes client-side hydration and DOM elements are mounted:
 * 1. Smoothly transitions the inline #atelier-veil out via CSS opacity (0 layout shift, 0 flicker).
 * 2. Removes the veil node from the DOM once the transition completes.
 * 3. Honors prefers-reduced-motion: removes immediately without transition delay.
 */
export function AtelierVeilDismiss() {
  useEffect(() => {
    const veil = document.getElementById("atelier-veil");
    if (!veil) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      veil.remove();
      return;
    }

    // Micro-delay (160ms) ensures initial CSS layout and font paint have settled
    // so the darkroom exposure feels intentional rather than a split-second glitch
    let cleanupTimer: number | undefined;
    const timer = window.setTimeout(() => {
      veil.classList.add("veil-dismissed");
      cleanupTimer = window.setTimeout(() => {
        veil.remove();
      }, 500);
    }, 160);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  return null;
}
