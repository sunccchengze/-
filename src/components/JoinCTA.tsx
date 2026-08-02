import { motion } from "framer-motion";
import { useState } from "react";
import { LINK_报名 as joinLink, QQ_招新群号, IMG_第8页背景 } from "../config";
import { joinCta, joinSteps } from "../content";

export function JoinCTA() {
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const copyGroupNumber = async () => {
    try {
      await navigator.clipboard.writeText(QQ_招新群号);
      setCopied(true);
      setCopyStatus("招新 QQ 群号已复制");
      window.setTimeout(() => {
        setCopied(false);
        setCopyStatus("");
      }, 1800);
    } catch {
      // 浏览器不允许剪贴板时，群号仍以可见文本方式呈现，用户可手动复制。
      setCopied(false);
      setCopyStatus("未能自动复制，可长按群号手动复制");
    }
  };

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
            className="flex h-[64px] min-w-[220px] items-center justify-between gap-3 rounded-xl border-2 border-white/90 bg-white/10 px-4 font-serif-cn text-white backdrop-blur-md"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="min-w-0 text-left">
              <span className="block text-xs font-medium text-white/70">招新 QQ 群</span>
              <span className="select-all font-data text-base font-bold tracking-wide">{QQ_招新群号}</span>
            </span>
            <button
              type="button"
              onClick={copyGroupNumber}
              className="focus-ring shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-bold text-rouge-deep transition hover:bg-cream"
              aria-label={`复制招新QQ群号 ${QQ_招新群号}`}
            >
              {copied ? "已复制" : "复制群号"}
            </button>
          </motion.div>
        </div>

        <p className="mt-4 min-h-5 text-sm text-white/80" aria-live="polite" role="status">
          {copyStatus}
        </p>
        <p className="mt-6 text-sm text-white/70">{joinCta.footnote}</p>
      </div>
    </section>
  );
}
