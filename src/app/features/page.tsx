import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { RevealWrapper } from "@/components/animations/RevealWrapper";
import { Footer } from "@/components/layout/Footer";
import { PublicSiteHeader } from "@/components/layout/PublicSiteHeader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PillarPreviewSurface } from "@/components/landing/PillarPreviewSurface";
import { businessGrowthPillars } from "@/components/landing/business-growth-pillars";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Pelajari 5 pilar inti Lynknov sebagai Business Growth System untuk identitas digital, portfolio, monetisasi, lead generation, dan workflow marketing.",
  alternates: {
    canonical: "/features",
  },
};

const systemLogic = [
  "Tampil profesional",
  "Tunjukkan kualitas",
  "Tawarkan nilai",
  "Bangun peluang",
  "Dorong pertumbuhan",
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[var(--color-surface-base)] selection:bg-white/20 selection:text-white">
      <ScrollProgress />
      <PublicSiteHeader activeHref="/features" />

      <main className="flex-1 pt-20 md:pt-24">
        <section className="relative overflow-hidden px-6 pb-28 pt-24 md:pt-32 lg:px-12 lg:pb-36">
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-grid-soft absolute inset-0 opacity-[0.05]"></div>
            <div className="ambient-drift absolute left-[8%] top-[10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-[170px]"></div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <RevealWrapper direction="up" className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/68 backdrop-blur-md">
                Business Growth System
              </div>
              <h1 className="mb-6 text-5xl font-medium leading-[1.04] tracking-tight text-white md:text-6xl lg:text-[4.5rem]">
                Lebih Dari Sekadar Bio Tool
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                Lynknov membantu Anda tampil lebih profesional, menunjukkan kualitas, membuka monetisasi, mengelola prospek, dan menjalankan pertumbuhan digital dengan lebih terarah.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/register" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]">
                  Mulai Bangun Halaman Anda
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="#system" className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08]">
                  <Play className="mr-2 h-4 w-4 fill-white" />
                  Lihat Cara Kerjanya
                </Link>
              </div>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={0.12}>
              <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(10,10,12,0.96)_100%)] p-5 shadow-[0_30px_80px_-48px_rgba(0,0,0,0.96)] md:p-6">
                <PillarPreviewSurface pillarId="interactive-business-os" />
                <div className="mt-5 flex flex-wrap gap-2">
                  {businessGrowthPillars.map((pillar) => (
                    <div key={pillar.id} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65">
                      {pillar.name}
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </section>

        <section id="system" className="relative overflow-hidden border-t border-white/5 py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-grid-fine absolute inset-0 opacity-[0.05]"></div>
            <div className="ambient-drift absolute left-[6%] top-[6%] h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[140px]"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
            <RevealWrapper direction="up" className="max-w-3xl">
              <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">Satu Sistem, Lima Pilar Inti</div>
              <h2 className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl">
                Dirancang Untuk Tampil, Meyakinkan, Menjual, dan Bertumbuh
              </h2>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                Lynknov bukan hanya tempat menaruh link. Ia menjadi sistem yang membantu identitas digital, proof, monetisasi, peluang, dan workflow marketing terasa lebih terhubung.
              </p>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={0.08} className="mt-12">
              <div className="grid gap-3 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(9,9,11,0.94)_100%)] p-4 backdrop-blur-sm md:grid-cols-5">
                {systemLogic.map((item, index) => (
                  <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/38">0{index + 1}</div>
                    <div className="mt-2 text-sm font-medium leading-relaxed text-white/85">{item}</div>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </section>

        {businessGrowthPillars.map((pillar, index) => {
          const reverse = index % 2 === 1;

          return (
            <section key={pillar.id} id={pillar.id} className="relative overflow-hidden border-t border-white/5 py-28 scroll-mt-28">
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute ${reverse ? "left-[-8%] top-[14%]" : "right-[-8%] top-[10%]"} h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_72%)] blur-[170px]`}></div>
              </div>
              <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-12">
                <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
                  <RevealWrapper direction={reverse ? "left" : "right"} className={reverse ? "order-2 xl:order-1" : "order-2 xl:order-1"}>
                    <div className="max-w-xl">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">{pillar.eyebrow}</div>
                      <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                        {pillar.name}
                      </h2>
                      <p className="mt-5 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                        {pillar.shortDefinition}
                      </p>
                      <div className="mt-8 grid gap-3 max-w-md">
                        {pillar.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-white/82 md:text-base">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60"></span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-8 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                        {pillar.outcomeLine}
                      </p>
                    </div>
                  </RevealWrapper>

                  <RevealWrapper direction={reverse ? "right" : "left"} className={reverse ? "order-1 xl:order-2" : "order-1 xl:order-2"}>
                    <PillarPreviewSurface pillarId={pillar.id} compact />
                  </RevealWrapper>
                </div>
              </div>
            </section>
          );
        })}

        <section className="relative overflow-hidden border-t border-white/5 py-32">
          <div className="pointer-events-none absolute inset-0 bg-black"></div>
          <div className="bg-grid-soft absolute inset-0 opacity-[0.05] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 h-[420px] w-[960px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08)_0%,transparent_62%)] pointer-events-none"></div>

          <div className="relative z-10 mx-auto max-w-[960px] px-6 text-center">
            <RevealWrapper direction="up">
              <h2 className="mb-6 text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Bangun Fondasi Digital Yang Tidak Hanya Tampil Baik, Tapi Juga Bisa Bertumbuh
              </h2>
              <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                Dengan lima pilar inti yang saling terhubung, Lynknov membantu Anda membangun identitas digital, menunjukkan kualitas, membuka jalur monetisasi, mengelola peluang, dan menjalankan pertumbuhan dalam satu sistem yang lebih modern.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]">
                  Mulai Dengan Lynknov
                </Link>
                <Link href="#interactive-business-os" className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08]">
                  Eksplor Fitur Intinya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </RevealWrapper>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
