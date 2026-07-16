import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, "tests", "legacy-route-manifest.json");
const outputDir = path.resolve(repoRoot, process.argv[2] || process.env.BUILD_DIR || "dist");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function routeToFile(routePath) {
  const normalized = routePath.startsWith("/") ? routePath.slice(1) : routePath;

  if (normalized === "") {
    return path.join(outputDir, "index.html");
  }

  if (routePath.endsWith("/")) {
    return path.join(outputDir, normalized, "index.html");
  }

  const ext = path.extname(normalized);
  if (ext) {
    return path.join(outputDir, normalized);
  }

  return path.join(outputDir, normalized, "index.html");
}

function exists(routePath) {
  return fs.existsSync(routeToFile(routePath));
}

function readRouteHtml(routePath) {
  const filePath = routeToFile(routePath);
  if (!fs.existsSync(filePath) || path.extname(filePath) !== ".html") {
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function htmlMentionsTarget(html, targetPath) {
  if (!html || !targetPath) {
    return false;
  }

  const escapedTarget = targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const redirectPatterns = [
    new RegExp(`<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=${escapedTarget}["']`, "i"),
    new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']*${escapedTarget}["']`, "i"),
    new RegExp(`location\\.(?:href|replace|assign)\\(["'][^"']*${escapedTarget}["']\\)`, "i")
  ];

  return redirectPatterns.some((pattern) => pattern.test(html));
}

function classifyRoute(route) {
  const legacyExists = exists(route.legacyPath);
  const targetExists = exists(route.targetPath);

  if (route.type === "asset" && legacyExists) {
    return { ok: true, status: "asset", detail: route.legacyPath };
  }

  if (legacyExists && route.legacyPath === route.targetPath) {
    return { ok: true, status: "page", detail: route.legacyPath };
  }

  if (legacyExists) {
    const html = readRouteHtml(route.legacyPath);
    const redirect = htmlMentionsTarget(html, route.targetPath);
    return {
      ok: redirect || targetExists,
      status: redirect ? "redirect" : "legacy-page",
      detail: redirect ? `${route.legacyPath} -> ${route.targetPath}` : route.legacyPath
    };
  }

  if (targetExists) {
    return { ok: true, status: "target-page", detail: route.targetPath };
  }

  return {
    ok: false,
    status: "missing",
    detail: `${route.legacyPath} or ${route.targetPath}`
  };
}

if (!fs.existsSync(outputDir)) {
  console.error(`Build output not found: ${outputDir}`);
  console.error("Run your Astro build first, or pass the output directory as an argument.");
  process.exit(1);
}

const manifest = readJson(manifestPath);
const results = manifest.routes.map((route) => ({ route, ...classifyRoute(route) }));
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  const marker = result.ok ? "PASS" : "FAIL";
  console.log(`${marker} ${result.status.padEnd(12)} ${result.detail}`);
}

console.log("");
console.log(`Checked ${results.length} legacy routes against ${path.relative(repoRoot, outputDir) || outputDir}.`);

if (failures.length > 0) {
  console.error(`${failures.length} route parity failure(s):`);
  for (const failure of failures) {
    console.error(`- ${failure.route.legacyPath} expected ${failure.route.targetPath}`);
  }
  process.exit(1);
}
