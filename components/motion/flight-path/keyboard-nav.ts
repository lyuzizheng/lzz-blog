"use client";

import { useEffect } from "react";

/**
 * BRAWUKA-37 · Flight Path keyboard navigation contract.
 * Strictly aligned with docs/DESIGN.md §7.2:
 *   ArrowRight / L → step forward · ArrowLeft / J → step back
 *   Home / End → jump to first / last frame.
 *
 * The matcher is a pure function (unit-testable, zero React) so the
 * keydown handler stays synchronous and responds well under 16ms.
 */

export type FlightStepIntent = "next" | "prev" | "first" | "last";

export function matchFlightStepKey(key: string): FlightStepIntent | null {
  switch (key) {
    case "ArrowRight":
    case "l":
    case "L":
      return "next";
    case "ArrowLeft":
    case "j":
    case "J":
      return "prev";
    case "Home":
      return "first";
    case "End":
      return "last";
    default:
      return null;
  }
}

/** Typing surfaces opt out — pressing L/J in a field must not hijack the timeline. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function stepIndex(
  current: number,
  intent: FlightStepIntent,
  count: number,
): number {
  if (count <= 0) return 0;
  switch (intent) {
    case "next":
      return Math.min(current + 1, count - 1);
    case "prev":
      return Math.max(current - 1, 0);
    case "first":
      return 0;
    case "last":
      return count - 1;
  }
}

export interface FlightKeyboardOptions {
  count: number;
  index: number;
  onStep: (next: number, intent: FlightStepIntent) => void;
  enabled?: boolean;
}

/**
 * Global keydown listener for the timeline. The handler does nothing but
 * match + arithmetic + a single callback — no layout, no async — so the
 * interaction responds in the same frame (<16ms budget).
 */
export function useFlightKeyboard({
  count,
  index,
  onStep,
  enabled = true,
}: FlightKeyboardOptions): void {
  useEffect(() => {
    if (!enabled || count <= 0) return;
    const handler = (event: KeyboardEvent): void => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      const intent = matchFlightStepKey(event.key);
      if (!intent) return;
      event.preventDefault();
      onStep(stepIndex(index, intent, count), intent);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [count, index, onStep, enabled]);
}
