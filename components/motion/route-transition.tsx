"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLenis } from "./smooth-scroll-provider";

/**
 * RouteTransition: flicker-free page-enter animation + deterministic scroll restore.
 * - Fades/slides new route in (opacity 0→1, y 8→0, 220ms easeOut).
 * - On pathname change: Lenis scrollTo(0, immediate) or window.scrollTo(0,0).
 * - prefers-reduced-motion: plain <div>, native instant jump, zero JS animation.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lenis } = useLenis();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // lenis instance is stable per mount; pathname drives the restore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
