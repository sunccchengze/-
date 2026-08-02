import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useState } from "react";
import { QQ_招新群号 } from "../config";

/** 历史占位群号；真群号写入 config 后自动展示数字 */
const PLACEHOLDER_QQ = "123456789";
const isPlaceholderQQ = !QQ_招新群号 || String(QQ_招新群号) === PLACEHOLDER_QQ;

export function FlippingQRBlock({ qrSrc, label }: { qrSrc: string; label: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className="focus-ring perspective-1000 relative h-[164px] w-[120px] cursor-pointer rounded-xl text-left"
      onClick={() => setFlipped((v) => !v)}
      aria-label="点击翻转查看QQ招新群号"
      aria-pressed={flipped}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        // CSS reduced-motion globally collapses duration
      >
        <div className="backface-hidden glass-panel absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white p-2 ring-1 ring-white/30">
          <img
            src={qrSrc}
            alt={label}
            className="h-[110px] w-[110px] rounded-lg bg-white object-contain"
            loading="lazy"
          />
          <p className="mt-2 text-center text-xs font-medium text-muted">{label}</p>
        </div>
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-warm-gradient p-3 text-white shadow-lg shadow-rouge/20">
          <Users className="mb-2 h-6 w-6" aria-hidden="true" />
          <p className="font-serif-cn text-xs font-bold tracking-wider">QQ招新群</p>
          <div className="my-2 h-px w-8 bg-white/40" />
          {isPlaceholderQQ ? (
            <p className="px-1 text-center text-[11px] leading-snug text-white/95">
              群号以招新现场
              <br />
              与公众号为准
            </p>
          ) : (
            <p className="select-all rounded bg-white/20 px-2 py-1 text-center font-data text-sm font-bold">
              {QQ_招新群号}
            </p>
          )}
          <p className="mt-1 text-center text-[10px] text-white/70">
            {isPlaceholderQQ ? "也可扫正面二维码" : "长按可复制群号"}
          </p>
        </div>
      </motion.div>
    </button>
  );
}

export { isPlaceholderQQ };
