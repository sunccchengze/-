import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";

/** 顶部阅读进度条——直接跟随 Lenis 的平滑滚动进度。 */
export function ScrollProgress() {
  const lenisProgress = useMotionValue(0);
  useLenis((lenis) => lenisProgress.set(lenis.progress), [lenisProgress]);
  const scaleX = useSpring(lenisProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-rouge-deep via-rose to-gold-soft"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
