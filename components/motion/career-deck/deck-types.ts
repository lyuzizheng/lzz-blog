/**
 * Career Deck Stage Types & Specifications
 */

type CareerStageId = "hero" | "wise" | "exploration" | "bytedance";

export interface CareerStageSpec {
  id: CareerStageId;
  index: number;
  actNo: string;
  nameZh: string;
  nameEn: string;
  codename: string;
  period: string;
  org: string;
}

export const CAREER_STAGES: CareerStageSpec[] = [
  {
    id: "hero",
    index: 0,
    actNo: "ACT 00",
    nameZh: "核心综述与行动中枢",
    nameEn: "Mission Control & Hero Statement",
    codename: "ORIGIN-RADAR",
    period: "2017 – PRESENT",
    org: "LZZ ATELIER",
  },
  {
    id: "wise",
    index: 1,
    actNo: "ACT 01",
    nameZh: "Wise · 业务价值与 AI 工作流",
    nameEn: "Wise · Product & AI Workflow",
    codename: "IMPACT-NORTHSTAR",
    period: "2024 – PRESENT",
    org: "WISE",
  },
  {
    id: "exploration",
    index: 2,
    actNo: "ACT 02",
    nameZh: "MariBank + Bondee · 动态探索",
    nameEn: "MariBank + Bondee · Exploration",
    codename: "DYNAMIC-BLADE",
    period: "2023 – 2024",
    org: "MARIBANK · BONDEE",
  },
  {
    id: "bytedance",
    index: 3,
    actNo: "ACT 03",
    nameZh: "ByteDance / TikTok · 架构基石",
    nameEn: "ByteDance / TikTok · Core Foundation",
    codename: "GLOBAL-HEARTBEAT",
    period: "2021 – 2023",
    org: "BYTEDANCE · TIKTOK",
  },
];
