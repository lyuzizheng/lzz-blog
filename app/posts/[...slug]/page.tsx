import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "#site/content";
import { MdxContent } from "@/components/mdx-content";
import { ReaderEyebrow, ReaderColophon } from "@/components/posts/reader-chrome";
import { PostHeader } from "@/components/posts/post-header";
import { PostCover } from "@/components/posts/post-cover";
import { PostAside } from "@/components/posts/post-aside";
import { PostNavigation } from "@/components/posts/post-navigation";
import { TocMobileProgress } from "@/components/posts/toc-mobile-progress";
import { siteConfig } from "@/lib/metadata";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const post = posts.find((p) => p.slugAsParams === slugPath);

  if (!post) {
    return {};
  }

  const ogUrl = new URL("/og", siteConfig.url);
  ogUrl.searchParams.set("title", post.title);
  if (post.description) {
    ogUrl.searchParams.set("description", post.description);
  }

  return {
    title: `${post.title} · Posts & Thoughts | LZZ Blog`,
    description: post.description,
    authors: [{ name: "Zizheng Lyu" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}${post.permalink}`,
      images: [{ url: ogUrl.toString(), width: 1200, height: 630, alt: post.title }],
    },
  };
}

function getAdjacentPosts(currentPost: (typeof posts)[number]) {
  const sorted = [...posts]
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = sorted.findIndex((p) => p.slug === currentPost.slug);

  return {
    prev: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
    next: currentIndex > 0 ? sorted[currentIndex - 1] : null,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const post = posts.find((p) => p.slugAsParams === slugPath);

  if (!post || post.draft) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(post);

  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
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
