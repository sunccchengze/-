# 招新官网 · 前端 AI Skills 工作规范

> **用途**：把你点名的 5 个前端 Skill 的精华，压成**本仓库可执行的约束**。  
> 之后所有 UI 改动默认遵守本文 + 现有品牌（莫兰迪红体系），避免「AI 塑料味」。  
> **项目**：西安交通大学英仔爱心社 2025 招新官网（React 19 + Vite 7 + TS + Tailwind v4 + framer-motion）  
> **更新**：2026-08-02  
> **状态**：规范已就绪；等你发「文本/图片内容变化」后开工改站

---

## 0. 和本站的关系（先对齐）

| Skill | 对本站价值 | 本轮用法 |
|-------|------------|----------|
| **impeccable** | 反模式词典 + polish/distill/critique 词汇 | **主约束**：禁 AI slop、统一层次与留白 |
| **Taste Skill** | 品位、防模板脸、VARIANCE/MOTION/DENSITY 旋钮 | **主审美**：在保留品牌下提高设计密度与节奏 |
| **ui-ux-pro-max** | 行业模式、配色/字体配对、交付前清单 | **清单与模式**：公益招新落地页结构 + a11y |
| **前端大神精选合集** | 文档/最佳实践/工程规范 | **工程**：组件边界、config 单一数据源、性能 |
| **amap-skills** | 高德 JS API 2.0 | **暂缓**：当前站无地图需求；若加「活动足迹/服务地图」再启用 |

> 原则（来自 impeccable）：**Brief wins。** 用户钉死的莫兰迪红 / 家文化 / 公益温度优先于任何 Skill 的默认审美。  
> **Refinement ≠ Redesign**：默认在现有视觉世界上打磨，不擅自换皮；换皮需你明确说「重做视觉」。

---

## 1. 本站既有设计真相（Incumbent world — 必须保留）

来自 `src/index.css` + `README.md` + `src/config.ts`：

### 1.1 色彩 token（已是设计系统）

```
rouge-deep  #8E3F3D
rouge       #B25A55
rouge-soft  #C97D74
rouge-mist  #E2BDB6
rose        #D4A5A5
rose-soft   #E6C9C2
gold-soft   #C9A876
gold        #8A6A2E
ink         #3E3E3E
muted       #6B6B6B
cream       #FAF6F3
paper       #FFFFFF
```

- 禁止改成「AI 紫粉渐变 / 霓虹赛博 / 无品牌灰蓝 SaaS 默认色」。  
- 新色必须先加 `@theme` token，组件内禁止散落魔法 hex（装饰性一次性渐变除外，且需注释）。

### 1.2 字体

- Sans：Inter + Noto Sans SC  
- 中文标题衬线：Noto Serif SC  
- 数据数字：Libre Baskerville / Playfair Display  
- 禁止再堆 3 个以上 Google Fonts 家族。

### 1.3 已有质感语言（升级时强化，不删除）

- 毛玻璃：`.glass-panel` / `.glass-panel-dark` / `.glass-highlight`  
- 卡片：`.card-outline-gradient` + hover 上浮  
- Section：图片底 + `.veil-*` 多层蒙版  
- Hero：轮播 + 可保留 slow-zoom 呼吸  
- 部门 Tab：`layoutId` 胶囊  
- 统计：CountUp + intersection observer  
- 移动端：全屏汉堡、≥44px 热区  

### 1.4 工程铁律

- **链接与图片路径只改 `src/config.ts`**  
- 文案数据集中，避免 App.tsx 里魔法字符串散落（优化时可逐步抽 `content.ts`）  
- 图标：Lucide / 品牌 SVG，**禁止 emoji 当图标**

---

## 2. Impeccable · 反模式黑名单（本站定制）

改 UI 时，下列视为 **P0 缺陷**（发现必修）：

### 2.1 AI Slop 典型

- [ ] 紫/蓝科技渐变、无品牌依据的 mesh gradient 盖全屏  
- [ ] 一切居中 + 同一字号阶梯（扁平无层次）  
- [ ] 卡片套卡片套卡片（nested cards）  
- [ ] 左侧竖条彩边（side-stripe）当唯一装饰  
- [ ] 标题里乱斜体英文 + 空洞 slogan（“Unlock your potential” 类）  
- [ ] 过度 `gradient-text`：一屏超过 2 处渐变字  
- [ ] 圆角全员 `rounded-3xl` 无对比（大中小圆角无体系）  
- [ ] 阴影又重又脏（多级同色黑阴影叠罗汉）  
- [ ] 装饰线、光球、blur blob 无信息作用却抢视线  

### 2.2 排版与间距

- [ ] 正文 < 14px（移动端正文目标 ≥16px）  
- [ ] 行高挤成一团（正文目标 ~1.7）  
- [ ] section 上下 padding 随机（应对齐既有 `section-block` 节奏，或建立 8px 网格：4/8/16/24/32/48/64/96/160）  
- [ ] 标题与正文间距忽大忽小  
- [ ] 中英文混排基线飞掉、全角半角混乱  

### 2.3 动效

- [ ] 为动而动：无意义 loop bounce  
- [ ] 动画 `width/height` 触发布局抖动（用 transform/opacity）  
- [ ] 忽略 `prefers-reduced-motion`  
- [ ] 时长 > 600ms 的常规 hover（常规交互 150–300ms）  

### 2.4 可访问与触控（ui-ux-pro-max P0）

- [ ] 正文对比度 < 4.5:1（尤其是 `veil-dark` 上的浅字、`muted` 过浅）  
- [ ] 可点元素无 `cursor-pointer` / 无 hover·focus 态  
- [ ] 点击热区 < 44×44px  
- [ ] 图标按钮无 `aria-label`  
- [ ] 仅靠 hover 才能用的关键信息（移动端失效）  
- [ ] 图片无有意义 `alt`（装饰图用 alt=""）  

### 2.5 招新落地页业务反模式

- [ ] 首屏看不到主 CTA（立即报名）  
- [ ] 报名链接多处不一致（必须全部走 `config` 的 `LINK_报名`）  
- [ ] 部门信息只堆形容词、无「适合谁 / 干什么 / 时间成本」  
- [ ] FAQ 与部门规则互相矛盾  
- [ ] 二维码过期仍展示、无「打不开就点链接」双通路  

---

## 3. Taste Skill · 三个旋钮（本项目默认值）

| 旋钮 | 本站默认 | 含义 | 何时拧 |
|------|----------|------|--------|
| **VARIANCE** | **中高 (0.65)** | 版式变化：非每区都是「左文右图/三列卡」 | 用户嫌「模板脸」→ 再升高；嫌乱 → 降 |
| **MOTION** | **中 (0.5)** | 已有 framer-motion；保持克制 scroll reveal | 做荣誉叙事可略升；信息密集区降 |
| **DENSITY** | **中低 (0.4)** | 公益温度靠留白呼吸，不做成 dashboard | 部门墙可略升；Hero/CTA 保持疏 |

**品位指令（生成/修改组件时默念）：**

1. 每屏只有 **一个** 视觉焦点。  
2. 用 **真实活动照片** 承担情感，UI 只做框与节奏，不和照片抢戏。  
3. 中文标题优先衬线（`font-serif-cn`），UI 标签/导航用无衬线。  
4. 允许不对称、破格（大数字、半出血图、横向滚动剪影），但 **色与圆角体系不破**。  
5. 禁止用「万能三列图标卡」解决所有 section——至少一半 section 要有独特布局。

---

## 4. ui-ux-pro-max · 本站推荐设计系统（生成器结论）

> 产品类型：大学公益社团招新落地页（Education + Nonprofit + Campus Recruiting）

| 维度 | 推荐 | 备注 |
|------|------|------|
| **Pattern** | Hero-Centric + Social Proof + Department Catalog + Soft CTA | 现结构已接近，做强化而非推翻 |
| **Style** | Soft UI Evolution × 轻度 Glass × Editorial warmth | 对齐现有 glass + 莫兰迪；**不要** Neubrutalism / Cyberpunk |
| **Conversion** | 情绪信任（故事+数据）→ 部门匹配 → 报名 | CTA 重复：Hero / 中部 sticky 或 Join / Footer |
| **Typography** | 保持 Noto Serif SC + Inter/Noto Sans SC | 可微调字号阶梯，不换家族 |
| **Effects** | 软阴影、200–300ms hover、scroll fade-up、胶囊 layoutId | 不用弹跳、不用强视差晃眼 |
| **Avoid** | 霓虹、暗黑赛博、emoji 图标、纯奖状墙无故事、机关红头文件风 | 红要用莫兰迪红不是国旗红 |

### 交付前清单（每 PR / 每轮改 UI 自检）

- [ ] 无 emoji 当图标（Lucide/SVG only）  
- [ ] 可点击元素有 cursor-pointer + hover + focus-visible  
- [ ] 过渡 150–300ms  
- [ ] 亮色模式正文对比度 ≥ 4.5:1  
- [ ] `prefers-reduced-motion` 降级  
- [ ] 响应式抽检：375 / 768 / 1024 / 1440  
- [ ] 无横向滚动条（除有意的横向 gallery）  
- [ ] 图片 `loading="lazy"`（首屏除外）+ 占位尺寸防 CLS  
- [ ] 主 CTA 文案具体（「加入英仔」类）非「了解更多」独苗  
- [ ] 所有外链 `rel` 合理；报名链可点击  

---

## 5. 工程效率 Skill（前端大神精选 · 落地到本仓）

### 5.1 目录约定（优化时可演进）

```
src/
  config.ts          # 唯一链接/图片/QQ 配置
  content.ts         # （建议新增）文案、部门、FAQ、荣誉纯数据
  components/        # （建议拆）Navbar, Hero, About, Stats, ...
  App.tsx            # 组合页面
  index.css          # design tokens + 工具类
  utils/cn.ts
docs/
  frontend-skills-playbook.md   # 本文
  design-audit.md               # （改站时产出）问题清单
```

### 5.2 开发节奏（高效）

1. **先审计再动手**：出 `design-audit.md`（问题按 P0/P1/P2）  
2. **先 token/基础类，再组件，再文案**  
3. **内容与样式分离**：你稍后给的文本/图片 → 只动 `config` + `content`，少动结构  
4. **每完成一个 section 本地 `npm run build` 验一次**  
5. 不确定视觉方向 → **先问再改**（对齐 ai-agent-guide）

### 5.3 性能预算（招新 H5 关键）

- 首屏背景图压缩（目标单张 < 300KB，或 srcset）  
- 剪影 gallery 懒加载  
- 荣誉视频：`muted playsinline` + poster；注意 `public/videos` 体积  
- framer-motion：避免整页重动画；列表用 `layoutId` 已可  
- 字体：已 `display=swap`；勿再引入整套可变字重无子集  

---

## 6. amap-skills · 暂缓说明

当前 IA 无地图模块。若未来要做：

- 「志愿足迹：蓝田 / 洩湖 / 玉树 / 陕博」互动地图  
- 校内集合点导航  

再引入 [AMap-Web/amap-skills](https://github.com/AMap-Web/amap-skills)，Key 走环境变量，样式用自定义莫兰迪皮肤，不走默认高德蓝。

**现在：不安装、不写地图代码。**

---

## 7. 改站时的 Agent 操作协议（绑定 ai-agent-guide）

1. **先对齐再动手**：内容变更清单不清时先问。  
2. **不编造**：荣誉数字、链接、部门职责以你提供 / `config` / 官网文案为准。  
3. **长期记忆**：重要决策写入 `docs/`（本文、audit、changelog）。  
4. **Refinement 默认**：保留品牌与信息架构，除非你下「重设计」指令。  
5. **Skill 冲突时**：`用户 brief > 本站 incumbent tokens > impeccable 反模式 > taste 旋钮 > pro-max 推荐`。

---

## 8. 下一轮开工等待清单（你稍后发）

请尽量按块丢给我（有什么发什么）：

- [ ] **文案变更**：哪些 section 改字？新旧对照或直接全文  
- [ ] **图片/视频**：替换哪些 `public/images/*`？命名是否仍走 config？  
- [ ] **结构**：增删 section？部门有变？  
- [ ] **范围**：只 polish 质感 / 还是连 IA 一起改 / 移动端优先？  
- [ ] **参照**：有没有「就要这个质感」的站点或截图？  

我收到后默认顺序：

1. 快速视觉+代码审计 → `docs/design-audit.md`  
2. 按 P0→P1 改 token/基础组件  
3. 接入你的新文本与图片  
4. 响应式与 a11y 过清单  
5. `build` 通过 + 简短 changelog  

---

## 9. 参考链接（Skill 源）

| Skill | 入口 |
|-------|------|
| impeccable | https://impeccable.style/ · https://github.com/pbakaus/impeccable |
| Taste Skill | https://github.com/Leonxlnx/taste-skill |
| ui-ux-pro-max | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| amap-skills | https://github.com/AMap-Web/amap-skills |
| 前端大神精选 | 以社区精选 SKILL 合集为准；工程约定已吸收进 §5 |

---

*规范存档于 2026-08-02 · 短视频任务见 `viral-video-task.md`（PAUSED）*
