"use client";

import { ArchiveCard } from "./archive-card";
import { type ArchivePost } from "./archive-list";

interface ArchiveTimelineProps {
  groupedByYear: [string, ArchivePost[]][];
  yearArchiveLabel: string;
  readingTimeLabel: string;
  reduced: boolean | null;
}

export function ArchiveTimeline({
  groupedByYear,
  yearArchiveLabel,
  readingTimeLabel,
  reduced,
}: ArchiveTimelineProps) {
  return (
    <div className="relative border-l border-border-plate pl-5 sm:pl-8 space-y-16">
      {groupedByYear.map(([year, yearPosts]) => (
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
            {yearPosts.map((post, idx) => (
              <ArchiveCard
                key={post.slug}
                post={post}
                index={idx}
                readingTimeLabel={readingTimeLabel}
                reduced={reduced}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
