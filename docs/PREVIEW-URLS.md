# 预览地址

> **2026-09-03 更新**：本社团**只有生产域名投入使用**。历史上用过的 Arena 分支预览地址
> （`arena-019fbe18-repo.*`）与某次 commit 的部署快照（`78a1fb14.*`）都已作废，本文档不再保留，
> 以免有人照着打开一个早已不存在的地址。

## 唯一在用的地址

| 类型 | URL | 说明 |
|------|-----|------|
| **生产站（唯一在用）** | <https://yzaxs-1.pages.dev> | 绑定 `main` 分支，push 到 `main` 自动部署 |

打开后请 **强制刷新**：桌面 Ctrl+Shift+R / Mac Cmd+Shift+R；手机可用无痕窗口。

## 首页方案比较器（内部）

只在带参数时展示 5 个内部候选首页，不会出现在新生正式访问的页面：

<https://yzaxs-1.pages.dev/?preview=hero>

当前正式采用的是 **HeroV2Pro**。比较器仅供内部评审，别把这个带参数的链接发给新生。

## 如何确认看到的是最新版？

首屏应看到：

- 徽章：**2026 秋季招新 · 校级五星级公益社团**
- 标签：校级五星级 / 志愿时光很充实 / 199 人在路上
- 向下滚应有：信任条（刘晗梦）、暑期玉树第十七届、**认识这一届英仔**

## 本地预览

不想等部署，直接在仓库根目录跑：

```bash
npm install
npm run dev       # 开发服务器，已配置 host 0.0.0.0
npm run build     # 生产构建 → dist/
npm run preview   # 预览生产构建产物
```

## 附：Cloudflare Pages 的分支预览机制（备用知识）

Pages 会为每个非生产分支生成 `https://<分支名规范化>.<项目名>.pages.dev`。
本仓库**目前没有启用**这条链路，只在 push `main` 时部署生产站。若将来需要临时分支预览，
可在 Cloudflare 控制台开启，或在 GitHub 该 commit 的 Checks → Cloudflare Pages 里取 Preview URL；
拿到后请把它记到本文件，别让下一个人再猜。
