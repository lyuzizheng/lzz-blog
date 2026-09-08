import type { Metadata } from "next";
import { DarkroomGallery, PhotographyMasterView } from "@/components/motion/darkroom";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "摄影画廊与暗房地图 · The Darkroom Atlas — LZZ Atelier",
  description:
    "Photographic cartography with visited pins, geodetic EXIF telemetry, and the digital darkroom lightbox on Sony A7M4. 35mm film aesthetics.",
  keywords: [
    "Photography",
    "Darkroom",
    "Sony A7M4",
    "35mm Film",
    "EXIF Telemetry",
    "Singapore Photography",
    "Lyu Zizheng",
  ],
  alternates: { canonical: `${siteConfig.url}/photography` },
  openGraph: {
    title: "摄影画廊与暗房地图 · The Darkroom Atlas — LZZ Atelier",
    description:
      "Photographic cartography with visited pins, geodetic EXIF telemetry, and the digital darkroom lightbox on Sony A7M4.",
    url: `${siteConfig.url}/photography`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "The Darkroom Atlas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "摄影画廊与暗房地图 · The Darkroom Atlas — LZZ Atelier",
    description:
      "Photographic cartography with visited pins, geodetic EXIF telemetry, and the digital darkroom lightbox on Sony A7M4.",
    images: ["/og"],
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
