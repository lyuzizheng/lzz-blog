/**
 * BRAWUKA-85 verification suite: /posts archive page redesign (The Archive Reading Room).
 *
 * Invariants enforced:
 * 1. Server shell: app/posts/page.tsx must NOT carry "use client".
 * 2. Client island: components/posts/archive-list.tsx must be "use client".
 * 3. Masthead: "Posts & Thoughts" serif title + mono telemetry; zero marketing subtitles or badges.
 * 4. Header: 4 mini rectangular negatives as section navigation matching homepage workbench.
 * 5. Single column timeline: chronological list with hairline axis and framer-motion scroll-in.
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
const archiveList = read("components/posts/archive-list.tsx");
const readerChrome = read("components/posts/reader-chrome.tsx");
const postDetailPage = read("app/posts/[...slug]/page.tsx");
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

// 3. Header 契约：4 mini 简约长方形胶片作为 section navigation，与主页一致
check(readerChrome.includes("CHAPTER_NEGATIVES"), "reader header must declare 4 chapter negatives");
for (const ch of ["/posts", "/resume", "/photography", "/products"]) {
  check(readerChrome.includes(`"${ch}"`), `reader header must include negative link for ${ch}`);
}
check(readerChrome.includes("LanguageSwitch") && readerChrome.includes("SafelightSwitch"), "reader header must include language and safelight switches");

// 4. 单列时间线列表（Single column timeline with scroll animations）
check(archiveList.includes("border-l") && archiveList.includes("border-border-plate"), "archive list must render single-column vertical timeline axis");
check(archiveList.includes("framer-motion") && archiveList.includes("whileInView"), "archive list must use framer-motion whileInView for subtle scroll animations");
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
check(postDetailPage.includes("ReaderEyebrow"), "post detail page must mount ReaderEyebrow with 4 mini negatives");
check(postDetailPage.includes("post.summary"), "post detail page must render standfirst lede");

// 8. 图标墙检查：lucide 图标最多 1 处（当前 0 处）
const lucideImports = archiveList.match(/from\s+["']lucide-react["']/g) || [];
check(lucideImports.length <= 1, `archive-list must not have an icon wall (found ${lucideImports.length} lucide imports)`);
check(!archiveList.includes("Folder") && !archiveList.includes("Calendar") && !archiveList.includes("Clock"), "Folder/Calendar/Clock icon wall must be completely removed");

// 9. i18n 字典存活检查
for (const key of ["noResults", "yearArchive", "readingTime"]) {
  check(zh.includes(`${key}:`) && en.includes(`${key}:`), `live key '${key}' must exist in both zh and en dictionaries`);
}

if (failures.length > 0) {
  console.error("posts-archive check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("posts-archive OK: Posts & Thoughts masthead, 4-mini-negatives header, single-column timeline with framer-motion whileInView scroll animations, comfortable post typography, zero cards/shadows/backdrop-blur/icon-wall.");
