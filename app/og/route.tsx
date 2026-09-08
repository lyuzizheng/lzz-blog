import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Shared OG card endpoint: /og?title=…&sub=…
 * High-signal dynamic card for individual blog posts and special views.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.name;
  const sub = searchParams.get("sub") || "Systems, Products & Stories";

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
          padding: "60px 72px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.1em",
            color: "#9BA0AB",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#FFFFFF" }}>LYU ZIZHENG</span>
            <span style={{ margin: "0 10px", color: "#4E75F8" }}>·</span>
            <span>吕子正</span>
          </div>
          <span style={{ color: "#858C9B" }}>brabalawuka.cc</span>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(224, 84, 84, 0.12)",
              border: "1px solid rgba(224, 84, 84, 0.35)",
              borderRadius: "4px",
              padding: "5px 12px",
              fontSize: 16,
              letterSpacing: "0.14em",
              color: "#E05454",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span>ENGINEERING ESSAY</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              marginBottom: 16,
              maxWidth: "1020px",
            }}
          >
            <span>{title}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.4,
              color: "#9BA0AB",
            }}
          >
            <span>{sub}</span>
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            borderTop: "1px solid #232733",
            paddingTop: 24,
            color: "#858C9B",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Wise Product Engineer</span>
            <span style={{ margin: "0 10px" }}>·</span>
            <span>Ex-TikTok IM</span>
            <span style={{ margin: "0 10px" }}>·</span>
            <span>Distributed Systems</span>
          </div>
          <span style={{ color: "#4E75F8", fontWeight: 600 }}>Read Article →</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
