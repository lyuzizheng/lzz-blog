import React from "react";

/**
 * Act 1 Thematic Canvas: AI Decision Matrix & Global Clearing Topology
 *
 * Visualizing the PayOps AI Workflow Platform:
 * - Decision Tree Graph with confidence scores
 * - Cross-border multi-currency settlement clearing topology
 * - Cryptographic audit trail and verification checkpoints
 */
export function WiseCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient background wash */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, var(--ink-dominant) 0%, transparent 65%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="wise-dot-matrix"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.8" fill="var(--ink-faint)" />
          </pattern>
        </defs>

        <rect width="1000" height="800" fill="url(#wise-dot-matrix)" />

        {/* --- Decision Tree Flow Lines (Left to Right Flow) --- */}
        <g stroke="var(--ink-dominant)" strokeWidth="1" opacity="0.35">
          {/* Root Defect Ingestion Stream */}
          <path d="M 60 400 L 140 400 L 220 300" />
          <path d="M 140 400 L 220 500" />
          <path d="M 140 400 L 220 400" />

          {/* Layer 1 to Layer 2 Branching */}
          <path d="M 220 300 L 340 220" />
          <path d="M 220 300 L 340 330" />
          <path d="M 220 400 L 340 400" />
          <path d="M 220 500 L 340 470" />
          <path d="M 220 500 L 340 580" />

          {/* Layer 2 to AI Classifier Ensemble */}
          <path d="M 340 220 L 480 260" strokeDasharray="3 3" />
          <path d="M 340 330 L 480 340" />
          <path d="M 340 400 L 480 400" />
          <path d="M 340 470 L 480 460" />
          <path d="M 340 580 L 480 540" strokeDasharray="3 3" />

          {/* Layer 3 to High-Confidence Last-Mile Linking */}
          <path d="M 480 340 L 640 370" />
          <path d="M 480 400 L 640 400" strokeWidth="1.5" />
          <path d="M 480 460 L 640 430" />

          {/* Settled Automated Clearing */}
          <path d="M 640 400 L 780 400 L 860 360" />
          <path d="M 780 400 L 860 440" />
          <path d="M 860 360 L 940 360" />
          <path d="M 860 440 L 940 440" />
        </g>

        {/* --- Decision Tree Nodes & Badges --- */}
        <g fill="var(--bg-surface)" stroke="var(--ink-dominant)" strokeWidth="1.2" opacity="0.6">
          {/* Root node */}
          <circle cx="140" cy="400" r="10" />
          {/* Layer 1 nodes */}
          <circle cx="220" cy="300" r="7" />
          <circle cx="220" cy="400" r="8" />
          <circle cx="220" cy="500" r="7" />
          {/* Layer 2 nodes */}
          <circle cx="340" cy="220" r="6" />
          <circle cx="340" cy="330" r="7" />
          <circle cx="340" cy="400" r="8" />
          <circle cx="340" cy="470" r="7" />
          <circle cx="340" cy="580" r="6" />
          {/* AI Workflow Orchestrator (Diamond Hub) */}
          <polygon points="480,380 500,400 480,420 460,400" strokeWidth="1.5" />
          {/* Last-mile Verification Gate */}
          <rect x="625" y="385" width="30" height="30" rx="3" strokeWidth="1.4" />
          {/* Output Settled Nodes */}
          <circle cx="860" cy="360" r="8" />
          <circle cx="860" cy="440" r="8" />
        </g>

        {/* Multi-Currency Cross-Border Clearing Rings in upper corner */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.8" opacity="0.3">
          <circle cx="820" cy="160" r="45" strokeDasharray="4 3" />
          <circle cx="820" cy="160" r="65" />
          <line x1="755" y1="160" x2="885" y2="160" strokeDasharray="2 4" />
          <line x1="820" y1="95" x2="820" y2="225" strokeDasharray="2 4" />
        </g>

        {/* Audit Verification Chain Barcode / Telemetry (Bottom Right) */}
        <g stroke="var(--ink-dominant)" strokeWidth="1" opacity="0.45">
          <line x1="760" y1="670" x2="760" y2="720" strokeWidth="2" />
          <line x1="766" y1="670" x2="766" y2="720" strokeWidth="1" />
          <line x1="772" y1="670" x2="772" y2="720" strokeWidth="3" />
          <line x1="780" y1="670" x2="780" y2="720" strokeWidth="1" />
          <line x1="786" y1="670" x2="786" y2="720" strokeWidth="2" />
          <line x1="794" y1="670" x2="794" y2="720" strokeWidth="1.5" />
          <line x1="802" y1="670" x2="802" y2="720" strokeWidth="3.5" />
          <line x1="812" y1="670" x2="812" y2="720" strokeWidth="1" />
          <line x1="820" y1="670" x2="820" y2="720" strokeWidth="2" />
        </g>

        {/* Technical Text Labels */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.65"
        >
          <text x="60" y="385">INGEST // DEFECT_STREAM</text>
          <text x="220" y="280">TRIAGE.L1</text>
          <text x="460" y="365">AI_INFRA // INFERENCE</text>
          <text x="615" y="375">LAST_MILE_LINK</text>
          <text x="860" y="340">CLEAR // GBP</text>
          <text x="860" y="468">CLEAR // MULTI_CCY</text>
          <text x="760" y="155">SETTLEMENT_ROUTING</text>
          <text x="760" y="172">GBP · EUR · USD · SGD</text>
          <text x="760" y="736">AUDIT_TOKEN: SHA-256 // VERIFIED_98%+</text>
          <text x="60" y="730">COST_BENEFIT: £80,000 / MO SAVINGS (ANNUALIZED ~£1.0M)</text>
        </g>
      </svg>
    </div>
  );
}
