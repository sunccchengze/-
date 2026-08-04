/**
 * Public-surface regression guard.
 * Blocks unfinished/internal language and checks public navigation targets.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const readFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(dir, entry.name);
  return entry.isDirectory() ? readFiles(target) : /\.(ts|tsx)$/.test(entry.name) ? [target] : [];
});

const files = readFiles(sourceRoot).filter((file) => !file.endsWith("HeroPreview.tsx"));
const forbidden = [
  "待替换",
  "影像预留",
  "影像正在整理",
  "TODO",
  "FIXME",
  "Lorem ipsum",
  "Coming Soon",
  "秋季招新",
  "秋招",
  "刷工时",
  "工时可认证",
  "保证录取",
  "调剂",
];

const violations = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const term of forbidden) {
    if (text.includes(term)) violations.push(`${path.relative(root, file)} contains “${term}”`);
  }
}

const text = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const anchors = [...text.matchAll(/href="#([A-Za-z0-9_-]+)"/g)].map((match) => match[1]);
const ids = new Set([...text.matchAll(/id="([A-Za-z0-9_-]+)"/g)].map((match) => match[1]));
for (const anchor of new Set(anchors)) {
  if (!ids.has(anchor)) violations.push(`missing internal target #${anchor}`);
}

const config = fs.readFileSync(path.join(root, "src/config.ts"), "utf8");
const finalHeroSlides = (config.match(/src: "\/images\/首页\/首页\d+\.jpg"/g) ?? []).length;
if (finalHeroSlides !== 17) violations.push(`expected 17 final homepage slides, found ${finalHeroSlides}`);

const honors = fs.readFileSync(path.join(root, "src/content.ts"), "utf8");
const honorSlots = (honors.match(/image: "\/images\/荣誉\/荣誉\d+\.jpg"/g) ?? []).length;
if (honorSlots !== 27) violations.push(`expected 27 honor proof slots, found ${honorSlots}`);

if (violations.length) {
  console.error("Public-surface audit failed:");
  violations.forEach((issue) => console.error(`  - ${issue}`));
  process.exit(1);
}
console.log(`Public-surface audit passed: ${files.length} source files, ${finalHeroSlides} homepage slides, ${honorSlots} honor slots.`);
