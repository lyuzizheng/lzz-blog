"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
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
 * Configured with motionPhysics tokens and prefers-reduced-motion fallback
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

    const lenis = new Lenis({
      lerp: motionPhysics.lenis.lerp,
      duration: motionPhysics.lenis.duration,
      smoothWheel: motionPhysics.lenis.smoothWheel,
      wheelMultiplier: motionPhysics.lenis.wheelMultiplier,
      touchMultiplier: motionPhysics.lenis.touchMultiplier,
      infinite: false,
    });

    setLenisInstance(lenis);

    function onAnimationFrame(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(onAnimationFrame);
    }

    rafIdRef.current = requestAnimationFrame(onAnimationFrame);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}
