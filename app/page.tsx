import React from "react";
import type { Metadata } from "next";
import { HomeAtelier } from "@/components/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lyu Zizheng (吕子正) — Senior Product & Systems Engineer",
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lyu Zizheng (吕子正) — Senior Product & Systems Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Lyu Zizheng (吕子正) — Senior Product & Systems Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyu Zizheng (吕子正) — Senior Product & Systems Engineer",
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

/**
 * BRAWUKA-78 · 单屏无滚动首页（The Atelier Workbench）
 *
 * 一个 100dvh 画框到底：中央 avatar + 名字 + 描述 + 社交矩阵，
 * 下方五张 35mm 负片散落，点击后各自通向独立章节页
 * （Blogs /posts · Career /resume · Photography /photography · Projects /products
 * · Weekly Records /weekly-records）。
 * 无 Slide、无翻页、无全局 sticky chrome。
 */
const CHAPTER_ROUTES = [
  "/posts",
  "/resume",
  "/photography",
  "/products",
  "/weekly-records",
] as const;

export default function HomePage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-substrate text-primary transition-colors duration-300">
      {/* 隐藏语义链接（确保纯 HTML 爬虫与静态验证可达五个章节） */}
      <div className="sr-only" aria-hidden="true">
        <nav aria-label="Crawling index">
          {CHAPTER_ROUTES.map((route) => (
            <a key={route} href={route} tabIndex={-1}>
              {route}
            </a>
          ))}
        </nav>
      </div>

      <HomeAtelier />
    </main>
  );
}
