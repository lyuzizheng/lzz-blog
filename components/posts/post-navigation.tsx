"use client";

import Link from "next/link";
import type { Post } from "#site/content";

export function PostNavigation({
  prev,
  next,
}: {
  prev: Post | null;
  next: Post | null;
}) {
  return (
    <nav
      aria-label="相邻文章"
      className="mt-8 max-w-[40rem] border-t-2 border-border-strong xl:ml-[13.5rem]"
    >
      {prev && (
        <Link
          href={prev.permalink}
          className="group flex items-baseline justify-between gap-4 border-b border-border-plate/60 py-4"
        >
          <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
            ← PREV
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
            NEXT →
          </span>
        </Link>
      )}
    </nav>
  );
}
