import React from "react";
import Link from "next/link";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import { FilmIndex, type FilmPillar } from "./film-index";
import { SOCIAL_LINKS } from "./social-links";
import { SocialBadge } from "./social-badge";

export type NavPillar = FilmPillar;

/**
 * BRAWUKA-57 · Four-pillar global navigation (/#projects retired with the bento).
 */
export const NAV_PILLARS: ReadonlyArray<NavPillar> = [
  { href: "/", label: "ATELIER // 门厅" },
  { href: "/posts", label: "DISPATCHES // 归档" },
  { href: "/photography", label: "DARKROOM // 暗房" },
  { href: "/resume", label: "FLIGHT PATH // 航线" },
];

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
            aria-label="LZZ Atelier — 返回门厅"
          >
            LZZ ATELIER
          </Link>
          <span className="hidden font-telemetry text-[11px] text-muted lg:inline-block">
            / 01°20&apos;N 103°49&apos;E / 2026.09
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FilmIndex pillars={NAV_PILLARS} />
          <div className="mr-1 hidden items-center gap-1.5 xl:flex" aria-label="社交媒体外链">
            {SOCIAL_LINKS.map((link) => (
              <SocialBadge key={link.key} link={link} />
            ))}
          </div>
          <SafelightSwitch />
        </div>
      </div>
    </header>
  );
}
