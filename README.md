# 西安交通大学英仔爱心社 2025 招新官网

基于 React + Vite + TypeScript + Tailwind CSS v4 的单页招新落地页。莫兰迪红主色，金 + 玫瑰金辅助。

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

## 设计与交互更新点

- 主色调：莫兰迪红（#8E3F3D / #B25A55 / #C97D74）为主，玫瑰金（#D4A5A5）+ 暖金（#C9A876）为辅
- 全部 section 背景：图片 + 多层渐变蒙版（cream / paper / blush / rouge / dark），保证文字对比度同时统一暖色调
- 大量毛玻璃面板：`.glass-panel`、`.glass-panel-dark`、`.glass-highlight`，配合 `backdrop-filter`
- 卡片：渐变描边 hover 效果（`.card-outline-gradient`）+ 上浮 + 阴影加深
- Hero：缓慢呼吸放大背景 (`.slow-zoom`) + 多层径向渐变
- 荣誉历程：使用 `<video autoplay muted loop playsinline>` 循环背景，poster 兜底，2022 年以前用虚线卡片 + ✦ 节点表示"还有更多荣誉，此处暂略"
- 部门 Tab：胶囊化切换，激活态使用 `layoutId` 滑动渐变胶囊
- 数据统计：进入视口后 CountUp 缓动到目标值
- 移动端：全屏汉堡菜单、单列堆叠、44px 以上触摸热区

## 内容更新

- "加入英仔的四大理由"（原五大）
- 项目部门只保留 6 个：大手拉小手 / 青春伴夕阳 / 启明星 / 心项目 / 陕博部 / 萤火部（已删除玉树、蓝田）
- FAQ：新增"宣传部和常务部可同时旁听一个项目部门，其他部门只能加入一个"，删除"零基础加入宣传部"问题
- 所有报名 / 招新群链接统一指向 `https://chat.deepseek.com/`，集中在 `src/App.tsx` 顶部 `joinLink` 常量

## Logo 占位

请把真实 Logo 放到以下位置（保持文件名不变即可生效）：

- `public/images/logo-placeholder.svg`：Hero 顶部大圆 Logo（推荐正方形透明 PNG/SVG）
- `public/images/logo-mark.svg`：导航栏与 Footer 小圆 Logo

## 视频背景

把循环背景视频放到：

- `public/videos/honors-loop.mp4`

未提供视频时会自动回退到 `public/images/dept-shanbo.jpg` 作为 poster。建议视频 1080p、≤ 8MB、无声、首尾可循环、整体偏暗以保证文字可读。

## 图片占位（可直接替换）

`public/images/` 下：

- `hero-bg.jpg` 1920×1080 首屏
- `dept-changwu.jpg` / `dept-jiaoliu.jpg` / `dept-xuanchuan.jpg` 三大职能部门
- `dept-dashou.jpg` / `dept-banxiyang.jpg` / `dept-qimingxing.jpg` / `dept-xinxiangmu.jpg` / `dept-shanbo.jpg` / `dept-yinghuo.jpg` 六大项目部门
- `gallery-1.svg` ~ `gallery-4.svg` 关于我们下方的剪影画廊（建议替换为真实活动照）
- `logo-placeholder.svg` / `logo-mark.svg` Logo 占位

`public/`：

- `qr-registration.svg` / `qr-group.svg` 二维码占位

## 部署到 Vercel

1. 推送到 GitHub
2. Vercel 导入仓库，Framework Preset 选择 Vite
3. Build Command `npm run build`，Output Directory `dist`
4. 无需环境变量
