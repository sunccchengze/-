/**
 * 首页 V3：WaterAid风格 - 视频+故事叙述
 * 分屏布局，叙事感强，情感连接
 */
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LINK_报名 as joinLink, IMG_首页轮播 as heroSlides } from "../config";
import { hero } from "../content";

export function HeroV3() {
  return (
    <section id="top" className="relative min-h-screen bg-shell">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* 左侧 - 文字 */}
        <div className="flex flex-col justify-center bg-cream px-12 py-20 lg:px-16">
          {/* 品牌标识已由全局导航承担；这里直接进入招新信息，避免首屏重复出现 Logo。 */}
          <motion.p
            className="font-serif-cn text-sm tracking-[0.3em] text-rouge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {hero.badge}
          </motion.p>

          <motion.h1
            className="mt-4 font-serif-cn text-5xl font-bold leading-tight text-ink sm:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="mt-6 font-serif-cn text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {hero.subtitle}
          </motion.p>

          {/* 品牌标签 */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {hero.highlights.map((item) => (
              <span key={item} className="flex items-center gap-2 rounded-lg bg-rouge/10 px-4 py-2 font-serif-cn text-sm text-rouge">
                <span className="h-1.5 w-1.5 rounded-full bg-rouge" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4">
              {hero.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href={hero.secondaryHref} className="flex items-center gap-2 font-serif-cn text-muted hover:text-rouge">
              {hero.secondaryCta}
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-muted">{hero.seasonNote}</p>
        </div>

        {/* 右侧 - 图片 */}
        <motion.div
          className="relative min-h-[50vh] lg:min-h-screen"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src={heroSlides[0]}
            alt="英仔爱心社志愿服务活动现场"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
          
          {/* 浮动卡片 */}
          <div className="absolute bottom-10 left-10 right-10 rounded-2xl bg-white/95 p-6 backdrop-blur-sm shadow-xl">
            <p className="font-serif-cn text-sm font-bold text-rouge">2026 暑期实践</p>
            <p className="mt-2 font-serif-cn text-lg font-bold text-ink">玉树第十七届 · 知行秦川双线</p>
            <p className="mt-1 text-sm text-muted">支教 · 敬老 · 文博 · 环保 · 病房陪伴</p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
