import http from "node:http";
import https from "node:https";

const MCP_TOKEN = process.env.CLOUDFLARE_MCP_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
if (!MCP_TOKEN) {
  throw new Error("Missing CLOUDFLARE_MCP_TOKEN or CLOUDFLARE_API_TOKEN environment variable.");
}
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "bf69da5249b63731ad79545d0095e8db";

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
    throw new Error(`MCP HTTP error (${res.status}): ${txt}`);
  }

  const text = await res.text();
  for (const line of text.split("\n")) {
    if (line.startsWith("data: ")) {
      const data = JSON.parse(line.slice(6));
      if (data.result?.isError) {
        throw new Error(data.result.content?.[0]?.text || "MCP error");
      }
      const rawText = data.result?.content?.[0]?.text;
      return JSON.parse(rawText);
    }
  }
}

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(`[PROXY] ${method} ${url}`);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const bodyBuffer = Buffer.concat(chunks);
  const contentType = req.headers["content-type"] || "";

  // 1. Mock endpoints for user and accounts verification
  if (url.includes("/user/tokens/verify") || url === "/client/v4/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      success: true,
      errors: [],
      messages: [],
      result: { id: "user-123", email: "lyuzizheng@gmail.com" }
    }));
  }

  if (url.startsWith("/client/v4/accounts?page=") || url === "/client/v4/accounts") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      success: true,
      errors: [],
      messages: [],
      result: [{ id: ACCOUNT_ID, name: "Lyuzizheng@gmail.com Account" }]
    }));
  }

  if (url.includes("/memberships")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      success: true,
      errors: [],
      messages: [],
      result: [{ id: "m1", account: { id: ACCOUNT_ID, name: "Lyuzizheng@gmail.com Account" }, role: "admin", status: "accepted" }]
    }));
  }

  // 2. Direct assets upload (uses JWT Bearer token directly with api.cloudflare.com)
  if (url.includes("/workers/assets/upload") || url.includes("/pages/assets/upload")) {
    console.log(`[PROXY] Forwarding asset upload to api.cloudflare.com directly...`);
    const fReq = https.request(`https://api.cloudflare.com${url}`, {
      method,
      headers: {
        ...req.headers,
        host: "api.cloudflare.com"
      }
    }, (fRes) => {
      res.writeHead(fRes.statusCode, fRes.headers);
      fRes.pipe(res);
    });
    fReq.write(bodyBuffer);
    fReq.end();
    return;
  }

  // 3. Forward all other Cloudflare API requests via MCP execute
  try {
    const cfPath = url.replace(/^\/client\/v4/, "");
    let code;

    if (bodyBuffer.length > 0) {
      if (contentType.includes("multipart/form-data")) {
        const b64 = bodyBuffer.toString("base64");
        code = `async () => {
          const binary = atob(${JSON.stringify(b64)});
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          return cloudflare.request({
            method: ${JSON.stringify(method)},
            path: ${JSON.stringify(cfPath)},
            body: bytes,
            contentType: ${JSON.stringify(contentType)},
            rawBody: true
          });
        }`;
      } else if (contentType.includes("application/json")) {
        try {
          const parsed = JSON.parse(bodyBuffer.toString("utf-8"));
          code = `async () => {
            return cloudflare.request({
              method: ${JSON.stringify(method)},
              path: ${JSON.stringify(cfPath)},
              body: ${JSON.stringify(parsed)}
            });
          }`;
        } catch {
          code = `async () => {
            return cloudflare.request({
              method: ${JSON.stringify(method)},
              path: ${JSON.stringify(cfPath)},
              body: ${JSON.stringify(bodyBuffer.toString("utf-8"))},
              contentType: ${JSON.stringify(contentType)},
              rawBody: true
            });
          }`;
        }
      } else {
        code = `async () => {
          return cloudflare.request({
            method: ${JSON.stringify(method)},
            path: ${JSON.stringify(cfPath)},
            body: ${JSON.stringify(bodyBuffer.toString("utf-8"))},
            contentType: ${JSON.stringify(contentType)},
            rawBody: true
          });
        }`;
      }
    } else {
      code = `async () => {
        return cloudflare.request({
          method: ${JSON.stringify(method)},
          path: ${JSON.stringify(cfPath)}
        });
      }`;
    }

    const mcpRes = await callMcp(code);
    const status = mcpRes?.status || (mcpRes?.success ? 200 : 400);
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mcpRes));
  } catch (err) {
    console.error(`[PROXY ERROR] ${method} ${url}:`, err.message);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      success: false,
      errors: [{ code: 500, message: err.message }],
      messages: []
    }));
  }
});

server.listen(9099, "127.0.0.1", () => {
  console.log("CF Bridge Proxy running on http://127.0.0.1:9099");
});
