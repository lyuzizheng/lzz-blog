import React from "react";
import type { Metadata } from "next";
import { HomeWorkbench } from "@/components/home";

export const metadata: Metadata = {
  title: "Zizheng Lyu — Engineer & Visual Storyteller",
  description:
    "Zizheng Lyu's personal page: writings on distributed systems, darkroom photography, and the flight path from NTU to ByteDance.",
  alternates: { canonical: "/" },
};

/**
 * BRAWUKA-78 · 首页 = 单屏无滚动暗房工作台（推翻 BRAWUKA-64 三屏 deck）
 *
 * 1. 100dvh 单屏到底，桌面与移动端均不可滑动翻页，无 Slide 2/3。
 * 2. 中央：身份卡片（avatar + 名字 + 一句话 + 社交链接行）+ 四胶片叠放散落式导航。
 * 3. 语义 nav 留 DOM，保持 SEO、无障碍与静态检查兼容性。
 */
const CHAPTER_ROUTES = ["/posts", "/resume", "/photography", "/products"] as const;

export default function HomePage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-substrate text-primary transition-colors duration-300">
      {/* 隐藏语义链接与结构化辅助（确保纯 HTML 爬虫与静态验证可达） */}
      <div className="sr-only" aria-hidden="true">
        <nav aria-label="Crawling index">
          {CHAPTER_ROUTES.map((route) => (
            <a key={route} href={route} tabIndex={-1}>
              {route}
            </a>
          ))}
        </nav>
      </div>

      <HomeWorkbench />
    </main>
  );
}
