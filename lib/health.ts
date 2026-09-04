import { posts } from "#site/content";
import packageJson from "@/package.json";

/** BRAWUKA-54 · `/api/health` payload contract (shared by route + `/status`). */
export interface HealthPayload {
  status: "healthy";
  timestamp: string;
  version: string;
  commit: string;
  environment: string;
  posts_count: number;
  uptime: string;
}

export function getHealthPayload(): HealthPayload {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: packageJson.version,
    commit:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.CF_PAGES_COMMIT_SHA ??
      process.env.GIT_COMMIT_SHA ??
      "dev",
    environment: process.env.NODE_ENV ?? "development",
    posts_count: posts.filter((p) => !p.draft).length,
    uptime: `${Math.floor(process.uptime())}s`,
  };
}
