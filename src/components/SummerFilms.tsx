import { motion } from "framer-motion";
import { Clapperboard, Play } from "lucide-react";
import { useState } from "react";
import { SUMMER_GALLERIES, VIDEO_知行秦川总结, VIDEO_玉树总结 } from "../config";
import { SectionHeader } from "./SectionHeader";

function FilmCard({
  title,
  subtitle,
  description,
  video,
  poster,
  ready,
}: {
  title: string;
  subtitle: string;
  description: string;
  video: string;
  poster: string;
  ready: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const playable = ready && !failed;

  return (
    <motion.article
      className="card-hover card-outline-gradient overflow-hidden rounded-[26px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#221513]">
        {playable ? (
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            onError={() => setFailed(true)}
          >
            <source src={video} type="video/mp4" />
            你的浏览器暂不支持视频播放。
          </video>
        ) : (
          <>
            <img src={poster} alt={`${title}影像占位`} className="h-full w-full object-cover opacity-70" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211310]/85 via-[#211310]/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <Play className="ml-1 h-6 w-6" />
              </div>
              <p className="mt-4 font-serif-cn text-lg font-bold">影像正在整理</p>
              <p className="mt-2 text-sm leading-6 text-white/75">上传同名 16:9 视频后，这里会自动变成可播放影像。</p>
            </div>
          </>
        )}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          <Clapperboard className="h-3.5 w-3.5" />
          {playable ? "点击播放" : "影像预留"}
        </span>
      </div>
      <div className="px-6 pb-7 pt-6">
        <p className="text-xs font-bold tracking-[0.18em] text-rouge">{subtitle}</p>
        <h3 className="mt-2 font-serif-cn text-2xl font-bold text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>
    </motion.article>
  );
}

/** 暑期影像：知行可直接播放，玉树预留同规格入口。 */
export function SummerFilms() {
  return (
    <section id="summer-films" className="bg-shell section-block">
      <div className="bg-veil veil-cream" />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="SUMMER FILMS"
          title="把那个夏天，留在影像里"
          subtitle="活动结束后，故事没有结束。点击播放，看看英仔在课堂、山野与人群中的真实片段。"
        />
        <div className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8">
          <FilmCard
            title="知行秦川，梦启今夏"
            subtitle="2026.7 · 周至九峰 × 彬州"
            description="五分钟活动总结视频：从开营、课堂、英语话剧、科学科普到游园与告别，把这个夏天的笑声和认真留在镜头里。"
            video={VIDEO_知行秦川总结}
            poster={SUMMER_GALLERIES.qinchuan[0]}
            ready
          />
          <FilmCard
            title="梦绽格桑原，玉树支教团"
            subtitle="第十七届 · 青海玉树"
            description="玉树支教影像位已预留。上传同名视频后，可在这里播放高原课堂、破冰互动与雪域同行的故事。"
            video={VIDEO_玉树总结}
            poster={SUMMER_GALLERIES.yushu[0]}
            ready={false}
          />
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          视频建议：16:9、MP4、控制在 80MB 以内，优先使用已获授权的活动影像。
        </p>
      </div>
    </section>
  );
}
