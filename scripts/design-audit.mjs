import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const roots = ["src", "tests", "REDESIGN_SUMMARY.md", "package.json", "astro.config.mjs"];
const banned = [
  { pattern: /\bInter\b/i, label: "generic Inter font" },
  { pattern: /\bh-screen\b/, label: "mobile-unstable h-screen" },
  { pattern: /#000000/i, label: "pure black in source" },
  { pattern: /\b(?:neon|glow|violet|purple)\b/i, label: "gaudy neon/purple language" },
  { pattern: /text-shadow\s*:/i, label: "text shadow" },
  { pattern: /box-shadow:\s*0\s+0\s+\d/i, label: "outer glow-style shadow" },
  { pattern: /\p{Extended_Pictographic}/u, label: "emoji/pictographic character" },
];

function walk(entry) {
  const fullPath = join(root, entry);
  if (!existsSync(fullPath)) return [];
  if (statSync(fullPath).isFile()) return [fullPath];
  return readdirSync(fullPath).flatMap((child) => {
    const childPath = join(fullPath, child);
    if (statSync(childPath).isDirectory()) return walk(relative(root, childPath));
    return [childPath];
  });
}

const files = roots
  .flatMap(walk)
  .filter((file) => /\.(astro|css|js|mjs|ts|json|md)$/.test(file))
  .filter((file) => !file.includes(`${join(root, "public")}/`));

const failures = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const isMigratedWriting = file.includes(`${join(root, "src", "content", "writing")}/`);
  for (const rule of banned) {
    if (rule.label === "emoji/pictographic character" && isMigratedWriting) continue;
    if (rule.pattern.test(text)) {
      failures.push(`${relative(root, file)} contains ${rule.label}.`);
    }
  }
}

if (failures.length > 0) {
  console.error("Design audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Design audit passed: ${files.length} source files checked for refined, non-gaudy UI tells.`);
