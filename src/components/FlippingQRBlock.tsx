import { motion } from "framer-motion";
import { ChevronLeft, Users } from "lucide-react";
import { useState } from "react";
import { QQ_招新群号 } from "../config";

/** 页脚招新群入口：正面二维码，翻转后给出可复制群号。 */
export function FlippingQRBlock({ qrSrc }: { qrSrc: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className="focus-ring perspective-1000 relative h-[174px] w-[138px] cursor-pointer rounded-2xl text-left"
      onClick={() => setFlipped((value) => !value)}
      aria-label="点击翻转查看QQ招新群号"
      aria-pressed={flipped}
    >
      <motion.div className="preserve-3d relative h-full w-full" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
        <div className="backface-hidden absolute inset-0 flex flex-col items-center rounded-2xl border border-white/25 bg-[#191313]/45 p-2.5 shadow-[0_14px_32px_rgba(0,0,0,0.22)] backdrop-blur-md">
          <div className="overflow-hidden rounded-xl ring-1 ring-white/25">
            <img src={qrSrc} alt="招新QQ群二维码" className="h-[116px] w-[116px] object-contain" loading="lazy" />
          </div>
          <div className="mt-2 w-full px-1 text-center">
            <p className="text-[10px] font-medium tracking-[0.14em] text-white/55">2026 招新群</p>
            <p className="mt-0.5 text-xs font-bold text-white">点击查看群号</p>
          </div>
        </div>
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-gold-soft/45 bg-[linear-gradient(145deg,rgba(112,61,55,0.98),rgba(50,31,30,0.98))] px-3 text-white shadow-[0_14px_32px_rgba(0,0,0,0.25)]">
          <Users className="h-6 w-6 text-gold-soft" strokeWidth={1.5} aria-hidden="true" />
          <p className="mt-2 text-[10px] font-bold tracking-[0.16em] text-white/65">QQ 招新群</p>
          <p className="mt-3 select-all rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 font-data text-sm font-bold tracking-wide">{QQ_招新群号}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[10px] text-white/55"><ChevronLeft className="h-3 w-3" /> 点击翻回二维码</span>
        </div>
      </motion.div>
    </button>
  );
}
