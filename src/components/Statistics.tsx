import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { IMG_第3页背景 } from "../config";
import { stats, statsFooter, statsSecondary } from "../content";
import { SectionHeader } from "./SectionHeader";

function StatisticNumber({ value }: { value: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });
  return (
    <span
      ref={ref}
      className="gradient-text font-data text-6xl leading-none md:text-[96px]"
      style={{ fontWeight: 900 }}
    >
      {inView ? (
        <CountUp end={value} duration={1.8} easingFn={(t, b, c, d) => c * (1 - Math.pow(2, (-10 * t) / d)) + b} />
      ) : (
        0
      )}
    </span>
  );
}

export function Statistics() {
  return (
    <section id="impact" className="bg-shell relative py-24 md:py-[120px]">
      <img src={IMG_第3页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-paper" />
      <div className="geo-pattern" aria-hidden="true" />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="IMPACT · THIS YEAR"
          title="用数字感受这一年"
          subtitle="五星级底色、国家级荣誉，以及一次次被累计的陪伴与服务时长"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-3xl p-8 text-center md:p-10"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
            >
              <div className="flex items-end justify-center gap-1">
                <StatisticNumber value={stat.value} />
                {stat.suffix ? (
                  <span className="mb-2 font-serif-cn text-2xl font-bold text-rouge md:mb-3 md:text-3xl">
                    {stat.suffix}
                  </span>
                ) : null}
              </div>
              <p className="mt-5 font-serif-cn text-xl font-bold tracking-[0.12em] text-rouge-deep">{stat.label}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{stat.hint}</p>
              <div className="mx-auto mt-5 h-[2px] w-16 bg-gradient-to-r from-transparent via-rouge to-transparent" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsSecondary.map((item, index) => (
            <motion.div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-rouge/15 bg-gradient-to-br from-white/90 via-white/75 to-rouge/[0.07] px-5 py-5 backdrop-blur-md"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * index, duration: 0.5 }}
            >
              <p className="font-data text-3xl font-bold tracking-tight text-rouge-deep md:text-4xl">{item.value}</p>
              <p className="mt-2 font-serif-cn text-sm font-bold text-ink">{item.label}</p>
              <p className="mt-1.5 text-xs leading-5 text-muted">{item.hint}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-10 text-center font-serif-cn text-base text-rouge md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {statsFooter}
        </motion.p>
        <p className="mt-4 text-center text-sm text-muted">
          <a href="#honors" className="font-medium text-rouge underline-offset-4 hover:underline">
            查看本学年荣誉高光 →
          </a>
        </p>
      </div>
    </section>
  );
}
