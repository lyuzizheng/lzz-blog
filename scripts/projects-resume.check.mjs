/**
 * BRAWUKA-39 gate: validates the Projects Bento Grid + dual-mode Resume contracts.
 *
 * Source-text gate (same convention as darkroom.check.mjs): pins the
 * acceptance criteria — 4 radar projects, tilt/spotlight physics, stars +
 * status badges, stack + Demo/PR links, responsive bento spans, interactive
 * capability dossier, print-only A4 sheet, @media print hygiene — without
 * spinning up a browser.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const projects = read("lib/projects.ts");
const resume = read("lib/resume.ts");
const tilt = read("components/motion/projects/tilt-card.tsx");
const bento = read("components/motion/projects/projects-bento.tsx");
const dossier = read("components/motion/resume/resume-dossier.tsx");
const printSheet = read("components/motion/resume/resume-print.tsx");
const printButton = read("components/motion/resume/print-button.tsx");
const css = read("app/globals.css");
const home = read("app/page.tsx");
const resumePage = read("app/resume/page.tsx");

// 1. Radar dataset: the 4 named projects, no fabricated numbers
for (const id of ["cancan", "coffeemode", "our-village", "future-lab"]) {
  check(projects.includes(`"${id}"`), `PROJECTS must include "${id}"`);
}
for (const field of ["codename", "frame", "tagline", "status", "stack", "links", "githubRepo", "span"]) {
  check(projects.includes(field), `ProjectEntry must carry ${field}`);
}
check(projects.includes("incubating"), "Future Lab card must carry incubating items");
check(bento.includes("PROJECTS"), "bento must render from PROJECTS");

// 2. Card physics (BRAWUKA-61 Q9⑥: spotlight cursor layer deleted per DESIGN_V2 §6 —
//    cards use a ruled archive block; tilt keeps reduced-motion + touch fallback)
check(/rotateX/.test(tilt) && /rotateY/.test(tilt), "tilt card must drive rotateX/rotateY parallax");
check(tilt.includes("prefers-reduced-motion"), "tilt must honor prefers-reduced-motion");
check(tilt.includes("pointer: coarse"), "tilt must degrade on touch devices");
check(tilt.includes("transformPerspective"), "tilt must use 3D perspective");
check(!bento.includes("SpotlightCard"), "cards must NOT mount the deleted spotlight cursor layer");
check(bento.includes("border-t-2 border-border-strong"), "cards must use the ruled archive block");
check(bento.includes("TiltCard"), "cards must mount inside TiltCard");

// 3. Live badges: stars fetch with CLS-safe fixed width + graceful fallback
check(bento.includes("api.github.com"), "stars badge must fetch live from api.github.com");
check(bento.includes("min-w-"), "stars badge must reserve fixed width (Zero CLS)");
check(bento.includes("TBD"), "missing repo must render TBD placeholder, never a dead link");

// 4. Status / stack / fast links
for (const status of ["shipped", "operating", "incubating"]) {
  check(projects.includes(`"${status}"`), `status "${status}" must exist`);
}
// NOTE(BRAWUKA-39 review): 只有公开可访问的仓库才配快链；私有/404 的一律留空走 TBD 占位
//（实测 lyuzizheng/cancan 私有、lyuzizheng/our-village 404；仅 coffeemode 公开 200）。
check(projects.includes('"PR"'), "projects must expose PR links");
check(bento.includes("LINKS TBD"), "repo-less cards must render the LINKS TBD fallback");
check(bento.includes("Badge"), "stack must render as badges");

// 5. Responsive bento spans: single column → 6-col grid with featured/standard
check(bento.includes("grid-cols-1"), "bento must collapse to one column on mobile");
check(bento.includes("md:grid-cols-6"), "bento must use a 6-col desktop grid");
check(bento.includes("md:col-span-4") && bento.includes("md:col-span-2"), "featured/standard spans must be 4/2");

// 6. Interactive resume: 4 capability dimensions, collapsible, owner-pending marked
for (const dim of ["platform", "frontend", "pipeline", "effectiveness"]) {
  check(resume.includes(`"${dim}"`), `resume must include dimension "${dim}"`);
}
for (const title of ["架构底座", "复杂前端", "算法管道", "工程效能"]) {
  check(resume.includes(title), `resume must include dimension title "${title}"`);
}
check(dossier.includes("CAPABILITY_DIMENSIONS"), "dossier must render from CAPABILITY_DIMENSIONS");
check(dossier.includes("aria-expanded"), "dossier toggles must expose aria-expanded");
check(dossier.includes("dossierDrawer"), "dossier motion must use the dossierDrawer spring preset");
check(dossier.includes("NEEDS-OWNER"), "tbd bullets must be marked NEEDS-OWNER");
check(printSheet.includes("status === \"verified\"") || printSheet.includes("verified"), "print sheet must filter to verified facts only");

// 7. Print mode: A4 page, avoid breaks, pure print sheet, one-click button
check(css.includes("@media print"), "globals.css must define @media print");
check(css.includes("@page") && css.includes("A4"), "print must target A4 @page");
check(/page-break-inside:\s*avoid/.test(css), "print must avoid breaks inside blocks");
check(printSheet.includes("print-only"), "print sheet must be print-only");
check(dossier.includes("no-print"), "interactive dossier must hide in print");
check(printButton.includes("window.print()"), "print button must call window.print()");
check(resumePage.includes("PrintResumeButton") && resumePage.includes("ResumePrint") && resumePage.includes("ResumeDossier"), "resume page must mount all three dual-mode parts");
check(resumePage.includes("FlightPathTimeline"), "resume page must keep the flight path timeline");

// 8. Homepage film-strip wiring (BRAWUKA-57: personal page, not a landing page)
check(!home.includes("ProjectsBento"), "homepage must not render ProjectsBento");
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
  "projects-resume OK: 4-project radar bento (tilt + ruled block + live stars), 4-dimension interactive dossier, A4 print sheet, homepage + resume wiring.",
);
