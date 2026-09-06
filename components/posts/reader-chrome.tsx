"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import { LanguageSwitch } from "@/components/ui/language-switch";

/**
 * Four chapter negative specifications matching the darkroom homepage:
 * Blogs (/posts) · Career (/resume) · Photography (/photography) · Projects (/products)
 */
const CHAPTER_NEGATIVES = [
  { key: "blogs", label: "Blogs", href: "/posts", frameNo: "01" },
  { key: "career", label: "Career", href: "/resume", frameNo: "02" },
  { key: "photography", label: "Photo", href: "/photography", frameNo: "03" },
  { key: "projects", label: "Projects", href: "/products", frameNo: "04" },
] as const;

/**
 * Editorial Reader Header:
 * - Left: "LZZ ATELIER" (homepage link / back)
 * - Center: 4 mini rectangular negatives as section navigation (matching homepage workbench)
 * - Right: Language switch + Safelight switch (minimalist mode like homepage)
 */
export function ReaderEyebrow({
  backHref = "/posts",
  backLabel,
  section,
}: {
  backHref?: string;
  backLabel?: string;
  section?: string;
}) {
  const pathname = usePathname();
  const isPostDetail = pathname !== "/posts";

  return (
    <header className="mb-10 flex flex-col gap-3 border-b border-border-plate pb-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Brand / Home link */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-tight text-text-primary transition-colors hover:text-ink-dominant uppercase"
        >
          LZZ ATELIER
        </Link>
        {isPostDetail && backLabel && (
          <div className="flex items-center gap-1.5 font-telemetry text-xs text-muted">
            <span>/</span>
            <Link
              href={backHref}
              className="text-muted hover:text-text-primary transition-colors hover:underline"
            >
              {backLabel}
            </Link>
          </div>
        )}
      </div>

      {/* 4 mini 简约长方形胶片 section navigation (matching homepage 4 negatives) */}
      <nav
        aria-label="Section chapter navigation"
        className="flex items-center gap-1.5 overflow-x-auto py-0.5 sm:gap-2"
      >
        {CHAPTER_NEGATIVES.map((neg) => {
          const isActive =
            pathname === neg.href || (neg.key === "blogs" && pathname.startsWith("/posts"));
          return (
            <Link
              key={neg.key}
              href={neg.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex shrink-0 items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-telemetry text-[11px] transition-all duration-150 ${
                isActive
                  ? "border-ink-dominant bg-surface text-ink-dominant font-semibold shadow-sm"
                  : "border-border-plate bg-chamber/40 text-muted hover:border-border-plate-strong hover:text-text-primary hover:bg-surface"
              }`}
            >
              <span className="text-[9px] opacity-60 tabular-nums">{neg.frameNo}</span>
              <span className="tracking-wider uppercase">{neg.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right controls: Language + Safelight switch (minimal mode like homepage) */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <LanguageSwitch variant="eyebrow" />
        <SafelightSwitch variant="eyebrow" />
      </div>
    </header>
  );
}

export function ReaderColophon() {
  return (
    <footer className="mt-16 border-t border-border-plate pt-4 font-telemetry text-[11px] leading-relaxed text-muted">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <span>© 2026 ZIZHENG LYU · LZZ ATELIER</span>
        <span className="tabular-nums">
          PAPER #F5F1E8 · INK #2148B8 · SET IN NEWSREADER + NOTO SERIF SC
        </span>
      </div>
    </footer>
  );
}
