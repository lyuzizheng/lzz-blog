/**
 * LZZ Blog · canonical site metadata (single source of truth).
 * Canonical origin: https://brabalawuka.cc (from legacy_hugo/config.yml baseURL).
 */
export const siteConfig = {
  name: "Lyu Zizheng · 吕子正",
  atelier: "LZZ Atelier · Lyu Zizheng",
  author: "Lyu Zizheng",
  authorZh: "吕子正",
  url: "https://brabalawuka.cc",
  locale: "zh-CN",
  description:
    "吕子正（Lyu Zizheng）的技术主页与随笔。Wise 资深产品工程师，前字节跳动 TikTok IM 核心研发。聚焦高并发分布式系统、AI 评估基建与 35mm 胶片摄影。",
  descriptionEn:
    "Personal engineering atelier & technical essays of Lyu Zizheng. Senior Product & Systems Engineer at Wise (ex-ByteDance, NTU). High-concurrency distributed systems, real-time messaging, AI evaluation, and 35mm photography.",
  keywords: [
    "Lyu Zizheng",
    "Zizheng Lyu",
    "吕子正",
    "Wise Product Engineer",
    "ByteDance Engineer",
    "TikTok IM",
    "Distributed Systems",
    "High Concurrency",
    "AI Evaluation",
    "FinTech",
    "Golang",
    "Java",
    "Singapore",
    "Darkroom Photography",
  ],
  social: {
    twitter: "https://twitter.com/brabalawuka",
    github: "https://github.com/lyuzizheng",
    instagram: "https://www.instagram.com/brabalawuka",
    linkedin: "https://www.linkedin.com/in/lyuzizheng/",
  },
} as const;
