/**
 * BRAWUKA-93 gate: validates the Career Deck & Flight Path contracts
 * (zero-dependency, plain node — no build required).
 *
 * Run: `node scripts/flight-path.check.mjs`
 * Checks:
 *  1. Data layer: N10 ledger-stamp, N09 pipeline-flow, verified battle metrics in Wise & TikTok.
 *  2. Horizontal reel retirement: flight-path-timeline.tsx no longer has GSAP pin/horizontal scrub.
 *  3. Visual alignment with homepage & posts:
 *     - app/resume/page.tsx mounts ReaderEyebrow (unified header with /posts)
 *     - app/resume/page.tsx uses max-w-2xl container (matching homepage center column)
 *     - app/resume/page.tsx keeps publication-grade ResumePrint for print mode
 *  4. Career Deck structure:
 *     - Integrated Masthead: verbatim core statement, action links (/resume.pdf, mailto, /products)
 *     - Chapter 01 (Wise): 30,000+ cases/mo, 98%+ accuracy, £80,000/mo savings, AI Workflow Platform
 *     - Chapter 02 (Exploration): Bondee Vector+Kafka pipeline, MariBank distributed consistency
 *     - Chapter 03 (ByteDance): 20+ Go microservices, 7×24 oncall, multi-DC sync, automated diagnostics
 *  5. Zero CLS: tabular-nums for numeric indicators.
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

// 3. Visual alignment with homepage & posts
const resumePage = read("app/resume/page.tsx");
check(resumePage.includes("ReaderEyebrow"), "app/resume/page.tsx must mount ReaderEyebrow (unified header with /posts)");
check(resumePage.includes("max-w-2xl"), "app/resume/page.tsx must use max-w-2xl container (matching homepage)");
check(resumePage.includes("CareerDeck"), "app/resume/page.tsx must mount CareerDeck");
check(resumePage.includes("ResumePrint"), "app/resume/page.tsx must keep publication-grade ResumePrint for print mode");

// 4. Career Deck content & structure
const deck = read("components/motion/career-deck/career-deck.tsx");

// Masthead & Statement
check(
  deck.includes("values engineering ethic and believes good software products must do good to societies"),
  "CareerDeck must contain the verbatim core statement",
);
check(deck.includes("/resume.pdf"), "CareerDeck masthead must link to /resume.pdf");
check(deck.includes("mailto:lvzizhengde@gmail.com"), "CareerDeck masthead must link to mailto:lvzizhengde@gmail.com");
check(deck.includes("/products"), "CareerDeck masthead must link to /products");

// Chapter 01 (Wise)
check(deck.includes("30,000"), "CareerDeck must display 30,000+ monthly cases");
check(deck.includes("98"), "CareerDeck must display 98%+ matching accuracy");
check(deck.includes("£80,000"), "CareerDeck must display £80,000 monthly savings");
check(deck.includes("AI Workflow Platform"), "CareerDeck must highlight the AI Workflow Platform");

// Chapter 02 (Exploration)
check(deck.includes("Bondee") && deck.includes("MariBank"), "CareerDeck must feature Bondee and MariBank");
check(deck.includes("Vector") && deck.includes("Kafka"), "CareerDeck must detail Vector + Kafka pipeline");
check(deck.includes("分布式") || deck.includes("Consistency"), "CareerDeck must detail banking distributed consistency");

// Chapter 03 (ByteDance)
check(deck.includes("20+"), "CareerDeck must display 20+ Go microservices");
check(deck.includes("7×24") || deck.includes("7x24"), "CareerDeck must feature 7x24 oncall stability");
check(deck.includes("Multi-datacenter") || deck.includes("Multi-DC"), "CareerDeck must feature multi-datacenter sync");
check(deck.includes("排障") || deck.includes("Troubleshooting"), "CareerDeck must feature automated message loss troubleshooting");

// 5. Zero CLS tabular-nums
check(deck.includes("tabular-nums"), "CareerDeck must use tabular-nums for numeric indicators");

if (failures.length > 0) {
  console.error(`CAREER DECK / FLIGHT PATH CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `career deck / flight path OK: horizontal reel retired, unified ReaderEyebrow header, max-w-2xl homepage margins, verified battle metrics, zero-CLS tabular-nums.`,
);
