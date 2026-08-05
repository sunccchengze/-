import { motion } from "framer-motion";
import { IMG_第4页背景, IMG_四大理由 as whyJoinImages } from "../config";
import { whyJoin } from "../content";
import { SectionHeader } from "./SectionHeader";

/** 四个理由：改为“影像封面 + 内容题签”布局，减少旧版左右图文割裂感。 */
export function WhyJoin() {
  return (
    <section id="why" className="bg-shell section-block">
      <img src={IMG_第4页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader eyebrow="WHY JOIN US" title="加入英仔的四个理由" subtitle="机会、成长、同伴与可靠的平台——按自己的节奏，找到适合你的参与方式" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {whyJoin.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="card-hover card-outline-gradient group overflow-hidden rounded-[24px]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
            >
              <div className="image-shell relative aspect-[16/8] overflow-hidden">
                <img src={whyJoinImages[index]} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute bottom-4 left-5 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/92 text-rouge shadow-lg shadow-black/15 backdrop-blur-sm">
                  <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>
              <div className="relative px-6 pb-7 pt-6 md:px-8 md:pb-8">
                <span className="absolute right-6 top-6 font-data text-3xl font-bold text-rouge/12 md:right-8">0{index + 1}</span>
                <h3 className="pr-12 font-serif-cn text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 max-w-xl text-base leading-[1.85] text-muted">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
