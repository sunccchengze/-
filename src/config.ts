/**
 * ============================================================
 *  英仔爱心社 2025 招新官网 —— 统一配置文件
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
export const IMG_LOGO = "/images/英仔爱心社LOGO.png";

// ─────────────────────────────────────────────
//  四、二维码图片
// ─────────────────────────────────────────────

/** 报名二维码（用于：页脚扫码报名） */
export const IMG_报名二维码 = "/images/报名二维码.png";

/** 招新群二维码（用于：页脚翻转卡片正面） */
export const IMG_招新群二维码 = "/images/招新群二维码.png";

/** 招新群QQ群号（用于：翻转卡片反面显示的群号文字） */
export const QQ_招新群号 = "123456789";

// ─────────────────────────────────────────────
//  五、封面页轮播背景图（共5张）
// ─────────────────────────────────────────────

export const IMG_首页轮播 = [
  "/images/首页轮播背景1.jpg",
  "/images/首页轮播背景2.jpg",
  "/images/首页轮播背景3.jpg",
  "/images/首页轮播背景4.jpg",
  "/images/首页轮播背景5.jpg",
];

// ─────────────────────────────────────────────
//  六、各模块全屏背景图
// ─────────────────────────────────────────────

/** 第2页背景（关于我们） */
export const IMG_第2页背景 = "/images/第2页背景.jpg";

/** 第3页背景（荣誉数据） */
export const IMG_第3页背景 = "/images/第3页背景.jpg";

/** 第4页背景（四大理由） */
export const IMG_第4页背景 = "/images/第4页背景.jpg";

/** 第5页背景（荣誉历程，也是视频未加载时的占位图） */
export const IMG_第5页背景 = "/images/第5页背景.jpg";

/** 第6页背景（部门介绍） */
export const IMG_第6页背景 = "/images/第6页背景.jpg";

/** 第7页背景（关注平台） */
export const IMG_第7页背景 = "/images/第7页背景.jpg";

/** 第8页背景（加入我们 CTA） */
export const IMG_第8页背景 = "/images/第8页背景.jpg";

/** 第9页背景（常见问题） */
export const IMG_第9页背景 = "/images/第9页背景.jpg";

/** 第10页背景（页脚） */
export const IMG_第10页背景 = "/images/第10页背景.jpg";

/** 荣誉历程视频背景（可选，不放则自动用第5页背景占位） */
export const VIDEO_荣誉历程 = "/videos/honors-loop.mp4";

// ─────────────────────────────────────────────
//  七、公益活动剪影（共16张，4×4网格）
// ─────────────────────────────────────────────

export const IMG_公益活动剪影 = [
  "/images/公益活动剪影1.jpg",
  "/images/公益活动剪影2.jpg",
  "/images/公益活动剪影3.jpg",
  "/images/公益活动剪影4.jpg",
  "/images/公益活动剪影5.jpg",
  "/images/公益活动剪影6.jpg",
  "/images/公益活动剪影7.jpg",
  "/images/公益活动剪影8.jpg",
  "/images/公益活动剪影9.jpg",
  "/images/公益活动剪影10.jpg",
  "/images/公益活动剪影11.jpg",
  "/images/公益活动剪影12.jpg",
  "/images/公益活动剪影13.jpg",
  "/images/公益活动剪影14.jpg",
  "/images/公益活动剪影15.jpg",
  "/images/公益活动剪影16.jpg",
];

// ─────────────────────────────────────────────
//  八、四大理由 1:1 方形插图（共4张）
// ─────────────────────────────────────────────

export const IMG_四大理由 = [
  "/images/丰富的志愿工时.jpg",
  "/images/校级五星级社团.jpg",
  "/images/更多历练机会.jpg",
  "/images/浓厚的家文化氛围.jpg",
];

// ─────────────────────────────────────────────
//  九、各部门卡片封面图（共9张）
// ─────────────────────────────────────────────

export const IMG_常务部 = "/images/常务部.jpg";
export const IMG_交流部 = "/images/交流部.jpg";
export const IMG_宣传部 = "/images/宣传部.jpg";
export const IMG_大手拉小手 = "/images/大手拉小手.jpg";
export const IMG_青春伴夕阳 = "/images/青春伴夕阳.jpg";
export const IMG_启明星 = "/images/启明星.jpg";
export const IMG_心项目 = "/images/心项目.jpg";
export const IMG_陕博部 = "/images/陕博部.jpg";
export const IMG_萤火部 = "/images/萤火部.jpg";
