import { Suspense, lazy } from "react";
import {
  About,
  EagleMascot,
  Footer,
  HonorMarquee,
  JoinCTA,
  Leadership,
  Navigation,
  NewcomerPath,
  ScrollProgress,
  SocialMedia,
  Statistics,
  SummerPractice,
  TrustBar,
} from "./components";
import { HeroPreview } from "./components/HeroPreview";
import { HeroV2Pro } from "./components/HeroV2Pro";
import { YztiLauncher } from "./components/YztiTest";

/**
 * 方案 B：对首屏以下交互较重、包含大量大图/弹窗/视频背景的模块进行 React.lazy 懒加载与 Suspense 分割。
 * 显著缩短移动端首屏加载时的主线程渲染阻塞时长（TBT / FCP 极速提升）。
 */
const SummerFilms = lazy(() => import("./components/SummerFilms").then((m) => ({ default: m.SummerFilms })));
const MemberVoices = lazy(() => import("./components/MemberVoices").then((m) => ({ default: m.MemberVoices })));
const WhyJoin = lazy(() => import("./components/WhyJoin").then((m) => ({ default: m.WhyJoin })));
const Honors = lazy(() => import("./components/Honors").then((m) => ({ default: m.Honors })));
const Departments = lazy(() => import("./components/Departments").then((m) => ({ default: m.Departments })));
const FAQ = lazy(() => import("./components/FAQ").then((m) => ({ default: m.FAQ })));

function SectionSkeleton({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center bg-cream px-4 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-2 w-16 animate-pulse rounded-full bg-rouge/20" />
        {label && <span className="font-serif-cn text-xs font-bold tracking-widest text-muted/60">{label}</span>}
      </div>
    </div>
  );
}

/**
 * 正常访问只展示正式首页；仅在 ?preview=hero 时开放 5 版首屏比较器。
 * 避免内部设计工具误出现在面向新生的招新页面。
 */
const isHeroPreview = new URLSearchParams(window.location.search).get("preview") === "hero";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-rouge-deep"
      >
        跳到主要内容
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        {isHeroPreview ? <HeroPreview /> : <HeroV2Pro />}
        <TrustBar />
        <About />
        <NewcomerPath />
        <Statistics />
        <HonorMarquee />
        <SummerPractice />
        <Suspense fallback={<SectionSkeleton label="影像纪录加载中..." />}>
          <SummerFilms />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="心声载入中..." />}>
          <MemberVoices />
        </Suspense>
        <Leadership />
        <Suspense fallback={<SectionSkeleton label="加入理由载入中..." />}>
          <WhyJoin />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="荣誉高光加载中..." />}>
          <Honors />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="部门全景加载中..." />}>
          <Departments />
        </Suspense>
        <SocialMedia />
        <JoinCTA />
        <Suspense fallback={<SectionSkeleton label="问答载入中..." />}>
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      <EagleMascot />
      <YztiLauncher />
    </>
  );
}
