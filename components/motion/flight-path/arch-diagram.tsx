"use client";

import React, { useId, useMemo } from "react";
import { useTheme } from "next-themes";
import { colorTokens, type ThemeMode } from "@/tokens";

/**
 * BRAWUKA-37 · mono-color architecture diagram renderer.
 *
 * Takes the raw `archDiagram` source from lib/career-dossier.ts
 * (mermaid `flowchart LR|TB` subset) and renders it as a deterministic
 * SVG plate pinned to the design-system tokens — the code equivalent of
 * the mermaid `themeVariables` contract:
 *
 *   themeVariables: {
 *     primaryColor: substrate, primaryTextColor: ink-dominant,
 *     lineColor: ink-overprint (#18224B day / #FF5A5A night),
 *     fontFamily: telemetry mono + tabular-nums, halftone substrate dots
 *   }
 *
 * No mermaid runtime is shipped (keeps the timeline at 60fps and avoids
 * a heavy client dependency); the supported subset covers every diagram
 * in docs/CAREER_DOSSIER.md §2 (D-A/D-B/D-C).
 */

export interface ArchMonoTheme {
  inkDominant: string;
  inkAccent: string;
  substrate: string;
  chamber: string;
  overprint: string;
  textPrimary: string;
  textMuted: string;
}

export function archMonoTheme(mode: ThemeMode): ArchMonoTheme {
  const t = colorTokens[mode];
  return {
    inkDominant: t.dominantInk.hex,
    inkAccent: t.accentInk.hex,
    substrate: t.substrate,
    chamber: t.chamber,
    overprint: t.overprint,
    textPrimary: t.text.primary,
    textMuted: t.text.muted,
  };
}

interface ArchNode {
  id: string;
  label: string;
}

interface ArchEdge {
  from: string;
  to: string;
  label: string | null;
  dashed: boolean;
  bidirectional: boolean;
}

interface ParsedDiagram {
  direction: "LR" | "TB";
  nodes: ArchNode[];
  edges: ArchEdge[];
}

const NODE_RE = /(\w+)\[([^\]]+)\]/g;
const ARROW_SPLIT = /(<)?--(?:\|([^|]*)\|)?>/;
const DOTTED_EDGE_RE = /(\w+)(?:\[[^\]]*\])?\s*-\.\s*([A-Za-z+/\s]*?)\s*\.->\s*(\w+)/;
const SEG_ID_RE = /([A-Za-z][\w]*)/;

function segmentId(segment: string): string | null {
  const m = segment.match(SEG_ID_RE);
  return m ? m[1] : null;
}

export function parseArchDiagram(source: string): ParsedDiagram {
  const direction: "LR" | "TB" = /flowchart\s+TB/i.test(source) ? "TB" : "LR";
  const nodeLabels = new Map<string, string>();
  const edges: ArchEdge[] = [];

  const statements = source.split(/[;\n]+/);
  for (const raw of statements) {
    const stmt = raw.trim();
    if (!stmt || /^flowchart\s+\w+/i.test(stmt)) continue;

    NODE_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = NODE_RE.exec(stmt)) !== null) {
      if (!nodeLabels.has(m[1])) nodeLabels.set(m[1], m[2].trim());
    }

    const dotted = stmt.match(DOTTED_EDGE_RE);
    if (dotted) {
      edges.push({
        from: dotted[1],
        to: dotted[3],
        label: dotted[2]?.trim() || null,
        dashed: true,
        bidirectional: false,
      });
      continue;
    }
    if (!stmt.includes("--")) continue;
    // Split chains (A-->G-->S, G<-->O) on every arrow; captures interleave
    // [seg, bidi, label, seg, bidi, label, seg, ...].
    const parts = stmt.split(ARROW_SPLIT);
    for (let k = 0; k + 3 < parts.length; k += 3) {
      const from = segmentId(parts[k] ?? "");
      const to = segmentId(parts[k + 3] ?? "");
      if (!from || !to) continue;
      edges.push({
        from,
        to,
        label: (parts[k + 2] ?? "").trim() || null,
        dashed: false,
        bidirectional: parts[k + 1] === "<",
      });
    }
  }

  // Preserve first-appearance order: nodes from defs first, then edge endpoints.
  const ordered: ArchNode[] = [];
  const seen = new Set<string>();
  const ensure = (id: string): void => {
    if (seen.has(id)) return;
    seen.add(id);
    ordered.push({ id, label: nodeLabels.get(id) ?? id });
  };
  for (const id of nodeLabels.keys()) ensure(id);
  for (const e of edges) {
    ensure(e.from);
    ensure(e.to);
  }
  return { direction, nodes: ordered, edges };
}

/** Longest-path depth from source nodes → column/row assignment. */
function layoutDepths(nodes: ArchNode[], edges: ArchEdge[]): Map<string, number> {
  const depth = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  let changed = true;
  for (let i = 0; i < nodes.length && changed; i++) {
    changed = false;
    for (const e of edges) {
      const next = (depth.get(e.from) ?? 0) + 1;
      if (next > (depth.get(e.to) ?? 0)) {
        depth.set(e.to, next);
        changed = true;
      }
    }
  }
  return depth;
}

const NODE_W = 148;
const NODE_H = 44;
const GAP_X = 56;
const GAP_Y = 54;

export interface ArchDiagramProps {
  source: string;
  title?: string;
  className?: string;
}

export function ArchDiagram({ source, title, className = "" }: ArchDiagramProps) {
  const { theme } = useTheme();
  const mode: ThemeMode = theme === "day" ? "day" : "night";
  const palette = archMonoTheme(mode);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const parsed = useMemo(() => parseArchDiagram(source), [source]);

  // Unparseable source → mono text fallback (never render nothing).
  if (parsed.nodes.length === 0) {
    return (
      <pre
        className={`overflow-x-auto rounded border border-border-plate bg-chamber p-3 font-telemetry text-[11px] leading-relaxed text-secondary tabular-nums ${className}`}
      >
        {source}
      </pre>
    );
  }

  const horizontal = parsed.direction === "LR";
  const depths = layoutDepths(parsed.nodes, parsed.edges);
  const lanes = new Map<number, number>();
  const pos = new Map<string, { x: number; y: number }>();
  for (const n of parsed.nodes) {
    const d = depths.get(n.id) ?? 0;
    const lane = lanes.get(d) ?? 0;
    lanes.set(d, lane + 1);
    pos.set(
      n.id,
      horizontal
        ? { x: d * (NODE_W + GAP_X), y: lane * (NODE_H + GAP_Y) }
        : { x: lane * (NODE_W + GAP_X), y: d * (NODE_H + GAP_Y) },
    );
  }
  const maxX = Math.max(...[...pos.values()].map((p) => p.x)) + NODE_W;
  const maxY = Math.max(...[...pos.values()].map((p) => p.y)) + NODE_H;

  const edgePath = (from: string, to: string): string => {
    const a = pos.get(from);
    const b = pos.get(to);
    if (!a || !b) return "";
    if (horizontal) {
      const x1 = a.x + NODE_W;
      const y1 = a.y + NODE_H / 2;
      const x2 = b.x;
      const y2 = b.y + NODE_H / 2;
      if (y1 === y2) return `M ${x1} ${y1} L ${x2} ${y2}`;
      const midX = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
    }
    const x1 = a.x + NODE_W / 2;
    const y1 = a.y + NODE_H;
    const x2 = b.x + NODE_W / 2;
    const y2 = b.y;
    if (x1 === x2) return `M ${x1} ${y1} L ${x2} ${y2}`;
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  };

  return (
    <figure
      className={`overflow-hidden rounded border border-border-plate bg-substrate ${className}`}
      role="img"
      aria-label={title ?? `Architecture diagram: ${parsed.nodes.length} nodes`}
    >
      <svg
        viewBox={`-8 -8 ${maxX + 16} ${maxY + 16}`}
        className="h-auto w-full"
        fontFamily="var(--font-geist-mono, ui-monospace, monospace)"
      >
        <defs>
          <pattern id={`arch-halftone-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={palette.inkDominant} opacity="0.12" />
          </pattern>
        </defs>
        <rect x="-8" y="-8" width={maxX + 16} height={maxY + 16} fill={`url(#arch-halftone-${uid})`} />
        {parsed.edges.map((e, i) => (
          <g key={`${e.from}-${e.to}-${i}`}>
            <path
              d={edgePath(e.from, e.to)}
              fill="none"
              stroke={palette.overprint}
              strokeWidth="1.5"
              strokeDasharray={e.dashed ? "5 4" : undefined}
              markerEnd={e.bidirectional ? undefined : `url(#arch-arrow-${uid})`}
              markerStart={e.bidirectional ? `url(#arch-arrow-${uid})` : undefined}
              opacity="0.9"
            />
            {e.label ? (
              <text
                x={0}
                y={0}
                fill={palette.textMuted}
                fontSize="9"
                letterSpacing="0.06em"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <textPath href={`#arch-edge-${uid}-${i}`} startOffset="50%" textAnchor="middle">
                  {e.label}
                </textPath>
              </text>
            ) : null}
            <path id={`arch-edge-${uid}-${i}`} d={edgePath(e.from, e.to)} fill="none" stroke="none" />
          </g>
        ))}
        <defs>
          <marker
            id={`arch-arrow-${uid}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={palette.overprint} />
          </marker>
        </defs>
        {parsed.nodes.map((n) => {
          const p = pos.get(n.id);
          if (!p) return null;
          return (
            <g key={n.id}>
              {/* registration-drift plate: 1.5px offset accent underlay */}
              <rect
                x={p.x + 1.5}
                y={p.y + 1.5}
                width={NODE_W}
                height={NODE_H}
                rx="3"
                fill={palette.inkAccent}
                opacity="0.28"
              />
              <rect
                x={p.x}
                y={p.y}
                width={NODE_W}
                height={NODE_H}
                rx="3"
                fill={palette.chamber}
                stroke={palette.inkDominant}
                strokeWidth="1.5"
              />
              <text
                x={p.x + NODE_W / 2}
                y={p.y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={palette.textPrimary}
                fontSize="10.5"
                fontWeight="600"
                letterSpacing="0.02em"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {n.label.length > 22 ? `${n.label.slice(0, 21)}…` : n.label}
              </text>
            </g>
          );
        })}
      </svg>
      {title ? (
        <figcaption className="border-t border-border-plate px-3 py-1.5 font-telemetry text-[10px] tracking-[0.08em] text-muted tabular-nums">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}
