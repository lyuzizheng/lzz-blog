"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Post } from "#site/content";

export function PostNavigation({
  prev,
  next,
}: {
  prev: Post | null;
  next: Post | null;
}) {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <nav
      aria-label={isZh ? "相邻文章导航" : "Adjacent posts"}
      className="mt-8 max-w-[40rem] border-t-2 border-border-strong"
    >
      {prev && (
        <Link
          href={prev.permalink}
          className="group flex items-baseline justify-between gap-4 border-b border-border-plate/60 py-4"
        >
          <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
            ← {isZh ? t.posts.prevPost : "PREV"}
          </span>
          <span className="text-right font-display text-lg leading-snug text-text-primary group-hover:text-ink-dominant">
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.permalink}
          className="group flex items-baseline justify-between gap-4 border-b border-border-plate/60 py-4"
        >
          <span className="font-display text-lg leading-snug text-text-primary group-hover:text-ink-dominant">
            {next.title}
          </span>
          <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
            {isZh ? t.posts.nextPost : "NEXT"} →
          </span>
        </Link>
      )}
    </nav>
  );
}
