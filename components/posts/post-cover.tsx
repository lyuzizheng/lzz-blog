import { MonoColorCover } from "@/components/ui/mono-color-cover";
import { probePublicImage } from "@/lib/image-size";

export interface PostCoverProps {
  title: string;
  category: string;
  tags: string[];
  date: string;
  readingTime?: number;
  wordCount?: number;
  coverImage?: string;
  coverAlt?: string;
  coverCaption?: string;
}

export function PostCover({ post }: { post: PostCoverProps }) {
  const size = post.coverImage ? probePublicImage(post.coverImage) : null;

  return (
    <div className="mb-12 max-w-4xl">
      {post.coverImage ? (
        <div className="border border-border-plate bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            width={size?.width}
            height={size?.height}
            fetchPriority="high"
            decoding="async"
            className="h-auto max-h-[500px] w-full object-cover"
          />
          {post.coverCaption && (
            <p className="border-t border-border-plate/60 p-3 text-center font-telemetry text-xs text-muted">
              {post.coverCaption}
            </p>
          )}
        </div>
      ) : (
        <MonoColorCover
          title={post.title}
          category={post.category}
          tags={post.tags}
          date={post.date}
          readingTime={post.readingTime}
          wordCount={post.wordCount}
        />
      )}
    </div>
  );
}
