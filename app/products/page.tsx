import type { Metadata } from "next";
import { ProductsDeck } from "@/components/products";
import { SiteHeader } from "@/components/site";
import { siteConfig } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "独立作品与实验产品 · Products | Lyu Zizheng",
  description:
    "工作之余的独立产品实验：CanCan（本地对账台）、CoffeeMode（极简咖啡指南）、Our Village（社区成员系统）。",
  keywords: [
    ...siteConfig.keywords,
    "CanCan",
    "CoffeeMode",
    "Our Village",
    "Independent Developer",
  ],
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
  openGraph: {
    title: "独立作品与实验产品 · Products | Lyu Zizheng",
    description:
      "工作之余的独立产品实验：CanCan（本地对账台）、CoffeeMode（极简咖啡指南）、Our Village（社区成员系统）。",
    url: `${siteConfig.url}/products`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Products & Side Projects · Lyu Zizheng",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "独立作品与实验产品 · Products | Lyu Zizheng",
    description:
      "工作之余的独立产品实验：CanCan（本地对账台）、CoffeeMode（极简咖啡指南）、Our Village（社区成员系统）。",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export default function ProductsPage() {
  // Structured Data (Schema.org ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "LZZ Atelier Products",
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      description: product.taglineZh,
      url: product.link.href,
    })),
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-substrate text-primary transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="relative w-full flex-1 overflow-y-auto">
        <ProductsDeck />
      </main>
    </div>
  );
}
