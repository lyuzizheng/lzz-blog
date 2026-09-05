import type { Metadata } from "next";
import { DarkroomGallery, PhotographyHeader } from "@/components/motion/darkroom";
import { SiteHeader, SiteFooter } from "@/components/site";
export const metadata: Metadata = {
  title: "摄影暗房 · The Darkroom — LZZ Atelier",
  description:
    "Photographs on Sony A7M4. Fluid masonry, film reel, and immersive views with mechanical EXIF telemetry and mono-color ink modes.",
};

export default function PhotographyPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <PhotographyHeader />

        <DarkroomGallery />
      </main>

      <SiteFooter variant="darkroom" />
    </div>
  );
}
