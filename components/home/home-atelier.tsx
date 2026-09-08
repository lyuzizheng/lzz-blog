"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/components/site/social-links";
import { LanguageSwitch, SafelightSwitch } from "@/components/ui";
import { AmbientBackdrop } from "./ambient-backdrop";
import { FilmStack } from "./film-stack";

/**
 * BRAWUKA-78 · HomeAtelier — the single-screen darkroom workbench.
 *
 * One 100dvh frame, no scrolling, no slides: identity (avatar, name, one-line
 * bio, social matrix) above the stacked film index. Nothing else competes
 * for attention — the page is the cover of the atelier, not a landing page.
 */
export function HomeAtelier() {
  const { t } = useI18n();

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden">
      <AmbientBackdrop />

      {/* Corner controls — quiet, out of the way */}
      <div className="absolute right-4 top-4 z-40 flex items-center gap-3 sm:right-6 sm:top-5">
        <LanguageSwitch variant="eyebrow" />
        <SafelightSwitch variant="eyebrow" />
      </div>

      {/* Center column: identity + film stack enclosed in darkroom easel frame */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl flex-1 flex-col items-center justify-center px-3 py-2 sm:px-6 sm:py-6">
        <div className="relative flex w-full flex-col items-center px-3 py-3 sm:px-8 sm:py-7 md:px-12 md:py-8">
          {/* BRAWUKA-86 · Darkroom easel light-table frame enclosing identity + chapter negatives */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[4px] border border-[var(--ink-faint)]"
            aria-hidden="true"
          >
            {/* Inner dashed plate */}
            <div className="absolute inset-1.5 rounded-[2px] border border-dashed border-[var(--ink-faint)] opacity-60" />

            {/* Live edge accent line at the top */}
            <div className="absolute left-1.5 right-1.5 top-1.5 h-[1px] bg-[var(--ink-dominant)] opacity-25" />

            {/* Precision ruler ticks along the panel's top edge */}
            <svg
              className="absolute -top-3 left-2 right-2 h-3 w-[calc(100%-1rem)] overflow-visible text-[var(--ink-faint)] opacity-80"
              preserveAspectRatio="none"
              viewBox="0 0 100 12"
              fill="none"
              aria-hidden="true"
            >
              {Array.from({ length: 37 }).map((_, i) => (
                <line
                  key={i}
                  x1={i * (100 / 36)}
                  y1={12}
                  x2={i * (100 / 36)}
                  y2={i % 6 === 0 ? 0 : 6}
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Registration crosshair in lower right corner */}
            <div className="absolute bottom-2.5 right-2.5 flex h-4 w-4 items-center justify-center text-[var(--ink-faint)] opacity-70">
              <span className="absolute h-full w-[1px] bg-current" />
              <span className="absolute h-[1px] w-full bg-current" />
              <span className="h-2 w-2 rounded-full border border-current" />
            </div>
          </div>

          <header className="animate-latent-develop flex flex-col items-center text-center">
            <Image
              src="/avatar.jpg"
              alt={t.home.title}
              width={88}
              height={88}
              priority
              className="h-16 w-16 rounded-full border border-border-plate object-cover shadow-[var(--shadow-plate)] sm:h-[88px] sm:w-[88px]"
            />
            <p className="mt-2 font-telemetry text-[9px] uppercase tracking-[0.18em] text-muted sm:mt-4 sm:text-[11px] sm:tracking-[0.24em]">
              {t.home.tagline}
            </p>
            <h1 className="mt-1 font-display text-2xl font-normal leading-tight tracking-tight text-primary sm:mt-2 sm:text-4xl">
              {t.home.title}
            </h1>
            <p className="mt-2 max-w-md font-body text-[12px] leading-[1.45] text-muted sm:mt-3 sm:max-w-xl sm:text-base sm:leading-relaxed md:max-w-2xl lg:max-w-3xl">
              {t.home.heroSubtitle}
            </p>

            {/* Social matrix */}
            <nav
              aria-label="Social links"
              className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-telemetry text-[10px] tracking-wide text-muted sm:mt-4 sm:gap-x-3 sm:gap-y-2 sm:text-xs sm:tracking-wider"
            >
              {SOCIAL_LINKS.map((link, index) => (
                <React.Fragment key={link.key}>
                  {index > 0 && (
                    <span className="select-none text-muted opacity-40" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink-dominant underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </nav>
          </header>

          <div className="mt-3 w-full sm:mt-8">
            <FilmStack />
          </div>
        </div>
      </div>
    </div>
  );
}
