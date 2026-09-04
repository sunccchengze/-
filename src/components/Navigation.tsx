import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { LINK_报名 as joinLink, IMG_LOGO } from "../config";
import { brand, hero, navLinks } from "../content";

export function Navigation() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();

    return () => {
      document.body.style.overflow = "";
      if (open) lenis?.start();
    };
  }, [lenis, open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMobileAnchor = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!lenis) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => lenis.scrollTo(href, { force: true }));
  };

  /* 滚动监听：高亮当前 section（impeccable · interaction） */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.08, 0.2, 0.4] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-[#2a1816]/90 shadow-lg shadow-black/15 backdrop-blur-xl"
            : "border-b border-white/10 bg-[#2a1816]/78 shadow-sm shadow-black/10 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[72px] md:px-6">
          <a href="#top" className="focus-ring flex items-center gap-2.5 rounded-full text-white">
            <img
              src={IMG_LOGO}
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/25"
            />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-serif-cn text-lg font-bold tracking-wide">{brand.name}</span>
              <span className="hidden text-[10px] tracking-[0.14em] text-white/55 sm:inline">
                校级五星级 · 2026 招新
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-2.5 lg:flex lg:gap-4 xl:gap-5" aria-label="主导航">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link whitespace-nowrap text-xs text-white/85 xl:text-[13px] ${
                  active === link.href ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white px-4 py-2 text-sm xl:px-5 xl:py-2.5"
            >
              立即报名
            </a>
          </nav>

          {/* md 断点：折叠部分导航，只留报名 + 菜单 */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white hidden px-4 py-2 text-sm md:inline-flex"
            >
              报名
            </a>
            <button
              type="button"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-white"
              aria-label={open ? "关闭菜单" : "打开菜单"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 移动端菜单"半屏底部抽屉"：render 在 header 外部,避免被 header 容器裁切。
          上半屏露出原页面顶部,下半屏是抽屉。 */}
      <AnimatePresence>
        {open ? (
          <MobileMenuPage
            active={active}
            onAnchorClick={handleMobileAnchor}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  移动端菜单"半屏底部抽屉"：从底部弹出,只占下半屏,
 *  上半屏仍能看到原页面内容。点 X 或任一链接关闭。
 *  数据来源：navLinks。
 * ───────────────────────────────────────────────────────────── */

type MobileMenuPageProps = {
  active: string;
  onAnchorClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
};

function MobileMenuPage({ active, onAnchorClick, onClose }: MobileMenuPageProps) {
  return (
    <>
      {/* 上半屏：半透明遮罩（露出原页面顶部），点空白处关闭 */}
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[42vh] bg-black/35 backdrop-blur-sm lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 下半屏：抽屉式菜单页 */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="移动端导航菜单"
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[75vh] flex-col rounded-t-3xl bg-[#1e1210] text-white shadow-[0_-24px_60px_rgba(0,0,0,0.45)] lg:hidden"
        data-lenis-prevent
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 400) onClose();
        }}
      >
        {/* 抽屉把手：提示可下拉关闭 */}
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-12 rounded-full bg-white/25" />
        </div>

        {/* 顶部条：面包屑 + 关闭按钮 */}
        <div className="flex items-center justify-between px-5 pb-2 pt-3">
          <span className="text-[11px] font-medium tracking-[0.2em] text-white/55">
            导航 · NAVIGATION
          </span>
          <button
            type="button"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-white"
            aria-label="关闭菜单"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 头部：LOGO + 社团名 */}
        <div className="flex items-center gap-3 px-5 pb-3">
          <img
            src={IMG_LOGO}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/25"
          />
          <div className="min-w-0">
            <h2 className="font-serif-cn text-lg font-bold tracking-wide">{brand.name}</h2>
            <p className="text-[11px] leading-5 text-white/55">{brand.motto}</p>
          </div>
        </div>

        {/* 主体：8 个 section，2 列网格 */}
        <nav
          aria-label="主导航 · 移动端"
          className="flex-1 overflow-y-auto px-5 pb-2"
        >
          <ul className="grid grid-cols-2 gap-2.5">
            {navLinks.map((link, idx) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => onAnchorClick(e, link.href)}
                    className={`flex h-full flex-col items-start rounded-2xl border px-3.5 py-3 transition ${
                      isActive
                        ? "border-rose/60 bg-rose/10"
                        : "border-white/12 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/45">
                      0{idx + 1}
                    </span>
                    <span className="mt-0.5 font-serif-cn text-[15px] font-bold text-white">
                      {link.label}
                    </span>
                    <span className="mt-0.5 text-[10px] leading-4 text-white/55">
                      {link.desc}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 底部：全宽立即报名 CTA */}
        <div className="border-t border-white/10 bg-[#1e1210] px-5 pb-7 pt-3">
          <a
            href={joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white block w-full px-6 py-3.5 text-center text-[15px]"
            onClick={onClose}
          >
            {hero.primaryCta}
          </a>
        </div>
      </motion.div>
    </>
  );
}
