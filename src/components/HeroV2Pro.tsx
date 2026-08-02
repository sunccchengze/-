import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight, Images, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO_V2PRO_SLIDES, IMG_LOGO, LINK_报名 as joinLink } from "../config";
import { brand, hero } from "../content";

/**
 * V2 Pro：正式招新首页候选。
 * 保留 V2 的左侧叙事 / 右侧影像构图，融入原版的轮播、Logo、时间与滚动引导。
 */

export function HeroV2Pro() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShowIntro(false), reduce ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % HERO_V2PRO_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = HERO_V2PRO_SLIDES[currentSlide] ?? HERO_V2PRO_SLIDES[0];

  return (
    <section id="top" className="hero-v2pro relative isolate min-h-[100svh] overflow-hidden bg-[#241615] text-white">
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#241615] px-6 text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            aria-label="英仔爱心社开屏"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <img src={IMG_LOGO} alt="英仔爱心社 Logo" className="mx-auto h-20 w-20 rounded-3xl bg-white/95 p-1.5 shadow-2xl shadow-black/30" />
              <p className="mt-6 font-serif-cn text-3xl font-bold tracking-[0.16em] text-white sm:text-4xl">英仔爱心社</p>
              <p className="mt-3 font-serif-cn text-sm tracking-[0.22em] text-rose-soft">「英」为爱，「仔」一起</p>
              <motion.div
                className="mx-auto mt-8 h-px w-36 origin-left bg-gradient-to-r from-rose-soft via-white to-gold-soft"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.28, duration: 0.75, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="sync">
        <motion.img
          key={currentSlide}
          src={activeSlide.src}
          alt={`${activeSlide.title}｜英仔爱心社志愿服务活动现场`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease: "easeInOut" }}
          fetchPriority={currentSlide === 0 ? "high" : "auto"}
          decoding="async"
        />
      </AnimatePresence>
      <div className="hero-v2pro-veil absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)]">
        <div className="flex min-h-[100svh] flex-col justify-center px-6 pb-28 pt-28 sm:px-10 lg:px-16 lg:pb-24 lg:pt-28 xl:px-24">
          <motion.div
            className="mb-9 flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <img
              src={IMG_LOGO}
              alt="英仔爱心社 Logo"
              className="h-12 w-12 rounded-2xl bg-white/90 object-contain p-1 shadow-lg shadow-black/20 ring-1 ring-white/45"
              fetchPriority="high"
            />
            <div>
              <p className="font-serif-cn text-base font-bold tracking-wide text-white">{brand.name}</p>
              <p className="mt-0.5 text-[11px] tracking-[0.18em] text-white/65">XJTU · PUBLIC SERVICE</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            aria-label="校级五星级社团"
          >
            <span className="flex items-center gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <motion.span
                  key={star}
                  animate={{ opacity: [0.58, 1, 0.58], scale: [0.9, 1.16, 0.9], rotate: [-3, 3, -3] }}
                  transition={{ duration: 3.2, delay: star * 0.16, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex text-gold-soft drop-shadow-[0_0_12px_rgba(201,168,118,0.7)]"
                >
                  <Star className="h-6 w-6 fill-current sm:h-7 sm:w-7" strokeWidth={1.35} />
                </motion.span>
              ))}
            </span>
            <span className="font-serif-cn text-sm font-bold tracking-[0.16em] text-white/85 sm:text-base">校级五星级社团</span>
          </motion.div>

          <motion.h1
            className="mt-8 font-serif-cn text-[3.1rem] font-bold leading-[1.08] tracking-[0.08em] text-white sm:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.65 }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="mt-5 font-serif-cn text-lg tracking-[0.08em] text-rose-soft sm:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.58 }}
          >
            {brand.tagline}
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl font-serif-cn text-base leading-8 text-white/88 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.58 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/25 py-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
          >
            {[
              { value: "16", label: "岁公益社团" },
              { value: "199", label: "2025—2026年度社员" },
              { value: "11", label: "个部门" },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`px-3 first:pl-0 ${index < 2 ? "border-r border-white/20" : ""}`}
              >
                <p className="font-data text-3xl font-bold leading-none text-white sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-xs leading-5 text-white/70">{item.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.58 }}
          >
            <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-white px-8 py-4 text-base">
              {hero.primaryCta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href={hero.secondaryHref} className="group inline-flex items-center gap-2 font-serif-cn text-base font-bold text-white/85 hover:text-white">
              了解今年的故事
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p
            className="mt-8 max-w-xl font-serif-cn text-sm leading-6 text-white/82"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56, duration: 0.5 }}
          >
            先认真了解，填报志愿；面试通过后，从干事开始。
          </motion.p>
          <motion.p
            className="mt-2 max-w-xl text-xs leading-5 text-white/58"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.5 }}
          >
            {hero.seasonNote}
          </motion.p>
        </div>

        <div className="relative hidden min-h-[100svh] lg:block" aria-hidden="true">
          <div className="absolute bottom-16 right-10 flex w-[min(500px,calc(100%-5rem))] items-end justify-between gap-7 px-2 py-3 xl:right-16">
            <div className="min-w-0 bg-gradient-to-r from-black/0 via-black/18 to-black/0 px-4 py-2 backdrop-blur-[2px]">
              <p className="font-serif-cn text-2xl font-bold tracking-[0.08em] text-white text-shadow-soft">{activeSlide.line}</p>
              <p className="mt-2 text-xs tracking-[0.08em] text-white/70">{activeSlide.detail}</p>
            </div>
            <div className="mb-1 flex shrink-0 items-center gap-2 text-[11px] tracking-[0.16em] text-white/60">
              <Images className="h-4 w-4" />
              影像
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3 sm:bottom-8 sm:right-8 lg:right-12">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="首页活动影像">
          {HERO_V2PRO_SLIDES.map((slide, index) => (
            <button
              key={`${slide.src}-${index}`}
              type="button"
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`切换到${slide.title}图片`}
              onClick={() => setCurrentSlide(index)}
              className="focus-ring flex h-10 w-8 items-center justify-center rounded-full"
            >
              <span className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"}`} />
            </button>
          ))}
        </div>
        <a
          href="#about"
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/15 px-3 py-2 text-[10px] tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          SCROLL <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
