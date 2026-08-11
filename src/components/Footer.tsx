import { motion } from "framer-motion";
import { useState } from "react";
import { IMG_LOGO, IMG_报名二维码, IMG_招新群二维码, IMG_孙承泽头像, IMG_第10页背景 } from "../config";
import { brand, footer, navLinks } from "../content";
import { FlippingQRBlock } from "./FlippingQRBlock";

function SunChengzeAvatarCard() {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("rzwxtp");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="mt-8 border-t border-white/15 pt-6">
      <p className="mb-3 text-xs font-bold tracking-widest text-[#f6e5ba]">
        朋辈指引 · 点击学长头像获取微信号直接交流：
      </p>
      <div
        onClick={() => setFlipped((v) => !v)}
        className="cursor-pointer select-none rounded-2xl border border-gold-soft/30 bg-[#2a1c18]/80 p-4 transition hover:border-gold-soft/60"
      >
        {!flipped ? (
          <div className="flex items-center gap-4">
            <img
              src={IMG_孙承泽头像}
              alt="孙承泽头像"
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-gold-soft/70 shadow-lg"
            />
            <div>
              <p className="font-serif-cn text-sm font-bold text-white">孙承泽 · 宣传部部长</p>
              <p className="mt-0.5 text-xs text-white/60">能动强基 2501 · 点击翻转名片直联微信</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif-cn text-xs font-bold text-[#f6e5ba]">XJTU YINGZAI 2026 · 学长直联</span>
              <span className="text-[10px] text-white/50">点击卡片返回头像</span>
            </div>
            <p className="font-serif-cn text-sm font-bold text-white">
              孙承泽 ｜ 宣传部部长 ｜ 能动强基 2501
            </p>
            <p className="text-xs text-white/80">
              微信号：<strong className="font-data text-gold-soft">rzwxtp</strong>
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="focus-ring mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-white"
            >
              {copied ? "✓ 已复制微信号！去微信加好友" : "一键复制微信号 rzwxtp"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-shell px-6 py-20 pb-10 text-white">
      <img src={IMG_第10页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-dark" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="grid items-start gap-12 md:grid-cols-[1.2fr_0.8fr_1.2fr] md:gap-[60px]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={IMG_LOGO}
                alt={`${brand.name} Logo`}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-white/30"
              />
              <h2 className="font-serif-cn text-[28px] font-bold">{brand.name}</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">{brand.motto}</p>
            <p className="mt-2 text-sm text-white/55">{footer.guidance}</p>
            <p className="mt-3 text-sm text-rouge-mist">
              自 {brand.founded} 年起 · {brand.members} 位伙伴在路上
            </p>
            <SunChengzeAvatarCard />
          </div>
          <div>
            <h3 className="mb-5 font-medium text-white">快速链接</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 font-medium text-white">联系我们</h3>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <figure className="flex h-[174px] w-[138px] flex-col items-center rounded-2xl border border-white/25 bg-[#191313]/45 p-2.5 shadow-[0_14px_32px_rgba(0,0,0,0.22)] backdrop-blur-md">
                <div className="overflow-hidden rounded-xl ring-1 ring-white/25">
                  <img src={IMG_报名二维码} alt="扫码报名" className="h-[116px] w-[116px] object-contain" loading="lazy" />
                </div>
                <figcaption className="mt-2 w-full px-1 text-center">
                  <span className="block text-[10px] font-medium tracking-[0.14em] text-white/55">在线报名表</span>
                  <span className="mt-0.5 block text-xs font-bold text-white">扫码报名</span>
                </figcaption>
              </figure>
              <FlippingQRBlock qrSrc={IMG_招新群二维码} />
            </div>
          </div>
        </div>
        <div className="mt-16 space-y-2 border-t border-white/10 pt-8 text-center text-xs text-white/60">
          <p>{footer.rights}</p>
          <p>{footer.contact}</p>
          <p>{footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
