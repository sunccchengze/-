import { motion } from "framer-motion";
import { IMG_第7页背景 } from "../config";
import { platforms } from "../content";
import { BrandIcons } from "./BrandIcons";
import { SectionHeader } from "./SectionHeader";

export function SocialMedia() {
  return (
    <section id="social" className="bg-shell section-block">
      <img src={IMG_第7页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-paper" />
      <div className="section-container">
        <SectionHeader
          eyebrow="FOLLOW US"
          title="关注我们，先认识英仔"
          subtitle="公众号是大本营，B 站存长故事，抖音是正在长大的新镜头——社员声音见上方「在英仔的日子」"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {platforms.map((platform, index) => {
            const Icon = BrandIcons[platform.type];
            return (
              <motion.article
                key={platform.detail}
                className="card-hover card-outline-gradient rounded-[24px] p-9 text-center"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.65 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-warm-gradient text-white shadow-lg shadow-rouge/30">
                  <Icon />
                </div>
                <h3 className="mt-6 font-serif-cn text-2xl font-bold text-ink">{platform.name}</h3>
                <p className="mt-1 text-sm text-muted">{platform.detail}</p>
                <p className="mt-4 font-data text-lg font-bold text-rouge-deep">{platform.metric}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{platform.blurb}</p>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-7 px-8 py-3 text-sm"
                >
                  去关注
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
