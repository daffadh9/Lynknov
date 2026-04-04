"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

const journeySteps = [
  {
    step: "01",
    title: "Discover",
    desc: "Klien menemukan link Anda dari sosial media, rekomendasi, atau hasil pencarian.",
    detail:
      "Kesan pertama terbentuk sangat cepat. Karena itu tahap discover harus langsung terasa rapi, relevan, dan membuat orang ingin masuk lebih jauh, bukan berhenti di permukaan.",
  },
  {
    step: "02",
    title: "Understand",
    desc: "Mereka memahami value, positioning, dan layanan Anda dalam hitungan detik.",
    detail:
      "Saat struktur informasi disusun dengan tepat, orang tidak perlu menebak-nebak lagi. Mereka lebih cepat paham siapa Anda, apa yang ditawarkan, dan kenapa hal itu layak dipertimbangkan.",
  },
  {
    step: "03",
    title: "Trust",
    desc: "Portfolio, bukti kualitas, dan testimoni membantu membangun keyakinan.",
    detail:
      "Trust lahir dari presentasi yang matang. Saat karya, proof, dan social proof terasa menyatu, keputusan untuk melanjutkan percakapan jadi jauh lebih ringan.",
  },
  {
    step: "04",
    title: "Action",
    desc: "Pengunjung diarahkan ke CTA yang paling masuk akal untuk mulai bekerja sama.",
    detail:
      "Dari inquiry, booking, hingga pembelian, CTA yang jelas membuat attention tidak berhenti sebagai impresi, tetapi bergerak menjadi peluang nyata dan potensi omzet.",
  },
];

export function JourneyAccordionSection() {
  const [activeStep, setActiveStep] = useState<string | null>(journeySteps[0].step);

  return (
    <section className="section-space section-divider-soft relative overflow-hidden border-y border-white/5 bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-grid-soft absolute inset-0 opacity-[0.05]"></div>
        <div className="absolute left-1/2 top-0 h-[340px] w-[760px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.09)_0%,transparent_68%)] blur-[80px]"></div>
        <div className="ambient-drift absolute bottom-[-12%] left-[10%] h-[360px] w-[360px] rounded-full bg-white/[0.04] blur-[120px]"></div>
        <div className="ambient-drift-reverse absolute bottom-[-18%] right-[10%] h-[420px] w-[420px] rounded-full bg-white/[0.03] blur-[130px]"></div>
      </div>

      <RevealWrapper direction="up" className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-12">
        <div className="section-intro text-center">
          <h2 className="mb-6 text-3xl font-medium tracking-tight text-white md:text-5xl">
            Dari klik pertama, hingga closing.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Alur yang dirancang untuk mengubah impresi menjadi transaksi.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {journeySteps.map((item, index) => {
            const isOpen = activeStep === item.step;

            return (
              <RevealWrapper key={item.step} direction="up" delay={0.08 + index * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setActiveStep(isOpen ? null : item.step)}
                  className={`hover-lift-soft group flex h-full w-full flex-col rounded-[28px] border p-5 text-left transition-all duration-500 sm:rounded-[30px] sm:p-6 ${
                    isOpen
                      ? "border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(18,18,21,0.94)_100%)] shadow-[0_26px_70px_-38px_rgba(255,255,255,0.16)]"
                      : "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(10,10,12,0.92)_100%)] hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(10,10,12,0.94)_100%)]"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#121214] text-base font-medium text-white shadow-xl transition-transform duration-500 group-hover:scale-[1.03] sm:h-16 sm:w-16 sm:text-lg">
                      {item.step}
                    </div>
                    <div
                      className={`rounded-full border p-2.5 transition-all duration-500 ${
                        isOpen ? "border-white/18 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.03] text-white/55"
                      }`}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </div>
                  </div>

                  <div className="mb-3 text-lg font-medium text-white">{item.title}</div>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.desc}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <div className="pt-5 text-sm leading-relaxed text-white/72">{item.detail}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </RevealWrapper>
            );
          })}
        </div>
      </RevealWrapper>
    </section>
  );
}

