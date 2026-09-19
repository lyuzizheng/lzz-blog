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
 *
 * Theme setting is tri-state: "system" (default, follows the OS/browser
 * prefers-color-scheme, live-listens for changes) or a manual "day"/"night"
 * override persisted in localStorage.
 */

export type Theme = "day" | "night";
export type ThemeSetting = Theme | "system";

interface ThemeContextValue {
  theme: ThemeSetting;
  resolvedTheme: Theme;
  setTheme: (theme: ThemeSetting) => void;
  themes: readonly ThemeSetting[];
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";
const THEMES: readonly ThemeSetting[] = ["system", "day", "night"];
const DEFAULT_SETTING: ThemeSetting = "system";
const DEFAULT_RESOLVED: Theme = "night";
const LIGHT_QUERY = "(prefers-color-scheme: light)";

function systemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return DEFAULT_RESOLVED;
  return window.matchMedia(LIGHT_QUERY).matches ? "day" : "night";
}

function readStoredSetting(): ThemeSetting {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night" || stored === "system") return stored;
  } catch {
    // localStorage unavailable (privacy mode) — fall through to default.
  }
  return DEFAULT_SETTING;
}

function resolve(setting: ThemeSetting): Theme {
  return setting === "system" ? systemTheme() : setting;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first client render both start at the default so hydration matches;
  // the real stored value is picked up in the effect below.
  const [theme, setThemeState] = React.useState<ThemeSetting>(DEFAULT_SETTING);
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>(DEFAULT_RESOLVED);

  React.useEffect(() => {
    const setting = readStoredSetting();
    setThemeState(setting);
    setResolvedTheme(resolve(setting));
  }, []);

  // While following the OS, react live to prefers-color-scheme flips.
  React.useEffect(() => {
    if (theme !== "system" || !window.matchMedia) return;
    const mql = window.matchMedia(LIGHT_QUERY);
    const onChange = () => {
      const next = systemTheme();
      setResolvedTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = React.useCallback((next: ThemeSetting) => {
    setThemeState(next);
    const resolved = resolve(next);
    setResolvedTheme(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persist best-effort; the attribute still updates for this session.
    }
    document.documentElement.setAttribute("data-theme", resolved);
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, themes: THEMES }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
