import type { Metadata } from "next";
import { posts, type Post } from "#site/content";

/**
 * Case-insensitive post lookup with alias and leaf-bundle support.
 */
export function findPostBySlugSegments(slugSegments: string[]): Post | undefined {
  const targetSlug = slugSegments.map((s) => s.toLowerCase()).join("/");

  return posts.find((p) => {
    if (p.slug.toLowerCase() === targetSlug) return true;
    if (p.aliases && p.aliases.some((alias) => alias.toLowerCase() === targetSlug)) {
      return true;
    }
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

/**
 * Static params generation for full static export / SSG.
 */
export function generatePostStaticParams(): { slug: string[] }[] {
  const paths: { slug: string[] }[] = [];

  for (const post of posts) {
    paths.push({ slug: post.slug.split("/") });
    if (post.aliases) {
      for (const alias of post.aliases) {
        paths.push({ slug: alias.split("/") });
      }
    }
  }

  return paths;
}

/**
 * Dynamic SEO metadata for a post detail page.
 */
export function generatePostMetadata(post: Post, slug: string[]): Metadata {
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
 * Adjacent posts in reverse-chronological order.
 */
export function getAdjacentPosts(post: Post): { prev: Post | null; next: Post | null } {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  return {
    prev: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
  };
}
