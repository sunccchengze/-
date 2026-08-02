import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LINK_报名 as joinLink, IMG_LOGO } from "../config";
import { brand, hero, navLinks } from "../content";

export function Navigation() {
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
              校级五星级 · 2026 秋招
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

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-[#1e1210]/96 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`min-h-12 px-4 py-3 font-serif-cn text-2xl font-bold ${
                    active === link.href ? "text-rose" : "text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white mx-auto mt-6 px-10 py-4"
                onClick={() => setOpen(false)}
              >
                {hero.primaryCta}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
