import {
  About,
  Departments,
  FAQ,
  FloatingChrome,
  Footer,
  HonorMarquee,
  Honors,
  JoinCTA,
  Leadership,
  MemberVoices,
  Navigation,
  ScrollProgress,
  SocialMedia,
  Statistics,
  SummerPractice,
  TrustBar,
  WhyJoin,
} from "./components";
import { HeroPreview } from "./components/HeroPreview";
import { HeroV2Pro } from "./components/HeroV2Pro";

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
        <Statistics />
        <HonorMarquee />
        <SummerPractice />
        <MemberVoices />
        <Leadership />
        <WhyJoin />
        <Honors />
        <Departments />
        <SocialMedia />
        <JoinCTA />
        <FAQ />
      </main>
      <Footer />
      <FloatingChrome />
    </>
  );
}
