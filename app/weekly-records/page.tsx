import type { Metadata } from "next";
import { WeeklyRecords } from "@/components/weekly-records";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
  description:
    "公开记录的技术反思、分布式系统手记与独立开发者周记。",
  keywords: [
    ...siteConfig.keywords,
    "Weekly Records",
    "Engineering Log",
  ],
  alternates: {
    canonical: `${siteConfig.url}/weekly-records`,
  },
  openGraph: {
    title: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
    description:
      "公开记录的技术反思、分布式系统手记与独立开发者周记。",
    url: `${siteConfig.url}/weekly-records`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og?title=${encodeURIComponent("每周记录与技术随笔")}&sub=${encodeURIComponent("持续反思 · 架构手记 · 独立工程周记")}&badge=${encodeURIComponent("WEEKLY RECORDS")}`,
        width: 1200,
        height: 630,
        alt: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
    description:
      "公开记录的技术反思、分布式系统手记与独立开发者周记。",
    images: [
      `${siteConfig.url}/og?title=${encodeURIComponent("每周记录与技术随笔")}&sub=${encodeURIComponent("持续反思 · 架构手记 · 独立工程周记")}&badge=${encodeURIComponent("WEEKLY RECORDS")}`,
    ],
  },
};

export default function WeeklyRecordsPage() {
  return <WeeklyRecords />;
}
