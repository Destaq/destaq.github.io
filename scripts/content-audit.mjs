import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const writingDir = join(root, "src", "content", "writing");
const workPath = join(root, "src", "data", "work.ts");
const redirectPath = join(root, "src", "data", "redirects.ts");
const summaryPath = join(root, "REDESIGN_SUMMARY.md");

const expectedWorkSlugs = [
  "lingofable",
  "lingotrack",
  "locadapt",
  "coldcraft",
  "notehacks",
  "surgelingo",
  "circles",
  "gcal-wrapped",
  "bump",
  "language-learning-dashboard",
  "life-calendar",
  "language-statistics",
  "linguakite",
  "chess-graph",
  "low-face-mode",
  "eloquence",
  "watershed-script",
];

const expectedPublicPaths = [
  "public/CNAME",
  "public/robots.txt",
  "public/assets",
  "public/assets/css/main.css",
  "public/assets/js/main.min.js",
  "public/assets/images/catppuccin_latte-skin-archive-large.png",
  "public/assets/images/catppuccin_mocha-skin-archive-large.png",
  "public/downloads/Simon_Ilincev_Resume.pdf",
  "public/misc/bio.html",
  "public/projects/life-calendar-tutorial.html",
  "public/projects/life-calendar-tutorial/index.html",
  "public/media/creative/eloquence-concept.jpg",
  "public/media/creative/watershed-writing-desk.jpg",
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const writingFiles = readdirSync(writingDir).filter((file) => file.endsWith(".md"));
if (writingFiles.length !== 18) {
  fail(`Expected 18 migrated writing posts, found ${writingFiles.length}.`);
}

for (const file of writingFiles) {
  const body = readFileSync(join(writingDir, file), "utf8");
  if (!/^legacyPath:/m.test(body)) fail(`${file} is missing legacyPath.`);
  if (!/^heroImage:/m.test(body)) fail(`${file} is missing heroImage.`);
  if (!/^image:/m.test(body)) fail(`${file} is missing image metadata.`);
}

const workText = readFileSync(workPath, "utf8");
for (const slug of expectedWorkSlugs) {
  if (!workText.includes(`"slug": "${slug}"`)) {
    fail(`Missing work entry slug: ${slug}`);
  }
}

if (!workText.includes(`"category": "creative"`)) {
  fail("Creative work category is missing.");
}

const redirectText = readFileSync(redirectPath, "utf8");
const redirectCount = (redirectText.match(/"from":/g) ?? []).length;
if (redirectCount < 25) {
  fail(`Expected at least 25 legacy redirects, found ${redirectCount}.`);
}

for (const relPath of expectedPublicPaths) {
  if (!existsSync(join(root, relPath))) {
    fail(`Missing public compatibility path: ${relPath}`);
  }
}

if (!existsSync(summaryPath)) {
  fail("Missing REDESIGN_SUMMARY.md reference doc.");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `Content audit passed: ${writingFiles.length} posts, ${expectedWorkSlugs.length} work entries, ${redirectCount} redirects.`
);
