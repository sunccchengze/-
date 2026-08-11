import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Grid, Layers } from "lucide-react";
import { type ReactNode, useState } from "react";
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
 * 替代原先单一的 16 张静态网格平铺，支持触控拖拽甩开相片，并附带 4×4 经典视图切换按钮。
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

  return (
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-rouge/10 px-3 py-1 text-xs font-bold text-rouge-deep">
            Polaroid Deck · 拍立得相片发牌
          </span>
          <span className="text-xs text-muted">
            {isGridView ? "4×4 经典平铺视图" : "按住照片向左/向右拖拽即可抛开相片"}
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
        <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[440px]">
          <AnimatePresence>
            {deck.slice(0, 4).map((card, i) => {
              const isTop = i === 0;
              const rotate = i === 0 ? 0 : i === 1 ? -4 : i === 2 ? 4.5 : -3;
              const yOffset = i * 8;
              const scale = 1 - i * 0.04;
              return (
                <motion.div
                  key={card.id}
                  className={`gpu-accelerated absolute inset-0 rounded-[24px] bg-[#FAFAF7] p-3 shadow-2xl ring-1 ring-black/15 sm:p-5 pb-11 sm:pb-14 ${
                    isTop ? "z-40 cursor-grab active:cursor-grabbing" : "pointer-events-none"
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
                    x: 450,
                    rotate: 25,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 25 }}
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_e, info) => {
                    if (Math.abs(info.offset.x) > 60) {
                      if (info.offset.x > 0) {
                        swipeNext();
                      } else {
                        swipePrev();
                      }
                    }
                  }}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream">
                    <img
                      src={card.src}
                      alt={`公益活动真实剪影 #${card.idx + 1}`}
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center font-serif-cn text-xs font-bold tracking-wider text-muted/85 sm:bottom-4 sm:text-sm">
                    现场纪念 #{String(card.idx + 1).padStart(2, "0")} / {images.length} — 以爱陪伴，真实发生过的温暖
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {!isGridView && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={swipePrev}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-rouge/20 bg-white/80 px-5 text-xs font-bold text-ink backdrop-blur-sm transition hover:bg-white hover:text-rouge-deep active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 text-rouge" />
            甩上张
          </button>
          <span className="hidden text-xs font-bold tracking-wider text-muted/70 sm:inline">
            —— 拖动卡片发牌，或点击左右侧按键 ——
          </span>
          <button
            type="button"
            onClick={swipeNext}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-rouge/20 bg-white/80 px-5 text-xs font-bold text-ink backdrop-blur-sm transition hover:bg-white hover:text-rouge-deep active:scale-95"
          >
            甩下张
            <ArrowRight className="h-4 w-4 text-rouge" />
          </button>
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
