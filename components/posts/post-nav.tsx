"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PostNavProps {
  tags: string[];
  prevPost: { slug: string; permalink: string; title: string } | null;
  nextPost: { slug: string; permalink: string; title: string } | null;
}

export function PostNav({ tags, prevPost, nextPost }: PostNavProps) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  return (
    <>
      {/* Bottom Meta & Tags */}
      <div className="mt-12 border-t border-border-plate pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-telemetry text-muted">
              {isZh ? "标签：" : "Tags:"}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border-plate bg-chamber px-2.5 py-0.5 font-telemetry text-xs text-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href="/posts"
            className="flex items-center gap-1 text-xs font-telemetry text-ink-dominant hover:underline"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{t.posts.backToPosts}</span>
          </Link>
        </div>
      </div>

      {/* Adjacent Posts Navigation Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevPost ? (
          <Link
            href={prevPost.permalink}
            className="group rounded-lg border border-border-plate bg-surface/60 p-4 transition-all hover:border-ink-dominant/50 hover:bg-surface"
          >
            <span className="text-[11px] font-telemetry text-muted block mb-1">
              ← {t.posts.prevPost}
            </span>
            <span className="line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-ink-dominant">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link
            href={nextPost.permalink}
            className="group rounded-lg border border-border-plate bg-surface/60 p-4 text-right transition-all hover:border-ink-dominant/50 hover:bg-surface"
          >
            <span className="text-[11px] font-telemetry text-muted block mb-1">
              {t.posts.nextPost} →
            </span>
            <span className="line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-ink-dominant">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
