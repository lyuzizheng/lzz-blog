/**
 * Career Deck Stage Types & Specifications
 * Chronological order: University (2017-2021) -> ByteDance (2021-2023) -> Exploration (2023-2024) -> Wise (2024-Present)
 */

export type CareerStageId = "hero" | "bytedance" | "exploration" | "wise";

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
    actNo: "01",
    nameZh: "大学与初心",
    nameEn: "Origin & U-Wave",
    period: "2017 – 2021",
    org: "NTU · U-WAVE",
  },
  {
    id: "bytedance",
    index: 1,
    actNo: "02",
    nameZh: "字节跳动",
    nameEn: "ByteDance & TikTok",
    period: "2021 – 2023",
    org: "BYTEDANCE · TIKTOK",
  },
  {
    id: "exploration",
    index: 2,
    actNo: "03",
    nameZh: "探索与触礁",
    nameEn: "Exploration & Unbound",
    period: "2023 – 2024",
    org: "BONDEE · MARIBANK",
  },
  {
    id: "wise",
    index: 3,
    actNo: "04",
    nameZh: "Wise 与现在",
    nameEn: "Wise & Northstar",
    period: "2024 – PRESENT",
    org: "WISE",
  },
];
