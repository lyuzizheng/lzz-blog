import React from "react";

/**
 * Act 2 Thematic Canvas: Cloud-Native K8s Topology & Financial Core Ledger
 *
 * Combining Bondee's cloud-native logging infra and MariBank's banking core:
 * - Kubernetes Pod cluster node topology & DaemonSet disk volume mounts
 * - Vector-to-Kafka streaming data log pipe
 * - Financial double-entry ledger balance scales & distributed lock tokens
 */
export function ExplorationCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at 25% 65%, var(--ink-dominant) 0%, transparent 60%)",
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
            id="exploration-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--ink-faint)"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        <rect width="1000" height="800" fill="url(#exploration-grid)" />

        {/* --- Top Left: K8s Node & Pod Cluster Topology --- */}
        <g stroke="var(--ink-dominant)" strokeWidth="1" opacity="0.4">
          {/* Worker Node 01 Box */}
          <rect x="70" y="80" width="220" height="150" rx="4" strokeDasharray="4 2" />
          <text
            x="85"
            y="102"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[9px] uppercase tracking-wider"
          >
            K8S.NODE.01 // DAEMONSET
          </text>

          {/* Pods inside Node 01 */}
          <rect x="90" y="115" width="45" height="45" rx="2" fill="var(--bg-surface)" opacity="0.6" />
          <rect x="150" y="115" width="45" height="45" rx="2" fill="var(--bg-surface)" opacity="0.6" />
          <rect x="210" y="115" width="45" height="45" rx="2" fill="var(--bg-surface)" opacity="0.6" />

          {/* Vector Agent Pod Mount */}
          <rect x="90" y="175" width="165" height="35" rx="2" fill="var(--bg-surface)" strokeWidth="1.2" />
          <text
            x="110"
            y="196"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[8px] uppercase tracking-wider"
          >
            VECTOR-AGENT (DISK_MOUNT)
          </text>
        </g>

        {/* --- Central Streaming Log Pipeline: Vector -> Kafka Partition Bus --- */}
        <g stroke="var(--ink-dominant)" strokeWidth="1.2" opacity="0.45">
          {/* Stream connection pipe from K8s to Kafka */}
          <path d="M 290 192 L 400 192 L 440 280 L 520 280" />
          <path d="M 290 150 L 360 150 L 420 260 L 520 260" strokeDasharray="3 3" />
          <path d="M 290 220 L 370 220 L 430 300 L 520 300" strokeDasharray="3 3" />

          {/* Kafka Cluster Topic Box */}
          <rect x="520" y="240" width="160" height="90" rx="3" strokeWidth="1.2" />
          <text
            x="535"
            y="262"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[9px] uppercase tracking-wider"
          >
            KAFKA // PARTITIONS [0..7]
          </text>

          {/* Topic Queue Slots */}
          <line x1="535" y1="275" x2="665" y2="275" />
          <line x1="535" y1="290" x2="665" y2="290" />
          <line x1="535" y1="305" x2="665" y2="305" />

          {/* Flow onward to ElasticSearch / Storage */}
          <path d="M 680 285 L 750 285 L 800 240 L 880 240" />
          <circle cx="880" cy="240" r="14" fill="var(--bg-surface)" />
          <text
            x="855"
            y="275"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[8px] uppercase"
          >
            ES_CLUSTER
          </text>
        </g>

        {/* --- Lower Region: Banking Double-Entry Ledger & Anti-Replay Tokens --- */}
        <g stroke="var(--ink-dominant)" strokeWidth="1" opacity="0.38">
          {/* Ledger T-Account Spine */}
          <line x1="200" y1="500" x2="480" y2="500" strokeWidth="1.5" />
          <line x1="340" y1="480" x2="340" y2="700" strokeWidth="1.5" />

          {/* Debit / Credit Columns */}
          <text
            x="240"
            y="494"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[9px] uppercase tracking-widest"
          >
            DEBIT (DR)
          </text>
          <text
            x="380"
            y="494"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[9px] uppercase tracking-widest"
          >
            CREDIT (CR)
          </text>

          {/* Entry lines */}
          <line x1="220" y1="530" x2="320" y2="530" strokeDasharray="3 3" />
          <line x1="220" y1="560" x2="320" y2="560" strokeDasharray="3 3" />
          <line x1="220" y1="590" x2="320" y2="590" strokeDasharray="3 3" />
          <line x1="360" y1="545" x2="460" y2="545" strokeDasharray="3 3" />
          <line x1="360" y1="575" x2="460" y2="575" strokeDasharray="3 3" />
          <line x1="360" y1="605" x2="460" y2="605" strokeDasharray="3 3" />

          {/* Balance Scale Pivot in Bottom Right */}
          <line x1="720" y1="650" x2="880" y2="650" strokeWidth="1.5" />
          <polygon points="800,650 785,690 815,690" fill="var(--bg-surface)" strokeWidth="1.2" />
          <circle cx="720" cy="650" r="18" fill="var(--bg-surface)" />
          <circle cx="880" cy="650" r="18" fill="var(--bg-surface)" />
        </g>

        {/* Distributed Anti-Replay Idempotency Key Lock Ring */}
        <g stroke="var(--ink-dominant)" strokeWidth="0.9" opacity="0.45">
          <circle cx="610" cy="580" r="32" strokeDasharray="4 2" />
          <circle cx="610" cy="580" r="22" />
          <rect x="602" y="572" width="16" height="16" rx="2" fill="var(--bg-surface)" />
          <text
            x="565"
            y="630"
            fill="var(--ink-dominant)"
            className="font-telemetry text-[8px] uppercase tracking-wider"
          >
            IDEMPOTENT_LOCK
          </text>
        </g>

        {/* Technical Annotations */}
        <g
          fill="var(--ink-dominant)"
          className="font-telemetry text-[9px] uppercase tracking-widest"
          opacity="0.65"
        >
          <text x="70" y="55">INFRA_DEV // CLOUD-NATIVE OBSERVABILITY</text>
          <text x="70" y="740">MARIBANK.LOAN_CORE // DISTRIBUTED CONSISTENCY</text>
          <text x="720" y="740">ZERO_DATA_LOSS // SDLC AUDIT</text>
        </g>
      </svg>
    </div>
  );
}
