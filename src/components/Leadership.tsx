import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { leadership } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Leadership() {
  const { presidentMessage, advisor, advisorNote, core, coreTitle } = leadership;

  return (
    <section id="team" className="bg-shell section-block">
      <div className="bg-veil veil-cream" aria-hidden="true" />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow={leadership.eyebrow}
          title={leadership.title}
          subtitle={leadership.subtitle}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* 社长寄语 */}
          <motion.article
            className="card-hover card-outline-gradient relative overflow-hidden rounded-[28px] p-8 md:p-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <div className="absolute right-6 top-6 text-rouge/15" aria-hidden="true">
              <Quote className="h-16 w-16" strokeWidth={1.2} />
            </div>
            <p className="text-xs font-bold tracking-[0.22em] text-rouge">PRESIDENT · 社长寄语</p>
            <blockquote className="relative mt-7 max-w-3xl font-serif-cn text-xl leading-[2] text-ink md:text-2xl">
              “{presidentMessage.quote}”
            </blockquote>
            <footer className="mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-rouge/10 pt-6">
              <div>
                <p className="font-serif-cn text-xl font-bold text-rouge-deep">{presidentMessage.name}</p>
                <p className="mt-1 text-sm text-muted">{presidentMessage.title} · 英仔爱心社</p>
              </div>
              {presidentMessage.note ? (
                <p className="text-xs text-muted/80">{presidentMessage.note}</p>
              ) : null}
            </footer>
          </motion.article>

          {/* 指导老师 + 社长团 */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="card-hover glass-panel rounded-[24px] p-6 md:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-gradient text-white shadow-md shadow-rouge/25">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.18em] text-rouge">GUIDANCE</p>
                  <p className="font-serif-cn text-lg font-bold text-ink">{advisor.unit}指导</p>
                </div>
              </div>
              <p className="mt-5 font-serif-cn text-2xl font-bold text-rouge-deep">{advisor.name}</p>
              <p className="mt-1 text-sm text-muted">{advisor.title}</p>
              {advisorNote ? <p className="mt-3 text-xs leading-5 text-muted/80">{advisorNote}</p> : null}
            </motion.div>

            <motion.div
              className="card-hover glass-panel flex-1 rounded-[24px] p-6 md:p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.55 }}
            >
              <p className="text-xs font-bold tracking-[0.2em] text-rouge">
                {coreTitle ?? "社长团成员"}
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {core.map((person) => (
                  <li
                    key={`${person.name}-${person.role}`}
                    className="flex items-baseline justify-between gap-2 rounded-xl bg-white/70 px-3 py-2.5 ring-1 ring-rouge/10"
                  >
                    <span className="min-w-0 flex-1 text-xs leading-4 text-muted">{person.role}</span>
                    <span className="shrink-0 font-serif-cn text-sm font-bold text-ink">{person.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
