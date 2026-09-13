"use client";

import React from "react";
import { LazyMotion, domMax } from "framer-motion";

/**
 * BRAWUKA-271 · domMax feature bundle (domAnimation + drag + layout).
 *
 * Required by the darkroom route: PhotoPlate uses `layout` reflow and the
 * lightbox uses `drag`-to-dismiss. Kept in its own module so it only ships
 * to routes that actually need it.
 *
 * `strict` makes any stray `motion.*` usage throw in dev so the split cannot
 * silently regress back to the full bundle.
 */
export function MotionDomMax({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
