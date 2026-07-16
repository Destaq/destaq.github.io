import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const pages = [
  "/",
  "/work/",
  "/writing/",
  "/writing/launching-coldcraft/",
  "/photos/",
  "/about/",
  "/resume/",
  "/contact/",
  "/404.html",
];
const redirectPages = [
  ["/blog/", "https://simonilincev.com/writing/"],
  ["/portfolio/", "https://simonilincev.com/work/"],
  ["/projects/life-calendar-tutorial.html", "https://simonilincev.com/work/life-calendar/"],
  ["/projects/life-calendar-tutorial/", "https://simonilincev.com/work/life-calendar/"],
];
const requiredMeta = [
  /<meta name="description" content="[^"]+"/,
  /<link rel="canonical" href="https:\/\/simonilincev\.com\/[^"]*"/,
  /<meta property="og:title" content="[^"]+"/,
  /<meta property="og:description" content="[^"]+"/,
  /<meta property="og:url" content="https:\/\/simonilincev\.com\/[^"]*"/,
  /<meta property="og:image" content="https:\/\/simonilincev\.com\/[^"]+"/,
  /<meta property="og:image:alt" content="[^"]+"/,
  /<meta property="og:image:width" content="\d+"/,
  /<meta property="og:image:height" content="\d+"/,
  /<meta name="twitter:card" content="summary_large_image"/,
  /<meta name="twitter:image" content="https:\/\/simonilincev\.com\/[^"]+"/,
  /<meta name="twitter:image:alt" content="[^"]+"/,
  /<script type="application\/ld\+json">/,
];

function fileForRoute(route) {
  if (route.endsWith(".html")) return join(dist, route.slice(1));
  return join(dist, route.slice(1), "index.html").replace(/\/index\.html$/, "/index.html");
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exitCode = 1;
  }
}

for (const route of pages) {
  const file = route === "/" ? join(dist, "index.html") : fileForRoute(route);
  assert(existsSync(file), `Missing rendered page: ${route}`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  assert(/<title>[^<]+<\/title>/.test(html), `${route} is missing a title.`);
  for (const pattern of requiredMeta) {
    assert(pattern.test(html), `${route} failed SEO pattern: ${pattern}`);
  }
  console.log(`PASS seo ${route}`);
}

const articleHtml = readFileSync(fileForRoute("/writing/launching-coldcraft/"), "utf8");
assert(articleHtml.includes('property="og:type" content="article"'), "Article page is missing og:type=article.");
assert(articleHtml.includes('property="article:published_time"'), "Article page is missing published time.");
assert(articleHtml.includes('"@type":"BlogPosting"'), "Article page is missing BlogPosting JSON-LD.");
console.log("PASS article seo /writing/launching-coldcraft/");

for (const [route, canonical] of redirectPages) {
  const file = route.endsWith(".html") ? join(dist, route.slice(1)) : fileForRoute(route);
  assert(existsSync(file), `Missing redirect page: ${route}`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  assert(html.includes('http-equiv="refresh"'), `${route} is missing meta refresh.`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${route} has wrong canonical.`);
  assert(html.includes('name="robots" content="noindex, follow"'), `${route} is missing noindex.`);
  console.log(`PASS redirect seo ${route}`);
}

for (const file of ["CNAME", "robots.txt", "feed.xml", "sitemap.xml", "sitemap-index.xml", "sitemap-0.xml"]) {
  assert(existsSync(join(dist, file)), `Missing deployment/SEO artifact: ${file}`);
  console.log(`PASS artifact ${file}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`\nSEO audit passed: ${pages.length} pages, ${redirectPages.length} redirects, 6 artifacts.`);
