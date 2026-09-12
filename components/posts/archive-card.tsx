"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ArchivePost } from "./archive-list";

interface ArchiveCardProps {
  post: ArchivePost;
  index: number;
  readingTimeLabel: string;
  reduced: boolean | null;
  /** First card is the LCP candidate: load its cover eagerly. */
  eager?: boolean;
}

/**
 * Reveal-on-scroll card. Uses IntersectionObserver + CSS transition on
 * transform/opacity only — identical motion to the old framer-motion
 * `whileInView` (once, -30px margin, 0.35s easeOut, staggered delay) without
 * pulling the animation runtime into the /posts first-load bundle.
 */
export function ArchiveCard({
  post,
  index,
  readingTimeLabel,
  reduced,
  eager = false,
}: ArchiveCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-30px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const hidden = !reduced && !inView;

  return (
    <article
      ref={ref}
      className="transition-[opacity,transform] duration-[350ms] ease-out will-change-[opacity,transform]"
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "translateY(0)",
        transitionDelay: `${Math.min(index * 40, 200)}ms`,
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
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : "auto"}
              decoding="async"
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
    </article>
  );
}
