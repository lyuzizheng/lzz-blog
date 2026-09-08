import type { Metadata } from "next";
import { WeeklyRecords } from "@/components/weekly-records";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
  description:
    "公开记录的每周个人与工作思考，关于系统工程、独立产品与生活点滴。",
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
      "公开记录的每周个人与工作思考，关于系统工程、独立产品与生活点滴。",
    url: `${siteConfig.url}/weekly-records`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Weekly Records · Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "每周记录与生活随笔 · Weekly Records | Lyu Zizheng",
    description:
      "公开记录的每周个人与工作思考，关于系统工程、独立产品与生活点滴。",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export default function WeeklyRecordsPage() {
  return <WeeklyRecords />;
}
