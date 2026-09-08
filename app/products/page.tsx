import type { Metadata } from "next";
import { ProductsDeck } from "@/components/products";
import { SiteHeader } from "@/components/site";
import { siteConfig } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "产品与项目 · Products — LZZ Atelier",
  description:
    "工作之余的独立产品实验与工程作品展台：CoffeeMode（找咖指南）、CanCan（本地财务证据库与对账台）、Our Village（社区成员系统）。",
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
  openGraph: {
    title: "产品与项目 · Products — LZZ Atelier",
    description:
      "工作之余的独立产品实验与工程作品展台：CoffeeMode（找咖指南）、CanCan（本地财务证据库与对账台）、Our Village（社区成员系统）。",
    url: `${siteConfig.url}/products`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
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
