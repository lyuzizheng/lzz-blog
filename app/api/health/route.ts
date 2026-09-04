import { getHealthPayload } from "@/lib/health";

/**
 * BRAWUKA-54 · Edge readiness probe.
 * Lightweight JSON health check + deploy metadata for DevOps automation
 * and the `/status` darkroom console. Never cached.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const started = performance.now();
  const payload = getHealthPayload();
  const elapsed = Math.max(1, Math.round(performance.now() - started));

  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Server-Timing": `edge;dur=${elapsed}`,
      "X-Edge-Latency-Ms": String(elapsed),
    },
  });
}
