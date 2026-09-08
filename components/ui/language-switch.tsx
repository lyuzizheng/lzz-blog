"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export interface LanguageSwitchProps {
  variant?: "default" | "eyebrow";
}

export function LanguageSwitch({ variant = "eyebrow" }: LanguageSwitchProps = {}) {
  const { locale, toggleLocale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-4 w-12 rounded-[1px] bg-surface/50 animate-pulse font-telemetry text-xs" />
    );
  }

  const isZh = locale === "zh";

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
