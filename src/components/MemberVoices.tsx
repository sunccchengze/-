import { motion } from "framer-motion";
import { HeartHandshake, Quote } from "lucide-react";
import { memberVoices } from "../content";
import { SectionHeader } from "./SectionHeader";

export function MemberVoices() {
  return (
    <section id="voices" className="bg-shell section-block" aria-labelledby="voices-title">
      <div className="bg-veil veil-paper opacity-80" aria-hidden="true" />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="VOICES · INSIDE"
          title="在英仔的日子"
          subtitle="不是海报口号，是支教讲台、护理院与机位后的人，愿意再讲一遍的片段"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {memberVoices.map((v, index) => (
            <motion.blockquote
              key={v.role}
              className="card-hover card-outline-gradient relative flex h-full flex-col rounded-[24px] p-7 md:p-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <Quote className="h-8 w-8 text-rouge/35" aria-hidden="true" />
              <p className="mt-4 flex-1 font-serif-cn text-base leading-[1.85] text-ink md:text-lg">
                “{v.quote}”
              </p>
              <footer className="mt-6 flex items-center gap-2 border-t border-rouge/10 pt-4 text-sm text-muted">
                <HeartHandshake className="h-4 w-4 text-rouge" aria-hidden="true" />
                <cite className="not-italic">{v.role}</cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
