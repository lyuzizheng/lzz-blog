/**
 * BRAWUKA-85 verification suite: /posts archive page redesign (The Archive Reading Room).
 *
 * Invariants enforced:
 * 1. Server shell: app/posts/page.tsx must NOT carry "use client".
 * 2. Client island: components/posts/archive-list.tsx must be "use client".
 * 3. Masthead: "Posts & Thoughts" serif title + mono telemetry; zero marketing subtitles or badges.
 * 4. Header: 5 mini rectangular negatives as section navigation matching homepage workbench.
 * 5. Big editorial cards on the timeline: cover photo (or halftone specimen plate),
 *    serif title, summary, tags, created time, reading time; framer-motion scroll-in.
 * 6. Year anchors: giant serif numbers, strictly non-sticky, zero backdrop-blur.
 * 7. Hover interaction: translate-x-1 + cobalt #2148B8; zero hover shadow or upward elevation.
 * 8. Mono toolbar: ALL / STUDY / ESSAY channel tabs with hairline indicator;
 *    borderless mono input (bottom hairline, no rounded-full);
 *    pure text tags with cobalt active state (no pill background).
 * 9. Red lines: zero rounded-xl, zero backdrop-blur, zero hover shadows, lucide icons ≤ 1.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const postsPage = read("app/posts/page.tsx");
const archiveList = [
  "components/posts/archive-list.tsx",
  "components/posts/archive-card.tsx",
  "components/posts/archive-filters.tsx",
  "components/posts/archive-timeline.tsx",
].map(read).join("\n");
const readerChrome = read("components/posts/reader-chrome.tsx");
const siteHeader = read("components/site/site-header.tsx");
const postDetailPage = read("app/posts/[...slug]/page.tsx");
const postHeader = read("components/posts/post-header.tsx");
const zh = read("lib/i18n/dictionaries/zh.ts");
const en = read("lib/i18n/dictionaries/en.ts");

// 1. Server Component & Client Island Boundary
check(!postsPage.includes('"use client"'), "app/posts/page.tsx must remain a Server Component");
check(archiveList.includes('"use client"'), "components/posts/archive-list.tsx must be a client island");
check(postsPage.includes("<ArchiveList"), "app/posts/page.tsx must mount ArchiveList");

// 2. 刊头（Masthead）：直接说 Posts & Thoughts + mono telemetry
check(
  archiveList.includes("font-display") &&
    (archiveList.includes("Posts & Thoughts") || archiveList.includes("Posts &amp; Thoughts")),
  "archive list must render serif masthead title 'Posts & Thoughts'"
);
check(
  archiveList.includes("DISPATCHES") && archiveList.includes("font-telemetry"),
  "archive list must render mono telemetry dispatches count and year range"
);
check(!postsPage.includes("思想工坊与出版物物料库"), "marketing title '思想工坊与出版物物料库' must be removed");
check(!postsPage.includes("DOCUMENT ARCHIVE · VOL."), "marketing badge 'DOCUMENT ARCHIVE · VOL.' must be removed");
check(!postsPage.includes("BookOpen") && !archiveList.includes("BookOpen"), "BookOpen icon must be removed from posts page and archive list");
check(!archiveList.includes("t.posts.subtitle"), "marketing subtitle must not be rendered in the masthead");

// 3. Header 契约：5 mini 简约长方形胶片作为 section navigation，与主页一致
check(readerChrome.includes("SiteHeader"), "reader chrome must delegate to the shared site header");
check(siteHeader.includes("CHAPTER_NEGATIVES"), "shared site header must declare 5 chapter negatives");
const chaptersSource = read("lib/chapters.ts");
for (const ch of ["/posts", "/resume", "/photography", "/products", "/weekly-records"]) {
  check(chaptersSource.includes(`"${ch}"`), `reader header must include negative link for ${ch}`);
}
check(siteHeader.includes("LanguageSwitch") && siteHeader.includes("SafelightSwitch"), "shared site header must include language and safelight switches");

// 4. 大卡片时间线流（Big cards timeline with cover, title, description, tags, time, reading time）
check(archiveList.includes("border-l") && archiveList.includes("border-border-plate"), "archive list must render single-column vertical timeline axis");
check(archiveList.includes("framer-motion") && archiveList.includes("whileInView"), "archive list must use framer-motion whileInView for subtle scroll animations");
check(archiveList.includes("post.cover_image"), "big cards must render cover photo");
check(archiveList.includes("post.summary"), "big cards must render post description/summary");
check(archiveList.includes("post.tags"), "big cards must render post tags");
check(archiveList.includes("post.date"), "big cards must render created time");
check(archiveList.includes("post.reading_time"), "big cards must render reading time");
check(!archiveList.includes("rounded-xl"), "red line: rounded-xl cards must not appear");
check(!archiveList.includes("backdrop-blur"), "red line: backdrop-blur must not appear");
check(!archiveList.includes("sticky"), "year anchors must be non-sticky");
check(archiveList.includes("tabular-nums"), "dates and metrics must use tabular-nums");
check(archiveList.includes("font-display") && (archiveList.includes("text-3xl") || archiveList.includes("text-4xl")), "year anchors must use giant serif numbers");
// 5. 交互：hover 标题转钴蓝 + translate-x-1，无阴影上浮
check(
  archiveList.includes("group-hover:text-cobalt") || archiveList.includes("group-hover:text-[#2148B8]"),
  "row hover must turn title to cobalt"
);
check(archiveList.includes("group-hover:translate-x-1"), "row hover must slightly indent title (translate-x-1)");
check(!archiveList.includes("hover:-translate-y"), "hover upward lift (hover:-translate-y) must be removed");
check(!archiveList.includes("hover:shadow"), "hover shadows must be removed");
check(!archiveList.includes("shadow-plate") && !archiveList.includes("shadow-elevated"), "plate/elevated shadows must be removed from archive list");

// 6. 过滤工具行：ALL / STUDY / ESSAY 纯文本切换 + 无框 mono input + 纯文本标签
check(archiveList.includes("ALL") && archiveList.includes("STUDY") && archiveList.includes("ESSAY"), "toolbar must provide ALL, STUDY, and ESSAY channel tabs");
check(archiveList.includes("border-b") && archiveList.includes("border-0"), "search input must have bottom hairline only");
check(!archiveList.includes("rounded-full"), "red line: rounded-full search and pill badges must be removed");
check(archiveList.includes("text-cobalt"), "selected tag must highlight in cobalt text");

// 7. Post 详情页排版
check(postDetailPage.includes("ReaderEyebrow"), "post detail page must mount ReaderEyebrow with 5 mini negatives");
check(
  (postDetailPage + postHeader).includes("post.summary"),
  "post detail page must render standfirst lede"
);

// 8. 图标墙检查：lucide 图标最多 1 处（当前 0 处）
const lucideImports = archiveList.match(/from\s+["']lucide-react["']/g) || [];
check(lucideImports.length <= 1, `archive-list must not have an icon wall (found ${lucideImports.length} lucide imports)`);
check(!archiveList.includes("Folder") && !archiveList.includes("Calendar") && !archiveList.includes("Clock"), "Folder/Calendar/Clock icon wall must be completely removed");

// 9. i18n 字典存活检查
for (const key of ["noResults", "yearArchive", "readingTime"]) {
  check(zh.includes(`${key}:`) && en.includes(`${key}:`), `live key '${key}' must exist in both zh and en dictionaries`);
}
check(archiveList.includes("t.posts.yearArchive"), "year count must consume the live yearArchive i18n key (no hardcoded locale ternaries)");
check(archiveList.includes("useReducedMotion"), "whileInView scroll-in rows must honor prefers-reduced-motion");
check(!postDetailPage.includes("italic"), "standfirst must not use italic (Noto Serif SC has no true italic; CJK gets faux-oblique)");

if (failures.length > 0) {
  console.error("posts-archive check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("posts-archive OK: Posts & Thoughts masthead, 5-mini-negatives header, big editorial cards (cover/title/summary/tags/date/reading-time) on a hairline timeline with reduced-motion-aware whileInView, comfortable post typography, zero rounded-xl/backdrop-blur/hover-shadow/icon-wall.");
