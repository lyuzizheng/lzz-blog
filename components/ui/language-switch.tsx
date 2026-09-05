"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageSwitch() {
  const { locale, toggleLocale } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 w-16 rounded border border-border-plate bg-surface/50 animate-pulse" />
    );
  }

  const isZh = locale === "zh";

  return (
    <button
      onClick={toggleLocale}
      aria-label={isZh ? "Switch to English" : "切换为中文"}
      title={isZh ? "Switch to English" : "切换为中文"}
      className="group relative inline-flex h-8 items-center gap-1.5 rounded-sm border border-border-plate bg-surface px-2 py-1 text-xs font-telemetry transition-colors hover:border-border-strong active:scale-95 cursor-pointer text-primary"
    >
      <Languages className="h-3.5 w-3.5 text-ink-dominant" />
      <span className="font-semibold tracking-wider">
        {isZh ? "中文" : "EN"}
      </span>
      <span className="text-[10px] text-primary/60 group-hover:text-primary transition-colors">
        [{isZh ? "ZH" : "EN"}]
      </span>
    </button>
  );
}
