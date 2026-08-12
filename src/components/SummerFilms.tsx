import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMG_第11页背景, SUMMER_GALLERIES, VIDEO_SOURCES_知行秦川, VIDEO_SOURCES_玉树 } from "../config";
import type { VideoSources } from "../utils/detect-env";
import { SectionHeader } from "./SectionHeader";
import { SummerVideoPlayer } from "./SummerVideoPlayer";

function FilmCard({
  title,
  subtitle,
  description,
  videoSources,
  poster,
  storyLink,
}: {
  title: string;
  subtitle: string;
  description: string;
  videoSources: VideoSources;
  poster: string;
  storyLink?: string;
}) {
  return (
    <motion.article
      className="card-hover card-outline-gradient overflow-hidden rounded-[26px] bg-white/85"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SummerVideoPlayer title={title} videoSources={videoSources} poster={poster} />
      <div className="flex items-center justify-between gap-4 px-6 pb-7 pt-6">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-rouge">{subtitle}</p>
          <h3 className="mt-2 font-serif-cn text-2xl font-bold text-ink">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>
        {storyLink ? (
          <a href={storyLink} className="focus-ring group shrink-0 rounded-full p-2 text-rouge" aria-label={`查看${title}项目故事`}>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function SummerFilms() {
  return (
    <section id="summer-films" className="bg-shell section-block overflow-hidden">
      <img src={IMG_第11页背景} alt="" aria-hidden="true" className="bg-image opacity-35" loading="lazy" decoding="async" />
      <div className="bg-veil veil-cream opacity-95" />
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_12%_18%,rgba(201,168,118,0.16),transparent_32%),radial-gradient(circle_at_88%_76%,rgba(178,90,85,0.12),transparent_38%)]" />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="SUMMER FILMS"
          title="把那个夏天，留在影像里"
          subtitle="秦川行罢，窗下留一线清光；玉树归来，雪原存十七载深情。步履纵有终程，心火永驻帧间。"
        />
        <div className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8">
          <FilmCard
            title="知行秦川，梦启今夏"
            subtitle="2026.7 · 周至九峰 × 彬州"
            description="从开营、课堂、英语话剧、科学科普到游园与告别，把这个夏天的笑声和认真留在镜头里。"
            videoSources={VIDEO_SOURCES_知行秦川}
            poster={SUMMER_GALLERIES.qinchuan[0]}
          />
          <FilmCard
            title="梦绽格桑原，玉树支教团"
            subtitle="第十七届 · 青海玉树"
            description="从西安到称多，把一堂堂课、一次次破冰与十七年的约定带到雪域高原。"
            videoSources={VIDEO_SOURCES_玉树}
            poster={SUMMER_GALLERIES.yushu[0]}
            storyLink="#summer"
          />
        </div>
      </div>
    </section>
  );
}
