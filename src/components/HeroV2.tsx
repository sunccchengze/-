/**
 * 首页 V2：Girls Who Code风格 - 使命驱动+视频/故事感
 * 冲击力强，情感连接，行动导向
 */
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { LINK_报名 as joinLink, IMG_首页轮播 as heroSlides } from "../config";
import { hero } from "../content";

export function HeroV2() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* 全屏背景图 - 第一张 */}
      <div className="absolute inset-0">
        <img
          src={heroSlides[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8 py-20">
        <div className="max-w-2xl">
          {/* 标签 */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rouge shadow-lg shadow-rouge/40">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="rounded-full bg-white/20 px-4 py-2 font-serif-cn text-sm text-white backdrop-blur-sm">
              {hero.badge}
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            className="font-serif-cn text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {hero.title}
          </motion.h1>

          {/* 使命 */}
          <motion.p
            className="mt-6 font-serif-cn text-xl leading-relaxed text-white/90 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero.subtitle}
          </motion.p>

          {/* 关键数字 - 水平排列 */}
          <motion.div
            className="mt-10 flex flex-wrap gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { v: "17", l: "届玉树支教" },
              { v: "199", l: "名在社成员" },
              { v: "8+", l: "常设项目" },
            ].map((item) => (
              <div key={item.l} className="text-white">
                <p className="font-data text-3xl font-bold">{item.v}</p>
                <p className="text-sm text-white/70">{item.l}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-white px-10 py-4 text-base">
              {hero.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href={hero.secondaryHref} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 transition-all hover:border-white">
                <Play className="ml-1 h-5 w-5" />
              </span>
              <span className="font-serif-cn">了解我们的故事</span>
            </a>
          </motion.div>

          {/* 底部时间 */}
          <motion.p
            className="absolute bottom-12 left-8 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {hero.seasonNote}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
