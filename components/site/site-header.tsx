"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafelightSwitch, LanguageSwitch, openWipModal } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import { CHAPTER_NEGATIVES } from "@/lib/chapters";

/**
 * BRAWUKA-45 / BRAWUKA-93 · Shared Unified Header
 *
 * 100% aligned with /posts ReaderEyebrow:
 * - Left: "Lzz-Blog" (homepage brand link)
 * - Center: 5 mini rectangular negative links on desktop; labeled menu on mobile
 * - Right: Language switch + Safelight darkroom switch
 *
 * Clean, lightweight, generous whitespace, zero cluttered popups.
 */
export interface SiteHeaderProps {
  showControls?: boolean;
  className?: string;
}

export function SiteHeader({ showControls = true, className = "" }: SiteHeaderProps = {}) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !mobileMenuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/90 backdrop-blur-md transition-colors duration-300 ${className}`}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 sm:px-6 md:px-8">
        {/* Brand / Homepage link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap font-display text-base font-bold tracking-tight text-primary transition-colors hover:text-cobalt sm:text-lg"
            aria-label="Lzz-Blog"
          >
            Lzz-Blog
          </Link>
        </div>

        {/* Desktop: five mini rectangular negatives remain directly accessible. */}
        <nav
          aria-label={isZh ? "章节导航" : "Section chapter navigation"}
          className="hidden min-w-0 flex-1 items-center justify-center gap-2 overflow-x-auto py-0.5 sm:flex"
        >
          {CHAPTER_NEGATIVES.map((neg) => {
            const isWip = neg.key === "photography";
            const isActive =
              pathname === neg.href ||
              (neg.key === "blogs" && pathname.startsWith("/posts")) ||
              (neg.key === "career" && pathname.startsWith("/resume"));

            return (
              <Link
                key={neg.key}
                href={neg.href}
                onClick={(e) => {
                  if (isWip) {
                    e.preventDefault();
                    openWipModal();
                  }
                }}
                aria-label={`${neg.frameNo} ${isZh ? neg.labelZh : neg.label}`}
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
                {isWip && (
                  <span className="rounded-[1px] bg-amber-500/20 px-1 py-0.2 text-[8px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30 tracking-tight ml-0.5">
                    WIP
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile: one clear affordance reveals the same five labeled destinations. */}
        <div ref={mobileMenuRef} className="relative ml-auto sm:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              menuOpen
                ? isZh
                  ? "关闭章节菜单"
                  : "Close section menu"
                : isZh
                  ? "打开章节菜单"
                  : "Open section menu"
            }
            aria-controls="mobile-chapter-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:text-ink-dominant focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-dominant"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d={menuOpen ? "M5 5L19 19M19 5L5 19" : "M4 6.5H20M4 12H20M4 17.5H20"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>

          {menuOpen && (
            <nav
              id="mobile-chapter-menu"
              aria-label={isZh ? "移动端章节导航" : "Mobile section navigation"}
              className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-border-plate bg-substrate px-4 py-2 shadow-plate"
            >
              <div className="mx-auto max-w-5xl">
                {CHAPTER_NEGATIVES.map((neg) => {
                  const isWip = neg.key === "photography";
                  const isActive =
                    pathname === neg.href ||
                    (neg.key === "blogs" && pathname.startsWith("/posts")) ||
                    (neg.key === "career" && pathname.startsWith("/resume"));

                  return (
                    <Link
                      key={neg.key}
                      href={neg.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(event) => {
                        if (isWip) {
                          event.preventDefault();
                          setMenuOpen(false);
                          openWipModal();
                        }
                      }}
                      onNavigate={() => setMenuOpen(false)}
                      className={`flex min-h-11 items-center gap-4 border-b border-border-plate px-2 font-telemetry transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink-dominant ${
                        isActive
                          ? "text-ink-dominant"
                          : "text-muted hover:bg-chamber/40 hover:text-primary"
                      }`}
                    >
                      <span className="w-7 text-[11px] tabular-nums">{neg.frameNo}</span>
                      <span
                        className={`font-display text-lg ${isActive ? "text-ink-dominant" : "text-primary"}`}
                      >
                        {isZh ? neg.labelZh : neg.label}
                      </span>
                      {isWip && (
                        <span className="ml-auto rounded-[1px] border border-amber-500/30 bg-amber-500/20 px-1 text-[8px] font-bold tracking-tight text-amber-600 dark:text-amber-400">
                          WIP
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>

        {/* Right tools: Language + Safelight switch (Eyebrow Minimalist Mode) */}
        {showControls ? (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitch variant="eyebrow" />
            <SafelightSwitch variant="eyebrow" />
          </div>
        ) : (
          <div className="w-6" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
