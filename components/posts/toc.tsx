"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";


export interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TocProps {
  items?: TocEntry[];
  className?: string;
}

function decodeId(url: string): string {
  return decodeURIComponent(url.replace(/^#/, ""));
}

function useTocState(items: TocEntry[]) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  // Flatten all headings for easy URL checking
  const allUrls = React.useMemo(() => {
    const urls: string[] = [];
    function traverse(list: TocEntry[]) {
      for (const item of list) {
        if (item.url) urls.push(item.url.replace(/^#/, ""));
        if (item.items && item.items.length > 0) traverse(item.items);
      }
    }
    traverse(items);
    return urls;
  }, [items]);

  useEffect(() => {
    if (allUrls.length === 0) return;

    const headingElements = allUrls
      .map((id) => document.getElementById(decodeURIComponent(id)))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // IntersectionObserver for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalScroll) * 100))
        );
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [allUrls]);

  // Top-level index of the active heading (for §NN/MM readout)
  const topIds = React.useMemo(() => items.map((i) => decodeId(i.url)), [items]);
  const activeIndex = activeId
    ? topIds.findIndex((id) => activeId === id || activeId.startsWith(id))
    : -1;

  return { activeId, progress, activeIndex, total: items.length };
}
function scrollToId(decodedId: string) {
  const target = document.getElementById(decodedId);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
/**
 * BRAWUKA-61 · 章节序号 rail：`§NN 标题` + 2px 专色竖线即进度。
 * 禁独立顶部色条；进度与章节位置融合在此一处。
 */
export function TableOfContents({ items = [], className = "" }: TocProps) {
  const { activeId, progress } = useTocState(items);
  const { t, locale } = useI18n();
  const isZh = locale === "zh";

  if (!items || items.length === 0) {
    return null;
  }

  const renderItems = (entries: TocEntry[], depth = 0) => {
    return (
      <ol
        className={
          depth > 0
            ? "ml-9 mt-1 space-y-1 border-l border-border-plate/50 pl-3"
            : "space-y-0.5"
        }
      >
        {entries.map((item, idx) => {
          const decodedId = decodeId(item.url);
          const isActive = activeId === decodedId;
          const num =
            depth === 0 ? String(idx + 1).padStart(2, "0") : null;
          return (
            <li key={`${item.url}-${idx}`} className="text-[13px]">
              <a
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(decodedId);
                }}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-baseline gap-2 py-1 transition-colors duration-150 ${
                  isActive
                    ? "font-semibold text-ink-dominant"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {num && (
                  <span className="shrink-0 font-telemetry text-[11px] tabular-nums tracking-wider text-ink-dominant">
                    §{num}
                  </span>
                )}
                <span className="line-clamp-2 leading-snug">{item.title}</span>
              </a>
              {item.items && item.items.length > 0 && renderItems(item.items, depth + 1)}
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <nav aria-label={isZh ? "文章章节" : "Table of Contents"} className={className ?? ""}>
      <div className="flex items-baseline justify-between font-telemetry text-[11px] tracking-[0.14em]">
        <span className="font-bold text-text-primary">§ {isZh ? t.posts.toc : "INDEX"}</span>
        <span className="tabular-nums text-muted">{progress}%</span>
      </div>
      <div className="relative mt-3 pl-3">
        <div
          aria-hidden
          className="absolute bottom-1 left-0 top-1 w-[2px] bg-border-plate/50"
        />
        <div
          aria-hidden
          className="absolute left-0 top-1 w-[2px] bg-ink-dominant transition-[height] duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
        <div className="max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
          {renderItems(items)}
        </div>
      </div>
    </nav>
  );
}

/**
 * 移动端眉题进度行：`§02/07 · 42%`，无色条。
 */
export function TocMobileProgress({ items = [] }: TocProps) {
  const { activeIndex, progress, total } = useTocState(items);
  if (!items || items.length === 0) return null;
  const cur = String(Math.max(1, activeIndex + 1)).padStart(2, "0");
  const tot = String(total).padStart(2, "0");
  return (
    <div
      aria-hidden
      className="font-telemetry text-[11px] tabular-nums tracking-[0.14em] text-muted"
    >
      §{cur}/{tot} · {progress}%
    </div>
  );
}

