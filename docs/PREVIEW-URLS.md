# 预览地址

## 首页方案比较器

只在带参数时展示 5 个内部候选首页；不会出现在新生正式访问页面：

`https://arena-019fbe18-repo.yzaxs-1.pages.dev/?preview=hero`

当前正式候选为 **V3 分屏叙事**：左侧保证信息可读，右侧只保留一张主视觉，避免整屏轮播造成杂乱。
（不要 merge main 也能看）

> 原则：**不要为了预览去 merge PR**。Arena 会话绑在分支 `arena/019fbe18-repo` 上，合进 `main` 可能导致会话结束。

## 推荐你现在打开（最新代码）

| 类型 | URL | 说明 |
|------|-----|------|
| **分支预览（首选）** | https://arena-019fbe18-repo.yzaxs-1.pages.dev | 跟随本工作分支，每次 push 自动更新 |
| **本次部署快照** | https://78a1fb14.yzaxs-1.pages.dev | 对应 commit `99cdd74` 的固定预览 |
| 生产域名（旧版） | https://yzaxs-1.pages.dev | 一般绑 `main`，**现在仍是旧站**很正常 |

打开分支预览后请 **强制刷新**：桌面 Ctrl+Shift+R / Mac Cmd+Shift+R；手机可用无痕窗口。

## 如何确认是新版？

首屏应看到：

- 徽章：**2026 秋季招新 · 校级五星级公益社团**
- 标签：校级五星级 / 志愿时光很充实 / 199 人在路上
- 向下滚应有：信任条（刘晗梦）、暑期玉树第十七届、**认识这一届英仔**、社长寄语占位

若仍是旧文案，说明你还在生产域名上。

## Cloudflare 机制

Pages 对每个非生产分支会生成：

```text
https://<分支名规范化>.<项目名>.pages.dev
```

本分支 `arena/019fbe18-repo` →  
https://arena-019fbe18-repo.yzaxs-1.pages.dev

**不需要 merge。** 每次 `git push origin arena/019fbe18-repo`，CF 会重新部署该预览。

也可在 GitHub 该 commit 的 Checks → Cloudflare Pages 里点 Preview URL。

## 以后改完怎么看

1. 我 push 分支  
2. 等 1–3 分钟  
3. 打开**分支预览**并硬刷新  
4. **不要**为了看效果去 merge main  
