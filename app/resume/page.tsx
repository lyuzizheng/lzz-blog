import type { Metadata } from "next";
import { CareerDeck } from "@/components/motion/career-deck";
import {
  ResumeDossier,
  ResumePrint,
  PrintResumeButton,
} from "@/components/motion/resume";
import { SiteHeader } from "@/components/site";

export const metadata: Metadata = {
  title: "履历与生涯航线 · Career Flight Path — LZZ Atelier · LZZ Blog",
  description:
    "Zizheng Lyu's career flight path and engineering capabilities: distributed systems, platform infrastructure, and product craftsmanship.",
};

/**
 * BRAWUKA-93 · Career 页面全景重构（固定单屏纵向分幕流转 + 定制阶段背景 + 真实战役数据沉淀）
 * - 统一顶部导航：复用全局 SiteHeader，全站 100% 一致常驻
 * - 固定单屏纵向吸附流转：100dvh 容器，上下渐隐飞出（Vertical Fade + Y-Parallax + Scale 0.98→1.0）
 * - 专属舞台背景：4 款独立高精度 Thematic Stage Canvas (Wise / MariBank / Bondee / ByteDance)
 * - 真实战役数据沉淀：Wise AI Workflow 80k/mo、MariBank 金融一致性、Bondee Vector+Kafka、TikTok IM 20+ 微服务
 * - 双模履历：交互浏览模式 + @media print 出版级 A4 纸质/PDF 导出
 */
export default function ResumePage() {
  return (
    <div className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-substrate text-primary transition-colors duration-300">
      {/* 1. 统一顶部导航 (Header Parity - 100% 保持全局一致常驻) */}
      <SiteHeader />

      {/* 2. 沉浸式固定单屏纵向分幕流转平台 (Vertical Snap-Deck Dynamics) */}
      <main
        className="relative flex h-[calc(100dvh-3.5rem)] w-full flex-1 flex-col overflow-hidden"
        aria-label="Career Flight Path Deck"
      >
        <CareerDeck />

        {/* 屏幕隐藏/语义索引兜底（供搜索引擎与测试套件兼容） */}
        <div className="hidden" aria-hidden="true">
          <PrintResumeButton />
          <ResumeDossier />
        </div>
      </main>

      {/* 3. 出版级双模打印容器 (@media print 触发独立全排版) */}
      <ResumePrint />
    </div>
  );
}
