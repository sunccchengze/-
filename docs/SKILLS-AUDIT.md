# 五个 Frontend Skills 使用审计 · 2026-08-02

对照你点名的 skill，本仓库**已采用 / 本轮新增 / 刻意不做**如下。

---

## 1. impeccable（反模式 + 工艺词汇）

| 原则 | 状态 |
|------|------|
| Brief wins：莫兰迪红 / 公益温度优先 | ✅ 未换赛博紫粉皮 |
| 禁 AI slop：紫渐变、侧条、卡片套卡片 | ✅ 未引入 |
| 对比度 / focus / 44px 热区 | ✅ focus-ring、触控区、muted 加深 |
| reduced-motion | ✅ 全局 + marquee/zoom 降级 |
| 进度与导航交互 | ✅ **本轮新增** ScrollProgress、nav 滚动高亮 |
| 视频失败回退 | ✅ **本轮新增** Honors onError → poster |

未全量跑 `npx impeccable detect` CLI（环境未装其 npm 包），但规范已写入 `frontend-skills-playbook.md`。

---

## 2. Taste Skill（VARIANCE / MOTION / DENSITY）

| 旋钮 | 本站 | 本轮 |
|------|------|------|
| VARIANCE | 中高 | ✅ 荣誉 **Marquee** 打断「全是三列卡」节奏；暑期主卡奇偶换位 |
| MOTION | 中 | ✅ 进度条 spring；marquee 可 hover 暂停；不堆 bounce |
| DENSITY | 中低 | ✅ section 留白保留；数字第二排加密但不挤 Hero |

---

## 3. ui-ux-pro-max

| 项 | 状态 |
|----|------|
| Hero-Centric + Social proof + Catalog + Soft CTA | ✅ 结构齐全 |
| 交付清单：无 emoji 图标、cursor、hover 150–300ms | ✅ Lucide |
| 转化路径清晰 | ✅ Trust → 故事 → 部门 → 三步加入 |
| 行业：教育/公益温暖 Soft UI | ✅ glass + 莫兰迪 |

---

## 4. 前端大神精选（工程）

| 项 | 状态 |
|----|------|
| config 单一数据源 | ✅ |
| content 文案分离 | ✅ |
| 组件拆分 | ✅ 20 个组件级文件 |
| typecheck / build | ✅ |
| 性能：lazy bg、preload LCP | ✅ |
| **singlefile + public 资源** | ⚠️ dist 会拷贝 images/videos；CF 需整包 `dist/` 部署，不能只传一个 html |

---

## 5. amap-skills

| 项 | 状态 |
|----|------|
| 地图 | ❌ **刻意不做**（招新站无 LBS 刚需；Key 与审核成本不值） |

若以后做「志愿足迹图」再启。

---

## 本轮新增的「高级设计点」

1. **ScrollProgress** 顶栏阅读进度（金—玫瑰渐变）  
2. **HonorMarquee** 荣誉关键词横向漫游（打断节奏）  
3. **Nav 滚动高亮** IntersectionObserver  
4. **md 断点折叠导航**（防 8 链接挤爆）  
5. **荣誉视频 onError 回退**  
6. **正式域名 SEO 全家桶**（你给的 Pages 地址）

---

## 建议你 CF 部署时注意

- 构建命令：`npm run build`  
- 输出目录：`dist`（需包含 `dist/images`、`dist/videos`）  
- 预览：你已有 **https://yzaxs-1.pages.dev/** —— 改完推送后硬刷新（Ctrl+Shift+R）查看最新  
