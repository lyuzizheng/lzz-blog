import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lyu Zizheng (吕子正) · Systems & Product Engineering",
    template: "%s · Lyu Zizheng",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Lyu Zizheng (吕子正) · Systems & Product Engineering",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Lyu Zizheng (吕子正) · Systems & Product Engineering",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyu Zizheng (吕子正) · Systems & Product Engineering",
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
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
