/**
 * BRAWUKA-41 → BRAWUKA-37 数据源：生涯时间轴节点（机器可读）。
 * 人类可读说明见 docs/CAREER_DOSSIER.md。
 * 约束：只收录原文可查事实；无数字不编数字（impact.status === "tbd"）。
 * 文件必须保持 erasable-syntax-only（供 node type-stripping 直接校验）。
 */

interface DossierImpact {
  metric: string;
  value: string;
  status: "verified" | "tbd";
  source: string;
}

interface DossierLink {
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
    role: "Backend Engineer · Overseas Location Platform",
    codename: "LONELY-ATLAS",
    mainLine: "离线 Spark 错峰治理 + Go pprof 调优 + 7×24 高压抗压守望",
    summary: "海外全链路唯一研发：排查近百离线 Spark 任务纠正 CPU/内存配置，消除 12am/2am 扎堆计算引发的资源抢占；针对海量吞吐 Go 服务使用 pprof 优化堆内存与 struct 内存对齐，精调 GC 压降延迟并突破东盟定位精度；面对身心俱疲的 7×24 Oncall 频繁告警，主动归因并重构报警规则彻底消灭告警疲劳；斩获团队 Spot Bonus 与年度 Top E（卓越）评级。",
    impact: [
      { metric: "spot bonus & rating", value: "Spot Bonus + Top E rating", status: "verified", source: "ByteDance Location" },
      { metric: "spark governance", value: "~100 jobs staggered schedule", status: "verified", source: "ByteDance Location" },
      { metric: "go profiling", value: "pprof memory alignment + GC tuning", status: "verified", source: "ByteDance Location" },
      { metric: "oncall resilience", value: "7x24 sole engineer alert de-noising", status: "verified", source: "ByteDance Location" },
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
    role: "Backend Engineer -> Senior Backend Engineer",
    codename: "GLOBAL-HEARTBEAT",
    mainLine: "在线状态引擎 + 正在输入/已读信令时钟对齐 + 多机房同步与冷启修复",
    summary: "独立设计在线状态引擎（5分钟心跳TTL缓存门禁），彻底阻断百万级 QPS 广播写放大风暴；联合优化正在输入与已读回执信令链路，将已读时间戳锚定至消息 ID 解决多机房时钟漂移与时序倒置；协同资深工程师落地 SG/US/EU 多机房多主同步与冷启动会话丢失 Bug 修复；常态维护 20+ Go microservices，入职 1 年即获提拔晋升与 Spot Bonus。",
    impact: [
      { metric: "fan-out mitigation", value: "5-min TTL active cache against multi-million QPS", status: "verified", source: "TikTok IM" },
      { metric: "causality fix", value: "message-id timestamp anchoring across multi-DC", status: "verified", source: "TikTok IM" },
      { metric: "inbox recovery", value: "sub-100ms multi-chat recovery", status: "verified", source: "TikTok IM" },
      { metric: "services maintained", value: "20+ Go microservices", status: "verified", source: "TikTok IM" },
      { metric: "promotion & bonus", value: "promoted in 1 yr + spot bonus", status: "verified", source: "ByteDance" },
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
    role: "Senior Software Engineer (Employee #1 in SG)",
    codename: "COST-BLADE",
    mainLine: "自建日志管线：DaemonSet + Vector + Kafka + ES + 新加坡首位全能员工",
    summary: "新加坡首位员工身兼数职，覆盖后端研发、研究项目协调、商务拓展（BD）与摄影制作；针对云厂商高昂日志开销，独立部署 DaemonSet + Vector + Kafka + Elasticsearch 自建日志采集与检索链路，替换托管方案并大幅压降成本。",
    impact: [
      { metric: "pipeline architecture", value: "DaemonSet + Vector + Kafka + ES", status: "verified", source: "Bondee DevOps" },
      { metric: "role scope", value: "SG employee #1, dev + BD + coordinator", status: "verified", source: "Bondee" },
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
    mainLine: "信贷核心架构：状态机驱动的阶段性强一致与流程最终一致",
    summary: "参与个人消费信贷（Cashloan）与小微企业贷（SME Termloan）核心服务；梳理借贷系统业务与数据流，基于数据库本地事务与状态机驱动实现各阶段强一致，并保障跨服务生命周期的最终一致性。",
    impact: [
      { metric: "loan division", value: "Cashloan + SME Termloan", status: "verified", source: "MariBank" },
      { metric: "consistency model", value: "phase-wise strong consistency via state machines", status: "verified", source: "MariBank" },
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
    role: "Product Engineer 3 (Tech Owner)",
    codename: "DEFECT-HUNTER",
    mainLine: "AI 评估与自动化基建 + 最后一公里对账 + 跨团队流转平台",
    summary: "Regional Platform Team (Payment Defects, Incidents & Tooling)：作为 Tech Owner 规划自动化与工单平台路线图；从 0 到 1 搭建 AI 评估基建，以基准实时监控与第三方 Ops 双盲评审建立准入与审计兜底标准；设计最后一公里资金对账 AI 工作流（99.8% 极高精度，40% 召回率，月处理 30k+ 错账，月省 £80k）；搭建基于 Kafka 的跨团队流转核心与接入 SDK，打通 CS/PayOps/Fraud/KYC 生产链路。",
    impact: [
      { metric: "automated volume", value: "30,000+ cases / month", status: "verified", source: "Wise PayOps" },
      { metric: "matching precision", value: "99.8% precision (40% recall)", status: "verified", source: "Wise PayOps" },
      { metric: "monthly cost savings", value: "80,000 GBP / month", status: "verified", source: "Wise PayOps" },
      { metric: "cross-team corridors", value: "CS <-> PayOps, Fraud -> CS, KYC -> CS", status: "verified", source: "Wise PayOps" },
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
