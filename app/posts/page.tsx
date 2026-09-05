import type { Metadata } from "next";
import { posts } from "#site/content";
import { SiteHeader, SiteFooter } from "@/components/site";
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
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <ArchiveList posts={dtos} />
      </main>
      <SiteFooter />
    </div>
  );
}
