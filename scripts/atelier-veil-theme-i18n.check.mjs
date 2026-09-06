/**
 * BRAWUKA-92 verification suite: Developing Exposure loading screen day mode and i18n support.
 *
 * Verifies:
 * 1. app/layout.tsx:
 *    - Head script preloading theme and locale before body paint (zero FOUC / zero darkroom flash).
 *    - Inline #atelier-veil has complete Day Mode (Daylight Atelier) rules matching DESIGN.md:
 *      #F5F1E8 substrate, #EEE6D3 surface, Cobalt Blue #2148B8 dot/spinner, #857C68 muted label.
 *    - Inline #atelier-veil renders bilingual text (.veil-text-en and .veil-text-zh) and .veil-label-dot.
 *    - Inline CSS rules toggle .veil-text-en / .veil-text-zh via [lang^="zh"] and [data-locale="zh"].
 * 2. app/loading.tsx:
 *    - Next.js Suspense loading fallback renders bilingual text and accessible screen reader text.
 *    - Uses theme-driven Tailwind tokens (bg-substrate, text-primary, bg-surface, border-border-plate, bg-ink-dominant).
 * 3. lib/i18n:
 *    - types.ts, en.ts, and zh.ts expose common.developingExposure.
 *    - context.tsx synchronizes data-locale on document.documentElement.
 * 4. app/globals.css:
 *    - Exposes global .veil-text-en and .veil-text-zh utility rules.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const layout = read("app/layout.tsx");
const loading = read("app/loading.tsx");
const globalsCss = read("app/globals.css");
const i18nTypes = read("lib/i18n/types.ts");
const enDict = read("lib/i18n/dictionaries/en.ts");
const zhDict = read("lib/i18n/dictionaries/zh.ts");
const i18nContext = read("lib/i18n/context.tsx");

// 1. Pre-hydration script in <head>
check(layout.includes("<head>") && layout.includes("</head>"), "app/layout.tsx must declare <head>");
check(layout.includes("atelier-init-theme-locale"), "layout must declare pre-hydration init script");
check(layout.includes("localStorage.getItem('theme')"), "init script must check saved theme");
check(layout.includes("document.documentElement.setAttribute('data-theme', t)"), "init script must set data-theme");
check(layout.includes("localStorage.getItem('lzz_locale')"), "init script must check saved locale");
check(layout.includes("document.documentElement.setAttribute('data-locale', 'zh')"), "init script must set data-locale for zh");

// 2. Day Mode styling for #atelier-veil
check(layout.includes('[data-theme="day"] #atelier-veil'), "layout must define [data-theme='day'] #atelier-veil rules");
check(layout.includes("#F5F1E8"), "day mode veil must use #F5F1E8 substrate background");
check(layout.includes("#EEE6D3"), "day mode veil frame must use #EEE6D3 surface background");
check(layout.includes("#2148B8"), "day mode veil spinner and dot must use Cobalt Blue #2148B8");
check(layout.includes("#857C68"), "day mode veil label must use daylight muted color #857C68");

// 3. Bilingual support in #atelier-veil
check(layout.includes("veil-text-en") && layout.includes("veil-text-zh"), "veil must render both en and zh text spans");
check(layout.includes("DEVELOPING EXPOSURE // 35MM"), "veil must include DEVELOPING EXPOSURE // 35MM");
check(layout.includes("胶片显影中 // 35MM"), "veil must include 胶片显影中 // 35MM");
check(layout.includes("veil-label-dot"), "veil must render pulsing label dot");
check(layout.includes('[lang^="zh"] .veil-text-zh') || layout.includes('[data-locale="zh"] .veil-text-zh'), "veil must toggle zh text when lang or data-locale is zh");

// 4. Loading fallback (app/loading.tsx)
check(loading.includes("veil-text-en") && loading.includes("veil-text-zh"), "loading.tsx must render both en and zh spans");
check(loading.includes("DEVELOPING EXPOSURE // 35MM"), "loading.tsx must render DEVELOPING EXPOSURE // 35MM");
check(loading.includes("胶片显影中 // 35MM"), "loading.tsx must render 胶片显影中 // 35MM");
check(loading.includes("sr-only") && loading.includes("暗房显影加载中"), "loading.tsx must provide accessible screen reader announcement in zh");
check(loading.includes("bg-substrate") && loading.includes("text-primary"), "loading.tsx must use substrate and primary tokens");

// 5. i18n dictionaries and context
check(i18nTypes.includes("developingExposure: string;"), "i18n types must declare common.developingExposure");
check(enDict.includes('developingExposure: "DEVELOPING EXPOSURE // 35MM"'), "en dictionary must declare developingExposure");
check(zhDict.includes('developingExposure: "胶片显影中 // 35MM"'), "zh dictionary must declare developingExposure");
check(i18nContext.includes("document.documentElement.setAttribute(\"data-locale\", stored)"), "i18n context must sync data-locale on mount");
check(i18nContext.includes("document.documentElement.setAttribute(\"data-locale\", newLocale)"), "i18n context must sync data-locale on setLocale");

// 6. Global CSS rules
check(globalsCss.includes(".veil-text-zh") && globalsCss.includes(".veil-text-en"), "globals.css must define .veil-text-zh and .veil-text-en utility classes");

if (failures.length > 0) {
  console.error("atelier-veil-theme-i18n check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("atelier-veil-theme-i18n OK: Day mode (Daylight Atelier), bilingual i18n (EN/ZH), 0ms pre-hydration preload, and a11y passed.");
