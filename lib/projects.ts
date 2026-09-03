/**
 * BRAWUKA-39 数据源：多项目雷达 (Projects Bento Grid) 与双模履历共享的项目矩阵。
 * 机器可读唯一真源；渲染见 components/motion/projects。
 *
 * 约束：
 * - 只收录 issue BRAWUKA-39 点名的四个条目；暂无公开仓库地址/Stars 数字的一律留空，
 *   由 owner 确认后填入（验收项"GitHub 链接正确"依赖此闭环）。
 * - 文件必须保持 erasable-syntax-only（供 node type-stripping 直接校验）。
 */

export type ProjectStatus = "shipped" | "operating" | "incubating";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "demo" | "pr" | "doc";
}

export interface ProjectEntry {
  id: string;
  /** 展示名，如 CanCan */
  name: string;
  /** 战役代号（telemetry 帧号旁标注），如 LEDGER-RADAR */
  codename: string;
  /** 胶片帧号 FRAME 01… */
  frame: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  /** 核心技术栈徽标 */
  stack: string[];
  links: ProjectLink[];
  /**
   * GitHub `owner/repo`（用于实时 Stars 微标拉取）。
   * 空字符串 = 仓库地址待 owner 确认，UI 只渲染占位徽标，不发起请求。
   */
  githubRepo: string;
  /** Bento 展台位：featured 占 4/6 栏，standard 占 2/6 栏（桌面端） */
  span: "featured" | "standard";
  /** Future Lab 孵化子项（仅 incubating 卡片使用） */
  incubating?: string[];
}

export const PROJECT_STATUS_META: Record<ProjectStatus, { label: string; dot: string }> = {
  shipped: { label: "SHIPPED", dot: "bg-cobalt" },
  operating: { label: "OPERATING", dot: "bg-safelight" },
  incubating: { label: "INCUBATING", dot: "bg-terracotta" },
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "cancan",
    name: "CanCan",
    codename: "LEDGER-RADAR",
    frame: "FRAME 01",
    tagline: "财务凭据与对账",
    description:
      "收据拍照归档 → OCR 凭据结构化 → 多账本自动对账的个人财务管线。Local-First 存底，月末一键导出审计包。",
    status: "operating",
    statusLabel: "OPERATING",
    stack: ["Next.js", "TypeScript", "SQLite", "OCR"],
    // NOTE(BRAWUKA-39 review): lyuzizheng/cancan 是私有仓库，公开访问 404；
    // 按本文件约束留空，由 owner 确认公开地址后再填。UI 渲染 TBD 占位，不发起请求。
    links: [],
    githubRepo: "",
    span: "featured",
  },
  {
    id: "coffeemode",
    name: "CoffeeMode",
    codename: "MODULE-SYNC",
    frame: "FRAME 02",
    tagline: "多模块协同",
    description:
      "多模块协作工作台：任务、文档与自动化机器人同屏编排，模块间以事件总线松耦合联动。",
    status: "shipped",
    statusLabel: "SHIPPED",
    stack: ["React", "Go", "WebSocket", "Postgres"],
    links: [
      { label: "GitHub", href: "https://github.com/lyuzizheng/coffeemode", kind: "github" },
      { label: "PR", href: "https://github.com/lyuzizheng/coffeemode/pulls", kind: "pr" },
    ],
    githubRepo: "lyuzizheng/coffeemode",
    span: "standard",
  },
  {
    id: "our-village",
    name: "Our Village",
    codename: "COMMONS-PLATFORM",
    frame: "FRAME 03",
    tagline: "社区生活平台",
    description:
      "社区生活平台：活动召集、闲置流转与邻里互助的信息交换所。以轻量Hands-on运营验证、以战代练社区冷启动。",
    status: "operating",
    statusLabel: "OPERATING",
    stack: ["Next.js", "Tailwind", "Supabase", "PWA"],
    // NOTE(BRAWUKA-39 review): lyuzizheng/our-village 公开访问 404（仓库不存在或未公开）；
    // 按本文件约束留空，由 owner 确认公开地址后再填。UI 渲染 TBD 占位，不发起请求。
    links: [],
    githubRepo: "",
    span: "standard",
  },
  {
    id: "future-lab",
    name: "Future Lab",
    codename: "GARAGE-DARKROOM",
    frame: "FRAME 04",
    tagline: "孵化中 · Vibe Coding 车库暗房",
    description:
      "独立 Side Projects 孵化器：想法以周为单位进暗房显影——能跑通最小闭环的留下，其余的回药水里。",
    status: "incubating",
    statusLabel: "INCUBATING",
    stack: ["Local-First", "Cloudflare", "Zeabur", "LLM"],
    links: [],
    githubRepo: "",
    span: "featured",
    incubating: ["Loan Calculator", "Panda Wanderer", "Project500 · 内存实时计算引擎"],
  },
];
