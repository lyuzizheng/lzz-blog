import type { Metadata } from "next";
import { posts } from "#site/content";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { ArchiveList, type ArchivePost } from "@/components/posts/archive-list";

export const metadata: Metadata = {
  title: "文章归档 · Writing & Dispatches | LZZ Blog",
  description: "Writing and long-form thinking on distributed systems, infrastructure engineering, and personal essays.",
  alternates: { canonical: "/posts" },
};

function toArchiveDtos(): ArchivePost[] {
  return posts
    .filter((p) => !p.draft)
    .map((p) => {
      const readingTime =
        "reading_time" in p && typeof p.reading_time === "number" ? p.reading_time : undefined;
      const coverImage =
        "cover_image" in p && typeof p.cover_image === "string" ? p.cover_image : undefined;
      return {
        slug: p.slug,
        permalink: p.permalink,
        title: p.title,
        summary: p.summary ?? p.description ?? "",
        date: p.date,
        category: p.category,
        tags: [...(p.tags ?? [])],
        reading_time: readingTime,
        cover_image: coverImage,
      };
    });
}

export default function PostsArchivePage() {
  const dtos = toArchiveDtos();

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ReaderEyebrow backHref="/" backLabel="门厅" section="归档" />
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
          <p className="mt-3 font-display text-base leading-relaxed text-text-secondary sm:text-lg">
            收录分布式架构实践、后端工程探究、生活随笔思考以及数字暗房实验笔记。
          </p>
        </div>
        <ArchiveList posts={dtos} />
        <ReaderColophon />
      </main>
    </div>
  );
}
