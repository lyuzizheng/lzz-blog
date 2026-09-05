import React from "react";
import Link from "next/link";
import { SafelightSwitch, LanguageSwitch } from "@/components/ui";
import { FilmIndex, type FilmPillar } from "./film-index";
import { SOCIAL_LINKS } from "./social-links";
import { SocialBadge } from "./social-badge";


/**
 * Core destination routes referenced by the header index.
 */
export const HEADER_NAV_ROUTES = ["/", "/posts", "/photography", "/resume", "/products"] as const;

/**
 * BRAWUKA-45 · Shared sticky site header: logo + coordinates, film-clip
 * index toggle, monochrome social microbadges, safelight switch.
 * Server-rendered; the unfurl panel is a client island (fixed h-14,
 * absolute overlay → Zero CLS).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/85 backdrop-blur-md transition-colors duration-300">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-primary"
            aria-label="LZZ Atelier"
          >
            LZZ ATELIER
          </Link>
          <span className="hidden font-telemetry text-[11px] text-muted lg:inline-block">
            / 01°20&apos;N 103°49&apos;E / 2026.09
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FilmIndex />
          <div className="mr-1 hidden items-center gap-1.5 xl:flex" aria-label="社交媒体外链">
            {SOCIAL_LINKS.map((link) => (
              <SocialBadge key={link.key} link={link} />
            ))}
          </div>
          <LanguageSwitch />
          <SafelightSwitch />
        </div>
      </div>
    </header>
  );
}
