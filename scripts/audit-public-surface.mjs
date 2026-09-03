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

const assetRefs = new Set([...text.matchAll(/["'](\/images\/[^"']+)["']/g)].map((match) => match[1]));
// 治理架构图仅展示在 README.md（网站页面已不使用），故此处登记豁免。
const intentionallyUnreferenced = new Set([
  "/images/架构图/治理架构图.png",
]);
const imageFiles = readFiles(path.join(root, "public", "images"))
  .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
  .map((file) => `/images/${path.relative(path.join(root, "public", "images"), file).split(path.sep).join("/")}`);
for (const image of imageFiles) {
  if (!assetRefs.has(image) && !intentionallyUnreferenced.has(image)) {
    violations.push(`unreferenced public image ${image}`);
  }
}

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/<button\b([^>]*)>/g)) {
    if (!/\btype=/.test(match[1])) violations.push(`${path.relative(root, file)} has button without explicit type`);
  }
}

const config = fs.readFileSync(path.join(root, "src/config.ts"), "utf8");
// 轮播槽位现为 jpg/png 混排（首页3/首页5/首页15 为 png），正则需同时覆盖两类扩展名。
const finalHeroSlides = (config.match(/src: "\/images\/首页\/首页\d+\.(?:jpe?g|png|webp)"/g) ?? []).length;
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
