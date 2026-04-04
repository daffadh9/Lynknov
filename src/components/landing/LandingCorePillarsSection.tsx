"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RevealWrapper } from "@/components/animations/RevealWrapper";
import {
  businessGrowthPillars,
  type BusinessGrowthPillarId,
} from "./business-growth-pillars";
import { PillarPreviewSurface } from "./PillarPreviewSurface";

const defaultPillar = businessGrowthPillars[0].id;

export function LandingCorePillarsSection() {
  const [activeId, setActiveId] = useState<BusinessGrowthPillarId>(defaultPillar);
  const activePillar =
    businessGrowthPillars.find((pillar) => pillar.id === activeId) ?? businessGrowthPillars[0];

  return (
    <section className="section-space section-divider-soft relative overflow-hidden border-t border-white/5 bg-[linear-gradient(180deg,#09090a_0%,#0d0d10_40%,#09090a_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid-soft absolute inset-0 opacity-[0.05]"></div>
        <div className="ambient-drift absolute left-[8%] top-12 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_72%)] blur-[150px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-12">
        <RevealWrapper direction="up" className="section-intro max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/68 backdrop-blur-md">
            5 Core Pillars
          </div>
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
            Lebih Dari Sekadar Bio Tool
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
            Lynknov dirancang untuk membantu Anda tampil profesional, menunjukkan kualitas, membuka monetisasi, membangun peluang, dan menjalankan pertumbuhan dalam satu sistem yang terasa lebih jelas.
          </p>
        </RevealWrapper>

        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start xl:gap-6">
          <RevealWrapper direction="right" delay={0.05}>
            <div className="panel-premium-soft rounded-[28px] p-2.5 backdrop-blur-md sm:rounded-[30px] sm:p-3">
              <div className="px-3 py-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Pilih salah satu pilar untuk melihat preview dan fokus nilai utamanya.
              </div>
              <div className="grid gap-2">
                {businessGrowthPillars.map((pillar) => {
                  const isActive = pillar.id === activeId;

                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(pillar.id)}
                      onFocus={() => setActiveId(pillar.id)}
                      className={`hover-lift-soft rounded-[22px] border px-4 py-4 text-left transition-all duration-500 ${
                        isActive
                          ? "border-white/18 bg-white/[0.08] shadow-[0_16px_40px_-30px_rgba(255,255,255,0.18)]"
                          : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/38">{pillar.number}</div>
                      <div className="mt-2 text-base font-medium text-white">{pillar.name}</div>
                      <div className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {pillar.selectorDescription}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={0.1} className="xl:sticky xl:top-28">
            <div className="panel-premium rounded-[30px] p-4 sm:p-5 md:rounded-[34px] md:p-6 lg:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-6 md:gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-center"
                >
                  <div className="order-2 xl:order-1">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                      {activePillar.eyebrow}
                    </div>
                    <h3 className="mt-4 text-3xl font-medium leading-tight text-white md:text-4xl">
                      {activePillar.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
                      {activePillar.shortDefinition}
                    </p>

                    <div className="mt-7 grid max-w-md gap-2.5 sm:mt-8 sm:gap-3">
                      {activePillar.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-white/82 md:text-base">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60"></span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                      {activePillar.outcomeLine}
                    </p>
                  </div>

                  <div className="order-1 xl:order-2">
                    <PillarPreviewSurface pillarId={activePillar.id} compact />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </RevealWrapper>
        </div>

        <RevealWrapper direction="up" delay={0.16} className="panel-premium-soft mt-6 flex flex-col items-start justify-between gap-5 rounded-[24px] px-5 py-5 backdrop-blur-sm sm:px-6 md:mt-8 md:flex-row md:items-center md:rounded-[26px]">
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
            Lynknov membantu Anda bukan hanya terlihat rapi di depan, tetapi juga terasa lebih siap untuk dipercaya dan dipilih.
          </p>
          <Link
            href="/features"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.10]"
          >
            Eksplor Halaman Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}

