// BRAWUKA-40 finish-line checks: route transition, SEO routes, server shells.
// Run: node scripts/seo-finish.check.mjs (no build needed — static source scan).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
let failures = 0;

function expect(file, predicate, label) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`FAIL ${label}: missing ${file}`);
    failures += 1;
    return;
  }
  const src = fs.readFileSync(full, "utf8");
  if (!predicate(src)) {
    console.error(`FAIL ${label}: ${file} lacks expected content`);
    failures += 1;
    return;
  }
  console.log(`PASS ${label}`);
}

function expectExists(file, label) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`FAIL ${label}: missing ${file}`);
    failures += 1;
    return;
  }
  console.log(`PASS ${label}`);
}

// 1. Motion finish: route transition wired in layout, reduced-motion bypass present.
expect(
  "components/motion/route-transition.tsx",
  (s) => s.includes("usePathname") && s.includes("prefers-reduced-motion") && s.includes("scrollTo"),
  "route-transition (pathname key + scroll restore + reduced-motion)",
);
expect(
  "app/layout.tsx",
  (s) => s.includes("RouteTransition") && s.includes("metadataBase") && s.includes("openGraph"),
  "layout (transition wired + full Metadata API)",
);

// 2. SEO routes exist.
expectExists("app/opengraph-image.tsx", "home OG image");
expectExists("app/og/route.tsx", "shared OG card endpoint");
expect(
  "app/posts/[...slug]/page.tsx",
  (s) => s.includes("/og?title=") && s.includes("openGraph") && s.includes("images:"),
  "per-post OG images via shared endpoint",
);
expectExists("app/sitemap.ts", "sitemap");
expectExists("app/robots.ts", "robots");
expectExists("app/feed.xml/route.ts", "RSS feed");
expect(
  "app/feed.xml/route.ts",
  (s) => s.includes("<rss") && s.includes("escapeXml") && s.includes("force-static"),
  "RSS (escaped static feed)",
);

// 3. Server shells: no "use client" on page routes.
for (const f of ["app/page.tsx", "app/posts/page.tsx"]) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  if (src.includes('"use client"')) {
    console.error(`FAIL server-shell: ${f} still client-rendered`);
    failures += 1;
  } else {
    console.log(`PASS server-shell: ${f}`);
  }
}
expect(
  "app/posts/page.tsx",
  (s) => s.includes("export const metadata") && s.includes("ArchiveList"),
  "posts index (metadata + client island)",
);

// 4. CI gate exists.
expectExists(".github/workflows/ci.yml", "CI workflow (typecheck+test+build)");

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll BRAWUKA-40 finish checks passed.");
