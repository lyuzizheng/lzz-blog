/**
 * BRAWUKA-62 verification suite: Products page, copy, SVGs, and deck contracts.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf-8");

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

// 1. Data layer: lib/products.ts
const productsCode = read("lib/products.ts");
const expectedProducts = ["coffeemode", "cancan", "our-village"];

for (const id of expectedProducts) {
  check(productsCode.includes(`id: "${id}"`), `lib/products.ts must include "${id}"`);
}

// Ensure IM is strictly excluded
check(!productsCode.toLowerCase().includes("lark") && !productsCode.toLowerCase().includes("feishu") && !productsCode.toLowerCase().includes("instant message"), "IM products must NOT be included");

// 2. Copy constraints: <= 40 characters for every Chinese tagline
for (const match of productsCode.matchAll(/taglineZh:\s*"([^"]+)"/g)) {
  const tagline = match[1];
  check(tagline.length <= 40, `taglineZh must be <= 40 characters, got ${tagline.length}: "${tagline}"`);
}

// 3. Status stamp check: must be valid statuses ("开发中" or "已上线")
for (const status of ["开发中", "已上线"]) {
  check(productsCode.includes(`"${status}"`), `Status stamp must include "${status}"`);
}

// 4. External link check
check(productsCode.includes("https://github.com/lyuzizheng/coffeemode"), "CoffeeMode must have repo link");
check(productsCode.includes("https://cancan-4tj.pages.dev"), "CanCan must have official link");
check(productsCode.includes("https://gen-growth.com"), "Our Village must have official link");

// 5. Cover image check: DESIGN V2 requirements
const svgFiles = [
  "public/products/coffeemode-mono.svg",
  "public/products/cancan-mono.svg",
  "public/products/our-village-mono.svg",
];

for (const svgPath of svgFiles) {
  check(fs.existsSync(path.join(root, svgPath)), `Cover SVG must exist: ${svgPath}`);
  const content = read(svgPath);
  check(content.includes("#F5F1E8"), `${svgPath} must use Pale Beige #F5F1E8 substrate`);
  check(content.includes("#2148B8"), `${svgPath} must use Cobalt Blue #2148B8 ink`);
  check(content.includes("mono-halftone"), `${svgPath} must include mono halftone dot pattern`);
  check(!content.includes("linearGradient") && !content.includes("radialGradient"), `${svgPath} must NOT use gradients`);
  check(!content.includes("feGaussianBlur") && !content.includes("drop-shadow"), `${svgPath} must NOT use glowing filters`);
}

// 6. Page structure & deck contracts: app/products/page.tsx & components/products/products-deck.tsx
const pageCode = read("app/products/page.tsx");
const deckFiles = ["components/products/products-deck.tsx", "components/products/product-slide.tsx"].map(read).join("\n");

check(pageCode.includes("ProductsDeck"), "app/products/page.tsx must mount ProductsDeck");
check(deckFiles.includes("snap-y") && deckFiles.includes("snap-mandatory"), "deck must use snap-y snap-mandatory");
check(deckFiles.includes("PRODUCTS.map"), "deck must map through PRODUCTS");
check(deckFiles.includes("coverSvg"), "deck must render coverSvg");
check(deckFiles.includes("tagline"), "deck must render tagline");
check(deckFiles.includes("statusStamp"), "deck must render status stamp");
check(deckFiles.includes("link"), "deck must render external link");

const chaptersCode = read("lib/chapters.ts");
const sitemapCode = read("app/sitemap.ts");

check(chaptersCode.includes('"/products"'), "site header must include /products");
check(sitemapCode.includes("/products"), "sitemap must include /products");

if (failures.length > 0) {
  console.error("products.check.mjs FAILED:");
  for (const f of failures) {
    console.error("  -", f);
  }
  process.exit(1);
}

console.log("products OK: 3 products (≤40 chars copy, status stamps, verified links), 3 mono-color SVGs (#F5F1E8 + #2148B8 + halftone), /products snap-deck wiring, zero IM.");
