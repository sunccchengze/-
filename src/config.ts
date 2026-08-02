/**
 * ============================================================
 *  英仔爱心社招新官网 —— 统一配置文件
 * ============================================================
 *
 *  ✅ 所有图片路径和链接都集中在这个文件里
 *  ✅ 修改时只需要改这个文件，不需要动其他代码
 *  ✅ 图片全部放在 public/images/ 文件夹下
 *  ✅ 二维码放在 public/images/ 文件夹下
 *  ✅ 视频放在 public/videos/ 文件夹下
 *
 * ============================================================
 */

// ─────────────────────────────────────────────
//  一、核心链接
// ─────────────────────────────────────────────

/** 正式上线域名（Cloudflare Pages）—— 分享/OG/JSON-LD 用 */
export const SITE_URL = "https://yzaxs-1.pages.dev";

/** 立即报名链接（出现在：顶部导航、封面页主按钮、加入我们模块、移动端菜单） */
export const LINK_报名 = "https://f.wps.cn/g/1AxxMyao/";

/** 微信公众号链接 */
export const LINK_微信公众号 = "https://mp.weixin.qq.com/s/lJJeVU1osRMRd7oRWvTFzQ";

/** 抖音号链接 */
export const LINK_抖音号 = "https://v.douyin.com/wgSkkbFH80g/";

/** 哔哩哔哩账号链接 */
export const LINK_哔哩哔哩 = "https://space.bilibili.com/595714952?spm_id_from=333.337.0.0";

// ─────────────────────────────────────────────
//  二、各部门"了解更多"链接
// ─────────────────────────────────────────────

/** 常务部介绍链接 */
export const LINK_常务部 = "https://mp.weixin.qq.com/s/paHXDTzTpxyUewvVc3lYjQ";

/** 交流部介绍链接 */
export const LINK_交流部 = "https://mp.weixin.qq.com/s/o8SZ7ZMmvq1WQyqbMUf5ZQ";

/** 宣传部介绍链接 */
export const LINK_宣传部 = "https://mp.weixin.qq.com/s/u25BKkC-36kQRnA1jeRT-w";

/** 大手拉小手介绍链接 */
export const LINK_大手拉小手 = "https://mp.weixin.qq.com/s/q5dj69Fj4jg2wQ2zS6_lVw";

/** 青春伴夕阳介绍链接 */
export const LINK_青春伴夕阳 = "https://mp.weixin.qq.com/s/afPoFtNNKo3hjqsQnsm1YA";

/** 启明星介绍链接（启明星和心项目共用） */
export const LINK_启明星 = "https://mp.weixin.qq.com/s/5iV-2Ml3msB2xXhbezBhYA";

/** 心项目介绍链接（启明星和心项目共用） */
export const LINK_心项目 = "https://mp.weixin.qq.com/s/5iV-2Ml3msB2xXhbezBhYA";

/** 陕博部介绍链接 */
export const LINK_陕博部 = "https://mp.weixin.qq.com/s/PxxMumKWh4i9YxFxyHUYiA";

/** 萤火部介绍链接 */
export const LINK_萤火部 = "https://mp.weixin.qq.com/s/iUJ0gI4KePy-_FMo0V1qoQ";

// ─────────────────────────────────────────────
//  三、LOGO 图片
// ─────────────────────────────────────────────

/** 社团 LOGO（用于：封面页大圆Logo、导航栏小Logo、页脚Logo） */
export const IMG_LOGO = "/images/brand/logo.png";

// ─────────────────────────────────────────────
//  四、二维码图片
// ─────────────────────────────────────────────

/** 报名二维码（用于：页脚扫码报名） */
export const IMG_报名二维码 = "/images/recruit/registration-qr.png";

/** 招新群二维码（用于：页脚翻转卡片正面） */
export const IMG_招新群二维码 = "/images/recruit/group-qr.png";

/**
 * 招新群QQ群号（用于：翻转卡片反面）
 * 更新：2026-08 招新季
 */
export const QQ_招新群号 = "712079220";

// ─────────────────────────────────────────────
//  五、封面页轮播背景图（共5张）
// ─────────────────────────────────────────────

export const IMG_首页轮播 = [
  "/images/recruit/hero/01-slide.jpg",
  "/images/recruit/hero/02-slide.jpg",
  "/images/recruit/hero/03-slide.jpg",
  "/images/recruit/hero/04-slide.jpg",
  "/images/recruit/hero/05-slide.jpg",
];

// ─────────────────────────────────────────────
//  六、各模块全屏背景图
// ─────────────────────────────────────────────

/** 第2页背景（关于我们） */
export const IMG_第2页背景 = "/images/sections/about-background.jpg";

/** 第3页背景（荣誉数据） */
export const IMG_第3页背景 = "/images/sections/impact-background.jpg";

/** 第4页背景（四大理由） */
export const IMG_第4页背景 = "/images/sections/why-background.jpg";

/** 第5页背景（荣誉历程，也是视频未加载时的占位图） */
export const IMG_第5页背景 = "/images/sections/honors-background.jpg";

/** 第6页背景（部门介绍） */
export const IMG_第6页背景 = "/images/sections/departments-background.jpg";

/** 第7页背景（关注平台） */
export const IMG_第7页背景 = "/images/sections/social-background.jpg";

/** 第8页背景（加入我们 CTA） */
export const IMG_第8页背景 = "/images/sections/join-background.jpg";

/** 第9页背景（常见问题） */
export const IMG_第9页背景 = "/images/sections/faq-background.jpg";

/** 第10页背景（页脚） */
export const IMG_第10页背景 = "/images/sections/footer-background.jpg";

/** 荣誉历程视频背景（可选，不放则自动用第5页背景占位） */
export const VIDEO_荣誉历程 = "/videos/honors-loop.mp4";

// ─────────────────────────────────────────────
//  七、公益活动剪影（共16张，4×4网格）
// ─────────────────────────────────────────────

export const IMG_公益活动剪影 = [
  "/images/galleries/activity/01.jpg",
  "/images/galleries/activity/02.jpg",
  "/images/galleries/activity/03.jpg",
  "/images/galleries/activity/04.jpg",
  "/images/galleries/activity/05.jpg",
  "/images/galleries/activity/06.jpg",
  "/images/galleries/activity/07.jpg",
  "/images/galleries/activity/08.jpg",
  "/images/galleries/activity/09.jpg",
  "/images/galleries/activity/10.jpg",
  "/images/galleries/activity/11.jpg",
  "/images/galleries/activity/12.jpg",
  "/images/galleries/activity/13.jpg",
  "/images/galleries/activity/14.jpg",
  "/images/galleries/activity/15.jpg",
  "/images/galleries/activity/16.jpg",
];

// ─────────────────────────────────────────────
//  八、四大理由 1:1 方形插图（共4张）
// ─────────────────────────────────────────────

export const IMG_四大理由 = [
  "/images/reasons/01-opportunities.jpg",
  "/images/reasons/02-five-star.jpg",
  "/images/reasons/03-growth.jpg",
  "/images/reasons/04-community.jpg",
];

// ─────────────────────────────────────────────
//  九、各部门卡片封面图
//  替换真实照片时保持文件名即可生效
// ─────────────────────────────────────────────

export const IMG_常务部 = "/images/departments/01-administration.jpg";
export const IMG_交流部 = "/images/departments/02-community.jpg";
export const IMG_宣传部 = "/images/departments/03-media.jpg";
/** @deprecated 历史共用图；前卫/洩湖可分别替换 */
export const IMG_大手拉小手 = "/images/legacy/hand-in-hand.jpg";
export const IMG_前卫部 = "/images/departments/04-qianwei.jpg";
export const IMG_洩湖部 = "/images/departments/05-xiehu.jpg";
/** @deprecated 历史共用图；向日葵/常青藤可分别替换 */
export const IMG_青春伴夕阳 = "/images/legacy/youth-with-sunset.jpg";
export const IMG_向日葵 = "/images/departments/07-sunflower.jpg";
export const IMG_常青藤 = "/images/departments/08-ivy.jpg";
export const IMG_启明星 = "/images/departments/10-morningstar.jpg";
export const IMG_心项目 = "/images/departments/11-circulation.jpg";
export const IMG_陕博部 = "/images/departments/09-museum.jpg";
export const IMG_萤火部 = "/images/departments/06-yinghuo.jpg";

// ─────────────────────────────────────────────
//  十、暑期实践 Spotlight 封面（请换成真实成片截帧）
// ─────────────────────────────────────────────

export const IMG_暑期_玉树 = "/images/summer/01-yushu/00-cover.jpg";
export const IMG_暑期_知行秦川 = "/images/summer/02-qinchuan/00-cover.jpg";
export const IMG_暑期_秦岭 = "/images/summer/04-qinling/00-cover.jpg";
export const IMG_暑期_萤火 = "/images/summer/03-yinghuo/00-cover.jpg";

/** 第11页背景（暑期实践专区，可与第3页共用或单独替换） */
export const IMG_第11页背景 = "/images/sections/impact-background.jpg";

// ─────────────────────────────────────────────────────────────
//  十一、V2 Pro 首页轮播
//  轮播图按「品牌大活动 → 项目部门 → 社团同行」组织；每张 5 秒。
//  后续大合影和第十六届社长团合影按 QUESTIONS.md 的文件名替换即可。
// ─────────────────────────────────────────────────────────────

export const IMG_小鹰正面 = "/images/mascot/eagle-front.png";
export const IMG_小鹰侧面 = "/images/mascot/eagle-side.png";
export const IMG_小鹰背面 = "/images/mascot/eagle-back.png";
export const IMG_小鹰挥手 = "/images/mascot/eagle-wave.png";
export const IMG_小鹰爱心 = "/images/mascot/eagle-heart.png";
export const IMG_小鹰报名 = "/images/mascot/eagle-join.png";
export const IMG_小鹰画画 = "/images/mascot/eagle-paint.png";
export const IMG_小鹰飞行 = "/images/mascot/eagle-fly.png";
export const IMG_小鹰相机 = "/images/mascot/eagle-camera.png";

export const HERO_V2PRO_SLIDES = [
  { src: IMG_暑期_玉树, title: "雪域相逢", line: "雪域相逢，共绽格桑", detail: "玉树支教团 · 高原课堂" },
  { src: IMG_暑期_知行秦川, title: "知行秦川", line: "文浸秦川，笃学寻光", detail: "周至 / 彬州 · 暑期课堂" },
  { src: IMG_暑期_萤火, title: "萤火微光", line: "以温柔伴童心，以微光暖星河", detail: "儿童关怀 · 陪伴成长" },
  { src: IMG_暑期_秦岭, title: "青护秦岭", line: "踏峪寻青，净护秦岭", detail: "生态实践 · 山野同行" },
  { src: IMG_陕博部, title: "长安文脉", line: "胸怀秦汉之源，颂扬华夏之光", detail: "陕博部 · 文博志愿" },
  { src: IMG_前卫部, title: "大手拉小手", line: "以青春为桥，照见更远的世界", detail: "前卫部 · 九峰助学" },
  { src: IMG_洩湖部, title: "知行彬州", line: "携光而行，筑梦秦川", detail: "洩湖部 · 彬州助学" },
  { src: IMG_向日葵, title: "青春伴夕阳", line: "岁月有声，陪伴有光", detail: "向日葵 · 社区与老年大学" },
  { src: IMG_常青藤, title: "温暖守护", line: "把下一次相见，写成温柔约定", detail: "常青藤 · 护理院陪伴" },
  { src: IMG_启明星, title: "启明星", line: "把好奇点亮，把温暖带进校园", detail: "启明星 · 校园公益" },
  { src: IMG_心项目, title: "旧物新生", line: "让每一份旧物，继续奔向需要的地方", detail: "心项目 · 循环与环保" },
  { src: IMG_萤火部, title: "萤火连心", line: "微光汇聚，也能照亮成长", detail: "萤火部 · 儿童关怀" },
  { src: IMG_宣传部, title: "记录善意", line: "让每一次出发，都被好好看见", detail: "宣传部 · 影像与故事" },
  { src: IMG_交流部, title: "英仔同行", line: "因为热爱相遇，为了善意并肩", detail: "交流部 · 社团文化" },
  { src: IMG_常务部, title: "认真守护", line: "把每一份热忱，落成可靠的行动", detail: "常务部 · 稳定运转" },
  { src: IMG_公益活动剪影[0], title: "英仔大合影", line: "英为爱，仔一起", detail: "待替换为全社大合影" },
  { src: IMG_公益活动剪影[1], title: "新一届英仔", line: "薪火相传，下一站由你加入", detail: "待替换为第十六届社长团合影" },
] as const;

// ─────────────────────────────────────────────────────────────
//  十二、暑期实践图集轮播
//  完整命名规范见 docs/SUMMER-GALLERY-SLOTS.md。
//  每组首图为现有回退图；其余文件未上传时组件会自动跳过。
// ─────────────────────────────────────────────────────────────

export const SUMMER_GALLERIES = {
  yushu: [
    IMG_暑期_玉树,
    "/images/summer/01-yushu/01-assembly.jpg",
    "/images/summer/01-yushu/02-journey.jpg",
    "/images/summer/01-yushu/03-icebreak.jpg",
    "/images/summer/01-yushu/04-classroom.jpg",
    "/images/summer/01-yushu/05-culture.jpg",
    "/images/summer/01-yushu/06-group.jpg",
  ],
  qinchuan: [
    IMG_暑期_知行秦川,
    "/images/summer/02-qinchuan/01-jiufeng-opening.jpg",
    "/images/summer/02-qinchuan/02-jiufeng-classroom.jpg",
    "/images/summer/02-qinchuan/03-jiufeng-farewell.jpg",
    "/images/summer/02-qinchuan/04-binzhou-opening.jpg",
    "/images/summer/02-qinchuan/05-binzhou-classroom.jpg",
    "/images/summer/02-qinchuan/06-binzhou-farewell.jpg",
  ],
  yinghuo: [
    IMG_暑期_萤火,
    "/images/summer/03-yinghuo/01-hospital-art.jpg",
    "/images/summer/03-yinghuo/02-qianqianai-class.jpg",
    "/images/summer/03-yinghuo/03-special-olympics.jpg",
    "/images/summer/03-yinghuo/04-community-group.jpg",
    "/images/summer/03-yinghuo/05-team.jpg",
  ],
  qinling: [
    IMG_暑期_秦岭,
    "/images/summer/04-qinling/01-ziwu-cleanup.jpg",
    "/images/summer/04-qinling/02-eco-talk.jpg",
    "/images/summer/04-qinling/03-nature-study.jpg",
    "/images/summer/04-qinling/04-zhujiwan-interview.jpg",
    "/images/summer/04-qinling/05-group.jpg",
  ],
} as const;
