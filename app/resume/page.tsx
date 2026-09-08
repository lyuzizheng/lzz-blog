import type { Metadata } from "next";
import { CareerDeck } from "@/components/motion/career-deck";
import {
  ResumeDossier,
  ResumePrint,
  PrintResumeButton,
} from "@/components/motion/resume";
import { SiteHeader } from "@/components/site";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lyu Zizheng · 履历与工程生涯 (Career & Resume)",
  description:
    "Wise 资深产品工程师（Tech Owner），前字节跳动 TikTok IM 核心研发。5 年+ 高并发分布式系统、实时通讯与金融 AI 自动化评估平台经验。",
  keywords: [
    ...siteConfig.keywords,
    "Resume",
    "Curriculum Vitae",
    "Product Engineer 3",
    "Redis ZSET",
    "Kafka",
    "Singapore Citizen",
  ],
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: "Lyu Zizheng · 履历与工程生涯 (Career & Resume)",
    description:
      "Wise 资深产品工程师（Tech Owner），前字节跳动 TikTok IM 核心研发。5 年+ 高并发分布式系统、实时通讯与金融 AI 自动化评估平台经验。",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "profile",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Lyu Zizheng · 履历与工程生涯",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyu Zizheng · 履历与工程生涯 (Career & Resume)",
    description:
      "Wise 资深产品工程师（Tech Owner），前字节跳动 TikTok IM 核心研发。5 年+ 高并发分布式系统、实时通讯与金融 AI 自动化评估平台经验。",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

/**
 * Career 页面全景（固定单屏纵向分幕流转 + 定制阶段背景 + 真实战役数据沉淀）
 * - 统一顶部导航：复用全局 SiteHeader，全站 100% 一致常驻
 * - 固定单屏纵向吸附流转：100dvh 容器，上下渐隐飞出（Vertical Fade + Y-Parallax）
 * - 专属舞台背景：4 款独立高精度 Thematic Stage Canvas (Wise / Exploration / Bytedance / Hero)
 * - 真实战役数据沉淀：Wise AI Workflow 80k/mo、MariBank 金融一致性、Bondee Vector+Kafka、TikTok IM
 * - 双模履历：交互浏览模式 + @media print 出版级 A4 纸质/PDF 导出
 */
export default function ResumePage() {
  // Structured Data (Schema.org ProfilePage & Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Lyu Zizheng · Career & Engineering Profile",
    url: `${siteConfig.url}/resume`,
    mainEntity: {
      "@type": "Person",
      name: "Lyu Zizheng",
      alternateName: "吕子正",
      jobTitle: "Senior Product & Systems Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Wise",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Nanyang Technological University",
      },
      url: `${siteConfig.url}/resume`,
      image: `${siteConfig.url}/avatar.jpg`,
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.github,
        siteConfig.url,
      ],
      knowsAbout: [
        "Distributed Systems",
        "High Concurrency Architecture",
        "Instant Messaging Protocols",
        "Presence Engines",
        "Financial Payment Core",
        "AI Evaluation Infrastructure",
        "Deterministic DAG State Machines",
        "Golang",
        "Java",
        "Kafka",
        "Redis",
        "Kubernetes",
      ],
    },
  };

  return (
    <div className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-substrate text-primary transition-colors duration-300 overscroll-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. 统一顶部导航 (Header Parity - 100% 保持全局一致常驻) */}
      <SiteHeader />

      {/* 2. 沉浸式固定单屏纵向分幕流转平台 (Vertical Snap-Deck Dynamics) */}
      <main
        className="relative mx-auto flex h-[calc(100dvh-3.5rem)] w-full max-w-5xl flex-1 flex-col overflow-hidden"
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
