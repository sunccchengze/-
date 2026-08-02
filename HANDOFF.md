# 英仔爱心社招新站｜交接与恢复说明

> **用途**：无论当前 Arena 会话是否继续、是否合并 PR、是否更换 agent，本文件都让下一位执行者在不依赖聊天上下文的情况下恢复工作。  
> **本文件不是部署说明的替代品**：它不能赋予 Cloudflare、GitHub 或 Arena 的远程权限；它保存的是代码状态、决策、验证和下一步。

## 1. 当前安全状态

- 工作分支：`arena/019fc032-repo`
- 基线分支：`main`
- **建议**：先保留本分支作为唯一迭代分支；不要为了预览而仓促合并到 `main`。
- 正式部署现状：Cloudflare Pages 当前未提供可用于本会话的 API Token，且旧预览未自动跟随本分支更新。
- 本地预览：
  ```bash
  npm install
  npm run dev
  # http://localhost:5173/
  ```
- 构建预览：
  ```bash
  npm run build
  npm run preview
  # http://localhost:4173/
  ```
- 内部 5 版首页比较器：在任一预览 URL 后加 `?preview=hero`。

## 2. 已完成的核心网页改造

1. 正式页默认使用 V3 分屏首屏；5 个候选 Hero 只在 `?preview=hero` 出现。
2. 2026 秋招、QQ群 `712079220`、刘晗梦老师、现届社长团、2026.7 暑期实践已写入内容层。
3. 玉树第十七届、知行秦川九峰/彬州双线、萤火/秦岭/启明星等项目已结构化展示。
4. 招新页已去除换届新闻、内部制度、财务和功利化“综测/刷工时”表达。
5. 手机端首屏留白和项目浮卡已优化；固定报名条已避免“工时可认证”话术。
6. 加入区直接显示并可复制 QQ 群号。
7. 部门区可按“想陪伴孩子/长者/走进公共空间”点击推荐并高亮对应项目部门。
8. FAQ、复制反馈、二维码翻转交互已做语义和可访问性硬化。

## 3. 最重要文件

| 用途 | 文件 |
|---|---|
| 招新网站内容、部门、数据、FAQ | `src/content.ts` |
| 报名表、QQ群、外链、图片路径 | `src/config.ts` |
| 页面装配与正式/内部预览切换 | `src/App.tsx` |
| 首屏正式候选 | `src/components/HeroV3.tsx` |
| 部门推荐交互 | `src/components/Departments.tsx` |
| 加入、复制群号 | `src/components/JoinCTA.tsx` |
| 图片槽位与授权注意 | `docs/IMAGE-SLOTS.md` |
| 内部社团资料归档 | `docs/YINGZAI-INTERNAL-ARCHIVE.md` |
| 未确认事项 | `QUESTIONS.md` |
| 上线检查 | `docs/PRE-LAUNCH-CHECKLIST.md` |
| AI 内阁会议一至四 | `docs/AI-CABINET-MEETING-01-EVOLUTION-ROUTE.md` 至 `docs/AI-CABINET-MEETING-04-ENGINEERING-FINAL.md` |

## 4. 当前尚未完成、但不能擅自编造的事项

1. 最终报名表、部门公众号外链、招新具体截止日期/面试安排；
2. 真实照片替换及儿童、病房、特殊儿童场景的授权台账；
3. 王晗宇社长本人确认的寄语；
4. 具名社员引言的授权和原话；
5. 玉树届次、立邦奖项等级、部分统计截点的最终证据统一；
6. iPhone/Android/微信/QQ 真机扫码、二维码、报名跳转测试；
7. Cloudflare Pages 部署权限或 Git 自动部署关联。

## 5. 安全迭代流程

每次继续修改时：

```bash
npm run typecheck
npm run build
git diff --check
git add <changed files>
git commit -m "clear description"
git push origin arena/019fc032-repo
```

- 继续迭代：直接在 `arena/019fc032-repo` 提交并推送，不必先合并 main。
- 若要创建 PR：可以创建 **Draft PR**，它不会合并；后续向同一分支 push 会自动更新 Draft PR。
- 若要正式合并：在所有上线检查完成后再合并。合并后仍应保留本文件和分支提交记录，以便后续 agent/会话恢复。

## 6. 关于 Arena 会话与权限

- 本文件可以让未来会话/agent恢复上下文；
- 它**不能保证** Arena 会话、Cloudflare Token、远程工具或 GitHub 权限在平台层面持续存在；
- 因此关键策略是：所有工作及时提交到固定分支、所有未决事项写入文档、不要把唯一信息只放在聊天记录中。
