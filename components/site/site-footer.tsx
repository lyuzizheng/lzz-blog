"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { SOCIAL_LINKS } from "./social-links";
import { useI18n } from "@/lib/i18n";

/**
 * BRAWUKA-45 · Shared footer: copyright plate, normalized Social Connect
 * matrix (label + handle, no dead whitespace), stack register.
 */
export function SiteFooter({ variant = "atelier" }: { variant?: "atelier" | "darkroom" }) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  const chamberTitle =
    variant === "darkroom"
      ? isZh
        ? t.footer.darkroomChamber
        : "The Darkroom Chamber"
      : isZh
        ? t.footer.printAtelier
        : "The Digital Darkroom & Print Atelier";

  return (
    <footer className="w-full border-t border-border-plate bg-substrate py-6 font-telemetry text-xs text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <span>
            © 2026 {siteConfig.author} · {chamberTitle}
          </span>
          <nav aria-label={isZh ? "社交媒体矩阵" : "Social media links"} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="tracking-[0.14em] text-text-secondary">{isZh ? "社交平台" : "CONNECT"}</span>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="tracking-[0.08em] transition-colors hover:text-text-primary"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-border-plate/60 pt-3 text-[11px] md:flex-row">
          <div className="flex items-center gap-4">
            <span>NEXT.JS 15 (APP ROUTER)</span>
            <span>TURBOPACK</span>
            <span>VELITE · MDX</span>
            <span className="hidden sm:inline">LENIS KINETIC</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/posts" className="transition-colors hover:text-text-primary">
              {isZh ? "文章归档" : "POSTS"}
            </Link>
            <Link href="/resume" className="transition-colors hover:text-text-primary">
              {isZh ? "个人履历" : "RESUME"}
            </Link>
            <Link href="/status" className="transition-colors hover:text-text-primary">
              {isZh ? "系统状态" : "STATUS"}
            </Link>
            <a href="/resume.pdf" download className="transition-colors hover:text-text-primary">
              {isZh ? "简历下载" : "DOWNLOAD PDF"}
            </a>
        </div>
          </div>
      </div>
    </footer>
  );
}
