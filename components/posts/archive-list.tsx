"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Folder, Calendar, Clock, Search, X } from "lucide-react";

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
 * ArchiveList: channel/search/tag filtering + year-grouped results (client island).
 * Receives lean DTOs from the server shell — never the full Velite documents.
 */
export function ArchiveList({ posts }: { posts: ArchivePost[] }) {
  const [activeChannel, setActiveChannel] = useState<"all" | "study" | "essay">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
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
          const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));
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

  return (
    <>
      {/* Slim filter toolbar: channel tabs + compact search + tag strip */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-4" role="tablist" aria-label="文章通道">
            {(
              [
                { id: "all", label: "全部 ALL", count: posts.length },
                {
                  id: "study",
                  label: "技术 TECHNICAL",
                  count: posts.filter((p) => p.category === "study").length,
                },
                {
                  id: "essay",
                  label: "随笔 ESSAYS",
                  count: posts.filter((p) => p.category === "essay").length,
                },
              ] as const
            ).map((channel) => {
              const isActive = activeChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`relative py-1 font-telemetry text-xs transition-colors ${
                    isActive
                      ? "font-semibold text-text-primary"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {channel.label}
                  <span className="ml-1 tabular-nums opacity-70">{channel.count}</span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-px transition-opacity ${
                      isActive ? "bg-ink-dominant opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-52">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="检索标题、摘要或标签..."
              aria-label="检索文章"
              className="h-8 w-full rounded-full border border-border-plate/70 bg-chamber/40 pl-8 pr-3 font-telemetry text-xs text-text-primary placeholder:text-muted focus:border-ink-dominant focus:outline-none"
            />
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                aria-label="清除标签过滤"
                className="flex shrink-0 items-center gap-1 rounded-full bg-ink-dominant px-2 py-0.5 font-telemetry text-[11px] font-semibold text-text-badge"
              >
                <X className="h-3 w-3" />#{selectedTag}
              </button>
            )}
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full px-2 py-0.5 font-telemetry text-[11px] transition-colors ${
                    isSelected
                      ? "bg-ink-dominant font-semibold text-text-badge"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results List Grouped By Year */}
      {groupedByYear.length === 0 ? (
        <div className="my-12 rounded-xl border border-dashed border-border-plate p-12 text-center">
          <p className="font-telemetry text-sm text-muted">
            未找到匹配条件的文章，请调整检索关键词或过滤标签。
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByYear.map(([year, yearPosts]) => (
            <section key={year} className="relative" aria-label={`${year} 年归档`}>
              <div className="sticky top-16 z-20 mb-6 flex items-center gap-3 bg-substrate/90 py-2 backdrop-blur-sm">
                <span className="font-display text-2xl font-bold text-text-primary tabular-nums">
                  {year}
                </span>
                <div className="h-px flex-1 bg-border-plate" />
                <span className="font-telemetry text-xs text-muted tabular-nums">
                  {yearPosts.length} 篇归档
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {yearPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.permalink}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border-plate bg-surface/70 shadow-plate transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-dominant/50 hover:bg-surface hover:shadow-elevated"
                  >
                    {post.cover_image && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-chamber/40">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="mb-2.5 flex items-center justify-between text-xs font-telemetry text-muted">
                          <span className="flex items-center gap-1 uppercase font-semibold text-ink-dominant">
                            <Folder className="h-3 w-3" />
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 tabular-nums">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date.slice(5, 10)}</span>
                          </div>
                        </div>

                        <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-text-primary group-hover:text-ink-dominant transition-colors">
                          {post.title}
                        </h2>

                        {post.summary && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                            {post.summary}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-plate/60 pt-3 text-[11px] font-telemetry text-muted">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded border border-border-plate/80 bg-chamber/60 px-1.5 py-0.5"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                        <div className="flex shrink-0 items-center gap-1 tabular-nums text-text-secondary">
                          <Clock className="h-3 w-3 text-ink-dominant" />
                          <span>{post.reading_time ?? "—"} 分钟</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
