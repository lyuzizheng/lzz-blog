"use client";

import React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { useI18n } from "@/lib/i18n";

/**
 * Editorial Reader Header (Unified via SiteHeader):
 * - Left: "Lzz-Blog" (homepage link)
 * - Center: 5 mini rectangular negatives as section navigation (matching homepage workbench)
 * - Right: Minimalist Language switch + Safelight switch
 * - Width: max-w-6xl
 */
export function ReaderEyebrow({
  showControls = true,
  className = "",
}: {
  backHref?: string;
  backLabel?: string;
  showControls?: boolean;
  className?: string;
} = {}) {
  return <SiteHeader showControls={showControls} className={className} />;
}

export function ReaderColophon() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border-plate pt-4 font-telemetry text-[11px] leading-relaxed text-muted">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <span>© 2026 ZIZHENG LYU · {t.common.atelier}</span>
        <span className="tabular-nums">
          PAPER #F5F1E8 · INK #2148B8 · SET IN NEWSREADER + NOTO SERIF SC
        </span>
      </div>
    </footer>
  );
}
