"use client";

import React, { useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import { useI18n } from "@/lib/i18n";
import { ArchiveFilters } from "./archive-filters";
import { ArchiveTimeline } from "./archive-timeline";

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

function computeChannels(posts: ArchivePost[]) {
  return [
    { id: "all" as const, label: "ALL", count: posts.length },
    { id: "study" as const, label: "STUDY", count: posts.filter((p) => p.category === "study").length },
    { id: "essay" as const, label: "ESSAY", count: posts.filter((p) => p.category === "essay").length },
  ];
}

/**
 * ArchiveList: Editorial Big Card Timeline (The Archive Atelier).
 */
export function ArchiveList({ posts }: { posts: ArchivePost[] }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

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

  const channels = useMemo(() => computeChannels(posts), [posts]);

  return (
    <>
      <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Posts &amp; Thoughts
        </h1>
        <div className="font-telemetry text-xs uppercase tracking-wider text-muted tabular-nums">
          {telemetry}
        </div>
      </header>

      <ArchiveFilters
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
        channels={channels}
      />

      {groupedByYear.length === 0 ? (
        <div className="my-16 border border-dashed border-border-plate py-12 text-center">
          <p className="font-telemetry text-sm text-muted">{t.posts.noResults}</p>
        </div>
      ) : (
        <ArchiveTimeline
          groupedByYear={groupedByYear}
          yearArchiveLabel={t.posts.yearArchive}
          readingTimeLabel={t.posts.readingTime}
          reduced={reduced}
        />
      )}
    </>
  );
}
