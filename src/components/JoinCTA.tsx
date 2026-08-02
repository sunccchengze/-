import { motion } from "framer-motion";
import { useState } from "react";
import { LINK_报名 as joinLink, QQ_招新群号, IMG_第8页背景 } from "../config";
import { joinCta, joinSteps } from "../content";

export function JoinCTA() {
  const [isGroupFlipped, setIsGroupFlipped] = useState(false);

  return (
    <section id="join" className="bg-shell relative py-24 text-white md:py-36">
      <img src={IMG_第8页背景} alt="" aria-hidden="true" className="bg-image slow-zoom" loading="lazy" decoding="async" />
      <div className="bg-veil veil-rouge" />
      <div className="cta-pattern" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div className="mb-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3 sm:gap-5">
          {joinSteps.map((s, index) => (
            <motion.div
              key={s.step}
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-5 text-left backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <p className="font-data text-sm font-bold tracking-widest text-rouge-mist">{s.step}</p>
              <p className="mt-2 font-serif-cn text-lg font-bold text-white">{s.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          className="font-serif-cn text-3xl font-bold leading-tight text-shadow-soft md:text-[48px]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          {joinCta.title}
        </motion.h2>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {joinCta.subtitle}
        </motion.p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <motion.a
            href={joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white h-[64px] px-12 py-5 text-lg"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {joinCta.primary}
          </motion.a>

          <motion.div
            className="perspective-1000 relative h-[64px] w-[220px] cursor-pointer font-serif-cn text-lg font-bold"
            onClick={() => setIsGroupFlipped(!isGroupFlipped)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsGroupFlipped((v) => !v);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="点击翻转查看QQ招新群号"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="preserve-3d relative h-full w-full"
              animate={{ rotateY: isGroupFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl border-2 border-white/90 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-rouge-deep">
                {joinCta.secondary}
              </div>
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center rounded-xl bg-paper px-3 text-center text-rouge-deep shadow-lg">
                <span className="mr-1.5 font-sans text-xs font-medium text-muted">群号:</span>
                <span className="select-all font-data font-bold tracking-wide">{QQ_招新群号}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <p className="mt-10 text-sm text-white/70">{joinCta.footnote}</p>
      </div>
    </section>
  );
}
