import React from "react";
import Link from "next/link";
import { BookOpen, Camera, Compass, Home, LayoutGrid, type LucideIcon } from "lucide-react";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import { MobileMenu } from "./mobile-menu";
import { SOCIAL_LINKS } from "./social-links";
import { SocialBadge } from "./social-badge";

export interface NavPillar {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

/**
 * BRAWUKA-45 · Five-pillar global navigation. Single source of truth —
 * every route renders this instead of a bespoke header (Zero drift).
 */
export const NAV_PILLARS: ReadonlyArray<NavPillar> = [
  { href: "/", label: "ATELIER // 门厅", icon: Home },
  { href: "/#projects", label: "PROJECTS // 作品", icon: LayoutGrid },
  { href: "/posts", label: "POSTS // 归档", icon: BookOpen },
  { href: "/photography", label: "DARKROOM // 暗房", icon: Camera },
  { href: "/resume", label: "RESUME // 航线", icon: Compass },
];

/**
 * BRAWUKA-45 · Shared sticky site header: logo + coordinates, 5-pillar
 * nav, monochrome social microbadges, safelight switch, mobile drawer.
 * Server-rendered; only the drawer is a client island.
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

        <nav aria-label="全局导航" className="hidden items-center gap-2 md:flex">
          {NAV_PILLARS.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="flex items-center gap-1.5 rounded-xs border border-border-plate px-2.5 py-1 font-telemetry text-[11px] text-text-primary transition-colors hover:border-ink-dominant"
            >
              <pillar.icon className="h-3 w-3 text-ink-dominant" />
              <span>{pillar.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="mr-1 hidden items-center gap-1.5 xl:flex" aria-label="社交媒体外链">
            {SOCIAL_LINKS.map((link) => (
              <SocialBadge key={link.key} link={link} />
            ))}
          </div>
          <SafelightSwitch />
          <MobileMenu pillars={NAV_PILLARS.map((pillar) => ({ href: pillar.href, label: pillar.label }))} />
        </div>
      </div>
    </header>
  );
}
