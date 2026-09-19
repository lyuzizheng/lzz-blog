"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import type { ThemeSetting } from "@/components/theme-provider";

/**
 * SafelightSwitch: Mechanical atelier / darkroom mode toggle per DESIGN.md Section 7.4
 * Tri-state cycle: AUTO (follows OS prefers-color-scheme) → DAY → NIGHT.
 * Rendered as a high-contrast sliding-knob pill so the control is legible at a
 * glance on both desktop and mobile (the previous bare 2px dot was invisible).
 */
export interface SafelightSwitchProps {
  variant?: "default" | "dot" | "eyebrow";
}

const CYCLE: readonly ThemeSetting[] = ["system", "day", "night"];

export function SafelightSwitch({ variant = "eyebrow" }: SafelightSwitchProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Reserve the exact footprint of the live control to keep Zero CLS.
    return (
      <div
        className="inline-flex h-11 w-[92px] items-center justify-center"
        aria-hidden="true"
      >
        <span className="h-6 w-11 rounded-full border border-border-plate bg-chamber/50 animate-pulse" />
      </div>
    );
  }

  const isAuto = theme === "system";
  const isNight = resolvedTheme === "night";
  const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length];
  const modeLabel = isAuto ? "AUTO" : isNight ? "NIGHT" : "DAY";
  const nextLabel = next === "system" ? "Auto (follow system)" : next === "day" ? "Daylight Atelier" : "Safelight Darkroom";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme mode: ${isAuto ? `Auto, currently ${isNight ? "night" : "day"}` : modeLabel}. Activate to switch to ${nextLabel}.`}
      title={`${modeLabel}${isAuto ? ` · ${isNight ? "NIGHT" : "DAY"}` : ""} → ${nextLabel}`}
      data-variant={variant}
      className="group inline-flex h-11 cursor-pointer select-none items-center gap-2 px-1 font-telemetry"
    >
      {/* Sliding-knob pill: knob rests on the active side, safelight glow at night */}
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border-plate bg-chamber/70 transition-colors duration-200 group-hover:border-ink-dominant/60">
        <span
          aria-hidden="true"
          className={`absolute top-1/2 inline-flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
            isNight
              ? "left-[calc(100%-20px)] border-safelight/70 bg-safelight/25 text-safelight shadow-[0_0_10px_rgba(224,84,84,0.5)]"
              : "left-[2px] border-cobalt/60 bg-cobalt/15 text-cobalt"
          }`}
        >
          {isNight ? (
            <Moon className="h-3 w-3" strokeWidth={2.25} />
          ) : (
            <Sun className="h-3 w-3" strokeWidth={2.25} />
          )}
        </span>
      </span>
      <span
        className={`text-[10px] font-bold tracking-[0.18em] transition-colors group-hover:text-primary ${
          isAuto ? "text-ink-dominant" : "text-muted"
        }`}
      >
        {modeLabel}
      </span>
    </button>
  );
}
