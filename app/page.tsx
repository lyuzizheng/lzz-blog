import React from "react";
import type { Metadata } from "next";
import { HomeAtelier } from "@/components/home";

export const metadata: Metadata = {
  title: "Zizheng Lyu — Engineer & Visual Storyteller",
  description:
    "Zizheng Lyu's personal page: writings on distributed systems, darkroom photography, and the flight path from NTU to ByteDance.",
  alternates: { canonical: "/" },
};

/**
 * BRAWUKA-78 · 单屏无滚动首页（The Atelier Workbench）
 *
 * 一个 100dvh 画框到底：中央 avatar + 名字 + 描述 + 社交矩阵，
 * 下方四张 35mm 负片叠放，点击散落后各自通向独立章节页
 * （Blogs /posts · Career /resume · Photography /photography · Projects /products）。
 * 无 Slide、无翻页、无全局 sticky chrome。
 */
const CHAPTER_ROUTES = ["/posts", "/resume", "/photography", "/products"] as const;

export default function HomePage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-substrate text-primary transition-colors duration-300">
      {/* 隐藏语义链接（确保纯 HTML 爬虫与静态验证可达四个章节） */}
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
