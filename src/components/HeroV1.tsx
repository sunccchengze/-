/**
 * 首页 V1：Charity:Water 风格 - 透明+具体影响数据
 * 核心数字突出，使命清晰，信任感强
 */
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Heart, MapPin } from "lucide-react";
import { LINK_报名 as joinLink, IMG_LOGO } from "../config";
import { brand, hero } from "../content";

export function HeroV1() {
  return (
    <section id="top" className="relative min-h-screen bg-gradient-to-b from-cream via-cream/95 to-shell">
      {/* 顶部导航条 */}
      <div className="border-b border-rouge/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <img src={IMG_LOGO} alt="" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-serif-cn text-lg font-bold text-ink">{brand.name}</span>
          </div>
          <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 text-sm">
            立即报名
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-16">
        {/* 主标题区 */}
        <div className="text-center">
          <motion.p
            className="mb-4 font-serif-cn text-sm tracking-[0.3em] text-rouge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {hero.badge}
          </motion.p>
          
          <motion.h1
            className="font-serif-cn text-5xl font-bold tracking-wide text-ink sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl font-serif-cn text-xl text-muted md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* 核心数据 - Charity:Water风格：具体数字 */}
        <motion.div
          className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: MapPin, value: "17", unit: "届", label: "玉树支教", desc: "2010年至今，每一届都是承诺" },
            { icon: Heart, value: "199", unit: "人", label: "在社成员", desc: "职能+项目，公益路上同行" },
            { icon: Droplets, value: "5", unit: "星", label: "校级评定", desc: "规范运营，持续优秀" },
          ].map((item) => (
            <div key={item.label} className="group rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-rouge/10 transition-all hover:shadow-lg hover:ring-rouge/20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-rouge/10 text-rouge transition-colors group-hover:bg-rouge group-hover:text-white">
                <item.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 font-data text-4xl font-bold text-ink">
                {item.value}<span className="text-2xl text-rouge">{item.unit}</span>
              </p>
              <p className="mt-1 font-serif-cn font-bold text-rouge">{item.label}</p>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* 使命宣言 */}
        <motion.div
          className="mx-auto mt-14 max-w-3xl rounded-2xl bg-gradient-to-r from-rouge/5 to-rouge/10 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-serif-cn text-lg leading-relaxed text-ink md:text-xl">
            从秦岭脚下的教室到雪域高原的课堂，从陕博展厅到病房床边——
            <br />
            <span className="font-bold text-rouge">我们搭建连接校园与社会的公益平台</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mx-auto mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a href={joinLink} target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-4 text-base">
            {hero.primaryCta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a href={hero.secondaryHref} className="font-serif-cn text-base text-muted hover:text-rouge">
            {hero.secondaryCta} →
          </a>
        </motion.div>

        <p className="mx-auto mt-6 max-w-lg text-center text-sm text-muted/70">
          {hero.seasonNote}
        </p>
      </div>
    </section>
  );
}
