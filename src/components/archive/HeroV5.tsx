/**
 * 首页 V5：Obama Foundation风格 - 分屏+叙事沉浸
 * 固定面板+滚动内容，沉浸式体验
 */
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { LINK_报名 as joinLink, IMG_LOGO, IMG_首页轮播 as heroSlides } from "../../config";
import { brand, hero } from "../../content";

export function HeroV5() {
  return (
    <section id="top" className="relative min-h-screen">
      {/* 全屏背景 */}
      <div className="fixed inset-0 -z-10">
        <img
          src={heroSlides[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* 固定内容面板 */}
      <div className="relative z-10 flex min-h-screen">
        {/* 左侧固定区 */}
        <div className="hidden w-1/2 lg:flex lg:flex-col lg:justify-center lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <img src={IMG_LOGO} alt="" className="h-14 w-14 rounded-2xl object-contain" />
              <span className="font-serif-cn text-2xl font-bold text-white">{brand.name}</span>
            </div>

            <h1 className="font-serif-cn text-5xl font-bold leading-tight text-white xl:text-6xl">
              {hero.title}
            </h1>

            <p className="mt-6 font-serif-cn text-lg leading-relaxed text-white/80">
              {hero.subtitle}
            </p>

            {/* 核心数据 */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { v: "17", l: "届" },
                { v: "199", l: "人" },
                { v: "5星", l: "评定" },
              ].map((item) => (
                <div key={item.l} className="border-l-2 border-rouge pl-4">
                  <p className="font-data text-3xl font-bold text-white">{item.v}</p>
                  <p className="text-sm text-white/60">{item.l}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-white px-8 py-4">
                {hero.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <span className="text-sm text-white/70">{hero.seasonNote}</span>
            </div>
          </motion.div>
        </div>

        {/* 右侧滚动提示 */}
        <div className="flex w-full flex-col items-center justify-end pb-20 lg:hidden">
          <motion.div
            className="mb-8 rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-serif-cn text-3xl font-bold text-white">{hero.title}</p>
            <p className="mt-2 font-serif-cn text-white/80">{hero.subtitle}</p>
            <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-white mt-6 inline-block px-8 py-3">
              {hero.primaryCta}
            </a>
          </motion.div>

          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-white/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <span className="text-xs tracking-[0.3em]">SCROLL</span>
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
