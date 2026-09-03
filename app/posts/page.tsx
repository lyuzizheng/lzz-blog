"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { posts, type Post } from "#site/content";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import {
  Folder,
  Calendar,
  Clock,
  Tag,
  Search,
  BookOpen,
  ChevronLeft,
  Filter,
} from "lucide-react";

export default function PostsArchivePage() {
  const [activeChannel, setActiveChannel] = useState<"all" | "study" | "essay">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Channel filter
        if (activeChannel !== "all" && post.category !== activeChannel) {
          return false;
        }
        // Tag filter
        if (selectedTag && !post.tags.includes(selectedTag)) {
          return false;
        }
        // Search query
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
  }, [activeChannel, selectedTag, searchQuery]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const map = new Map<string, Post[]>();
    filteredPosts.forEach((post) => {
      const year = post.date.slice(0, 4);
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)!.push(post);
    });
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredPosts]);

  return (
    <div className="relative min-h-screen bg-substrate text-primary transition-colors duration-300">
      {/* Precision Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded border border-border-plate/60 bg-chamber/60 px-2.5 py-1 text-xs font-telemetry text-text-secondary transition-colors hover:border-border-plate hover:text-text-primary"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>ATELIER HOME</span>
            </Link>
            <span className="hidden text-xs font-telemetry text-muted sm:inline-block">/</span>
            <span className="font-display font-semibold text-sm tracking-tight text-text-primary">
              文章物料库 · THE PRINTING ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <SafelightSwitch />
          </div>
        </div>
      </header>

      {/* Main Archive Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Archive Title & Abstract */}
        <div className="mb-10 max-w-2xl">
          <div className="mb-2 flex items-center gap-2 font-telemetry text-xs text-ink-dominant">
            <BookOpen className="h-3.5 w-3.5" />
            <span className="font-semibold tracking-wider uppercase">
              DOCUMENT ARCHIVE · VOL. 2014-2026
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            思想工坊与出版物物料库
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            收录分布式架构实践、后端工程探究、生活随笔思考以及数字暗房实验笔记。
          </p>
        </div>

        {/* Filter Controls: Channels + Search */}
        <div className="mb-8 space-y-4 rounded-xl border border-border-plate bg-surface/60 p-4 sm:p-5 shadow-plate">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Channel Tabs */}
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

            {/* Keyword Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="检索文章标题、摘要或标签..."
                className="w-full rounded-lg border border-border-plate bg-substrate py-2 pl-9 pr-3 font-telemetry text-xs text-text-primary placeholder:text-muted focus:border-ink-dominant focus:outline-none focus:ring-1 focus:ring-ink-dominant"
              />
            </div>
          </div>

          {/* Tags Cloud Filter */}
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
              <section key={year} className="relative">
                {/* Year Header Marker */}
                <div className="sticky top-16 z-20 mb-6 flex items-center gap-3 bg-substrate/90 py-2 backdrop-blur-sm">
                  <span className="font-display text-2xl font-bold text-text-primary tabular-nums">
                    {year}
                  </span>
                  <div className="h-px flex-1 bg-border-plate" />
                  <span className="font-telemetry text-xs text-muted tabular-nums">
                    {yearPosts.length} 篇归档
                  </span>
                </div>

                {/* Posts Cards Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {yearPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={post.permalink}
                      className="group flex flex-col justify-between rounded-xl border border-border-plate bg-surface/70 p-5 shadow-plate transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-dominant/50 hover:bg-surface hover:shadow-elevated"
                    >
                      <div>
                        {/* Top Category & Date */}
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

                        {/* Title */}
                        <h2 className="font-display text-lg font-bold leading-snug tracking-tight text-text-primary group-hover:text-ink-dominant transition-colors">
                          {post.title}
                        </h2>

                        {/* Summary / Excerpt */}
                        {post.summary && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                            {post.summary}
                          </p>
                        )}
                      </div>

                      {/* Bottom Footer: Tags & Reading Time */}
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
                          <span>{post.reading_time} 分钟</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
