import fs from "node:fs";
import path from "node:path";
import blake3 from "../node_modules/.pnpm/blake3-wasm@2.1.5/node_modules/blake3-wasm/dist/index.js";

const MCP_TOKEN = process.env.CLOUDFLARE_MCP_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
if (!MCP_TOKEN) {
  throw new Error("Missing CLOUDFLARE_MCP_TOKEN or CLOUDFLARE_API_TOKEN environment variable.");
}
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "bf69da5249b63731ad79545d0095e8db";
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || "c1afb3b938aca5fa5629bf940f143a12";
const WORKER_NAME = process.env.CLOUDFLARE_WORKER_NAME || "lzz-blog";

async function callMcp(code) {
  const res = await fetch("https://mcp.cloudflare.com/mcp", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MCP_TOKEN}`,
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
      "X-Account-Id": ACCOUNT_ID
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name: "execute", arguments: { code } }
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`MCP request failed (${res.status}): ${txt}`);
  }

  const text = await res.text();
  for (const line of text.split("\n")) {
    if (line.startsWith("data: ")) {
      const data = JSON.parse(line.slice(6));
      if (data.result?.isError) {
        throw new Error(`MCP tool error: ${JSON.stringify(data.result.content)}`);
      }
      const rawText = data.result?.content?.[0]?.text;
      if (!rawText) return null;
      try {
        return JSON.parse(rawText);
      } catch {
        return rawText;
      }
    }
  }
  throw new Error("No data line in MCP response");
}

function hashFile(filepath) {
  const contents = fs.readFileSync(filepath);
  const base64Contents = contents.toString("base64");
  const extension = path.extname(filepath).substring(1);
  return blake3.hash(base64Contents + extension).toString("hex").slice(0, 32);
}

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "_headers" || file === "_redirects" || file === ".assetsignore") {
      continue;
    }
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, baseDir));
    } else {
      const relPath = "/" + path.relative(baseDir, filePath).replace(/\\/g, "/");
      results.push({ relPath, filePath, size: stat.size });
    }
  }
  return results;
}

async function main() {
  console.log("==================================================");
  console.log("🚀 Starting Cloudflare Edge Production Deployment");
  console.log(`   Worker: ${WORKER_NAME} | Account: ${ACCOUNT_ID}`);
  console.log("==================================================");

  // 1. Build Asset Manifest
  console.log("\n📦 Phase 1: Scanning static assets (.open-next/assets)...");
  const assetsDir = ".open-next/assets";
  if (!fs.existsSync(assetsDir)) {
    throw new Error(`Assets directory ${assetsDir} not found. Run pnpm build:worker first.`);
  }

  const allFiles = getAllFiles(assetsDir);
  const manifest = {};
  const fileByHash = {};
  let totalBytes = 0;

  for (const f of allFiles) {
    const h = hashFile(f.filePath);
    manifest[f.relPath] = { hash: h, size: f.size };
    fileByHash[h] = f;
    totalBytes += f.size;
  }

  console.log(`   Total assets: ${allFiles.length} files (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);

  // 2. Initialize Assets Upload Session
  console.log("\n🔑 Phase 2: Creating Assets Upload Session via Cloudflare MCP...");
  const sessionCode = `async () => {
    return cloudflare.request({
      method: "POST",
      path: "/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}/assets-upload-session",
      body: ${JSON.stringify({ manifest })}
    });
  }`;

  const sessionRes = await callMcp(sessionCode);
  if (!sessionRes.success) {
    throw new Error(`Failed to create assets upload session: ${JSON.stringify(sessionRes.errors)}`);
  }

  const jwt = sessionRes.result.jwt;
  const buckets = sessionRes.result.buckets || [];
  const filesToUpload = buckets.reduce((acc, b) => acc + b.length, 0);
  console.log(`   Session JWT obtained. Missing files to upload: ${filesToUpload} in ${buckets.length} buckets.`);

  // 3. Upload Missing Asset Buckets
  if (buckets.length > 0) {
    console.log("\n📤 Phase 3: Uploading assets to Cloudflare Workers Static Assets...");
    let uploadedCount = 0;
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const formData = new FormData();
      for (const hash of bucket) {
        const fileInfo = fileByHash[hash];
        const fileBuf = fs.readFileSync(fileInfo.filePath);
        const base64Str = fileBuf.toString("base64");
        formData.append(hash, new Blob([base64Str], { type: "application/null" }), hash);
      }

      console.log(`   Uploading bucket ${i + 1}/${buckets.length} (${bucket.length} files)...`);
      const uploadRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/assets/upload?base64=true`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          body: formData
        }
      );

      if (!uploadRes.ok && uploadRes.status !== 202) {
        const errText = await uploadRes.text();
        throw new Error(`Bucket upload ${i + 1} failed (${uploadRes.status}): ${errText}`);
      }
      uploadedCount += bucket.length;
      console.log(`   ✅ Bucket ${i + 1}/${buckets.length} uploaded successfully (${uploadedCount}/${filesToUpload} files).`);
    }
  } else {
    console.log("\n📤 Phase 3: All assets already cached on Cloudflare edge. Skipping upload.");
  }

  // 4. Upload Worker Script with Assets Binding & Observability
  console.log("\n⚙️  Phase 4: Deploying Next.js 15 Worker script (.open-next/worker.js)...");
  const workerPath = ".open-next/worker.js";
  if (!fs.existsSync(workerPath)) {
    throw new Error(`Worker script ${workerPath} not found. Run pnpm build:worker first.`);
  }
  const workerCode = fs.readFileSync(workerPath, "utf-8");

  const headersPath = path.join(assetsDir, "_headers");
  const headersContent = fs.existsSync(headersPath) ? fs.readFileSync(headersPath, "utf-8") : undefined;
  const redirectsPath = path.join(assetsDir, "_redirects");
  const redirectsContent = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, "utf-8") : undefined;

  const metadata = {
    main_module: "worker.js",
    compatibility_date: "2026-09-04",
    compatibility_flags: ["nodejs_compat"],
    assets: {
      jwt: jwt,
      config: {
        ...(headersContent ? { _headers: headersContent } : {}),
        ...(redirectsContent ? { _redirects: redirectsContent } : {})
      }
    },
    bindings: [
      {
        type: "assets",
        name: "ASSETS"
      }
    ],
    cache: {
      enabled: true
    },
    cache_options: {
      enabled: true
    },
    observability: {
      enabled: true
    }
  };

  const boundary = `----WranglerUploadBoundary${Date.now()}`;
  const multipartBody = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="metadata"',
    'Content-Type: application/json',
    '',
    JSON.stringify(metadata),
    `--${boundary}`,
    'Content-Disposition: form-data; name="worker.js"; filename="worker.js"',
    'Content-Type: application/javascript+module',
    '',
    workerCode,
    `--${boundary}--`
  ].join("\r\n");

  const deployCode = `async () => {
    return cloudflare.request({
      method: "PUT",
      path: "/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}",
      body: ${JSON.stringify(multipartBody)},
      contentType: ${JSON.stringify(`multipart/form-data; boundary=${boundary}`)},
      rawBody: true
    });
  }`;

  const deployRes = await callMcp(deployCode);
  if (!deployRes.success) {
    throw new Error(`Failed to deploy worker: ${JSON.stringify(deployRes.errors)}`);
  }
  console.log(`   ✅ Worker ${WORKER_NAME} successfully deployed!`);
  console.log(`      Deployment ID: ${deployRes.result?.deployment_id || "N/A"} | Modified: ${deployRes.result?.modified_on}`);

  // 5. Domain Cutover & Custom Domain Binding
  console.log("\n🌐 Phase 5: Executing Domain Cutover for brabalawuka.cc...");

  // Check and detach from Pages if needed
  try {
    const pagesDomainsRes = await callMcp(`async () => {
      return cloudflare.request({
        method: "GET",
        path: "/accounts/${ACCOUNT_ID}/pages/projects/${WORKER_NAME}/domains"
      });
    }`);

    if (pagesDomainsRes?.success && Array.isArray(pagesDomainsRes.result)) {
      const hasApex = pagesDomainsRes.result.some(d => d.name === "brabalawuka.cc");
      if (hasApex) {
        console.log("   Detaching brabalawuka.cc from old Pages project...");
        await callMcp(`async () => {
          return cloudflare.request({
            method: "DELETE",
            path: "/accounts/${ACCOUNT_ID}/pages/projects/${WORKER_NAME}/domains/brabalawuka.cc"
          });
        }`);
        console.log("   ✅ Detached brabalawuka.cc from Pages.");
      }
    }
  } catch (err) {
    console.warn("   Notice on Pages domain check:", err.message);
  }

  // Attach brabalawuka.cc to Worker
  console.log("   Attaching brabalawuka.cc apex to Worker...");
  const apexAttachRes = await callMcp(`async () => {
    return cloudflare.request({
      method: "PUT",
      path: "/accounts/${ACCOUNT_ID}/workers/domains",
      body: {
        hostname: "brabalawuka.cc",
        service: "${WORKER_NAME}",
        zone_id: "${ZONE_ID}"
      }
    });
  }`);
  if (apexAttachRes?.success) {
    console.log("   ✅ brabalawuka.cc attached to Worker successfully!");
  } else {
    const errStr = JSON.stringify(apexAttachRes);
    console.warn("   ⚠️  Apex attach notice:", errStr);
    if (errStr.includes("100117") || errStr.includes("externally managed DNS records")) {
      console.warn("   💡 ACTION REQUIRED for DevOps / Zone Admin: An obsolete CNAME/A record exists for apex brabalawuka.cc.");
      console.warn("      Delete the stale DNS record in Cloudflare Dashboard (Zone brabalawuka.cc -> DNS) to allow Worker custom domain binding.");
    }
  }

  // Attach www.brabalawuka.cc to Worker
  console.log("   Attaching www.brabalawuka.cc subdomain to Worker...");
  const wwwAttachRes = await callMcp(`async () => {
    return cloudflare.request({
      method: "PUT",
      path: "/accounts/${ACCOUNT_ID}/workers/domains",
      body: {
        hostname: "www.brabalawuka.cc",
        service: "${WORKER_NAME}",
        zone_id: "${ZONE_ID}"
      }
    });
  }`);
  if (wwwAttachRes?.success) {
    console.log("   ✅ www.brabalawuka.cc attached to Worker successfully!");
  } else {
    console.log("   WWW attach result:", JSON.stringify(wwwAttachRes));
  }

  // Ensure workers.dev subdomain is enabled
  console.log("   Ensuring workers.dev subdomain route is active...");
  await callMcp(`async () => {
    return cloudflare.request({
      method: "POST",
      path: "/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}/subdomain",
      body: { enabled: true }
    });
  }`);
  console.log("   ✅ workers.dev subdomain route confirmed active!");

  console.log("\n==================================================");
  console.log("🎉 Production Deployment & Domain Cutover Complete!");
  console.log("==================================================");
}

main().catch(err => {
  console.error("\n❌ Deployment failed:", err);
  process.exit(1);
});
