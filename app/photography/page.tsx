import type { Metadata } from "next";
import { DarkroomGallery, PhotographyMasterView } from "@/components/motion/darkroom";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "35mm 暗房与纪实摄影 | Lyu Zizheng",
  description:
    "索尼 A7M4 与 35mm 胶卷纪实作品，收录新加坡与东京的光影记忆与 GPS 遥测。",
  keywords: [
    ...siteConfig.keywords,
    "Photography",
    "Darkroom",
    "Sony A7M4",
    "35mm Film",
    "GPS Telemetry",
  ],
  alternates: { canonical: `${siteConfig.url}/photography` },
  openGraph: {
    title: "35mm 暗房与纪实摄影 | Lyu Zizheng",
    description:
      "索尼 A7M4 与 35mm 胶卷纪实作品，收录新加坡与东京的光影记忆与 GPS 遥测。",
    url: `${siteConfig.url}/photography`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og?title=${encodeURIComponent("35mm 暗房与纪实摄影")}&sub=${encodeURIComponent("索尼 A7M4 · 35mm 胶卷 · 城市光影与 GPS 遥测")}&badge=${encodeURIComponent("35MM DARKROOM")}`,
        width: 1200,
        height: 630,
        alt: "35mm 暗房与纪实摄影 | Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "35mm 暗房与纪实摄影 | Lyu Zizheng",
    description:
      "索尼 A7M4 与 35mm 胶卷纪实作品，收录新加坡与东京的光影记忆与 GPS 遥测。",
    images: [
      `${siteConfig.url}/og?title=${encodeURIComponent("35mm 暗房与纪实摄影")}&sub=${encodeURIComponent("索尼 A7M4 · 35mm 胶卷 · 城市光影与 GPS 遥测")}&badge=${encodeURIComponent("35MM DARKROOM")}`,
    ],
  },
};

export default function PhotographyPage() {
  return (
    <>
      <PhotographyMasterView initialView="map" />
      <noscript>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <DarkroomGallery />
        </div>
      </noscript>
    </>
  );
}
