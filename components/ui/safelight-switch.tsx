"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * SafelightSwitch: Mechanical atelier / darkroom mode toggle per DESIGN.md Section 7.4
 * Toggles between "day" (Daylight Print Atelier) and "night" (Safelight Darkroom).
 */
export interface SafelightSwitchProps {
  variant?: "default" | "dot" | "eyebrow";
}

export function SafelightSwitch({ variant = "eyebrow" }: SafelightSwitchProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-4 w-12 rounded-[1px] bg-surface/50 animate-pulse font-telemetry text-xs" />
    );
  }

  const isNight = resolvedTheme === "night" || theme === "night";

  const handleToggle = () => {
    setTheme(isNight ? "day" : "night");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle Safelight Darkroom / Daylight Mode"
      title={isNight ? "Switch to Daylight Atelier" : "Switch to Safelight Darkroom"}
      className="group inline-flex items-center gap-1.5 font-telemetry text-xs tracking-wider text-muted transition-colors hover:text-text-primary cursor-pointer"
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {isNight ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-safelight" />
          </>
        ) : (
          <span className="inline-flex h-2 w-2 rounded-full bg-cobalt" />
        )}
      </span>
      <span className="hidden sm:inline text-[10px] text-muted group-hover:text-primary">
        {isNight ? "[NIGHT]" : "[DAY]"}
      </span>
    </button>
  );
}
