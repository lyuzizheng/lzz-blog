/**
 * BRAWUKA-85 verification suite: /posts archive page redesign (The Archive Reading Room).
 *
 * Invariants enforced:
 * 1. Server shell: app/posts/page.tsx must NOT carry "use client".
 * 2. Client island: components/posts/archive-list.tsx must be "use client".
 * 3. Masthead: single-line serif title + mono telemetry; no icons, badges, or marketing subtitles.
 * 4. Index, not cards: flat rows separated by hairline; no rounded-xl cards, no static thumbnail cards.
 * 5. Year anchors: giant serif numbers, strictly non-sticky, zero backdrop-blur.
 * 6. Hover interaction: translate-x-1 + cobalt #2148B8; zero hover shadow or upward elevation.
 * 7. Mono toolbar: ALL / STUDY / ESSAY channel tabs with hairline indicator;
 *    borderless mono input (bottom hairline, no rounded-full);
 *    pure text tags with cobalt active state (no pill background).
 * 8. Red lines: zero rounded-xl, zero backdrop-blur, zero hover shadows, lucide icons ≤ 1.
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
const zh = read("lib/i18n/dictionaries/zh.ts");
const en = read("lib/i18n/dictionaries/en.ts");

// 1. Server Component & Client Island Boundary
check(!postsPage.includes('"use client"'), "app/posts/page.tsx must remain a Server Component");
check(archiveList.includes('"use client"'), "components/posts/archive-list.tsx must be a client island");
check(postsPage.includes("<ArchiveList"), "app/posts/page.tsx must mount ArchiveList");

// 2. 刊头（Masthead）：一行收束 —— 衬线大字 + mono telemetry，无图标、徽章、营销副标题
check(archiveList.includes("font-display") && archiveList.includes("Blogs / 文章"), "archive list must render serif masthead title");
check(archiveList.includes("DISPATCHES") && archiveList.includes("font-telemetry"), "archive list must render mono telemetry dispatches count and year range");
check(!postsPage.includes("思想工坊与出版物物料库"), "marketing title '思想工坊与出版物物料库' must be removed");
check(!postsPage.includes("DOCUMENT ARCHIVE · VOL."), "marketing badge 'DOCUMENT ARCHIVE · VOL.' must be removed");
check(!postsPage.includes("BookOpen") && !archiveList.includes("BookOpen"), "BookOpen icon must be removed from posts page and archive list");
check(!archiveList.includes("t.posts.subtitle"), "marketing subtitle must not be rendered in the masthead");

// 3. 目录式列表（Index, not cards）：平铺行 + 1px hairline 分隔 + 年份非 sticky、无 backdrop-blur
check(!archiveList.includes("rounded-xl"), "red line: rounded-xl cards must not appear");
check(!archiveList.includes("backdrop-blur"), "red line: backdrop-blur must not appear");
check(!archiveList.includes("sticky"), "year anchors must be non-sticky");
check(archiveList.includes("tabular-nums"), "dates and metrics must use tabular-nums");
check(archiveList.includes("divide-y") || archiveList.includes("border-b"), "rows must be separated by hairline rules");
check(archiveList.includes("font-display") && (archiveList.includes("text-4xl") || archiveList.includes("text-5xl")), "year anchors must use giant serif numbers");

// 4. 交互：hover 标题转钴蓝 + translate-x-1，无阴影上浮
check(archiveList.includes("group-hover:text-cobalt") || archiveList.includes("group-hover:text-[#2148B8]"), "row hover must turn title to cobalt");
check(archiveList.includes("group-hover:translate-x-1"), "row hover must slightly indent title (translate-x-1)");
check(!archiveList.includes("hover:-translate-y"), "hover upward lift (hover:-translate-y) must be removed");
check(!archiveList.includes("hover:shadow"), "hover shadows must be removed");
check(!archiveList.includes("shadow-plate") && !archiveList.includes("shadow-elevated"), "plate/elevated shadows must be removed from archive list");

// 5. 过滤工具行：ALL / STUDY / ESSAY 纯文本切换 + 无框 mono input + 纯文本标签
check(archiveList.includes("ALL") && archiveList.includes("STUDY") && archiveList.includes("ESSAY"), "toolbar must provide ALL, STUDY, and ESSAY channel tabs");
check(archiveList.includes("border-b") && archiveList.includes("border-0"), "search input must have bottom hairline only");
check(!archiveList.includes("rounded-full"), "red line: rounded-full search and pill badges must be removed");
check(archiveList.includes("text-cobalt"), "selected tag must highlight in cobalt text");

// 6. 图标墙检查：lucide 图标最多 1 处（当前 0 处）
const lucideImports = archiveList.match(/from\s+["']lucide-react["']/g) || [];
check(lucideImports.length <= 1, `archive-list must not have an icon wall (found ${lucideImports.length} lucide imports)`);
check(!archiveList.includes("Folder") && !archiveList.includes("Calendar") && !archiveList.includes("Clock"), "Folder/Calendar/Clock icon wall must be completely removed");

// 7. i18n 字典同步
check(zh.includes('title: "文章"'), "zh dictionary must have updated title");
check(en.includes('title: "Blogs"'), "en dictionary must have updated title");

if (failures.length > 0) {
  console.error("posts-archive check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("posts-archive OK: editorial directory index, serif masthead + mono telemetry, non-sticky giant year anchors, hairline rows with cobalt hover, frameless mono toolbar, zero cards/shadows/backdrop-blur/icon-wall.");
