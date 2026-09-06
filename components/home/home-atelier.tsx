"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { SOCIAL_LINKS, handleOf } from "@/components/site/social-links";
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

      {/* Center column: identity + film stack */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-8">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/avatar.jpg"
            alt={t.home.title}
            width={88}
            height={88}
            priority
            className="rounded-full border border-border-plate object-cover shadow-[var(--shadow-plate)]"
            style={{ width: 88, height: 88 }}
          />
          <p className="mt-4 font-telemetry text-[11px] uppercase tracking-[0.24em] text-muted">
            {t.home.tagline}
          </p>
          <h1 className="mt-2 font-display text-3xl font-normal leading-tight tracking-tight text-primary sm:text-4xl">
            {t.home.title}
          </h1>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted sm:text-base">
            {t.home.heroSubtitle}
          </p>

          {/* Social matrix */}
          <nav
            aria-label="Social links"
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-telemetry text-xs tracking-wider text-muted"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 transition-colors hover:text-ink-dominant"
              >
                <span className="font-semibold text-text-secondary group-hover:text-ink-dominant">
                  [{link.badge}]
                </span>
                <span className="underline-offset-2 group-hover:underline">
                  {handleOf(link.href)}
                </span>
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-6 w-full sm:mt-8">
          <FilmStack />
        </div>
      </div>
    </div>
  );
}
