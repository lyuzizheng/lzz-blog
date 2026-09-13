"use client";

import { useEffect, useRef, useState } from "react";
import { ArchiveCard } from "./archive-card";
import { type ArchivePost } from "./archive-list";

interface ArchiveTimelineProps {
  groupedByYear: [string, ArchivePost[]][];
  yearArchiveLabel: string;
  readingTimeLabel: string;
  reduced: boolean | null;
}

/** Cards rendered in the initial HTML / first paint. */
const INITIAL_CARD_COUNT = 3;
/** Sentinel lookahead — small enough that off-screen cards stay unmounted
 *  until the user actually scrolls. */
const SENTINEL_MARGIN = "100px";

/**
 * Progressive timeline: only the first INITIAL_CARD_COUNT cards are mounted
 * up front. The remaining year sections mount when the sentinel approaches
 * the viewport or on the first scroll — whichever first.
 * Once expanded it stays expanded across filter changes.
 */
export function ArchiveTimeline({
  groupedByYear,
  yearArchiveLabel,
  readingTimeLabel,
  reduced,
}: ArchiveTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const totalPosts = groupedByYear.reduce((n, [, posts]) => n + posts.length, 0);
  const hasMore = totalPosts > INITIAL_CARD_COUNT;

  useEffect(() => {
    if (expanded || !hasMore) return;

    const reveal = () => setExpanded(true);

    const el = sentinelRef.current;
    const observer = el
      ? new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) reveal();
          },
          { rootMargin: `${SENTINEL_MARGIN} 0px` }
        )
      : null;
    if (el && observer) observer.observe(el);

    window.addEventListener("scroll", reveal, { passive: true, once: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", reveal);
    };
  }, [expanded, hasMore]);

  let rendered = 0;

  return (
    <div className="relative border-l border-border-plate pl-5 sm:pl-8 space-y-16">
      {groupedByYear.map(([year, yearPosts], yearIdx) => {
        const visiblePosts = expanded
          ? yearPosts
          : yearPosts.slice(0, Math.max(0, INITIAL_CARD_COUNT - rendered));
        rendered += visiblePosts.length;
        if (visiblePosts.length === 0) return null;

        return (
          <section key={year} aria-label={`${year} ${yearArchiveLabel}`} className="space-y-6">
            <div className="relative -ml-[25px] sm:-ml-[37px] flex items-center gap-3 pt-2 pb-2">
              <div className="h-2 w-2 rotate-45 border border-ink-dominant bg-substrate ring-4 ring-substrate" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
                {year}
              </h2>
              <div className="h-px flex-1 bg-border-plate/40" />
              <span className="font-telemetry text-xs text-muted tabular-nums">
                {yearPosts.length} {yearArchiveLabel}
              </span>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {visiblePosts.map((post, idx) => (
                <ArchiveCard
                  key={post.slug}
                  post={post}
                  index={idx}
                  readingTimeLabel={readingTimeLabel}
                  reduced={reduced}
                  eager={yearIdx === 0 && idx === 0}
                />
              ))}
            </div>
          </section>
        );
      })}

      {!expanded && hasMore && (
        <div ref={sentinelRef} aria-hidden className="h-px" />
      )}
    </div>
  );
}
