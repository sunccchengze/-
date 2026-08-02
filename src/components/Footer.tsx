import { IMG_LOGO, IMG_报名二维码, IMG_招新群二维码, IMG_第10页背景 } from "../config";
import { brand, footer, navLinks } from "../content";
import { FlippingQRBlock } from "./FlippingQRBlock";

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
            <div className="flex flex-wrap items-center gap-6">
              <figure className="text-center">
                <div className="glass-panel rounded-xl bg-white p-2 ring-1 ring-white/30">
                  <img
                    src={IMG_报名二维码}
                    alt="扫码报名"
                    className="h-[110px] w-[110px] rounded-lg bg-white object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-xs font-medium text-white/80">扫码报名</figcaption>
              </figure>
              <FlippingQRBlock qrSrc={IMG_招新群二维码} label="点击查看群号" />
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
