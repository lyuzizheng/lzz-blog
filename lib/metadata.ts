import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "LZZ Blog · The Digital Darkroom & Print Atelier",
    template: "%s · LZZ Blog",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.atelier,
    title: "LZZ Blog · The Digital Darkroom & Print Atelier",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LZZ Blog · The Digital Darkroom & Print Atelier",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
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
