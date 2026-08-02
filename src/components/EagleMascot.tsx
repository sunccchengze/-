import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IMG_小鹰正面, IMG_小鹰侧面, IMG_小鹰背面 } from "../config";

type EagleMood = "front" | "side" | "back";

const sectionMessages: Record<string, string> = {
  top: "你好呀！我是英仔小鹰，带你认识英仔。",
  summer: "今年夏天，我们去了玉树、周至、彬州，还有更多地方。",
  departments: "不知道怎么选？先想想你最想陪伴谁吧。",
  join: "准备好了吗？英仔在招新群等你！",
};

const eagleImages: Record<EagleMood, string> = {
  front: IMG_小鹰正面,
  side: IMG_小鹰侧面,
  back: IMG_小鹰背面,
};

/**
 * 英仔小鹰：网页吉祥物试版。
 * 不遮挡核心 CTA；滚动时侧身、收起时转身，点击后给出当前页面的轻量引导。
 */
export function EagleMascot() {
  const [open, setOpen] = useState(true);
  const [section, setSection] = useState("top");
  const [moving, setMoving] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  useEffect(() => {
    const ids = ["top", "summer", "departments", "join"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target.id) setSection(mostVisible.target.id);
      },
      { rootMargin: "-38% 0px -44% 0px", threshold: [0.08, 0.25, 0.45] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let stopTimer: number | undefined;
    const onScroll = () => {
      setMoving(true);
      if (stopTimer) window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setMoving(false), 650);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer) window.clearTimeout(stopTimer);
    };
  }, []);

  const mood: EagleMood = open ? (moving ? "side" : "front") : "back";
  const message = sectionMessages[section] ?? sectionMessages.top;

  const sendHeart = () => {
    setHeartBurst(true);
    window.setTimeout(() => setHeartBurst(false), 950);
  };

  const goJoin = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="eagle-mascot fixed bottom-20 right-3 z-40 flex items-end gap-2 sm:bottom-7 sm:right-5 md:bottom-7 md:right-28" aria-label="英仔小鹰引导员">
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="eagle-speech relative max-w-[220px] rounded-2xl border border-rouge/15 bg-white/95 px-4 py-3 pr-9 text-sm leading-6 text-ink shadow-xl shadow-rouge/15 backdrop-blur-md"
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.96 }}
            transition={{ duration: 0.28 }}
            aria-live="polite"
          >
            <p>{message}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={sendHeart}
                className="focus-ring inline-flex items-center gap-1 rounded-full bg-rouge/10 px-2.5 py-1 text-xs font-bold text-rouge-deep transition hover:bg-rouge hover:text-white"
              >
                <Heart className="h-3 w-3" aria-hidden="true" />
                送你爱心
              </button>
              <button
                type="button"
                onClick={goJoin}
                className="focus-ring inline-flex items-center gap-1 rounded-full bg-gold-soft/20 px-2.5 py-1 text-xs font-bold text-ink transition hover:bg-gold-soft hover:text-white"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                带我加入
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-rouge/10 hover:text-rouge"
              aria-label="收起英仔小鹰对话"
            >
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
              <motion.span
                key={`${x}-${y}`}
                className="absolute left-1/2 top-1/2 text-rouge"
                initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.8], x, y }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05, duration: 0.75, ease: "easeOut" }}
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>
            ))}
          </div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring eagle-pet relative flex h-20 w-16 shrink-0 items-end justify-center rounded-[28px] bg-white/10 p-0 text-left sm:h-28 sm:w-24"
        aria-expanded={open}
        aria-label={open ? "收起英仔小鹰" : "打开英仔小鹰对话"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={mood}
            src={eagleImages[mood]}
            alt=""
            className="eagle-pet-image h-[104px] max-w-none object-contain sm:h-[146px]"
            initial={{ opacity: 0, x: mood === "side" ? -6 : 0, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 5, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          />
        </AnimatePresence>
        {!open ? (
          <span className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-rouge text-white shadow-md shadow-rouge/30" aria-hidden="true">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span className="absolute -right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-rouge shadow-sm" aria-hidden="true">
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
        )}
      </button>
    </aside>
  );
}
