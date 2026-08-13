import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IMG_第9页背景 } from "../config";
import { faqs } from "../content";
import { SectionHeader } from "./SectionHeader";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const lenis = useLenis();

  const toggleFaq = (index: number) => {
    const nextOpen = openIndex === index ? -1 : index;
    setOpenIndex(nextOpen);
    if (nextOpen !== -1) {
      setTimeout(() => {
        const target = document.getElementById(`faq-q-${index}`);
        if (!target) return;

        if (lenis) {
          const bounds = target.getBoundingClientRect();
          const centeredTop = window.scrollY + bounds.top - (window.innerHeight - bounds.height) / 2;
          lenis.scrollTo(centeredTop);
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 220);
    }
  };

  return (
    <section id="faq" className="bg-shell section-block">
      <img src={IMG_第9页背景} alt="" aria-hidden="true" className="bg-image" loading="lazy" decoding="async" />
      <div className="bg-veil veil-blush" />
      <div className="section-container">
        <SectionHeader
          eyebrow="FAQ"
          title="新生最常问"
          subtitle="时间、部门、零基础——把顾虑留在报名之前"
        />
        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <motion.article
                key={item.question}
                className={`overflow-hidden rounded-2xl bg-white/85 backdrop-blur-md transition ${
                  open
                    ? "border border-rouge/20 border-t-2 border-t-rouge shadow-lg shadow-rouge/10"
                    : "border border-transparent border-t-2 border-t-transparent hover:border-rouge/10"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-6 p-6 text-left font-serif-cn text-lg font-medium text-ink md:text-xl"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={open}
                  aria-controls={`faq-a-${index}`}
                  id={`faq-q-${index}`}
                >
                  {item.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-rouge transition ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <p
                        id={`faq-a-${index}`}
                        role="region"
                        aria-labelledby={`faq-q-${index}`}
                        className="px-6 pb-6 text-base leading-[1.85] text-muted"
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
