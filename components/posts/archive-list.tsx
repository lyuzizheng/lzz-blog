"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export interface ArchivePost {
  slug: string;
  permalink: string;
  title: string;
  summary?: string;
  date: string;
  category: string;
  tags: string[];
  reading_time?: number;
  cover_image?: string;
}

/**
 * ArchiveList: Editorial single-column chronological timeline (The Archive Reading Room).
 *
 * Invariants:
 * - Masthead: candid "Posts & Thoughts" serif title + mono telemetry.
 * - Single column timeline layout ordered chronologically with hairline axis and year markers.
 * - Subtle scroll-in animations via framer-motion whileInView.
 * - Mono filter toolbar with ALL/STUDY/ESSAY channel tabs and frameless bottom-hairline search.
 * - Pure-text tags with cobalt active state (no pill badges).
 * - Hover row interaction: title shifts to cobalt #2148B8 with translate-x-1.
 * - Contact sheet hover proof follower near cursor (pointer-events-none, desktop only).
 * - No cards, zero shadow hovers, zero frosted glass, zero lucide icon walls.
 */
export function ArchiveList({ posts }: { posts: ArchivePost[] }) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  // prefers-reduced-motion: rows mount at final state, no scroll-in drift.
  const reduceMotion = useReducedMotion();

  const [activeChannel, setActiveChannel] = useState<"all" | "study" | "essay">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Contact sheet hover proof (cursor follower).
  // Position lives in refs and is written straight to the preview node's style —
  // mousemove never triggers a React re-render of the archive tree.
  const [hoveredCover, setHoveredCover] = useState<string | null>(null);
  const cursorRef = React.useRef({ x: 0, y: 0 });
  const previewRef = React.useRef<HTMLDivElement | null>(null);

  const placePreview = () => {
    const el = previewRef.current;
    if (!el || typeof window === "undefined") return;
    const { x, y } = cursorRef.current;
    el.style.left = `${Math.max(16, Math.min(x + 20, window.innerWidth - 210))}px`;
    el.style.top = `${Math.max(16, Math.min(y - 70, window.innerHeight - 140))}px`;
  };

  const trackCursor = (e: React.MouseEvent) => {
    cursorRef.current = { x: e.clientX, y: e.clientY };
    placePreview();
  };

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (activeChannel !== "all" && post.category !== activeChannel) return false;
        if (selectedTag && !post.tags.includes(selectedTag)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchSummary = (post.summary || "").toLowerCase().includes(q);
          const matchTag = post.tags.some((tag) => tag.toLowerCase().includes(q));
          return matchTitle || matchSummary || matchTag;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, activeChannel, selectedTag, searchQuery]);

  const groupedByYear = useMemo(() => {
    const map = new Map<string, ArchivePost[]>();
    filteredPosts.forEach((post) => {
      const year = post.date.slice(0, 4);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(post);
    });
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredPosts]);

  const telemetry = useMemo(() => {
    if (posts.length === 0) return "0 DISPATCHES";
    const years = posts
      .map((p) => Number(p.date.slice(0, 4)))
      .filter((y) => !isNaN(y) && y > 1970);
    const minYear = years.length > 0 ? Math.min(...years) : 2014;
    const maxYear = Math.max(2026, ...years);
    return `${posts.length} DISPATCHES · ${minYear}—${maxYear}`;
  }, [posts]);

  const channels = [
    { id: "all" as const, label: "ALL", count: posts.length },
    {
      id: "study" as const,
      label: "STUDY",
      count: posts.filter((p) => p.category === "study").length,
    },
    {
      id: "essay" as const,
      label: "ESSAY",
      count: posts.filter((p) => p.category === "essay").length,
    },
  ];

  return (
    <>
      {/* 1. 刊头 (Masthead): 一行收束 —— 纯粹简约直白的 Posts & Thoughts + telemetry */}
      <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Posts &amp; Thoughts
        </h1>
        <div className="font-telemetry text-xs uppercase tracking-wider text-muted tabular-nums">
          {telemetry}
        </div>
      </header>

      {/* 4. 过滤工具行: 通道 ALL / STUDY / ESSAY + 无框 mono input + 纯文本标签 */}
      <div className="mb-10 flex flex-col gap-4 border-b border-border-plate pb-6 font-telemetry">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {/* 通道切换（下划线指示态） */}
          <div
            className="flex items-center gap-5"
            role="tablist"
            aria-label={isZh ? "文章分类通道" : "Article channels"}
          >
            {channels.map((channel) => {
              const isActive = activeChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`relative cursor-pointer py-1 text-xs transition-colors ${
                    isActive
                      ? "font-semibold text-text-primary"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  <span>{channel.label}</span>
                  <span className="ml-1.5 tabular-nums opacity-60">{channel.count}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-px transition-opacity ${
                      isActive ? "bg-ink-dominant opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 搜索框：无框 mono input（仅底部 hairline） */}
          <div className="w-full sm:w-56">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isZh ? "搜索 / SEARCH..." : "SEARCH..."}
              aria-label={isZh ? "搜索文章" : "Search articles"}
              className="h-8 w-full border-0 border-b border-border-plate bg-transparent px-1 py-1 text-xs text-text-primary placeholder:text-muted focus:border-ink-dominant focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* 纯文本标签：选中态仅加钴蓝，去 pill 底色 */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 pt-1 text-xs">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  aria-pressed={isSelected}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "font-semibold text-cobalt underline decoration-cobalt/60 underline-offset-4"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. 单列时间线列表 (Single column timeline with scroll animations) */}
      {groupedByYear.length === 0 ? (
        <div className="my-16 border border-dashed border-border-plate py-12 text-center">
          <p className="font-telemetry text-sm text-muted">{t.posts.noResults}</p>
        </div>
      ) : (
        <div className="relative border-l border-border-plate/60 pl-5 sm:pl-8 space-y-12">
          {groupedByYear.map(([year, yearPosts]) => (
            <section key={year} aria-label={`${year} ${t.posts.yearArchive}`} className="relative">
              {/* 年份时间线锚节点 */}
              <div className="relative -ml-[25px] sm:-ml-[37px] flex items-center gap-3 pt-2 pb-4">
                <div className="h-2 w-2 rotate-45 border border-ink-dominant bg-substrate ring-4 ring-substrate" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-border-plate/60" />
                <span className="font-telemetry text-xs text-muted tabular-nums">
                  {yearPosts.length} {t.posts.yearArchive}
                </span>
              </div>

              {/* 单列文章流：向下滚动带丝滑淡入微动效 */}
              <div className="divide-y divide-border-plate/50 border-t border-b border-border-plate/60">
                {yearPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.15), ease: "easeOut" }}
                  >
                    <Link
                      href={post.permalink}
                      onMouseEnter={(e) => {
                        if (!post.cover_image) return;
                        cursorRef.current = { x: e.clientX, y: e.clientY };
                        setHoveredCover(post.cover_image);
                      }}
                      onMouseMove={post.cover_image ? trackCursor : undefined}
                      onMouseLeave={() => setHoveredCover(null)}
                      className="group flex flex-col gap-y-1.5 py-3.5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6 hover:bg-surface/20"
                    >
                      {/* 日期 + 标题 */}
                      <div className="flex min-w-0 flex-1 items-baseline gap-3 sm:gap-5">
                        <span className="shrink-0 font-telemetry text-xs text-muted tabular-nums">
                          {post.date.slice(5, 10)}
                        </span>
                        <span className="font-display text-base sm:text-lg font-medium text-text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:text-cobalt">
                          {post.title}
                        </span>
                      </div>

                      {/* 标签 + 阅读时长 */}
                      <div className="flex shrink-0 items-baseline gap-4 pl-8 sm:pl-0 font-telemetry text-xs text-muted">
                        {post.tags.length > 0 && (
                          <div className="hidden md:flex items-center gap-2 text-[11px] text-muted/80">
                            {post.tags.map((tag) => (
                              <span key={tag}>#{tag}</span>
                            ))}
                          </div>
                        )}
                        <span className="tabular-nums shrink-0">
                          {post.reading_time ?? "—"} {t.posts.readingTime}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* 3. 暗房接触印相 hover 浮层 (Contact sheet preview near cursor) */}
      {hoveredCover && (
        <div
          ref={(el) => {
            previewRef.current = el;
            placePreview();
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block overflow-hidden border border-border-plate bg-surface p-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hoveredCover}
            alt=""
            className="h-28 w-44 object-cover grayscale contrast-125"
          />
        </div>
      )}
    </>
  );
}
