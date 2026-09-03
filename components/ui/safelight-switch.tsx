"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * SafelightSwitch: Mechanical atelier / darkroom mode toggle per DESIGN.md Section 7.4
 * Toggles between "day" (Daylight Print Atelier) and "night" (Safelight Darkroom).
 */
export function SafelightSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-24 rounded border border-border-plate bg-surface/50 animate-pulse" />
    );
  }

  const isNight = resolvedTheme === "night" || theme === "night";

  const handleToggle = () => {
    setTheme(isNight ? "day" : "night");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Safelight Darkroom / Daylight Mode"
      title={isNight ? "Switch to Daylight Atelier" : "Switch to Safelight Darkroom"}
      className="group relative inline-flex h-8 items-center gap-2 rounded-sm border border-border-plate bg-surface px-2.5 py-1 text-xs font-telemetry transition-colors hover:border-border-strong active:scale-95 cursor-pointer text-primary"
    >
      <span className="flex items-center gap-1.5">
        {isNight ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-safelight" />
            </span>
            <Moon className="h-3.5 w-3.5 text-safelight" />
            <span className="text-safelight font-medium tracking-wide">SAFELIGHT</span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-cobalt" />
            <Sun className="h-3.5 w-3.5 text-cobalt" />
            <span className="text-cobalt font-semibold tracking-wide">DAYLIGHT</span>
          </>
        )}
      </span>
      <span className="text-[10px] text-primary/60 group-hover:text-primary transition-colors">
        [650nm]
      </span>
    </button>
  );
}
