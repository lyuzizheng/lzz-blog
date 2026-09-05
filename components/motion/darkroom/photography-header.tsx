"use client";

import React from "react";
import { Aperture } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PhotographyHeader() {
  const { locale, t } = useI18n();

  return (
    <section className="relative mb-8 overflow-hidden rounded-lg border border-border-plate bg-surface p-6 sm:p-10">
      <div className="halftone-screen pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2 font-telemetry text-xs text-muted">
          <Aperture className="h-4 w-4 text-safelight" />
          <span className="tracking-[0.16em]">{t.photography.badge}</span>
        </div>
        <h1 className="font-display text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-6xl">
          {t.photography.title}
        </h1>
        <p className="max-w-2xl font-body text-base leading-relaxed text-muted">
          {t.photography.description}
        </p>
      </div>
    </section>
  );
}
