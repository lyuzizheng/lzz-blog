import type { Metadata } from "next";
import { posts, type Post } from "#site/content";
import { siteConfig } from "@/lib/site";

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
  const ogImage = `${siteConfig.url}/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(ogSub)}&badge=${encodeURIComponent("ENGINEERING ESSAY")}`;

  return {
    title: `${post.title} · Lyu Zizheng`,
    description: post.summary || post.description || "Technical writing by Lyu Zizheng",
    keywords: post.tags,
    authors: [{ name: post.author || siteConfig.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary || post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || siteConfig.author],
      tags: post.tags,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
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
