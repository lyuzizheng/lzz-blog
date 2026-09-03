import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type Post } from "#site/content";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TableOfContents } from "@/components/posts/toc";
import { MonoColorCover } from "@/components/ui/mono-color-cover";
import { SafelightSwitch } from "@/components/ui/safelight-switch";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Folder,
  ArrowRight,
  ChevronLeft,
  BookOpen,
} from "lucide-react";

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

  return {
    title: `${post.title} · LZZ Blog`,
    description: post.summary || post.description || "LZZ Personal Blog & Engineering Atelier",
    keywords: post.tags,
    authors: [{ name: post.author || "Zizheng Lyu" }],
    openGraph: {
      title: post.title,
      description: post.summary || post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

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
    <div className="relative min-h-screen bg-substrate text-primary transition-colors duration-300">
      {/* Precision Top Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border-plate bg-substrate/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Back link & breadcrumbs */}
          <div className="flex items-center gap-3">
            <Link
              href="/posts"
              className="flex items-center gap-1.5 rounded border border-border-plate/60 bg-chamber/60 px-2.5 py-1 text-xs font-telemetry text-text-secondary transition-colors hover:border-border-plate hover:text-text-primary"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>文章归档</span>
            </Link>
            <span className="hidden text-xs font-telemetry text-muted sm:inline-block">/</span>
            <span className="hidden text-xs font-telemetry text-muted uppercase sm:inline-block">
              {post.category}
            </span>
          </div>

          {/* Theme switch */}
          <div className="flex items-center gap-3">
            <SafelightSwitch />
          </div>
        </div>
      </header>

      {/* Main Post Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Article Header & Metadata */}
        <header className="mb-10 max-w-3xl">
          {/* Tags bar */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded border border-border-plate bg-chamber px-2.5 py-0.5 font-telemetry text-[11px] font-semibold uppercase text-ink-dominant">
              <Folder className="h-3 w-3" />
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded border border-border-plate/70 bg-surface px-2 py-0.5 font-telemetry text-[11px] text-text-muted"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt if available */}
          {post.summary && (
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              {post.summary}
            </p>
          )}

          {/* Precision Telemetry Cluster */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border-plate/60 py-3 text-xs font-telemetry text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-ink-dominant" />
              <time dateTime={post.date} className="tabular-nums">
                {post.date.slice(0, 10)}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-ink-dominant" />
              <span className="tabular-nums">{post.reading_time} 分钟阅读</span>
            </div>
            {post.word_count > 0 && (
              <div className="hidden items-center gap-1.5 sm:flex">
                <BookOpen className="h-3.5 w-3.5 text-ink-dominant" />
                <span className="tabular-nums">{post.word_count} 字</span>
              </div>
            )}
            <div className="ml-auto text-[11px] opacity-75">
              <span>BY {post.author.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Cover Display */}
        <div className="mb-12 max-w-4xl">
          {post.cover_image ? (
            <div className="overflow-hidden rounded-xl border border-border-plate bg-surface shadow-elevated">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.cover?.alt || post.title}
                className="max-h-[500px] w-full object-cover"
              />
              {post.cover?.caption && (
                <p className="p-3 text-center text-xs font-telemetry text-muted">
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

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Article Main Text Column */}
          <div className="lg:col-span-8 min-w-0">
            <MdxContent code={post.content} />

            {/* Bottom Meta & Tags */}
            <div className="mt-12 border-t border-border-plate pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-telemetry text-muted">标签:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border-plate bg-chamber px-2.5 py-0.5 font-telemetry text-xs text-text-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/posts"
                  className="flex items-center gap-1 text-xs font-telemetry text-ink-dominant hover:underline"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>返回文章总列表</span>
                </Link>
              </div>
            </div>

            {/* Adjacent Posts Navigation Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={prevPost.permalink}
                  className="group rounded-lg border border-border-plate bg-surface/60 p-4 transition-all hover:border-ink-dominant/50 hover:bg-surface"
                >
                  <span className="text-[11px] font-telemetry text-muted block mb-1">
                    ← 上一篇 PREVIOUS
                  </span>
                  <span className="line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-ink-dominant">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={nextPost.permalink}
                  className="group rounded-lg border border-border-plate bg-surface/60 p-4 text-right transition-all hover:border-ink-dominant/50 hover:bg-surface"
                >
                  <span className="text-[11px] font-telemetry text-muted block mb-1">
                    下一篇 NEXT →
                  </span>
                  <span className="line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-ink-dominant">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Sticky Sidebar (TOC) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Dynamic Table of Contents */}
              {post.toc && post.toc.length > 0 && (
                <TableOfContents items={post.toc} />
              )}

              {/* Atelier Metadata Card */}
              <div className="rounded-lg border border-border-plate bg-surface/40 p-4 font-telemetry text-xs text-muted">
                <div className="font-bold tracking-wider text-text-primary border-b border-border-plate/60 pb-2 mb-2">
                  SPECIMEN TELEMETRY
                </div>
                <dl className="space-y-1.5 tabular-nums">
                  <div className="flex justify-between">
                    <dt>SLUG:</dt>
                    <dd className="font-mono text-text-primary">{post.slug}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>CHANNEL:</dt>
                    <dd className="uppercase text-text-primary">{post.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>STATUS:</dt>
                    <dd className="text-emerald-500 uppercase">{post.status}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
