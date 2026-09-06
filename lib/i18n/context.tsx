"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { Locale, Translations } from "./types";
import { en } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";

const DICTIONARIES: Record<Locale, Translations> = { en, zh };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "lzz_locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "en" || stored === "zh") {
        setLocaleState(stored);
        document.documentElement.lang = stored === "zh" ? "zh-CN" : "en";
        document.documentElement.setAttribute("data-locale", stored);
      } else {
        // Check cookie
        const match = document.cookie.match(/lzz_locale=(en|zh)/);
        if (match && (match[1] === "en" || match[1] === "zh")) {
          setLocaleState(match[1]);
          document.documentElement.lang = match[1] === "zh" ? "zh-CN" : "en";
          document.documentElement.setAttribute("data-locale", match[1]);
        }
      }
    } catch {
      // Storage access may fail in restricted environments
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `lzz_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale === "zh" ? "zh-CN" : "en";
      document.documentElement.setAttribute("data-locale", newLocale);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "zh" : "en");
  }, [locale, setLocale]);

  const t = useMemo(() => DICTIONARIES[locale], [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, t, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: "en",
      setLocale: () => {},
      toggleLocale: () => {},
      t: en,
    };
  }
  return context;
}
