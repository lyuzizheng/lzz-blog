import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#site/content";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import { ArchiveList, type ArchivePost } from "@/components/posts/archive-list";
import { BookOpen, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "文章物料库 · The Printing Archive",
  description: "收录分布式架构实践、后端工程探究、生活随笔思考以及数字暗房实验笔记。",
  alternates: { canonical: "/posts" },
};

function toArchiveDtos(): ArchivePost[] {
  return posts
    .filter((p) => !p.draft)
    .map((p) => ({
      slug: p.slug,
      permalink: p.permalink,
      title: p.title,
      summary: p.summary ?? p.description ?? "",
      date: p.date,
      category: p.category,
      tags: [...(p.tags ?? [])],
      reading_time: (p as unknown as { reading_time?: number }).reading_time,
    }));
}

export default function PostsArchivePage() {
  const dtos = toArchiveDtos();

  return (
    <div className="relative min-h-screen bg-substrate text-primary transition-colors duration-300">
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

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
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

        <ArchiveList posts={dtos} />
      </main>
    </div>
  );
}
