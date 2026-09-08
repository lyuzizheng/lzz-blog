import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const failures = [];

const check = (ok, message) => {
  if (!ok) failures.push(message);
};

const page = read("app/weekly-records/page.tsx");
const component = read("components/weekly-records/weekly-records.tsx");
const records = read("lib/weekly-records.ts");
const chapters = read("lib/chapters.ts");
const sitemap = read("app/sitemap.ts");
const en = read("lib/i18n/dictionaries/en.ts");
const zh = read("lib/i18n/dictionaries/zh.ts");

check(page.includes("export const metadata") && page.includes("<WeeklyRecords"), "weekly records route must keep a server shell with metadata");
check(
  component.includes('role="tablist"') && component.includes('role="tab"') && component.includes('role="tabpanel"'),
  "weekly records page must expose Personal and Work as accessible horizontal tabs",
);
check(component.includes("AnimatePresence") && component.includes("useReducedMotion"), "record tabs must cross-fade with a reduced-motion fallback");
check(component.includes("<RecordsTimeline") && component.includes("WORK_WEEKLY_RECORDS"), "Work tab must render the agent-maintained timeline");
check(!component.includes('href="#personal"') && !component.includes('href="#work"'), "record tabs must replace the old vertically stacked anchor sections");
check(records.includes("PERSONAL_WEEKLY_RECORDS") && records.includes("must not change"), "Personal records must remain outside the weekly agent workflow");
check((records.match(/period: "/g) || []).length === 10, "initial Work timeline must contain all 10 Confluence weekly records");
check(records.includes('period: "31 Aug–6 Sep 2026"'), "timeline must include the latest imported week");
check(records.includes('period: "29 Jun–5 Jul 2026"'), "timeline must include the oldest imported week");
check(chapters.includes('href: "/weekly-records"') && chapters.includes('frameNo: "05"'), "Weekly Records must be the fifth chapter negative");
check(sitemap.includes("/weekly-records"), "sitemap must publish the Weekly Records route");
check(en.includes('records: "Records"') && zh.includes('records: "周记"'), "Weekly Records navigation must be bilingual");

if (failures.length) {
  console.error("weekly-records check FAILED:");
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log("weekly-records OK: fifth chapter film, Personal/Work cross-fade tabs, 10 imported Work entries, bilingual shell, sitemap.");
