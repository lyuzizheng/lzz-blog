"use client";

import React from "react";
import { LazyMotion, domAnimation } from "framer-motion";

/**
 * BRAWUKA-271 · domAnimation feature bundle (opacity/transform/exit only).
 *
 * `m` components resolve their feature set from the nearest LazyMotion
 * provider instead of shipping the full `motion` bundle. Kept in its own
 * module so domMax (drag/layout) never leaks into routes that only need
 * domAnimation — importing both from one file would union them into the
 * shared chunk.
 *
 * `strict` makes any stray `motion.*` usage throw in dev so the split cannot
 * silently regress back to the full bundle.
 */
export function MotionDomAnimation({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
