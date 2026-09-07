"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ArchivePost } from "./archive-list";

interface ArchiveCardProps {
  post: ArchivePost;
  index: number;
  readingTimeLabel: string;
  reduced: boolean | null;
}

export function ArchiveCard({
  post,
  index,
  readingTimeLabel,
  reduced,
}: ArchiveCardProps) {
  return (
    <motion.article
      key={post.slug}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.2),
        ease: "easeOut",
      }}
    >
      <Link
        href={post.permalink}
        className="group flex flex-col overflow-hidden rounded-[4px] border border-border-plate bg-surface/50 transition-all duration-300 hover:border-ink-dominant/60 hover:bg-surface/90 lg:flex-row"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-chamber/60 sm:aspect-[16/9] lg:aspect-auto lg:w-[40%] shrink-0 border-b border-border-plate/60 lg:border-b-0 lg:border-r">
          {post.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="relative flex h-full min-h-[220px] w-full flex-col justify-between p-6 select-none bg-substrate"
              style={{
                backgroundImage: `radial-gradient(var(--halftone-dot-color, rgba(33, 72, 184, 0.15)) 1.5px, transparent 1.5px)`,
                backgroundSize: `16px 16px`,
              }}
            >
              <div className="flex items-center justify-between font-telemetry text-[10px] tracking-widest text-ink-dominant uppercase">
                <span>KODAK 400TX</span>
                <span>[{post.category.toUpperCase()}]</span>
              </div>
              <div className="my-auto py-3">
                <p className="font-display text-base sm:text-lg font-bold text-text-primary line-clamp-2">
                  {post.title}
                </p>
              </div>
              <div className="flex items-center justify-between font-telemetry text-[10px] text-muted">
                <span>LZZ ATELIER SPEC</span>
                <span className="tabular-nums">{post.date.slice(0, 10)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <div className="mb-3 flex items-center justify-between font-telemetry text-xs text-muted">
              <span className="font-semibold uppercase tracking-wider text-ink-dominant">
                [{post.category.toUpperCase()}]
              </span>
              <time dateTime={post.date} className="tabular-nums">
                {post.date.slice(0, 10)}
              </time>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight text-text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:text-cobalt">
              {post.title}
            </h2>

            {post.summary && (
              <p className="mt-3.5 font-display text-sm sm:text-base leading-relaxed text-text-secondary line-clamp-3">
                {post.summary}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-plate/60 pt-4 font-telemetry text-xs text-muted">
            <div className="flex flex-wrap items-center gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[2px] border border-border-plate/60 bg-chamber/40 px-1.5 py-0.5 text-[11px] text-muted transition-colors group-hover:border-border-plate-strong group-hover:text-text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="tabular-nums shrink-0 text-text-secondary">
              {post.reading_time ?? "—"} {readingTimeLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
