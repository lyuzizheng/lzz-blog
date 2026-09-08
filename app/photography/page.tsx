import type { Metadata } from "next";
import { DarkroomGallery, PhotographyMasterView } from "@/components/motion/darkroom";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "35mm 暗房与纪实摄影 | Lyu Zizheng",
  description:
    "索尼 A7M4 与 35mm 胶片摄影作品，包含带 GPS EXIF 遥测的交互式暗房地图与画廊。",
  keywords: [
    ...siteConfig.keywords,
    "Photography",
    "Darkroom",
    "Sony A7M4",
    "35mm Film",
  ],
  alternates: { canonical: `${siteConfig.url}/photography` },
  openGraph: {
    title: "35mm 暗房与纪实摄影 | Lyu Zizheng",
    description:
      "索尼 A7M4 与 35mm 胶片摄影作品，包含带 GPS EXIF 遥测的交互式暗房地图与画廊。",
    url: `${siteConfig.url}/photography`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
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
      "索尼 A7M4 与 35mm 胶片摄影作品，包含带 GPS EXIF 遥测的交互式暗房地图与画廊。",
    images: [`${siteConfig.url}/opengraph-image`],
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
