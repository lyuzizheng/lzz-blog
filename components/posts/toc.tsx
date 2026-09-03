"use client";

import React, { useEffect, useState } from "react";
import { ListCollapse, Compass } from "lucide-react";

export interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

interface TocProps {
  items?: TocEntry[];
  className?: string;
}

export function TableOfContents({ items = [], className = "" }: TocProps) {
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
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
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

  if (!items || items.length === 0) {
    return null;
  }

  const renderItems = (entries: TocEntry[], depth = 0) => {
    return (
      <ul className={`space-y-2 ${depth > 0 ? "ml-3.5 border-l border-border-plate/40 pl-2.5 mt-1.5" : ""}`}>
        {entries.map((item, idx) => {
          const rawId = item.url.replace(/^#/, "");
          const decodedId = decodeURIComponent(rawId);
          const isActive = activeId === decodedId || activeId === rawId;

          return (
            <li key={`${item.url}-${idx}`} className="text-xs">
              <a
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(decodedId);
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(decodedId);
                  }
                }}
                className={`group flex items-start gap-1.5 py-0.5 transition-colors duration-150 ${
                  isActive
                    ? "font-semibold text-ink-dominant"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-ink-dominant ring-2 ring-ink-dominant/30"
                      : "bg-border-plate group-hover:bg-text-muted"
                  }`}
                />
                <span className="line-clamp-2 leading-relaxed">{item.title}</span>
              </a>
              {item.items && item.items.length > 0 && renderItems(item.items, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav
      aria-label="Table of Contents"
      className={`rounded-lg border border-border-plate bg-surface/80 p-4 shadow-plate backdrop-blur-sm ${className}`}
    >
      {/* Header bar with Progress */}
      <div className="mb-3 flex items-center justify-between border-b border-border-plate pb-2">
        <div className="flex items-center gap-2 text-xs font-telemetry font-bold tracking-wider text-text-primary">
          <ListCollapse className="h-3.5 w-3.5 text-ink-dominant" />
          <span>目录 ARCHIVE</span>
        </div>
        <div className="flex items-center gap-1.5 font-telemetry text-[11px] text-muted tabular-nums">
          <Compass className="h-3 w-3" />
          <span>{progress}%</span>
        </div>
      </div>

      {/* Reading Progress Line */}
      <div className="mb-3 h-0.5 w-full overflow-hidden rounded bg-chamber">
        <div
          className="h-full bg-ink-dominant transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TOC items */}
      <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {renderItems(items)}
      </div>
    </nav>
  );
}
