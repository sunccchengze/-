# 西安交通大学英仔爱心社 · 招新官网

React 19 + Vite 7 + TypeScript + Tailwind CSS v4 单页招新落地页。  
莫兰迪红主色，玫瑰金 / 暖金辅助。面向交大新生，真实、克制、有温度。

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

Output：`dist/index.html`（singlefile 内联，便于静态托管）。

## 改什么改哪里

| 需求 | 文件 |
|------|------|
| 文案 / 部门 / 荣誉 / FAQ | `src/content.ts` |
| 链接 / 图片路径 / QQ 群号 | `src/config.ts` |
| 页面组装 | `src/App.tsx`（组合各 section 组件） |
| 各区块 UI | `src/components/*` |
| 设计 token / 工具类 | `src/index.css` |
| **待你确认的问题** | **`QUESTIONS.md`（请优先回复）** |
| 图片编号与拍摄说明 | `docs/IMAGE-SLOTS.md` |
| 素材文件名清单 | `docs/asset-wishlist.md` |
| 迭代记录 | `docs/ITERATION-LOG.md` |

## 组件目录（`src/components/`）

Hero · Navigation · TrustBar · About · Statistics · SummerPractice · MemberVoices · WhyJoin · Honors · Departments · SocialMedia · JoinCTA · FAQ · Footer · FloatingChrome

## 页面结构（自上而下）

1. Hero 主视觉 + 主 CTA（内部方案比较器仅在 `?preview=hero` 显示）
2. **信任条**（五星级 · 活动丰富 · 仲英指导）
3. 关于我们 + 剪影画廊  
4. Impact 体感数据  
5. **暑期实践**（玉树主卡 · 知行秦川双线 · 萤火/秦岭辅卡）  
6. **社员声音**  
7. 加入理由 ×4  
8. 荣誉高光时间线  
9. 部门（3 职能 + 8 项目，含品牌线说明）  
10. 新媒体矩阵  
11. 加入三步 + CTA  
12. FAQ  
13. Footer 双码；移动端/桌面 **快捷报名条**

## 设计要点

- 毛玻璃、渐变描边卡片、section 蒙版统一暖色  
- 触控热区 ≥44px；`prefers-reduced-motion`；skip link  
- 五星与志愿工时**自然露出、不写刷分话术**  
- QQ 群号若仍为占位 `123456789`，UI 自动改为「以招新现场与公众号为准」

## 部署 Vercel

1. 导入仓库，Framework：Vite  
2. Build：`npm run build` · Output：`dist`  
3. 无需环境变量  

## 许可

见 `LICENSE`。

## 本轮独立优化摘要

见 `docs/SESSION-SUMMARY-0200.md` 与根目录 `QUESTIONS.md`。
