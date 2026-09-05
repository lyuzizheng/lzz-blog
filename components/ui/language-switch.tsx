"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Languages } from "lucide-react";

export interface LanguageSwitchProps {
  variant?: "default" | "eyebrow";
}

export function LanguageSwitch({ variant = "default" }: LanguageSwitchProps = {}) {
  const { locale, toggleLocale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    if (variant === "eyebrow") {
      return (
        <div className="h-4 w-12 rounded-[1px] bg-surface/50 animate-pulse font-telemetry text-xs" />
      );
    }
    return (
      <div className="h-8 w-[68px] min-w-[68px] rounded-sm border border-border-plate bg-surface/50 animate-pulse" />
    );
  }

  const isZh = locale === "zh";

  if (variant === "eyebrow") {
    return (
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={isZh ? "Switch to English" : "切换为中文"}
        title={isZh ? "Switch to English" : "切换为中文"}
        className="group inline-flex items-center gap-1 font-telemetry text-xs tracking-wider text-muted transition-colors hover:text-text-primary cursor-pointer"
      >
        <span
          className={
            isZh
              ? "text-ink-dominant font-bold underline underline-offset-2"
              : "text-muted transition-colors hover:text-text-primary"
          }
        >
          ZH
        </span>
        <span className="text-border-plate">/</span>
        <span
          className={
            !isZh
              ? "text-ink-dominant font-bold underline underline-offset-2"
              : "text-muted transition-colors hover:text-text-primary"
          }
        >
          EN
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLocale}
      aria-label={isZh ? "Switch to English" : "切换为中文"}
      title={isZh ? "Switch to English" : "切换为中文"}
      className="group relative inline-flex h-8 w-[68px] min-w-[68px] items-center justify-center gap-1.5 rounded-sm border border-border-plate bg-surface px-2 py-1 text-xs font-telemetry transition-colors hover:border-border-strong active:scale-95 cursor-pointer text-primary"
    >
      <Languages className="h-3.5 w-3.5 text-ink-dominant" />
      <span className="font-semibold tracking-wider">
        [{isZh ? "ZH" : "EN"}]
      </span>
    </button>
  );
}
