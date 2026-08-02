/**
 * 首页 V4：现代杂志风 - 简洁+强CTA
 * 大量留白，聚焦行动，像Apple/Medium一样克制
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LINK_报名 as joinLink, IMG_LOGO } from "../config";
import { brand, hero } from "../content";

export function HeroV4() {
  return (
    <section id="top" className="relative min-h-screen bg-shell">
      {/* 顶部极简导航 */}
      <nav className="absolute inset-x-0 top-0 z-20 px-8 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={IMG_LOGO} alt="" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-serif-cn font-bold text-white">{brand.name}</span>
          </div>
          <a href={joinLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/20 px-6 py-2.5 font-serif-cn text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-rouge">
            立即加入
          </a>
        </div>
      </nav>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-8 py-32 text-center">
        {/* 主标题 */}
        <motion.h1
          className="font-serif-cn text-6xl font-bold tracking-wide text-white sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {hero.title}
        </motion.h1>

        {/* 标语 */}
        <motion.p
          className="mt-8 max-w-2xl font-serif-cn text-xl tracking-wide text-white/80 md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* 标签行 - 极简 */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {hero.highlights.map((item, i) => (
            <span key={item} className="font-serif-cn text-sm text-white/60">
              {item}
              {i < hero.highlights.length - 1 && <span className="ml-6 text-white/30">·</span>}
            </span>
          ))}
        </motion.div>

        {/* 强CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <a href={joinLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-full bg-white px-10 py-5 font-serif-cn text-lg font-bold text-rouge shadow-xl shadow-black/20 transition-all hover:scale-105 hover:shadow-2xl">
            {hero.primaryCta}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href={hero.secondaryHref} className="font-serif-cn text-sm text-white/60 hover:text-white">
            {hero.secondaryCta}
          </a>
        </motion.div>

        {/* 时间提示 */}
        <motion.p
          className="absolute bottom-12 mx-auto max-w-md text-center text-sm text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {hero.seasonNote}
        </motion.p>
      </div>
    </section>
  );
}
