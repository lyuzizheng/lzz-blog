/**
 * Career Deck Stage Types & Specifications
 * Reverse chronological order: Wise (2024-Present) -> Exploration (2023-2024) -> ByteDance (2021-2023) -> University & Roots (2017-2021)
 */

export type CareerStageId = "wise" | "exploration" | "bytedance" | "hero";

export interface CareerStageSpec {
  id: CareerStageId;
  index: number;
  actNo: string;
  nameZh: string;
  nameEn: string;
  period: string;
  org: string;
}

export const CAREER_STAGES: CareerStageSpec[] = [
  {
    id: "wise",
    index: 0,
    actNo: "01",
    nameZh: "Wise 核心支付",
    nameEn: "Wise · Payments & AI",
    period: "2024 – PRESENT",
    org: "WISE · IC3",
  },
  {
    id: "exploration",
    index: 1,
    actNo: "02",
    nameZh: "银行信贷与初创",
    nameEn: "MariBank & Bondee",
    period: "2023 – 2024",
    org: "MARIBANK · BONDEE",
  },
  {
    id: "bytedance",
    index: 2,
    actNo: "03",
    nameZh: "字节跳动",
    nameEn: "ByteDance & TikTok",
    period: "2021 – 2023",
    org: "BYTEDANCE · TIKTOK",
  },
  {
    id: "hero",
    index: 3,
    actNo: "04",
    nameZh: "教育与起点",
    nameEn: "NTU & Early Roots",
    period: "2017 – 2021",
    org: "NTU · U-WAVE",
  },
];
