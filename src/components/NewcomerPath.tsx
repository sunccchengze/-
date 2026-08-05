import { motion } from "framer-motion";
import { Compass, HandHeart, Route, UsersRound } from "lucide-react";
import { IMG_第2页背景 } from "../config";
import { newcomerPath } from "../content";
import { SectionHeader } from "./SectionHeader";

const icons = [Compass, HandHeart, UsersRound, Route];

/** 将“加入很复杂”的焦虑，变成可预期的新生第一站。 */
export function NewcomerPath() {
  return (
    <section id="first-step" className="bg-shell section-block">
      <img src={IMG_第2页背景} alt="" aria-hidden="true" className="bg-image opacity-[0.32]" loading="lazy" decoding="async" />
      <div className="bg-veil veil-paper opacity-95" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_18%_28%,rgba(201,168,118,0.15),transparent_36%),radial-gradient(circle_at_82%_78%,rgba(178,90,85,0.12),transparent_40%)]" />
      <div className="section-container relative z-10">
        <SectionHeader eyebrow={newcomerPath.eyebrow} title={newcomerPath.title} subtitle={newcomerPath.subtitle} />

        <motion.p
          className="mx-auto mt-9 max-w-3xl rounded-2xl border border-gold-soft/25 bg-white/65 px-6 py-4 text-center font-serif-cn text-base leading-7 text-ink shadow-sm backdrop-blur-sm md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {newcomerPath.promise}
        </motion.p>

        <div className="relative mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-4 md:gap-0">
          <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-gradient-to-r from-transparent via-gold-soft/60 to-transparent md:block" aria-hidden="true" />
          {newcomerPath.steps.map((step, index) => {
            const Icon = icons[index] ?? Compass;
            return (
              <motion.article
                key={step.number}
                className="relative rounded-2xl bg-white/75 px-5 py-6 text-center ring-1 ring-rouge/10 backdrop-blur-sm md:bg-transparent md:ring-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
              >
                <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-gold-soft/45 bg-cream text-rouge-deep shadow-lg shadow-rouge/10">
                  <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <p className="mt-5 font-data text-xs font-bold tracking-[0.18em] text-gold">{step.number}</p>
                <h3 className="mt-2 font-serif-cn text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
