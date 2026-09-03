import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Home OG card: obsidian substrate, safelight-red rule, editorial serif title.
 * Static (no request input) — generated once at build.
 * NOTE: next/og requires explicit display:flex on every multi-child node.
 */
export default function HomeOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0E11",
          color: "#F4F4F5",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9BA0AB" }}>
          <span>LZZ ATELIER</span>
          <span>DIGITAL DARKROOM 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", width: 96, height: 6, backgroundColor: "#E54B4B" }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
            <span>Physicality meets</span>
            <span>fluid dynamics.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9BA0AB" }}>
            <span>{siteConfig.author} — engineer and visual storyteller.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9BA0AB" }}>
          <span>{siteConfig.url.replace("https://", "")}</span>
          <span>NEXT.JS 15 · LENIS KINETIC</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
