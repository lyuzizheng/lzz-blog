import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Global/Home OG card: modern engineering atelier aesthetic.
 * Safe for both 1.91:1 banner (Slack, Twitter, Telegram) and 1:1 square crop (WeChat, WhatsApp).
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
          <span style={{ color: "#858C9B" }}>brabalawuka.cc · Singapore</span>
        </div>

        {/* Central Identity Hero Block (Safe for 1:1 Square Thumbnail) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(78, 117, 248, 0.12)",
              border: "1px solid rgba(78, 117, 248, 0.35)",
              borderRadius: "4px",
              padding: "6px 14px",
              fontSize: 18,
              letterSpacing: "0.12em",
              color: "#6B8EF8",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span>Product & Systems Engineer</span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            <span>High Concurrency, Systems & AI</span>
          </div>

          {/* Concise Context Summary */}
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              color: "#C5C9D3",
            }}
          >
            <span>Wise (Tech Owner) · Ex-TikTok IM & Infrastructure · NTU</span>
          </div>
        </div>

        {/* Bottom Capabilities & Links */}
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
            <span>Distributed Systems</span>
            <span style={{ margin: "0 10px" }}>·</span>
            <span>Presence & Messaging</span>
            <span style={{ margin: "0 10px" }}>·</span>
            <span>AI Evaluation</span>
            <span style={{ margin: "0 10px" }}>·</span>
            <span>35mm Darkroom</span>
          </div>
          <span style={{ color: "#4E75F8", fontWeight: 600 }}>Personal Atelier</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
