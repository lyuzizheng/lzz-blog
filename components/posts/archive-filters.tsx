"use client";

import { useI18n } from "@/lib/i18n";

interface ArchiveFiltersProps {
  activeChannel: "all" | "study" | "essay";
  setActiveChannel: (id: "all" | "study" | "essay") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  channels: { id: "all" | "study" | "essay"; label: string; count: number }[];
}

export function ArchiveFilters({
  activeChannel,
  setActiveChannel,
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  allTags,
  channels,
}: ArchiveFiltersProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-border-plate pb-6 font-telemetry">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
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
  );
}
