import { motion } from "framer-motion";
import { ArrowRight, Clapperboard, RotateCcw, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { IMG_第11页背景, SUMMER_GALLERIES, VIDEO_知行秦川总结, VIDEO_玉树总结 } from "../config";
import { SectionHeader } from "./SectionHeader";

function FilmCard({ title, subtitle, description, video, poster, storyLink }: { title: string; subtitle: string; description: string; video: string; poster: string; storyLink?: string }) {
  const [failed, setFailed] = useState(false);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  const [loaded, setLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const onOnline = () => { setOnline(true); setFailed(false); };
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  useEffect(() => {
    if (!online || loaded || failed) return;
    const timer = window.setTimeout(() => setFailed(true), 12000);
    return () => window.clearTimeout(timer);
  }, [online, loaded, failed, retryKey]);

  const unavailable = !online || failed;
  const retry = () => { setLoaded(false); setFailed(false); setRetryKey((key) => key + 1); };

  return (
    <motion.article className="card-hover card-outline-gradient overflow-hidden rounded-[26px] bg-white/85" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
      <div className="relative aspect-video overflow-hidden bg-[#221513]">
        {!unavailable ? (
          <video key={retryKey} className="h-full w-full object-cover" controls playsInline preload="metadata" poster={poster} onLoadedData={() => setLoaded(true)} onError={() => setFailed(true)}>
            <source src={video} type="video/mp4" />
            你的浏览器暂不支持视频播放。
          </video>
        ) : (
          <>
            <img src={poster} alt={`${title}活动影像`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211310]/80 via-[#211310]/25 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 z-10 text-white">
              <p className="font-serif-cn text-xl font-bold">网络不太顺畅，影像稍后再见</p>
              <p className="mt-2 text-sm leading-6 text-white/80">你可以稍后重新加载，也可关注公众号回顾这段夏天。</p>
              <button type="button" onClick={retry} className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/25">
                <RotateCcw className="h-3.5 w-3.5" />重新加载
              </button>
            </div>
          </>
        )}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          {unavailable ? <WifiOff className="h-3.5 w-3.5" /> : <Clapperboard className="h-3.5 w-3.5" />}
          {unavailable ? "网络稍后重试" : "点击播放"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 px-6 pb-7 pt-6">
        <div><p className="text-xs font-bold tracking-[0.18em] text-rouge">{subtitle}</p><h3 className="mt-2 font-serif-cn text-2xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{description}</p></div>
        {storyLink ? <a href={storyLink} className="focus-ring group shrink-0 rounded-full p-2 text-rouge" aria-label={`查看${title}项目故事`}><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a> : null}
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
        <SectionHeader eyebrow="SUMMER FILMS" title="把那个夏天，留在影像里" subtitle="一段可播放的知行秦川，一场仍在继续的玉树赴约；镜头让真实行动被更多人看见。" />
        <div className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8">
          <FilmCard title="知行秦川，梦启今夏" subtitle="2026.7 · 周至九峰 × 彬州" description="从开营、课堂、英语话剧、科学科普到游园与告别，把这个夏天的笑声和认真留在镜头里。" video={VIDEO_知行秦川总结} poster={SUMMER_GALLERIES.qinchuan[0]} />
          <FilmCard title="梦绽格桑原，玉树支教团" subtitle="第十七届 · 青海玉树" description="从西安到称多，把一堂堂课、一次次破冰与十七年的约定带到雪域高原。" video={VIDEO_玉树总结} poster={SUMMER_GALLERIES.yushu[0]} storyLink="#summer" />
        </div>
      </div>
    </section>
  );
}
