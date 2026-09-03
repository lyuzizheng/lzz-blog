/**
 * BRAWUKA-37 gate: validates the Flight Path Timeline contracts
 * (zero-dependency, plain node — no build required).
 *
 * Run: `node scripts/flight-path.check.mjs`
 * Checks:
 *  1. N10 slot is act3-ledger-stamp (no semantic overlap with N09 pipeline).
 *  2. Every motionSlot value has a choreography in SlotFrame (KNOWN_MOTION_SLOTS).
 *  3. Keyboard contract keys present (ArrowRight/L/ArrowLeft/J/Home/End).
 *  4. Counters use tabular-nums (Zero CLS).
 *  5. Canvas particle flow capped at <=60 with off-viewport pause + reduced-motion fallback.
 *  6. Arch diagram pinned to design tokens (colorTokens/overprint/halftone/tabular-nums).
 *  7. S6 critique card collapsed by default (aria-expanded + useState(false)).
 *  8. Self-referential docs/CAREER_DOSSIER.md links filtered out of the UI.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

const dossier = read("lib/career-dossier.ts");
const slots = read("components/motion/flight-path/motion-slots.tsx");
const keyboard = read("components/motion/flight-path/keyboard-nav.ts");
const timeline = read("components/motion/flight-path/flight-path-timeline.tsx");
const drawer = read("components/motion/flight-path/dossier-drawer.tsx");
const arch = read("components/motion/flight-path/arch-diagram.tsx");

// 1. N10 semantic fix
check(
  /id:\s*"N10"[\s\S]*?motionSlot:\s*"act3-ledger-stamp"/.test(dossier),
  'N10 motionSlot must be "act3-ledger-stamp" (bank ledger stamp, not pipeline flow)',
);
const n09 = dossier.match(/id:\s*"N09"[\s\S]*?motionSlot:\s*"([^"]+)"/);
check(n09?.[1] === "act3-pipeline-flow", `N09 must keep act3-pipeline-flow (got ${n09?.[1]})`);

// 2. Slot coverage: every motionSlot in data has a choreography
const slotValues = [...dossier.matchAll(/motionSlot:\s*"([^"]+)"/g)].map((m) => m[1]);
const known = [...slots.matchAll(/case\s+"([^"]+)":/g)].map((m) => m[1]);
for (const s of new Set(slotValues)) {
  check(known.includes(s), `motionSlot "${s}" has no choreography case in SlotFrame`);
}

// 3. Keyboard contract (timeline consumes the shared hook)
for (const key of ["ArrowRight", "ArrowLeft", "Home", "End"]) {
  check(keyboard.includes(`"${key}"`), `keyboard-nav must handle ${key}`);
}
check(/"l"/.test(keyboard) && /"j"/.test(keyboard), "keyboard-nav must handle L (next) / J (prev)");
check(timeline.includes("useFlightKeyboard"), "timeline must use the shared useFlightKeyboard hook");
check(keyboard.includes("isEditableTarget"), "keyboard-nav must not hijack typing in inputs");

// 4. tabular-nums counters
check(slots.includes("tabular-nums"), "motion-slots must use tabular-nums for counters");
check(timeline.includes("tabular-nums"), "timeline must use tabular-nums for frame/progress digits");

// 5. Particle cap + pause + fallback
check(/MAX_PARTICLES\s*=\s*60/.test(slots), "pipeline canvas must cap particles at 60");
check(slots.includes("IntersectionObserver"), "pipeline canvas must pause off-viewport");
check(
  slots.includes("prefers-reduced-motion") && timeline.includes("usePrefersReducedMotion"),
  "every slot path must provide a prefers-reduced-motion static fallback",
);

// 6. mono-color token pinning
check(arch.includes("colorTokens"), "arch diagram must derive palette from tokens (no hex hardcode)");
check(arch.includes("overprint"), "arch diagram edges must use ink-overprint");
check(arch.includes("halftone"), "arch diagram must render halftone substrate dots");
check(arch.includes("tabular-nums"), "arch diagram labels must use tabular-nums");

// 7. S6 collapsed by default
check(
  /useState\(false\)/.test(slots) && slots.includes('aria-expanded'),
  "S6 critique card must default collapsed with aria-expanded",
);

// 8. Self-ref links filtered
check(
  drawer.includes("CAREER_DOSSIER") && timeline.includes("isSelfRefLink"),
  "drawer + timeline must filter self-referential docs/CAREER_DOSSIER.md links",
);
check(
  timeline.includes("archDiagram") || drawer.includes("ArchDiagram"),
  "archDiagram source must be rendered (drawer)",
);

if (failures.length > 0) {
  console.error(`FLIGHT PATH CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(
  `flight path OK: N10 ledger-stamp, ${new Set(slotValues).size} slots choreographed, keyboard contract, ≤60 particles, mono-color tokens, S6 collapsed.`,
);
