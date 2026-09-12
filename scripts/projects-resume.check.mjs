/**
 * BRAWUKA-39 gate: validates the Projects dataset + dual-mode Resume contracts.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const products = read("lib/products.ts");
const resume = read("lib/resume.ts");
const dossier = read("components/motion/resume/resume-dossier.tsx");
const printSheet = read("components/motion/resume/resume-print.tsx");
const printButton = read("components/motion/resume/print-button.tsx");
const css = read("app/globals.css");
const home = read("app/page.tsx");
const resumePage = read("app/resume/page.tsx");

// 1. Products dataset: the 3 named products, no fabricated numbers
for (const id of ["cancan", "coffeemode", "our-village"]) {
  check(products.includes(`"${id}"`), `PRODUCTS must include "${id}"`);
}
for (const field of ["codename", "taglineZh", "taglineEn", "statusCode", "link", "coverSvg", "techSignature"]) {
  check(products.includes(field), `ProductItem must carry ${field}`);
}
for (const status of ["in_development", "in_development_site_live", "live"]) {
  check(products.includes(`"${status}"`), `status "${status}" must exist`);
}

// 2. Interactive resume: 4 capability dimensions, collapsible, owner-pending marked
for (const dim of ["platform", "frontend", "pipeline", "effectiveness"]) {
  check(resume.includes(`"${dim}"`), `resume must include dimension "${dim}"`);
}
for (const title of ["架构底座", "复杂前端", "算法管道", "工程效能"]) {
  check(resume.includes(title), `resume must include dimension title "${title}"`);
}
check(dossier.includes("CAPABILITY_DIMENSIONS"), "dossier must render from CAPABILITY_DIMENSIONS");
check(dossier.includes("aria-expanded"), "dossier toggles must expose aria-expanded");
check(dossier.includes("gridTemplateRows") || dossier.includes("dossierDrawer"), "dossier drawer must animate via the grid-rows transition (or dossierDrawer spring preset)");
check(dossier.includes("NEEDS-OWNER"), "tbd bullets must be marked NEEDS-OWNER");
check(printSheet.includes('status === "verified"') || printSheet.includes("verified"), "print sheet must filter to verified facts only");

// 3. Print mode: A4 page, avoid breaks, pure print sheet, one-click button
check(css.includes("@media print"), "globals.css must define @media print");
check(css.includes("@page") && css.includes("A4"), "print must target A4 @page");
check(/page-break-inside:\s*avoid/.test(css), "print must avoid breaks inside blocks");
check(printSheet.includes("print-only"), "print sheet must be print-only");
check(dossier.includes("no-print"), "interactive dossier must hide in print");
check(printButton.includes("window.print()"), "print button must call window.print()");
check(resumePage.includes("PrintResumeButton") && resumePage.includes("ResumePrint") && resumePage.includes("ResumeDossier"), "resume page must mount all three dual-mode parts");

// 4. Homepage film-strip wiring (BRAWUKA-57: personal page, not a landing page)
check(!home.includes("SpotlightCard") && !home.includes("Pillars"), "homepage must not render pillar card walls");
check(home.includes("HomeAtelier"), "homepage must render the HomeAtelier single-screen film index (BRAWUKA-78)");
check(home.includes("/posts"), "homepage must link onward to /posts");
check(home.includes("/photography"), "homepage must link onward to /photography");
check(home.includes("/resume"), "homepage must link onward to /resume");

if (failures.length > 0) {
  console.error("projects-resume check FAILED:");
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  "projects-resume OK: 3-product dataset, 4-dimension interactive dossier, A4 print sheet, homepage + resume wiring.",
);
