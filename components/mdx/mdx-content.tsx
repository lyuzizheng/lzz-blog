"use client";

import React, { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import Link from "next/link";
import { CodeBlock } from "./code-block";
import { Aside } from "./aside";
import { YouTube, Bilibili, Tweet, Spotify, Notice } from "./embeds";

interface MdxContentProps {
  code: string;
  components?: Record<string, React.ComponentType<unknown>>;
  className?: string;
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string;
  children?: React.ReactNode;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  title?: string;
}

interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  "data-rehype-pretty-code-figure"?: string;
  children?: React.ReactNode;
}

const defaultComponents = {
  h1: ({ id, children, ...props }: HeadingProps) => (
    <h1
      id={id}
      className="group mt-10 mb-4 scroll-mt-20 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ id, children, ...props }: HeadingProps) => (
    <h2
      id={id}
      className="group mt-8 mb-4 scroll-mt-20 border-b border-border-plate pb-2 font-display text-2xl font-semibold tracking-tight text-text-primary"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ id, children, ...props }: HeadingProps) => (
    <h3
      id={id}
      className="group mt-6 mb-3 scroll-mt-20 font-display text-xl font-semibold tracking-tight text-text-primary"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ id, children, ...props }: HeadingProps) => (
    <h4
      id={id}
      className="group mt-4 mb-2 scroll-mt-20 font-display text-lg font-medium text-text-primary"
      {...props}
    >
      {children}
    </h4>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-[0.9em] font-display text-[1.0625rem] leading-[1.75] text-text-primary sm:text-lg" {...props} />
  ),
  a: ({ href, children, ...props }: LinkProps) => {
    if (!href) return <a {...props}>{children}</a>;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-ink-dominant underline underline-offset-4 transition-colors hover:text-ink-overprint"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-domain={href.includes("://") ? href.split("/")[2]?.replace(/^www\./, "") : undefined}
        title={href}
        className="font-medium text-ink-dominant underline underline-offset-4 transition-colors hover:text-ink-overprint"
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-ink-dominant/60 bg-chamber/40 py-2 pl-4 pr-3 font-display italic text-text-secondary"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-[0.9em] ml-6 list-disc space-y-[0.4em] font-display text-[1.0625rem] leading-[1.75] text-text-primary sm:text-lg" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-[0.9em] ml-6 list-decimal space-y-[0.4em] font-display text-[1.0625rem] leading-[1.75] text-text-primary sm:text-lg" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto border border-border-plate">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-border-plate bg-chamber/70 px-4 py-2.5 font-telemetry font-semibold text-text-primary"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-border-plate/60 px-4 py-2 text-text-secondary tabular-nums"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border-plate" {...props} />
  ),
  img: ({ src, alt, title, ...props }: ImageProps) => {
    if (!src) return null;
    const isCentered = src.includes("#center");
    const cleanSrc = src.replace(/#center$/, "");
    return (
      <figure className={`my-8 block ${isCentered ? "text-center" : ""}`}>
        <div className="inline-block max-w-full overflow-hidden border border-border-plate bg-surface p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cleanSrc}
            alt={alt || ""}
            title={title}
            className="max-h-[600px] w-auto max-w-full object-contain mx-auto"
            loading="lazy"
            {...props}
          />
        </div>
        {(alt || title) && (
          <figcaption className="mt-2 font-telemetry text-xs text-muted">
            {alt || title}
          </figcaption>
        )}
      </figure>
    );
  },
  figure: ({ children, ...props }: FigureProps) => {
    if ("data-rehype-pretty-code-figure" in props) {
      // Find language attribute if available
      return <CodeBlock {...props}>{children}</CodeBlock>;
    }
    return <figure {...props}>{children}</figure>;
  },
  // Custom Embed Components
  YouTube,
  Bilibili,
  Tweet,
  Spotify,
  Notice,
  notice: Notice,
  callout: Notice,
  Aside,
};

export function MdxContent({ code, components = {}, className = "" }: MdxContentProps) {
  const Component = useMemo(() => {
    if (!code) return null;
    try {
      const fn = new Function(code);
      return fn({ ...runtime }).default as React.ComponentType<{
        components?: Record<string, unknown>;
      }>;
    } catch (err) {
      console.error("Failed to evaluate MDX code:", err);
      return null;
    }
  }, [code]);

  if (!Component) {
    return (
      <div className="rounded border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
        无法渲染文章内容。
      </div>
    );
  }

  const mergedComponents = {
    ...defaultComponents,
    ...components,
  };

  return (
    <article
      className={`prose prose-neutral max-w-none dark:prose-invert font-body text-base leading-relaxed ${className}`}
    >
      <Component components={mergedComponents as unknown as Record<string, unknown>} />
    </article>
  );
}
