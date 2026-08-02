import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LINK_报名 as joinLink } from "../config";

export function FloatingChrome() {
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      const nearFooter = y + h > doc - 520;
      setVisible(y > h * 0.65 && !nearFooter);
      setShowTop(y > h * 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showTop ? (
          <motion.a
            href="#top"
            className="focus-ring fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-rouge-deep/90 text-white shadow-lg shadow-rouge/30 backdrop-blur-md md:bottom-28 md:right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="回到顶部"
          >
            <ArrowDown className="h-5 w-5 rotate-180" aria-hidden="true" />
          </motion.a>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {visible ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#2a1816]/92 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl md:bottom-6 md:left-auto md:right-6 md:inset-x-auto md:w-auto md:rounded-2xl md:border md:px-4 md:py-3 md:shadow-2xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28 }}
            role="complementary"
            aria-label="快捷报名"
          >
            <div className="mx-auto flex max-w-lg items-center gap-3 md:max-w-none">
              <p className="min-w-0 flex-1 text-xs leading-snug text-white/85 md:hidden">
                <span className="font-serif-cn font-bold text-white">加入英仔</span>
                <span className="mt-0.5 block text-white/65">五星级公益 · 工时可认证</span>
              </p>
              <p className="hidden font-serif-cn text-sm font-bold text-white md:block">准备好了吗？</p>
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white shrink-0 px-5 py-2.5 text-sm"
              >
                去报名
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
