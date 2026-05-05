import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  ChevronDown,
  Heart,
  HeartHandshake,
  Home,
  Landmark,
  MessageCircle,
  Menu,
  MoreHorizontal,
  Recycle,
  Sparkles,
  Sprout,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

/*
 * ✅ 所有图片路径和链接都集中在 src/config.ts 中
 * ✅ 需要替换图片或链接时，只需要修改 config.ts 这一个文件
 */
import {
  LINK_报名 as joinLink,
  LINK_微信公众号, LINK_抖音号, LINK_哔哩哔哩,
  LINK_常务部, LINK_交流部, LINK_宣传部,
  LINK_大手拉小手, LINK_青春伴夕阳, LINK_启明星, LINK_心项目, LINK_陕博部, LINK_萤火部,
  IMG_LOGO, IMG_报名二维码, IMG_招新群二维码, QQ_招新群号,
  IMG_首页轮播 as heroSlides,
  IMG_第2页背景, IMG_第3页背景, IMG_第4页背景, IMG_第5页背景,
  IMG_第6页背景, IMG_第7页背景, IMG_第8页背景, IMG_第9页背景, IMG_第10页背景,
  VIDEO_荣誉历程,
  IMG_公益活动剪影 as galleryImages,
  IMG_四大理由 as whyJoinImages,
  IMG_常务部, IMG_交流部, IMG_宣传部,
  IMG_大手拉小手, IMG_青春伴夕阳, IMG_启明星, IMG_心项目, IMG_陕博部, IMG_萤火部,
} from "./config";

/* —— 品牌官方 SVG 图标 —— */
const BrandIcons = {
  wechat: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-label="微信公众号">
      <path d="M8.28,2C4,2,.5,4.72.5,8.08a5.53,5.53,0,0,0,2.15,4.41l-.54,2.39a.21.21,0,0,0,.3.23l2.76-1.55a8,8,0,0,0,3.11.59,4.46,4.46,0,0,1-.21-1.34c0-2.82,2.44-5.12,5.43-5.12a5.51,5.51,0,0,1,2.94.85C16.14,4.2,12.57,2,8.28,2Zm4,3.22A.83.83,0,1,1,11.45,6,.83.83,0,0,1,12.28,5.22Zm-4.66,0A.83.83,0,1,1,6.79,6,.83.83,0,0,1,7.62,5.22Zm9.26,5.34c3.42,0,6.19,2.14,6.19,4.79a4.34,4.34,0,0,1-1.68,3.46l.43,1.9a.17.17,0,0,1-.23.18L19.45,20a6.32,6.32,0,0,1-2.57.51c-3.42,0-6.19-2.15-6.19-4.79S13.46,10.56,16.88,10.56Zm3.19,2.56a.66.66,0,1,0-.66.66A.66.66,0,0,0,20.07,13.12Zm-3.71,0a.66.66,0,1,0-.66.66A.66.66,0,0,0,16.36,13.12Z"/>
    </svg>
  ),
  douyin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-label="抖音号">
      <path d="M12.53,1.52a.37.37,0,0,0-.37.37v14.1a3.67,3.67,0,1,1-2.45-3.46.37.37,0,0,0,.26-.35V9a.37.37,0,0,0-.37-.37,6.86,6.86,0,1,0,5.74,6.75V7.47A11.38,11.38,0,0,0,21,.33a.37.37,0,0,0-.34-.32,5,5,0,0,1-3.6,1,7.56,7.56,0,0,1-4.52-1.95A.25.25,0,0,0,12.53,1.52Z"/>
    </svg>
  ),
  bilibili: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-label="哔哩哔哩号">
      <path d="M19.54,4.24l-1.39,1.39H5.85L4.46,4.24A.51.51,0,0,0,3.75,4a.48.48,0,0,0-.43.43l-.11.75a.49.49,0,0,0,.15.39L5.27,7.44A10.15,10.15,0,0,0,1.88,13.7c0,3.92,3.31,7.1,7.37,7.1H14.7c4,0,7.36-3.18,7.36-7.1a10.15,10.15,0,0,0-3.39-6.26l1.91-1.87a.49.49,0,0,0,.15-.39l-.11-.75a.48.48,0,0,0-.43-.43A.51.51,0,0,0,19.54,4.24ZM7.44,15.7a1.45,1.45,0,1,1,1.45-1.45A1.44,1.44,0,0,1,7.44,15.7Zm9,0a1.45,1.45,0,1,1,1.45-1.45A1.44,1.44,0,0,1,16.48,15.7Z"/>
    </svg>
  ),
};

/* 所有图片和链接统一从 src/config.ts 导入，方便修改 */
const assets = {
  logo: IMG_LOGO,
  logoMark: IMG_LOGO,
  honorsPoster: IMG_第5页背景,
  honorsVideo: VIDEO_荣誉历程,
  bgAbout: IMG_第2页背景,
  bgStats: IMG_第3页背景,
  bgWhy: IMG_第4页背景,
  bgDepartments: IMG_第6页背景,
  bgSocial: IMG_第7页背景,
  bgFaq: IMG_第9页背景,
  bgFooter: IMG_第10页背景,
  bgJoin: IMG_第8页背景,
};

const navLinks = [
  { label: "关于我们", href: "#about" },
  { label: "荣誉历程", href: "#honors" },
  { label: "部门介绍", href: "#departments" },
  { label: "加入我们", href: "#join" },
  { label: "FAQ", href: "#faq" },
];

const stats = [
  { value: 36, label: "国家级荣誉" },
  { value: 22, label: "省级荣誉" },
  { value: 98, label: "校级荣誉" },
];

const whyJoin = [
  {
    icon: HeartHandshake,
    title: "丰富的志愿工时",
    description: "参与多样化公益活动，积累宝贵志愿工时，为综合素质评价与未来发展增添亮点。",
  },
  {
    icon: Trophy,
    title: "校级五星级社团",
    description: "加入西安交大顶级学生组织，享受优质平台资源，拓展视野与能力边界。",
  },
  {
    icon: Sprout,
    title: "更多历练机会",
    description: "从项目策划到团队协作，从对外交流到宣传运营，全方位提升综合能力。",
  },
  {
    icon: Home,
    title: "浓厚的家文化氛围",
    description: "温暖的大家庭，破冰团建、节日聚会、互助成长，在公益路上不孤单。",
  },
];

const honors = [
  { date: "2025年1月", items: ["唐仲英基金会2023-2024学年社团公益活动优秀奖"] },
  { date: "2024年12月", items: ["第八届立邦'为爱上色'中国大学生农村支教全国优秀奖"] },
  { date: "2024年11月", items: ["西门子爱绿教育计划-中国大学生社会实践项目全国优秀奖"] },
  {
    date: "2024年10月",
    items: [
      "2024年'榜样100'全国优秀大学生社团",
      "2024年'榜样100'全国优秀大学生团队（玉树）",
      "2024年'榜样100'全国优秀大学生团队（手拉手）",
    ],
  },
  {
    date: "2023年12月",
    items: ["2023年'榜样100'全国优秀大学生社团", "2023年'榜样100'全国优秀大学生团队（玉树、蓝田）"],
  },
  { date: "2023年11月", items: ["'铸牢中华民族共同体意识·青春行'专项社会实践国家级三等奖"] },
  { date: "2023年6月", items: ["西安交通大学优秀学生社团标兵", "公益实践项目校级重点立项"] },
  { date: "2022年12月", items: ["陕西省大学生志愿服务优秀项目", "校级社会实践优秀团队"] },
];

type Department = {
  name: string;
  image: string;
  positioning: string;
  tags: string[];
  highlights: string[];
  fit: string;
  icon: LucideIcon;
  link: string;
};

const functionalDepartments: Department[] = [
  {
    name: "常务部",
    image: IMG_常务部,
    positioning: "英仔爱心社的大管家",
    tags: ["内务管理", "会议组织", "财务物资"],
    highlights: [
      "负责组织重要会议，保障社团高效运行",
      "管理物资财务，制作精彩季刊",
      "常务部同学可同时再自选一个项目部门旁听",
    ],
    fit: "细心负责、善于协调的你",
    icon: Users,
    link: LINK_常务部,
  },
  {
    name: "交流部",
    image: IMG_交流部,
    positioning: "搭建沟通桥梁，凝聚家文化",
    tags: ["团建活动", "对外交流", "人力规划"],
    highlights: ["组织破冰、冬至饺子宴、创意视频拍摄", "负责对外交流与联合活动", "优化人力配置，保障社团发展"],
    fit: "热情开朗、擅长沟通的你",
    icon: MessageCircle,
    link: LINK_交流部,
  },
  {
    name: "宣传部",
    image: IMG_宣传部,
    positioning: "塑造社团形象的门面担当",
    tags: ["平面设计", "视频剪辑", "新媒体运营"],
    highlights: [
      "免费学习 PS、PR、AE 等专业软件",
      "零基础教学相机、无人机操作",
      "宣传部同学可同时再自选一个项目部门旁听",
    ],
    fit: "热爱设计、想学技术的你",
    icon: Camera,
    link: LINK_宣传部,
  },
];

const projectDepartments: Department[] = [
  {
    name: "大手拉小手",
    image: IMG_大手拉小手,
    positioning: "用陪伴点亮孩子的梦想",
    tags: ["陪伴儿童", "支教", "学业帮扶"],
    highlights: [
      "前卫&洩湖长期为周边农村初中生提供学业帮扶与兴趣拓展",
      "每年举办大学游活动，激发孩子求学动力",
      "暑期支教品牌团队'知行秦川，梦启今夏'",
    ],
    fit: "有耐心、喜欢与孩子互动的你",
    icon: Heart,
    link: LINK_大手拉小手,
    /* 这里对应大手拉小手介绍链接 */
  },
  {
    name: "青春伴夕阳",
    image: IMG_青春伴夕阳,
    positioning: "用青春温暖岁月，以陪伴致敬夕阳",
    tags: ["敬老服务", "社区陪伴", "节日关怀"],
    highlights: [
      "常青藤：护理院贴心陪伴，倾听人生故事",
      "向日葵：创新敬老活动，歌舞传递温暖",
      "传统节日送上祝福与关怀",
    ],
    fit: "温柔细心、尊敬长辈的你",
    icon: Home,
    link: LINK_青春伴夕阳,
    /* 这里对应青春伴夕阳介绍链接 */
  },
  {
    name: "启明星",
    image: IMG_启明星,
    positioning: "探索创新公益的先锋力量",
    tags: ["创新活动", "校内公益", "主题策划"],
    highlights: ["'守望者'系列趣味摆摊活动", "金色梧桐节义卖，为公益助力", "每月举办创新性公益活动"],
    fit: "脑洞大开、勇于尝试的你",
    icon: Sparkles,
    link: LINK_启明星,
  },
  {
    name: "心项目",
    image: IMG_心项目,
    positioning: "服务交大学子的身边公益",
    tags: ["校内公益", "资源回收", "环保行动"],
    highlights: ["双十一纸箱回收、旧衣回收、毕业季回收", "净滩行动等环保主题活动", "方便同学生活的物资漂流"],
    fit: "关注环保、热心助人的你",
    icon: Recycle,
    link: LINK_心项目,
  },
  {
    name: "陕博部",
    image: IMG_陕博部,
    positioning: "成为陕西历史的传播者",
    tags: ["博物馆志愿", "文化传承", "志愿讲解"],
    highlights: ["陕西历史博物馆志愿引导与讲解服务", "培训考核后获精美文创奖励", "全年凭证入馆，享志愿者专属福利"],
    fit: "热爱历史文化、善于表达的你",
    icon: Landmark,
    link: LINK_陕博部,
    /* 这里对应陕博部介绍链接 */
  },
  {
    name: "萤火部",
    image: IMG_萤火部,
    positioning: "关怀特殊儿童，传递微光温暖",
    tags: ["特殊儿童", "患癌儿童", "爱心陪伴"],
    highlights: [
      "与金丝带、千千爱合作，陪伴患癌儿童",
      "关爱自闭症儿童，入户辅导困境儿童",
      "爱心义卖活动：画作文创、手工玫瑰、明信片漂流",
    ],
    fit: "爱心、善于倾听的你",
    icon: HeartHandshake,
    link: LINK_萤火部,
    /* 这里对应萤火部介绍链接 */
  },
];
/* 这里是各部门介绍16:9宣传卡片插图，来源于public/images/文件夹 */

const faqs = [
  {
    question: "报名后需要面试吗？",
    answer:
      "是的，我们会安排简短的面试环节，主要了解你的兴趣方向与时间安排，轻松愉快的交流，不用紧张！",
  },
  {
    question: "每周需要投入多少时间？",
    answer:
      "根据部门不同，每周约 2-4 小时，包括例会、活动策划与执行。我们充分尊重你的课业时间。",
  },
  {
    question: "可以同时加入多个部门吗？",
    answer:
      "宣传部和常务部同学可以同时再自选一个项目部门旁听（深度参与、学习），其他部门同学都是只能加入一个。这样既能保证核心活动的质量，也给想多方体验的同学提供了广阔的平台。",
  },
  {
    question: "志愿工时如何记录与认证？",
    answer: "每次活动后统一登记，学期末提供官方志愿工时证明，可用于综合素质评价。",
  },
  {
    question: "如何了解更多信息？",
    answer: "扫描下方二维码加入招新群，或关注我们的微信公众号，获取实时资讯。",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ============================================================ */
/*  3D 翻转图块组件 (用于加入招新群)                             */
/* ============================================================ */
function FlippingQRBlock({ qrSrc, label }: { qrSrc: string; label: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 relative h-[164px] w-[120px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      role="button"
      aria-label="点击翻转查看QQ招新群号"
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* 正面: 二维码图块 */}
        <div className="backface-hidden glass-panel absolute inset-0 flex flex-col items-center justify-center rounded-xl p-2 bg-white ring-1 ring-white/30">
          <img
            src={qrSrc}
            alt={label}
            className="h-[110px] w-[110px] rounded-lg bg-white object-contain"
            loading="lazy"
          />
          {/* 这里是招新群二维码插图，来源 public/文件夹 */}
          <p className="mt-2 text-center text-xs text-muted font-medium">{label}</p>
        </div>

        {/* 反面: QQ群信息 */}
        <div className="backface-hidden rotate-y-180 bg-warm-gradient absolute inset-0 flex flex-col items-center justify-center rounded-xl p-3 shadow-lg shadow-rouge/20 text-white">
          <Users className="h-6 w-6 mb-2" />
          <p className="font-serif-cn text-xs font-bold tracking-wider">QQ招新群</p>
          <div className="my-2 h-px w-8 bg-white/40" />
          <p className="text-center font-data text-sm font-bold bg-white/20 px-2 py-1 rounded select-all">{QQ_招新群号}</p>
          <p className="mt-1 text-center text-[10px] text-white/70">长按可复制群号</p>
        </div>
      </motion.div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  invert?: boolean;
}) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <p className={`eyebrow ${invert ? "!text-rouge-mist" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-serif-cn text-[2rem] font-bold leading-tight md:text-5xl ${
          invert ? "text-white text-shadow-soft" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-8 md:text-xl ${invert ? "text-white/85" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
      <div className="gradient-divider" />
    </motion.div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(40,24,24,0.28)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6" aria-label="主导航">
        <a href="#top" className="flex items-center gap-3 focus-ring">
          <img src={assets.logoMark} alt="英仔爱心社 Logo" className="h-10 w-10 rounded-full ring-1 ring-white/40" />
          {/* 这里对应顶部导航栏的首页锚点链接 */}
          <span className="font-serif-cn text-xl font-bold tracking-[0.12em] text-white">英仔爱心社</span>
        </a>
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link font-serif-cn text-[15px] font-medium tracking-[0.14em] text-white/90"
            >
              {/* 这里对应导航各模块跳转锚点链接 */}
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={joinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl bg-white px-5 py-3 font-serif-cn text-sm font-bold tracking-[0.12em] text-rouge-deep transition hover:scale-105 md:inline-flex"
        >
          {/* 这里对应顶部右侧直接报名链接 */}
          立即报名
        </a>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="打开菜单"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-[rgba(40,24,24,0.96)] p-6 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif-cn text-xl font-bold text-white">英仔爱心社</span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white"
                onClick={() => setOpen(false)}
                aria-label="关闭菜单"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-16 grid gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif-cn text-3xl text-white"
                  onClick={() => setOpen(false)}
                >
                  {/* 这里对应移动端菜单导航锚点链接 */}
                  {link.label}
                </a>
              ))}
              <a 
                href={joinLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-white mx-auto mt-6 px-10 py-4"
              >
                {/* 这里对应移动端菜单栏立即报名链接 */}
                立即报名加入
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const highlights = ["丰富的志愿工时", "五星级社团", "浓厚的家文化氛围"];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="bg-shell relative flex min-h-screen items-center justify-center text-white"
    >
      {/* 轮播图层 */}
      <AnimatePresence>
        <motion.img
          key={currentSlide}
          src={heroSlides[currentSlide]}
          alt="西安交通大学英仔爱心社活动剪影"
          className="absolute inset-0 -z-[3] h-full w-full object-cover opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* 这里是封面页图片轮播，来源于public/images/文件夹 */}
      </AnimatePresence>

      {/* 封面页高级蒙版：仅保护文字区域，上方保留图片通透感 */}
      <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(33,20,18,0)_0%,rgba(33,20,18,0)_35%,rgba(51,28,24,0.48)_66%,rgba(30,18,16,0.75)_100%)]" />
      {/* 四角暗角：让视线自然聚焦到中央标题 */}
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_50%_-10%,rgba(0,0,0,0.32),transparent_42%),radial-gradient(circle_at_-10%_50%,rgba(0,0,0,0.26),transparent_38%),radial-gradient(circle_at_110%_50%,rgba(0,0,0,0.26),transparent_38%)]" />

      {/* 轮播指示器 */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`切换到第 ${idx + 1} 张图片`}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === currentSlide ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 text-center">
        <motion.div
          className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-2 ring-1 ring-white/30 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={assets.logo} alt="社团 Logo 占位" className="h-full w-full rounded-full object-contain" />
          {/* 这里对应封面页顶部社团大圆Logo插图，来源 public/images/英仔爱心社LOGO.png */}
        </motion.div>

        <motion.p
          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-serif-cn text-xs tracking-[0.24em] text-white/90 backdrop-blur-[3px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
          西安交通大学 · 校级五星级公益社团
        </motion.p>
        <motion.h1
          className="hero-title mt-8 font-serif-cn text-[3.5rem] leading-[1.05] tracking-[0.12em] text-shadow-soft md:text-[104px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.75 }}
        >
          英仔爱心社
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-3xl font-serif-cn text-base font-medium leading-8 tracking-[0.18em] text-white/88 md:text-[21px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.75 }}
        >
          服务社会 · 奉献爱心 · 推己及人 · 薪火相传
        </motion.p>
        <motion.div
          className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row md:gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.75 }}
        >
          {highlights.map((item) => (
            <div key={item} className="glass-highlight font-serif-cn font-semibold">
              <span className="h-2 w-2 rotate-45 bg-rose" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <a
            href={joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-14 py-5 font-serif-cn text-lg font-bold tracking-[0.1em] shadow-[0_18px_45px_rgba(20,10,10,0.32)]"
          >
            {/* 这里对应主行动按钮: 立即报名加入的链接 */}
            立即报名加入
          </a>
          <a
            href="#departments"
            className="btn-ghost-white border-white/80 bg-white/[0.06] px-14 py-5 font-serif-cn text-lg font-bold tracking-[0.1em] text-white transition duration-300 hover:bg-white/12 hover:text-white"
          >
            {/* 这里对应次行动按钮: 锚点了解更多部门的链接 */}
            了解更多部门
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 text-white/80 text-xs uppercase tracking-[0.25em] font-medium select-none cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-shell section-block">
      <img src={assets.bgAbout} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是关于我们全屏背景插图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-cream" />
      <div className="section-container">
        <SectionHeader eyebrow="ABOUT US" title="关于英仔爱心社" />
        <motion.div
          className="glass-panel mx-auto mt-12 max-w-4xl space-y-6 rounded-3xl p-8 text-justify text-base leading-[2.1] text-muted md:p-14 md:text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p>
            西安交通大学<span className="gradient-text font-bold">英仔爱心社</span>成立于2010年，是一个校级<span className="gradient-text font-bold">五星级公益社团</span>，也是<span className="gradient-text font-bold">全国唯一一个由非唐仲英奖学金获得者组成的唐仲英爱心社</span>。自创办以来，英仔爱心社一直秉承着“<span className="gradient-text font-bold">服务社会，奉献爱心，推己及人，薪火相传</span>”的公益理念，在公益的道路上不忘初心，砥砺前行。
          </p>
          <p>
            英仔爱心社执着于公益事业的探索创新，不断突破自我，精益求精。各项目、各实践团队累计获得荣誉超过150项，<span className="gradient-text font-bold">连续10年蝉联校级“优秀学生社团”称号</span>，被评为<span className="gradient-text font-bold">知行计划榜样100全国最佳大学生社团</span>，受到社会各界的广泛关注与一致好评。
          </p>
        </motion.div>

        {/* 16 张公益剪影：4×4 网格，16:9 比例 */}
        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {galleryImages.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="image-shell aspect-video overflow-hidden rounded-xl ring-1 ring-white/40 cursor-pointer duration-500 hover:scale-105 hover:shadow-[0_0_28px_rgba(201,168,118,0.52)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: (index % 8) * 0.05, duration: 0.6 }}
            >
              <img src={src} alt={`公益活动剪影 ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
              {/* 这里是公益活动剪影画廊列表，共16张图，图片来源于public/images/文件夹 */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticNumber({ value }: { value: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });
  return (
    <span
      ref={ref}
      className="gradient-text-vivid font-data text-7xl leading-none md:text-[110px]"
      style={{ fontWeight: 900 }}
    >
      {inView ? (
        <CountUp
          end={value}
          duration={1.8}
          easingFn={(t, b, c, d) => c * (1 - Math.pow(2, (-10 * t) / d)) + b}
        />
      ) : (
        0
      )}
    </span>
  );
}

function Statistics() {
  return (
    <section className="bg-shell relative py-24 md:py-[140px]">
      <img src={assets.bgStats} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是荣誉核心数据全屏背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-paper" />
      <div className="geo-pattern" aria-hidden="true" />
      <div className="section-container relative z-10">
        <SectionHeader eyebrow="ACHIEVEMENTS · DATA" title="荣誉数据" subtitle="十五年深耕公益，硕果累累" />
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-[60px]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-3xl p-10 text-center"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            >
              <StatisticNumber value={stat.value} />
              <p className="mt-5 font-serif-cn text-xl font-bold text-rouge-deep tracking-[0.18em]">{stat.label}</p>
              <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-rouge to-transparent" />
            </motion.div>
          ))}
        </div>
        <motion.p
          className="mt-16 text-center font-serif-cn text-lg italic text-rouge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          连续 10 年蝉联校级优秀学生社团
        </motion.p>
      </div>
    </section>
  );
}

function WhyJoin() {
  return (
    <section className="bg-shell section-block">
      <img src={assets.bgWhy} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是四大理由模块全屏背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader eyebrow="WHY JOIN US" title="加入英仔的四大理由" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-10">
          {whyJoin.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="card-hover card-outline-gradient overflow-hidden rounded-[24px] p-6 md:p-8"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                {/* 1:1 图片 */}
                <div className="image-shell aspect-square w-full shrink-0 overflow-hidden rounded-2xl sm:w-[180px] md:w-[200px]">
                  <img
                    src={whyJoinImages[index]}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {/* 这里是四大理由1:1方形插图列表，共4张图，图片来源于public/images/文件夹 */}
                </div>
                {/* 文字 */}
                <div className="flex flex-1 flex-col">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-gradient text-white shadow-lg shadow-rouge/30">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 font-serif-cn text-2xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-base leading-[1.75] text-muted">{description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Honors() {
  const [expanded, setExpanded] = useState(false);
  const visibleHonors = expanded ? honors : honors.slice(0, 6);

  return (
    <section id="honors" className="bg-shell section-block text-white">
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assets.honorsPoster}
        aria-hidden="true"
      >
        <source src={assets.honorsVideo} type="video/mp4" />
      </video>
      {/* 这里是荣誉模块视频循环背景，来源于 public/videos/文件夹 */}
      <div className="bg-veil veil-dark" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(178,90,85,0.45),transparent_60%)]" />

      <div className="section-container">
        <SectionHeader eyebrow="ACHIEVEMENTS" title="荣誉历程" subtitle="精益求精，砥砺前行" invert />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-white/20 md:left-[190px]" aria-hidden="true" />

          <AnimatePresence initial={false}>
            {visibleHonors.map((honor, index) => (
              <motion.div
                key={honor.date}
                className="relative grid gap-4 pb-8 pl-12 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: Math.min(index, 5) * 0.06, duration: 0.55 }}
              >
                <div className="timeline-dot absolute left-[9px] top-2 h-4 w-4 rounded-full border-4 border-white md:left-[183px]" />
                <time className="font-data text-lg font-bold text-rouge-mist md:text-right">{honor.date}</time>
                <article className="glass-panel-dark rounded-2xl border-l-4 border-rouge p-6">
                  <ul className="space-y-3 text-base leading-7 text-white/90">
                    {honor.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            ))}

            <motion.div
              key="ellipsis"
              className="relative grid gap-4 pb-8 pl-12 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white/30 md:left-[183px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <time className="font-data text-lg font-bold text-white/70 md:text-right">2022 年以前</time>
              <article className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <MoreHorizontal className="h-6 w-6 text-rouge-mist" />
                  <p className="font-serif-cn text-lg italic">还有更多荣誉，此处暂略</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  自 2010 年成立以来，英仔爱心社累计获得荣誉超过 150 项。受篇幅所限，更早的荣誉先暂时略去，欢迎你加入后亲自翻阅那些温暖的故事。
                </p>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            className="btn-secondary !border-white !bg-white/10 !text-white hover:!text-white hover:scale-105 transition duration-300 font-serif-cn font-bold"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {/* 这里对应展开更多荣誉历程动作 */}
            {expanded ? "收起荣誉" : "查看更多近年荣誉"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Departments() {
  const [activeTab, setActiveTab] = useState<"functional" | "project">("functional");
  const departments = activeTab === "functional" ? functionalDepartments : projectDepartments;

  return (
    <section id="departments" className="bg-shell section-block">
      <img src={assets.bgDepartments} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是部门介绍全屏背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-cream" />
      <div className="section-container">
        <SectionHeader
          eyebrow="OUR DEPARTMENTS"
          title="找到属于你的位置"
          subtitle="三个职能部门 + 六个项目部门，总有一个适合你"
        />

        {/* iOS 系统设置风格的圆形滑块 Tab 切换器 */}
        <div className="mt-16 flex justify-center">
          <div className="glass-panel relative flex h-14 w-[280px] rounded-full bg-white/50 p-1.5 md:w-[320px]">
            {/* 圆形滑块 */}
            <motion.div
              className="absolute inset-y-1.5 rounded-full bg-warm-gradient shadow-md"
              initial={false}
              animate={{
                left: activeTab === "functional" ? "6px" : "calc(50% + 2px)",
                width: "calc(50% - 8px)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            {/* Tab 按钮 */}
            {[
              { id: "functional" as const, label: "职能部门" },
              { id: "project" as const, label: "项目部门" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`relative z-10 flex flex-1 items-center justify-center font-serif-cn text-base font-bold transition-colors duration-300 md:text-lg ${
                  activeTab === tab.id ? "text-white" : "text-muted hover:text-rouge"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 items-stretch"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
          >
            {departments.map((department, index) => (
              <DepartmentCard key={department.name} department={department} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="mt-16 text-center font-serif-cn text-base text-muted md:text-lg">
          每个部门都有独特使命，选择你热爱的方向，和小英仔一起，开启公益之旅吧～
        </p>
      </div>
    </section>
  );
}

function DepartmentCard({ department, index }: { department: Department; index: number }) {
  const Icon = department.icon;
  return (
    <motion.article
      className="card-hover card-outline-gradient flex flex-col h-full overflow-hidden rounded-[24px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="image-shell h-[220px] md:h-60 shrink-0">
        <img
          src={department.image}
          alt={`${department.name}部门活动照片`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* 这里是各部门介绍16:9宣传卡片插图，来源于public/images/文件夹 */}
        <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-rouge backdrop-blur-md">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
      </div>
      
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="font-serif-cn text-[28px] font-bold leading-tight text-ink">{department.name}</h3>
        <p className="mt-3 font-serif-cn text-lg italic text-rouge">{department.positioning}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {department.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
        <ul className="mt-6 space-y-3 text-base leading-[1.7] text-muted flex-grow">
          {department.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-warm-gradient" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-neutral-500">适合：{department.fit}</p>
        
        <div className="mt-auto pt-8">
          <a href={department.link} target="_blank" rel="noopener noreferrer" className="btn-card w-full">
            {/* 这里对应各部门了解更多的行动链接 */}
            了解更多 <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function SocialMedia() {
  const platforms = [
    {
      type: "wechat" as const,
      name: "英仔爱心社",
      detail: "微信公众号",
      link: LINK_微信公众号,
      /* 这里对应微信公众号链接 */
    },
    {
      type: "douyin" as const,
      name: "英仔爱心社",
      detail: "抖音号",
      link: LINK_抖音号,
      /* 这里对应抖音号链接 */
    },
    {
      type: "bilibili" as const,
      name: "英仔爱心社",
      detail: "哔哩哔哩号",
      link: LINK_哔哩哔哩,
      /* 这里对应哔哩哔哩账号链接 */
    },
  ];

  return (
    <section className="bg-shell py-24 md:py-[140px]">
      <img src={assets.bgSocial} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是平台介绍全屏背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-paper" />
      <div className="section-container">
        <SectionHeader eyebrow="FOLLOW US" title="关注我们的平台" subtitle="获取最新活动资讯与公益故事" />
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {platforms.map((platform, index) => {
            const Icon = BrandIcons[platform.type];
            return (
              <motion.article
                key={platform.detail}
                className="card-hover card-outline-gradient rounded-[24px] p-10 text-center"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-warm-gradient text-white shadow-lg shadow-rouge/30">
                  <Icon />
                </div>
                <h3 className="mt-7 font-serif-cn text-2xl font-bold text-ink">{platform.name}</h3>
                <p className="mt-2 text-muted">{platform.detail}</p>
                <a href={platform.link} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-8 px-8 py-3 text-sm">
                  {/* 这里对应各社交媒体账号关注动作 */}
                  关注
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const [isGroupFlipped, setIsGroupFlipped] = useState(false);

  return (
    <section id="join" className="bg-shell relative py-24 text-white md:py-40">
      <img src={assets.bgJoin} alt="" aria-hidden="true" className="bg-image slow-zoom" />
      {/* 这里是加入我们大背景图插图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-rouge" />
      <div className="cta-pattern" aria-hidden="true" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        <motion.h2 
          className="font-serif-cn text-4xl font-bold leading-tight text-shadow-soft md:text-[56px]"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          准备好加入我们了吗？
        </motion.h2>
        <motion.p 
          className="mt-6 text-lg text-white/90 md:text-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          扫码填写报名表，或点击右侧图块获取招新QQ群号
        </motion.p>
        
        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          {/* 报名按钮 */}
          <motion.a 
            href={joinLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-white px-14 py-5 text-lg h-[64px]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* 这里对应底部大报名链接 */}
            立即报名
          </motion.a>

          {/* 3D 翻转图块按钮 (加入招新群) */}
          <motion.div
            className="perspective-1000 relative h-[64px] w-[214px] cursor-pointer font-serif-cn text-lg font-bold"
            onClick={() => setIsGroupFlipped(!isGroupFlipped)}
            role="button"
            aria-label="点击翻转查看QQ招新群号"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="preserve-3d relative h-full w-full"
              animate={{ rotateY: isGroupFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* 正面: 加入招新群按钮 */}
              <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl border-2 border-white/90 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-rouge-deep">
                加入招新群
              </div>

              {/* 反面: QQ群号展示 */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center rounded-xl bg-paper shadow-lg text-rouge-deep">
                <span className="text-xs font-sans font-medium text-muted mr-1.5">群号:</span>
                <span className="font-data font-bold tracking-wide select-all">123456789</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <p className="mt-10 text-sm text-white/70">报名二维码与招新群翻转图块也可在页面底部获取</p>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="bg-shell section-block">
      <img src={assets.bgFaq} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是常见问题全屏背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader eyebrow="FAQ" title="常见问题" />
        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <motion.article
                key={item.question}
                className={`overflow-hidden rounded-2xl bg-white/85 backdrop-blur-md transition ${
                  open ? "border-t-2 border-rouge shadow-lg shadow-rouge/10" : "border-t-2 border-transparent"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 p-6 text-left font-serif-cn text-xl font-medium text-ink focus-ring"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                >
                  {item.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-rouge transition ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 text-base leading-[1.85] text-muted">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-shell px-6 py-20 pb-10 text-white">
      <img src={assets.bgFooter} alt="" aria-hidden="true" className="bg-image" />
      {/* 这里是页脚大背景图，来源于public/images/文件夹 */}
      <div className="bg-veil veil-dark" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1.2fr] md:gap-[60px] items-start">
          <div>
            <div className="flex items-center gap-3">
              <img src={assets.logoMark} alt="英仔爱心社 Logo" className="h-12 w-12 rounded-full ring-1 ring-white/30" />
              {/* 这里对应页脚社团Logo图，来源于public/images/文件夹 */}
              <h2 className="font-serif-cn text-[28px] font-bold">英仔爱心社</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">服务社会 · 奉献爱心 · 推己及人 · 薪火相传</p>
            <p className="mt-3 text-sm text-rouge-mist">自 2010 年起</p>
          </div>
          <div>
            <h3 className="mb-5 font-medium text-white">快速链接</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer-link" href={link.href}>
                    {/* 这里对应页脚导航链接动作 */}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 font-medium text-white">联系我们</h3>
            <div className="flex flex-wrap gap-6 items-center">
              {/* 扫码报名 (静态二维码块) */}
              <figure className="text-center">
                <div className="glass-panel rounded-xl p-2 bg-white ring-1 ring-white/30">
                  <img
                    src={IMG_报名二维码}
                    alt="扫码报名"
                    className="h-[110px] w-[110px] rounded-lg bg-white object-contain"
                    loading="lazy"
                  />
                  {/* 这里是页脚报名表二维码，来源于public/文件夹 */}
                </div>
                <figcaption className="mt-2 text-xs text-white/80 font-medium">扫码报名</figcaption>
              </figure>

              {/* 加入招新群 (3D 翻转二维码块) */}
              <FlippingQRBlock qrSrc={IMG_招新群二维码} label="点击查看群号" />
            </div>
          </div>
        </div>
        <div className="mt-16 space-y-2 border-t border-white/10 pt-8 text-center text-xs text-white/60">
          <p>© 2026 西安交通大学英仔爱心社 · 校级五星级公益社团 · 保留所有权利</p>
          <p>有任何问题欢迎随时在微信公众号与我们沟通！</p>
          <p>宣传部制作 SCZ的demo版本</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Statistics />
        <WhyJoin />
        <Honors />
        <Departments />
        <SocialMedia />
        <JoinCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
