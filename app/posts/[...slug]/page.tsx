import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type Post } from "#site/content";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TableOfContents, TocMobileProgress } from "@/components/posts/toc";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { MonoColorCover } from "@/components/ui/mono-color-cover";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Case-insensitive post lookup with alias support
function findPostBySlugSegments(slugSegments: string[]): Post | undefined {
  const targetSlug = slugSegments.map((s) => s.toLowerCase()).join("/");

  return posts.find((p) => {
    if (p.slug.toLowerCase() === targetSlug) return true;
    if (p.aliases && p.aliases.some((alias) => alias.toLowerCase() === targetSlug)) {
      return true;
    }
    // Also check last segment matching (for leaf bundles)
    const postLastSegment = p.slug.split("/").pop()?.toLowerCase();
    const targetLastSegment = slugSegments[slugSegments.length - 1]?.toLowerCase();
    if (
      slugSegments.length === 1 &&
      postLastSegment &&
      postLastSegment === targetLastSegment
    ) {
      return true;
    }
    return false;
  });
}

// Static params generation for full static export / SSG
export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  for (const post of posts) {
    // Primary slug
    const segments = post.slug.split("/");
    paths.push({ slug: segments });

    // Registered aliases
    if (post.aliases) {
      for (const alias of post.aliases) {
        paths.push({ slug: alias.split("/") });
      }
    }
  }

  return paths;
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPostBySlugSegments(slug);

  if (!post) {
    return {
      title: "文章未找到 · LZZ Blog",
      description: "请求的文章不存在或已被移动。",
    };
  }

  const url = `/posts/${slug.map((s) => s.toLowerCase()).join("/")}`;
  const ogSub = `${new Date(post.date).toISOString().slice(0, 10)} · ${(post.tags ?? []).slice(0, 3).join(" / ") || "ESSAY"}`;
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(ogSub)}`;
  return {
    title: `${post.title} · LZZ Blog`,
    description: post.summary || post.description || "LZZ Personal Blog & Engineering Atelier",
    keywords: post.tags,
    authors: [{ name: post.author || "Zizheng Lyu" }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary || post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Zizheng Lyu"],
      tags: post.tags,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || post.description,
      images: [ogImage],
    },
  };
}

/**
 * BRAWUKA-61 · 文章阅读页（主战场）：
 * 屏内眉脚（Q10-A）/ 跨栏引言 / 左侧 <Aside> gutter（xl+）/
 * 章节序号 rail（进度融合）/ 档案条目导航 / telemetry 单行。
 */
export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPostBySlugSegments(slug);

  if (!post) {
    notFound();
  }

  // Find adjacent posts for bottom navigation
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ReaderEyebrow backHref="/posts" backLabel="Posts & Thoughts" section={post.category} />
        <div className="mb-8 lg:hidden">
          <TocMobileProgress items={post.toc} />
        </div>
        {/* Article Header & Metadata */}
        <header className="mb-10 max-w-3xl">
          {/* Category & Tags bar */}
          {post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2 font-telemetry text-xs">
              <span className="font-semibold uppercase tracking-wider text-ink-dominant">
                [{post.category.toUpperCase()}]
              </span>
              <span className="text-border-plate">/</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted transition-colors hover:text-text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.18] tracking-tight text-text-primary">
            {post.title}
          </h1>

          {/* Standfirst: summary as cross-column lede */}
          {post.summary && (
            <div className="mt-6 border-l-2 border-ink-dominant/50 py-0.5 pl-4">
              <p className="font-display text-base leading-relaxed text-text-secondary italic sm:text-lg">
                {post.summary}
              </p>
            </div>
          )}

          {/* Single telemetry line */}
          <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-y border-border-plate/70 py-3 font-telemetry text-xs text-muted">
            <time dateTime={post.date} className="tabular-nums">
              {post.date.slice(0, 10)}
            </time>
            <span className="text-border-plate">·</span>
            <span className="tabular-nums">{post.reading_time} 分钟阅读</span>
            {post.word_count > 0 && (
              <>
                <span className="text-border-plate">·</span>
                <span className="tabular-nums">{Math.round(post.word_count)} 字</span>
              </>
            )}
            <span className="ml-auto uppercase tracking-wider opacity-75">
              BY {post.author.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Cover Display */}
        <div className="mb-12 max-w-4xl">
          {post.cover_image ? (
            <div className="border border-border-plate bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.cover?.alt || post.title}
                className="max-h-[500px] w-full object-cover"
              />
              {post.cover?.caption && (
                <p className="border-t border-border-plate/60 p-3 text-center font-telemetry text-xs text-muted">
                  {post.cover.caption}
                </p>
              )}
            </div>
          ) : (
            <MonoColorCover
              title={post.title}
              category={post.category}
              tags={post.tags}
              date={post.date}
              readingTime={post.reading_time}
              wordCount={post.word_count}
            />
          )}
        </div>

        {/* Main Content & Rail Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Article column: gutter reserved for left marginalia at xl+ */}
          <div className="min-w-0 lg:col-span-8">
            <div className="reader-article max-w-[40rem] xl:ml-[13.5rem]">
              <MdxContent code={post.content} />
            </div>

            {/* Bottom Meta & Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 max-w-[40rem] border-t border-border-plate pt-4 xl:ml-[13.5rem]">
                <div className="flex flex-wrap items-center gap-2 font-telemetry text-xs text-muted">
                  <span className="tracking-[0.14em]">TAGS //</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/posts?tag=${encodeURIComponent(tag)}`}
                      className="tracking-wider text-text-secondary hover:text-ink-dominant hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Adjacent Posts: archive entries, no cards */}
            <nav
              aria-label="相邻文章"
              className="mt-8 max-w-[40rem] border-t-2 border-border-strong xl:ml-[13.5rem]"
            >
              {prevPost && (
                <Link
                  href={prevPost.permalink}
                  className="group flex items-baseline justify-between gap-4 border-b border-border-plate/60 py-4"
                >
                  <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
                    ← PREV
                  </span>
                  <span className="text-right font-display text-lg leading-snug text-text-primary group-hover:text-ink-dominant">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={nextPost.permalink}
                  className="group flex items-baseline justify-between gap-4 border-b border-border-plate/60 py-4"
                >
                  <span className="font-display text-lg leading-snug text-text-primary group-hover:text-ink-dominant">
                    {nextPost.title}
                  </span>
                  <span className="shrink-0 font-telemetry text-[11px] tracking-[0.14em] text-muted">
                    NEXT →
                  </span>
                </Link>
              )}
            </nav>
          </div>

          {/* Section-number rail */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-8 max-w-[15rem] space-y-8">
              {post.toc && post.toc.length > 0 && (
                <TableOfContents items={post.toc} />
              )}

              {/* Telemetry strip: archive entry, not a card (emerald STATUS amnestied Q9⑤) */}
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
        </div>

        <ReaderColophon />
      </main>
    </div>
  );
}
