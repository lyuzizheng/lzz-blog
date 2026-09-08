"use client";

import { TableOfContents } from "./toc";
import type { Post } from "#site/content";

export function PostAside({ post }: { post: Post }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8 max-w-[15rem] space-y-8">
        {post.toc && post.toc.length > 0 && <TableOfContents items={post.toc} />}

        <div className="border-t-2 border-border-strong pt-3 font-telemetry text-xs text-muted">
          <div className="mb-2 text-[11px] font-bold tracking-[0.14em] text-text-primary">
            SPECIMEN
          </div>
          <dl className="space-y-1.5 tabular-nums">
            <div className="flex justify-between gap-2">
              <dt>SLUG</dt>
              <dd className="truncate font-mono text-text-primary">{post.slug}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>CHANNEL</dt>
              <dd className="uppercase text-text-primary">{post.category}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>STATUS</dt>
              <dd className="uppercase text-emerald-500">{post.status}</dd>
            </div>
          </dl>
        </div>
      </div>
    </aside>
  );
}
