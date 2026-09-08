import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Zizheng Lyu (吕子正) · The Engineering Atelier & Digital Darkroom",
    template: "%s · LZZ Blog",
  },
  description: siteConfig.description,
  keywords: [
    ...siteConfig.keywords,
    "Lyu Zizheng",
    "Zizheng Lyu",
    "吕子正",
    "Wise Product Engineer",
    "ByteDance Engineer",
    "Distributed Systems",
    "High Concurrency",
    "TikTok IM",
    "AI Evaluation",
    "FinTech Payment Core",
    "Golang",
    "Java",
    "Singapore Software Engineer",
    "Darkroom Photography",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.atelier,
    title: "Zizheng Lyu (吕子正) · The Engineering Atelier & Digital Darkroom",
    description: siteConfig.description,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Zizheng Lyu · Engineering Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zizheng Lyu (吕子正) · The Engineering Atelier & Digital Darkroom",
    description: siteConfig.description,
    images: ["/og"],
    creator: "@brabalawuka",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "SG",
    "geo.placename": "Singapore",
    "geo.position": "1.3521;103.8198",
    "ICBM": "1.3521, 103.8198",
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export const rootViewport: Viewport = {
  themeColor: "#0D0E11",
  width: "device-width",
  initialScale: 1,
};
