import { motion } from "framer-motion";
import { ArrowRight, Clapperboard, Loader2, Play, RotateCcw, WifiOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { IMG_第11页背景, SUMMER_GALLERIES, VIDEO_SOURCES_知行秦川, VIDEO_SOURCES_玉树 } from "../config";
import { getConnectionQuality, isMobile, orderedVideoSources } from "../utils/detect-env";
import { SectionHeader } from "./SectionHeader";

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
  videoSources: { bilibili?: string; pages?: string; github?: string; mirror?: string };
  poster: string;
  storyLink?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  const [ready, setReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  /** 核心优化：视频只在用户点击后才加载，减少移动端流量和加载等待 */
  const [userWantsVideo, setUserWantsVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  /** B站嵌入失败时的手动逃生通道：切回 mp4 回退链 */
  const [useDirect, setUseDirect] = useState(false);

  /** mp4 回退链：Pages → GitHub → 镜像，当前源失败后自动尝试下一个（B站模式不走此链） */
  const candidates = useMemo(() => orderedVideoSources(videoSources), [videoSources]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const resolvedUrl = candidates[sourceIndex];

  const bilibiliMode = !!videoSources.bilibili && !useDirect;

  /** B站 iframe 加载状态：加载中转圈提示；8 秒兜底隐藏，避免白屏卡死无反馈 */
  const [iframeLoaded, setIframeLoaded] = useState(false);
  useEffect(() => {
    if (!userWantsVideo || !bilibiliMode) return;
    setIframeLoaded(false);
    const timer = window.setTimeout(() => setIframeLoaded(true), 8000);
    return () => window.clearTimeout(timer);
  }, [userWantsVideo, bilibiliMode, retryKey]);

  useEffect(() => {
    const onOnline = () => { setOnline(true); setFailed(false); };
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  const unavailable = !online || failed;
  const retry = () => { setReady(false); setFailed(false); setIsPlaying(false); setUseDirect(false); setUserWantsVideo(false); setSourceIndex(0); setRetryKey((key) => key + 1); };

  /** 当前源加载失败：自动切到下一个可用源；全部失败才显示“网络不太顺畅” */
  const handleVideoError = () => {
    setReady(false);
    setIsPlaying(false);
    if (sourceIndex + 1 < candidates.length) {
      setSourceIndex((index) => index + 1);
    } else {
      setFailed(true);
    }
  };

  /** 用户点击播放 */
  const handlePlay = () => {
    if (!userWantsVideo) setUserWantsVideo(true);
    // B站嵌入模式：iframe 自带播放器，点击后直接隐藏海报层
    if (videoSources.bilibili) setIsPlaying(true);
  };

  /** B站嵌入不可用（企业网/部分微信环境）时切回 mp4 直链 */
  const handleDirectPlay = () => {
    setUseDirect(true);
    setReady(false);
    setIsPlaying(false);
    setSourceIndex(0);
  };

  const connectionQuality = getConnectionQuality();
  const mobile = isMobile();

  return (
    <motion.article className="card-hover card-outline-gradient overflow-hidden rounded-[26px] bg-white/85" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
      <div className="relative aspect-video overflow-hidden bg-[#221513]">
        {/* ── 用户点击后才渲染播放器（B站 iframe 或本地 video）── */}
        {userWantsVideo && !unavailable ? (
          bilibiliMode ? (
            /* ① B站嵌入：配置了 BV 号时优先使用（国内最快，无需自备流量） */
            <>
              {!iframeLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center bg-[#221513]">
                  <Loader2 className="h-7 w-7 animate-spin text-white/80" />
                </div>
              ) : null}
              <iframe
                key={retryKey}
                className="h-full w-full"
                src={`https://player.bilibili.com/player.html?bvid=${videoSources.bilibili}&page=1&high_quality=1&danmaku=0&autoplay=1`}
                title={`${title}视频（B站）`}
                scrolling="no"
                frameBorder="no"
                allowFullScreen
                allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIframeLoaded(true)}
              />
            </>
          ) : (
            /* ②③④ mp4 回退链：Pages → GitHub → 镜像 */
            <video
              key={`${retryKey}-${sourceIndex}`}
              className="h-full w-full object-cover"
              controls
              playsInline
              preload={mobile ? "none" : "metadata"}
              poster={poster}
              autoPlay
              onCanPlay={() => { setReady(true); setIsPlaying(true); }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={handleVideoError}
            >
              <source src={resolvedUrl} type="video/mp4" />
              你的浏览器暂不支持视频播放。
            </video>
          )
        ) : null}

        {/* ── 海报 + 播放按钮（视频未播放时显示） ── */}
        {!isPlaying ? (
          <>
            <img src={poster} alt={`${title}活动影像`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211310]/70 via-[#211310]/20 to-transparent" />

            {unavailable ? (
              /* 网络错误状态 */
              <div className="absolute inset-x-5 bottom-5 z-10 text-white">
                <p className="font-serif-cn text-xl font-bold">网络不太顺畅，影像稍后再见</p>
                <p className="mt-2 text-sm leading-6 text-white/80">你可以稍后重新加载，也可关注公众号回顾这段夏天。</p>
                <button type="button" onClick={retry} className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/25">
                  <RotateCcw className="h-3.5 w-3.5" />重新加载
                </button>
              </div>
            ) : (
              /* 播放按钮 —— 核心交互入口 */
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 z-10 flex items-center justify-center"
                aria-label={`播放${title}视频`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/50 bg-black/30 backdrop-blur-md transition-all active:scale-90 hover:scale-105 hover:bg-black/40">
                  {userWantsVideo && !ready ? (
                    <Loader2 className="h-7 w-7 animate-spin text-white/90" />
                  ) : (
                    <Play className="h-7 w-7 text-white/90" fill="currentColor" />
                  )}
                </span>
              </button>
            )}
          </>
        ) : null}

        {/* ── 状态标签 ── */}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          {unavailable ? <WifiOff className="h-3.5 w-3.5" /> : isPlaying ? <Clapperboard className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {unavailable ? "网络稍后重试" : isPlaying ? "播放中" : connectionQuality === "slow" ? "点击播放（建议Wi-Fi）" : "点击播放"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 px-6 pb-7 pt-6">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-rouge">{subtitle}</p>
          <h3 className="mt-2 font-serif-cn text-2xl font-bold text-ink">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          {/* B站嵌入的逃生通道：个别网络环境被拦截时可手动切回 mp4 直链 */}
          {userWantsVideo && bilibiliMode ? (
            <button type="button" onClick={handleDirectPlay} className="focus-ring mt-2 text-xs font-bold text-rouge underline-offset-4 hover:underline">
              B站播放不了？用直链播放 →
            </button>
          ) : null}
        </div>
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
        <SectionHeader eyebrow="SUMMER FILMS" title="把那个夏天，留在影像里" subtitle="秦川行罢，窗下留一线清光；玉树归来，雪原存十七载深情。步履纵有终程，心火永驻帧间。" />
        <div className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8">
          <FilmCard title="知行秦川，梦启今夏" subtitle="2026.7 · 周至九峰 × 彬州" description="从开营、课堂、英语话剧、科学科普到游园与告别，把这个夏天的笑声和认真留在镜头里。" videoSources={VIDEO_SOURCES_知行秦川} poster={SUMMER_GALLERIES.qinchuan[0]} />
          <FilmCard title="梦绽格桑原，玉树支教团" subtitle="第十七届 · 青海玉树" description="从西安到称多，把一堂堂课、一次次破冰与十七年的约定带到雪域高原。" videoSources={VIDEO_SOURCES_玉树} poster={SUMMER_GALLERIES.yushu[0]} storyLink="#summer" />
        </div>
      </div>
    </section>
  );
}
