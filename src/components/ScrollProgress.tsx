import { motion, useScroll, useSpring } from "framer-motion";

/** 顶部阅读进度条——高级落地页常见细节，强化「长页可预期」 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
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
