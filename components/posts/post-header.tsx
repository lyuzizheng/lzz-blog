"use client";

import type { Post } from "#site/content";
import { useI18n } from "@/lib/i18n";

export function PostHeader({ post }: { post: Post }) {
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <header className="mb-10 max-w-3xl">
      {post.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 font-telemetry text-xs">
          <span className="font-semibold uppercase tracking-wider text-ink-dominant">
            [{post.category.toUpperCase()}]
          </span>
          <span className="text-border-plate">/</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted transition-colors hover:text-text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.18] tracking-tight text-text-primary">
        {post.title}
      </h1>

      {post.summary && (
        <div className="mt-6 border-l-2 border-ink-dominant/50 py-0.5 pl-4">
          <p className="font-display text-base leading-relaxed text-text-secondary sm:text-lg">
            {post.summary}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-y border-border-plate/70 py-3 font-telemetry text-xs text-muted">
        <time dateTime={post.date} className="tabular-nums">
          {post.date.slice(0, 10)}
        </time>
        <span className="text-border-plate">·</span>
        <span className="tabular-nums">{post.reading_time} {t.posts.readingTime}</span>
        {post.word_count > 0 && (
          <>
            <span className="text-border-plate">·</span>
            <span className="tabular-nums">{Math.round(post.word_count)} {t.posts.wordCount}</span>
          </>
        )}
        <span className="ml-auto uppercase tracking-wider opacity-75">
          {isZh ? `作者 / ${post.author.toUpperCase()}` : `BY ${post.author.toUpperCase()}`}
        </span>
      </div>
    </header>
  );
}
