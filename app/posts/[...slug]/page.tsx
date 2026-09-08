import React from "react";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TocMobileProgress } from "@/components/posts/toc";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { PostHeader } from "@/components/posts/post-header";
import { PostCover } from "@/components/posts/post-cover";
import { PostNavigation } from "@/components/posts/post-navigation";
import { PostAside } from "@/components/posts/post-aside";
import {
  findPostBySlugSegments,
  generatePostStaticParams,
  generatePostMetadata,
  getAdjacentPosts,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export { generatePostStaticParams as generateStaticParams };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = findPostBySlugSegments(slug);

  if (!post) {
    return {
      title: "文章未找到 · Post Not Found | LZZ Blog",
      description: "请求的文章不存在或已被移动 · The requested post could not be found or has been moved.",
    };
  }

  return generatePostMetadata(post, slug);
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

  const { prev, next } = getAdjacentPosts(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.summary || post.description || "Technical writing by Lyu Zizheng",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.author,
      url: siteConfig.url,
      sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/avatar.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/posts/${slug.map((s) => s.toLowerCase()).join("/")}`,
    },
    keywords: post.tags,
    inLanguage: "zh-CN",
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReaderEyebrow backHref="/posts" backLabel="Posts & Thoughts" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 lg:hidden">
          <TocMobileProgress items={post.toc} />
        </div>

        <PostHeader post={post} />
        <PostCover post={post} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,40rem)_14rem] lg:justify-between">
          <div className="min-w-0">
            <div className="reader-article max-w-[40rem]">
              <MdxContent code={post.content} />
            </div>

            {post.tags.length > 0 && (
              <div className="mt-12 max-w-[40rem] border-t border-border-plate pt-4">
                <div className="flex flex-wrap items-center gap-2 font-telemetry text-xs text-muted">
                  <span className="tracking-[0.14em]">TAGS //</span>
                  {post.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/posts?tag=${encodeURIComponent(tag)}`}
                      className="tracking-wider text-text-secondary hover:text-ink-dominant hover:underline"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <PostNavigation prev={prev} next={next} />
          </div>

          <PostAside post={post} />
        </div>

        <ReaderColophon />
      </main>
    </div>
  );
}
