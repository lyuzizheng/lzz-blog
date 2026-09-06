"use client";

import React from "react";
import Link from "next/link";
import { LanguageSwitch, SafelightSwitch } from "@/components/ui";

export interface DeckEyebrowProps {
  section: string; // e.g. "§01", "§02", "§03"
}

/**
 * BRAWUKA-64 · In-screen eyebrow header for homepage deck slides.
 * Replaces global sticky header per DESIGN_V2 §7.4 / Q10-A.
 * Left: LZZ · §号
 * Right: 01–04 索引 + LanguageSwitch + 昼夜点 (语义 nav 留 DOM)
 */
export function DeckEyebrow({ section }: DeckEyebrowProps) {
  return (
    <header className="w-full border-b border-border-plate pb-3 pt-2 font-telemetry text-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* 左: LZZ · §号 */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-semibold uppercase tracking-wider text-ink-dominant transition-colors hover:text-text-primary"
            aria-label="LZZ Atelier Homepage"
          >
            LZZ · {section}
          </Link>
        </div>

        {/* 右: 01–04 索引 + LanguageSwitch + 昼夜点 (语义 nav 留 DOM) */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <nav
            aria-label="01–04 索引导航"
            className="flex items-center gap-1.5 sm:gap-3 uppercase tracking-wider text-muted font-telemetry text-xs"
          >
            <Link
              href="/posts"
              className="transition-colors hover:text-ink-dominant"
              title="01 文章归档 / Writings"
            >
              <span className="font-semibold text-ink-dominant sm:font-normal sm:text-muted sm:hover:text-ink-dominant">
                01
              </span>
              <span className="hidden md:inline ml-1 text-text-secondary hover:text-ink-dominant">
                Writings
              </span>
            </Link>
            <span className="text-border-plate" aria-hidden="true">/</span>
            <Link
              href="/photography"
              className="transition-colors hover:text-ink-dominant"
              title="02 摄影暗房 / Darkroom"
            >
              <span className="font-semibold text-ink-dominant sm:font-normal sm:text-muted sm:hover:text-ink-dominant">
                02
              </span>
              <span className="hidden md:inline ml-1 text-text-secondary hover:text-ink-dominant">
                Darkroom
              </span>
            </Link>
            <span className="text-border-plate" aria-hidden="true">/</span>
            <Link
              href="/resume"
              className="transition-colors hover:text-ink-dominant"
              title="03 经历航线 / Flight Path"
            >
              <span className="font-semibold text-ink-dominant sm:font-normal sm:text-muted sm:hover:text-ink-dominant">
                03
              </span>
              <span className="hidden md:inline ml-1 text-text-secondary hover:text-ink-dominant">
                Flight
              </span>
            </Link>
            <span className="text-border-plate" aria-hidden="true">/</span>
            <Link
              href="/products"
              className="transition-colors hover:text-ink-dominant"
              title="04 产品展台 / Products"
            >
              <span className="font-semibold text-ink-dominant sm:font-normal sm:text-muted sm:hover:text-ink-dominant">
                04
              </span>
              <span className="hidden md:inline ml-1 text-text-secondary hover:text-ink-dominant">
                Products
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 border-l border-border-plate pl-2 sm:pl-3">
            <LanguageSwitch variant="eyebrow" />
            <SafelightSwitch variant="eyebrow" />
          </div>
        </div>
      </div>
    </header>
  );
}
