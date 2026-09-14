"use client";

import * as React from "react";

/**
 * Minimal theme provider for the Day/Night atelier modes.
 *
 * Replaces `next-themes`: that package injects its init script via
 * `Function.prototype.toString()`, and OpenNext's esbuild bundling rewrites
 * the inner function with a `keepNames` helper (`__name(k2, "k2")`) that is
 * never defined in the browser — a guaranteed ReferenceError on every page
 * load. The pre-hydration theme attribute is already applied by the inline
 * `atelier-init-theme-locale` script in `app/layout.tsx`, so this provider
 * only needs to track state and persist changes.
 */

export type Theme = "day" | "night";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: readonly Theme[];
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";
const THEMES: readonly Theme[] = ["day", "night"];
const DEFAULT_THEME: Theme = "night";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night") return stored;
  } catch {
    // localStorage unavailable (privacy mode) — fall through to default.
  }
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first client render both start at the default so hydration matches;
  // the real stored value is picked up in the effect below.
  const [theme, setThemeState] = React.useState<Theme>(DEFAULT_THEME);

  React.useEffect(() => {
    setThemeState(readStoredTheme());
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persist best-effort; the attribute still updates for this session.
    }
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme, themes: THEMES }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
