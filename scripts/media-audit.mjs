import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const mediaRoot = join(process.cwd(), "public", "media");
const blockedExtensions = new Set([
  ".doc",
  ".docx",
  ".md",
  ".pdf",
  ".rtf",
  ".tex",
  ".txt",
]);

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

if (!existsSync(mediaRoot)) {
  console.error("public/media does not exist.");
  process.exit(1);
}

const files = walk(mediaRoot);
const blocked = files.filter((file) => blockedExtensions.has(extname(file).toLowerCase()));

for (const file of files) {
  const rel = relative(process.cwd(), file);
  const sizeKb = Math.round(statSync(file).size / 1024);
  console.log(`${rel} ${sizeKb} KB`);
}

if (blocked.length > 0) {
  console.error("\nBlocked draft/document files found in public/media:");
  for (const file of blocked) {
    console.error(`- ${relative(process.cwd(), file)}`);
  }
  process.exit(1);
}

console.log(`\nMedia audit passed: ${files.length} files, no raw draft/document formats.`);
