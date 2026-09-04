// BRAWUKA-54 gate: validates the /status console + /api/health probe contracts.
//
// Source-text gate (same convention as seo-finish.check.mjs): pins the
// acceptance criteria — health JSON shape, no-store + edge-timing headers,
// three status cards, sitemap + footer entry points, server-shell page —
// without spinning up a browser.
// Run: node scripts/status-health.check.mjs (no build needed — static source scan).
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
expect(
  "lib/health.ts",
  (s) =>
    s.includes('"healthy"') &&
    s.includes("timestamp") &&
    s.includes("posts_count") &&
    s.includes("uptime") &&
    s.includes("commit"),
  "health payload (status/timestamp/version/commit/posts_count/uptime)",
);
expect(
  "app/api/health/route.ts",
  (s) =>
    s.includes("no-store, max-age=0") &&
    s.includes("Server-Timing") &&
    s.includes("X-Edge-Latency-Ms") &&
    s.includes("force-dynamic"),
  "health headers (no-store + edge timing + dynamic)",
);

// 2. Status page: server shell, three cards, shared chrome.
expectExists("app/status/page.tsx", "status page");
expect(
  "app/status/page.tsx",
  (s) => !s.includes('"use client"') && s.includes("export const metadata"),
  "status page (server shell + metadata)",
);
expect(
  "app/status/page.tsx",
  (s) =>
    s.includes("SYSTEM PULSE") &&
    s.includes("ATELIER ARTIFACTS") &&
    s.includes("ARCHITECTURE & GATES") &&
    s.includes("StatusConsole") &&
    s.includes("SiteHeader") &&
    s.includes("SiteFooter"),
  "status cards (pulse + artifacts + gates, shared chrome)",
);
expect(
  "components/site/status-console.tsx",
  (s) =>
    s.includes('"use client"') &&
    s.includes("/api/health") &&
    s.includes("Escape") &&
    s.includes("OPERATIONAL"),
  "status console island (live probe + Esc exit)",
);

// 3. Entry points: sitemap + footer link.
expect(
  "app/sitemap.ts",
  (s) => s.includes("/status"),
  "sitemap (status URL)",
);
expect(
  "components/site/site-footer.tsx",
  (s) => s.includes('href="/status"'),
  "footer (status entry)",
);

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll BRAWUKA-54 status checks passed.");
