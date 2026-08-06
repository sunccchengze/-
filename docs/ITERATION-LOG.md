# 持续优化迭代日志

时区：Asia/Shanghai · 收工目标 2026-08-02 02:00

## Round 1 · 01:06–01:09
- 建立 `QUESTIONS.md`、`docs/IMAGE-SLOTS.md`、AI 内阁 skill 存档
- 信任条 TrustBar（五星 / 工时认证 / 仲英指导）
- 社员声音 MemberVoices
- 移动端 StickyJoinBar
- 假 QQ 群号诚实降级文案
- index.html meta/og/favicon 修复
- skip link + footer 指导语
- 数据数字改用品牌 gradient-text（去掉霓虹 vivid）
- build ✅

## Round 2 · 01:09–01:10
- Join 三步路径 joinSteps（降焦虑）
- Hero 轮播尊重 prefers-reduced-motion
- config QQ 注释警告
- QUESTIONS 追加 Q-016~019
- build ✅

## Round 3 · 01:10–01:10
- 部门品牌线 legend；JSON-LD；删 vivid 渐变

## Round 4 · 01:10–01:11
- 导航五星微标；About 简化；Sticky 桌面浮层+近页脚隐藏
- 滚动指示 a11y

## Round 5 · 01:11–01:11
- #impact；荣誉按钮对比度；hero preload/fetchPriority
- package 重命名 yingzai-love-club-recruit

## Round 6–9 · 01:11–01:13
- CTA 口语化；轮播 44px；robots.txt；卡片 hover 触控降级
- 回到顶部；社媒/voices id；README 重写；Social 标题去重

## Round 10–17 · 01:13–01:17
- About 金句；组件拆分 SectionHeader / BrandIcons / FlippingQR
- Impact 五星微条；FAQ a11y；部门「适合」样式
- 回到顶部；nav resize 关菜单；PRE-LAUNCH-CHECKLIST
- CTA 更口语；reduced-motion 加强；内阁纪要

## 视角自检备忘
| 视角 | 状态 |
|------|------|
| 新生 | 路径清晰、五星+工时可见但不喊「刷分」；三步加入 |
| 社员 | 有引言模块，待实名授权 |
| 指导老师 | 无财务/条例外泄；仲英指导露出 |
| 设计师 | 莫兰迪一致；仍缺真图（见 IMAGE-SLOTS） |
| 前端 | content/config 分离；App 仍偏大可继续拆 |

## Round 18–25 · 01:17–01:20
- 误删 Navigation/Hero 后完整恢复为独立组件
- FAQ 增补「五星级含义」
- 暑期主卡奇偶图文换位
- FloatingChrome / TrustBar / MemberVoices / FlippingQR 组件化
- 构建持续通过

## 收工前状态
- `npm run build` ✅
- 待用户：QUESTIONS.md + 真图 + 真群号

## 01:24–01:25 · 架构收官
- App.tsx 精简为组件组装层（~45 行）
- 18 个 section/chrome 组件
- CHANGELOG-2026-08-02.md
- QUESTIONS 置顶阻塞项










## 01:31–01:43 · 稳态维护
- 多轮 build/typecheck 绿灯
- MemberVoices 副标题强化社员现场感
- muted 对比度微调；综测话术再软化

## 2026-08-05 · 视频“网络不太顺畅”修复
- **根因**：`resolveVideoUrl()` 解构参数名为 `cdnUrl/pagesUrl/githubUrl`，与 `VIDEO_SOURCES_*` 的 `cdn/pages/github` 键不匹配 → 返回空串 → `<source src="">` 立即报错 → 知行/玉树两张卡都误显「网络不太顺畅」。非真实网络问题。
- 修复 `src/utils/detect-env.ts`：新增 `VideoSources` 类型与 `orderedVideoSources()`（国内：CDN→Pages→GitHub；海外：Pages→GitHub，去重）。
- 修复 `src/components/SummerFilms.tsx`：FilmCard 改为真实三级回退——当前源 `onError` 自动切下一源，全部失败才显示错误态；重试从第一源重新开始；video key 含 sourceIndex 强制重挂载。
- 顺手清理 `src/components/Honors.tsx` 未使用 import（阻断 typecheck 的存量问题）。
- `npm run typecheck` ✅ · `npm run build` ✅

## 2026-08-06 · 暑期视频播放源重设（七牛弃用）
- **背景**：七牛测试域名 `tjaojwmmm.hd-bkt.clouddn.com` 已失效（DNS 不通）；国内云 CDN 绑自定义域名均需 ICP 备案，对 pages.dev 不可行 → 弃用七牛，`src/config.ts` 删除 `CDN_VIDEO_BASE` 与 `cdn` 源。
- **转码**（ffmpeg 7，H.264 + AAC + faststart，2-pass）：
  - 知行秦川 91MB 1080p/2.3Mbps → **24.7MB 540p/500kbps**（311s，兼容全浏览器）
  - 玉树 47.7MB 720p **10-bit HEVC**/8.8Mbps → **10.4MB 720p H.264/1.8Mbps**（43s；顺带修复 HEVC 在 Firefox/部分安卓/微信里无法播放的问题）
  - 原文件仍在 git 历史与 GitHub Release（media-2026-v1）中。
- **新回退链**：B站嵌入（填 BV 号启用）→ Cloudflare Pages 压缩版（≤25MiB 单文件上限，已达标）→ GitHub Release → gh-proxy 镜像（可选）。
- **代码**：`detect-env.ts` VideoSources 改为 `bilibili/pages/github/mirror`，`orderedVideoSources` 去 CDN 逻辑；`SummerFilms.tsx` 支持 B站 iframe 嵌入（BV 号非空时优先），retry 补 `setIsPlaying(false)`。
- `npm run typecheck` ✅ · `npm run build` ✅（strip 脚本确认两视频均 < 25MiB，不再被删）

## 2026-08-06 · B站播放源接入（用户提供 BV 号）
- 用户确认使用社团 B站账号视频：
  - 知行秦川 → `BV1R2MX6cE6A`（《知行秦川，梦启今夏》5:11，2026-08-03 发布）
  - 玉树 → `BV1pqgv6cEPS`（《玉树｜满眼期待与新奇体验撞了个满怀》，2026-07-24 发布）
  - 均已通过 B站页面与官方嵌入播放器（player.bilibili.com）双重验证可播放。
- `src/config.ts`：两个 `bilibili` 字段填入 BV 号；国内用户点击后走 B站 iframe（全画质、不耗站流量），mp4 链（Pages→GitHub→镜像）保留为回退。
- `SummerFilms.tsx`：新增「B站播放不了？用直链播放」逃生通道（个别网络/企业网拦截 iframe 时手动切回 mp4 链）。
- `index.html`：preconnect 增加 `player.bilibili.com`（B站成为主源）。
- 全面体检：跨行精确扫描全部 `<img>` alt / `target="_blank"` rel（均合规）；组件逻辑、文案日期（2026/第十七届）、锚点、按钮 type 复查；`typecheck`/`build`/`validate:assets`/`audit:public` 四绿；本地 preview 冒烟验证页面与视频 Range 播放正常。
