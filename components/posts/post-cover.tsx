"use client";

import type { Post } from "#site/content";
import { MonoColorCover } from "@/components/ui/mono-color-cover";

export function PostCover({ post }: { post: Post }) {
  return (
    <div className="mb-12 max-w-4xl">
      {post.cover_image ? (
        <div className="border border-border-plate bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.cover?.alt || post.title}
            className="max-h-[500px] w-full object-cover"
          />
          {post.cover?.caption && (
            <p className="border-t border-border-plate/60 p-3 text-center font-telemetry text-xs text-muted">
              {post.cover.caption}
            </p>
          )}
        </div>
      ) : (
        <MonoColorCover
          title={post.title}
          category={post.category}
          tags={post.tags}
          date={post.date}
          readingTime={post.reading_time}
          wordCount={post.word_count}
        />
      )}
    </div>
  );
}
