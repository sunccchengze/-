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

/**
 * 立即报名链接（出现在：顶部导航、封面页主按钮、加入我们模块）
 * 2026 正式在线报名表链接。
 */
export const LINK_报名 = "https://tuvtpb2u.jsjform.com/f/zPAVNv";

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
export const IMG_LOGO = "/images/品牌/英仔爱心社标志.png";

// ─────────────────────────────────────────────
//  四、二维码图片
// ─────────────────────────────────────────────

/** 报名二维码（用于：页脚扫码报名） */
export const IMG_报名二维码 = "/images/招新/报名二维码.png";

/** 孙承泽学长直联名片圆头像 */
export const IMG_孙承泽头像 = "/images/头像.jpg";

/** 招新群二维码（用于：页脚翻转卡片正面） */
export const IMG_招新群二维码 = "/images/招新/招新群二维码.png";

/**
 * 招新群QQ群号（用于：翻转卡片反面）
 * 更新：2026-08 招新季
 */
export const QQ_招新群号 = "712079220";

// ─────────────────────────────────────────────
//  五、封面页轮播背景图（共5张）
// ─────────────────────────────────────────────

export const IMG_首页轮播 = [
  "/images/首页/首页1.jpg",
  "/images/首页/首页2.jpg",
  "/images/首页/首页3.png",
  "/images/首页/首页4.jpg",
  "/images/首页/首页5.png",
];

// ─────────────────────────────────────────────
//  六、各模块全屏背景图
// ─────────────────────────────────────────────

/** 统一页面背景：第 2—10 页及暑期实践区共用同一张图。 */
export const IMG_统一页面背景 = "/images/页面背景/统一页面背景.jpg";

/** 第2页背景（关于我们） */
export const IMG_第2页背景 = IMG_统一页面背景;
/** 第3页背景（荣誉数据） */
export const IMG_第3页背景 = IMG_统一页面背景;
/** 第4页背景（四大理由） */
export const IMG_第4页背景 = IMG_统一页面背景;
/** 第5页背景（荣誉历程，也是视频未加载时的占位图） */
export const IMG_第5页背景 = IMG_统一页面背景;
/** 第6页背景（部门介绍） */
export const IMG_第6页背景 = IMG_统一页面背景;
/** 第7页背景（关注平台） */
export const IMG_第7页背景 = IMG_统一页面背景;
/** 第8页背景（加入我们 CTA） */
export const IMG_第8页背景 = IMG_统一页面背景;
/** 第9页背景（常见问题） */
export const IMG_第9页背景 = IMG_统一页面背景;
/** 第10页背景（页脚） */
export const IMG_第10页背景 = IMG_统一页面背景;

/** 荣誉历程视频背景（可选，不放则自动用第5页背景占位） */
export const VIDEO_荣誉历程 = "/videos/荣誉历程.mp4";

// ─────────────────────────────────────────────
//  七、公益活动剪影（共16张，4×4网格）
// ─────────────────────────────────────────────

export const IMG_公益活动剪影 = [
  "/images/公益剪影/公益活动剪影1.jpg",
  "/images/公益剪影/公益活动剪影2.jpg",
  "/images/公益剪影/公益活动剪影3.jpg",
  "/images/公益剪影/公益活动剪影4.jpg",
  "/images/公益剪影/公益活动剪影5.jpg",
  "/images/公益剪影/公益活动剪影6.jpg",
  "/images/公益剪影/公益活动剪影7.jpg",
  "/images/公益剪影/公益活动剪影8.jpg",
  "/images/公益剪影/公益活动剪影9.jpg",
  "/images/公益剪影/公益活动剪影10.jpg",
  "/images/公益剪影/公益活动剪影11.jpg",
  "/images/公益剪影/公益活动剪影12.jpg",
  "/images/公益剪影/公益活动剪影13.jpg",
  "/images/公益剪影/公益活动剪影14.jpg",
  "/images/公益剪影/公益活动剪影15.jpg",
  "/images/公益剪影/公益活动剪影16.jpg",
];

// ─────────────────────────────────────────────
//  八、四大理由 1:1 方形插图（共4张）
// ─────────────────────────────────────────────

export const IMG_四大理由 = [
  // “方向多”与“成长”刻意互换：让画面语义与卡片文案匹配。
  "/images/加入理由/成长与技能.jpg",
  "/images/加入理由/校级五星级社团.jpg",
  "/images/加入理由/更多历练机会.jpg",
  "/images/加入理由/浓厚家文化氛围.jpg",
];

// ─────────────────────────────────────────────
//  九、各部门卡片封面图
//  替换真实照片时保持文件名即可生效
// ─────────────────────────────────────────────

export const IMG_常务部 = "/images/部门/常务部.jpg";
export const IMG_交流部 = "/images/部门/交流部.jpg";
export const IMG_宣传部 = "/images/部门/宣传部.jpg";
/** @deprecated 历史共用图；启梦/拾辉可分别替换 */
export const IMG_大手拉小手 = "/images/部门/大手拉小手.png";
export const IMG_启梦部 = "/images/部门/启梦部.jpg";
export const IMG_拾辉部 = "/images/部门/拾辉部.png";
/** @deprecated 历史共用图；向日葵/常青藤可分别替换 */
export const IMG_青春伴夕阳 = "/images/部门/青春伴夕阳.jpg";
export const IMG_向日葵 = "/images/部门/向日葵.jpg";
export const IMG_常青藤 = "/images/部门/常青藤.jpg";
export const IMG_启明星 = "/images/部门/启明星.jpg";
export const IMG_心项目 = "/images/部门/心项目.jpg";
export const IMG_陕博部 = "/images/部门/陕博部.jpg";
export const IMG_萤火部 = "/images/部门/萤火部.jpg";

// ─────────────────────────────────────────────
//  十、暑期实践 Spotlight 封面（请换成真实成片截帧）
// ─────────────────────────────────────────────

export const IMG_暑期_玉树 = "/images/暑期实践/玉树/玉树1.jpg";
export const IMG_暑期_知行秦川 = "/images/暑期实践/知行秦川/知行1.jpg";
export const IMG_暑期_秦岭 = "/images/暑期实践/秦岭/秦岭1.jpg";
/** 秦岭实践卡内视频封面（BV1vCum6DE8Y 的 B 站官方封面）。 */
export const IMG_暑期_秦岭视频封面 = "https://i0.hdslb.com/bfs/archive/f5401571ca8184fd13d99c3a01b885775ef693c2.jpg";
export const IMG_暑期_萤火 = "/images/暑期实践/萤火/萤火1.jpg";

/** 启明星“启明寻洛，脉续中原”暑期实践主封面。 */
export const IMG_暑期_启明星 = "/images/暑期实践/启明星/启明星1.jpg";

/** 青春伴夕阳“银发融城”暑期返乡调研实践主封面。 */
export const IMG_暑期_银发融城 = "/images/暑期实践/银发融城/银发融城1.jpg";

/** 陕博部文博展厅志愿服务暑期实践主封面。 */
export const IMG_暑期_陕博 = "/images/暑期实践/陕博/陕博1.jpg";

/** 第11页背景（暑期实践专区，可与第3页共用或单独替换） */
export const IMG_第11页背景 = IMG_统一页面背景;

// ─────────────────────────────────────────────────────────────
//  十一、V2 Pro 首页轮播
//  轮播图按「品牌大活动 → 项目部门 → 社团同行」组织；每张 5 秒。
//  后续大合影和第十六届社长团合影按 QUESTIONS.md 的文件名替换即可。
// ─────────────────────────────────────────────────────────────

export const IMG_小鹰正面 = "/images/小鹰/小鹰正面.png";
export const IMG_小鹰侧面 = "/images/小鹰/小鹰侧面.png";
export const IMG_小鹰背面 = "/images/小鹰/小鹰背面.png";
export const IMG_小鹰挥手 = "/images/小鹰/小鹰挥手.png";
export const IMG_小鹰爱心 = "/images/小鹰/小鹰爱心.png";
export const IMG_小鹰报名 = "/images/小鹰/小鹰报名.png";
export const IMG_小鹰画画 = "/images/小鹰/小鹰画画.png";
export const IMG_小鹰飞行 = "/images/小鹰/小鹰飞行.png";
export const IMG_小鹰相机 = "/images/小鹰/小鹰相机.png";

export const HERO_V2PRO_SLIDES = [
  { src: "/images/首页/首页16.jpg", title: "英仔大合影", line: "英为爱，仔一起", detail: "社团伙伴 · 公益同行" },
  { src: "/images/首页/首页1.jpg", title: "雪域相逢", line: "雪域相逢，共绽格桑", detail: "玉树支教团 · 高原课堂" },
  { src: "/images/首页/首页2.jpg", title: "知行秦川", line: "文浸秦川，笃学寻光", detail: "周至 / 彬州 · 暑期课堂" },
  { src: "/images/首页/首页3.png", title: "萤火微光", line: "以温柔伴童心，以微光暖星河", detail: "儿童关怀 · 陪伴成长" },
  { src: "/images/首页/首页4.jpg", title: "青护秦岭", line: "踏峪寻青，净护秦岭", detail: "生态实践 · 山野同行" },
  { src: "/images/首页/首页5.png", title: "长安文脉", line: "胸怀秦汉之源，颂扬华夏之光", detail: "陕博部 · 陕历博志愿" },
  { src: "/images/首页/首页6.jpg", title: "大手拉小手", line: "以青春为桥，照见更远的世界", detail: "启梦部 · 九峰助学" },
  { src: "/images/首页/首页7.jpg", title: "知行彬州", line: "携光而行，筑梦秦川", detail: "拾辉部 · 彬州助学" },
  { src: "/images/首页/首页8.jpg", title: "青春伴夕阳", line: "岁月有声，陪伴有光", detail: "向日葵 · 社区与老年大学" },
  { src: "/images/首页/首页9.jpg", title: "温暖守护", line: "把下一次相见，写成温柔约定", detail: "常青藤 · 护理院陪伴" },
  { src: "/images/首页/首页10.jpg", title: "启明星", line: "把好奇点亮，把温暖带进校园", detail: "启明星 · 校园公益" },
  { src: "/images/首页/首页11.jpg", title: "旧物新生", line: "让每一份旧物，继续奔向需要的地方", detail: "心项目 · 循环与环保" },
  { src: "/images/首页/首页12.jpg", title: "萤火连心", line: "微光汇聚，也能照亮成长", detail: "萤火部 · 儿童关怀" },
  { src: "/images/首页/首页13.jpg", title: "记录善意", line: "让每一次出发，都被好好看见", detail: "宣传部 · 影像与故事" },
  { src: "/images/首页/首页14.jpg", title: "英仔同行", line: "因为热爱相遇，为了善意并肩", detail: "交流部 · 社团文化" },
  { src: "/images/首页/首页15.png", title: "认真守护", line: "把每一份热忱，落成可靠的行动", detail: "常务部 · 稳定运转" },
  { src: "/images/首页/首页17.jpg", title: "新一届英仔", line: "薪火相传，下一站由你加入", detail: "2026 招新 · 与你相遇" },
] as const;

// ─────────────────────────────────────────────────────────────
//  十二、暑期实践图集轮播
//  完整命名规范见 docs/SUMMER-GALLERY-SLOTS.md。
//  每组首图为现有回退图；其余文件未上传时组件会自动跳过。
// ─────────────────────────────────────────────────────────────

export const SUMMER_GALLERIES = {
  yushu: [
    IMG_暑期_玉树,
    "/images/暑期实践/玉树/玉树2.jpg",
    "/images/暑期实践/玉树/玉树3.jpg",
    "/images/暑期实践/玉树/玉树4.jpg",
    "/images/暑期实践/玉树/玉树5.jpg",
    "/images/暑期实践/玉树/玉树6.jpg",
    "/images/暑期实践/玉树/玉树7.jpg",
  ],
  qinchuan: [
    IMG_暑期_知行秦川,
    "/images/暑期实践/知行秦川/知行2.jpg",
    "/images/暑期实践/知行秦川/知行3.jpg",
    "/images/暑期实践/知行秦川/知行4.jpg",
    "/images/暑期实践/知行秦川/知行5.jpg",
    "/images/暑期实践/知行秦川/知行6.jpg",
    "/images/暑期实践/知行秦川/知行7.jpg",
  ],
  yinghuo: [
    IMG_暑期_萤火,
    "/images/暑期实践/萤火/萤火2.jpg",
    "/images/暑期实践/萤火/萤火3.jpg",
    "/images/暑期实践/萤火/萤火4.jpg",
    "/images/暑期实践/萤火/萤火5.jpg",
    "/images/暑期实践/萤火/萤火6.jpg",
    "/images/暑期实践/萤火/萤火7.jpg",
  ],
  qinling: [
    IMG_暑期_秦岭,
    "/images/暑期实践/秦岭/秦岭2.jpg",
    "/images/暑期实践/秦岭/秦岭3.jpg",
    "/images/暑期实践/秦岭/秦岭4.jpg",
    "/images/暑期实践/秦岭/秦岭5.jpg",
    "/images/暑期实践/秦岭/秦岭6.jpg",
    "/images/暑期实践/秦岭/秦岭7.jpg",
  ],
  qiming: [
    IMG_暑期_启明星,
    "/images/暑期实践/启明星/启明星2.jpg",
    "/images/暑期实践/启明星/启明星3.jpg",
    "/images/暑期实践/启明星/启明星4.jpg",
    "/images/暑期实践/启明星/启明星5.jpg",
    "/images/暑期实践/启明星/启明星6.jpg",
    "/images/暑期实践/启明星/启明星7.jpg",
  ],
  yinfarongcheng: [
    IMG_暑期_银发融城,
    "/images/暑期实践/银发融城/银发融城2.jpg",
    "/images/暑期实践/银发融城/银发融城3.jpg",
    "/images/暑期实践/银发融城/银发融城4.jpg",
    "/images/暑期实践/银发融城/银发融城5.jpg",
  ],
  shanbo: [
    IMG_暑期_陕博,
    "/images/暑期实践/陕博/陕博2.jpg",
    "/images/暑期实践/陕博/陕博3.jpg",
    "/images/暑期实践/陕博/陕博4.jpg",
    "/images/暑期实践/陕博/陕博5.jpg",
  ],
} as const;

// ─────────────────────────────────────────────────────────────
//  十三、暑期实践影像
//  暑期影像统一由宣传部维护同名文件。
// ─────────────────────────────────────────────────────────────
/**
 * ─────────────────────────────────────────────────────────────
 *  暑期实践影像 —— 播放源配置（2026-08-06 重设）
 * ─────────────────────────────────────────────────────────────
 *
 *  原方案「七牛云 CDN 第一优先」已弃用，原因：
 *   七牛免费测试域名（*.bkt.clouddn.com）现已失效（DNS 不通），
 *   且国内云厂商 CDN 绑定自定义域名都要求 ICP 备案，
 *   对托管在 pages.dev 的站点不可行。
 *
 *  新链路（按优先级，组件点击播放后逐级自动回退）：
 *
 *  ① B站嵌入 —— 把成片传上社团 B站账号后填 BV 号即启用：
 *     国内最快、免费、不限流量、全画质，还能顺便运营账号。
 *     留空 = 跳过，走下面的 mp4 回退链。
 *  ② Cloudflare Pages 本站 —— public/videos/summer/ 下的压缩版
 *     （知行 540p ≈23.6MiB / 玉树 720p ≈10MiB，均 < 25MiB 单文件上限），
 *     随部署自动生效，无需额外配置。
 *  ③ GitHub Release 原片 —— 海外/桌面兜底（国内慢但可达）。
 *  ④ 免费 GitHub 加速镜像 —— 可选，第三方代理不稳定，失效删掉该行即可。
 * ─────────────────────────────────────────────────────────────
 */

/** 知行秦川总结视频 —— 播放源 */
export const VIDEO_SOURCES_知行秦川 = {
  /** ① B站嵌入（XJTU英仔爱心社官方 BV1R2MX6cE6A《知行秦川，梦启今夏》） */
  bilibili: "BV1R2MX6cE6A",
  /** ② Cloudflare Pages 本站压缩版（540p，≤25MiB） */
  pages: "/videos/summer/2026-qinchuan-recap.mp4",
  /** ③ GitHub Release 原片（1080p，国内慢，兜底） */
  github: "https://github.com/sunccchengze/-/releases/download/media-2026-v1/2026-qinchuan-recap.mp4",
  /** ④ 可选：GitHub 加速镜像（失效删掉即可） */
  mirror: "https://gh-proxy.com/https://github.com/sunccchengze/-/releases/download/media-2026-v1/2026-qinchuan-recap.mp4",
};

/** 玉树总结视频 —— 播放源 */
export const VIDEO_SOURCES_玉树 = {
  /** ① B站嵌入（XJTU英仔爱心社官方 BV1pqgv6cEPS《玉树｜满眼期待与新奇体验撞了个满怀》） */
  bilibili: "BV1pqgv6cEPS",
  /** ② Cloudflare Pages 本站压缩版（720p，≤25MiB） */
  pages: "/videos/summer/2026-yushu-recap.mp4",
  /** ③ GitHub Release 原片（720p HEVC，国内慢，兜底） */
  github: "https://github.com/sunccchengze/-/releases/download/media-2026-v1/2026-yushu-recap.mp4",
  /** ④ 可选：GitHub 加速镜像（失效删掉即可） */
  mirror: "https://gh-proxy.com/https://github.com/sunccchengze/-/releases/download/media-2026-v1/2026-yushu-recap.mp4",
};

/**
 * 秦岭实践卡内视频 —— 仅在秦岭卡片展示，不加入 SUMMER FILMS。
 * 当前使用社团 B 站成片；未来如补充 MP4，可沿用 pages / github / mirror 回退字段。
 */
export const VIDEO_SOURCES_秦岭 = {
  bilibili: "BV1vCum6DE8Y",
};

/**
 * 便捷导出：本站直链（随 Cloudflare Pages 部署生效）
 * 组件可以直接用，也可以用 VIDEO_SOURCES_xxx 自定义逻辑
 */
export const VIDEO_知行秦川总结 = "/videos/summer/2026-qinchuan-recap.mp4";
export const VIDEO_玉树总结 = "/videos/summer/2026-yushu-recap.mp4";
