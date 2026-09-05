import type { Metadata } from "next";
import { DarkroomGallery, PhotographyMasterView } from "@/components/motion/darkroom";

export const metadata: Metadata = {
  title: "摄影全屏地图 · The Darkroom Atlas — LZZ Atelier",
  description:
    "Photographic cartography with visited pins, geodetic EXIF telemetry, and the digital darkroom lightbox on Sony A7M4.",
};

export default function PhotographyPage() {
  return (
    <>
      <PhotographyMasterView initialView="map" />
      <noscript>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <DarkroomGallery />
        </div>
      </noscript>
    </>
  );
}
