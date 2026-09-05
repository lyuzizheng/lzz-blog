"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

export function CapabilityHeader() {
  const { t } = useI18n();

  return (
    <div className="mb-6 flex items-center justify-between border-b border-border-plate pb-3">
      <h2 className="font-display text-2xl font-semibold text-primary">
        {t.resume.capabilityTitle}
      </h2>
      <span className="font-telemetry text-xs text-muted">
        {t.resume.screenOnly}
      </span>
    </div>
  );
}

export function ResumeFooterNote() {
  const { t } = useI18n();

  return (
    <footer className="no-print mt-12 border-t border-border-plate pt-4 font-telemetry text-[11px] text-muted">
      {t.resume.footerNote}
    </footer>
  );
}
