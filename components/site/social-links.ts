import { siteConfig } from "@/lib/site";

interface SocialLink {
  readonly key: string;
  readonly label: string;
  readonly href: string;
}

/**
 * BRAWUKA-45 · Social matrix, single source of truth (server-safe:
 * plain data only, so Server Components can import it directly —
 * never from a "use client" module).
 */
export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  { key: "github", label: "GitHub", href: siteConfig.social.github },
  { key: "x", label: "X (Twitter)", href: siteConfig.social.twitter },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { key: "instagram", label: "Instagram", href: siteConfig.social.instagram },
];
