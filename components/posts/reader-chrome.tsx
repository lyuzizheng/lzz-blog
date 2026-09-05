import React from "react";
import Link from "next/link";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import { LanguageSwitch } from "@/components/ui/language-switch";

/**
 * BRAWUKA-61 · Q10-A 屏内眉脚（替代全局 sticky header/footer 的文章链路 chrome）。
 * - 眉题：回链 + 章节 + 语言切换 + 昼夜点（必留：语言 / 昼夜 / 索引 / 语义 nav；创始人硬性要求语言键在 nightmode 旁）。
 * - 终屏：Colophon 一行（纸 / 墨配方 + 版权），非全局 sticky。
 */

export function ReaderEyebrow({
  backHref = "/posts",
  backLabel = "文章归档",
  section,
}: {
  backHref?: string;
  backLabel?: string;
  section?: string;
}) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 border-b-2 border-border-strong pb-3">
      <nav
        aria-label="本屏导航"
        className="flex min-w-0 items-center gap-2 font-telemetry text-xs text-muted"
      >
        <Link
          href={backHref}
          className="shrink-0 font-semibold uppercase tracking-wider text-ink-dominant hover:underline"
        >
          ← {backLabel}
        </Link>
        {section && (
          <span className="truncate uppercase tracking-wider">
            / <span className="text-text-secondary">{section}</span>
          </span>
        )}
      </nav>
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/"
          className="font-telemetry text-xs uppercase tracking-wider text-muted hover:text-text-primary"
        >
          Index
        </Link>
        <LanguageSwitch />
        <SafelightSwitch />
      </div>
    </div>
  );
}

export function ReaderColophon() {
  return (
    <footer className="mt-16 border-t border-border-plate pt-4 font-telemetry text-[11px] leading-relaxed text-muted">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <span>© 2026 ZIZHENG LYU · LZZ ATELIER</span>
        <span className="tabular-nums">
          PAPER #F5F1E8 · INK #2148B8 · SET IN NEWSREADER + NOTO SERIF SC
        </span>
      </div>
    </footer>
  );
}
