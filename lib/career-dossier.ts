/**
 * BRAWUKA-41 → BRAWUKA-37 数据源：生涯时间轴节点（机器可读）。
 * 人类可读说明见 docs/CAREER_DOSSIER.md。
 * 约束：只收录原文可查事实；无数字不编数字（impact.status === "tbd"）。
 * 文件必须保持 erasable-syntax-only（供 node type-stripping 直接校验）。
 */

export interface DossierImpact {
  metric: string;
  value: string;
  status: "verified" | "tbd";
  source: string;
}

export interface DossierLink {
  label: string;
  href: string;
}

export interface TimelineNode {
  id: string;
  start: string;
  end: string | null;
  org: string;
  role: string;
  codename: string;
  mainLine: string;
  summary: string;
  impact: DossierImpact[];
  archDiagram: string | null;
  motionSlot: string;
  links: DossierLink[];
  needsOwner: boolean;
}

export interface NarrativeBeat {
  act: string;
  covers: string[];
  direction: string;
}

export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: "N01",
    start: "2017-08",
    end: "2021-05",
    org: "Nanyang Technological University",
    role: "B.Eng Computer Engineering · Merit Scholarship",
    codename: "BEDROCK",
    mainLine: "CS 地基层：基础课 + FYP + 以战代练",
    summary: "NTU 计算机工程本科，全额 Science and Engineering Merit Scholarship；同期以 Transforma 实习与 uWave 创业代练。",
    impact: [],
    archDiagram: null,
    motionSlot: "act1-slow-roll",
    links: [{ label: "Resume source", href: "docs/CAREER_DOSSIER.md" }],
    needsOwner: false,
  },
  {
    id: "N02",
    start: "2019-06",
    end: "2019-12",
    org: "Transforma Robotics",
    role: "Software Engineer Intern",
    codename: "SOLO-BUILD",
    mainLine: "唯一开发者：Android 应用从设计到客户演示",
    summary: "第一份工作；独立设计、编码、测试、部署公司 Android 应用，不到两个月完成客户演示。公开去留待 owner 确认。",
    impact: [],
    archDiagram: null,
    motionSlot: "act1-slow-roll",
    links: [{ label: "About archive", href: "content/about.md" }],
    needsOwner: true,
  },
  {
    id: "N03",
    start: "2019-08",
    end: "2021-01",
    org: "U-Wave",
    role: "Co-Founder · Full Stack Engineer",
    codename: "CAMPUS-BLITZ",
    mainLine: "Flutter 重构 + Spring Cloud 微服务",
    summary: "联创并担任全栈：Flutter 重构客户端，Spring Cloud 重设计后端微服务（含推送与鉴权）。",
    impact: [
      { metric: "registered users", value: "20k", status: "verified", source: "resume" },
      { metric: "daily active users", value: "4k", status: "verified", source: "resume" },
    ],
    archDiagram: null,
    motionSlot: "act1-bento-counter",
    links: [{ label: "U-Wave", href: "https://uwave.sg/" }],
    needsOwner: false,
  },
  {
    id: "N04",
    start: "2020-05",
    end: "2020-07",
    org: "VISA Inc",
    role: "Summer Intern · Scrum Master / PO",
    codename: "HACK-60",
    mainLine: "全球实习黑客松 60 队中获 1st Runner-Up",
    summary: "兼任两项目的 Scrum Master 与 PO，获 Visa Global Intern Hackathon 亚军。公开去留待 owner 确认。",
    impact: [
      { metric: "hackathon rank", value: "1st runner-up of 60 teams", status: "verified", source: "about.md" },
    ],
    archDiagram: null,
    motionSlot: "act1-slow-roll",
    links: [{ label: "About archive", href: "content/about.md" }],
    needsOwner: true,
  },
  {
    id: "N05",
    start: "2021-01",
    end: "2021-05",
    org: "ByteDance",
    role: "Intern · API Gateway (AGW) Cloud Platform",
    codename: "GATEKEEP",
    mainLine: "网关 PaaS：自助诊断 + 用量预估工具",
    summary: "中台 API 网关实习：路由/限流/协议转换 PaaS，交付自助诊断工具与用量预估工具。",
    impact: [],
    archDiagram: null,
    motionSlot: "act1-slow-roll",
    links: [{ label: "About archive", href: "content/about.md" }],
    needsOwner: false,
  },
  {
    id: "N06",
    start: "2021-08",
    end: "2021-10",
    org: "ByteDance",
    role: "Backend · TikTok IM (new grad)",
    codename: "FOG-FORMATION",
    mainLine: "新人浓雾期：首个端到端机器人 → 伪需求低点 → 真 mentor 入场",
    summary: "私信中台新人期：独立交付自动化机器人获成就感，随后被困于无定义的诊断工具伪需求，直到台湾 mentor 介入拆解工作法。",
    impact: [],
    archDiagram: null,
    motionSlot: "act2-fog",
    links: [{ label: "Essay: TikTok 两年", href: "content/posts/essay/summary_tiktok/index.md" }],
    needsOwner: false,
  },
  {
    id: "N07",
    start: "2021-10",
    end: "2022-06",
    org: "ByteDance",
    role: "Owner · Location overseas IP-geo",
    codename: "LONELY-ATLAS",
    mainLine: "一人撑海外全链路：离线治理 + oncall + ASEAN 精度",
    summary: "海外唯一开发：治理近百离线 Spark 任务资源争抢，建立 CI/CD 与告警标准，带1实习生；带领实习生进行 ASEAN IP 精度突破并荣获团队 Spot Bonus。",
    impact: [
      { metric: "spot bonus", value: "2022-01/02", status: "verified", source: "resume" },
      { metric: "offline pipeline scale", value: "~100 jobs, 24/7 oncall", status: "verified", source: "summary_2022 essay (qualitative)" },
      { metric: "ASEAN IP precision", value: "team spot bonus award", status: "verified", source: "ByteDance Location" },
    ],
    archDiagram: "flowchart TB; SRC-->OFF-->PIPE-->ON-->BIZ",
    motionSlot: "act2-red-alert",
    links: [{ label: "Essay: 2022 总结", href: "content/posts/essay/summary_2022/index.md" }],
    needsOwner: false,
  },
  {
    id: "N08",
    start: "2022-06",
    end: "2023-09",
    org: "ByteDance",
    role: "Tech Owner · TikTok IM Social",
    codename: "GLOBAL-HEARTBEAT",
    mainLine: "20+ Go 微服务高并发基石 + 多数据中心跨洋同步 + 秒级排障",
    summary: "独立维护 20+ 个 Go 微服务，保障 TikTok IM 核心链路全球 7×24 Oncall 稳定运行；主导建设 Multi-datacenter Synchronization 跨洋毫秒级同步机制；自研消息丢包自动排障工具缩减至秒级全自动诊断；获团队晋升与 Bi-monthly Spot Bonus。",
    impact: [
      { metric: "microservice matrix", value: "20+ Go microservices (7×24 oncall)", status: "verified", source: "TikTok IM" },
      { metric: "multi-dc sync", value: "cross-ocean ms-level synchronization", status: "verified", source: "TikTok IM" },
      { metric: "loss troubleshooting", value: "hours to seconds automated diagnosis", status: "verified", source: "TikTok IM" },
      { metric: "promotion & bonus", value: "promoted in 1 yr + bi-monthly spot bonus", status: "verified", source: "ByteDance" },
    ],
    archDiagram: "flowchart LR; A-->G-->S; G-->P; G<-->O; S-->SY-->R-->B",
    motionSlot: "act2-layered-lightup",
    links: [
      { label: "IM architecture study", href: "content/posts/study/im_architecture/index.md" },
      { label: "Essay: I_hate_IM", href: "content/posts/essay/I_hate_IM/index.md" },
    ],
    needsOwner: false,
  },
  {
    id: "N09",
    start: "2023-09",
    end: "2024-04",
    org: "Bondee",
    role: "Senior SWE · DevOps (first SG SWE)",
    codename: "COST-BLADE",
    mainLine: "自建日志管线：DaemonSet + Vector + Kafka + ES 降本",
    summary: "新加坡首位 SWE，深度掌握 DevOps、K8s 容器编排平台与高吞吐可观测性基础设施。主导重构并彻底替换掉昂贵 ELK Stack，基于 DaemonSet + Disk Mount + Vector + Kafka 构建全自研高性能日志管线，显著缩减云资源账单。",
    impact: [
      { metric: "pipeline architecture", value: "DaemonSet + Vector + Kafka", status: "verified", source: "Bondee DevOps" },
      { metric: "cloud cost reduction", value: "replaced heavy ELK stack", status: "verified", source: "Bondee DevOps" },
    ],
    archDiagram: "flowchart LR; APP-->V-->K-->ES-->UI",
    motionSlot: "act3-pipeline-flow",
    links: [{ label: "Essay: 2023 总结", href: "content/posts/essay/summary_2023/index.md" }],
    needsOwner: false,
  },
  {
    id: "N10",
    start: "2024-04",
    end: "2024-07",
    org: "Maribank",
    role: "Senior Backend · Loan & Credit",
    codename: "LEDGER-APPRENTICE",
    mainLine: "数字银行信贷架构：分布式交易一致性 + 防重放 + 计息风控",
    summary: "全面切入新加坡合规数字银行严格的金融后端架构体系。在信贷业务线（Loan Division）深入实践了分布式交易一致性、防并发重放、长周期计息与高标准风控工程。",
    impact: [
      { metric: "loan division", value: "Cashloan + SME Termloan", status: "verified", source: "MariBank" },
      { metric: "banking architecture", value: "distributed consistency & anti-replay", status: "verified", source: "MariBank" },
    ],
    archDiagram: null,
    motionSlot: "act3-ledger-stamp",
    links: [{ label: "Dossier", href: "docs/CAREER_DOSSIER.md" }],
    needsOwner: false,
  },
  {
    id: "N11",
    start: "2024-08",
    end: null,
    org: "Independent",
    role: "Side Projects · Local-First / Vibe Coding",
    codename: "GARAGE-DARKROOM",
    mainLine: "Loan Calculator · Panda Wanderer · Project500",
    summary: "Vibe Coding 全链路：技术方案、UI mock、测试套件直至多环境部署（家用服务器/Cloudflare/Zeabur）。",
    impact: [],
    archDiagram: null,
    motionSlot: "act3-bento-row",
    links: [
      { label: "Loan Calculator", href: "https://loan.brabalawuka.cc" },
      { label: "Panda Wanderer", href: "https://pandawanderer.com/trip-planner" },
      { label: "Project500", href: "https://result500.actoria.top/L0001/fbstxdrzuj" },
    ],
    needsOwner: false,
  },
  {
    id: "N12",
    start: "2024-11",
    end: null,
    org: "WISE",
    role: "Full-Stack Product Engineer",
    codename: "DEFECT-HUNTER",
    mainLine: "AI Workflow Platform + 最后一公里资金核验 + 月省 80k GBP",
    summary: "Payment Defects Group：面对数百种复杂交易 defect，主导设计并落地贯穿 PayOps 运营线的 AI Workflow Platform 与 AI Infra 底座；首批 Onboard 最后一公里资金交易核验匹配场景；端到端保障资金安全、全链路可审计追踪与高精度可观测性；月自动化处理 30k+ cases，准确率 98%+，每月节省 80,000 GBP 人工成本。",
    impact: [
      { metric: "automated volume", value: "30,000+ cases / month", status: "verified", source: "Wise PayOps" },
      { metric: "matching accuracy", value: "98%+", status: "verified", source: "Wise PayOps" },
      { metric: "monthly cost savings", value: "80,000 GBP / month", status: "verified", source: "Wise PayOps" },
      { metric: "enterprise compliance", value: "Security + Auditability + Observability", status: "verified", source: "Wise PayOps" },
    ],
    archDiagram: null,
    motionSlot: "act3-live-cursor",
    links: [{ label: "Dossier", href: "docs/CAREER_DOSSIER.md" }],
    needsOwner: false,
  },
];

export const NARRATIVE_BEATS: NarrativeBeat[] = [
  { act: "Act 0 developing", covers: [], direction: "35mm 负片入水显影 → 主标题；Engineer/Photographer 双轨过滤" },
  { act: "Act 1 bedrock", covers: ["N01", "N02", "N03", "N04", "N05"], direction: "横向慢卷；N03 Bento 大卡 20k/4k 计数器" },
  { act: "Act 2 abyss-heartbeat", covers: ["N06", "N07", "N08"], direction: "N07 安全红警示帧；N08 三轨架构逐层点亮 + 抽屉原文切片" },
  { act: "Act 3 blade-darkroom", covers: ["N09", "N10", "N11", "N12"], direction: "N09 管道粒子流；N11 三卡外链；N12 呼吸进行光标" },
  { act: "Act 4 human", covers: ["N07", "N08", "N09"], direction: "I_hate_IM 金句卡 / 摄影 EXIF 卡 / 羽毛球 50+ 场卡穿插" },
];
