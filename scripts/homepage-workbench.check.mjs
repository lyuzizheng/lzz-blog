/**
 * BRAWUKA-78 verification suite: single-screen no-scroll darkroom workbench,
 * film-stack scatter navigation, ambient background, and deck retirement.
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
const workbench = read("components/home/home-workbench.tsx");
const filmStack = read("components/home/film-stack.tsx");
const ambient = read("components/home/darkroom-ambient.tsx");
const globalsCss = read("app/globals.css");
const langSwitch = read("components/ui/language-switch.tsx");
const safelightSwitch = read("components/ui/safelight-switch.tsx");

// 1. 单屏无滚动：100dvh + overflow-hidden，无 Slide 2/3，无旧 deck 引用
check(homePage.includes("100dvh") && homePage.includes("overflow-hidden"), "homepage must be a single 100dvh no-scroll screen");
check(
  !homePage.includes("HomeDeck") && !homePage.includes("SlideCover") && !homePage.includes("SlideIndex") && !homePage.includes("SlideColophon"),
  "homepage must not reference the retired 3-slide deck components",
);
check(homePage.includes("HomeWorkbench"), "homepage must mount HomeWorkbench");
check(!homePage.includes('"use client"'), "app/page.tsx must remain a Server Component");

// 2. 语义 nav 留 DOM：四个目的路由对爬虫可达
for (const route of ["/posts", "/resume", "/photography", "/products"]) {
  check(homePage.includes(`"${route}"`), `sr-only crawling nav must include ${route}`);
}

// 3. 身份卡片：avatar 资产 + 名字 + 一句话 + 社交矩阵（lib/site.ts 真实外链）
check(workbench.includes("/avatar.jpg"), "identity card must render /avatar.jpg (moved into public/)");
check(exists("public/avatar.jpg"), "public/avatar.jpg must exist");
check(workbench.includes("SOCIAL_LINKS") && workbench.includes("t.home.heroSubtitle"), "identity card must render name, one-liner and social row");
check(workbench.includes("LanguageSwitch") || workbench.includes("DeckEyebrow"), "workbench must keep Q10-A in-screen chrome (LanguageSwitch + 昼夜点 via DeckEyebrow)");

// 4. 四胶片叠放 → 散落：4 路由、片齿打孔、telemetry 印记、spring 状态机
check((filmStack.match(/href: "\//g) || []).length === 4, "film stack must define exactly 4 destination films");
for (const route of ["/posts", "/resume", "/photography", "/products"]) {
  check(filmStack.includes(`href: "${route}"`), `film stack must route to ${route}`);
}
for (const tag of ["BLOGS", "CAREER", "PHOTOGRAPHY", "PROJECTS"]) {
  check(filmStack.includes(tag), `film stack must label film ${tag}`);
}
check(filmStack.includes("KODAK 400TX") && filmStack.includes("EXP 36") && filmStack.includes("▶ 01A"), "films must carry telemetry imprints (KODAK 400TX / EXP 36 / ▶ frame numbers)");
check(filmStack.includes("film-sprockets"), "films must render sprocket perforations");
check(filmStack.includes('type: "spring"') && filmStack.includes("stiffness"), "scatter must use spring physics");
check(filmStack.includes('e.key === "Escape"'), "Esc must regather the stack");
check(filmStack.includes("aria-expanded") && filmStack.includes("aria-label"), "stack overlay button must be screen-reader accessible");

// 5. 交互矩阵：hover/focus 显影 + idle 微摆 + reduced-motion 静态退化
check(globalsCss.includes("film-idle-sway") && globalsCss.includes("film-idle:hover"), "idle breathing sway (±2px / ±0.5°) with hover pause must exist");
check(globalsCss.includes(".film-latent") && globalsCss.includes("invert"), "films must develop (negative → positive inversion) on hover/focus");
check(filmStack.includes("useReducedMotion"), "film stack must honor prefers-reduced-motion");
check(filmStack.includes("focus-visible"), "films must be keyboard reachable with focus parity");

// 6. 背景环境动画：微尘 canvas + 显影液微光，低透明度，reduced-motion 降级
check(ambient.includes("canvas") && ambient.includes("useReducedMotion"), "ambient dust canvas must exist and degrade under reduced-motion");
check(globalsCss.includes("darkroom-glow"), "developer-liquid glow layer must exist");

// 7. 旧 deck 退役：BRAWUKA-64 三屏组件全部删除
for (const retired of [
  "components/home/home-deck.tsx",
  "components/home/slide-cover.tsx",
  "components/home/slide-index.tsx",
  "components/home/slide-colophon.tsx",
  "components/home/film-unfurl.tsx",
]) {
  check(!exists(retired), `retired deck component must be deleted: ${retired}`);
}

// 8. Chrome 组件契约保留（Q10-A 换皮不变逻辑）
check(langSwitch.includes('variant === "eyebrow"') || langSwitch.includes("variant"), "LanguageSwitch must support eyebrow skin");
check(safelightSwitch.includes('variant === "eyebrow"') || safelightSwitch.includes('variant === "dot"'), "SafelightSwitch must support minimal 昼夜点");

if (failures.length > 0) {
  console.error("homepage-workbench check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log(
  "homepage-workbench OK: single 100dvh no-scroll screen, identity card (avatar + socials), 4-film stack scatter navigation (spring + Esc + focus parity), ambient darkroom background, retired 3-slide deck.",
);
