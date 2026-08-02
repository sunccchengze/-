import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { IMG_第5页背景, VIDEO_荣誉历程 } from "../config";
import { honors, honorsNote } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Honors() {
  const [expanded, setExpanded] = useState(false);
  const [videoOk, setVideoOk] = useState(true);
  const visibleHonors = expanded ? honors : honors.slice(0, 4);

  return (
    <section id="honors" className="bg-shell section-block text-white">
      {/* 视频失败时自动回退 poster，避免黑屏（CF Pages 上常见坑） */}
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
        <img
          src={IMG_第5页背景}
          alt=""
          aria-hidden="true"
          className="video-bg pointer-events-none object-cover"
        />
      )}
      <div className="bg-veil veil-dark" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(178,90,85,0.4),transparent_60%)]" />

      <div className="section-container">
        <SectionHeader
          eyebrow="ACHIEVEMENTS"
          title="荣誉高光"
          subtitle="答辩材料里的硬货：国家级五项 · 五星级 × 连续优秀 · 最佳团日 · 红旗团支部"
          invert
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-white/20 md:left-[190px]" aria-hidden="true" />

          <AnimatePresence initial={false}>
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
              key="ellipsis"
              className="relative grid gap-4 pb-8 pl-12 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-white/30 md:left-[183px]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <time className="font-data text-lg font-bold text-white/70 md:text-right">更早</time>
              <article className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-6 text-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <MoreHorizontal className="h-6 w-6 text-rouge-mist" />
                  <p className="font-serif-cn text-lg italic">十五年沉淀，远不止这一页</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">{honorsNote}</p>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        {honors.length > 4 ? (
          <div className="mt-6 text-center">
            <button
              type="button"
              className="btn-ghost-white font-serif-cn font-bold"
              onClick={() => setExpanded((c) => !c)}
              aria-expanded={expanded}
            >
              {expanded ? "收起荣誉" : "展开本学年全部高光"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
