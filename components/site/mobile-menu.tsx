"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Camera,
  Compass,
  Home,
  LayoutGrid,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { SOCIAL_LINKS } from "./social-links";
import { SocialBadge } from "./social-badge";

export interface MobilePillar {
  readonly href: string;
  readonly label: string;
}

/**
 * Client-side icon resolution: Lucide component references must never
 * cross the server→client prop boundary (RSC serialization), so the
 * menu maps href → icon locally instead of receiving components.
 */
const PILLAR_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/#projects": LayoutGrid,
  "/posts": BookOpen,
  "/photography": Camera,
  "/resume": Compass,
};

/**
 * BRAWUKA-45 · Narrow-screen drawer: same 5 pillars + social matrix,
 * no layout shift (absolute panel under the sticky bar), ESC to close.
 */
export function MobileMenu({ pillars }: { pillars: ReadonlyArray<MobilePillar> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
        className="inline-flex h-7 w-7 items-center justify-center border border-border-plate text-text-primary transition-colors hover:border-ink-dominant"
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-14 border-b border-border-plate bg-substrate/95 backdrop-blur-md">
          <nav aria-label="移动端导航" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.href] ?? Home;
              return (
                <Link
                  key={pillar.href}
                  href={pillar.href}
                  onClick={() => setOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setOpen(false);
                  }}
                  className="flex items-center gap-2.5 border border-transparent px-2 py-2 font-telemetry text-xs tracking-[0.1em] text-text-primary transition-colors hover:border-border-plate hover:bg-chamber"
                >
                  <Icon className="h-3.5 w-3.5 text-ink-dominant" />
                  <span>{pillar.label}</span>
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-1.5 border-t border-border-plate px-2 pt-3 pb-1">
              <span className="mr-1 font-telemetry text-[10px] tracking-[0.14em] text-muted">
                CONNECT //
              </span>
              {SOCIAL_LINKS.map((link) => (
                <SocialBadge key={link.key} link={link} />
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
