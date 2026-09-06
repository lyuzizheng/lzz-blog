/**
 * LZZ Blog · canonical site metadata (single source of truth).
 * Canonical origin: https://brabalawuka.cc (from legacy_hugo/config.yml baseURL).
 */
export const siteConfig = {
  name: "LZZ Blog",
  atelier: "LZZ Atelier · The Digital Darkroom & Print Atelier",
  author: "Zizheng Lyu",
  url: "https://brabalawuka.cc",
  locale: "zh-CN",
  description:
    "Personal digital darkroom & engineering atelier of Zizheng Lyu. Physicality meets fluid dynamics: Next.js 15, Tailwind CSS v4, Lenis smooth scrolling.",
  keywords: [
    "Zizheng Lyu",
    "Next.js 15",
    "Digital Darkroom",
    "Print Atelier",
    "Tailwind CSS v4",
    "Lenis",
    "Motion",
  ],
  social: {
    twitter: "https://twitter.com/brabalawuka",
    github: "https://github.com/lyuzizheng",
    instagram: "https://www.instagram.com/brabalawuka",
    linkedin: "https://www.linkedin.com/in/lyuzizheng/",
  },
} as const;
