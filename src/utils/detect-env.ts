/**
 * 移动端 & 微信环境检测工具
 *
 * 微信 WebView (X5 内核) 有以下限制：
 * - 禁止视频自动播放（即使 muted + playsInline 也不行）
 * - 需要用户交互后才能 play()
 * - 对外部资源（尤其 GitHub）加载极慢
 *
 * 本模块提供运行时检测，让组件做优雅降级。
 */

/** 是否为移动端（含平板） */
export function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|WeChat/i.test(navigator.userAgent);
}

/** 是否为微信内置浏览器（WebView / X5 内核） */
export function isWeChat(): boolean {
  if (typeof navigator === "undefined") return false;
  return /MicroMessenger/i.test(navigator.userAgent);
}

/** 是否为移动端且无法自动播放视频 */
export function cannotAutoplayVideo(): boolean {
  // 微信一定不能 autoplay；其他移动端大概率也不能（Safari iOS 10+ 允许 muted autoplay，
  // 但很多国产浏览器仍然禁止）。保守策略：移动端一律降级。
  return isMobile();
}

/**
 * 网络连接质量检测
 * - 使用 Navigator Connection API（Chrome/Android 支持）
 * - 返回 'fast' | 'slow' | 'unknown'
 */
export function getConnectionQuality(): "fast" | "slow" | "unknown" {
  const conn = (navigator as unknown as Record<string, unknown>).connection;
  if (!conn) return "unknown";

  const effectiveType = (conn as Record<string, unknown>).effectiveType as string | undefined;
  if (effectiveType === "4g") return "fast";
  if (effectiveType === "2g" || effectiveType === "3g" || effectiveType === "slow-2g") return "slow";

  // saveData 模式
  if ((conn as Record<string, unknown>).saveData) return "slow";

  return "unknown";
}

/**
 * 视频播放源（与 src/config.ts 中 VIDEO_SOURCES_* 的字段一一对应）
 * 优先级：B站嵌入（组件单独处理，不参与 mp4 回退链）→ Pages → GitHub → 镜像
 */
export type VideoSources = {
  /** ① B站 BV 号（iframe 嵌入，由组件直接渲染，不走 mp4 回退链） */
  bilibili?: string;
  /** ② Cloudflare Pages 本站静态资源（压缩版，部署即生效） */
  pages?: string;
  /** ③ GitHub Release，兜底（国内慢） */
  github?: string;
  /** ④ 免费 GitHub 加速镜像（可选，第三方不稳定） */
  mirror?: string;
};

/**
 * 按优先级返回完整 mp4 源列表（去重），供组件播放失败时逐级回退：
 * Pages → GitHub → 镜像（国内国外同一顺序；Pages 压缩版体量小，国内直连尚可）。
 */
export function orderedVideoSources(videoSources: VideoSources): string[] {
  const list: string[] = [];
  // Pages 内链随 Cloudflare Pages 部署，国内直连比 GitHub 快
  if (videoSources.pages) list.push(videoSources.pages);
  // GitHub Release 兜底
  if (videoSources.github) list.push(videoSources.github);
  // 免费加速镜像（如 gh-proxy.com），失效会自动走完全部源后显示错误态
  if (videoSources.mirror) list.push(videoSources.mirror);
  return [...new Set(list)];
}

/**
 * 选择最佳视频源（只取优先级最高的一个；需要失败回退时请用 orderedVideoSources）
 */
export function resolveVideoUrl(videoSources: VideoSources): string {
  return orderedVideoSources(videoSources)[0] ?? "";
}
