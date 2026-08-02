import { motion } from "framer-motion";
import { IMG_第4页背景, IMG_四大理由 as whyJoinImages } from "../config";
import { whyJoin } from "../content";
import { SectionHeader } from "./SectionHeader";

export function WhyJoin() {
  return (
    <section id="why" className="bg-shell section-block">
      <img src={IMG_第4页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader eyebrow="WHY JOIN US" title="加入英仔的四个理由" subtitle="平台、时光、成长与同伴——选一个最打动你的，就够作为开始" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-10">
          {whyJoin.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              className="card-hover card-outline-gradient overflow-hidden rounded-[24px] p-6 md:p-8"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <div className="image-shell aspect-square w-full shrink-0 overflow-hidden rounded-2xl sm:w-[160px] md:w-[180px]">
                  <img
                    src={whyJoinImages[index]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-gradient text-white shadow-lg shadow-rouge/30">
                    <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif-cn text-2xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-base leading-[1.8] text-muted">{description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}












