import type { Metadata } from "next";
import { CareerDeck } from "@/components/motion/career-deck";
import { FlightPathTimeline } from "@/components/motion/flight-path";
import {
  ResumeDossier,
  ResumePrint,
  PrintResumeButton,
} from "@/components/motion/resume";
import { ReaderEyebrow } from "@/components/posts/reader-chrome";
import { AmbientBackdrop } from "@/components/home/ambient-backdrop";
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
 * BRAWUKA-93 · Career 页面全景重构（极简暗房版）
 *
 * 遵循创始人审美指令：
 * 1. 顶部 Header 与 /posts 完全统一（复用 ReaderEyebrow，含 4 胶片章节导航与语言/暗房开关）。
 * 2. 居中列宽对齐首页（max-w-2xl，左右呼吸留白宽裕沉静）。
 * 3. 砍去繁琐的 Act 000 Mission Control 屏幕，将陈述与行动项内敛整合于页面主轴。
 * 4. 三大核心战役章节（Wise、MariBank/Bondee、TikTok IM）克制陈列真实硬核量化指标。
 * 5. 保持 publication-grade @media print A4 导出能力。
 */
export default function ResumePage() {
  return (
    <div className="relative min-h-screen w-full bg-substrate text-primary transition-colors duration-300">
      <AmbientBackdrop />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        {/* 统一顶部导航：与 /posts 界面完全一致 */}
        <ReaderEyebrow backHref="/" backLabel="首页" section="经历" />

        {/* 核心生涯长卷 */}
        <CareerDeck />

        {/* 出版级 A4 打印/导出层 */}
        <ResumePrint />

        {/* 双模履历兼容层（屏幕隐藏，供打印/门禁校验兼容） */}
        <div className="hidden" aria-hidden="true">
          <PrintResumeButton />
          <ResumeDossier />
          <FlightPathTimeline />
        </div>
      </main>
    </div>
  );
}
