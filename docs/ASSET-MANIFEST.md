# 招新站图片资产目录与替换清单

> **当前规则**：网页配置已只引用本文件列出的标准路径。根目录中的旧中文文件名暂保留作为源备份；后续替换请直接覆盖标准路径，不要改组件代码。
>
> **所有图片命名采用：页面/功能 → 模块 → 顺序/用途**。每次上传新图前先判断它属于哪个网页位置。

## 1. 品牌与招新入口

| 标准路径 | 用途 |
|---|---|
| `public/images/brand/logo.png` | 社团正式 Logo |
| `public/images/recruit/registration-qr.png` | 报名二维码 |
| `public/images/recruit/group-qr.png` | 招新群二维码 |
| `public/images/recruit/hero/01-yushu-slide.jpg` 至 `05-group-slide.jpg` | V2 Pro 首页轮播五张基础影像 |

> 首页 V2 Pro 另会调用各部门、暑期活动、合影等资产形成长轮播；详见 `src/config.ts` 的 `HERO_V2PRO_SLIDES`。

## 2. 页面背景

| 标准路径 | 页面位置 |
|---|---|
| `public/images/sections/about-background.jpg` | 关于英仔 |
| `public/images/sections/impact-background.jpg` | 数据区 / 暑期区背景 |
| `public/images/sections/why-background.jpg` | 加入理由 |
| `public/images/sections/honors-background.jpg` | 荣誉区视频回退图 |
| `public/images/sections/departments-background.jpg` | 部门区 |
| `public/images/sections/social-background.jpg` | 新媒体区 |
| `public/images/sections/join-background.jpg` | 加入区 |
| `public/images/sections/faq-background.jpg` | FAQ |
| `public/images/sections/footer-background.jpg` | 页脚 |

## 3. 活动剪影画廊

路径：`public/images/galleries/activity/01.jpg` 至 `16.jpg`

- 对应“关于英仔”区的 16 张活动剪影；
- 推荐混合支教、敬老、文博、环保、校园公益、社团合影；
- 统一横图，建议 16:9。

## 4. 四个加入理由

| 标准路径 | 对应内容 |
|---|---|
| `public/images/reasons/01-opportunities.jpg` | 机会多，节奏由你安排 |
| `public/images/reasons/02-five-star.jpg` | 五星级与荣誉 |
| `public/images/reasons/03-growth.jpg` | 成长与技能 |
| `public/images/reasons/04-community.jpg` | 同伴与社团文化 |

## 5. 部门图片

| 标准路径 | 部门 |
|---|---|
| `public/images/departments/01-administration.jpg` | 常务部 |
| `public/images/departments/02-community.jpg` | 交流部 |
| `public/images/departments/03-media.jpg` | 宣传部 |
| `public/images/departments/04-qianwei.jpg` | 前卫部 |
| `public/images/departments/05-xiehu.jpg` | 洩湖部 |
| `public/images/departments/06-yinghuo.jpg` | 萤火部 |
| `public/images/departments/07-sunflower.jpg` | 向日葵 |
| `public/images/departments/08-ivy.jpg` | 常青藤 |
| `public/images/departments/09-museum.jpg` | 陕博部 |
| `public/images/departments/10-morningstar.jpg` | 启明星 |
| `public/images/departments/11-circulation.jpg` | 心项目 |

## 6. 暑期实践图集

完整文件名、画面要求与隐私注意见：

```text
docs/SUMMER-GALLERY-SLOTS.md
```

轮播目录：

```text
public/images/summer/01-yushu/
public/images/summer/02-qinchuan/
public/images/summer/03-yinghuo/
public/images/summer/04-qinling/
```

当前所有标准槽位已经用已有活动图复制填充，因此网页能立即显示多图轮播。后续替换时直接用真实对应照片覆盖同名文件即可。

## 7. 暑期实践影像

| 标准路径 | 用途 |
|---|---|
| `public/videos/summer/2026-qinchuan-recap.mp4` | 2026 知行秦川五分钟总结视频，网页内点击播放 |
| `public/videos/summer/2026-yushu-recap.mp4` | 玉树第十七届总结视频预留位，上传后自动开启播放 |

要求：16:9、MP4（H.264 优先）、建议 720p/1080p、控制在 80MB 以内；医院、特教、儿童场景必须核验公开授权。

## 8. 吉祥物

| 路径 | 动作 |
|---|---|
| `public/images/mascot/eagle-front.png` | 正面 |
| `public/images/mascot/eagle-side.png` | 侧面走动 |
| `public/images/mascot/eagle-back.png` | 收起背面 |
| `public/images/mascot/eagle-wave.png` | 挥手欢迎 |
| `public/images/mascot/eagle-heart.png` | 抱爱心 |
| `public/images/mascot/eagle-join.png` | 举报名牌 |
| `public/images/mascot/eagle-paint.png` | 画画 |
| `public/images/mascot/eagle-fly.png` | 飞行 |
| `public/images/mascot/eagle-camera.png` | 拿相机 |

## 8. 荣誉证明

路径与奖项对应关系见：

```text
QUESTIONS.md → Q-023
```

目录：

```text
public/images/honors/HONOR-01.jpg 至 HONOR-12.jpg
```

只使用真实奖状、奖杯、证书或官方获奖截图；不使用 AI 生成证书。
