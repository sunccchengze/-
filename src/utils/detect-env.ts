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
 * 选择最佳视频源
 *
 * 优先级：
 * 1. 国内 CDN（腾讯云 COS / 阿里云 OSS / 七牛云）
 * 2. Cloudflare Pages（本站静态资源，比 GitHub 快）
 * 3. GitHub Release（兜底，国内最慢）
 */
export function resolveVideoUrl({
  cdnUrl,
  pagesUrl,
  githubUrl,
}: {
  cdnUrl?: string;
  pagesUrl?: string;
  githubUrl?: string;
}): string {
  // 如果在国内环境且有 CDN URL，优先使用
  if (cdnUrl && isLikelyChina()) return cdnUrl;
  // 如果有 Pages 内链，比 GitHub 快
  if (pagesUrl) return pagesUrl;
  // 兜底
  return githubUrl ?? pagesUrl ?? cdnUrl ?? "";
}

/** 粗判是否在国内网络环境 */
function isLikelyChina(): boolean {
  // 微信 = 国内
  if (isWeChat()) return true;
  // 检查语言偏好
  if (typeof navigator !== "undefined") {
    const lang = navigator.language || "";
    if (lang.startsWith("zh-CN") || lang.startsWith("zh_Hans")) return true;
  }
  return false;
}
