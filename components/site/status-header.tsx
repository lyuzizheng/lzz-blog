"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function StatusHeader() {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <>
      <nav
        aria-label={isZh ? "面包屑导航" : "Breadcrumb"}
        className="mb-6 flex flex-wrap items-center justify-between gap-3 font-telemetry text-[11px] text-muted"
      >
        <Link href="/" className="hover:text-primary">
          {t.common.backToAtelier}
        </Link>
        <span className="tracking-[0.14em]">
          {isZh
            ? "系统状态与边缘探针控制台 · ESC 键返回"
            : "STATUS · ESC RETURN"}
        </span>
      </nav>

      <header className="mb-8">
        <p className="mb-2 font-telemetry text-[11px] tracking-[0.22em] text-muted">
          {t.status.telemetryLabel}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t.status.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">
          {t.status.subtitle}
        </p>
      </header>
    </>
  );
}
