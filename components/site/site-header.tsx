"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafelightSwitch, LanguageSwitch } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

/**
 * 4 chapter negative specifications matching the darkroom homepage:
 * Blogs (/posts) · Career (/resume) · Photography (/photography) · Projects (/products)
 */
const CHAPTER_NEGATIVES = [
  { key: "blogs", label: "Blogs", labelZh: "文章", href: "/posts", frameNo: "01" },
  { key: "career", label: "Career", labelZh: "履历", href: "/resume", frameNo: "02" },
  { key: "photography", label: "Photo", labelZh: "摄影", href: "/photography", frameNo: "03" },
  { key: "projects", label: "Projects", labelZh: "产品", href: "/products", frameNo: "04" },
] as const;

/**
 * BRAWUKA-45 / BRAWUKA-93 · Shared Unified Header
 *
 * 100% aligned with /posts ReaderEyebrow:
 * - Left: "LZZ ATELIER" (homepage brand link)
 * - Center: 4 mini rectangular negative links (direct navigation, zero click-to-expand)
 * - Right: Language switch + Safelight darkroom switch
 *
 * Clean, lightweight, generous whitespace, zero cluttered popups.
 */
export function SiteHeader() {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Brand / Homepage link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-base font-bold tracking-tight text-primary transition-colors hover:text-cobalt uppercase sm:text-lg"
            aria-label={t.common.atelier}
          >
            {t.common.atelier}
          </Link>
        </div>

        {/* 4 mini 简约长方形胶片直接导航 (Direct Navigation, No Dropdowns) */}
        <nav
          aria-label={isZh ? "章节导航" : "Section chapter navigation"}
          className="flex items-center gap-1 overflow-x-auto py-0.5 sm:gap-2"
        >
          {CHAPTER_NEGATIVES.map((neg) => {
            const isActive =
              pathname === neg.href ||
              (neg.key === "blogs" && pathname.startsWith("/posts")) ||
              (neg.key === "career" && pathname.startsWith("/resume"));

            return (
              <Link
                key={neg.key}
                href={neg.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex shrink-0 items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-telemetry text-[11px] transition-all duration-150 ${
                  isActive
                    ? "border-cobalt bg-surface text-cobalt font-semibold shadow-plate"
                    : "border-border-plate/60 bg-chamber/40 text-muted hover:border-border-plate hover:text-primary hover:bg-surface"
                }`}
              >
                <span className="text-[9px] opacity-60 tabular-nums">{neg.frameNo}</span>
                <span className="tracking-wider uppercase">
                  {isZh ? neg.labelZh : neg.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right tools: Language + Safelight switch */}
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <SafelightSwitch />
        </div>
      </div>
    </header>
  );
}
