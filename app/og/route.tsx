import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Shared OG card endpoint: /og?title=…&sub=…
 * Per-article cards link here from generateMetadata (a colocated
 * opengraph-image under [...slug] is illegal — catch-all must be last).
 * NOTE: next/og requires explicit display:flex on every multi-child node.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "LZZ Blog";
  const sub = searchParams.get("sub") || siteConfig.description;

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
          <span>{siteConfig.url.replace("https://", "")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", width: 96, height: 6, backgroundColor: "#E54B4B" }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.1 }}>
            <span>{title}</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9BA0AB" }}>
            <span>{sub}</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9BA0AB" }}>
          <span>{siteConfig.author}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
