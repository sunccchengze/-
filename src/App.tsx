import {
  About,
  Departments,
  FAQ,
  FloatingChrome,
  Footer,
  Hero,
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
        <Hero />
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
