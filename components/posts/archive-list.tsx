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
 * ArchiveList: Editorial Big Card Timeline (The Archive Atelier).
 *
 * Implements founder's directive:
 * - Big cards (大卡片) with cover photo, prominent title, description, tags,
 *   created time, and estimated reading time.
 * - Single column timeline flow with subtle framer-motion whileInView scroll animations.
 * - Honors prefers-reduced-motion via useReducedMotion.
 * - Candid "Posts & Thoughts" serif masthead + mono telemetry.
 * - Mono filter toolbar with ALL/STUDY/ESSAY channel tabs and frameless bottom-hairline search.
 * - Pure-text tags with cobalt active state.
 * - Darkroom halftone art plate for articles without cover photos.
 */
export function ArchiveList({ posts }: { posts: ArchivePost[] }) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";
  const shouldReduceMotion = useReducedMotion();

  const [activeChannel, setActiveChannel] = useState<"all" | "study" | "essay">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

      {/* 2. 过滤工具行: 通道 ALL / STUDY / ESSAY + 无框 mono input + 纯文本标签 */}
      <div className="mb-10 flex flex-col gap-4 border-b border-border-plate pb-6 font-telemetry">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {/* 通道切换（下划线指示态） */}
          <div
            className="flex items-center gap-5"
            role="tablist"
            aria-label={isZh ? "文章分类" : "Filter by category"}
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
              placeholder={isZh ? "搜索文章..." : "Search articles..."}
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

      {/* 3. 大卡片时间线流 (Big Cards Timeline Stream with Scroll Animation) */}
      {groupedByYear.length === 0 ? (
        <div className="my-16 border border-dashed border-border-plate py-12 text-center">
          <p className="font-telemetry text-sm text-muted">{t.posts.noResults}</p>
        </div>
      ) : (
        <div className="relative border-l border-border-plate pl-5 sm:pl-8 space-y-16">
          {groupedByYear.map(([year, yearPosts]) => (
            <section key={year} aria-label={`${year} ${t.posts.yearArchive}`} className="space-y-6">
              {/* 年份时间线标头 */}
              <div className="relative -ml-[25px] sm:-ml-[37px] flex items-center gap-3 pt-2 pb-2">
                <div className="h-2 w-2 rotate-45 border border-ink-dominant bg-substrate ring-4 ring-substrate" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tabular-nums">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-border-plate/40" />
                <span className="font-telemetry text-xs text-muted tabular-nums">
                  {yearPosts.length} {t.posts.yearArchive}
                </span>
              </div>

              {/* 大卡片流：Cover Photo + Title + Description + Tags + Time + Reading Time */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {yearPosts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.04, 0.2),
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={post.permalink}
                      className="group flex flex-col overflow-hidden rounded-[4px] border border-border-plate bg-surface/50 transition-all duration-300 hover:border-ink-dominant/60 hover:bg-surface/90 lg:flex-row"
                    >
                      {/* Cover Photo: 存在则显示摄影/插图，无图则展示暗房版画画板 */}
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

                      {/* Content Section: Category, Date, Title, Description, Tags, Reading Time */}
                      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                        <div>
                          {/* Created Time & Category */}
                          <div className="mb-3 flex items-center justify-between font-telemetry text-xs text-muted">
                            <span className="font-semibold uppercase tracking-wider text-ink-dominant">
                              [{post.category.toUpperCase()}]
                            </span>
                            <time dateTime={post.date} className="tabular-nums">
                              {post.date.slice(0, 10)}
                            </time>
                          </div>

                          {/* Title */}
                          <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight text-text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:text-cobalt">
                            {post.title}
                          </h2>

                          {/* Description / Summary */}
                          {post.summary && (
                            <p className="mt-3.5 font-display text-sm sm:text-base leading-relaxed text-text-secondary line-clamp-3">
                              {post.summary}
                            </p>
                          )}
                        </div>

                        {/* Footer: Tags + Estimated Reading Time */}
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
                            {post.reading_time ?? "—"} {t.posts.readingTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
