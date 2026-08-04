import { motion } from "framer-motion";
import type { ReactNode } from "react";
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

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {galleryImages.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="image-shell aspect-video overflow-hidden rounded-xl ring-1 ring-white/40 duration-500 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(201,168,118,0.45)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: (index % 8) * 0.04, duration: 0.55 }}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          剪影来自支教、敬老、陕历博与校园公益现场——真实发生过的温暖
        </p>
      </div>
    </section>
  );
}
