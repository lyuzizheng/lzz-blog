"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "./smooth-scroll-provider";

/**
 * BRAWUKA-61 · ScrollRestore: deterministic scroll restore on route change.
 * The old RouteTransition page-enter fade/slide is deleted per DESIGN_V2 §6
 * （禁全页 fade-in slide-up —— 纸不需要"飞进来"）.
 */
export function ScrollRestore({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lenis } = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // lenis instance is stable per mount; pathname drives the restore.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{children}</>;
}
