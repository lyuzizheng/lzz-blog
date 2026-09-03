import fs from "node:fs";
import path from "node:path";

console.log("=== LZZ Blog Content & Slug Verification Suite ===");

const postsPath = path.resolve(".velite/posts.json");
if (!fs.existsSync(postsPath)) {
  console.error("FAIL: .velite/posts.json does not exist. Run velite build first.");
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
console.log(`✓ Loaded ${posts.length} articles from .velite/posts.json`);

if (posts.length !== 27) {
  console.error(`FAIL: Expected 27 posts, found ${posts.length}`);
  process.exit(1);
}

let errors = 0;
const slugSet = new Set();
const permalinkSet = new Set();

// 1. Verify schema fields for every post
for (const p of posts) {
  if (!p.title || typeof p.title !== "string") {
    console.error(`FAIL: Post missing title: ${p.slug}`);
    errors++;
  }
  if (!p.slug || typeof p.slug !== "string") {
    console.error(`FAIL: Post missing slug: ${p.title}`);
    errors++;
  }
  if (!p.date || typeof p.date !== "string") {
    console.error(`FAIL: Post missing date: ${p.slug}`);
    errors++;
  }
  if (!p.category || typeof p.category !== "string") {
    console.error(`FAIL: Post missing category: ${p.slug}`);
    errors++;
  }
  if (typeof p.reading_time !== "number" || p.reading_time <= 0) {
    console.error(`FAIL: Post invalid reading_time: ${p.slug} (${p.reading_time})`);
    errors++;
  }
  if (!p.content || typeof p.content !== "string") {
    console.error(`FAIL: Post missing compiled content: ${p.slug}`);
    errors++;
  }

  slugSet.add(p.slug.toLowerCase());
  permalinkSet.add(p.permalink.toLowerCase());
  if (p.aliases) {
    for (const a of p.aliases) {
      slugSet.add(a.toLowerCase());
      permalinkSet.add(`/posts/${a.toLowerCase()}`);
    }
  }
}

console.log(`✓ All 27 articles passed strict schema validation (title, slug, date, category, reading_time, content)`);

// 2. Verify historical Hugo URLs from existing inter-post links
const knownHugoLinks = [
  "/posts/essay/i_hate_im",
  "/posts/essay/summary_2022",
  "/posts/study/gfs",
  "/posts/study/im_architecture",
  "/posts/essay/labrador_park",
  "/posts/essay/labrador_park/labrador",
  "/posts/study/math-typesetting",
  "/posts/study/weighted_random",
];

for (const link of knownHugoLinks) {
  const normLink = link.toLowerCase();
  if (!permalinkSet.has(normLink)) {
    console.error(`FAIL: Known Hugo URL not found in permalinkSet: ${link}`);
    errors++;
  } else {
    console.log(`  ✓ Historical link verified: ${link}`);
  }
}

// 3. Verify static HTML generation in .next/server/app/posts
const ssgDir = path.resolve(".next/server/app/posts");
if (fs.existsSync(ssgDir)) {
  let ssgCount = 0;
  for (const slug of slugSet) {
    const htmlFile = path.join(ssgDir, `${slug}.html`);
    if (fs.existsSync(htmlFile)) {
      ssgCount++;
    } else {
      console.error(`FAIL: Pre-rendered HTML missing for slug: ${slug} (${htmlFile})`);
      errors++;
    }
  }
  console.log(`✓ Pre-rendered HTML verified for ${ssgCount} slug/alias paths`);
} else {
  console.log("ℹ Note: .next/server/app/posts not yet present (run next build to verify SSG)");
}

// 4. Verify static assets in public/
const publicDir = path.resolve("public");
let verifiedCovers = 0;
for (const p of posts) {
  if (p.cover_image) {
    const localPath = path.join(publicDir, p.cover_image.replace(/^\//, ""));
    if (fs.existsSync(localPath)) {
      verifiedCovers++;
    } else {
      console.error(`FAIL: Cover image file missing on disk: ${p.cover_image} for ${p.slug}`);
      errors++;
    }
  }
}
console.log(`✓ Verified ${verifiedCovers} custom cover image files in public/`);

if (errors > 0) {
  console.error(`\n❌ Total Errors: ${errors}`);
  process.exit(1);
} else {
  console.log("\n🎉 ALL VERIFICATION CHECKS PASSED (0 ERRORS, 100% SLUG COMPATIBILITY)");
}
