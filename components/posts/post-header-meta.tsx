"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PostHeaderMetaProps {
  category: string;
  date: string;
  readingTime: number;
  wordCount?: number;
  author: string;
}

export function PostHeaderMeta({
  category,
  date,
  readingTime,
  wordCount,
  author,
}: PostHeaderMetaProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <>
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-1.5 rounded border border-border-plate/60 bg-chamber/60 px-2.5 py-1 text-xs font-telemetry text-text-secondary transition-colors hover:border-border-plate hover:text-text-primary"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span>
          {isZh ? "全部文章" : "ALL POSTS"} · {category.toUpperCase()}
        </span>
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border-plate/60 py-3 text-xs font-telemetry text-muted">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-ink-dominant" />
          <time dateTime={date} className="tabular-nums">
            {date.slice(0, 10)}
          </time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-ink-dominant" />
          <span className="tabular-nums">
            {readingTime} {t.posts.readingTime}
          </span>
        </div>
        {wordCount !== undefined && wordCount > 0 && (
          <div className="hidden items-center gap-1.5 sm:flex">
            <BookOpen className="h-3.5 w-3.5 text-ink-dominant" />
            <span className="tabular-nums">
              {wordCount} {t.posts.wordCount}
            </span>
          </div>
        )}
        <div className="ml-auto text-[11px] opacity-75">
          <span>BY {author.toUpperCase()}</span>
        </div>
      </div>
    </>
  );
}
