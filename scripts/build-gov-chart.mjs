/**
 * 生成「社团治理架构图」（机构层：书院 / 团支部 / 社长团 / 社友会 / 两类部门）
 *
 * 做法：AI 生图负责美术底板（空白卡片 + 手绘装饰 + 连线），
 *       中文由本脚本用真实字体精确叠加 —— 规避 AI 渲染中文乱码。
 *
 * 用法：npm run gov-chart
 * 输出：public/images/架构图/治理架构图.png
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/架构图");
const BG = process.env.GOV_BG || join(ROOT, "scripts/assets/治理底板.png");

const FONT_DIR = join(ROOT, ".cache/fonts");
async function ensureFonts() {
  if (existsSync(join(FONT_DIR, "NotoSansSC-700.ttf"))) return FONT_DIR;
  console.log("⏳ 下载中文字体 …");
  const { execSync } = await import("node:child_process");
  const tmp = join(ROOT, ".cache/_font_tmp");
  mkdirSync(tmp, { recursive: true });
  execSync("npm pack @fontsource/noto-sans-sc@5 --silent", { cwd: tmp, stdio: "inherit" });
  const tgz = readdirSync(tmp).find((f) => f.endsWith(".tgz"));
  execSync(`tar xzf ${JSON.stringify(tgz)}`, { cwd: tmp });
  mkdirSync(FONT_DIR, { recursive: true });
  for (const w of ["400", "700"]) {
    const src = join(tmp, `package/files/noto-sans-sc-chinese-simplified-${w}-normal.woff2`);
    const dst = join(FONT_DIR, `NotoSansSC-${w}.ttf`);
    execSync(
      `python3 -c "from fontTools.ttLib import TTFont;f=TTFont(r'${src}');f.flavor=None;f.save(r'${dst}')"`,
      { stdio: "inherit" },
    );
  }
  return FONT_DIR;
}

const C = {
  deep: "#8E3F3D",
  rouge: "#B25A55",
  ink: "#3E3E3E",
  muted: "#6B5A56",
  cream: "#FAF6F3",
  gold: "#8A6A2E",
  white: "#FFFFFF",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* 底板中各卡片的实测坐标（1408×768） */
const BOX = {
  advisor: { x: 508, y: 42, w: 402, h: 177 },
  branch: { x: 67, y: 304, w: 403, h: 172 },
  presidium: { x: 508, y: 304, w: 402, h: 172 },
  alumni: { x: 948, y: 304, w: 402, h: 172 },
  functional: { x: 290, y: 558, w: 390, h: 157 },
  project: { x: 730, y: 558, w: 390, h: 157 },
};

/** 卡片内居中多行文字 */
function label(box, lines) {
  const cx = box.x + box.w / 2;
  const total = lines.reduce((s, l) => s + (l.lh ?? l.size * 1.45), 0);
  let y = box.y + box.h / 2 - total / 2;
  let out = "";
  for (const l of lines) {
    const lh = l.lh ?? l.size * 1.45;
    y += lh;
    const weight = l.weight ?? 700;
    const fill = l.fill ?? C.ink;
    const ls = l.ls ? ` letter-spacing="${l.ls}"` : "";
    out += `<text x="${cx}" y="${y - lh * 0.28}" font-size="${l.size}" fill="${fill}" text-anchor="middle" font-weight="${weight}"${ls}>${esc(l.t)}</text>`;
  }
  return out;
}

/** 小徽标胶囊 */
function pill(cx, y, text, bg, fg = "#fff", size = 17) {
  const w = text.replace(/[^\x00-\xff]/g, "aa").length * (size * 0.56) + 26;
  return `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${size + 14}" rx="${(size + 14) / 2}" fill="${bg}"/>
  <text x="${cx}" y="${y + size + 3}" font-size="${size}" fill="${fg}" text-anchor="middle" font-weight="700">${esc(text)}</text>`;
}

const W = 1408;
const H = 768;
const p = [];

const bgB64 = readFileSync(BG).toString("base64");
p.push(`<image href="data:image/png;base64,${bgB64}" x="0" y="0" width="${W}" height="${H}"/>`);

/* 顶：指导单位 */
p.push(pill(BOX.advisor.x + BOX.advisor.w / 2, BOX.advisor.y + 20, "业务指导单位", "#FFFFFF33", "#FFF0EC", 15));
p.push(
  label({ ...BOX.advisor, y: BOX.advisor.y + 26 }, [
    { t: "西安交通大学 · 仲英书院", size: 29, fill: "#fff" },
    { t: "指导老师　刘晗梦", size: 22, fill: "#FFE3DC", weight: 600 },
    { t: "2025.9 起", size: 17, fill: "#F3C9C1", weight: 500 },
  ]),
);

/* 中左：团支部 */
p.push(pill(BOX.branch.x + BOX.branch.w / 2, BOX.branch.y + 18, "监督与培养", C.deep));
p.push(
  label(BOX.branch, [
    { t: "团支部", size: 34, fill: C.deep },
    { t: "前任社长团 + 全体现任社员", size: 17, fill: C.muted, weight: 600 },
    { t: "规章监督 · 全社培训 · 资料归档 · 思想建设", size: 15, fill: C.muted, weight: 500 },
  ]),
);

/* 中：社长团 */
p.push(pill(BOX.presidium.x + BOX.presidium.w / 2, BOX.presidium.y + 18, "决策核心", "#FFFFFF3D"));
p.push(
  label(BOX.presidium, [
    { t: "社长团", size: 36, fill: "#fff" },
    { t: "社长 王晗宇　·　团支书 李振杰", size: 19, fill: "#FFE9E4", weight: 700 },
    { t: "重大活动策划 · 政策起草 · 部门协调 · 部长任免", size: 15, fill: "#F6D2CB", weight: 500 },
  ]),
);

/* 中右：社友会 */
p.push(pill(BOX.alumni.x + BOX.alumni.w / 2, BOX.alumni.y + 18, "代际传承", C.deep));
p.push(
  label(BOX.alumni, [
    { t: "社友会", size: 34, fill: C.deep },
    { t: "2015.12.13 挂牌", size: 18, fill: C.muted, weight: 700 },
    { t: "战略智囊 · 历程展示 · 代际桥梁 · 记忆载体", size: 15, fill: C.muted, weight: 500 },
  ]),
);

/* 底左：职能部门 */
p.push(
  label(BOX.functional, [
    { t: "3 个职能部门", size: 30, fill: C.deep },
    { t: "守护社团日常运转", size: 16, fill: C.muted, weight: 600 },
    { t: "常务部　交流部　宣传部", size: 20, fill: C.rouge, weight: 700, lh: 40 },
  ]),
);

/* 底右：项目部门 */
p.push(
  label(BOX.project, [
    { t: "8 个项目部门", size: 30, fill: C.deep },
    { t: "把善意落在具体的人与事上", size: 16, fill: C.muted, weight: 600 },
    { t: "启梦 拾辉 向日葵 常青藤", size: 18, fill: C.rouge, weight: 700, lh: 36 },
    { t: "萤火 启明星 心项目 陕博", size: 18, fill: C.rouge, weight: 700, lh: 26 },
  ]),
);

/* 左上角注解：管理体制 */
p.push(
  `<text x="34" y="${H - 48}" font-size="19" fill="${C.deep}" font-weight="800">英仔爱心社 · 治理架构</text>`,
);
p.push(
  `<text x="34" y="${H - 24}" font-size="14" fill="${C.muted}" font-weight="500">以项目制为主、企业体制为辅，参照公司垂直管理模式</text>`,
);

/* 右下角注解 */
p.push(
  `<text x="${W - 34}" y="${H - 26}" font-size="14" fill="${C.muted}" text-anchor="end" font-weight="500">成长路径：干事 › 部长 › 副社 › 社长团</text>`,
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Noto Sans SC, sans-serif">
${p.join("\n")}
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });
const { Resvg } = await import("@resvg/resvg-js");
const fontDir = await ensureFonts();
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: Math.round(W * 1.35) },
  font: { fontDirs: [fontDir], loadSystemFonts: false, defaultFontFamily: "Noto Sans SC" },
});
const rendered = resvg.render();
const png = rendered.asPng();
const out = join(OUT_DIR, "治理架构图.png");
writeFileSync(out, png);
console.log(`✅ ${out}  (${(png.length / 1024).toFixed(0)} KB, ${rendered.width}×${rendered.height})`);
