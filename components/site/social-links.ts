import { siteConfig } from "@/lib/site";

export interface SocialLink {
  readonly key: string;
  /** Monospace microbadge glyph — no brand-icon dependency, telemetry aesthetic. */
  readonly badge: string;
  readonly label: string;
  readonly href: string;
}

export function handleOf(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    const leaf = path.split("/").filter(Boolean).pop() ?? "";
    return leaf ? `@${leaf}` : url;
  } catch {
    return url;
  }
}

/**
 * BRAWUKA-45 · Social matrix, single source of truth (server-safe:
 * plain data only, so Server Components can import it directly —
 * never from a "use client" module).
 */
export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  { key: "github", badge: "GH", label: "GitHub", href: siteConfig.social.github },
  { key: "x", badge: "X", label: "X (Twitter)", href: siteConfig.social.twitter },
  { key: "linkedin", badge: "IN", label: "LinkedIn", href: siteConfig.social.linkedin },
  { key: "instagram", badge: "IG", label: "Instagram", href: siteConfig.social.instagram },
];
