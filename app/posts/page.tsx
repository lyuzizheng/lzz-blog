import type { Metadata } from "next";
import { posts } from "#site/content";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { ArchiveList, type ArchivePost } from "@/components/posts/archive-list";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "文章与思考 · Posts & Thoughts | Lyu Zizheng",
  description:
    "深入分布式系统架构、高并发即时通讯、AI 评估工作流、系统调优与工程哲学的技术随笔。",
  keywords: [
    ...siteConfig.keywords,
    "Engineering Blog",
    "Architecture Essays",
  ],
  alternates: { canonical: `${siteConfig.url}/posts` },
  openGraph: {
    title: "文章与思考 · Posts & Thoughts | Lyu Zizheng",
    description:
      "深入分布式系统架构、高并发即时通讯、AI 评估工作流、系统调优与工程哲学的技术随笔。",
    url: `${siteConfig.url}/posts`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Posts & Thoughts · Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "文章与思考 · Posts & Thoughts | Lyu Zizheng",
    description:
      "深入分布式系统架构、高并发即时通讯、AI 评估工作流、系统调优与工程哲学的技术随笔。",
    images: [`${siteConfig.url}/opengraph-image`],
  },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LZZ Blog · Posts & Thoughts",
    description: "深入分布式系统、高并发即时通讯、AI 工作流架构与工程哲学的技术随笔与思考。",
    url: `${siteConfig.url}/posts`,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    blogPost: dtos.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `${siteConfig.url}${post.permalink}`,
    })),
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReaderEyebrow backHref="/" backLabel="首页" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ArchiveList posts={dtos} />
        <ReaderColophon />
      </main>
    </div>
  );
}
