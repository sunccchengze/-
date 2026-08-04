import { motion } from "framer-motion";
import { Image as ImageIcon, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { IMG_第11页背景 } from "../config";
import { summerCards, summerMore, summerSection, type SummerCard } from "../content";
import { SectionHeader } from "./SectionHeader";

/**
 * 暑期活动图集：预加载成功的图片才加入轮播，未上传的命名槽位自动跳过。
 * 用户按 docs/SUMMER-GALLERY-SLOTS.md 上传后，无需修改组件即可加入轮播。
 */
function SummerImageCarousel({ images, alt, compact = false }: { images: readonly string[]; alt: string; compact?: boolean }) {
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let active = true;
    images.forEach((src, index) => {
      const image = new Image();
      image.onload = () => {
        if (!active) return;
        setLoaded((previous) => new Set(previous).add(index));
      };
      image.src = src;
    });
    return () => {
      active = false;
    };
  }, [images]);

  const available = useMemo(() => [...loaded].filter((index) => images[index]).sort((a, b) => a - b), [images, loaded]);

  useEffect(() => {
    if (!available.includes(current)) setCurrent(available[0] ?? 0);
  }, [available, current]);

  useEffect(() => {
    if (available.length < 2) return;
    const timer = window.setInterval(() => {
      setCurrent((previous) => {
        const position = available.indexOf(previous);
        return available[(position + 1) % available.length] ?? available[0];
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [available]);

  return (
    <div className="image-shell relative h-full w-full">
      <motion.img
        key={current}
        src={images[current] ?? images[0]}
        alt={alt}
        className="h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55 }}
        loading="lazy"
      />
      {available.length > 1 ? (
        <div className={`absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-1.5 backdrop-blur-sm ${compact ? "scale-90" : ""}`} aria-label="活动图片轮播">
          <ImageIcon className="h-3 w-3 text-white/80" aria-hidden="true" />
          {available.map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`查看第 ${available.indexOf(index) + 1} 张活动图片`}
              aria-current={current === index}
              className="focus-ring flex h-5 w-4 items-center justify-center rounded-full"
            >
              <span className={`h-1.5 rounded-full transition-all ${current === index ? "w-3 bg-white" : "w-1.5 bg-white/55"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
        <div className="relative aspect-square min-h-[260px] self-start overflow-hidden md:min-h-0">
          <SummerImageCarousel images={card.images} alt={card.title} />
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
          <p className="mt-5 rounded-xl bg-gold-soft/[0.10] px-4 py-3 text-sm leading-6 text-ink">
            <span className="font-serif-cn font-bold text-gold">参与说明 · </span>
            {card.newcomerEntry}
          </p>

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

function SummerRouteImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#efe5d8,#dcc5a0)] text-xs font-bold tracking-[0.16em] text-rouge-deep/65">同季专属影像</div>;
  }
  return <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" onError={() => setFailed(true)} />;
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
      <div className="relative aspect-[2.35/1] shrink-0 overflow-hidden">
        <SummerImageCarousel images={card.images} alt={card.title} compact />
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
        <p className="mt-4 rounded-xl bg-gold-soft/[0.10] px-3 py-2 text-xs leading-5 text-ink/85">
          <span className="font-bold text-gold">从这里开始 · </span>{card.newcomerEntry}
        </p>
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
                className="card-hover group overflow-hidden rounded-2xl bg-white/70 ring-1 ring-rouge/10"
              >
                <div className="image-shell aspect-[2.35/1] overflow-hidden">
                  <SummerRouteImage src={item.image} alt={`${item.name}活动影像`} />
                </div>
                <div className="px-4 pb-4 pt-3">
                  <p className="font-serif-cn text-base font-bold text-ink">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
                </div>
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

