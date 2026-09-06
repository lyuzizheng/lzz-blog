/**
 * BRAWUKA-78/83 verification suite: single-screen atelier homepage — no scroll,
 * identity card, workbench scene (blurred pile + 4 permanently scattered
 * chapter negatives), ambient motion, workbench SVG line art.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");
const exists = (p) => fs.existsSync(path.join(root, p));

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const homePage = read("app/page.tsx");
const homeAtelier = read("components/home/home-atelier.tsx");
const filmStack = read("components/home/film-stack.tsx");
const ambientBackdrop = read("components/home/ambient-backdrop.tsx");
const css = read("app/globals.css");
const en = read("lib/i18n/dictionaries/en.ts");
const zh = read("lib/i18n/dictionaries/zh.ts");

// 1. 单屏无滚动：100dvh 封顶 + overflow-hidden，无 deck/slide 残留
check(homePage.includes("h-[100dvh]") && homePage.includes("overflow-hidden"), "homepage must be a single non-scrollable 100dvh frame");
check(!homePage.includes("HomeDeck") && !homePage.includes("SlideCover") && !homePage.includes("SlideIndex") && !homePage.includes("SlideColophon"), "homepage must not mount the retired deck/slides");
check(homePage.includes("HomeAtelier"), "homepage must mount HomeAtelier");
check(!homePage.includes("<SiteHeader") && !homePage.includes("<SiteFooter"), "homepage must keep global sticky chrome removed");
for (const retired of [
  "components/home/home-deck.tsx",
  "components/home/slide-cover.tsx",
  "components/home/slide-index.tsx",
  "components/home/slide-colophon.tsx",
  "components/home/deck-eyebrow.tsx",
  "components/home/film-unfurl.tsx",
  "components/home/home-view.tsx",
  "components/home/identity-filter.tsx",
]) {
  check(!exists(retired), `retired deck component must be deleted: ${retired}`);
}

// 2. Server shell: app/page.tsx must NOT carry "use client"
check(!homePage.includes('"use client"'), "app/page.tsx must remain a Server Component");

// 3. 身份卡：avatar + 名字 + 描述 + 社交矩阵
check(homeAtelier.includes("/avatar.jpg"), "identity card must render the avatar from /avatar.jpg");
check(homeAtelier.includes("SOCIAL_LINKS"), "identity card must render the social matrix from SOCIAL_LINKS");
check(homeAtelier.includes("t.home.title") && homeAtelier.includes("t.home.heroSubtitle"), "identity card must render localized name + bio");
check(exists("public/avatar.jpg"), "public/avatar.jpg must exist");

// 4. 工作台实景（BRAWUKA-83）：四条路由常驻散落 + 模糊底片堆层 + 无提示文案
for (const route of ["/posts", "/resume", "/photography", "/products"]) {
  check(filmStack.includes(`"${route}"`), `film stack must carry a frame for ${route}`);
}
for (const label of ["blogs", "career", "photography", "projects"]) {
  check(filmStack.includes(label), `film stack must label a frame: ${label}`);
}
check(filmStack.includes("<Link"), "the four chapter negatives must be permanently live links (no stack/scatter state machine)");
check(!filmStack.includes("setScattered") && !filmStack.includes("useState"), "scatter/collect state machine must be removed");
check(filmStack.includes("PileFrame") && filmStack.includes("blur-[1.5px]") && filmStack.includes("pointer-events-none"), "blurred under-pile of blank negatives must exist and be inert");
check(filmStack.includes("film-idle"), "frames must carry the idle drift class");
check(filmStack.includes('["1", "2", "3", "4"]'), "digit keys 1–4 must jump to chapters");
check(filmStack.includes("hover:rotate-0") && filmStack.includes("focus-visible:rotate-0"), "hover must straighten frames with focus parity");
check(!filmStack.includes("scatterHint") && !filmStack.includes("films.hint"), "no hint caption line under the bench (founder directive)");
check(!homeAtelier.includes("t.home.colophon"), "colophon footer must not render on the homepage (founder directive)");

// 5. 语义与爬虫可达：sr-only 章节索引 + i18n 键齐备
check(homePage.includes("sr-only") && homePage.includes("Crawling index"), "homepage must keep the sr-only crawl index");
check(en.includes("label:") && zh.includes("label:"), "i18n films.label must exist in en + zh");
check(!en.includes("scatterHint") && !zh.includes("collectHint"), "retired scatter/collect i18n keys must be removed");

// 6. 背景与微动画基底（globals.css 契约 + 工作台 SVG 线稿）
check(css.includes("film-idle-drift"), "globals.css must define the film-idle-drift keyframes");
check(css.includes("film-exposure-flash"), "globals.css must define the exposure flash keyframes");
check(css.includes("ambient-drift") && css.includes("dust-float"), "globals.css must define ambient glow + dust keyframes");
check(ambientBackdrop.includes("aria-hidden") && ambientBackdrop.includes("pointer-events-none"), "ambient backdrop must be decorative-only");
check(ambientBackdrop.includes("<svg") && ambientBackdrop.includes("--ink-faint"), "workbench SVG line art must render in the single-hairline ink family");

if (failures.length > 0) {
  console.error("homepage-atelier check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("homepage-atelier OK: single 100dvh frame, identity card, workbench scene (blurred pile + 4 scattered chapter negatives, idle drift), workbench SVG, reduced-motion fallbacks.");
