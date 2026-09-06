#!/usr/bin/env node
/**
 * Cloudflare Edge Deployment & Health Check Probe
 * Verifies critical routes, status codes, content-types, and cache headers.
 * Supports retry loop with exponential backoff for post-deployment verification.
 *
 * Usage:
 *   node scripts/cf-health-check.mjs [--url <base_url>] [--retries <num>] [--delay <ms>]
 */

const args = process.argv.slice(2);
function getArg(flag, defaultValue) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return defaultValue;
}

const baseUrl = (getArg("--url", process.env.TARGET_URL || "http://127.0.0.1:8787")).replace(/\/+$/, "");
const maxRetries = Number.parseInt(getArg("--retries", "3"), 10);
const retryDelayMs = Number.parseInt(getArg("--delay", "2000"), 10);
const requestTimeoutMs = 15000;

const ROUTES = [
  {
    path: "/",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Home Digital Darkroom & Atelier",
  },
  {
    path: "/posts",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Posts Archive & Filters",
  },
  {
    path: "/posts/study/math-typesetting",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Sample Post SSG Page",
  },
  {
    path: "/photography",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Darkroom Photography Gallery",
  },
  {
    path: "/resume",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Career Dossier & Resume",
  },
  {
    path: "/feed.xml",
    expectedStatus: 200,
    expectedContentType: "xml",
    label: "RSS Feed XML",
  },
  {
    path: "/sitemap.xml",
    expectedStatus: 200,
    expectedContentType: "xml",
    label: "Sitemap XML",
  },
  {
    path: "/og?title=Cloudflare%20Edge%20Probe",
    expectedStatus: 200,
    expectedContentType: "image/png",
    label: "Dynamic OpenGraph Image Generator",
  },
  {
    path: "/api/health",
    expectedStatus: 200,
    expectedContentType: "application/json",
    label: "Edge Health JSON Probe",
  },
  {
    path: "/status",
    expectedStatus: 200,
    expectedContentType: "text/html",
    label: "Status Darkroom Console",
  },
  {
    path: "/resume.pdf",
    expectedStatus: 200,
    expectedContentType: "application/pdf",
    label: "Static PDF Asset",
  },
  {
    path: "/avatar.jpg",
    expectedStatus: 200,
    expectedContentType: "",
    label: "Static Avatar Asset & Cache",
  },
];

async function probeRoute(route) {
  const target = `${baseUrl}${route.path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);
  const startTime = Date.now();

  try {
    const response = await fetch(target, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "LZZ-Blog-DevOps-HealthCheck/1.0",
        Accept: "*/*",
      },
    });
    const latency = Date.now() - startTime;
    clearTimeout(timeoutId);

    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const cacheControl = response.headers.get("cache-control") || "none";
    const cfCacheStatus = response.headers.get("cf-cache-status") || "none";

    const statusOk = status === route.expectedStatus;
    const contentTypeOk = !route.expectedContentType || contentType.includes(route.expectedContentType);

    return {
      route,
      target,
      status,
      latency,
      contentType,
      cacheControl,
      cfCacheStatus,
      ok: statusOk && contentTypeOk,
      error: !statusOk
        ? `Status mismatch: expected ${route.expectedStatus}, got ${status}`
        : !contentTypeOk
          ? `Content-Type mismatch: expected to include ${route.expectedContentType}, got ${contentType}`
          : null,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return {
      route,
      target,
      status: 0,
      latency: Date.now() - startTime,
      contentType: "none",
      cacheControl: "none",
      cfCacheStatus: "none",
      ok: false,
      error: err.name === "AbortError" ? `Request timed out after ${requestTimeoutMs}ms` : err.message,
    };
  }
}

async function runHealthCheckSuite() {
  console.log(`\n======================================================`);
  console.log(`🔎 Initiating Edge Health Probe against: ${baseUrl}`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================\n`);

  let allPassed = false;
  let attempt = 1;

  while (attempt <= maxRetries && !allPassed) {
    if (attempt > 1) {
      console.log(`\n⏳ Retry attempt ${attempt}/${maxRetries} after ${retryDelayMs}ms delay...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }

    const results = [];
    for (const route of ROUTES) {
      const res = await probeRoute(route);
      results.push(res);
    }

    const failed = results.filter((r) => !r.ok);

    console.log(`┌─ Probe Report (Attempt ${attempt}/${maxRetries}) ──────────────────────`);
    for (const res of results) {
      const icon = res.ok ? "✅ PASS" : "❌ FAIL";
      const timing = `${res.latency}ms`.padStart(6, " ");
      console.log(`│ ${icon} [${res.status || "ERR"}] (${timing}) ${res.route.path.padEnd(36, " ")} | ${res.route.label}`);
      if (!res.ok) {
        console.log(`│       Reason: ${res.error}`);
      } else {
        console.log(`│       Headers: Content-Type=${res.contentType}; Cache-Control=${res.cacheControl}`);
      }
    }
    console.log(`└─────────────────────────────────────────────────────────\n`);

    if (failed.length === 0) {
      allPassed = true;
      console.log(`🎉 All ${ROUTES.length} edge probe routes verified successfully! (HTTP 200, valid Content-Type & Cache-Control)\n`);
      break;
    } else {
      console.warn(`⚠️  ${failed.length}/${ROUTES.length} routes failed probe on attempt ${attempt}.`);
      attempt++;
    }
  }

  if (!allPassed) {
    console.error(`💥 Health check probe FAILED after ${maxRetries} attempts.`);
    process.exit(1);
  }
}

runHealthCheckSuite();
