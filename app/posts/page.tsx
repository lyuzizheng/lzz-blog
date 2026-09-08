import type { Metadata } from "next";
import { posts } from "#site/content";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { ArchiveList, type ArchivePost } from "@/components/posts/archive-list";

export const metadata: Metadata = {
  title: "文章 · Posts & Thoughts | LZZ Blog",
  description: "全栈开发、系统实践与生活思考的个人文章列表。",
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
      <ReaderEyebrow backHref="/" backLabel="首页" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ArchiveList posts={dtos} />
        <ReaderColophon />
      </main>
    </div>
  );
}
