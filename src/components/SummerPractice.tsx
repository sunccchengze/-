import { motion } from "framer-motion";
import { Image as ImageIcon, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IMG_第11页背景 } from "../config";
import { summerCards, summerSection, type SummerCard } from "../content";
import { SectionHeader } from "./SectionHeader";

/**
 * 暑期活动图集：预加载成功的图片才加入轮播，未上传的命名槽位自动跳过。
 * 用户按 docs/SUMMER-GALLERY-SLOTS.md 上传后，无需修改组件即可加入轮播。
 */
function SummerImageCarousel({ images, alt, compact = false }: { images: readonly string[]; alt: string; compact?: boolean }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const [current, setCurrent] = useState(0);

  // 页面会同时渲染五组图集；移动端绝不能在首屏一次请求全部 35 张。
  // 提前一屏开始加载，保证滚到卡片时已有当前图和下一张可切换。
  useEffect(() => {
    const target = shellRef.current;
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      setIsNearby(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsNearby(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // 仅请求当前图与下一张；切换后再继续向前预取一张。
  useEffect(() => {
    if (!isNearby || images.length === 0) return;
    const indices = [current, (current + 1) % images.length].filter((index, position, values) => values.indexOf(index) === position);
    let active = true;
    indices.forEach((index) => {
      const src = images[index];
      if (!src) return;
      const image = new Image();
      image.onload = () => {
        if (active) setLoaded((previous) => new Set(previous).add(index));
      };
      image.src = src;
    });
    return () => { active = false; };
  }, [current, images, isNearby]);

  const available = useMemo(() => [...loaded].filter((index) => images[index]).sort((a, b) => a - b), [images, loaded]);

  useEffect(() => {
    if (isNearby && available.length > 0 && !available.includes(current)) setCurrent(available[0]);
  }, [available, current, isNearby]);

  useEffect(() => {
    if (!isNearby || available.length < 2) return;
    const timer = window.setInterval(() => {
      setCurrent((previous) => {
        const position = available.indexOf(previous);
        return available[(position + 1) % available.length] ?? available[0];
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [available, isNearby]);

  const src = images[current] ?? images[0];

  return (
    <div ref={shellRef} className="image-shell relative h-full w-full">
      {isNearby ? (
        <motion.img
          key={current}
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          loading="eager"
          decoding="async"
        />
      ) : null}
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
  const isGlowCard = true; // 莫兰迪暖背光扩散雾 (Guillermo Rauch Ambient Backlight Glow)
  return (
    <div className="group relative isolate">
      {isGlowCard ? (
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-r from-[#8E3F3D]/42 via-[#C97D74]/32 to-[#C9A876]/42 blur-[28px] opacity-85 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
      <motion.article
        className="card-hover card-outline-gradient gpu-accelerated overflow-hidden rounded-[28px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ delay: index * 0.12, duration: 0.75 }}
      >
      <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e8ddd1]">
          <SummerImageCarousel images={card.images} alt={card.title} />
          <div className="absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
            <span className="rounded-full bg-white/92 px-3 py-1.5 text-xs font-bold tracking-wide text-rouge-deep backdrop-blur-md">{card.badge}</span>
            <span className="rounded-full bg-rouge-deep/90 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">{card.dept}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-9 lg:p-10">
          <div className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rouge" />
            <span>{card.place}</span>
          </div>
          <h3 className="mt-3 font-serif-cn text-2xl font-bold leading-snug text-ink md:text-[30px]">{card.title}</h3>
          <p className="mt-3 font-serif-cn text-base italic leading-7 text-rouge md:text-lg">{card.poetic}</p>
          <p className="mt-5 rounded-xl bg-gold-soft/[0.10] px-4 py-3 text-sm leading-6 text-ink">
            <span className="font-serif-cn font-bold text-gold">参与说明 · </span>{card.newcomerEntry}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {card.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-rouge/5 px-2 py-3 text-center ring-1 ring-rouge/10">
                <p className="font-data text-xl font-bold text-rouge-deep md:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[11px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {card.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>
        </div>
      </div>

      <div className="border-t border-rouge/10 px-7 py-7 md:px-10 md:py-8 lg:px-12">
        <p className="text-[15px] leading-[1.85] text-muted">{card.story}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {card.beats.map((beat) => (
            <li key={beat} className="flex items-start gap-3 rounded-xl border border-rouge/10 bg-white/55 px-4 py-3 text-sm leading-6 text-ink/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rouge" aria-hidden="true" />
              <span>{beat}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
    </div>
  );
}

function SummerSupportCard({ card, index }: { card: SummerCard; index: number }) {
  const isGlowCard = card.title.includes("知行") || card.id.includes("qinchuan"); // 莫兰迪暖背光扩散雾 (Ambient Backlight Glow)
  return (
    <div className="group relative isolate h-full">
      {isGlowCard ? (
        <div
          className="pointer-events-none absolute -inset-2.5 -z-10 rounded-[28px] bg-gradient-to-r from-[#8E3F3D]/38 via-[#C97D74]/28 to-[#C9A876]/38 blur-[24px] opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : null}
      <motion.article
        className="card-hover card-outline-gradient gpu-accelerated flex h-full flex-col overflow-hidden rounded-[24px]"
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
    </div>
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          {supports.map((card, index) => (
            <SummerSupportCard key={card.id} card={card} index={index} />
          ))}
        </div>

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

