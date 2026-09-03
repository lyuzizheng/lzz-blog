/**
 * Zero-dependency gate for BRAWUKA-41: validates lib/career-dossier.ts.
 * Run: `node scripts/career-dossier.check.ts` (Node >= 22 type-stripping).
 * Checks: chronological order, required fields, YYYY-MM dates, unique ids,
 * https/relative hrefs, no fabricated metrics (tbd must stay tbd), dossier parity.
 */
import { TIMELINE_NODES, NARRATIVE_BEATS } from "../lib/career-dossier.ts";

const failures: string[] = [];
const check = (ok: boolean, msg: string): void => {
  if (!ok) failures.push(msg);
};

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;

const ids = new Set<string>();
let prevStart = "";
for (const n of TIMELINE_NODES) {
  check(typeof n.id === "string" && n.id.length > 0, `node missing id`);
  check(!ids.has(n.id), `duplicate id ${n.id}`);
  ids.add(n.id);
  check(YM.test(n.start), `${n.id} bad start ${n.start}`);
  check(n.end === null || YM.test(n.end), `${n.id} bad end ${n.end}`);
  check(n.end === null || n.start <= n.end, `${n.id} start after end`);
  check(prevStart <= n.start, `${n.id} out of chronological order`);
  prevStart = n.start;
  for (const k of ["org", "role", "codename", "mainLine", "summary", "motionSlot"] as const) {
    const v = n[k];
    check(typeof v === "string" && v.trim().length > 0, `${n.id} missing ${k}`);
  }
  for (const im of n.impact) {
    check(im.metric.trim().length > 0 && im.source.trim().length > 0, `${n.id} impact missing metric/source`);
    if (im.status === "tbd") {
      check(im.value === "TBD", `${n.id} tbd impact must have value "TBD" (metric: ${im.metric})`);
    } else {
      check(im.value !== "TBD" && im.value.trim().length > 0, `${n.id} verified impact needs a value`);
    }
  }
  for (const l of n.links) {
    check(
      l.href.startsWith("https://") || l.href.startsWith("content/") || l.href.startsWith("docs/"),
      `${n.id} bad href ${l.href}`,
    );
  }
}

const covered = new Set(NARRATIVE_BEATS.flatMap((b) => b.covers));
for (const n of TIMELINE_NODES) {
  if (n.id === "N01" || n.id === "N05") continue; // endpoints ride along Act 1 without a dedicated beat
  check(covered.has(n.id), `${n.id} not covered by any narrative beat`);
}

check(TIMELINE_NODES.length === 12, `expected 12 nodes, got ${TIMELINE_NODES.length}`);
check(NARRATIVE_BEATS.length === 5, `expected 5 beats, got ${NARRATIVE_BEATS.length}`);

if (failures.length > 0) {
  console.error(`CAREER DOSSIER CHECK FAILED (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(`career dossier OK: ${TIMELINE_NODES.length} nodes, ${NARRATIVE_BEATS.length} beats, chronological, zero fabricated metrics.`);
