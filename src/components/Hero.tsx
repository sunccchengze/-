import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LINK_报名 as joinLink, IMG_LOGO, IMG_首页轮播 as heroSlides } from "../config";
import { brand, hero } from "../content";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="bg-shell relative flex min-h-screen items-center justify-center text-white">
      <AnimatePresence mode="sync">
        <motion.img
          key={currentSlide}
          src={heroSlides[currentSlide]}
          alt=""
          className="absolute inset-0 -z-[3] h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.92, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          fetchPriority={currentSlide === 0 ? "high" : "auto"}
          decoding="async"
        />
      </AnimatePresence>

      <div className="absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(33,20,18,0.15)_0%,rgba(33,20,18,0.2)_35%,rgba(51,28,24,0.55)_66%,rgba(30,18,16,0.82)_100%)]" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_50%_-10%,rgba(0,0,0,0.28),transparent_42%),radial-gradient(circle_at_-10%_50%,rgba(0,0,0,0.22),transparent_38%),radial-gradient(circle_at_110%_50%,rgba(0,0,0,0.22),transparent_38%)]" />

      <div
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="首屏背景图"
      >
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === currentSlide}
            aria-label={`切换到第 ${idx + 1} 张背景`}
            onClick={() => setCurrentSlide(idx)}
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 transition-all duration-500 ${
              idx === currentSlide ? "" : "opacity-80 hover:opacity-100"
            }`}
          >
            <span
              className={`block h-1 rounded-full bg-white transition-all duration-500 ${
                idx === currentSlide ? "w-10" : "w-4 bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 text-center">
        <motion.div
          className="mx-auto mb-10 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-2 ring-1 ring-white/30 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={IMG_LOGO}
            alt={`${brand.name} Logo`}
            className="h-full w-full rounded-full object-contain"
            fetchPriority="high"
          />
        </motion.div>

        <motion.p
          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-serif-cn text-xs tracking-[0.24em] text-white/90 backdrop-blur-[3px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden="true" />
          {hero.badge}
        </motion.p>

        <motion.h1
          className="hero-title mt-6 font-serif-cn text-[2.75rem] leading-[1.08] tracking-[0.1em] sm:mt-8 sm:text-[3.5rem] md:text-[104px] md:tracking-[0.12em]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.75 }}
        >
          {hero.title}
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-2xl font-serif-cn text-base text-white/80 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          {brand.tagline}
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-3xl font-serif-cn text-base font-medium leading-8 tracking-[0.18em] text-white/88 md:text-[21px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.75 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-4 md:flex-row md:gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.75 }}
        >
          {hero.highlights.map((item) => (
            <div key={item} className="glass-highlight font-serif-cn font-semibold">
              <span className="h-2 w-2 rotate-45 bg-rose" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
        >
          <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-white px-12 py-4 text-lg">
            {hero.primaryCta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href={hero.secondaryHref} className="btn-ghost-white px-10 py-4 text-lg">
            {hero.secondaryCta}
          </a>
        </motion.div>
        {hero.seasonNote ? (
          <motion.p
            className="mx-auto mt-6 max-w-md text-center text-xs leading-5 tracking-wide text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {hero.seasonNote}
          </motion.p>
        ) : null}
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-white/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-label="向下滚动到关于我们"
      >
        <span aria-hidden="true">SCROLL</span>
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
