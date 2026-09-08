/**
 * BRAWUKA-62 数据源：04 Products (/products) 独立子页数据真源。
 *
 * 规范约束（依据 BRAWUKA-61 Q8 锁死与 BRAWUKA-62 交付要求）：
 * 1. 独立子页 04 Products (/products)，只收工作之外的产品，IM 不算。首批 3 个：CoffeeMode、CanCan、Our Village。Now 不做。
 * 2. 每产品一句话（≤40 字）+ 状态章（开发中 / 已上线，三词可调）+ 一个外链；不展开架构、不写 roadmap。
 * 3. 封面图按 DESIGN V2 语言（Pale Beige #F5F1E8 纸基 + 钴蓝 #2148B8 单专色 + mono 网点），每产品一幅简介配图。
 * 4. 成品直接落到 /products 一屏一产品结构（策展式 deck 模型）。
 */

type ProductStatusCode = "in_development" | "in_development_site_live" | "live";

interface ProductLink {
  readonly label: string;
  readonly labelZh: string;
  readonly href: string;
  readonly kind: "github" | "website";
}

export interface ProductItem {
  readonly id: "coffeemode" | "cancan" | "our-village";
  /** 产品展示名，如 CoffeeMode */
  readonly name: string;
  /** 战役代号与索引编号，如 PLATE 01 · FRAME 01A */
  readonly plateNumber: string;
  readonly codename: string;
  /** 中文一句话文案（严格约束 ≤ 40 汉字，禁止展开架构与 roadmap） */
  readonly taglineZh: string;
  /** 英文一句话文案 */
  readonly taglineEn: string;
  /** 状态枚举 */
  readonly statusCode: ProductStatusCode;
  /** 状态章文本（中文三词可调：开发中 / 已上线 / 开发中 · 网站已上线） */
  readonly statusStampZh: string;
  /** 状态章文本（英文） */
  readonly statusStampEn: string;
  /** 状态 telemetry 码，如 DEV · IN PROGRESS */
  readonly statusTelemetry: string;
  /** 单一官方外链 */
  readonly link: ProductLink;
  /** DESIGN V2 语言单专色网点矢量头图路径 */
  readonly coverSvg: string;
  /** 地理/空间测绘遥测坐标 */
  readonly coordinates: string;
  /** 极简技术特征标注（微字 telemetry，非展开架构） */
  readonly techSignature: readonly string[];
}

export const PRODUCTS: readonly ProductItem[] = [
  {
    id: "coffeemode",
    name: "CoffeeMode",
    plateNumber: "01 / 03",
    codename: "COFFEEMODE · SPEC // 0000",
    taglineZh: "[WIP 施工中] 发现好咖啡馆与办公友好空间，三秒极速签到且无广告打扰。",
    taglineEn: "[WIP] Find specialty coffee & laptop-friendly cafes with 3-second check-in and zero ads.",
    statusCode: "in_development",
    statusStampZh: "开发中",
    statusStampEn: "WIP · In Dev",
    statusTelemetry: "WIP // DEV IN PROGRESS",
    link: {
      label: "GitHub Repo ↗",
      labelZh: "查看源码 ↗",
      href: "https://github.com/lyuzizheng/coffeemode",
      kind: "github",
    },
    coverSvg: "/products/coffeemode-mono.svg",
    coordinates: "LAT 01°17'58\"N · LON 103°51'08\"E",
    techSignature: ["Next.js 16", "Apple MapKit JS", "Cloudflare Workers", "Supabase Auth"],
  },
  {
    id: "cancan",
    name: "CanCan",
    plateNumber: "02 / 03",
    codename: "CANCAN · LEDGER // 0001",
    taglineZh: "[WIP 施工中] 智能解析账单凭据与确定性勾稽对账，加密存储于本地的财务库。",
    taglineEn: "[WIP] Local-first financial vault with AI-assisted parsing & deterministic reconciliation.",
    statusCode: "in_development",
    statusStampZh: "开发中",
    statusStampEn: "WIP · In Dev",
    statusTelemetry: "WIP // DEV IN PROGRESS",
    link: {
      label: "Preview Site ↗",
      labelZh: "访问预览 ↗",
      href: "https://cancan-4tj.pages.dev",
      kind: "website",
    },
    coverSvg: "/products/cancan-mono.svg",
    coordinates: "macOS DESKTOP // XChaCha20-Poly1305",
    techSignature: ["Tauri v2", "Rust", "SQLCipher", "React 19"],
  },
  {
    id: "our-village",
    name: "Our Village",
    plateNumber: "03 / 03",
    codename: "OUR VILLAGE // 0002",
    taglineZh: "现代华人家庭熟人社区成员系统，统一家庭会员账户、新人订阅与门禁准入。",
    taglineEn: "Modern neighborhood membership system unifying family accounts, newcomer billing, and access.",
    statusCode: "live",
    statusStampZh: "已上线",
    statusStampEn: "Official Site Live",
    statusTelemetry: "LIVE // OFFICIAL SITE",
    link: {
      label: "Official Site ↗",
      labelZh: "访问官网 ↗",
      href: "https://gen-growth.com",
      kind: "website",
    },
    coverSvg: "/products/our-village-mono.svg",
    coordinates: "SINGAPORE LAT 1.3521°N · LON 103.8198°E",
    techSignature: ["Vite + React 19", "Airwallex Billing", "Cloudflare Pages", "PWA"],
  },
] as const;

/**
 * 字符数安全校验门禁：确保每条中文 tagline 严格不超过 40 字
 */
for (const product of PRODUCTS) {
  if (product.taglineZh.length > 40) {
    throw new Error(
      `[BRAWUKA-62] Product ${product.id} tagline exceeds 40 characters: ${product.taglineZh.length}`,
    );
  }
}
