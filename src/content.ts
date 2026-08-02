/**
 * 招新站文案与结构化内容（面向新生，非公文照抄）
 * 改字优先改本文件；图片路径仍在 config.ts
 */
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Heart,
  HeartHandshake,
  Home,
  Landmark,
  MessageCircle,
  Recycle,
  Sparkles,
  Sprout,
  Sun,
  Trophy,
  Users,
  BookOpen,
} from "lucide-react";
import {
  LINK_常务部,
  LINK_交流部,
  LINK_宣传部,
  LINK_大手拉小手,
  LINK_青春伴夕阳,
  LINK_启明星,
  LINK_心项目,
  LINK_陕博部,
  LINK_萤火部,
  LINK_微信公众号,
  LINK_抖音号,
  LINK_哔哩哔哩,
  IMG_常务部,
  IMG_交流部,
  IMG_宣传部,
  IMG_前卫部,
  IMG_洩湖部,
  IMG_向日葵,
  IMG_常青藤,
  IMG_启明星,
  IMG_心项目,
  IMG_陕博部,
  IMG_萤火部,
  IMG_暑期_玉树,
  IMG_暑期_知行秦川,
  IMG_暑期_秦岭,
  IMG_暑期_萤火,
} from "./config";

/* ───────── 通用 ───────── */

export const brand = {
  name: "英仔爱心社",
  fullName: "西安交通大学英仔爱心社",
  motto: "服务社会 · 奉献爱心 · 推己及人 · 薪火相传",
  mottoPlain: "服务社会、奉献爱心、推己及人、薪火相传",
  tagline: "「英」为爱，「仔」一起",
  founded: "2010",
  foundedNote: "2010 年 10 月成立，同年 12 月正式挂牌",
  members: 199,
  functionalCount: 3,
  projectCount: 8,
  /** 2026 秋季招新 · 面向 2026 级 */
  recruitSeason: "2026 秋季招新",
  recruitAudience: "面向 2026 级新生",
  advisor: "刘晗梦",
  advisorUnit: "仲英书院",
  president: "王晗宇",
};

export const navLinks = [
  { label: "关于我们", href: "#about" },
  { label: "这一年", href: "#impact" },
  { label: "暑期实践", href: "#summer" },
  { label: "荣誉", href: "#honors" },
  { label: "团队", href: "#team" },
  { label: "部门", href: "#departments" },
  { label: "加入", href: "#join" },
  { label: "FAQ", href: "#faq" },
];

/* ───────── Hero ───────── */

export const hero = {
  badge: "2026 秋季招新 · 校级五星级公益社团",
  title: "英仔爱心社",
  subtitle: brand.motto,
  /** 正式、克制，面向新生与指导老师 */
  highlights: ["校级五星级社团", "本学年 199 名成员", "第十六届社长团"],
  primaryCta: "我想加入",
  secondaryCta: "先看看故事",
  secondaryHref: "#summer",
  seasonNote: "2026 年 8 月底—9 月初 · 面向 2026 级 · 面试与入群安排以公众号通知为准",
};

/** 首屏下方信任条：五星 + 活动丰富度 + 书院指导（不提综测） */
export const trustBar = [
  { label: "校级五星级社团", detail: "校级最高评定，与连续优秀并列" },
  { label: "本学年 42 项代表活动", detail: "支教、讲解、敬老、环保，常年有出发" },
  { label: "仲英书院指导", detail: "指导老师刘晗梦 · 规范而有温度" },
];

/** 社员视角引言（暂匿名；你确认后可换成具名） */
export const memberVoices = [
  {
    quote: "第一次站上九峰的讲台会手心出汗，但孩子们叫你一声『老师』的时候，那个夏天就钉在记忆里了。",
    role: "前卫部 · 暑期支教志愿者",
  },
  {
    quote: "宣传部不是只会修图。你扛着相机跑完一场支教，才会懂：善意要被好好翻译，才会被更多人看见。",
    role: "宣传部 · 干事",
  },
  {
    quote: "护理院里听爷爷讲西迁，比任何团课都让我明白『推己及人』四个字。",
    role: "常青藤 · 志愿者",
  },
];

/** 第十六届社长团（面向新生：只展示「现在带队的人」） */
export const leadership = {
  eyebrow: "OUR TEAM",
  title: "认识这一届英仔",
  subtitle: "第十六届社长团 · 指导老师刘晗梦（仲英书院）",
  advisor: { name: "刘晗梦", title: "指导老师", unit: "仲英书院" },
  advisorNote: "",
  presidentMessage: {
    name: "王晗宇",
    title: "社长",
    quote:
      "欢迎你来英仔。我们会把助学、敬老、特殊儿童关怀、生态保护和文博服务一件件做扎实，把队伍带得更齐心——让想做好事的人，在这里被接住、被锻炼、被看见。",
    note: "",
  },
  coreTitle: "社长团成员",
  core: [
    { name: "王晗宇", role: "社长" },
    { name: "李振杰", role: "团支书" },
    { name: "王紫瑞", role: "常务部副社" },
    { name: "王一璇", role: "交流部副社" },
    { name: "赵淑琳", role: "宣传部副社" },
    { name: "郭瑞雅", role: "大手拉小手副社" },
    { name: "曹紫越", role: "青春伴夕阳副社" },
    { name: "蔡茹玥", role: "启明星与心项目副社" },
    { name: "黄润泽", role: "陕博部副社" },
    { name: "董艾祺", role: "萤火部副社" },
  ],
};
/* ───────── About ───────── */

export const about = {
  eyebrow: "ABOUT US",
  title: "关于英仔爱心社",
  /**
   * 段落用 **加粗** 标记需强调的关键词；About 组件会渲染为强调样式
   */
  paragraphs: [
    "「**英**」为爱，「**仔**」一起。西安交通大学英仔爱心社成立于 **2010** 年，是学生自愿组成的校级**五星级公益社团**，也是**全国唯一由非唐仲英奖学金获得者组成的唐仲英爱心社**。我们以「**服务社会、奉献爱心、推己及人、薪火相传**」为宗旨，把课堂外的青春，写成可被触摸的陪伴。",
    "本学年约 **199** 名成员，**3** 个职能部门 + **8** 个项目部门，覆盖支教助学、敬老陪伴、特殊儿童关怀、文博志愿、校园公益与生态环保。从秦岭脚下的教室到雪域高原的课堂，从陕博展厅到病房床边——我们搭建连接校园与社会的公益平台。",
    "品牌项目以十年计：**玉树支教**已走到第**十七**届；「**知行秦川**」由前卫（九峰）与洩湖（彬州）双线并行。历年故事曾被《人民日报》《光明日报》《陕西日报》等关注。**2026 秋季**，我们面向 **2026 级**，等你一起出发。",
  ],
};

/* ───────── Impact 数据 ───────── */

export const stats = [
  { value: 17, suffix: "届", label: "玉树支教接力", hint: "2010 驰援起航，2026 再赴称多" },
  { value: 42, suffix: "项", label: "本学年代表活动", hint: "支教 · 敬老 · 文博 · 环保 · 儿童关怀" },
  { value: 199, suffix: "人", label: "在社伙伴", hint: "3 个职能部 + 8 个项目部" },
];

/** 第二排关键数字（本学年对外高光） */
export const statsSecondary = [
  { value: "5", label: "本学年国家级荣誉", hint: "榜样100 社团与团队、西门子、立邦等" },
  { value: "5000+", label: "西迁知识竞赛参与", hint: "「烽火西迁 志愿同行」单项" },
  { value: "1600+", label: "陕博讲解引导小时", hint: "展厅里的交大声音" },
  { value: "2000+", label: "线上助学小时", hint: "一对一托住的备考期" },
];

export const statsFooter =
  "近两千人次参与 · 五星级社团 × 红旗团支部 · 知行秦川双线（九峰 / 彬州）";
/* ───────── 暑期实践 Spotlight ───────── */
/* 暑期实践：按部门与地点区分 */

export type SummerCard = {
  id: string;
  tier: "hero" | "support";
  badge: string;
  /** 负责部门，招新时帮新生对号入座 */
  dept: string;
  title: string;
  poetic: string;
  place: string;
  image: string;
  stats: { value: string; label: string }[];
  /** 结构化看点，避免把不同活动糊成一段 */
  beats: string[];
  story: string;
  tags: string[];
};

export const summerSection = {
  eyebrow: "SUMMER 2026.7",
  title: "2026 暑假，我们在路上",
  subtitle:
    "2026 年 7 月，英仔兵分多路出发：玉树第十七届再赴称多；知行秦川双线开营；萤火、秦岭与中原文脉同步启程。",
};

export const summerCards: SummerCard[] = [
  {
    id: "yushu",
    tier: "hero",
    badge: "2026.7 · 第十七届",
    dept: "玉树支教团",
    title: "梦绽格桑原，玉树支教团",
    poetic: "十七载薪火再赴称多——把美育、科学与陪伴写在雪域讲台上",
    place: "2026.7 · 青海玉树 · 称多县文乐中心寄宿学校",
    image: IMG_暑期_玉树,
    stats: [
      { value: "17", label: "届接力" },
      { value: "230+", label: "破冰同学" },
      { value: "千里", label: "西行赴约" },
    ],
    beats: [
      "时间：2026 年 7 月 · 第十七届玉树支教",
      "行程：交大北门集结 → 西宁休整 → 十余小时进山，抵达称多文乐",
      "破冰「玉树相逢，共绽格桑」：藏语问候、心愿卡、击鼓传花、汉藏互歌（现场 230+ 同学）",
      "课堂：美育 / 体育分层 / 健康自护 / 科学 / 音乐；主题「心向暖阳，格桑绽放」+ 非遗水拓漆扇",
      "自 2010 年起，玉树支教已走过十七年。去年以数十人规模圆满完成；今年继续把西迁温情送到三江源头的课堂里。",
    ],
    story:
      "2026 年 7 月，第十七届队伍再次整装向西。高原上的第一堂课总带着试探的羞涩——当第一种声音被听见，陪伴便真正开始。支教日记里有「自山而来，向山而行」，也有孩子一句「好羡慕你的父母都还健在」敲开的沉默。十七年，是接力；今年这一站，是你即将能加入的故事。",
    tags: ["2026.7", "第十七届", "榜样100 团队", "民族团结"],
  },
  {
    id: "qinchuan",
    tier: "hero",
    badge: "2026.7 · 双线开营",
    dept: "前卫部 × 洩湖部",
    title: "知行秦川，梦启今夏",
    poetic: "九峰 11 名志愿者陪伴 45 名营员；彬州 6 名志愿者走进约 60 名同学的教室",
    place: "2026.7 · 周至九峰中学 · 咸阳彬州中学",
    image: IMG_暑期_知行秦川,
    stats: [
      { value: "11/45", label: "九峰 志愿/营员" },
      { value: "6/60", label: "彬州 志愿/同学" },
      { value: "双线", label: "前卫 · 洩湖" },
    ],
    beats: [
      "时间：2026 年 7 月 · 三下乡暑期实践",
      "【前卫 · 九峰】11 名志愿者 · 约 45 名营员；开营破冰、趣味文理课、体育手工与游园会",
      "【洩湖 · 彬州】6 名志愿者 · 约 60 名同学；家乡介绍、高三心路、专业科普、环保普法",
      "收官：「我眼中的交大」、西迁精神、水墨与心理健康——把视野留在孩子们心里",
      "与日常「大手拉小手」线上助学、大学游衔接，暑期是长期陪伴里最亮的一站",
    ],
    story:
      "2026 年 7 月的「知行秦川」有两条清楚的路线：前卫扎根周至九峰，用夏令营打开初中生的笑声与眼界；洩湖走进彬州中学，面向高中生做经验、专业与美育的深度对话。开营时承诺很轻——「愿做探索世界的一扇小窗」——告别会上，那扇窗已经留下光。",
    tags: ["2026.7", "前卫部", "洩湖部", "三下乡"],
  },
  {
    id: "yinghuo-summer",
    tier: "support",
    badge: "2026.7 · 儿童关怀",
    dept: "萤火部",
    title: "萤火微光，向阳而生",
    poetic: "病房里的画笔，特教中心的课桌，社区里的情绪课",
    place: "2026.7 · 西北妇幼 · 千千爱 · 菊花园 / 香胡湾",
    image: IMG_暑期_萤火,
    stats: [
      { value: "3", label: "服务场景" },
      { value: "多日", label: "连续陪伴" },
    ],
    beats: [
      "时间：2026 年 7 月",
      "病房：「梦想小剧场」绘画剪纸；「游戏止痛药」缓解医疗恐惧",
      "特教：千千爱助教课堂、岗前培训、特奥日 3V3 篮球融合赛",
      "社区：联合阳光社工——看见自己、情绪宝藏、破冰聚力",
    ],
    story:
      "2026 暑假，萤火把关怀连成一条链：在西北妇女儿童医院把床头小桌变成画板；在千千爱完成从培训到收官的多日陪伴；在菊花园与香胡湾教孩子识别情绪。微光分散在不同门牌号上，却同属一个名字。",
    tags: ["2026.7", "萤火部", "金丝带 / 千千爱"],
  },
  {
    id: "qinling",
    tier: "support",
    badge: "2026.7 · 生态实践",
    dept: "心项目",
    title: "踏峪寻青，青护秦岭",
    poetic: "净山、研学、问村——把两山理念走成脚印",
    place: "2026.7 · 子午峪 · 秦岭野生动物园 · 朱家湾",
    image: IMG_暑期_秦岭,
    stats: [
      { value: "净峪", label: "徒步清山" },
      { value: "研学", label: "自然博物馆" },
    ],
    beats: [
      "时间：2026 年 7 月",
      "子午峪结对共建：徒步捡拾 + 向游客做生态宣讲",
      "秦岭野生动物园 & 陕西自然博物馆沉浸研学",
      "朱家湾党建与民宿访谈：生态保护如何托起乡村",
    ],
    story:
      "2026 年 7 月，心项目走在秦岭里：有人弯腰捡起塑料瓶，有人在展厅与山村提问。书本里的绿水青山，要走到山野间才作数。",
    tags: ["2026.7", "心项目", "秦岭"],
  },
];

export const summerMore = [
  {
    name: "启明星 · 启明寻洛，脉续中原",
    desc: "2026.7 洛阳—开封：龙门石窟、洛博、二里头与清明上河园，用脚步读文旅与文脉",
  },
  {
    name: "青春伴夕阳 · 银龄方向",
    desc: "2026.7 向日葵 / 常青藤：社区医养、适老化调研与敬老陪伴，暑期与学期活动相连",
  },
  {
    name: "陕博部 · 暑期志愿联队",
    desc: "2026.7 陕历博讲解与民族融合专题路线，在展厅讲好长安故事",
  },
];

/* ───────── Why Join ───────── */

export const whyJoin = [
  {
    icon: HeartHandshake,
    title: "志愿时光，真的很多",
    description:
      "线上助学动辄上千小时，陕博讲解超 1600 小时，敬老、病房、净山轮番出发——你不是「偶尔做一次志愿」，而是走进一条很密的公益日程。",
  },
  {
    icon: Trophy,
    title: "五星级 × 硬荣誉",
    description:
      "校级五星级与「连续优秀」底色同在。本学年榜样100 社团与团队、西门子爱绿、立邦支教奖、最佳团日、红旗团支部……荣誉是结果，长期主义是方法。",
  },
  {
    icon: Sprout,
    title: "从新人成长到独当一面",
    description:
      "策划、招募、带队、宣讲……职能部门练统筹，项目部门练落地。宣传部还能系统学影像与新媒体，零基础也有人带。",
  },
  {
    icon: Home,
    title: "有人叫你一声「英仔」",
    description:
      "破冰、开社、团建、社友会……跨书院、跨年级的伙伴会在活动结束后一起吃饭聊天。公益路上，你不是一个人赶路。",
  },
];
/* ───────── Honors 高光时间线 ───────── */

export const honors = [
  {
    date: "2026年5月",
    items: [
      "校级学雷锋志愿服务优秀组织",
      "学雷锋优秀项目：薪火传史·文博 / 萤火聚爱·童梦护航",
      "仲英书院「集体互助之星」",
    ],
  },
  {
    date: "2026年4月",
    items: ["五四评优「红旗团支部」"],
  },
  {
    date: "2025年12月",
    items: [
      "「榜样100」全国优秀大学生社团",
      "「榜样100」全国优秀大学生团队 · 玉树支教团",
      "「榜样100」全国优秀大学生团队 · 知行秦川支教团",
      "「小我融入大我」省级优秀团队（玉树）",
      "社会实践青年研究年会多项一 / 二 / 三等奖",
    ],
  },
  {
    date: "2025年11月",
    items: [
      "第九届立邦「为爱上色」中国大学生农村支教奖 · 全国铜奖（玉树）",
      "西安交通大学第四十届「最佳团日」一等奖",
    ],
  },
  {
    date: "2025年10月",
    items: [
      "第八届西门子爱绿教育计划 · 全国优秀奖（知行秦川）",
      "校级五星级社团 · 文明社团",
    ],
  },
  {
    date: "2025年6月",
    items: [
      "「一站式」学生社区激活计划：二等奖 / 三等奖 / 人气奖",
    ],
  },
];

export const honorsNote =
  "自 2010 年以来荣誉远不止这一页。这里只摘本学年高光——完整故事，在每一次出发与归来里。";

/** 荣誉典藏墙：证书图片由宣传部按 IMAGE-SLOTS.md 的 HONOR 编号替换。 */
export const honorVault = [
  { level: "国家级", title: "榜样100全国优秀大学生社团", detail: "TOP100 教育类社团 · 2025.12", image: "/images/honors/HONOR-01.jpg" },
  { level: "国家级", title: "榜样100全国优秀大学生团队", detail: "梦绽格桑原 · 玉树支教团 · 2025.12", image: "/images/honors/HONOR-02.jpg" },
  { level: "国家级", title: "榜样100全国优秀大学生团队", detail: "知行秦川，梦启今夏 · 2025.12", image: "/images/honors/HONOR-03.jpg" },
  { level: "国家级", title: "立邦“为爱上色”农村支教奖", detail: "玉树支教团 · 奖项等级以证书最终核验为准", image: "/images/honors/HONOR-04.jpg" },
  { level: "国家级", title: "西门子爱绿教育计划全国优秀奖", detail: "知行秦川，梦启今夏 · 2025.10", image: "/images/honors/HONOR-05.jpg" },
  { level: "省级", title: "“小我融入大我”优秀团队", detail: "梦绽格桑原 · 玉树支教团 · 2025", image: "/images/honors/HONOR-06.jpg" },
  { level: "校级", title: "西安交通大学五星级社团", detail: "2024—2025 学年", image: "/images/honors/HONOR-07.jpg" },
  { level: "校级", title: "西安交通大学文明社团", detail: "2024—2025 学年", image: "/images/honors/HONOR-08.jpg" },
  { level: "校级", title: "第四十届“最佳团日”一等奖", detail: "2025.11", image: "/images/honors/HONOR-09.jpg" },
  { level: "校级", title: "五四评优“红旗团支部”", detail: "2026.04", image: "/images/honors/HONOR-10.jpg" },
  { level: "校级", title: "学雷锋志愿服务优秀组织", detail: "2025 年度", image: "/images/honors/HONOR-11.jpg" },
  { level: "校级", title: "学雷锋志愿服务优秀项目", detail: "薪火传史·文博 / 萤火聚爱·童梦护航", image: "/images/honors/HONOR-12.jpg" },
] as const;

/* ───────── Departments ───────── */

export type Department = {
  name: string;
  image: string;
  positioning: string;
  tags: string[];
  highlights: string[];
  fit: string;
  icon: LucideIcon;
  link: string;
  brandNote?: string;
};

export const functionalDepartments: Department[] = [
  {
    name: "常务部",
    image: IMG_常务部,
    positioning: "保障社团运转的大管家",
    tags: ["会议统筹", "财务物资", "制度与考核"],
    highlights: [
      "组织大型会议，守护章程与内务秩序",
      "物资、财务、资料归档与季刊制作",
      "可同时再体验一个项目部门",
    ],
    fit: "细心靠谱、愿意扛事的你",
    icon: Users,
    link: LINK_常务部,
  },
  {
    name: "交流部",
    image: IMG_交流部,
    positioning: "把大家连在一起，也连向校外",
    tags: ["招新体验", "团建活动", "社内文化"],
    highlights: [
      "组织招新、破冰、游园与节日活动",
      "运营社内文化与照片墙，让新成员快速有归属",
      "规划人力与对外交流，让跨校联动成为日常",
    ],
    fit: "热情外向、擅长把人聚在一起的你",
    icon: MessageCircle,
    link: LINK_交流部,
  },
  {
    name: "宣传部",
    image: IMG_宣传部,
    positioning: "用影像与文字讲好英仔的故事",
    tags: ["公众号", "短视频", "平面影像"],
    highlights: [
      "公众号、B 站、抖音矩阵运营（本学年粉增可观）",
      "系统培训 PS / PR / 摄影，活动现场就是练兵场",
      "可同时再体验一个项目部门，内容不脱离活动现场",
    ],
    fit: "想学表达、热爱创作的你",
    icon: Camera,
    link: LINK_宣传部,
  },
];

export const projectDepartments: Department[] = [
  {
    name: "前卫部",
    image: IMG_前卫部,
    positioning: "周至九峰助学 · 知行秦川前卫线",
    brandNote: "大手拉小手 · 前卫线",
    tags: ["九峰中学", "线上助学", "暑期夏令营"],
    highlights: [
      "周至九峰：线上周常帮扶、励志讲座，与暑期夏令营无缝衔接",
      "暑期「知行秦川」前卫队：开营破冰、趣味文理课、体育手工与告别会",
      "课堂可以很「交大」：拓扑、航发科普、英语剧目、化学炼金……打开眼界",
    ],
    fit: "有耐心、愿意把一件乡镇中学的事做很久的你",
    icon: BookOpen,
    link: LINK_大手拉小手,
  },
  {
    name: "洩湖部",
    image: IMG_洩湖部,
    positioning: "文姬 / 彬州助学 · 知行秦川洩湖线",
    brandNote: "大手拉小手 · 洩湖线",
    tags: ["文姬中学", "彬州中学", "大学游"],
    highlights: [
      "蓝田文姬线上助学；彬州 / 范公讲座与大学游，把交大带进视野",
      "暑期「知行秦川」洩湖队十日彬州：专业介绍、学科科普、西迁与普法",
      "收官课「我眼中的交大」、水墨与心理健康——给高中生可带走的坐标",
    ],
    fit: "喜欢带队、擅长把活动「办完整」的你",
    icon: Heart,
    link: LINK_大手拉小手,
  },
  {
    name: "向日葵",
    image: IMG_向日葵,
    positioning: "社区与老年大学里的青春温度",
    brandNote: "青春伴夕阳 · 分支",
    tags: ["入户敬老", "老年大学", "联欢与出游"],
    highlights: [
      "社区入户，帮老人解决具体生活小事",
      "与老年大学联欢、陕博游，让文化成为共同语言",
      "长者照护中心主题活动，用游戏与手工传递陪伴",
    ],
    fit: "细腻温柔、愿意倾听故事的你",
    icon: Sun,
    link: LINK_青春伴夕阳,
  },
  {
    name: "常青藤",
    image: IMG_常青藤,
    positioning: "护理院与公寓里的日常守护",
    brandNote: "青春伴夕阳 · 分支",
    tags: ["护理院", "节日特辑", "文娱陪伴"],
    highlights: [
      "金秋公寓、爱心护理院等常态陪伴：聊天、棋牌、康复操",
      "重阳、母亲节等节日特辑与出游守护",
      "大型敬老汇演，把舞台留给爷爷奶奶的笑容",
    ],
    fit: "沉稳踏实、能把「每周都去」坚持下来的你",
    icon: Home,
    link: LINK_青春伴夕阳,
  },
  {
    name: "启明星",
    image: IMG_启明星,
    positioning: "校内公益创新，也能走出去看世界",
    tags: ["守望者", "校内摆摊", "洛阳开封实践"],
    highlights: [
      "校内：「粮安守护」「叶语创绘」「掐丝珐琅」「心声倾诉」与梧桐/樱花摆摊",
      "暑期「启明寻洛」：龙门石窟、洛博、二里头，再收官开封文旅调研",
      "把非遗体验与青年视角的文化传播写成可分享的故事",
    ],
    fit: "脑洞大、既想在校园试新也想出门看世界的你",
    icon: Sparkles,
    link: LINK_启明星,
  },
  {
    name: "心项目",
    image: IMG_心项目,
    positioning: "旧物循环与秦岭生态的行动派",
    tags: ["回收漂流", "子午峪净山", "青护秦岭"],
    highlights: [
      "校内：军训服 / 旧衣 / 纸箱回收与物资漂流",
      "暑期：子午峪净山宣讲 + 野生动物园 / 自然博物馆研学",
      "山村访谈（如朱家湾）：听懂生态保护如何托起乡村振兴",
    ],
    fit: "在意可持续、喜欢动手落地的你",
    icon: Recycle,
    link: LINK_心项目,
  },
  {
    name: "陕博部",
    image: IMG_陕博部,
    positioning: "在陕博，把文物讲给更多人听",
    tags: ["陕历博讲解", "培训", "陕博游"],
    highlights: [
      "寒暑假进馆服务，本学年讲解与引导超 1600 小时",
      "系统培训 + 进馆带教，从爱好者成长为能讲国宝的人",
      "交大陕博游、老年大学陕博游，让更多人走进长安",
    ],
    fit: "爱历史、愿意开口表达的你",
    icon: Landmark,
    link: LINK_陕博部,
  },
  {
    name: "萤火部",
    image: IMG_萤火部,
    positioning: "病房、特教与社区里的微光陪伴",
    tags: ["病房疗愈", "千千爱特教", "社区儿童"],
    highlights: [
      "医院：梦想小剧场、游戏止痛药，用艺术缓解医疗恐惧",
      "特教：千千爱多日助教 + 特奥融合赛，岗前培训后再进班",
      "社区：联合阳光社工做情绪与自我认知小组；义卖与明信片漂流",
    ],
    fit: "心软且坚定、能温柔而专业地陪伴的你",
    icon: HeartHandshake,
    link: LINK_萤火部,
  },
];

export const departmentFinder = [
  {
    title: "想陪伴孩子",
    detail: "支教助学、病房与特教、社区儿童",
    routes: "前卫 · 洩湖 · 萤火",
    departments: ["前卫部", "洩湖部", "萤火部"],
  },
  {
    title: "想陪伴长者",
    detail: "社区、老年大学、护理院里的长期相处",
    routes: "向日葵 · 常青藤",
    departments: ["向日葵", "常青藤"],
  },
  {
    title: "想走进公共空间",
    detail: "文博讲解、校园公益、旧物循环与秦岭保护",
    routes: "陕博 · 启明星 · 心项目",
    departments: ["陕博部", "启明星", "心项目"],
  },
];

export const departmentsIntro = {
  eyebrow: "OUR DEPARTMENTS",
  title: "找到属于你的位置",
  subtitle: "3 个职能部门 + 8 个项目部门：先选你想服务的人，再选你想练的本事",
  footer: "想多体验？宣传部、常务部还可再跟一个项目部门。选部前欢迎先加群问问学长学姐。",
  /** 外行人友好：品牌线一句话 */
  legend: [
    { name: "大手拉小手", meaning: "助学品牌线 → 前卫（九峰）+ 洩湖（文姬/彬州/大学游）" },
    { name: "青春伴夕阳", meaning: "敬老品牌线 → 向日葵（社区/老年大学）+ 常青藤（护理院）" },
  ],
};

/* ───────── 日常高光条（手拉手等数据，不进暑期也要露） ───────── */

export const yearHighlights = [
  {
    title: "线上一对一助学",
    value: "2000+",
    unit: "小时",
    desc: "百余名乡镇中学学生，被稳定托住的备考期",
  },
  {
    title: "本学年国家级",
    value: "5",
    unit: "项",
    desc: "榜样100、西门子、立邦等国奖与团队荣誉",
  },
  {
    title: "陕博讲解引导",
    value: "1600+",
    unit: "小时",
    desc: "展厅里的交大声音",
  },
  {
    title: "青伴敬老",
    value: "650+",
    unit: "位老人",
    desc: "护理院、社区与老年大学的来回奔赴",
  },
];
/* ───────── Social ───────── */

export const platforms = [
  {
    type: "wechat" as const,
    name: "微信公众号",
    detail: "英仔爱心社",
    metric: "8279 关注 · 年增 16.8%",
    blurb: "本学年 186 篇文章，活动预告与志愿故事都在这里",
    link: LINK_微信公众号,
  },
  {
    type: "bilibili" as const,
    name: "哔哩哔哩",
    detail: "xjtu英仔爱心社官方",
    metric: "37 支视频 · 1.3 万+ 播放",
    blurb: "长视频记录支教与实践，总时长超过 600 分钟",
    link: LINK_哔哩哔哩,
  },
  {
    type: "douyin" as const,
    name: "抖音",
    detail: "英仔爱心社",
    metric: "19 条作品 · 起步中",
    blurb: "用短视频记录活动现场与志愿故事，欢迎会拍会剪的同学加入宣传部",
    link: LINK_抖音号,
  },
];

/* ───────── FAQ / Join ───────── */

export const faqs = [
  {
    question: "报名后需要面试吗？",
    answer:
      "需要一次轻松的交流面试，主要了解你的兴趣方向、可投入时间，以及更适合职能还是项目岗位。不是选拔压力场，是双向认识。具体场次以招新群与公众号通知为准。",
  },
  {
    question: "每周大概要花多少时间？",
    answer:
      "多数部门周常在 2–4 小时（例会 + 活动），寒暑假实践与大型节点会更集中。我们尊重课业节奏，招新时会说明各部门大概要投入的时间。",
  },
  {
    question: "可以同时待在多个部门吗？",
    answer:
      "宣传部、常务部同学可以再跟一个项目部门一起活动；其他同学以一个部门深度参与为主，以保障对服务对象的稳定陪伴与活动质量。",
  },
  {
    question: "没有经验、不是唐奖生，可以来吗？",
    answer:
      "当然。英仔正是全国唯一由非唐奖生组成的唐仲英爱心社；宣传技术、讲解词、支教方法都可以从培训与老成员带教开始。",
  },
  {
    question: "志愿活动多吗？能积累多少服务时长？",
    answer:
      "很多。线上助学、陕博讲解、敬老、病房陪伴、净山、校内公益轮番有——有人一学期就走进非常密的日程。我们把每次出发认真登记；你在意的是「做过什么」，我们陪你把这件事做扎实。",
  },
  {
    question: "「前卫」「洩湖」是什么？和大手拉小手什么关系？",
    answer:
      "「大手拉小手」是助学品牌线。前卫部主要对接周至九峰，洩湖部主要对接文姬、彬州等并组织大学游；暑期「知行秦川」也按这两条线分队。选部时看你想长期服务哪一所学校、哪一类孩子即可。",
  },
  {
    question: "五星级社团意味着什么？",
    answer:
      "这是学校对学生社团建设水平的综合评定，代表组织规范、活动质量与持续运营能力。它和「优秀学生社团」等荣誉可以并列理解：你加入的是一个被验证过的平台。",
  },
  {
    question: "社团谁负责？指导老师是谁？",
    answer:
      "现任社长王晗宇，各部门由社长团副社带队；业务指导单位为仲英书院，指导老师刘晗梦。加群后也能直接问到对应部门的学长学姐。",
  },
  {
    question: "想先了解再决定，怎么办？",
    answer: "加招新群 712079220、关注公众号，或在招新现场找英仔——问清楚再报名，我们欢迎慎重的热情。",
  },
];

/** 降低报名焦虑：路径清晰 */
export const joinSteps = [
  { step: "01", title: "填表报名", desc: "两三分钟写意向，选你心动的方向即可。" },
  { step: "02", title: "轻松交流", desc: "短面试只为互相了解，轻松交流即可。" },
  { step: "03", title: "入部启程", desc: "开社破冰，跟一次活动，正式成为英仔。" },
];

export const joinCta = {
  title: "2026 秋季，下一站由你选择",
  subtitle: "面向 2026 级。无论支教、敬老、文博还是宣传——填表或进群问一句，就有人接住你。",
  primary: "填写报名表",
  secondary: "先加招新群",
  footnote: "报名二维码与群入口也在页脚 · 招新 QQ 群 712079220",
};

export const footer = {
  credit: "英仔爱心社宣传部 · 2026 秋季招新",
  rights: "© 2026 西安交通大学英仔爱心社 · 校级五星级公益社团",
  contact: "指导单位：仲英书院 · 指导老师刘晗梦 · 欢迎公众号留言",
  guidance: "在服务中成长，在陪伴里遇见更好的自己",
};