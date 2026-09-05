"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { DownloadResumeButton, PrintResumeButton } from "./print-button";

export function ResumeNav() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <nav className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 font-telemetry text-[11px] text-muted">
      <Link href="/" className="hover:text-primary">
        {t.common.backToAtelier}
      </Link>
      <span className="flex flex-wrap items-center gap-2">
        <span className="mr-1 hidden tracking-[0.14em] sm:inline">
          {isZh ? "经历航线与个人履历" : "FLIGHT PATH DOSSIER"}
        </span>
        <DownloadResumeButton />
        <PrintResumeButton />
      </span>
    </nav>
  );
}
