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
      title: "文章未找到 · LZZ Blog",
      description: "请求的文章不存在或已被移动。",
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

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <ReaderEyebrow backHref="/posts" backLabel="Posts & Thoughts" />
        <div className="mb-8 lg:hidden">
          <TocMobileProgress items={post.toc} />
        </div>

        <PostHeader post={post} />
        <PostCover post={post} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <div className="reader-article max-w-[40rem] xl:ml-[13.5rem]">
              <MdxContent code={post.content} />
            </div>

            {post.tags.length > 0 && (
              <div className="mt-12 max-w-[40rem] border-t border-border-plate pt-4 xl:ml-[13.5rem]">
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
