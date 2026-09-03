/**
 * 生成英仔爱心社 2026 组织架构图（SVG → PNG）
 *
 * 用法：node scripts/build-org-chart.mjs
 * 输出：public/images/架构图/组织架构图.svg 与 .png
 *
 * 设计要点：
 * - 中文文字用真实字体路径渲染，不依赖 AI 生图（避免中文乱码）
 * - 小鹰吉祥物为 AI 生成的部门主题插画，嵌入为 base64
 * - 配色沿用 src/index.css 的莫兰迪红设计 token
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

/* 中文字体：首次运行自动从 npm 下载并转换（不入库，约 5MB） */
const FONT_DIR = join(ROOT, ".cache/fonts");
async function ensureFonts() {
  if (existsSync(join(FONT_DIR, "NotoSansSC-700.ttf"))) return FONT_DIR;
  console.log("⏳ 首次运行：下载中文字体 @fontsource/noto-sans-sc …");
  const { execSync } = await import("node:child_process");
  const tmp = join(ROOT, ".cache/_font_tmp");
  mkdirSync(tmp, { recursive: true });
  execSync("npm pack @fontsource/noto-sans-sc@5 --silent", { cwd: tmp, stdio: "inherit" });
  const tgz = readdirSync(tmp).find((f) => f.endsWith(".tgz"));
  execSync(`tar xzf ${JSON.stringify(tgz)}`, { cwd: tmp });
  mkdirSync(FONT_DIR, { recursive: true });
  const { default: wawoff } = await import("wawoff2").catch(() => ({ default: null }));
  for (const w of ["400", "700"]) {
    const src = join(tmp, `package/files/noto-sans-sc-chinese-simplified-${w}-normal.woff2`);
    const dst = join(FONT_DIR, `NotoSansSC-${w}.ttf`);
    if (wawoff) {
      writeFileSync(dst, Buffer.from(await wawoff.decompress(readFileSync(src))));
    } else {
      // 回退：用 python fonttools
      execSync(
        `python3 -c "from fontTools.ttLib import TTFont;f=TTFont(r'${src}');f.flavor=None;f.save(r'${dst}')"`,
        { stdio: "inherit" },
      );
    }
  }
  return FONT_DIR;
}

/* ── 设计 token（同 src/index.css） ── */
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

function mascot(key) {
  const p = join(MASCOT_DIR, `${key}.png`);
  if (!existsSync(p)) return null;
  return `data:image/png;base64,${readFileSync(p).toString("base64")}`;
}

/* ── 布局常量 ── */
const W = 2560;
const PAD = 56;
const CARD_W = 250;
const CARD_GAP = 16;

let y = 0;
const parts = [];
const push = (s) => parts.push(s);

/* ── 卡片：一位成员 ── */
function personCard(x, yy, p, opts = {}) {
  const { role = "部长", accent = C.rouge, w = CARD_W } = opts;
  const tags = p.tags || [];
  const isVice = role !== "部长";
  const bg = isVice ? C.cream : C.white;
  const nameSize = isVice ? 30 : 27;
  const h = 112;

  let s = `<g>
  <rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="16" fill="${bg}" stroke="${accent}" stroke-width="${isVice ? 2.5 : 1.4}" opacity="${isVice ? 1 : 0.96}"/>`;

  // 职务小胶囊
  const roleW = role.length * 17 + 20;
  s += `<rect x="${x + 14}" y="${yy + 12}" width="${roleW}" height="26" rx="13" fill="${accent}" opacity="${isVice ? 1 : 0.82}"/>
  <text x="${x + 14 + roleW / 2}" y="${yy + 30}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">${esc(role)}</text>`;

  // 姓名
  s += `<text x="${x + 14 + roleW + 12}" y="${yy + 33}" font-size="${nameSize}" fill="${C.ink}" font-weight="800">${esc(p.name)}</text>`;

  // 标签行
  let tx = x + 14;
  const ty = yy + 56;
  for (const t of tags) {
    const tw = t.replace(/[^\x00-\xff]/g, "aa").length * 8 + 20;
    if (tx + tw > x + w - 12) break;
    s += `<rect x="${tx}" y="${ty}" width="${tw}" height="28" rx="14" fill="${accent}" opacity="0.13"/>
    <text x="${tx + tw / 2}" y="${ty + 19}" font-size="15" fill="${accent === C.rougeDeep ? C.rougeDeep : C.rouge}" text-anchor="middle" font-weight="600">${esc(t)}</text>`;
    tx += tw + 7;
  }
  s += `</g>`;
  return { svg: s, h };
}

/* ── 部门块 ── */
function deptBlock(x, yy, d) {
  const people = [];
  if (d.vice) people.push({ ...d.vice, _role: "副社" });
  for (const h of d.heads) people.push({ ...h, _role: "部长" });

  const headerH = 132;
  const rowH = 112 + 10;
  const bodyH = people.length * rowH + 14;
  const h = headerH + bodyH + 14;
  const w = CARD_W + 28;

  let s = `<g>
  <rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${C.white}" stroke="${C.rougeMist}" stroke-width="2"/>
  <rect x="${x}" y="${yy}" width="${w}" height="${headerH}" rx="22" fill="${C.rougeDeep}"/>
  <rect x="${x}" y="${yy + headerH - 22}" width="${w}" height="22" fill="${C.rougeDeep}"/>`;

  // 吉祥物：完整展示在头部右侧
  const m = mascot(d.mascot);
  if (m) {
    s += `<image href="${m}" x="${x + w - 106}" y="${yy + 8}" width="98" height="116" preserveAspectRatio="xMidYMid meet"/>`;
  }

  s += `<text x="${x + 18}" y="${yy + 48}" font-size="30" fill="#fff" font-weight="800">${esc(d.name)}</text>`;
  const sub = d.parent ? `${d.parent}` : d.alias;
  s += `<text x="${x + 18}" y="${yy + 76}" font-size="16" fill="${C.rougeMist}" font-weight="500">${esc(sub)}</text>`;
  if (d.parent) {
    s += `<text x="${x + 18}" y="${yy + 100}" font-size="15" fill="${C.rose}" font-weight="500">${esc(d.alias)}</text>`;
  }

  if (d.viceShared) {
    s += `<text x="${x + 18}" y="${yy + headerH + 22}" font-size="15" fill="${C.muted}" font-style="italic">副社 ${esc(d.viceShared)}（与上共管）</text>`;
  }

  let cy = yy + headerH + (d.viceShared ? 32 : 12);
  for (const p of people) {
    const accent = p._role === "副社" ? C.rougeDeep : C.rouge;
    const c = personCard(x + 14, cy, p, { role: p._role, accent });
    s += c.svg;
    cy += rowH;
  }
  s += `</g>`;
  return { svg: s, w, h: cy - yy + 14 };
}

/* ══════════ 开始绘制 ══════════ */

// 背景
push(`<defs>
<linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#FDF9F6"/><stop offset="100%" stop-color="#F7EFEA"/>
</linearGradient>
<linearGradient id="hdr" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stop-color="${C.rougeDeep}"/><stop offset="100%" stop-color="${C.rouge}"/>
</linearGradient>
</defs>`);

y = PAD;

/* ── 页头 ── */
const HDR_H = 190;
push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="${HDR_H}" rx="28" fill="url(#hdr)"/>`);
push(`<text x="${W / 2}" y="${y + 62}" font-size="52" fill="#fff" text-anchor="middle" font-weight="900">${esc(ORG.title)}</text>`);
push(`<text x="${W / 2}" y="${y + 108}" font-size="30" fill="${C.rougeMist}" text-anchor="middle" font-weight="600">${esc(ORG.subtitle)}</text>`);
push(`<text x="${W / 2}" y="${y + 152}" font-size="23" fill="#FFE9E3" text-anchor="middle" letter-spacing="3">${esc(ORG.motto)}</text>`);

const mAix = mascot("aixin");
if (mAix) push(`<image href="${mAix}" x="${PAD + 26}" y="${y + 26}" width="136" height="136"/>`);
const mLead = mascot("shezhangtuan");
if (mLead) push(`<image href="${mLead}" x="${W - PAD - 162}" y="${y + 26}" width="136" height="136"/>`);

y += HDR_H + 34;

/* ── 指导老师 + 社长团 ── */
const LEAD_H = 168;
push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="${LEAD_H}" rx="24" fill="${C.white}" stroke="${C.goldSoft}" stroke-width="2.5"/>`);

// 指导老师
push(`<rect x="${PAD + 26}" y="${y + 26}" width="330" height="116" rx="18" fill="${C.cream}" stroke="${C.goldSoft}" stroke-width="2"/>`);
push(`<rect x="${PAD + 44}" y="${y + 42}" width="96" height="28" rx="14" fill="${C.gold}"/>`);
push(`<text x="${PAD + 92}" y="${y + 62}" font-size="17" fill="#fff" text-anchor="middle" font-weight="700">指导老师</text>`);
push(`<text x="${PAD + 44}" y="${y + 104}" font-size="34" fill="${C.ink}" font-weight="800">${esc(ORG.advisor.name)}</text>`);
push(`<text x="${PAD + 44}" y="${y + 130}" font-size="17" fill="${C.muted}">${esc(ORG.advisor.org)} · 2025.9 起</text>`);

// 社长团两人
let lx = PAD + 400;
for (const L of ORG.leaders) {
  push(`<rect x="${lx}" y="${y + 26}" width="360" height="116" rx="18" fill="${C.white}" stroke="${C.rougeDeep}" stroke-width="3"/>`);
  const m = mascot(L.mascot);
  if (m) push(`<image href="${m}" x="${lx + 258}" y="${y + 34}" width="92" height="100"/>`);
  const rw = L.role.length * 19 + 22;
  push(`<rect x="${lx + 20}" y="${y + 42}" width="${rw}" height="30" rx="15" fill="${C.rougeDeep}"/>`);
  push(`<text x="${lx + 20 + rw / 2}" y="${y + 63}" font-size="18" fill="#fff" text-anchor="middle" font-weight="700">${esc(L.role)}</text>`);
  push(`<text x="${lx + 20}" y="${y + 106}" font-size="36" fill="${C.ink}" font-weight="900">${esc(L.name)}</text>`);
  let tx2 = lx + 20;
  for (const t of L.tags) {
    const tw = t.replace(/[^\x00-\xff]/g, "aa").length * 8 + 18;
    push(`<rect x="${tx2}" y="${y + 116}" width="${tw}" height="24" rx="12" fill="${C.rougeDeep}" opacity="0.13"/>`);
    push(`<text x="${tx2 + tw / 2}" y="${y + 133}" font-size="14" fill="${C.rougeDeep}" text-anchor="middle" font-weight="600">${esc(t)}</text>`);
    tx2 += tw + 6;
  }
  lx += 380;
}

// 右侧统计
const sx = lx + 20;
const stats = [
  [`${STATS.total}`, "社长团+部长团"],
  [`${STATS.depts}`, "个部门"],
  [`${STATS.members}`, "名社员"],
];
let stx = sx;
for (const [v, l] of stats) {
  push(`<rect x="${stx}" y="${y + 26}" width="130" height="116" rx="18" fill="${C.rougeDeep}" opacity="0.08"/>`);
  push(`<text x="${stx + 65}" y="${y + 88}" font-size="42" fill="${C.rougeDeep}" text-anchor="middle" font-weight="900">${esc(v)}</text>`);
  push(`<text x="${stx + 65}" y="${y + 116}" font-size="15" fill="${C.muted}" text-anchor="middle" font-weight="600">${esc(l)}</text>`);
  stx += 142;
}

y += LEAD_H + 40;

/* ── 两大分组 ── */
for (const g of ORG.groups) {
  // 分组标题条
  push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="62" rx="16" fill="${C.rouge}" opacity="0.14"/>`);
  push(`<rect x="${PAD}" y="${y}" width="9" height="62" rx="4" fill="${C.rougeDeep}"/>`);
  push(`<text x="${PAD + 28}" y="${y + 41}" font-size="32" fill="${C.rougeDeep}" font-weight="900">${esc(g.label)}</text>`);
  push(`<text x="${PAD + 28 + g.label.length * 34 + 22}" y="${y + 40}" font-size="20" fill="${C.muted}" font-weight="500">${esc(g.note)}</text>`);
  push(`<text x="${W - PAD - 24}" y="${y + 40}" font-size="20" fill="${C.rouge}" text-anchor="end" font-weight="700">${g.depts.length} 个部门</text>`);
  y += 62 + 24;

  // 部门横排（自动换行）
  const bw = CARD_W + 28;
  const perRow = Math.floor((W - PAD * 2 + CARD_GAP) / (bw + CARD_GAP));
  let col = 0;
  let rowTop = y;
  let rowMax = 0;
  for (const d of g.depts) {
    if (col >= perRow) {
      col = 0;
      rowTop += rowMax + 26;
      rowMax = 0;
    }
    const x = PAD + col * (bw + CARD_GAP);
    const b = deptBlock(x, rowTop, d);
    push(b.svg);
    rowMax = Math.max(rowMax, b.h);
    col++;
  }

  // 职能部门右侧留白 → 填入说明面板
  if (g.key === "functional") {
    const px = PAD + g.depts.length * (bw + CARD_GAP);
    const pw = W - PAD - px;
    const ph = rowMax;
    push(`<rect x="${px}" y="${rowTop}" width="${pw}" height="${ph}" rx="22" fill="${C.white}" stroke="${C.rougeMist}" stroke-width="2" stroke-dasharray="10 7"/>`);

    push(`<text x="${px + 40}" y="${rowTop + 62}" font-size="34" fill="${C.rougeDeep}" font-weight="900">找到属于你的「欢乐小屋」</text>`);
    push(`<text x="${px + 40}" y="${rowTop + 100}" font-size="20" fill="${C.muted}">职能部门守护日常运转，项目部门把善意落在具体的人与事上。</text>`);

    const notes = [
      ["旁听制度", "职能部门新干事可选 1 个项目部门旁听，两边活动一起参加"],
      ["成长路径", "干事 -> 部长 -> 副社 -> 社长团，每年换届"],
      ["零经验友好", "绝大多数英仔进社前都没做过支教或敬老"],
      ["时间投入", "多数部门两周一次例会，学期内每周约 2—4 小时"],
    ];
    let ny = rowTop + 148;
    for (const [k, v] of notes) {
      push(`<rect x="${px + 40}" y="${ny - 22}" width="${k.length * 20 + 24}" height="32" rx="16" fill="${C.rougeDeep}"/>`);
      push(`<text x="${px + 40 + (k.length * 20 + 24) / 2}" y="${ny}" font-size="18" fill="#fff" text-anchor="middle" font-weight="700">${esc(k)}</text>`);
      push(`<text x="${px + 40 + k.length * 20 + 42}" y="${ny}" font-size="19" fill="${C.ink}">${esc(v)}</text>`);
      ny += 52;
    }

    // 两条品牌线
    push(`<line x1="${px + 40}" y1="${ny + 8}" x2="${px + pw - 40}" y2="${ny + 8}" stroke="${C.rougeMist}" stroke-width="2"/>`);
    ny += 52;
    push(`<text x="${px + 40}" y="${ny}" font-size="21" fill="${C.rougeDeep}" font-weight="800">两条品牌线</text>`);
    push(`<text x="${px + 190}" y="${ny}" font-size="20" fill="${C.ink}">大手拉小手 ＝ 启梦 ＋ 拾辉　·　青春伴夕阳 ＝ 向日葵 ＋ 常青藤</text>`);

    const mHint = mascot("jiaoliu");
    if (mHint) push(`<image href="${mHint}" x="${px + pw - 200}" y="${rowTop + ph - 212}" width="170" height="200" opacity="0.95"/>`);
  }

  y = rowTop + rowMax + 44;
}

/* ── 页脚 ── */
push(`<rect x="${PAD}" y="${y}" width="${W - PAD * 2}" height="86" rx="20" fill="${C.rougeDeep}"/>`);
push(`<text x="${PAD + 34}" y="${y + 38}" font-size="22" fill="#fff" font-weight="700">「英」为爱，「仔」一起　·　2026 招新进行中</text>`);
push(`<text x="${PAD + 34}" y="${y + 66}" font-size="17" fill="${C.rougeMist}">招新 QQ 群 712079220　·　yzaxs-1.pages.dev　·　标签均取自本人招新推文自述</text>`);
const mFly = mascot("aixin");
if (mFly) push(`<image href="${mFly}" x="${W - PAD - 96}" y="${y + 4}" width="78" height="78"/>`);
y += 86 + PAD;

const H = y;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif">
<rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
${parts.join("\n")}
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });
// SVG 内嵌了 base64 位图，体积大且非真矢量，只作为中间产物写到 .cache（已 gitignore）
const CACHE_DIR = join(ROOT, ".cache");
mkdirSync(CACHE_DIR, { recursive: true });
const svgPath = join(CACHE_DIR, "组织架构图.svg");
writeFileSync(svgPath, svg, "utf8");
console.log(`   SVG (中间产物) ${svgPath}  (${W}×${H})`);
console.log(`   人数：社长团 ${STATS.leaders} + 部长 ${STATS.heads} = ${STATS.total}`);

/* ── SVG → PNG（resvg，内嵌中文字体） ── */
try {
  const { Resvg } = await import("@resvg/resvg-js");
  const fontDir = await ensureFonts();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: {
      fontDirs: [fontDir],
      loadSystemFonts: false,
      defaultFontFamily: "Noto Sans SC",
    },
  });
  const png = resvg.render().asPng();
  const pngPath = join(OUT_DIR, "组织架构图.png");
  writeFileSync(pngPath, png);
  console.log(`✅ PNG  ${pngPath}  (${(png.length / 1024 / 1024).toFixed(2)} MB)`);
} catch (e) {
  console.warn("⚠️  PNG 渲染跳过：", e.message);
}
