/**
 * YZTI 英仔公益人格测试
 * 仪式流程：入口（鹿角门）→ 酒保台 → 5 题调酒 → 分院帽仪式 → 结果页
 * 决策 #16 = A（不设单句暗号，只放完整社训），决策 #24（4 维公益人格）。
 *
 * 单一文件实现；模态 + 内部分步状态机 + localStorage 持久化。
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  X,
  Beer,
  GlassWater,
  Beaker,
  Wand2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AcademyId,
  YZTI_STORAGE_KEY,
  brand,
  yztiAcademies,
  yztiIngredientColors,
  yztiQuestions,
} from "../content";
import { IMG_小鹰正面 } from "../config";

/* ───────── 类型与状态机 ───────── */

type Step = "entrance" | "bartender" | "question" | "sorting" | "result";
type AnswerMap = Record<number, "A" | "B" | "C">;

const STEP_ORDER: Step[] = ["entrance", "bartender", "question", "sorting", "result"];

/* ───────── 入口：鹿角门 ───────── */

function EntranceDoor({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c0f0d] via-[#2a1816] to-[#0c0a09] px-6 text-center text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 max-w-md"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <p className="font-serif-cn text-[11px] font-bold tracking-[0.4em] text-amber-200/80">YZTI · 2026</p>
        <h1 className="mt-4 font-serif-cn text-3xl font-black leading-tight md:text-4xl">英仔公益人格测试</h1>
        <p className="mt-4 text-sm leading-7 text-cream/75">
          5 道直白的小问题，测出你做公益时的本能姿态。
          <br />
          答完会被分院帽「喊」进一个学院。
        </p>
      </motion.div>

      {/* 鹿角门：两扇门板从两侧打开 */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {[
          { left: true, deg: 135, shadow: "inset -20px 0 40px rgba(0,0,0,0.55)" },
          { left: false, deg: 225, shadow: "inset 20px 0 40px rgba(0,0,0,0.55)" },
        ].map((d, i) => (
          <motion.div
            key={i}
            className={`absolute top-0 h-full w-1/2 ${d.left ? "left-0 origin-left" : "right-0 origin-right"}`}
            style={{
              backgroundImage: `linear-gradient(${d.deg}deg, rgba(178,90,85,0.85) 0%, rgba(142,63,61,0.95) 60%, rgba(60,30,28,1) 100%)`,
              boxShadow: d.shadow,
            }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          >
            <div className={`absolute ${d.left ? "right-6" : "left-6"} top-12 text-5xl text-amber-200/40`}>🦌</div>
          </motion.div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onOpen}
        className="focus-ring relative z-30 mt-10 inline-flex items-center gap-2 rounded-full bg-amber-300/95 px-7 py-3 font-serif-cn text-base font-bold text-[#2a1816] shadow-[0_8px_28px_rgba(251,191,36,0.4)] transition hover:scale-[1.03] hover:bg-amber-200"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        推开鹿角门，开始测试
      </motion.button>
    </motion.div>
  );
}

/* ───────── 酒保台 ───────── */

function BartenderBar({ onReady }: { onReady: () => void }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1c0f0d] via-[#3b1f1c] to-[#1c0f0d] px-6 text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <p className="font-serif-cn text-[11px] font-bold tracking-[0.4em] text-amber-200/70">CHAPTER 01</p>
        <h2 className="mt-3 font-serif-cn text-2xl font-black md:text-3xl">调酒台已点亮</h2>
        <p className="mt-3 text-sm leading-7 text-cream/75">
          接下来 5 道题，每答一题调酒壶会多一种原料。
          <br />
          你的英仔特调，会在你做选择时慢慢显色。
        </p>

        <div className="relative mt-10 flex h-56 w-full items-end justify-center">
          <div className="absolute inset-x-4 bottom-0 h-1.5 rounded-full bg-gradient-to-r from-amber-700/0 via-amber-700/80 to-amber-700/0 shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />

          <motion.img
            src={IMG_小鹰正面}
            alt="英仔小鹰"
            className="absolute left-4 bottom-3 h-24 w-24 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          <motion.div
            className="relative h-44 w-24"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-0 h-3 w-12 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-zinc-300 to-zinc-500" />
            <div className="absolute inset-x-0 top-3 h-32 rounded-[28px] border-2 border-zinc-500/60 bg-gradient-to-b from-zinc-200/10 via-zinc-100/15 to-zinc-300/10 backdrop-blur-sm">
              <motion.div
                className="absolute inset-x-2 bottom-2 rounded-[22px] bg-gradient-to-b from-amber-200/40 to-amber-400/50"
                initial={{ height: 0 }}
                animate={{ height: "40%" }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute inset-x-1 top-1 h-1 rounded-full bg-amber-100/70 blur-[1px]" />
              </motion.div>
              <div className="absolute left-3 top-3 h-12 w-1.5 rounded-full bg-white/40 blur-[1px]" />
            </div>
            <div className="absolute -left-1 top-12 h-2 w-3 rounded-l-full bg-gradient-to-b from-zinc-400 to-zinc-600" />
          </motion.div>

          <motion.div
            className="absolute right-10 bottom-3 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            aria-hidden="true"
          >
            <GlassWater className="h-12 w-12 text-amber-100/50" />
            <p className="mt-1 font-serif-cn text-[10px] text-amber-100/50">空杯待调</p>
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={onReady}
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-amber-300/95 px-6 py-3 font-serif-cn text-sm font-bold text-[#2a1816] shadow-lg transition hover:scale-[1.03] hover:bg-amber-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Beer className="h-4 w-4" aria-hidden="true" />
          坐到吧台前
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ───────── 5 题调酒 ───────── */

function QuestionFlow({
  onFinish,
  initialAnswers,
}: {
  onFinish: (answers: AnswerMap) => void;
  initialAnswers: AnswerMap;
}) {
  const [stepIndex, setStepIndex] = useState(0); // 0..4
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);
  const reduce = useReducedMotion();

  const question = yztiQuestions[stepIndex];
  const total = yztiQuestions.length;
  const progress = (stepIndex / total) * 100;
  const picked = answers[question.id];

  const handlePick = (letter: "A" | "B" | "C") => {
    const next = { ...answers, [question.id]: letter };
    setAnswers(next);
    if (stepIndex < total - 1) {
      window.setTimeout(() => setStepIndex(stepIndex + 1), 320);
    } else {
      window.setTimeout(() => onFinish(next), 380);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  // 调酒壶里累计的层：每答一题加一层
  const layers = useMemo(() => {
    const count = Object.keys(answers).length;
    return yztiIngredientColors
      .slice(0, count)
      .map((color, idx) => ({ color, idx }));
  }, [answers]);

  return (
    <motion.div
      className="relative flex h-full w-full flex-col bg-gradient-to-b from-[#1c0f0d] via-[#2a1816] to-[#1c0f0d] text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 顶栏 */}
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="focus-ring inline-flex items-center gap-1 rounded-full border border-cream/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-cream/80 transition hover:border-amber-200/40 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="上一题"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" /> 上一题
        </button>
        <p className="font-serif-cn text-xs font-bold tracking-[0.3em] text-amber-200/70">
          {stepIndex + 1} / {total}
        </p>
        <div className="w-[64px]" />
      </div>

      {/* 进度条 */}
      <div className="mx-5 mt-3 h-1.5 overflow-hidden rounded-full bg-white/8" role="presentation">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-rose"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex flex-1 flex-col items-stretch justify-center gap-6 overflow-y-auto px-5 py-4 md:flex-row md:items-center md:gap-8">
        {/* 调酒壶 + 累计层 */}
        <div className="mx-auto flex w-full max-w-[200px] flex-col items-center md:w-[180px]">
          <div className="relative h-56 w-24" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-3 w-12 -translate-x-1/2 rounded-t-md bg-gradient-to-b from-zinc-300 to-zinc-500" />
            <div className="absolute inset-x-0 top-3 h-44 rounded-[28px] border-2 border-zinc-500/60 bg-gradient-to-b from-white/5 to-white/10">
              <AnimatePresence>
                {layers.map((layer) => (
                  <motion.div
                    key={layer.idx}
                    className="absolute inset-x-2 rounded-[22px]"
                    style={{ backgroundColor: layer.color, opacity: 0.85 }}
                    initial={{ height: 0, bottom: 6 }}
                    animate={{ height: `${(layers.length - layer.idx) * 14}%`, bottom: 6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </AnimatePresence>
              <div className="absolute left-3 top-3 h-12 w-1.5 rounded-full bg-white/40 blur-[1px]" />
            </div>
            <div className="absolute -left-1 top-14 h-2 w-3 rounded-l-full bg-gradient-to-b from-zinc-400 to-zinc-600" />
          </div>
          <p className="mt-3 font-serif-cn text-[11px] tracking-[0.2em] text-amber-200/60">
            调酒壶 · {Object.keys(answers).length} / {total}
          </p>
        </div>

        {/* 题目与选项 */}
        <div className="flex-1 md:max-w-[480px]">
          <p className="font-serif-cn text-[11px] font-bold tracking-[0.3em] text-amber-200/60">
            {question.dimensionLabel} · {question.dimension}
          </p>
          <h3 className="mt-2 font-serif-cn text-2xl font-black leading-tight md:text-[26px]">{question.prompt}</h3>
          {question.context ? <p className="mt-2 text-sm leading-6 text-cream/65">{question.context}</p> : null}

          <div className="mt-5 space-y-3" role="radiogroup" aria-label={question.prompt}>
            {question.options.map((opt) => {
              const selected = picked === opt.letter;
              return (
                <motion.button
                  key={opt.letter}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handlePick(opt.letter)}
                  className={`focus-ring flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    selected
                      ? "border-amber-300/80 bg-amber-300/15 shadow-[0_0_0_3px_rgba(251,191,36,0.18)]"
                      : "border-cream/15 bg-white/5 hover:border-amber-200/40 hover:bg-white/8"
                  }`}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif-cn text-sm font-black ${
                      selected ? "bg-amber-300 text-[#2a1816]" : "bg-white/10 text-cream/80"
                    }`}
                  >
                    {opt.letter}
                  </span>
                  <span className="text-[15px] leading-7 text-cream/90">{opt.text}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="px-5 pb-5 text-center font-serif-cn text-[11px] tracking-[0.25em] text-amber-200/50" aria-live="polite">
        答完会自动进入下一题
      </p>
    </motion.div>
  );
}

/* ───────── 分院帽仪式 ───────── */

function SortingHat({ result, onComplete }: { result: AcademyId; onComplete: () => void }) {
  const academy = yztiAcademies[result];
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showShout, setShowShout] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setBubbleIndex(academy.thoughtBubbles.length - 1);
      const t1 = window.setTimeout(() => setShowShout(true), 200);
      const t2 = window.setTimeout(() => onComplete(), 900);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
    const t1 = window.setTimeout(() => setBubbleIndex(1), 1100);
    const t2 = window.setTimeout(() => setBubbleIndex(2), 2400);
    const t3 = window.setTimeout(() => setShowShout(true), 3300);
    const t4 = window.setTimeout(() => onComplete(), 5400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [academy, onComplete, reduce]);

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c0a09] via-[#1c0f0d] to-[#0c0a09] text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 顶部学院色光柱（光柱在喊话后开始降落） */}
      <AnimatePresence>
        {showShout ? (
          <motion.div
            key="light"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{ background: academy.color }}
            initial={{ height: 0, opacity: 0.85 }}
            animate={{ height: "100%", opacity: [0.85, 0.55, 0.85] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>

      {/* 分院帽 */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center"
          initial={{ y: -200, rotate: -25, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 110, damping: 12 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            <defs>
              <linearGradient id="hat-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
            </defs>
            <path d="M 18 70 L 22 28 Q 26 18 50 18 Q 74 18 78 28 L 82 70 Z" fill="url(#hat-grad)" stroke="#1f1f1f" strokeWidth="1.5" />
            <ellipse cx="50" cy="70" rx="38" ry="6" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" />
            <path d="M 30 36 Q 50 32 70 36" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 28 50 Q 50 46 72 50" fill="none" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round" />
            {showShout ? (
              <>
                <path d="M 38 56 L 46 52" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 62 56 L 54 52" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
                <ellipse cx="50" cy="64" rx="6" ry="4.5" fill="#0a0a0a" stroke="#fbbf24" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="42" cy="54" r="2.4" fill="#fbbf24" />
                <circle cx="58" cy="54" r="2.4" fill="#fbbf24" />
                <path d="M 44 64 Q 50 66 56 64" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </motion.div>

        {/* 思考气泡 */}
        <AnimatePresence mode="wait">
          {!showShout ? (
            <motion.div
              key={bubbleIndex}
              className="mt-6 max-w-[280px] rounded-2xl border border-amber-200/20 bg-white/8 px-4 py-2 text-center font-serif-cn text-sm text-amber-100/85 backdrop-blur-md"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {academy.thoughtBubbles[bubbleIndex]}
            </motion.div>
          ) : (
            <motion.div
              key="shout"
              className="mt-6 text-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="font-serif-cn text-[11px] font-bold tracking-[0.4em] text-amber-200/70">帽子大喊：</p>
              <p
                className="mt-2 font-serif-cn text-4xl font-black tracking-wider md:text-5xl"
                style={{ textShadow: `0 0 32px ${academy.color}` }}
              >
                {academy.hatShout}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ───────── 结果页 ───────── */

function ResultPage({
  result,
  onRetake,
  onClose,
}: {
  result: AcademyId;
  onRetake: () => void;
  onClose: () => void;
}) {
  const academy = yztiAcademies[result];

  return (
    <motion.div
      className="relative flex h-full w-full flex-col overflow-y-auto bg-gradient-to-b from-[#1c0f0d] via-[#2a1816] to-[#1c0f0d] text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 顶部色带 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-90"
        style={{ background: academy.color }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-44 h-12 bg-gradient-to-b from-black/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col gap-5 px-5 pb-10 pt-7">
        <p className="text-center font-serif-cn text-[11px] font-bold tracking-[0.4em] text-amber-200/85">
          ✨ 帽子大喊：
        </p>

        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full text-5xl shadow-2xl ring-4 ring-cream/15"
            style={{ background: academy.color }}
            aria-hidden="true"
          >
            <span>{academy.emoji}</span>
          </div>
          <h2 className="mt-4 font-serif-cn text-3xl font-black tracking-wider md:text-4xl">
            {academy.name}
          </h2>
          <p className="mt-1 text-xs tracking-[0.3em] text-amber-100/70">{academy.keywords}</p>
          <p className="mt-3 max-w-md px-4 text-[11px] leading-relaxed text-amber-100/60">
            英仔没有院系墙。4 学院是 4 种公益气质的代称,你可以同时属于多个。
          </p>
        </motion.div>

        {/* 特调鸡尾酒 */}
        <motion.div
          className="rounded-2xl border border-cream/15 bg-white/8 p-4 backdrop-blur-md"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
              style={{ background: academy.color }}
              aria-hidden="true"
            >
              <GlassWater className="h-6 w-6 text-cream" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif-cn text-[10px] tracking-[0.3em] text-amber-200/70">你的英仔特调</p>
              <p className="font-serif-cn text-lg font-black">{academy.cocktail}</p>
            </div>
            <Beaker className="h-5 w-5 text-amber-100/40" aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm leading-6 text-cream/80">{academy.cocktailNote}</p>
        </motion.div>

        {/* 描述 */}
        <motion.div
          className="rounded-2xl border border-cream/15 bg-black/20 p-4 backdrop-blur-md"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <p className="font-serif-cn text-[15px] font-bold text-amber-100/90">
            你是「{academy.persona}」
          </p>
          <p className="mt-2 text-sm leading-7 text-cream/80">{academy.description}</p>
        </motion.div>

        {/* 推荐部门 */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <p className="mb-2 font-serif-cn text-[11px] font-bold tracking-[0.3em] text-amber-200/70">
            推荐部门
          </p>
          <ul className="space-y-2">
            {academy.departmentReasons.map((d) => (
              <li
                key={d.name}
                className="flex items-start gap-3 rounded-xl border border-cream/10 bg-white/5 px-3 py-2.5"
              >
                <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/80" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-serif-cn text-sm font-bold text-cream">{d.name}</p>
                  <p className="text-[13px] leading-6 text-cream/70">{d.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="https://tuvtpb2u.jsjform.com/f/zPAVNv"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-serif-cn text-base font-bold text-[#1c0f0d] shadow-lg transition hover:scale-[1.02]"
          style={{ background: academy.color }}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          加入招新群 / 填写报名表
        </motion.a>

        <div className="mt-2 flex items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={onRetake}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-white/5 px-3 py-1.5 text-cream/80 transition hover:border-amber-200/40 hover:text-amber-200"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> 重测
          </button>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-white/5 px-3 py-1.5 text-cream/80 transition hover:border-amber-200/40 hover:text-amber-200"
          >
            关闭
          </button>
        </div>

        {/* 社训 4 词组（决策 #16 = A：不设单句暗号） */}
        <div className="mt-6 space-y-1 border-t border-cream/10 pt-5 text-center font-serif-cn text-xs tracking-[0.5em] text-amber-100/70">
          <p>服 务 社 会</p>
          <p>奉 献 爱 心</p>
          <p>推 己 及 人</p>
          <p>薪 火 相 传</p>
          <p className="!mt-3 !text-[10px] !tracking-[0.4em] text-amber-200/45">─ {brand.name} ─</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────── 顶层组件：YztiLauncher + YztiTest ───────── */

function computeResult(answers: AnswerMap): AcademyId {
  const scores: Record<AcademyId, number> = { eagle: 0, sun: 0, plateau: 0, flame: 0 };
  // ties 时按「最近一次被选」决胜,而不是硬编码 eagle 第一 —— 否则 4 学院被一选项锁死
  let lastHit: AcademyId | null = null;
  yztiQuestions.forEach((q) => {
    const letter = answers[q.id];
    if (!letter) return;
    const opt = q.options.find((o) => o.letter === letter);
    if (opt) {
      scores[opt.academy] += 1;
      lastHit = opt.academy;
    }
  });
  // 决胜:分数最高者胜;分数相同时取「最近一次被选」,再相同才回退到 eagle
  const order: AcademyId[] = ["eagle", "sun", "plateau", "flame"];
  let best: AcademyId = lastHit ?? "eagle";
  let bestScore = -1;
  order.forEach((id) => {
    if (scores[id] > bestScore) {
      best = id;
      bestScore = scores[id];
    }
  });
  return best;
}

function loadStoredResult(): { result: AcademyId | null; answers: AnswerMap } {
  try {
    const raw = window.localStorage.getItem(YZTI_STORAGE_KEY);
    if (!raw) return { result: null, answers: {} };
    const parsed = JSON.parse(raw) as { result?: AcademyId; answers?: AnswerMap };
    if (parsed.result && yztiAcademies[parsed.result]) {
      return { result: parsed.result, answers: parsed.answers ?? {} };
    }
  } catch {
    /* ignore */
  }
  return { result: null, answers: {} };
}

export function YztiTest({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("entrance");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<AcademyId | null>(null);

  // 打开时尝试读取 localStorage
  useEffect(() => {
    if (!open) return;
    const stored = loadStoredResult();
    if (stored.result) {
      setResult(stored.result);
      setAnswers(stored.answers);
      setStep("result");
    } else {
      setResult(null);
      setAnswers({});
      setStep("entrance");
    }
  }, [open]);

  // Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 锁定 body 滚动
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const persist = useCallback((res: AcademyId, ans: AnswerMap) => {
    try {
      window.localStorage.setItem(
        YZTI_STORAGE_KEY,
        JSON.stringify({ result: res, answers: ans, savedAt: new Date().toISOString() })
      );
    } catch {
      /* ignore */
    }
  }, []);

  const handleFinish = useCallback(
    (ans: AnswerMap) => {
      const res = computeResult(ans);
      setAnswers(ans);
      setResult(res);
      setStep("sorting");
      persist(res, ans);
    },
    [persist]
  );

  const handleSortingDone = useCallback(() => {
    setStep("result");
  }, []);

  const handleRetake = useCallback(() => {
    try {
      window.localStorage.removeItem(YZTI_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAnswers({});
    setResult(null);
    setStep("entrance");
  }, []);

  const handleStart = useCallback(() => {
    setStep("bartender");
  }, []);

  const goToQuestion = useCallback(() => setStep("question"), []);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="英仔公益人格测试"
    >
      {/* 背景遮罩 */}
      <motion.div
        className="absolute inset-0 bg-black/72 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* 主面板 */}
      <motion.div
        className="relative z-10 flex h-[92vh] w-[94vw] max-w-[640px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1c0f0d] shadow-2xl shadow-black/50"
        initial={{ y: 30, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream/80 transition hover:bg-white/20 hover:text-cream"
          aria-label="关闭测试"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* 步骤指示小点（仅在答题中显示） */}
        {step === "question" ? (
          <div className="pointer-events-none absolute left-1/2 top-3 z-10 flex -translate-x-1/2 gap-1.5">
            {STEP_ORDER.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition ${
                  s === step ? "w-6 bg-amber-200" : i < STEP_ORDER.indexOf(step) ? "w-1.5 bg-amber-200/60" : "w-1.5 bg-cream/20"
                }`}
              />
            ))}
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          {step === "entrance" ? (
            <motion.div key="entrance" className="absolute inset-0">
              <EntranceDoor onOpen={handleStart} />
            </motion.div>
          ) : null}
          {step === "bartender" ? (
            <motion.div key="bartender" className="absolute inset-0">
              <BartenderBar onReady={goToQuestion} />
            </motion.div>
          ) : null}
          {step === "question" ? (
            <motion.div key="question" className="absolute inset-0">
              <QuestionFlow onFinish={handleFinish} initialAnswers={answers} />
            </motion.div>
          ) : null}
          {step === "sorting" && result ? (
            <motion.div key="sorting" className="absolute inset-0">
              <SortingHat result={result} onComplete={handleSortingDone} />
            </motion.div>
          ) : null}
          {step === "result" && result ? (
            <motion.div key="result" className="absolute inset-0">
              <ResultPage result={result} onRetake={handleRetake} onClose={onClose} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* aria-live 提示 */}
        <p className="sr-only" aria-live="polite">
          {step === "entrance" ? "入口" : step === "bartender" ? "酒保台" : step === "question" ? "答题中" : step === "sorting" ? "分院帽仪式" : "结果页"}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * 浮动启动按钮 + 模态容器
 * 放在右下角，但避开 EagleMascot（EagleMascot 也占右下）—— 我们放左下。
 * 也不要和 ScrollProgress（顶部）冲突。
 */
export function YztiLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-full border border-amber-300/40 bg-[#2a1816]/95 px-4 py-2.5 font-serif-cn text-sm font-bold text-amber-200 shadow-lg shadow-black/30 backdrop-blur-md transition hover:scale-[1.04] hover:bg-[#3b1f1c] md:bottom-7 md:left-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ y: -2 }}
        aria-label="打开英仔公益人格测试"
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">YZTI · 测一下你的公益人格</span>
        <span className="sm:hidden">YZTI</span>
      </motion.button>

      <AnimatePresence>
        {open ? <YztiTest open={open} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

export default YztiLauncher;
