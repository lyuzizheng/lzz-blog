import type { Metadata } from "next";
import { CareerDeck } from "@/components/motion/career-deck";
import { FlightPathTimeline } from "@/components/motion/flight-path";
import {
  ResumeDossier,
  ResumePrint,
  PrintResumeButton,
} from "@/components/motion/resume";
import { SiteHeader } from "@/components/site";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "履历与生涯航线 · Career Flight Path — LZZ Atelier",
  description:
    "Zizheng Lyu's career story deck and engineering capabilities: distributed systems, platform infrastructure, and product craftsmanship.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: "履历与生涯航线 · Career Flight Path — LZZ Atelier",
    description:
      "Zizheng Lyu's career story deck and engineering capabilities: distributed systems, platform infrastructure, and product craftsmanship.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
  },
};

/**
 * BRAWUKA-93: Career 页面全景重构
 *
 * - 统一顶部导航：复用全局 SiteHeader，全站一致
 * - 全屏分幕吸附流转：100dvh 单屏纵向流转与物理动效 (CareerDeck)
 * - 专属舞台背景：定制 Thematic Stage Canvas (Wise / MariBank / Bondee / ByteDance)
 * - 真实战役沉淀：30k+ cases/mo、£80k/mo 降本、20+ 微服务高可用、Vector/Kafka 自研日志管线
 * - 出版级双模打印：保留 ResumePrint 与 A4 @media print 导出能力
 */
export default function ResumePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-substrate text-primary transition-colors duration-300">
      {/* 1. 统一顶部导航 (Unified Header) */}
      <SiteHeader />

      {/* 2. 全屏分幕吸附流转舞台 (CareerDeck) */}
      <main className="w-full flex-1">
        <CareerDeck />
      </main>

      {/* 3. 出版级 A4 打印/导出层 (Printable Resume) */}
      <ResumePrint />

      {/* 4. 双模履历兼容层 (Screen-hidden for Print / Dual-mode Compatibility) */}
      <div className="hidden" aria-hidden="true">
        <PrintResumeButton />
        <ResumeDossier />
        <FlightPathTimeline />
      </div>
    </div>
  );
}
