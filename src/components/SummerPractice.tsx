import { motion } from "framer-motion";
import { BookOpen, Clapperboard, ExternalLink, Image as ImageIcon, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { IMG_第11页背景, IMG_暑期_秦岭视频封面, VIDEO_SOURCES_秦岭 } from "../config";
import { summerCards, summerSection, type SummerCard } from "../content";
import { SectionHeader } from "./SectionHeader";
import { SummerVideoPlayer } from "./SummerVideoPlayer";

/**
 * 暑期活动图集：预加载成功的图片才加入轮播，未上传的命名槽位自动跳过。
 * 用户按 docs/SUMMER-GALLERY-SLOTS.md 上传后，无需修改组件即可加入轮播。
 */
function SummerImageCarousel({ images, alt, compact = false }: { images: readonly string[]; alt: string; compact?: boolean }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isNearby, setIsNearby] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const [current, setCurrent] = useState(0);

  // 页面会同时渲染七组图集；移动端绝不能在首屏一次请求最多 45 张。
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
          className="gpu-accelerated h-full w-full object-cover"
          style={{ transformOrigin: "center center" }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.00 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
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
  return (
    <motion.article
      className="card-hover card-outline-gradient gpu-accelerated group overflow-hidden rounded-[28px]"
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
          {card.id === "yushu" ? (
            <li className="list-none">
              <a
                href="https://mp.weixin.qq.com/s/eYOIQ0BZPa51ZUXrXIkfyQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group/portal flex h-full flex-col justify-between rounded-xl border border-rouge/30 bg-gradient-to-br from-rouge/[0.08] via-white/85 to-gold-soft/15 p-4 text-left shadow-sm transition-all hover:border-rouge hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rouge-deep px-2.5 py-0.5 font-data text-[10px] font-bold text-white">
                      <BookOpen className="h-3 w-3" />
                      LATEST REPORT · 2026.8.12
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rouge group-hover/portal:underline">
                      微信推文直达
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                  <h4 className="mt-2.5 font-serif-cn text-sm font-bold text-ink group-hover/portal:text-rouge-deep">
                    📰 深度纪实：《薪传西迁薪火，情暖雪域童心》
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    献礼交大130周年华诞：三位一体素质教学、高原防晒洗手操作与三江源科学实验现场报道。
                  </p>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-rouge/10 pt-2 text-[11px] text-rouge-mist">
                  <span>青海玉树 · 称多文乐寄宿学校</span>
                  <span className="font-bold text-rouge transition-transform group-hover/portal:translate-x-0.5">
                    点击前往阅读 →
                  </span>
                </div>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </motion.article>
  );
}

function QinlingFeatureCard({ card }: { card: SummerCard }) {
  return (
    <motion.article
      className="card-hover card-outline-gradient gpu-accelerated overflow-hidden rounded-[30px] bg-white/80"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72 }}
      aria-labelledby="qinling-feature-title"
    >
      {/* 秦岭采用“山野档案”横向抬头，不复用玉树 / 知行的左右 Hero 结构。 */}
      <header className="relative overflow-hidden border-b border-rouge/10 px-6 py-8 md:px-10 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(201,168,118,0.20),transparent_38%),linear-gradient(135deg,rgba(178,90,85,0.08),transparent_52%)]" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-rouge-deep ring-1 ring-rouge/10">{card.badge}</span>
              <span className="rounded-full bg-rouge-deep px-3 py-1.5 text-xs font-medium text-white">{card.dept}</span>
            </div>
            <div className="mt-6 flex items-start gap-2 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rouge" aria-hidden="true" />
              <span>{card.place}</span>
            </div>
            <h3 id="qinling-feature-title" className="mt-3 font-serif-cn text-3xl font-bold leading-tight text-ink md:text-[38px]">
              {card.title}
            </h3>
            <p className="mt-3 max-w-3xl font-serif-cn text-base italic leading-7 text-rouge md:text-lg">{card.poetic}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {card.stats.map((stat) => (
              <div key={stat.label} className="min-w-20 rounded-2xl bg-white/75 px-3 py-3 text-center shadow-sm ring-1 ring-rouge/10 backdrop-blur-sm md:min-w-24">
                <p className="font-data text-lg font-bold text-rouge-deep md:text-xl">{stat.value}</p>
                <p className="mt-1 text-[10px] text-muted md:text-[11px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 图片与视频并列构成同一卡片里的双媒体档案。 */}
      <div className="grid gap-px bg-rouge/10 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="bg-[#f8f2eb]/95 p-5 md:p-7" aria-labelledby="qinling-gallery-label">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p id="qinling-gallery-label" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-rouge">
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
              FIELD NOTES · 图片轮播
            </p>
            <span className="text-[11px] text-muted">子午峪 · 秦岭生态实践</span>
          </div>
          <div className="aspect-video overflow-hidden rounded-[20px] bg-[#e8ddd1] shadow-sm ring-1 ring-black/5">
            <SummerImageCarousel images={card.images} alt={`${card.title}活动图集`} />
          </div>
        </section>

        <section className="bg-[#2a1a17] p-5 text-white md:p-7" aria-labelledby="qinling-film-label">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p id="qinling-film-label" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#e6c48c]">
              <Clapperboard className="h-3.5 w-3.5" aria-hidden="true" />
              FIELD FILM · 实践影像
            </p>
            <span className="text-[11px] text-white/60">BILIBILI · BV1vCum6DE8Y</span>
          </div>
          <SummerVideoPlayer
            title="踏行子午峪｜以脚步护青山，用对话探生态"
            videoSources={VIDEO_SOURCES_秦岭}
            poster={IMG_暑期_秦岭视频封面}
            className="rounded-[20px] shadow-lg ring-1 ring-white/10"
          />
          <p className="mt-4 font-serif-cn text-lg font-bold">踏行子午峪｜以脚步护青山，用对话探生态</p>
          <p className="mt-1 text-xs leading-5 text-white/65">“青护秦岭，知行向绿”社会实践首日纪实</p>
        </section>
      </div>

      <div className="grid gap-7 px-6 py-8 md:px-10 md:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div>
          <p className="text-[15px] leading-[1.85] text-muted">{card.story}</p>
          <p className="mt-5 rounded-xl bg-gold-soft/[0.10] px-4 py-3 text-sm leading-6 text-ink">
            <span className="font-serif-cn font-bold text-gold">从这里开始 · </span>
            {card.newcomerEntry}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {card.beats.map((beat, index) => (
            <li key={beat} className="relative rounded-2xl border border-rouge/10 bg-white/60 px-4 pb-4 pt-9 text-sm leading-6 text-ink/80">
              <span className="absolute left-4 top-3 font-data text-[10px] font-bold tracking-[0.16em] text-rouge/70">TRACE {String(index + 1).padStart(2, "0")}</span>
              {beat}
            </li>
          ))}
        </ol>
      </div>
    </motion.article>
  );
}

function SummerSupportCard({ card, index }: { card: SummerCard; index: number }) {
  return (
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
  );
}

export function SummerPractice() {
  const cardById = new Map(summerCards.map((card) => [card.id, card]));
  const orderedCards = (ids: readonly string[]) => ids.flatMap((id) => {
    const card = cardById.get(id);
    return card ? [card] : [];
  });

  // 页面叙事顺序固定为：玉树 → 知行 → 秦岭 → 启明、萤火 → 银发、陕博。
  const heroes = orderedCards(["yushu", "qinchuan"]);
  const qinling = cardById.get("qinling");
  const supportRows = [
    orderedCards(["qiming-summer", "yinghuo-summer"]),
    orderedCards(["yinfarongcheng", "shanbo-summer"]),
  ];

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

        {qinling ? (
          <div className="mt-10">
            <QinlingFeatureCard card={qinling} />
          </div>
        ) : null}

        <div className="mt-10 space-y-6 md:space-y-8">
          {supportRows.map((row, rowIndex) => (
            <div key={row.map((card) => card.id).join("-")} className="grid gap-6 md:grid-cols-2 md:gap-8">
              {row.map((card, index) => (
                <SummerSupportCard key={card.id} card={card} index={rowIndex * 2 + index} />
              ))}
            </div>
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

