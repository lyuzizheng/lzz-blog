/**
 * BRAWUKA-39 数据源：双模履历（交互浏览 + 打印导出）能力维度。
 * 内容只收录 docs/CAREER_DOSSIER.md 与 lib/career-dossier.ts 可查事实；
 * 无数字不编数字 —— 未确认指标一律 status "tbd"，打印版不渲染 tbd 条目。
 * 文件必须保持 erasable-syntax-only（供 node type-stripping 直接校验）。
 */

export interface ResumeBullet {
  text: string;
  status: "verified" | "tbd";
  source: string;
}

export interface CapabilityDimension {
  id: string;
  /** 交互浏览模式的折叠分组标题 */
  title: string;
  codename: string;
  summary: string;
  bullets: ResumeBullet[];
}

export const RESUME_BASICS = {
  name: "Zizheng Lyu",
  headline: "Backend / Full-Stack Product Engineer · Distributed Systems & Local-First",
  location: "Singapore · 01°20′N 103°49′E",
  email: "lvzizhengde@gmail.com",
  education: "Nanyang Technological University · B.Eng. Computer Engineering (Merit Scholarship)",
} as const;

export const CAPABILITY_DIMENSIONS: CapabilityDimension[] = [
  {
    id: "platform",
    title: "架构底座",
    codename: "BEDROCK",
    summary: "API 网关 PaaS、可观测性与发布工程：让平台成为默认可靠的那一层。",
    bullets: [
      {
        text: "ByteDance 中台 API 网关 (AGW)：自助诊断工具 + 用量预估工具（路由 / 限流 / 协议转换 PaaS）",
        status: "verified",
        source: "content/about.md",
      },
      {
        text: "Bondee K8s 管理平台 + Pod 调试能力；身兼 SE / SRE / BD（新加坡首位 SWE）",
        status: "verified",
        source: "CAREER_DOSSIER N09",
      },
      {
        text: "Location 业务线 CI/CD 流程与在线 / 离线任务标准告警体系建设",
        status: "verified",
        source: "CAREER_DOSSIER N07",
      },
    ],
  },
  {
    id: "frontend",
    title: "复杂前端",
    codename: "PRINT-ATELIER",
    summary: "出版级排版 × 物理动效：把工程能力翻译成可触摸的界面。",
    bullets: [
      {
        text: "LZZ Blog：Next.js 15 + React 19 + Tailwind v4 + Lenis 惯性滚动，昼夜双模式印社设计语言",
        status: "verified",
        source: "repo",
      },
      {
        text: "uWave 联创全栈：Flutter 客户端重构 + Spring Cloud 微服务重设计；20k 注册 / 4k DAU",
        status: "verified",
        source: "CAREER_DOSSIER N03",
      },
      {
        text: "WISE 主导产品设计：Payment Defects & Incident 的 Agent 状态追踪与队列管理界面",
        status: "verified",
        source: "CAREER_DOSSIER N12",
      },
    ],
  },
  {
    id: "pipeline",
    title: "算法管道",
    codename: "DATA-BLADE",
    summary: "离线编排与在线服务的双轨治理：先治管道，再谈规模。",
    bullets: [
      {
        text: "TikTok Location 海外 IP 定位负责人：近百离线 Spark 任务治理，自研分析编排优化资源利用",
        status: "verified",
        source: "CAREER_DOSSIER N07",
      },
      {
        text: "Bondee 日志管线：AWS 托管日志 → 自建 Vector + Kafka + ElasticSearch（成本与性能双优化）",
        status: "verified",
        source: "CAREER_DOSSIER N09",
      },
      {
        text: "TikTok IM：Golang 微服务多活同步、会话排序初始化优化、消息丢失自动化诊断工具",
        status: "verified",
        source: "CAREER_DOSSIER N08",
      },
    ],
  },
  {
    id: "effectiveness",
    title: "工程效能",
    codename: "COST-BLADE",
    summary: "7×24 oncall 一人成军：把救火经验沉淀为不救火的系统。",
    bullets: [
      {
        text: "Location 海外链路一人撑全链路：带 1 实习生，建 oncall / CI / 告警标准；获 2022.01–02 Spot Bonus",
        status: "verified",
        source: "CAREER_DOSSIER N07",
      },
      {
        text: "TikTok IM 1 年后晋升；获 Bi-Monthly Spot Bonus",
        status: "verified",
        source: "CAREER_DOSSIER N08",
      },
      {
        text: "WISE AI Agent 自动化提效：赔偿链路重构与跨组升级机制",
        status: "tbd",
        source: "NEEDS-OWNER 脱敏边界",
      },
    ],
  },
];

export interface PrintEmployment {
  period: string;
  org: string;
  role: string;
  line: string;
}

export const PRINT_EMPLOYMENT: PrintEmployment[] = [
  {
    period: "2024-11 – Present",
    org: "WISE",
    role: "Full-Stack Product Engineer",
    line: "Payment Defects & Incident：Agent 状态追踪、队列管理、跨组升级、赔偿链路重构；主导产品设计。",
  },
  {
    period: "2024-04 – 2024-07",
    org: "Maribank",
    role: "Senior Backend · Loan & Credit",
    line: "Cashloan + SME Termloan (Java)；风控 / 合规 / SDLC；业余 RAG + LLM 智能客服 Bot。",
  },
  {
    period: "2023-09 – 2024-04",
    org: "Bondee",
    role: "Senior SWE · DevOps",
    line: "K8s 管理平台；日志 AWS → 自建 Vector + Kafka + ES；新加坡首位 SWE，身兼 SE / SRE / BD。",
  },
  {
    period: "2021-08 – 2023-09",
    org: "ByteDance · TikTok",
    role: "Backend · IM / Location / AGW",
    line: "IM 多活同步与会话排序优化；Location 海外 IP 定位负责人；AGW 自助诊断与用量预估工具。",
  },
  {
    period: "2019-08 – 2021-01",
    org: "uWave",
    role: "Co-Founder · Full Stack",
    line: "Flutter 重构 + Spring Cloud 微服务；20k 注册 / 4k DAU。",
  },
  {
    period: "2017-08 – 2021-05",
    org: "NTU",
    role: "B.Eng. Computer Engineering",
    line: "全额 Merit Scholarship。",
  },
];
