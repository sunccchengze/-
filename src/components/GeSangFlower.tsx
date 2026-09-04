import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * C.4 5 朵格桑花寻宝
 * 5 大隐秘位藏 5 朵格桑花图章 → 集满 5 朵 → 烟花礼赞 + 玉树星空纪念明信片占位
 * localStorage 持久化：`yingzai_gesang_collected` → string[]
 */

const STORAGE_KEY = "yingzai_gesang_collected";
const TOTAL = 5;

/** 5 个位置常量（与调用处 position prop 对齐） */
export const GESANG_POSITIONS = ["hero", "about", "departments", "summer", "stats"] as const;
type GesangPosition = (typeof GESANG_POSITIONS)[number];

/** 全局订阅：用 storage event + 自定义事件，让多个 GeSangFlower 同步 */
const subscribers = new Set<(set: Set<GesangPosition>) => void>();

function readCollected(): Set<GesangPosition> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is GesangPosition => typeof x === "string" && (GESANG_POSITIONS as readonly string[]).includes(x)));
  } catch {
    return new Set();
  }
}

function writeCollected(set: Set<GesangPosition>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // 静默失败
  }
}

function notify(set: Set<GesangPosition>) {
  subscribers.forEach((cb) => cb(set));
}

function FlowerSvg({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="28"
      height="28"
      aria-hidden="true"
      className={filled ? "drop-shadow-[0_0_8px_rgba(201,168,118,0.7)]" : "opacity-30"}
    >
      <g transform="translate(16,16)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            rx="4"
            ry="9"
            transform={`rotate(${deg})`}
            fill={filled ? "#c9a876" : "#666"}
            opacity={filled ? 0.95 : 0.45}
          />
        ))}
        <circle r="3" fill={filled ? "#8a3a3a" : "#444"} />
      </g>
    </svg>
  );
}

/**
 * 单朵格桑花图章：用户点击即"收集"
 */
export function GeSangFlower({ position }: { position: GesangPosition | string }) {
  const [collected, setCollected] = useState<Set<GesangPosition>>(() => readCollected());
  const [justCollected, setJustCollected] = useState(false);

  useEffect(() => {
    const cb = (next: Set<GesangPosition>) => setCollected(new Set(next));
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  const isCollected = collected.has(position as GesangPosition);
  const isAllDone = collected.size === TOTAL;

  const handleClick = () => {
    if (isCollected || isAllDone) return;
    const next = new Set(collected);
    next.add(position as GesangPosition);
    writeCollected(next);
    notify(next);
    setJustCollected(true);
    window.setTimeout(() => setJustCollected(false), 1200);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isCollected}
      className="focus-ring inline-flex items-center justify-center rounded-full transition-transform hover:scale-110 disabled:cursor-default"
      aria-label={isCollected ? `格桑花「${position}」已收集` : `点击收集格桑花「${position}」`}
      whileTap={!isCollected ? { scale: 0.85 } : {}}
    >
      <AnimatePresence>
        {justCollected && (
          <motion.span
            className="absolute inline-block text-xs font-bold text-[#f6e5ba]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
      <FlowerSvg filled={isCollected} />
    </motion.button>
  );
}

/**
 * 浮动进度条：右下角小气泡，显示「已集 N/5」
 * 集齐 5 朵 → 弹窗"烟花礼赞" + 玉树星空纪念明信片占位
 * 5 朵图章散布在右下角（按 position 排成一行），点击即"收集"
 */
export function GeSangProgress() {
  const [collected, setCollected] = useState<Set<GesangPosition>>(() => readCollected());
  const [showCelebrate, setShowCelebrate] = useState(false);

  useEffect(() => {
    const cb = (next: Set<GesangPosition>) => {
      setCollected(new Set(next));
      if (next.size === TOTAL) {
        // 仅在用户刚集齐时弹一次（避免每次刷新都弹）
        const hasSeen = window.sessionStorage.getItem("yingzai_gesang_celebrated");
        if (!hasSeen) {
          window.sessionStorage.setItem("yingzai_gesang_celebrated", "1");
          setShowCelebrate(true);
        }
      }
    };
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  const pct = Math.round((collected.size / TOTAL) * 100);

  const handleCollect = (pos: GesangPosition) => {
    if (collected.has(pos) || collected.size === TOTAL) return;
    const next = new Set(collected);
    next.add(pos);
    writeCollected(next);
    notify(next);
  };

  return (
    <>
      <div
        className="pointer-events-auto fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 rounded-2xl border border-gold-soft/45 bg-black/55 px-3 py-2 text-[11px] font-bold tracking-[0.16em] text-[#f6e5ba] backdrop-blur-md"
        role="status"
        aria-label={`已集格桑花 ${collected.size} / ${TOTAL}`}
      >
        <div className="flex items-center gap-2">
          <span aria-hidden>🌸</span>
          <span>已集 {collected.size} / {TOTAL}</span>
          <span className="inline-block h-1 w-12 overflow-hidden rounded-full bg-white/15">
            <span
              className="block h-full bg-gradient-to-r from-gold-soft to-rose-soft"
              style={{ width: `${pct}%`, transition: "width 0.4s ease-out" }}
            />
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {GESANG_POSITIONS.map((pos) => (
            <GeSangFlowerMini
              key={pos}
              position={pos}
              filled={collected.has(pos)}
              onClick={() => handleCollect(pos)}
            />
          ))}
        </div>
        <p className="text-[10px] tracking-[0.12em] text-white/55">点 5 朵小图集齐格桑花</p>
      </div>

      <AnimatePresence>
        {showCelebrate && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCelebrate(false)}
            role="dialog"
            aria-label="格桑花集齐礼赞"
          >
            <motion.div
              className="relative max-w-md rounded-2xl border border-gold-soft/50 bg-gradient-to-b from-[#2a1a18] to-[#1a0f0e] p-8 text-center text-white shadow-2xl"
              initial={{ scale: 0.85, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 16 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="mb-4 text-5xl" aria-hidden>
                ✨ 🌸 ✨
              </div>
              <h2 className="font-serif-cn text-2xl font-bold tracking-wide text-[#f6e5ba]">
                集齐 5 朵格桑花
              </h2>
              <p className="mt-3 font-serif-cn text-sm leading-6 text-white/85">
                玉树星空 · 称多纪实纪念明信片已为你点亮。<br />
                招新现场领取，或联系宣传部任一学长学姐。
              </p>
              <p className="mt-5 text-[11px] tracking-[0.18em] text-white/55">
                点击任意处关闭
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GeSangFlowerMini({
  position,
  filled,
  onClick,
}: {
  position: GesangPosition;
  filled: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={filled}
      className="focus-ring inline-flex items-center justify-center rounded-full transition-transform hover:scale-110 disabled:cursor-default"
      aria-label={filled ? `格桑花「${position}」已收集` : `点击收集格桑花「${position}」`}
      whileTap={!filled ? { scale: 0.85 } : {}}
    >
      <FlowerSvg filled={filled} />
    </motion.button>
  );
}
