import type { MetadataRoute } from "next";
import { posts } from "#site/content";
import { siteConfig } from "@/lib/site";

/**
 * Static + article URLs. Drafts excluded. lastModified falls back to post date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/resume`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/llms.txt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${siteConfig.url}/photography`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/weekly-records`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/status`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.5,
    },
  ];

  const articles: MetadataRoute.Sitemap = posts
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${siteConfig.url}${p.permalink}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  return [...statics, ...articles];
}
