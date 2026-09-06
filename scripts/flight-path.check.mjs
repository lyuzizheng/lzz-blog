/**
 * BRAWUKA-93 gate: validates the Career Deck & Flight Path contracts
 * (zero-dependency, plain node — no build required).
 *
 * Run: `node scripts/flight-path.check.mjs`
 * Checks:
 *  1. Data layer: N10 ledger-stamp, N09 pipeline-flow, verified battle metrics in Wise & TikTok.
 *  2. Horizontal reel retirement: flight-path-timeline.tsx no longer has GSAP pin/horizontal scrub.
 *  3. Career Deck container: 100dvh snap-scroll deck with wheel debounce, touch, and keyboard nav.
 *  4. Thematic stage canvases: Hero, Wise, Exploration, and ByteDance SVG canvases exist.
 *  5. Stage content:
 *     - Act 0 (Hero): Verbatim mission statement, action hub (/resume.pdf, mailto, /products), chevron.
 *     - Act 1 (Wise): 30,000+ cases/mo, 98%+ accuracy, £80,000/mo savings, AI Workflow Platform.
 *     - Act 2 (Exploration): Bondee Vector+Kafka pipeline, MariBank distributed consistency & anti-replay.
 *     - Act 3 (ByteDance): 20+ Go microservices, 7×24 oncall, multi-DC sync, automated diagnostics.
 *  6. Zero CLS: tabular-nums for numeric counters.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

// 1. Data layer checks
const dossier = read("lib/career-dossier.ts");
const resume = read("lib/resume.ts");

check(
  /id:\s*"N10"[\s\S]*?motionSlot:\s*"act3-ledger-stamp"/.test(dossier),
  'N10 motionSlot must be "act3-ledger-stamp" (bank ledger stamp, not pipeline flow)',
);
const n09 = dossier.match(/id:\s*"N09"[\s\S]*?motionSlot:\s*"([^"]+)"/);
check(n09?.[1] === "act3-pipeline-flow", `N09 must keep act3-pipeline-flow (got ${n09?.[1]})`);

// Verified battle metrics in dossier
check(dossier.includes("30,000+ cases / month"), "Wise N12 must contain 30,000+ cases/month automation");
check(dossier.includes("80,000 GBP / month"), "Wise N12 must contain 80,000 GBP/month savings");
check(dossier.includes("20+ Go microservices"), "TikTok N08 must contain 20+ Go microservices");
check(dossier.includes("Vector + Kafka"), "Bondee N09 must contain Vector + Kafka pipeline");

// 2. Horizontal reel retirement
const timeline = read("components/motion/flight-path/flight-path-timeline.tsx");
check(!timeline.includes("pin: true"), "flight-path-timeline must NOT contain GSAP horizontal pin");
check(!timeline.includes("scrollWidth - viewport.clientWidth"), "horizontal scroll amount calculation must be retired");
check(timeline.includes("CareerDeck"), "flight-path-timeline must delegate to CareerDeck");

// 3. Career Deck core mechanics
const deck = read("components/motion/career-deck/career-deck.tsx");
const deckTypes = read("components/motion/career-deck/deck-types.ts");

check(deck.includes("calc(100dvh-3.5rem)"), "CareerDeck must fit within 100dvh under SiteHeader");
check(deck.includes("onWheel"), "CareerDeck must handle mouse wheel gestures");
check(deck.includes("onTouchStart") && deck.includes("onTouchEnd"), "CareerDeck must handle touch gestures");

// Keyboard nav contract
for (const key of ["ArrowDown", "ArrowUp", "Home", "End"]) {
  check(deck.includes(`"${key}"`), `CareerDeck must handle ${key}`);
}
check(deck.includes('"j"') && deck.includes('"k"'), "CareerDeck must handle j (next) / k (prev)");
check(deck.includes('"0"') && deck.includes('"3"'), "CareerDeck must handle 0-3 direct stage jumping");

// 4. Thematic stage canvases
const heroCanvas = read("components/motion/career-deck/canvases/hero-canvas.tsx");
const wiseCanvas = read("components/motion/career-deck/canvases/wise-canvas.tsx");
const explorationCanvas = read("components/motion/career-deck/canvases/exploration-canvas.tsx");
const bytedanceCanvas = read("components/motion/career-deck/canvases/bytedance-canvas.tsx");

check(heroCanvas.includes("viewBox"), "HeroCanvas must render responsive vector SVG");
check(heroCanvas.includes("01°20'N 103°49'E") || heroCanvas.includes("01°20&apos;N 103°49&apos;E"), "HeroCanvas must carry coordinates telemetry");
check(wiseCanvas.includes("DECISION") || wiseCanvas.includes("Defect"), "WiseCanvas must carry decision flow topology");
check(explorationCanvas.includes("K8S") || explorationCanvas.includes("Kafka"), "ExplorationCanvas must carry K8s/Kafka topology");
check(bytedanceCanvas.includes("MULTIDATACENTER") || bytedanceCanvas.includes("SYNC") || bytedanceCanvas.includes("Datacenter"), "BytedanceCanvas must carry multi-datacenter topology");

// 5. Stage content contracts
const stageHero = read("components/motion/career-deck/stage-hero.tsx");
const stageWise = read("components/motion/career-deck/stage-wise.tsx");
const stageExploration = read("components/motion/career-deck/stage-exploration.tsx");
const stageBytedance = read("components/motion/career-deck/stage-bytedance.tsx");

// Act 0 Hero
check(
  stageHero.includes("values engineering ethic and believes good software products must do good to societies"),
  "StageHero must contain the verbatim core statement",
);
check(stageHero.includes("/resume.pdf"), "StageHero action hub must link to /resume.pdf");
check(stageHero.includes("mailto:lvzizhengde@gmail.com"), "StageHero action hub must link to mailto:lvzizhengde@gmail.com");
check(stageHero.includes("/products"), "StageHero action hub must link to /products");
check(stageHero.includes("ChevronDown"), "StageHero must render downward exploration chevron");

// Act 1 Wise
check(stageWise.includes("30,000"), "StageWise must display 30,000+ monthly cases");
check(stageWise.includes("98"), "StageWise must display 98%+ matching accuracy");
check(stageWise.includes("£80,000"), "StageWise must display £80,000 monthly savings");
check(stageWise.includes("AI Workflow Platform"), "StageWise must highlight the AI Workflow Platform");

// Act 2 Exploration
check(stageExploration.includes("Bondee") && stageExploration.includes("MariBank"), "StageExploration must feature Bondee and MariBank");
check(stageExploration.includes("Vector") && stageExploration.includes("Kafka"), "StageExploration must detail Vector + Kafka pipeline");
check(stageExploration.includes("分布式") || stageExploration.includes("Consistency"), "StageExploration must detail banking distributed consistency");

// Act 3 ByteDance
check(stageBytedance.includes("20+"), "StageBytedance must display 20+ Go microservices");
check(stageBytedance.includes("7×24") || stageBytedance.includes("7x24"), "StageBytedance must feature 7x24 oncall stability");
check(stageBytedance.includes("Multi-datacenter") || stageBytedance.includes("Multi-DC"), "StageBytedance must feature multi-datacenter sync");
check(stageBytedance.includes("排障") || stageBytedance.includes("Troubleshooting"), "StageBytedance must feature automated message loss troubleshooting");

// 6. Zero CLS tabular-nums
check(stageWise.includes("tabular-nums"), "StageWise must use tabular-nums for numeric indicators");

// 7. Resume page wiring
const resumePage = read("app/resume/page.tsx");
check(resumePage.includes("CareerDeck"), "app/resume/page.tsx must mount CareerDeck");
check(resumePage.includes("SiteHeader"), "app/resume/page.tsx must mount unified SiteHeader");
check(resumePage.includes("ResumePrint"), "app/resume/page.tsx must keep publication-grade ResumePrint for print mode");

if (failures.length > 0) {
  console.error(`CAREER DECK / FLIGHT PATH CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `career deck / flight path OK: horizontal reel retired, 4-stage vertical snap deck, 4 thematic SVG canvases, verified battle metrics, zero-CLS tabular-nums.`,
);
