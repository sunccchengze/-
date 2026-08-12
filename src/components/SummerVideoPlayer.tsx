import { Clapperboard, Loader2, Play, RotateCcw, WifiOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getConnectionQuality, isMobile, orderedVideoSources, type VideoSources } from "../utils/detect-env";

type SummerVideoPlayerProps = {
  title: string;
  videoSources: VideoSources;
  poster: string;
  className?: string;
};

/**
 * 暑期实践共用视频播放器。
 *
 * 所有实践影像统一走同一套按需加载与失败回退逻辑：
 * B 站 iframe → Pages MP4 → GitHub Release → 镜像。
 * 组件本身只负责媒体区域，外层卡片可按不同项目采用各自版式。
 */
export function SummerVideoPlayer({ title, videoSources, poster, className = "" }: SummerVideoPlayerProps) {
  const [failed, setFailed] = useState(false);
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  const [ready, setReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // 只有用户主动点击后才加载 iframe / video，避免移动端预先消耗流量。
  const [userWantsVideo, setUserWantsVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // B 站在企业网或部分 WebView 中不可用时，可切换到 MP4 回退链。
  const [useDirect, setUseDirect] = useState(false);
  const candidates = useMemo(() => orderedVideoSources(videoSources), [videoSources]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const resolvedUrl = candidates[sourceIndex];
  const bilibiliMode = !!videoSources.bilibili && !useDirect;

  // iframe 没有可靠的错误事件；8 秒后结束转圈，交由 B 站播放器展示状态。
  const [iframeLoaded, setIframeLoaded] = useState(false);
  useEffect(() => {
    if (!userWantsVideo || !bilibiliMode) return;
    setIframeLoaded(false);
    const timer = window.setTimeout(() => setIframeLoaded(true), 8000);
    return () => window.clearTimeout(timer);
  }, [userWantsVideo, bilibiliMode, retryKey]);

  useEffect(() => {
    const onOnline = () => {
      setOnline(true);
      setFailed(false);
    };
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const unavailable = !online || failed;
  const retry = () => {
    setReady(false);
    setFailed(false);
    setIsPlaying(false);
    setUseDirect(false);
    setUserWantsVideo(false);
    setSourceIndex(0);
    setRetryKey((key) => key + 1);
  };

  const handleVideoError = () => {
    setReady(false);
    setIsPlaying(false);
    if (sourceIndex + 1 < candidates.length) {
      setSourceIndex((index) => index + 1);
    } else {
      setFailed(true);
    }
  };

  const handlePlay = () => {
    if (!userWantsVideo) setUserWantsVideo(true);
    // iframe 自带播放器；MP4 则等 onCanPlay 后再隐藏海报。
    if (bilibiliMode) setIsPlaying(true);
  };

  const handleDirectPlay = () => {
    setUseDirect(true);
    setReady(false);
    setIsPlaying(false);
    setSourceIndex(0);
  };

  const connectionQuality = getConnectionQuality();
  const mobile = isMobile();

  return (
    <div className={`relative aspect-video overflow-hidden bg-[#221513] ${className}`}>
      {userWantsVideo && !unavailable ? (
        bilibiliMode ? (
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
        ) : resolvedUrl ? (
          <video
            key={`${retryKey}-${sourceIndex}`}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload={mobile ? "none" : "metadata"}
            poster={poster}
            autoPlay
            onCanPlay={() => {
              setReady(true);
              setIsPlaying(true);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={handleVideoError}
          >
            <source src={resolvedUrl} type="video/mp4" />
            你的浏览器暂不支持视频播放。
          </video>
        ) : null
      ) : null}

      {!isPlaying ? (
        <>
          <img
            src={poster}
            alt={`${title}活动影像`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            referrerPolicy={poster.startsWith("http") ? "no-referrer" : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211310]/70 via-[#211310]/20 to-transparent" />

          {unavailable ? (
            <div className="absolute inset-x-5 bottom-5 z-10 text-white">
              <p className="font-serif-cn text-xl font-bold">网络不太顺畅，影像稍后再见</p>
              <p className="mt-2 text-sm leading-6 text-white/80">你可以稍后重新加载，也可关注公众号回顾这段夏天。</p>
              <button
                type="button"
                onClick={retry}
                className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/25"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                重新加载
              </button>
            </div>
          ) : (
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

      <span className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
        {unavailable ? (
          <WifiOff className="h-3.5 w-3.5" />
        ) : isPlaying ? (
          <Clapperboard className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
        {unavailable ? "网络稍后重试" : isPlaying ? "播放中" : connectionQuality === "slow" ? "点击播放（建议Wi-Fi）" : "点击播放"}
      </span>

      {userWantsVideo && bilibiliMode ? (
        candidates.length > 0 ? (
          <button
            type="button"
            onClick={handleDirectPlay}
            className="focus-ring absolute bottom-3 right-3 z-20 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-black/60"
          >
            B站播放不了？用直链播放 →
          </button>
        ) : (
          <a
            href={`https://www.bilibili.com/video/${videoSources.bilibili}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring absolute bottom-3 right-3 z-20 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-black/60"
          >
            嵌入播放不了？前往 B 站 →
          </a>
        )
      ) : null}
    </div>
  );
}
