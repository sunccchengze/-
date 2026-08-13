import { cancelFrame, frame } from "framer-motion";
import type { LenisOptions } from "lenis";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type PropsWithChildren } from "react";

const lenisOptions: LenisOptions = {
  autoRaf: false,
  smoothWheel: true,
  syncTouch: false,
  lerp: 0.095,
  wheelMultiplier: 0.95,
  overscroll: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

/**
 * 全站 Lenis 平滑滚动入口。
 * 与 Framer Motion 共用同一帧循环，避免重复 requestAnimationFrame；
 * 触屏继续使用原生滚动，鼠标滚轮与页内锚点交给 Lenis 平滑处理。
 */
export function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
