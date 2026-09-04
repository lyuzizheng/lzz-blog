"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { HealthPayload } from "@/lib/health";

function formatClock(date: Date): string {
  return date.toLocaleTimeString("zh-CN", { hour12: false });
}

/**
 * BRAWUKA-54 · Live edge-probe island for `/status`.
 * Polls `/api/health` on mount, ticks a local clock every second,
 * exits on `Escape`. No entrance animation — honors reduced-motion.
 */
export function StatusConsole({ initial }: { initial: HealthPayload }) {
  const router = useRouter();
  const [health, setHealth] = useState<HealthPayload>(initial);
  const [now, setNow] = useState(() => new Date());
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const probe = useCallback(async () => {
    const started = performance.now();
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as HealthPayload;
      setHealth(json);
      setLatencyMs(Math.max(1, Math.round(performance.now() - started)));
    } catch {
      /* probe is best-effort; stale plate stays visible */
    }
  }, []);

  useEffect(() => {
    void probe();
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [probe]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const rows: ReadonlyArray<[string, string]> = [
    ["STATUS", health.status.toUpperCase()],
    ["LOCAL", formatClock(now)],
    ["EDGE TIMESTAMP", health.timestamp],
    ["COMMIT", health.commit],
    ["ENV", health.environment],
    ["POSTS INDEX", `${health.posts_count} PUBLISHED`],
    ["UPTIME", health.uptime],
    ["ROUND-TRIP", latencyMs === null ? "PROBING…" : `${latencyMs} MS`],
  ];

  return (
    <div className="border border-border-plate bg-surface">
      <div className="flex items-center justify-between border-b border-border-plate px-4 py-2.5">
        <span className="flex items-center gap-2 font-telemetry text-[11px] tracking-[0.14em] text-muted">
          <span
            aria-hidden
            className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none"
          />
          <span className="text-emerald-400">OPERATIONAL</span>
        </span>
        <button
          type="button"
          onClick={probe}
          className="font-telemetry text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-primary"
        >
          RE-PROBE ↻
        </button>
      </div>
      <dl className="divide-y divide-border-plate/60 font-telemetry text-xs tabular-nums">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2">
            <dt className="shrink-0 tracking-[0.14em] text-muted">{k}</dt>
            <dd className="truncate text-right text-primary" title={v}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
