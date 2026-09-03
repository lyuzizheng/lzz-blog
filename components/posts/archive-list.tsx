"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Folder, Calendar, Clock, Search, Filter } from "lucide-react";

export interface ArchivePost {
  slug: string;
  permalink: string;
  title: string;
  summary?: string;
  date: string;
  category: string;
  tags: string[];
  reading_time?: number;
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
      {/* Filter Controls: Channels + Search */}
      <div className="mb-8 space-y-4 rounded-xl border border-border-plate bg-surface/60 p-4 sm:p-5 shadow-plate">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveChannel("all")}
              className={`rounded-lg px-3 py-1.5 font-telemetry text-xs font-medium transition-all ${
                activeChannel === "all"
                  ? "bg-ink-dominant text-text-badge shadow-sm"
                  : "border border-border-plate bg-chamber/60 text-text-secondary hover:text-text-primary"
              }`}
            >
              全量通道 ALL ({posts.length})
            </button>
            <button
              onClick={() => setActiveChannel("study")}
              className={`rounded-lg px-3 py-1.5 font-telemetry text-xs font-medium transition-all ${
                activeChannel === "study"
                  ? "bg-ink-dominant text-text-badge shadow-sm"
                  : "border border-border-plate bg-chamber/60 text-text-secondary hover:text-text-primary"
              }`}
            >
              技术工程 TECHNICAL ({posts.filter((p) => p.category === "study").length})
            </button>
            <button
              onClick={() => setActiveChannel("essay")}
              className={`rounded-lg px-3 py-1.5 font-telemetry text-xs font-medium transition-all ${
                activeChannel === "essay"
                  ? "bg-ink-dominant text-text-badge shadow-sm"
                  : "border border-border-plate bg-chamber/60 text-text-secondary hover:text-text-primary"
              }`}
            >
              随笔思考 ESSAYS ({posts.filter((p) => p.category === "essay").length})
            </button>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="检索文章标题、摘要或标签..."
              aria-label="检索文章"
              className="w-full rounded-lg border border-border-plate bg-substrate py-2 pl-9 pr-3 font-telemetry text-xs text-text-primary placeholder:text-muted focus:border-ink-dominant focus:outline-none focus:ring-1 focus:ring-ink-dominant"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-border-plate/60 pt-3">
          <span className="flex items-center gap-1 font-telemetry text-[11px] text-muted mr-1">
            <Filter className="h-3 w-3" />
            标签过滤:
          </span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="rounded bg-ink-dominant/15 px-2 py-0.5 font-telemetry text-[11px] font-semibold text-ink-dominant hover:bg-ink-dominant/25"
            >
              全部 [清除 #{selectedTag}]
            </button>
          )}
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                aria-pressed={isSelected}
                className={`rounded px-2 py-0.5 font-telemetry text-[11px] transition-colors ${
                  isSelected
                    ? "bg-ink-dominant text-text-badge font-semibold"
                    : "border border-border-plate/70 bg-chamber/40 text-text-muted hover:border-border-plate hover:text-text-primary"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
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
                    className="group flex flex-col justify-between rounded-xl border border-border-plate bg-surface/70 p-5 shadow-plate transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-dominant/50 hover:bg-surface hover:shadow-elevated"
                  >
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

                    <div className="mt-4 flex items-center justify-between border-t border-border-plate/60 pt-3 text-[11px] font-telemetry text-muted">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded border border-border-plate/80 bg-chamber/60 px-1.5 py-0.5"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 tabular-nums text-text-secondary">
                        <Clock className="h-3 w-3 text-ink-dominant" />
                        <span>{post.reading_time ?? "—"} 分钟</span>
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
