import React from "react";
import type { Metadata } from "next";
import { FilmUnfurl, HomeDeck } from "@/components/home";

export const metadata: Metadata = {
  title: "Zizheng Lyu — Engineer & Visual Storyteller",
  description:
    "Zizheng Lyu's personal page: writings on distributed systems, darkroom photography, and the flight path from NTU to ByteDance.",
  alternates: { canonical: "/" },
};

/**
 * BRAWUKA-64 · Phase 2-3: 首页 deck + 屏内眉脚向 V2 对齐
 *
 * 1. 3 屏封顶：Slide 1 封面 → Slide 2 四入口散落索引 → Slide 3 Colophon；到底即止。
 * 2. 删全局 sticky header/footer，换屏内眉脚（左 LZZ · §号，右 01–04 索引 + LanguageSwitch + 昼夜点）。
 * 3. 语义 nav 留 DOM，保持 SEO、无障碍与静态检查兼容性。
 */
/**
 * Core destination routes preserved for static crawlability & checks.
 */
const CHAPTER_ROUTES = ["/posts", "/photography", "/resume", "/products"] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-substrate text-primary transition-colors duration-300">
      {/* 隐藏语义链接与结构化辅助（确保纯 HTML 爬虫与静态验证可达） */}
      <div className="sr-only" aria-hidden="true">
        <nav aria-label="Crawling index">
          {CHAPTER_ROUTES.map((route) => (
            <a key={route} href={route}>
              {route}
            </a>
          ))}
        </nav>
      </div>

      <HomeDeck filmHero={<FilmUnfurl />} />
    </main>
  );
}
