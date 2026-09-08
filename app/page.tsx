import React from "react";
import type { Metadata } from "next";
import { HomeAtelier } from "@/components/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zizheng Lyu (吕子正) — Senior Product & Systems Engineer | LZZ Atelier",
  description:
    "Personal engineering atelier & technical writings of Lyu Zizheng (Wise, ex-ByteDance, NTU). High-concurrency distributed systems, real-time messaging, AI evaluation infrastructure, and 35mm photography.",
  keywords: [
    "Lyu Zizheng",
    "Zizheng Lyu",
    "吕子正",
    "Product Engineer",
    "Senior Software Engineer",
    "Wise",
    "ByteDance",
    "TikTok IM",
    "Distributed Systems",
    "High Concurrency",
    "AI Evaluation Infrastructure",
    "Golang",
    "Java",
    "Photography",
    "Singapore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zizheng Lyu (吕子正) — Senior Product & Systems Engineer",
    description:
      "Personal engineering atelier & technical writings of Lyu Zizheng (Wise, ex-ByteDance). High-concurrency distributed systems, real-time messaging, and financial AI evaluation infrastructure.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Zizheng Lyu · Engineering Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zizheng Lyu (吕子正) — Senior Product & Systems Engineer",
    description:
      "Personal engineering atelier & technical writings of Lyu Zizheng (Wise, ex-ByteDance). High-concurrency distributed systems, real-time messaging, and AI automation.",
    images: ["/og"],
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
