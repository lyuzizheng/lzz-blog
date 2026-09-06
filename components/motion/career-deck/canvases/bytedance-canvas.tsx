import React from "react";

/**
 * Act 3 Thematic Canvas: Global Multi-Datacenter Sync & High-Concurrency Mesh
 *
 * Visualizing ByteDance & TikTok IM foundation infrastructure:
 * - Cross-ocean Multi-Datacenter (SG / US / EU) active-active sync mesh
 * - Long-lived connection WebSocket/gRPC multiplexed stream channels
 * - API Gateway (AGW) routing flow-control matrix & token buckets
 * - Automated Message Loss Troubleshooting & Diagnostic Pipeline
 */
export function BytedanceCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient background wash */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-25 dark:opacity-20 transition-opacity duration-300"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="dc-mesh-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="18" cy="18" r="0.8" fill="var(--ink-faint)" />
          </pattern>
        </defs>

        <rect width="1000" height="800" fill="url(#dc-mesh-grid)" />

        {/* --- Multi-Datacenter Cross-Ocean Sync Mesh (Tri-Region Arc) --- */}
        {/* Sync Arcs connecting SG, US, EU datacenters */}
        <g stroke="var(--ink-dominant)" strokeWidth="1.2" opacity="0.45">
          {/* DC Singapore (SG-1) at (200, 320) */}
          {/* DC US-East (US-1) at (780, 240) */}
          {/* DC EU-Central (EU-1) at (500, 160) */}

          {/* Trans-oceanic connection arcs */}
          <path d="M 200 320 Q 350 180 500 160" strokeDasharray="5 3" />
          <path d="M 500 160 Q 640 160 780 240" strokeDasharray="5 3" />
          <path d="M 200 320 Q 500 380 780 240" strokeWidth="1.5" />

          {/* Bi-directional ms-level sync arrows */}
          <circle cx="340" cy="235" r="3" fill="var(--ink-dominant)" />
          <circle cx="630" cy="190" r="3" fill="var(--ink-dominant)" />
          <circle cx="490" cy="345" r="3" fill="var(--ink-dominant)" />
        </g>

        {/* --- Datacenter Cluster Nodes --- */}
        <g fill="var(--bg-surface)" stroke="var(--ink-dominant)" strokeWidth="1.4" opacity="0.6">
          {/* SG-1 Datacenter */}
          <circle cx="200" cy="320" r="28" />
          <circle cx="200" cy="320" r="18" strokeDasharray="3 2" />

          {/* US-1 Datacenter */}
          <circle cx="780" cy="240" r="28" />
          <circle cx="780" cy="240" r="18" strokeDasharray="3 2" />

          {/* EU-1 Datacenter */}
          <circle cx="500" cy="160" r="24" />
          <circle cx="500" cy="160" r="15" strokeDasharray="3 2" />
        </g>

        {/* Datacenter Labels */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-wider"
          opacity="0.75"
        >
          <text x="165" y="365">DC-SG01 // PRIMARY</text>
          <text x="165" y="378">LATENCY: &lt;1.2MS</text>

          <text x="745" y="285">DC-US01 // CROSS-ACTIVE</text>
          <text x="745" y="298">LATENCY: 68MS SYNC</text>

          <text x="465" y="125">DC-EU01 // ACTIVE</text>
          <text x="465" y="138">LATENCY: 54MS SYNC</text>
        </g>

        {/* --- Lower Region: Message Loss Diagnostic Pipeline (Hours to Seconds) --- */}
        <g stroke="var(--ink-dominant)" strokeWidth="1" opacity="0.4">
          <rect x="80" y="520" width="840" height="180" rx="4" strokeDasharray="3 3" />
          <text
            x="100"
            y="545"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[10px] uppercase tracking-widest font-semibold"
          >
            AUTOMATED MESSAGE LOSS TROUBLESHOOTING ENGINE // DIAGNOSIS IN SECONDS
          </text>

          {/* Pipeline Stage Blocks */}
          {/* Stage 1: Ingestion / Probe */}
          <rect x="110" y="570" width="140" height="60" rx="3" fill="var(--bg-surface)" strokeWidth="1.2" />
          <text x="125" y="595" fill="var(--ink-dominant)" className="font-telemetry text-[8px] uppercase">
            1. INGESTION PROBE
          </text>
          <text x="125" y="612" fill="var(--text-muted)" className="font-telemetry text-[8px]">
            Realtime client ACK trace
          </text>

          {/* Arrow 1 to 2 */}
          <path d="M 250 600 L 290 600" strokeWidth="1.5" />

          {/* Stage 2: Microservice Trace Matrix */}
          <rect x="290" y="570" width="170" height="60" rx="3" fill="var(--bg-surface)" strokeWidth="1.2" />
          <text x="305" y="595" fill="var(--ink-dominant)" className="font-telemetry text-[8px] uppercase">
            2. 20+ GO SVC CORRELATOR
          </text>
          <text x="305" y="612" fill="var(--text-muted)" className="font-telemetry text-[8px]">
            RPC span &amp; sequence diff
          </text>

          {/* Arrow 2 to 3 */}
          <path d="M 460 600 L 500 600" strokeWidth="1.5" />

          {/* Stage 3: Packet Loss Pinpoint */}
          <rect x="500" y="570" width="170" height="60" rx="3" fill="var(--bg-surface)" strokeWidth="1.2" />
          <text x="515" y="595" fill="var(--ink-dominant)" className="font-telemetry text-[8px] uppercase">
            3. LOSS ROOT CAUSE LOCATOR
          </text>
          <text x="515" y="612" fill="var(--text-muted)" className="font-telemetry text-[8px]">
            Network vs Store drop pinpoint
          </text>

          {/* Arrow 3 to 4 */}
          <path d="M 670 600 L 710 600" strokeWidth="1.5" />

          {/* Stage 4: Automated Resolution */}
          <rect x="710" y="570" width="170" height="60" rx="3" fill="var(--bg-surface)" strokeWidth="1.5" />
          <text x="725" y="595" fill="var(--ink-dominant)" className="font-telemetry text-[8px] uppercase font-bold">
            4. INSTANT RESOLUTION
          </text>
          <text x="725" y="612" fill="var(--text-muted)" className="font-telemetry text-[8px]">
            &lt; 5s full stack diagnostics
          </text>
        </g>

        {/* API Gateway (AGW) Rate-Limiter Token Bucket Matrix (Top Right) */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.8" opacity="0.35">
          <circle cx="860" cy="100" r="35" />
          <line x1="825" y1="100" x2="895" y2="100" />
          <line x1="860" y1="65" x2="860" y2="135" />
          <text
            x="810"
            y="150"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[8px] uppercase tracking-wider"
          >
            AGW // TOKEN_BUCKET
          </text>
        </g>

        {/* Global Telemetry Footers */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.65"
        >
          <text x="80" y="735">TIKTOK IM GLOBAL // 20+ GO MICROSERVICES // 7×24 ONCALL MATRIX</text>
          <text x="640" y="735">MULTI-DC ACTIVE-ACTIVE SYNC // SPOT BONUS 2022</text>
        </g>
      </svg>
    </div>
  );
}
