# 英仔爱心社 2026 招新站｜超长连续工作交接手册

> **用途**：这是给下一位接手本仓库、且没有任何先前聊天记忆的 AI Agent / 开发者的工作记忆迁移文件。它不是简短 README，也不是面向公众的文案。必须先读本文件，再读下列原始事实、素材、代码与记录文件，才能继续工作。
>
> **最后更新**：2026-08-04（Asia/Shanghai）
> **当前工作分支**：`arena/019fc032-repo`
> **用户本地仓库**：`D:\yingzai-recruit`
> **仓库服务对象**：西安交通大学英仔爱心社 2026 招新网站。
> **最高原则**：不编造、不把推断写成事实、不用“看起来合理”的 AI 文案替代真实组织信息。

---

# 0. 给下一位 Agent 的第一段话

你接手的不是一个泛公益社团模板，而是一个由用户长期逐项核验、反复纠偏的真实招新站。用户叫孙承泽，是英仔爱心社宣传部部长，对网站、图片、视频、事实与表达有强烈控制欲和高标准；他不喜欢空泛的管理话术、过度客气、假大空、AI 腔、臆造数据或“先交一个差不多版本”。

他希望你直接、诚实、高质量地干活：发现事实不确定，先记录；发现用户已明确否定的方向，不要反复走回去；用户要求“继续工作到 deadline”，不要每做一小步就发送“继续中”并结束工作窗口。详见 [`docs/DEADLINE-TASK-EXECUTION-GUIDE.md`](./docs/DEADLINE-TASK-EXECUTION-GUIDE.md)。

绝不能把“用户想要高级感”理解为堆积金色、粒子、烟花、霓虹或炫技。当前视觉目标是：**低调奢华、明亮高级、暖金、低饱和红、乳白、真实影像、可读性优先**。

---

# 1. 先读什么：文件阅读顺序

## 1.1 强制优先阅读

1. 本文件 `HANDOFF.md`；
2. [`docs/PUBLIC-FACT-REGISTER.md`](./docs/PUBLIC-FACT-REGISTER.md)：公开事实总表；
3. [`QUESTIONS.md`](./QUESTIONS.md)：不确定项、待用户确认项；
4. [`src/config.ts`](./src/config.ts)：链接、所有图片/视频路径、首页轮播、暑期图集；
5. [`src/content.ts`](./src/content.ts)：所有公开文案、部门、暑期项目、荣誉、FAQ；
6. [`docs/ASSET-MANIFEST.md`](./docs/ASSET-MANIFEST.md)：素材目录约定；
7. [`docs/SUMMER-GALLERY-SLOTS.md`](./docs/SUMMER-GALLERY-SLOTS.md)：暑期图片槽位；
8. [`docs/IMAGE-NAMING-PLAN-CN.md`](./docs/IMAGE-NAMING-PLAN-CN.md)：中文命名规则；
9. [`docs/DEADLINE-TASK-EXECUTION-GUIDE.md`](./docs/DEADLINE-TASK-EXECUTION-GUIDE.md)：有截止时间任务的执行规则。

## 1.2 重要专项资料

- [`docs/QINCHUAN-2026-SIX-DIMENSIONS.md`](./docs/QINCHUAN-2026-SIX-DIMENSIONS.md)：知行秦川六维成果稿。注意其中精确课时口径若没有原始排课/结项台账，不能擅自扩展到公开网站或新材料；用户近期对 `九峰 100+ / 彬州 50+` 的证据链提出追问。
- [`docs/VIDEO-QINCHUAN-WRAPPER.md`](./docs/VIDEO-QINCHUAN-WRAPPER.md)：知行秦川正式片与公开包装片的边界。
- [`docs/VIDEO-QINCHUAN-SCRIPTS.md`](./docs/VIDEO-QINCHUAN-SCRIPTS.md)、[`docs/VIDEO-STRATEGY-RESET.md`](./docs/VIDEO-STRATEGY-RESET.md)、[`docs/viral-video-brief.md`](./docs/viral-video-brief.md)：视频策略。
- [`docs/RECRUITMENT-OPERATIONS-MATRIX.md`](./docs/RECRUITMENT-OPERATIONS-MATRIX.md)：招新运营口径。
- [`docs/DEVICE-QA-RUNBOOK.md`](./docs/DEVICE-QA-RUNBOOK.md)：设备实测清单。
- [`docs/YINGZAI-INTERNAL-ARCHIVE.md`](./docs/YINGZAI-INTERNAL-ARCHIVE.md)：内部档案。它有价值，但不是自动等于“可公开、已确认”的事实来源。
- [`docs/content-source/`](./docs/content-source/)：较早内容来源与地图。需要与最新用户确认交叉核验。
- `GHG_1.md` 至 `GHG_4.md`：先前多视角审查材料；把它们视为过程资料，不可替代用户最后确认。

## 1.3 代码入口

- `src/App.tsx`：正常公开页组件顺序；
- `src/components/HeroV2Pro.tsx`：**正常首页唯一正式 Hero**；
- `src/components/HeroPreview.tsx`：仅 `?preview=hero` 的内部 Hero 对比器；
- `src/components/SummerPractice.tsx`：暑期实践；
- `src/components/SummerFilms.tsx`：两条暑期视频；
- `src/components/Honors.tsx`：荣誉区与 27 张典藏墙；
- `src/components/Departments.tsx`：部门区；
- `src/components/Footer.tsx`、`src/components/FlippingQRBlock.tsx`：报名/招新群二维码入口；
- `scripts/validate-assets.mjs`：配置资产存在性；
- `scripts/audit-public-surface.mjs`：公开页面回归守卫。

---

# 2. 用户协作习惯与不可触碰规则

## 2.1 沟通风格

- 直接、短句、具体。不要“非常感谢您的耐心”“我将竭诚”等客服腔。
- 不要假装已验证。必须区分：代码检查通过 / 本地浏览器观察 / 真机实测 / 外部链接人工验证。
- 不确定时说不确定，并写入 `QUESTIONS.md` 或明确列在交付里。
- 用户允许很长、很细的交接与方案，但不喜欢无意义状态播报。
- 用户会从截图中指出细微排版问题；看到截图后，先复述你理解到的**几何/视觉问题**，不要凭猜测连续改几版。

## 2.2 真实性与隐私

- 不造数据、不造活动、不造荣誉、不造证书。
- 荣誉卡只能使用真实证书、奖杯照片、官方获奖截图或官方推送截图。
- 萤火、医院、特殊儿童、特殊群体场景：不可公开可识别正脸；需要贴纸、遮挡或使用背影/手部/远景。用户上传的萤火素材已经有遮脸处理，后续不要用未处理照片替换。
- 普通活动参与者照片，按用户实际授权与素材情况使用。
- 不能把官方项目/奖项名称擅自“优化”。例如：
  - 普通部门描述中，使用“陕历博”或“陕博”；
  - **官方项目名称**必须保留 `薪火传史·文博项目`，不能改成“薪火传史·陕历博项目”。此前曾犯过这个错误，必须避免。

## 2.3 招新价值观与表述红线

不要使用或暗示：

```text
刷工时
综测收益
工时可认证
保证录取
调剂
秋招
秋季招新
```

不要把加入社团描述为高压、牺牲学业、必须拼命的志愿劳动。用户确认的稳定口径：多数部门通常两周一次例会；学期内平均每周约 2—4 小时；不同部门、活动节点有所变化；寒暑期实践时间更集中。

---

# 3. Git、分支、部署与本地运行

## 3.1 分支原则

只能在：

```text
arena/019fc032-repo
```

工作。不要切换到别的分支；不要 force push。

仓库环境有时 Git 元数据会落后，而工作区保留较新内容。Agent 环境恢复方法：

```bash
git fetch origin arena/019fc032-repo
git reset --mixed FETCH_HEAD
```

如果确认工作区没有需要保留的未提交内容、需要完全以远端为准，才可用：

```bash
git reset --hard FETCH_HEAD
```

本地用户的未跟踪视频、未提交图片可能是真实素材，**不要建议 `git clean`，不要建议 `git add .`**。

## 3.2 用户本地常用命令

```powershell
cd D:\yingzai-recruit
git pull --rebase origin arena/019fc032-repo
npm install
npm run dev
```

本地预览：

```text
http://localhost:5173/
```

内部 Hero 比较器：

```text
http://localhost:5173/?preview=hero
```

浏览器缓存/旧 Vite 排查：

```text
Ctrl + C
npm run dev
Ctrl + F5
```

## 3.3 Cloudflare 状态

Agent 环境没有 Cloudflare 凭据：

```text
CLOUDFLARE_API_TOKEN: absent
CLOUDFLARE_ACCOUNT_ID: absent
wrangler whoami: not authenticated
```

不要承诺 Agent 已部署 Pages。用户当前最可信的审核路径是 localhost 录屏。历史 Pages URL 可能陈旧，不要作为当前版本依据。

## 3.4 视频 Git 限制

已推送并在仓库存在：

```text
public/videos/summer/2026-qinchuan-recap.mp4  约 91 MB
public/videos/summer/2026-yushu-recap.mp4     约 48 MB
public/videos/荣誉历程.mp4                     约 2.2 MB
```

知行秦川原始片曾约 384MB，不能推 GitHub。当前推入仓库的是压缩后的 Web 版。未来替换时确保单文件低于 GitHub 100MB 限制；不要推荐 Git LFS 作为 Pages 静态视频播放方案。

---

# 4. 网站当前结构与正常公开路径

正常页组件顺序（`src/App.tsx`）：

1. `Navigation`
2. `HeroV2Pro`
3. `TrustBar`
4. `About`
5. `NewcomerPath`
6. `Statistics`
7. `HonorMarquee`
8. `SummerPractice`
9. `SummerFilms`
10. `MemberVoices`
11. `Leadership`
12. `WhyJoin`
13. `Honors`
14. `Departments`
15. `SocialMedia`
16. `JoinCTA`
17. `FAQ`
18. `Footer`
19. `EagleMascot`

正常页面不应出现 Hero 候选切换器。`?preview=hero` 才展示内部预览；这是有意设计，不是公开招新页的一部分。

---

# 5. 精确招新事实（高优先级）

## 5.1 官方招新路径

```text
军训期间扫楼发宣传单
→ 新生通过宣传单、公众号、网站、部门介绍了解英仔
→ 填电子报名表
→ 填第一志愿部门、第二志愿部门
→ 等待面试安排
→ 结果通过报名联系方式通知（短信口径）
→ 录取至第一志愿或第二志愿部门
→ 录取后学长学姐加微信
→ 进入对应部门，以干事身份开始
→ 部长一定带队说明流程、分配任务；副社视活动安排参与带领
```

表单字段已确认：

```text
第一志愿部门
第二志愿部门
姓名
班级
学号
为什么想进入该部门
技能与特长
性格 / 自我介绍
微信号
手机号
```

- 面试通知通过短信；
- 未录取者也应获得短信通知；
- 不公开谈未确认的“调剂”；
- 正式录取前不承诺一对一学长学姐联系；录取后才加微信；
- 招新 QQ 群对所有新生开放；没有部门招新群、没有面试群。

## 5.2 报名与二维码

- `src/config.ts → LINK_报名` 当前为 WPS 链接；用户需最终人工确认是否为正式表。
- 报名二维码路径：`public/images/招新/报名二维码.png`。
- 招新群二维码路径：`public/images/招新/招新群二维码.png`。
- QQ 招新群号：`712079220`。
- 页脚二维码最近已改成统一深色玻璃卡设计；任何后续二维码替换都应保持精确文件名，不要改代码路径。

## 5.3 旁听制度

- 仅新录取的**宣传部、常务部**干事可旁听；
- 在首次部门会议/破冰例会，由部长组织选择；
- 每人选择**一个**旁听部门；
- 开放：前卫、洩湖、向日葵、常青藤；
- 不开放：交流部、陕博、萤火、启明星、心项目；
- 不另填申请，部长在人数合理时协调；
- 旁听生任务接近被旁听部门的普通干事，但正式归属仍是宣传/常务；
- 可公开的匿名真实路径：2025 年宣传部干事旁听前卫，2026 年竞选为宣传部部长后仍随前卫参加周至支教。

---

# 6. 组织与项目事实

## 6.1 年度组织信息

```text
2025—2026 学年：199 名社员
组织结构：3 个职能部门 + 8 个项目部门 = 11 个部门
指导老师：刘晗梦（仲英书院）
社长：王晗宇
```

内部成长顺序：

```text
干事 → 部长 → 副社
```

所有新成员以干事身份进入对应部门。

## 6.2 日常/跨部门规则

- 晨星助学：学期内周常助学，全社成员可报名，每学期至少 10 周；
- 交流部冬至饺子宴、春游等：全社可参加；
- 玉树：面向全校正式招募并面试，社内成员只是更熟悉项目、准备更充分，不能承诺录取；通常以大二、大三为主，大一结束后也有少量机会；
- 知行秦川：仅前卫、洩湖原有干事在完成第一学年后随所在组参与暑期支教；
- 萤火：入部后需岗前培训、物料准备，跟部长/副社参加，无额外筛选；
- 心项目：主要由本部门干事与部长统筹，其他人可能以参与者/顾客身份参与，不应说成项目管理者。

## 6.3 暑期实践页面

当前页面保留五条已确认方向：

```text
玉树支教团
知行秦川（前卫九峰 × 洩湖彬州）
萤火部儿童关怀
心项目 · 青护秦岭
启明星 · 启明寻洛，脉续中原
```

不要重新添加未确认的“青春伴夕阳暑期路线”或“陕博部暑期志愿联队”。此前曾因旧草稿推断而误加，已删除。

图片槽位：

```text
玉树：public/images/暑期实践/玉树/玉树1.jpg ... 玉树7.jpg
知行：public/images/暑期实践/知行秦川/知行1.jpg ... 知行7.jpg
萤火：public/images/暑期实践/萤火/萤火1.jpg ... 萤火7.jpg
秦岭：public/images/暑期实践/秦岭/秦岭1.jpg ... 秦岭7.jpg
启明星：public/images/暑期实践/启明星/启明星1.jpg ... 启明星7.jpg
```

用户已经实际推送启明星 7 张、知行替换图、萤火/秦岭第 7 张。不要再次删掉第 7 张；此前误删过，已恢复。

当前暑期卡片视觉处于用户持续微调阶段。用户的明确诉求：

- 萤火、秦岭、启明星支持卡图片区目标比例约 `2.35:1`；
- 玉树、知行主卡图片区曾讨论 1:1、后改为 4:3；
- 用户最后对“主卡图文一体、图片框比例”的视觉效果仍在截图审查中。不要再根据文字猜测结构；收到截图后逐项确认几何关系。

## 6.4 知行秦川六维材料的数字边界

历史汇总口径曾写：

```text
九峰：11 名志愿者、45 名学生、100+ 课时
彬州：6 名志愿者、60+ 名学生、50+ 课时
合计：17 名志愿者、105+ 学生、150+ 课时
```

用户曾确认这些作为汇总口径可用，但后来追问 `100+ / 50+` 的原始证据。仓库当前没有原始排课表、每日记录或官方结项台账可直接独立证明。处理原则：

- 不说这些数字是 Agent 自行计算的；
- 不把它们扩展为网站公开事实；
- 若用于申报稿，必须向用户确认是否仍采用该口径，或要求原始证据；
- 保留无精确课时数字的课程描述作为更稳妥替代。

---

# 7. 荣誉：27 张真实凭证与命名

荣誉墙不再是 12 张。用户已明确确认所有奖项真实，并推送了 27 张真实图佐证。

目录：

```text
public/images/荣誉/
├─ README.md
├─ 荣誉1.jpg
...
└─ 荣誉27.jpg
```

`README.md` 是精确文件名—奖项标题—项目说明映射的唯一优先来源。不要缩回 12 项，不要合并两张学雷锋优秀项目证书。

关键纠错：

```text
荣誉13.jpg：薪火传史·文博项目
荣誉14.jpg：萤火聚爱·童梦护航
```

两者是两张独立证书、两张独立卡。`薪火传史·文博项目`为官方名称，保持“文博”。

荣誉典藏墙行为：

- 前面暖金题签；
- 点击翻至真实证明；
- 使用 `object-contain`，横版证书不得被 `object-cover` 裁掉；
- 通过 Portal 渲染，带关闭按钮与 Escape；
- 当前 27 张图片已可解码、路径已存在；
- 如果图片加载失败，显示“荣誉证明暂无法加载”，不可再显示“待替换”。

已确认/记录的荣誉包括：榜样100社团、榜样100玉树团队、榜样100知行团队、立邦全国铜奖、西门子全国优秀奖、社会实践工作优秀项目、文明社团、五星级社团、最佳团日一等奖、红旗团支部、招生育才奖励金个人/团队奖、两项学雷锋优秀项目、学雷锋优秀组织、一站式三等奖/二等奖/人气奖、小我融入大我优秀团队、青年研究年会多项奖、第七届仲英榜样集体互助之星、仲英书院宣传先进个人。精确标题见荣誉 README 和 `src/content.ts → honorVault`。

---

# 8. 图片、命名与资源规范

## 8.1 总规则

- `public/images/` 仅使用中文目录、中文文件名；不要恢复英文标准目录，不要在根目录堆散图。
- 图片覆盖同名路径即可，除非用户明确要求改结构。
- 正常资产配置集中在 `src/config.ts`；内容卡使用 `src/content.ts`。
- 当前审查脚本检查：公开占位词、17 首页轮播、27 荣誉槽位、内部锚点、图片引用、按钮 type。

## 8.2 主要目录

```text
public/images/品牌/
public/images/招新/
public/images/首页/
public/images/页面背景/
public/images/公益剪影/
public/images/加入理由/
public/images/部门/
public/images/暑期实践/
public/images/小鹰/
public/images/荣誉/
```

## 8.3 首页轮播

```text
首页1.jpg ... 首页17.jpg
```

当前配置 17 张，路径在 `HERO_V2PRO_SLIDES`。第 16/17 张不应再出现“待替换”。

首页图片分辨率审查曾发现以下较低宽度素材，未来替换时优先使用 1920×1080 或更高的 16:9 横图：

```text
首页1、2、3、4、6、9、10、12、14、15、16、17
```

用户已主动替换过：首页 5、6、15；不要把旧版本覆盖回来。

## 8.4 页面背景

用户要求只维护一张背景：

```text
public/images/页面背景/统一页面背景.jpg
```

第 2—10 页与暑期区域共用它。不要重新要求用户提交十张背景图。

## 8.5 四个理由

用户要求以下两张配图互换：

```text
方向多，参与有章法
↔
从新人成长到独当一面
```

实际顺序在 `IMG_四大理由`。后续不要无意还原。

## 8.6 部门最后一行

项目部门共 8 个。用户选择方案 A：最后两个（启明星、心项目）做**双宽收官**，填满最后一行；后来又明确要求它们必须保持与其他卡一致的**上图下文字**，不能变成左图右文。当前代码应保持这一决定。

---

# 9. 视频策略与展示

## 9.1 暑期视频

网页位置：`SummerFilms.tsx`，位于 `SummerPractice` 后。

```text
知行秦川：/videos/summer/2026-qinchuan-recap.mp4
玉树：/videos/summer/2026-yushu-recap.mp4
```

两条视频均使用原生 controls、`playsInline`、`preload="metadata"`。用户此前已在 localhost 直接访问玉树视频路径并确认可播放，证明路径与浏览器编码正常。

## 9.2 荣誉背景视频

```text
public/videos/荣誉历程.mp4
```

荣誉区视频背景首次冷加载时曾显示静态 poster；刷新后出现。原因更可能是首访视频资源调度/缓存，不是“页面内存太大”。后续改为 `preload="auto"` 并降低视频遮罩强度以显出动态。用户最终应在本地首访人工检查。

## 9.3 正式片与包装片

知行秦川约 5 分钟正式片不可改原始内容，学校/立邦提交版本与公开包装版本必须分开。公开版可为：前导 teaser + 原正式片不动 + 尾部 outro。详见 `docs/VIDEO-QINCHUAN-WRAPPER.md`。

---

# 10. 小鹰、页脚与微交互

## 10.1 小鹰

路径：`public/images/小鹰/`，九张动作图。当前组件：`EagleMascot.tsx`。

预期：

- 首页挥手；
- 页面侧边随滚动；
- 暑期区飞行；
- 社媒区相机；
- “送你爱心”“画一笔”“带我加入”有动作；
- 可拖动、带惯性、约束；
- 收起/返回行为自然。

用户曾反馈拖动不顺，下一位 Agent 不要仅凭代码宣称已修复；需要用户真机/本地实际体验反馈。

## 10.2 页脚二维码

最近重做为两张同规格深色半透明玻璃卡：

```text
左：WPS 报名表 / 扫码报名
右：2026 招新群 / 点击查看群号，翻面显示 712079220
```

二维码外层装饰性白边已去掉；二维码图自身必要静区不要裁掉，否则影响扫码。

---

# 11. 已建立的自动化质量门禁

运行：

```bash
npm run audit:public
npm run typecheck
npm run validate:assets
npm run build
```

## 11.1 `audit:public`

脚本：`scripts/audit-public-surface.mjs`。

当前检查：

- 排除内部 `HeroPreview` 后，扫描正常公开源文件；
- 拦截：待替换、影像预留、影像正在整理、TODO、FIXME、Lorem ipsum、Coming Soon、秋季招新、秋招、刷工时、工时可认证、保证录取、调剂；
- 检查内部 hash anchor 是否有 DOM id；
- 检查首页精确 17 张；
- 检查荣誉精确 27 张；
- 检查 `public/images` 中的图片是否有源码引用；
- 检查每个 button 是否显式 `type`。

若未来用户新增合法词而被误拦截，必须说明原因后有针对性地调整，不要粗暴关闭检查。

## 11.2 最近实际通过结果

截至 2026-08-04 deadline 审查：

```text
Public-surface audit passed: 36 source files, 17 homepage slides, 27 honor slots.
tsc --noEmit: pass
validate-assets: 128 configured assets, all exist
vite build: pass
125 张 public/images 图片 identify 解码：0 失败
3 段 MP4 container header：通过
内部锚点：无缺失
```

外链（WPS、微信、抖音、B 站、外部公众号）在 Agent 沙箱网络环境中不可确认，不得说“已打开验证”。用户需要手工点开/扫码验证。

---

# 12. 当前已知需要人工终审的项目

以下不是代码失败，而是不能在 Agent 沙箱中诚实完成的人工测试：

1. 正式 WPS 报名链接内容、字段、提交结果；
2. 两个二维码实际扫码是否准确指向报名表/QQ群；
3. 公众号、抖音、B 站、部门文章链接；
4. 微信和 QQ 内置浏览器；
5. 手机不同机型、Safari/Android Chrome；
6. 小鹰拖拽顺滑度；
7. 荣誉背景视频首访是否足够快出现；
8. 玉树、知行主卡最终 4:3 图片区视觉是否符合用户最新截图期待；
9. 启明星、心项目双宽收官卡的实际视觉呈现；
10. 敏感场景所有人脸遮挡是否符合用户最终审批。

不要把这些写成“已通过”。

---

# 13. 下一位 Agent 的工作方式示例

## 用户说“首页某张已在本地换了，帮我 push”

你无法直接访问 `D:\yingzai-recruit`。给用户**定向**命令，不要 `git add .`：

```powershell
git add "public/images/首页/首页6.jpg"
git commit -m "update homepage slide six"
git pull --rebase origin arena/019fc032-repo
git push origin arena/019fc032-repo
```

之后 fetch 检查远端 commit 与实际文件。

## 用户说“这个截图不好看”

先描述你理解到的布局问题，例如“右侧文字高度把左侧图片列拉成竖框”“卡片末行留下孤立第三列空白”。如果用户已经说清目标，不要再无意义要求确认；如果同一句话可能对应两种完全不同结构，给精确结构图/选项后等待确认。

## 用户说“我有 deadline，截止前一直干”

严格照 `docs/DEADLINE-TASK-EXECUTION-GUIDE.md`：读取时间，连续做独立审查，截止前不状态播报、不提交，截止时统一验证和推送。

---

# 14. 绝对不要做的事情

- 不恢复英文图片目录或根目录散图；
- 不把“文博”在官方 `薪火传史·文博项目` 中替换成“陕历博”；
- 不把青春伴夕阳、陕博暑期路线重新当作已确认活动；
- 不删萤火/秦岭第 7 张；
- 不把荣誉墙缩回 12 张或合并两项学雷锋证书；
- 不用 AI 生成荣誉证书；
- 不承诺 Cloudflare 已部署；
- 不建议用户 `git add .`、`git clean`、`git push --force`；
- 不在用户要求 deadline 前“不汇报、不提交”时多次 commit/push；
- 不把旧的 Hero preview、候选版本、设计工具暴露到正常公开首页；
- 不把未确认的课程/课时/人数/活动写进公开文案。

---

# 15. 最后的工作态度要求

这个项目的质量不靠一次“build passed”决定。用户会看：是否真实、是否精致、是否和实际社团一致、是否对新生有用、是否尊重活动参与者、是否没有露出内部残留。

下一位 Agent 的目标不是“快速产出更多页面”，而是让每一处公开呈现都能经得起刘晗梦、社长团、普通新生、真实参与者和宣传部的追问。

当不确定时，宁可保守、记录、询问，也不要补写。
