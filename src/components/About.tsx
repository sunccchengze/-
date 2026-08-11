import { AnimatePresence, motion } from "framer-motion";
import { Grid, Layers } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { IMG_第2页背景, IMG_公益活动剪影 as galleryImages } from "../config";
import { about } from "../content";
import { SectionHeader } from "./SectionHeader";

const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } };

/** 将 **关键词** 渲染为强调样式 */
function renderEmphasized(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-serif-cn font-bold text-rouge-deep">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * 方案 1（Aristide Benoist 物理力学与手势甩牌）：拍立得相片堆·手指发牌甩页 (Polaroid Deck)
 * 1. 取消圆角，纯真实相片直角质感；
 * 2. 每隔 3s 自动发下一张，点击照片也会抛出下一张；
 * 3. 头部文案极简化，仅保留 Polaroid Deck；
 * 4. 整体展示面积放大一倍。
 */
function PolaroidDeck({ images }: { images: readonly string[] }) {
  const [deck, setDeck] = useState(() => images.map((src, idx) => ({ src, idx, id: `photo-${idx}` })));
  const [isGridView, setIsGridView] = useState(false);

  const swipeNext = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]!];
    });
  };

  const swipePrev = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1]!;
      return [last, ...prev.slice(0, -1)];
    });
  };

  useEffect(() => {
    if (isGridView) return;
    const timer = window.setInterval(() => {
      swipeNext();
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isGridView, deck]);

  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rouge/10 px-4 py-1.5 text-xs font-bold tracking-widest text-rouge-deep uppercase">
            Polaroid Deck
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsGridView((v) => !v)}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-rouge/20 bg-white/70 px-4 py-1.5 text-xs font-bold text-ink backdrop-blur-sm transition hover:bg-white hover:text-rouge"
        >
          {isGridView ? (
            <>
              <Layers className="h-3.5 w-3.5" />
              返回拍立得甩牌
            </>
          ) : (
            <>
              <Grid className="h-3.5 w-3.5" />
              切换 4×4 平铺
            </>
          )}
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {images.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="image-shell aspect-video overflow-hidden rounded-xl ring-1 ring-white/40 duration-500 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,168,118,0.45)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 8) * 0.04, duration: 0.55 }}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative mx-auto h-[290px] w-full max-w-[760px] sm:h-[530px]">
          <AnimatePresence>
            {deck.slice(0, 4).map((card, i) => {
              const isTop = i === 0;
              const rotate = i === 0 ? 0 : i === 1 ? -3.5 : i === 2 ? 4 : -2.5;
              const yOffset = i * 8;
              const scale = 1 - i * 0.035;
              return (
                <motion.div
                  key={card.id}
                  className={`gpu-accelerated absolute inset-0 rounded-none bg-[#FAFAF7] p-3.5 sm:p-5 pb-9 sm:pb-11 shadow-2xl ring-1 ring-black/20 ${
                    isTop ? "z-40 cursor-pointer active:cursor-grabbing" : "pointer-events-none"
                  }`}
                  style={{ zIndex: 40 - i * 10 }}
                  initial={false}
                  animate={{
                    rotate: `${rotate}deg`,
                    y: yOffset,
                    scale,
                    opacity: 1 - i * 0.15,
                  }}
                  exit={{
                    x: 580,
                    rotate: 26,
                    opacity: 0,
                    transition: { duration: 0.38 },
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onClick={isTop ? swipeNext : undefined}
                  onDragEnd={(_e, info) => {
                    if (Math.abs(info.offset.x) > 50) {
                      if (info.offset.x > 0) {
                        swipeNext();
                      } else {
                        swipePrev();
                      }
                    }
                  }}
                >
                  <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden rounded-none bg-cream">
                    <img
                      src={card.src}
                      alt={`公益活动真实剪影 #${card.idx + 1}`}
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center font-serif-cn text-xs sm:text-sm font-bold tracking-wider text-muted/90">
                    现场纪念 #{String(card.idx + 1).padStart(2, "0")} / {images.length} — 以爱陪伴，真实发生过的温暖
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-shell section-block">
      <img src={IMG_第2页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-cream" />
      <div className="section-container">
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle="2026 招新 · 五星级 · 十七载玉树 · 全国唯一非唐奖生组成的唐仲英爱心社"
        />
        <motion.div
          className="glass-panel mx-auto mt-12 max-w-4xl space-y-6 rounded-3xl p-8 text-justify text-base leading-[2] text-muted md:p-14 md:text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
        >
          {about.paragraphs.map((p, i) => (
            <p key={i}>{renderEmphasized(p)}</p>
          ))}
        </motion.div>

        <PolaroidDeck images={galleryImages} />

        <p className="mt-8 text-center text-sm text-muted">
          剪影来自支教、敬老、陕历博与校园公益现场——真实发生过的温暖
        </p>
      </div>
    </section>
  );
}
