import React from "react";

/**
 * FilmGrainOverlay: Lightweight SVG fractalNoise grain overlay
 * Controls optical silver halide paper grain with 3%~5% opacity.
 * Fixed positioning, pointer-events none, zero CLS impact.
 */
export function FilmGrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="film-grain-overlay"
    />
  );
}
