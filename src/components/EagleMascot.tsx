import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, MessageCircle, Palette, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  IMG_小鹰爱心,
  IMG_小鹰背面,
  IMG_小鹰侧面,
  IMG_小鹰挥手,
  IMG_小鹰报名,
  IMG_小鹰正面,
  IMG_小鹰画画,
  IMG_小鹰相机,
  IMG_小鹰飞行,
} from "../config";

type EaglePose = "front" | "side" | "back" | "wave" | "heart" | "join" | "paint" | "fly" | "camera";

const sectionMessages: Record<string, string> = {
  top: "你好呀！我是英仔小鹰，带你认识英仔。",
  about: "英仔今年 16 岁啦，我们把善意做成一次次真的出发。",
  impact: "每一个数字背后，都是被认真记录的陪伴。",
  summer: "今年夏天，我们去了玉树、周至、彬州，还有更多地方。",
  voices: "听听英仔们的故事，也许下一句就会是你写下的。",
  team: "有老师指导，也有一届届英仔把事情做下去。",
  why: "公益路上，你会收获技能，也会遇见很好的同伴。",
  honors: "荣誉是结果，认真把项目做长才是我们的日常。",
  departments: "不知道怎么选？先想想你最想陪伴谁吧。",
  social: "想先了解我们？公众号、B站和抖音都在等你。",
  join: "准备好了吗？英仔在招新群等你！",
  faq: "有顾虑很正常，点开问题慢慢看，我陪你选。",
};

const eagleImages: Record<EaglePose, string> = {
  front: IMG_小鹰正面,
  side: IMG_小鹰侧面,
  back: IMG_小鹰背面,
  wave: IMG_小鹰挥手,
  heart: IMG_小鹰爱心,
  join: IMG_小鹰报名,
  paint: IMG_小鹰画画,
  fly: IMG_小鹰飞行,
  camera: IMG_小鹰相机,
};

const sectionPoses: Partial<Record<string, EaglePose>> = {
  top: "wave",
  summer: "fly",
  social: "camera",
  join: "join",
};

/**
 * 英仔小鹰：网页吉祥物。
 * 默认挥手欢迎；滚动时侧身；按区块和按钮切换真实动作图片。
 */
export function EagleMascot() {
  const [open, setOpen] = useState(true);
  const [section, setSection] = useState("top");
  const [moving, setMoving] = useState(false);
  const [actionPose, setActionPose] = useState<EaglePose | null>("wave");
  const [heartBurst, setHeartBurst] = useState(false);
  const [paintBurst, setPaintBurst] = useState(false);

  useEffect(() => {
    const waveTimer = window.setTimeout(() => setActionPose(null), 1800);
    return () => window.clearTimeout(waveTimer);
  }, []);

  useEffect(() => {
    const ids = ["top", "about", "impact", "summer", "voices", "team", "why", "honors", "departments", "social", "join", "faq"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    let stopTimer: number | undefined;

    const updateGuide = () => {
      const guideLine = window.innerHeight * 0.42;
      const nearest = nodes.reduce<HTMLElement | null>((current, node) => {
        if (!current) return node;
        return Math.abs(node.getBoundingClientRect().top - guideLine) < Math.abs(current.getBoundingClientRect().top - guideLine)
          ? node
          : current;
      }, null);

      if (nearest?.id) setSection(nearest.id);
      setMoving(true);
      if (stopTimer) window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setMoving(false), 650);
    };

    updateGuide();
    window.addEventListener("scroll", updateGuide, { passive: true });
    window.addEventListener("resize", updateGuide);
    return () => {
      window.removeEventListener("scroll", updateGuide);
      window.removeEventListener("resize", updateGuide);
      if (stopTimer) window.clearTimeout(stopTimer);
    };
  }, []);

  const runAction = (pose: EaglePose, after?: () => void) => {
    setActionPose(pose);
    window.setTimeout(() => {
      setActionPose(null);
      after?.();
    }, 1250);
  };

  const sendHeart = () => {
    setHeartBurst(true);
    runAction("heart");
    window.setTimeout(() => setHeartBurst(false), 950);
  };

  const paintHeart = () => {
    setPaintBurst(true);
    runAction("paint");
    window.setTimeout(() => setPaintBurst(false), 1200);
  };

  const goJoin = () => {
    runAction("join", () => {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const basePose = sectionPoses[section] ?? (moving ? "side" : "front");
  const pose: EaglePose = open ? (actionPose ?? basePose) : "back";
  const message = sectionMessages[section] ?? sectionMessages.top;

  return (
    <aside className="eagle-mascot fixed bottom-5 right-3 z-40 flex items-end gap-2 sm:bottom-7 sm:right-5" aria-label="英仔小鹰引导员">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="eagle-speech relative max-w-[230px] rounded-2xl border border-rouge/15 bg-white/95 px-4 py-3 pr-9 text-sm leading-6 text-ink shadow-xl shadow-rouge/15 backdrop-blur-md"
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.96 }}
            transition={{ duration: 0.28 }}
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={section}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {message}
              </motion.p>
            </AnimatePresence>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" onClick={sendHeart} className="focus-ring inline-flex items-center gap-1 rounded-full bg-rouge/10 px-2.5 py-1 text-xs font-bold text-rouge-deep transition hover:bg-rouge hover:text-white">
                <Heart className="h-3 w-3" aria-hidden="true" />
                送你爱心
              </button>
              <button type="button" onClick={paintHeart} className="focus-ring inline-flex items-center gap-1 rounded-full bg-gold-soft/20 px-2.5 py-1 text-xs font-bold text-ink transition hover:bg-gold-soft hover:text-white">
                <Palette className="h-3 w-3" aria-hidden="true" />
                画一笔
              </button>
              <button type="button" onClick={goJoin} className="focus-ring inline-flex items-center gap-1 rounded-full bg-ink/8 px-2.5 py-1 text-xs font-bold text-ink transition hover:bg-ink hover:text-white">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                带我加入
              </button>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="focus-ring absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-rouge/10 hover:text-rouge" aria-label="收起英仔小鹰对话">
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="eagle-speech-tail" aria-hidden="true" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {heartBurst ? (
          <div className="pointer-events-none absolute -right-3 -top-14 h-28 w-28" aria-hidden="true">
            {[[-22, -10], [0, -38], [24, -18], [-10, -55], [34, -48]].map(([x, y], index) => (
              <motion.span key={`${x}-${y}`} className="absolute left-1/2 top-1/2 text-rouge" initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.8], x, y }} exit={{ opacity: 0 }} transition={{ delay: index * 0.05, duration: 0.75, ease: "easeOut" }}>
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>
            ))}
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {paintBurst ? (
          <motion.svg className="pointer-events-none absolute -left-20 -top-20 h-24 w-24 overflow-visible" viewBox="0 0 100 100" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.path d="M50 76 C14 53, 22 25, 42 30 C50 32, 50 41, 50 41 C50 41, 50 32, 58 30 C78 25, 86 53, 50 76Z" fill="none" stroke="#B25A55" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.72, ease: "easeInOut" }} />
          </motion.svg>
        ) : null}
      </AnimatePresence>

      <button type="button" onClick={() => setOpen((value) => !value)} className="focus-ring eagle-pet relative flex h-20 w-16 shrink-0 items-end justify-center rounded-[28px] bg-white/10 p-0 text-left sm:h-28 sm:w-24" aria-expanded={open} aria-label={open ? "收起英仔小鹰" : "打开英仔小鹰对话"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img key={pose} src={eagleImages[pose]} alt="" className="eagle-pet-image h-[108px] max-w-[150px] object-contain sm:h-[150px] sm:max-w-[190px]" initial={{ opacity: 0, x: pose === "side" || pose === "fly" ? -8 : 0, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 5, scale: 0.96 }} transition={{ duration: 0.22 }} />
        </AnimatePresence>
        {!open ? (
          <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-rouge text-white shadow-md shadow-rouge/30" aria-hidden="true"><MessageCircle className="h-3.5 w-3.5" /></span>
        ) : (
          <span className="absolute -right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-rouge shadow-sm" aria-hidden="true"><ChevronDown className="h-3.5 w-3.5" /></span>
        )}
      </button>
    </aside>
  );
}
