import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type Post } from "#site/content";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TableOfContents, PostHeaderMeta, PostNav } from "@/components/posts";
import { MonoColorCover } from "@/components/ui/mono-color-cover";
import { SiteHeader, SiteFooter } from "@/components/site";
import { Tag, Folder } from "lucide-react";

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
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
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

          <PostHeaderMeta
            category={post.category}
            date={post.date}
            readingTime={post.reading_time}
            wordCount={post.word_count}
            author={post.author}
          />
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

            <PostNav
              tags={post.tags}
              prevPost={prevPost}
              nextPost={nextPost}
            />
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
      <SiteFooter />
    </div>
  );
}
