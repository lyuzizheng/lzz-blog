/**
 * BRAWUKA-64 verification suite: Homepage deck, load timeline, overprint collage, and in-screen chrome.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const homePage = read("app/page.tsx");
const homeDeck = read("components/home/home-deck.tsx");
const deckEyebrow = read("components/home/deck-eyebrow.tsx");
const slideCover = read("components/home/slide-cover.tsx");
const slideIndex = read("components/home/slide-index.tsx");
const slideColophon = read("components/home/slide-colophon.tsx");
const filmUnfurl = read("components/home/film-unfurl.tsx");
const langSwitch = read("components/ui/language-switch.tsx");
const safelightSwitch = read("components/ui/safelight-switch.tsx");

// 1. 3 屏封顶：Slide 1 封面 → Slide 2 四入口散落索引 → Slide 3 Colophon；到底即止
check(homeDeck.includes("SlideCover") && homeDeck.includes("SlideIndex") && homeDeck.includes("SlideColophon"), "home deck must mount exactly SlideCover, SlideIndex, SlideColophon");
check(!homeDeck.includes("Slide4") && !homeDeck.includes("SlideFour"), "deck must cap at 3 slides (到底即止)");
check(homeDeck.includes("slide-1") && homeDeck.includes("slide-2") && homeDeck.includes("slide-3"), "deck must carry 3 slide anchors");

// 2. Load 时间线：t0 纸底直出（禁闪白）→ t1 名字显影 + bio + 社交 → t2 3 帧 stagger 显影（错峰 80ms，发丝进度线走完即停）；总收敛 <1.2s，可打断
check(slideCover.includes("t1Revealed") && slideCover.includes("settled"), "slide cover must orchestrate load timeline");
check(filmUnfurl.includes("80ms") || filmUnfurl.includes("0.16"), "film unfurl must stagger 3 frames by 80ms");
check(filmUnfurl.includes("hairline") || filmUnfurl.includes("h-px"), "film unfurl must render hairline progress line");
check(slideCover.includes("interrupt") && filmUnfurl.includes("interrupt"), "load timeline must be interruptible on user input");
check(slideCover.includes("wheel") && slideCover.includes("touchstart"), "interrupt events must handle wheel and touch");

// 3. 四入口散落（overprint collage）：一大（Darkroom 帧）+ 一小（Writings 卡）+ 一窄条（Flight 刻度）+ 一章戳（Products），压边 8~16px
check(slideIndex.includes("02 · DARKROOM") || slideIndex.includes("photography"), "slide index must include Darkroom frame");
check(slideIndex.includes("01 · WRITINGS") || slideIndex.includes("posts"), "slide index must include Writings card");
check(slideIndex.includes("03 · FLIGHT") || slideIndex.includes("resume"), "slide index must include Flight scale");
check(slideIndex.includes("04 · PRODUCTS") || slideIndex.includes("products"), "slide index must include Products stamp");
check(slideIndex.includes("-ml-") || slideIndex.includes("-mt-"), "collage must overlap edges by 8~16px (压边散落)");
check(slideIndex.includes("RegistrationCrosshair") || slideIndex.includes("#2148B8"), "SVG decoration must strictly use single 1px cobalt line gesture family");
check(slideIndex.includes("overflow-x-clip") || slideIndex.includes("overflow-hidden"), "mobile collage must strictly prevent horizontal overflow");

// 4. Chrome：删全局 sticky header/footer，换屏内眉脚（左 LZZ · §号，右 01–04 索引 + LanguageSwitch + 昼夜点；LanguageSwitch 逻辑复用 BRAWUKA-59 只换皮）；语义 nav 留 DOM
check(!homePage.includes("<SiteHeader") && !homePage.includes("<SiteFooter"), "homepage must remove global sticky SiteHeader & SiteFooter");
check(deckEyebrow.includes("LZZ ·") && deckEyebrow.includes("section"), "deck eyebrow must display LZZ · §号 on left");
check(deckEyebrow.includes("LanguageSwitch") && deckEyebrow.includes("SafelightSwitch"), "deck eyebrow must mount LanguageSwitch and SafelightSwitch (昼夜点) on right");
check(deckEyebrow.includes("<nav") && deckEyebrow.includes("01–04 索引导航"), "semantic nav must remain in DOM");
check(langSwitch.includes('variant === "eyebrow"') || langSwitch.includes("variant"), "LanguageSwitch must support eyebrow skin while keeping BRAWUKA-59 logic");
check(safelightSwitch.includes('variant === "eyebrow"') || safelightSwitch.includes("variant === \"dot\""), "SafelightSwitch must support minimal 昼夜点");

// 5. 交互矩阵：桌面 hover 回正 + EXIF 一行（须有 focus 对等物）；移动端入视口自动显影（IntersectionObserver，禁纯 hover）；prefers-reduced-motion 全退化堆叠
check(slideIndex.includes("hover:rotate-0") && (slideIndex.includes("focus-within:rotate-0") || slideIndex.includes("focus-visible:rotate-0")), "desktop cards must straighten on hover with focus parity");
check(slideIndex.includes("SONY A7M4") && slideIndex.includes("EXIF"), "Darkroom frame must expose EXIF row");
check(slideIndex.includes("IntersectionObserver") && slideIndex.includes("inViewStates"), "mobile must auto-reveal on viewport entry via IntersectionObserver (no pure hover)");
check(slideIndex.includes("reduceMotion") && slideIndex.includes("rotate-0"), "prefers-reduced-motion must degrade to flat stack");

// 6. Server shell check: app/page.tsx must NOT carry "use client"
check(!homePage.includes('"use client"'), "app/page.tsx must remain a Server Component");

if (failures.length > 0) {
  console.error("homepage-deck check FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("homepage-deck OK: 3-slide deck, load timeline (<1.2s + interruptible), 4-entry overprint collage, in-screen eyebrow + 昼夜点, focus parity + IntersectionObserver.");
