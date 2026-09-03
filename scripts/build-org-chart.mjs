/**
 * 生成英仔爱心社 2026 组织架构图（SVG → PNG）
 *
 * 用法：npm run org-chart
 * 输出：public/images/架构图/组织架构图.png
 *
 * 设计参考：bumbeishvili/org-chart（d3-org-chart，1.2k★）
 *   - 圆角肘形连线取自其 diagonal() 算法思路
 *   - 层级留白比例参考其 childrenMargin / siblingsMargin 约定
 *
 * 关键处理：
 *   1. 中文用真实字体路径渲染，不依赖 AI 生图（避免中文乱码）
 *   2. 共管副社以「合并单元格」形式横跨其分管的所有部门
 *   3. 小鹰吉祥物为 AI 生成的部门主题插画，嵌入为 base64
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ORG, STATS } from "./org-chart-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/images/架构图");
const MASCOT_DIR =
  process.env.MASCOT_DIR || join(ROOT, "public/images/小鹰/部门徽章");

const FONT_DIR = join(ROOT, ".cache/fonts");
async function ensureFonts() {
  if (existsSync(join(FONT_DIR, "NotoSansSC-700.ttf"))) return FONT_DIR;
  console.log("下载中文字体 @fontsource/noto-sans-sc ...");
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
  rougeDeep: "#8E3F3D",
  rouge: "#B25A55",
  rougeSoft: "#C97D74",
  rougeMist: "#E2BDB6",
  rose: "#D4A5A5",
  goldSoft: "#C9A876",
  gold: "#8A6A2E",
  ink: "#3E3E3E",
  muted: "#5A5A5A",
  cream: "#FAF6F3",
  white: "#FFFFFF",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const textW = (s, size) => {
  let u = 0;
  for (const ch of String(s)) u += ch.charCodeAt(0) > 255 ? 1 : 0.55;
  return u * size;
};

function mascot(key) {
  const p = join(MASCOT_DIR, `${key}.png`);
  if (!existsSync(p)) return null;
  return `data:image/png;base64,${readFileSync(p).toString("base64")}`;
}

function elbow(x1, y1, x2, y2, radius = 20) {
  if (Math.abs(x2 - x1) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const midY = y1 + (y2 - y1) / 2;
  const dir = x2 > x1 ? 1 : -1;
  const r = Math.min(radius, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2);
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${midY - r}`,
    `Q ${x1} ${midY} ${x1 + r * dir} ${midY}`,
    `L ${x2 - r * dir} ${midY}`,
    `Q ${x2} ${midY} ${x2} ${midY + r}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

const CARD_W = 250;
const CARD_H = 104;
const CARD_GAP_Y = 12;
const DEPT_PAD = 14;
const DEPT_W = CARD_W + DEPT_PAD * 2;
const DEPT_GAP = 20;
const CLUSTER_GAP = 40;
const VICE_H = 116;
const VICE_GAP = 26;

function personCard(x, y, p, opts = {}) {
  const { role = "部长", accent = C.rouge, w = CARD_W, emphasise = false } = opts;
  const tags = p.tags || [];
  const bg = emphasise ? C.cream : C.white;
  const nameSize = emphasise ? 29 : 26;

  let s = `<g><rect x="${x}" y="${y}" width="${w}" height="${CARD_H}" rx="15" fill="${bg}" stroke="${accent}" stroke-width="${emphasise ? 2.4 : 1.3}" opacity="${emphasise ? 1 : 0.97}"/>`;

  const roleW = textW(role, 16) + 22;
  s += `<rect x="${x + 13}" y="${y + 11}" width="${roleW}" height="25" rx="12.5" fill="${accent}" opacity="${emphasise ? 1 : 0.85}"/>`;
  s += `<text x="${x + 13 + roleW / 2}" y="${y + 28.5}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">${esc(role)}</text>`;
  s += `<text x="${x + 13 + roleW + 11}" y="${y + 31}" font-size="${nameSize}" fill="${C.ink}" font-weight="800">${esc(p.name)}</text>`;

  let tx = x + 13;
  const ty = y + 52;
  for (const t of tags) {
    const tw = textW(t, 15) + 18;
    if (tx + tw > x + w - 11) break;
    s += `<rect x="${tx}" y="${ty}" width="${tw}" height="27" rx="13.5" fill="${accent}" opacity="0.13"/>`;
    s += `<text x="${tx + tw / 2}" y="${ty + 18.5}" font-size="15" fill="${accent}" text-anchor="middle" font-weight="600">${esc(t)}</text>`;
    tx += tw + 6;
  }
  s += `</g>`;
  return s;
}

function deptColumn(x, y, d) {
  const headerH = 128;
  const bodyH = d.heads.length * (CARD_H + CARD_GAP_Y) + DEPT_PAD;
  const h = headerH + bodyH;

  let s = `<g><rect x="${x}" y="${y}" width="${DEPT_W}" height="${h}" rx="20" fill="${C.white}" stroke="${C.rougeMist}" stroke-width="1.8"/>`;
  s += `<path d="M ${x} ${y + 20} a20 20 0 0 1 20 -20 h ${DEPT_W - 40} a20 20 0 0 1 20 20 v ${headerH - 20} h ${-DEPT_W} Z" fill="${C.rougeDeep}"/>`;

  const m = mascot(d.mascot);
  if (m) s += `<image href="${m}" x="${x + DEPT_W - 100}" y="${y + 8}" width="94" height="112" preserveAspectRatio="xMidYMid meet"/>`;

  s += `<text x="${x + 17}" y="${y + 46}" font-size="29" fill="#fff" font-weight="800">${esc(d.name)}</text>`;
  s += `<text x="${x + 17}" y="${y + 74}" font-size="15" fill="${C.rougeMist}" font-weight="500">${esc(d.alias)}</text>`;
  s += `<text x="${x + 17}" y="${y + 104}" font-size="14" fill="${C.rose}" font-weight="600">${d.heads.length} 位部长</text>`;

  let cy = y + headerH + 2;
  for (const p of d.heads) {
    s += personCard(x + DEPT_PAD, cy, p, { role: "部长", accent: C.rouge });
    cy += CARD_H + CARD_GAP_Y;
  }
  s += `</g>`;
  return { svg: s, w: DEPT_W, h };
}

function clusterBlock(x, y, cl) {
  const n = cl.depts.length;
  const innerW = n * DEPT_W + (n - 1) * DEPT_GAP;
  const merged = n > 1;

  let body = "";
  let links = "";

  const viceY = y;
  const viceW = merged ? innerW : DEPT_W;
  const viceX = x;

  body += `<g><rect x="${viceX}" y="${viceY}" width="${viceW}" height="${VICE_H}" rx="18" fill="${C.cream}" stroke="${C.rougeDeep}" stroke-width="2.6"/>`;

  if (cl.brand) {
    const bw = textW(cl.brand, 17) + 26;
    body += `<rect x="${viceX + viceW - bw - 16}" y="${viceY + 14}" width="${bw}" height="28" rx="14" fill="${C.goldSoft}"/>`;
    body += `<text x="${viceX + viceW - bw / 2 - 16}" y="${viceY + 33.5}" font-size="17" fill="#fff" text-anchor="middle" font-weight="700">${esc(cl.brand)}</text>`;
  }

  const roleW = textW("副社", 17) + 24;
  body += `<rect x="${viceX + 18}" y="${viceY + 15}" width="${roleW}" height="27" rx="13.5" fill="${C.rougeDeep}"/>`;
  body += `<text x="${viceX + 18 + roleW / 2}" y="${viceY + 34}" font-size="17" fill="#fff" text-anchor="middle" font-weight="700">副社</text>`;
  body += `<text x="${viceX + 18 + roleW + 13}" y="${viceY + 37}" font-size="31" fill="${C.ink}" font-weight="900">${esc(cl.vice.name)}</text>`;

  let tx = viceX + 18;
  for (const t of cl.vice.tags) {
    const tw = textW(t, 15) + 18;
    body += `<rect x="${tx}" y="${viceY + 56}" width="${tw}" height="27" rx="13.5" fill="${C.rougeDeep}" opacity="0.13"/>`;
    body += `<text x="${tx + tw / 2}" y="${viceY + 74.5}" font-size="15" fill="${C.rougeDeep}" text-anchor="middle" font-weight="600">${esc(t)}</text>`;
    tx += tw + 6;
  }

  if (merged) {
    body += `<text x="${viceX + viceW - 16}" y="${viceY + VICE_H - 12}" font-size="14" fill="${C.muted}" text-anchor="end" font-weight="600">同时分管 ${n} 个部门</text>`;
  }
  body += `</g>`;

  const deptTop = viceY + VICE_H + VICE_GAP;
  const fromX = viceX + viceW / 2;
  const fromY = viceY + VICE_H;
  let maxH = 0;

  cl.depts.forEach((d, i) => {
    const dx = x + i * (DEPT_W + DEPT_GAP);
    const col = deptColumn(dx, deptTop, d);
    maxH = Math.max(maxH, col.h);
    links += `<path d="${elbow(fromX, fromY, dx + DEPT_W / 2, deptTop, 18)}" fill="none" stroke="${C.goldSoft}" stroke-width="3" stroke-linecap="round"/>`;
    body += col.svg;
  });

  return { svg: links + body, w: innerW, h: VICE_H + VICE_GAP + maxH };
}

const PAD = 56;
const parts = [];
const push = (s) => parts.push(s);

let contentW = 0;
for (const g of ORG.groups) {
  let gw = 0;
  g.clusters.forEach((cl, i) => {
    const n = cl.depts.length;
    gw += n * DEPT_W + (n - 1) * DEPT_GAP + (i ? CLUSTER_GAP : 0);
  });
  contentW = Math.max(contentW, gw);
}
const W = Math.round(contentW + PAD * 2);

let y = PAD;

push(`<defs>
<linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FDFAF8"/><stop offset="100%" stop-color="#F6EDE8"/></linearGradient>
<linearGradient id="hdr" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${C.rougeDeep}"/><stop offset="55%" stop-color="${C.rouge}"/><stop offset="100%" stop-color="${C.rougeSoft}"/></linearGradient>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="${C.rougeDeep}" flood-opacity="0.13"/></filter>
</defs>`);

const HDR_H = 178;
push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="${HDR_H}" rx="26" fill="url(#hdr)" filter="url(#soft)"/>`);
push(`<text x="${W / 2}" y="${y + 60}" font-size="50" fill="#fff" text-anchor="middle" font-weight="900">${esc(ORG.title)}</text>`);
push(`<text x="${W / 2}" y="${y + 102}" font-size="28" fill="#FFE3DC" text-anchor="middle" font-weight="600">${esc(ORG.subtitle)}</text>`);
push(`<text x="${W / 2}" y="${y + 142}" font-size="21" fill="#F7CFC7" text-anchor="middle" letter-spacing="3">${esc(ORG.motto)}</text>`);
const mA = mascot("aixin");
if (mA) push(`<image href="${mA}" x="${PAD + 30}" y="${y + 22}" width="128" height="134"/>`);
const mL = mascot("shezhangtuan");
if (mL) push(`<image href="${mL}" x="${W - PAD - 158}" y="${y + 22}" width="128" height="134"/>`);

y += HDR_H + 30;

const TOP_H = 158;
push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="${TOP_H}" rx="22" fill="${C.white}" stroke="${C.goldSoft}" stroke-width="2.2"/>`);
push(`<rect x="${PAD + 24}" y="${y + 22}" width="318" height="114" rx="17" fill="${C.cream}" stroke="${C.goldSoft}" stroke-width="1.8"/>`);
push(`<rect x="${PAD + 42}" y="${y + 37}" width="94" height="27" rx="13.5" fill="${C.gold}"/>`);
push(`<text x="${PAD + 89}" y="${y + 56}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">指导老师</text>`);
push(`<text x="${PAD + 42}" y="${y + 98}" font-size="33" fill="${C.ink}" font-weight="800">${esc(ORG.advisor.name)}</text>`);
push(`<text x="${PAD + 42}" y="${y + 123}" font-size="16" fill="${C.muted}">${esc(ORG.advisor.org)} · ${esc(ORG.advisor.since)}</text>`);

let lx = PAD + 366;
for (const L of ORG.leaders) {
  push(`<rect x="${lx}" y="${y + 22}" width="352" height="114" rx="17" fill="${C.white}" stroke="${C.rougeDeep}" stroke-width="2.8"/>`);
  const m = mascot(L.mascot);
  if (m) push(`<image href="${m}" x="${lx + 250}" y="${y + 28}" width="90" height="100"/>`);
  const rw = textW(L.role, 18) + 24;
  push(`<rect x="${lx + 19}" y="${y + 37}" width="${rw}" height="29" rx="14.5" fill="${C.rougeDeep}"/>`);
  push(`<text x="${lx + 19 + rw / 2}" y="${y + 57.5}" font-size="18" fill="#fff" text-anchor="middle" font-weight="700">${esc(L.role)}</text>`);
  push(`<text x="${lx + 19}" y="${y + 100}" font-size="35" fill="${C.ink}" font-weight="900">${esc(L.name)}</text>`);
  let tx2 = lx + 19;
  for (const t of L.tags) {
    const tw = textW(t, 14) + 16;
    push(`<rect x="${tx2}" y="${y + 110}" width="${tw}" height="23" rx="11.5" fill="${C.rougeDeep}" opacity="0.13"/>`);
    push(`<text x="${tx2 + tw / 2}" y="${y + 126}" font-size="14" fill="${C.rougeDeep}" text-anchor="middle" font-weight="600">${esc(t)}</text>`);
    tx2 += tw + 6;
  }
  lx += 370;
}

const statList = [
  [`${STATS.total}`, "社长团+部长团"],
  [`${STATS.depts}`, "个部门"],
  [`${STATS.members}`, "名社员"],
];
let stx = lx + 14;
for (const [v, l] of statList) {
  push(`<rect x="${stx}" y="${y + 22}" width="126" height="114" rx="17" fill="${C.rougeDeep}" opacity="0.08"/>`);
  push(`<text x="${stx + 63}" y="${y + 84}" font-size="40" fill="${C.rougeDeep}" text-anchor="middle" font-weight="900">${esc(v)}</text>`);
  push(`<text x="${stx + 63}" y="${y + 112}" font-size="14" fill="${C.muted}" text-anchor="middle" font-weight="600">${esc(l)}</text>`);
  stx += 138;
}

y += TOP_H + 36;

for (const g of ORG.groups) {
  push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="58" rx="15" fill="${C.rouge}" opacity="0.13"/>`);
  push(`<rect x="${PAD}" y="${y}" width="8" height="58" rx="4" fill="${C.rougeDeep}"/>`);
  push(`<text x="${PAD + 26}" y="${y + 39}" font-size="31" fill="${C.rougeDeep}" font-weight="900">${esc(g.label)}</text>`);
  push(`<text x="${PAD + 26 + textW(g.label, 31) + 20}" y="${y + 38}" font-size="19" fill="${C.muted}" font-weight="500">${esc(g.note)}</text>`);
  const cnt = g.clusters.reduce((s, c) => s + c.depts.length, 0);
  push(`<text x="${W - PAD - 22}" y="${y + 38}" font-size="19" fill="${C.rouge}" text-anchor="end" font-weight="700">${cnt} 个部门</text>`);
  y += 58 + 26;

  let cx = PAD;
  let maxH = 0;
  for (const cl of g.clusters) {
    const b = clusterBlock(cx, y, cl);
    push(b.svg);
    cx += b.w + CLUSTER_GAP;
    maxH = Math.max(maxH, b.h);
  }

  // 职能部门右侧留白 -> 填入「欢乐小屋」说明面板
  if (g.key === "functional") {
    const px = cx;
    const pw = W - PAD - px;
    if (pw > 420) {
      const ph = maxH;
      push(`<rect x="${px}" y="${y}" width="${pw}" height="${ph}" rx="22" fill="${C.white}" stroke="${C.rougeMist}" stroke-width="2" stroke-dasharray="11 8" opacity="0.96"/>`);
      push(`<text x="${px + 42}" y="${y + 66}" font-size="34" fill="${C.rougeDeep}" font-weight="900">找到属于你的「欢乐小屋」</text>`);
      push(`<text x="${px + 42}" y="${y + 104}" font-size="19" fill="${C.muted}">职能部门守护日常运转，项目部门把善意落在具体的人与事上。</text>`);

      const notes = [
        ["旁听制度", "职能部门新干事可选 1 个项目部门旁听，两边活动一起参加"],
        ["成长路径", "干事 › 部长 › 副社 › 社长团，每年换届"],
        ["零经验友好", "绝大多数英仔进社前都没做过支教或敬老"],
        ["时间投入", "多数部门两周一次例会，学期内每周约 2—4 小时"],
        ["共管副社", "一位副社可同时分管两个部门，图中以合并卡片呈现"],
      ];
      let ny = y + 156;
      for (const [k, v] of notes) {
        const kw = textW(k, 18) + 24;
        push(`<rect x="${px + 42}" y="${ny - 22}" width="${kw}" height="31" rx="15.5" fill="${C.rougeDeep}"/>`);
        push(`<text x="${px + 42 + kw / 2}" y="${ny}" font-size="18" fill="#fff" text-anchor="middle" font-weight="700">${esc(k)}</text>`);
        push(`<text x="${px + 42 + kw + 18}" y="${ny}" font-size="18" fill="${C.ink}">${esc(v)}</text>`);
        ny += 50;
      }

      push(`<line x1="${px + 42}" y1="${ny + 6}" x2="${px + pw - 42}" y2="${ny + 6}" stroke="${C.rougeMist}" stroke-width="2"/>`);
      ny += 50;
      push(`<text x="${px + 42}" y="${ny}" font-size="20" fill="${C.rougeDeep}" font-weight="800">两条品牌线</text>`);
      push(`<text x="${px + 188}" y="${ny}" font-size="19" fill="${C.ink}">大手拉小手 ＝ 启梦 ＋ 拾辉　·　青春伴夕阳 ＝ 向日葵 ＋ 常青藤</text>`);

      const mh = mascot("jiaoliu");
      if (mh) push(`<image href="${mh}" x="${px + pw - 210}" y="${y + ph - 224}" width="180" height="212" opacity="0.95"/>`);
    }
  }

  y += maxH + 42;
}

push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="84" rx="19" fill="${C.rougeDeep}"/>`);
push(`<text x="${PAD + 32}" y="${y + 37}" font-size="21" fill="#fff" font-weight="700">「英」为爱，「仔」一起　·　2026 招新进行中</text>`);
push(`<text x="${PAD + 32}" y="${y + 64}" font-size="16" fill="${C.rougeMist}">招新 QQ 群 712079220　·　yzaxs-1.pages.dev　·　关键词标签均取自本人招新推文自述</text>`);
const mF = mascot("jiaoliu");
if (mF) push(`<image href="${mF}" x="${W - PAD - 96}" y="${y + 2}" width="76" height="80"/>`);
y += 84 + PAD;

const H = Math.round(y);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">
<rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
${parts.join("\n")}
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });
const CACHE_DIR = join(ROOT, ".cache");
mkdirSync(CACHE_DIR, { recursive: true });
writeFileSync(join(CACHE_DIR, "组织架构图.svg"), svg, "utf8");
console.log(`   画布 ${W}x${H}  社长团 ${STATS.leaders} + 部长 ${STATS.heads} = ${STATS.total}`);

const { Resvg } = await import("@resvg/resvg-js");
const fontDir = await ensureFonts();
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { fontDirs: [fontDir], loadSystemFonts: false, defaultFontFamily: "Noto Sans SC" },
});
const png = resvg.render().asPng();
const pngPath = join(OUT_DIR, "组织架构图.png");
writeFileSync(pngPath, png);
console.log(`PNG  ${pngPath}  (${(png.length / 1024 / 1024).toFixed(2)} MB)`);
