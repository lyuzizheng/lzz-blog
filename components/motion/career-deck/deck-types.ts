/**
 * Career Deck Stage Types & Specifications
 * Sequence:
 *  0. Overview & Intro (Hero)
 *  1. Wise & Payments (2024–Present)
 *  2. MariBank & Bondee (2023–2024)
 *  3. TikTok IM Core & Interactions (2022–2023)
 *  4. ByteDance Location & Infra (2021–2022)
 *  5. NTU & Early Roots (2017–2021)
 */

export type CareerStageId =
  | "hero"
  | "wise"
  | "exploration"
  | "bytedance-im"
  | "bytedance-infra"
  | "education";

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
    id: "hero",
    index: 0,
    actNo: "00",
    nameZh: "个人简介与链接",
    nameEn: "Overview & Bio",
    period: "PRESENT",
    org: "ZIZHENG LYU",
  },
  {
    id: "wise",
    index: 1,
    actNo: "01",
    nameZh: "Wise 核心支付",
    nameEn: "Wise · Payments & AI",
    period: "2024 – PRESENT",
    org: "WISE · IC3",
  },
  {
    id: "exploration",
    index: 2,
    actNo: "02",
    nameZh: "银行信贷与初创",
    nameEn: "MariBank & Bondee",
    period: "2023 – 2024",
    org: "MARIBANK · BONDEE",
  },
  {
    id: "bytedance-im",
    index: 3,
    actNo: "03",
    nameZh: "TikTok 即时通讯",
    nameEn: "TikTok IM & Messaging",
    period: "2022 – 2023",
    org: "TIKTOK · SENIOR SWE",
  },
  {
    id: "bytedance-infra",
    index: 4,
    actNo: "04",
    nameZh: "海外定位与基建",
    nameEn: "Location & Multi-DC",
    period: "2021 – 2022",
    org: "BYTEDANCE · CLOUD",
  },
  {
    id: "education",
    index: 5,
    actNo: "05",
    nameZh: "教育与起点",
    nameEn: "NTU & Early Roots",
    period: "2017 – 2021",
    org: "NTU · U-WAVE",
  },
];
