# Archive · 仓库历史与未归类材料

> **整理时间**：2026-09-04
> **触发原因**：仓库顶层 30+ 散落文件,影响日常导航
> **整理原则**:
> - **不删任何文件** —— 神秘 txt / 死目录 / 历史版本全部归档保留
> - **按"来源 / 用途"分子目录**,不按文件类型
> - **保持 git 历史可追溯** —— 所有移动用 `git mv`(必要时 `cp + git rm + git add` 兜底)
> - **不影响任何运行时代码** —— 所有内容在 `src/`、`public/`、`scripts/` 之外

---

## 子目录索引

| 子目录 | 内容 | 用途 / 来源 | 是否活跃 |
|--------|------|-------------|----------|
| [`ai-cabinet-history/`](./ai-cabinet-history/) | 6 份 `GHG*.md` + 1 份执行计划 | 早期 AI 内阁决策历史(2026-08 前后) | 📚 归档,仅作历史参考 |
| [`handoff-old/`](./handoff-old/) | `HANDOFF.md` (81KB) + `QUESTIONS-ARCHIVE-2026-08-05.md` | 2026-08 之前的工作交接 | 📚 归档,后续工作以 `docs/` 为主 |
| [`individual-dumps/`](./individual-dumps/) | 4 份 2026-09-04-*.md(孙承泽决策/矛盾/创新点/5 问 5 答) | 9/4 一天之内集中整理的工作底稿 | 📝 中间稿,已沉淀到 `docs/宣传部/` 与 `memory/` |
| [`materials-raw/`](./materials-raw/) | `孙承泽的回复.md` (33KB) + 宣传册 PDF (30MB) + 年度总结 docx (12MB) | 孙承泽个人原始材料 | 🔒 私人材料,不入 git(`.gitignore` 已配置) |
| [`mystery/`](./mystery/) | `eb1ee7fda584f03c2281b7b351e1d559.txt` | 32 字符 hash 文件名,来历不明 | ❓ 保留,等待辨认 |
| [`picture0814/`](./picture0814/) | 17 张图片,分 3 子目录(启明星/心项目/陕博部介绍) | 2025-08-14 前后某次拍摄,**未被任何代码引用** | 📷 归档,等待辨认 |
| [`deliverables/`](./deliverables/) | 思政课实践教学活动记录册(孙承泽,docx + md) | 2025 思政课实践作业 | 📚 归档 |

---

## 不在 archive/ 但相关的"活代码归档"

### `src/components/archive/`

| 文件 | 状态 | 用途 |
|------|------|------|
| `Hero.tsx` | 📚 归档 | 5 版比较器"原版"素材,被 `HeroPreview.tsx` 引用 |
| `HeroV1.tsx` | 📚 归档 | 5 版比较器"数字驱动"素材 |
| `HeroV2.tsx` | 📚 归档 | 5 版比较器"原版"素材(单图分栏·旧候选) |
| `HeroV4.tsx` | 📚 归档 | 5 版比较器"极简克制"素材 |
| `HeroV5.tsx` | 📚 归档 | 5 版比较器"分屏固定"素材 |

**保留原因**: `HeroPreview.tsx` 是 5 版比较器入口,被 `App.tsx` 通过 `?preview=hero` 引用。
**默认首页**仍是 `HeroV2Pro.tsx`(在 `src/components/` 顶层)。

---

## 还原方法

如果未来需要从 archive/ 还原任何文件:

```bash
# 还原一个文件(从 archive 回到顶层)
git mv archive/individual-dumps/2026-09-04-NEWBIE-5Q-5A.md ./2026-09-04-NEWBIE-5Q-5A.md

# 还原整个子目录
git mv archive/ai-cabinet-history/ ./
```

由于本次全部用 `git mv`(或 `cp + git rm + git add` 兜底),git 历史完整,`git log --follow <file>` 可追溯。
