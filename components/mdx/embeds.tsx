"use client";

import React from "react";
import { Info, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

// YouTube Embed Component
export function YouTube({ id }: { id: string }) {
  if (!id) return null;
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border-plate bg-surface shadow-plate">
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
    <div className="my-6 overflow-hidden rounded-lg border border-border-plate bg-surface shadow-plate">
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
    <div className="my-6 rounded-lg border border-border-plate bg-surface/80 p-5 shadow-plate">
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
    <div className="my-6 overflow-hidden rounded-lg border border-border-plate shadow-plate">
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

// Notice Callout Box Component
export function Notice({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const icons = {
    info: <Info className="h-5 w-5 text-ink-dominant shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />,
  };

  const borderStyles = {
    info: "border-ink-dominant/30 bg-ink-dominant/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    success: "border-emerald-500/30 bg-emerald-500/5",
  };

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border p-4 shadow-sm ${borderStyles[type]}`}
    >
      {icons[type]}
      <div className="text-sm leading-relaxed text-text-primary [&>p]:my-1">
        {children}
      </div>
    </div>
  );
}
