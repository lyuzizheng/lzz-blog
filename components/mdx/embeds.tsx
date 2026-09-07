"use client";

import React from "react";
import { Info, AlertTriangle, CheckCircle, ExternalLink, Lightbulb, AlertOctagon } from "lucide-react";

// YouTube Embed Component
export function YouTube({ id }: { id: string }) {
  if (!id) return null;
  return (
    <div className="my-6 overflow-hidden border border-border-plate bg-surface">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

// Bilibili Embed Component
export function Bilibili({ id }: { id: string }) {
  if (!id) return null;
  const bvid = id.startsWith("BV") ? id : `BV${id}`;
  return (
    <div className="my-6 overflow-hidden border border-border-plate bg-surface">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&as_wide=1`}
          title="Bilibili video player"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}

// Tweet Card Component
export function Tweet({ id, user }: { id: string; user?: string }) {
  if (!id) return null;
  const tweetUrl = user
    ? `https://twitter.com/${user}/status/${id}`
    : `https://twitter.com/i/status/${id}`;

  return (
    <div className="my-6 border border-border-plate bg-surface/80 p-5">
      <div className="flex items-center justify-between text-xs font-telemetry text-muted">
        <span className="font-semibold text-text-primary">
          {user ? `@${user}` : "Twitter / X Post"}
        </span>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-ink-dominant hover:underline"
        >
          <span>查看原推</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="mt-3 text-sm text-text-secondary">
        <p className="italic">
          推文 ID: <span className="font-telemetry font-mono">{id}</span>
        </p>
      </div>
    </div>
  );
}

// Spotify Embed Component
export function Spotify({
  id,
  type = "track",
}: {
  id: string;
  type?: "track" | "playlist" | "album";
}) {
  if (!id) return null;
  return (
    <div className="my-6 overflow-hidden border border-border-plate">
      <iframe
        src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Music Embed"
        className="border-0 bg-transparent"
      />
    </div>
  );
}

// Notice / Callout Box Component
type NoticeCategory = "info" | "warning" | "tip" | "success" | "danger";

export function Notice({
  type = "info",
  title,
  children,
}: {
  type?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const normType = (type?.toLowerCase() || "info").trim();

  let category: NoticeCategory = "info";
  if (normType === "warning" || normType === "caution") {
    category = "warning";
  } else if (normType === "tip" || normType === "hint") {
    category = "tip";
  } else if (normType === "success" || normType === "done") {
    category = "success";
  } else if (normType === "danger" || normType === "error" || normType === "alert") {
    category = "danger";
  }

  const icons = {
    info: <Info className="h-5 w-5 shrink-0 text-[#2148B8] dark:text-[#E05454] mt-0.5" aria-hidden="true" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden="true" />,
    tip: <Lightbulb className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" aria-hidden="true" />,
    success: <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" aria-hidden="true" />,
    danger: <AlertOctagon className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" aria-hidden="true" />,
  };

  const borderStyles = {
    info: "border-border-plate border-l-4 border-l-[#2148B8] dark:border-l-[#E05454] bg-[#2148B8]/5 dark:bg-[#E05454]/5",
    warning: "border-border-plate border-l-4 border-l-amber-500 dark:border-l-amber-400 bg-amber-500/5 dark:bg-amber-400/5",
    tip: "border-border-plate border-l-4 border-l-emerald-600 dark:border-l-emerald-400 bg-emerald-600/5 dark:bg-emerald-400/5",
    success: "border-border-plate border-l-4 border-l-emerald-600 dark:border-l-emerald-400 bg-emerald-600/5 dark:bg-emerald-400/5",
    danger: "border-border-plate border-l-4 border-l-rose-600 dark:border-l-rose-400 bg-rose-600/5 dark:bg-rose-400/5",
  };

  return (
    <div
      className={`my-6 flex gap-3.5 border p-4 rounded-[2px] transition-colors ${borderStyles[category]}`}
      role="region"
      aria-label={title || `${category} callout`}
    >
      {icons[category]}
      <div className="min-w-0 flex-1 font-display text-sm leading-relaxed text-text-primary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-1.5 [&>ul]:my-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:my-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ul_li]:my-0.5 [&>ol_li]:my-0.5">
        {title && (
          <div className="font-semibold tracking-tight text-text-primary mb-1">
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Callout is an alias for Notice
export const Callout = Notice;
