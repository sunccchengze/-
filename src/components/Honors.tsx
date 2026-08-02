import { AnimatePresence, motion } from "framer-motion";
import { Award, MoreHorizontal, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IMG_第5页背景, VIDEO_荣誉历程 } from "../config";
import { honors, honorsNote, honorVault } from "../content";
import { SectionHeader } from "./SectionHeader";

type VaultItem = (typeof honorVault)[number];

function HonorVaultCard({ item, index }: { item: VaultItem; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      className="honor-vault-card group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 backdrop-blur-sm"
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.045, 0.5), duration: 0.48, ease: [0.2, 0.7, 0.25, 1] }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-[#f5ead5] via-[#d8bd89] to-[#8a5e37]">
        {!imageFailed ? (
          <img
            src={item.image}
            alt={`${item.title}荣誉证明`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center text-[#432b1d]">
            <Trophy className="h-10 w-10 text-[#8a5e37]" strokeWidth={1.3} aria-hidden="true" />
            <p className="mt-5 font-serif-cn text-lg font-bold leading-7">{item.level}荣誉</p>
            <div className="my-4 h-px w-16 bg-[#8a5e37]/50" />
            <p className="text-xs leading-5">荣誉证明待替换</p>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        <span className="absolute left-3 top-3 rounded-full border border-white/45 bg-black/25 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-white backdrop-blur-sm">
          {item.level}
        </span>
      </div>
      <div className="px-2 pb-2 pt-4">
        <h3 className="font-serif-cn text-sm font-bold leading-6 text-white">{item.title}</h3>
        <p className="mt-1 text-xs leading-5 text-white/60">{item.detail}</p>
      </div>
    </motion.article>
  );
}

function HonorVault({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-[#1d100f]/[0.97] px-4 py-5 text-white sm:px-8 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="honor-vault-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="sticky top-0 z-10 -mx-4 mb-8 flex items-start justify-between gap-5 border-b border-white/15 bg-[#1d100f]/95 px-4 pb-5 pt-1 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-rose-soft">HONOR ARCHIVE · 荣誉典藏</p>
            <h2 id="honor-vault-title" className="mt-2 font-serif-cn text-3xl font-bold tracking-[0.08em] text-white sm:text-4xl">
              让每一份荣光，被郑重看见
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
              这些奖项记录的不是终点，而是一届届英仔把项目做长、把陪伴做实的过程。
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white hover:text-rouge-deep"
            aria-label="关闭荣誉典藏墙"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            关闭
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pb-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {honorVault.map((item, index) => (
            <HonorVaultCard key={`${item.title}-${item.image}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

export function Honors() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const visibleHonors = honors.slice(0, 4);

  return (
    <section id="honors" className="bg-shell section-block text-white">
      <AnimatePresence>{vaultOpen ? <HonorVault onClose={() => setVaultOpen(false)} /> : null}</AnimatePresence>

      {videoOk ? (
        <video
          className="video-bg pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={IMG_第5页背景}
          aria-hidden="true"
          onError={() => setVideoOk(false)}
        >
          <source src={VIDEO_荣誉历程} type="video/mp4" />
        </video>
      ) : (
        <img src={IMG_第5页背景} alt="" aria-hidden="true" className="video-bg pointer-events-none object-cover" />
      )}
      <div className="bg-veil veil-dark" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(178,90,85,0.4),transparent_60%)]" />

      <div className="section-container">
        <SectionHeader
          eyebrow="ACHIEVEMENTS"
          title="荣誉高光"
          subtitle="本学年高光：国家级荣誉五项 · 五星级社团 · 最佳团日 · 红旗团支部"
          invert
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-white/20 md:left-[190px]" aria-hidden="true" />
          {visibleHonors.map((honor, index) => (
            <motion.div
              key={honor.date}
              className="relative grid gap-4 pb-8 pl-12 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: Math.min(index, 4) * 0.06, duration: 0.5 }}
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
            className="relative grid gap-4 pb-8 pl-12 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white/30 md:left-[183px]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <time className="font-data text-lg font-bold text-white/70 md:text-right">更多</time>
            <article className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <MoreHorizontal className="h-6 w-6 text-rouge-mist" />
                <p className="font-serif-cn text-lg italic">多年沉淀，远不止这一页</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/70">{honorsNote}</p>
            </article>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="btn-ghost-white group min-w-[240px] font-serif-cn font-bold"
            onClick={() => setVaultOpen(true)}
            aria-haspopup="dialog"
          >
            <Award className="h-5 w-5 text-rouge-mist transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            打开荣誉典藏墙
          </button>
        </div>
      </div>
    </section>
  );
}
