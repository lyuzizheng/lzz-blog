"use client";

import { Printer } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-39 · PrintResumeButton：一键打印 / 导出 PDF。
 * 直接调用浏览器打印预览；`@media print` 样式负责纯净排版（见 globals.css）。
 */
export function PrintResumeButton() {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex cursor-pointer items-center gap-1.5 rounded-xs border border-border-plate px-2.5 py-1 font-telemetry text-[11px] text-text-primary transition-colors hover:border-ink-dominant"
    >
      <Printer className="h-3 w-3 text-ink-dominant" />
      <span>{isZh ? "打印简历 (A4)" : "PRINT / PDF"}</span>
    </button>
  );
}
