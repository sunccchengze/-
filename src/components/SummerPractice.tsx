import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { IMG_第11页背景 } from "../config";
import { summerCards, summerMore, summerSection, type SummerCard } from "../content";
import { SectionHeader } from "./SectionHeader";

function SummerHeroCard({ card, index }: { card: SummerCard; index: number }) {
  return (
    <motion.article
      className="card-hover card-outline-gradient group overflow-hidden rounded-[28px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.12, duration: 0.75 }}
    >
      <div
        className={`grid md:grid-cols-[0.95fr_1.05fr] ${
          index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="image-shell relative min-h-[260px] md:min-h-[480px]">
          <img src={card.image} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
            <span className="rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold tracking-wide text-rouge-deep backdrop-blur-md">
              {card.badge}
            </span>
            <span className="rounded-full bg-rouge-deep/90 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
              {card.dept}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
          <div className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rouge" />
            <span>{card.place}</span>
          </div>
          <h3 className="mt-3 font-serif-cn text-2xl font-bold leading-snug text-ink md:text-[30px]">{card.title}</h3>
          <p className="mt-3 font-serif-cn text-base italic leading-7 text-rouge md:text-lg">{card.poetic}</p>
          <p className="mt-4 text-[15px] leading-[1.85] text-muted">{card.story}</p>

          <ul className="mt-5 space-y-2.5 border-l-2 border-rouge/25 pl-4">
            {card.beats.map((beat) => (
              <li key={beat} className="text-sm leading-6 text-ink/80">
                {beat}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {card.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-rouge/5 px-2 py-3 text-center ring-1 ring-rouge/10">
                <p className="font-data text-xl font-bold text-rouge-deep md:text-2xl">{s.value}</p>
                <p className="mt-1 text-[11px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {card.tags.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SummerSupportCard({ card, index }: { card: SummerCard; index: number }) {
  return (
    <motion.article
      className="card-hover card-outline-gradient flex h-full flex-col overflow-hidden rounded-[24px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
    >
      <div className="image-shell h-48 shrink-0">
        <img src={card.image} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-1.5">
          <span className="rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-bold text-rouge-deep">{card.badge}</span>
          <span className="rounded-full bg-rouge-deep/90 px-2.5 py-0.5 text-[10px] text-white">{card.dept}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-start gap-1.5 text-xs text-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rouge" />
          <span>{card.place}</span>
        </div>
        <h3 className="mt-2 font-serif-cn text-xl font-bold text-ink">{card.title}</h3>
        <p className="mt-1 font-serif-cn text-sm italic text-rouge">{card.poetic}</p>
        <p className="mt-3 text-sm leading-7 text-muted">{card.story}</p>
        <ul className="mt-4 flex-1 space-y-2 border-t border-rouge/10 pt-4">
          {card.beats.map((beat) => (
            <li key={beat} className="flex gap-2 text-xs leading-5 text-ink/75">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rouge" aria-hidden="true" />
              <span>{beat}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4">
          {card.stats.map((s) => (
            <div key={s.label}>
              <p className="font-data text-lg font-bold text-rouge-deep">{s.value}</p>
              <p className="text-[11px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function SummerPractice() {
  const heroes = summerCards.filter((c) => c.tier === "hero");
  const supports = summerCards.filter((c) => c.tier === "support");

  return (
    <section id="summer" className="bg-shell section-block">
      <img src={IMG_第11页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader
          eyebrow={summerSection.eyebrow}
          title={summerSection.title}
          subtitle={summerSection.subtitle}
        />

        <div className="mt-16 space-y-10">
          {heroes.map((card, index) => (
            <SummerHeroCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {supports.map((card, index) => (
            <SummerSupportCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <motion.div
          className="glass-panel mt-12 rounded-3xl p-7 md:p-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-serif-cn text-sm font-bold tracking-[0.2em] text-rouge">MORE ROUTES · 同季出发</p>
            <p className="text-xs text-muted">2026.7 同季还有这些方向</p>
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {summerMore.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl bg-white/70 px-4 py-4 ring-1 ring-rouge/10 transition hover:ring-rouge/25"
              >
                <p className="font-serif-cn text-base font-bold text-ink">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
        </motion.div>
        <p className="mt-10 text-center text-sm text-muted">
          想成为下一张合影里的人？
          <a href="#join" className="ml-1 font-medium text-rouge underline-offset-4 hover:underline">
            去看看如何加入 →
          </a>
        </p>
      </div>
    </section>
  );
}

