// BRAWUKA-47 CI gate: case-sensitive asset reference check.
// macOS/APFS is case-insensitive, so `overtime.JPG` resolves locally while
// Linux CI (and Velite's asset pipeline) throws ENOENT. This scan reads the
// parent directory entries and requires an EXACT name match — fs.existsSync
// alone cannot catch the mismatch on a case-insensitive disk.
// Run: node scripts/case-sensitive-assets.check.mjs (no build needed).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL(".", import.meta.url).pathname, "..");
const contentDir = path.join(root, "content");
let failures = 0;
let checked = 0;

const IMAGE_RE = /!\[[^\]]*\]\(([^)#\s]+)(?:#[^)\s]*)?\)/g;

function* walkMd(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMd(full);
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      yield full;
    }
  }
}

for (const mdFile of walkMd(contentDir)) {
  const text = fs.readFileSync(mdFile, "utf8");
  const siblings = new Set(fs.readdirSync(path.dirname(mdFile)));
  IMAGE_RE.lastIndex = 0;
  let m;
  while ((m = IMAGE_RE.exec(text)) !== null) {
    let ref = m[1].split("?")[0].split("#")[0];
    if (/^(https?:\/\/|data:|\/)/.test(ref)) continue;
    if (ref.startsWith("./")) ref = ref.slice(2);
    const parts = ref.split("/");
    checked += 1;
    if (parts.length === 1) {
      if (!siblings.has(ref)) {
        const hint = [...siblings].filter((s) => s.toLowerCase() === ref.toLowerCase());
        console.error(
          `FAIL case-sensitive asset: ${path.relative(root, mdFile)} -> ${m[1]} (disk has: ${hint.join(", ") || "no match"})`,
        );
        failures += 1;
      }
    } else {
      const target = path.join(path.dirname(mdFile), ...parts);
      const parent = path.dirname(target);
      const base = path.basename(target);
      if (!fs.existsSync(parent) || !new Set(fs.readdirSync(parent)).has(base)) {
        console.error(`FAIL case-sensitive asset: ${path.relative(root, mdFile)} -> ${m[1]}`);
        failures += 1;
      }
    }
  }

  // BRAWUKA-48: Scan frontmatter cover.image references with exact readdir match
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const isDraft = /^\s*draft:\s*true/m.test(fm);
    if (!isDraft) {
      const coverMatch = fm.match(/cover:\s*\n((?:\s+.*\n?)*)/);
      if (coverMatch) {
        const coverBlock = coverMatch[1];
        const isRelative = /relative:\s*true/.test(coverBlock);
        const imgMatch = coverBlock.match(/image:\s*["']?([^"'\r\n#\s]+)/);
        if (imgMatch && isRelative) {
          let ref = imgMatch[1].replace(/#center$/, "");
          if (!/^(https?:\/\/|data:|\/)/.test(ref)) {
            if (ref.startsWith("./")) ref = ref.slice(2);
            checked += 1;
            if (!siblings.has(ref)) {
              const hint = [...siblings].filter((s) => s.toLowerCase() === ref.toLowerCase());
              console.error(
                `FAIL case-sensitive frontmatter cover: ${path.relative(root, mdFile)} -> ${imgMatch[1]} (disk has: ${hint.join(", ") || "no match"})`,
              );
              failures += 1;
            }
          }
        }
      }
    }
  }
}

console.log(`case-sensitive assets OK: ${checked} image refs exact-matched on disk`);
if (failures > 0) {
  console.error(`\nFAIL: ${failures} case-mismatched asset reference(s) — Linux CI would ENOENT`);
  process.exit(1);
}
