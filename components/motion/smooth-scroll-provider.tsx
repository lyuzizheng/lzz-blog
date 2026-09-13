"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { motionPhysics } from "@/tokens";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Global Lenis smooth inertial scrolling provider
 * Configured with motionPhysics tokens and prefers-reduced-motion fallback.
 * Lenis itself is dynamically imported after hydration so the library stays
 * out of the first-load JS bundle (it is also never needed on the fixed
 * single-screen routes, which stop it immediately anyway).
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Accessibility check: disable inertial interpolation when reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    let lenis: Lenis | null = null;
    let cancelled = false;

    function onAnimationFrame(time: number) {
      lenis?.raf(time);
      rafIdRef.current = requestAnimationFrame(onAnimationFrame);
    }

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        lerp: motionPhysics.lenis.lerp,
        duration: motionPhysics.lenis.duration,
        smoothWheel: motionPhysics.lenis.smoothWheel,
        wheelMultiplier: motionPhysics.lenis.wheelMultiplier,
        touchMultiplier: motionPhysics.lenis.touchMultiplier,
        infinite: false,
      });
      setLenisInstance(lenis);
      rafIdRef.current = requestAnimationFrame(onAnimationFrame);
    });

    return () => {
      cancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis?.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}
