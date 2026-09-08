import type { Metadata } from "next";
import { WeeklyRecords } from "@/components/weekly-records";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Weekly Records — LZZ Atelier",
  description:
    "A public-safe timeline of Zizheng Lyu's weekly personal and professional records.",
  alternates: {
    canonical: `${siteConfig.url}/weekly-records`,
  },
  openGraph: {
    title: "Weekly Records — LZZ Atelier",
    description:
      "A public-safe timeline of Zizheng Lyu's weekly personal and professional records.",
    url: `${siteConfig.url}/weekly-records`,
    siteName: siteConfig.name,
    locale: "en_SG",
    type: "website",
  },
};

export default function WeeklyRecordsPage() {
  return <WeeklyRecords />;
}
