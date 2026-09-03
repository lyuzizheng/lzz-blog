import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { SOCIAL_LINKS } from "./social-links";

/**
 * BRAWUKA-45 · Shared footer: copyright plate, normalized Social Connect
 * matrix (label + handle, no dead whitespace), stack register.
 */
export function SiteFooter({ variant = "atelier" }: { variant?: "atelier" | "darkroom" }) {
  return (
    <footer className="w-full border-t border-border-plate bg-substrate py-6 font-telemetry text-xs text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <span>
            © 2026 {siteConfig.author} ·{" "}
            {variant === "darkroom" ? "The Darkroom Chamber" : "The Digital Darkroom & Print Atelier"}
          </span>
          <nav aria-label="社交媒体矩阵" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="tracking-[0.14em] text-text-secondary">CONNECT //</span>
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
              POSTS // 归档
            </Link>
            <Link href="/resume" className="transition-colors hover:text-text-primary">
              RESUME // 航线
            </Link>
            <a href="/resume.pdf" download className="transition-colors hover:text-text-primary">
              PDF // 直链下载
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
