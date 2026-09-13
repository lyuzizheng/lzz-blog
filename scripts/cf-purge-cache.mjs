#!/usr/bin/env node
/**
 * BRAWUKA-271 · Post-deploy CDN cache purge.
 *
 * OpenNext serves prerendered HTML with `s-maxage=31536000`, which is correct
 * for ISR but means the Cloudflare edge cache survives `wrangler deploy` —
 * users keep getting the previous build's HTML (stale chunk hashes, stale
 * inline scripts) until the entry expires or is manually purged. Observed in
 * production: `/` served the pre-deploy build while `/posts` was fresh.
 *
 * This script runs after `opennextjs-cloudflare deploy` in CI and purges the
 * whole zone (`purge_everything`). Prefix/file-list purges can't cover
 * content-hashed `_next/static` assets whose names change per build, and a
 * full purge is cheap for a personal blog: immutable assets simply re-cache
 * on next request.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN  — already in CI secrets (needs Zone.Cache Purge)
 *   CLOUDFLARE_ZONE_ID    — optional; resolved from the hostname if absent
 *   SITE_HOSTNAME         — defaults to www.brabalawuka.cc
 */

const HOSTNAME = process.env.SITE_HOSTNAME || "www.brabalawuka.cc";
const ZONE_NAME = HOSTNAME.replace(/^www\./, "");
const API = "https://api.cloudflare.com/client/v4";

async function cfFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    const errs = (body.errors || []).map((e) => `${e.code}: ${e.message}`).join("; ");
    throw new Error(`Cloudflare API ${path} failed (${res.status}): ${errs || res.statusText}`);
  }
  return body;
}

async function resolveZoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID;
  const body = await cfFetch(`/zones?name=${encodeURIComponent(ZONE_NAME)}&status=active`);
  const zone = body.result?.[0];
  if (!zone?.id) throw new Error(`Zone not found for ${ZONE_NAME}`);
  return zone.id;
}

async function main() {
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.warn("CLOUDFLARE_API_TOKEN not set — skipping CDN purge (local run).");
    return;
  }

  const zoneId = await resolveZoneId();
  const body = await cfFetch(`/zones/${zoneId}/purge_cache`, {
    method: "POST",
    body: JSON.stringify({ purge_everything: true }),
  });
  console.log(`Purged all edge cache for ${ZONE_NAME} (zone ${zoneId}):`, body.result?.id || "ok");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
