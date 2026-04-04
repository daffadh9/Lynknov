import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  Briefcase,
  MousePointerClick,
  CheckCircle2,
  User,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  XCircle,
  ChevronRight,
  Star,
  Play
} from "lucide-react";
import Image from "next/image";
import { RevealWrapper } from "@/components/animations/RevealWrapper";
import { JourneyAccordionSection } from "@/components/landing/JourneyAccordionSection";
import { LandingCorePillarsSection } from "@/components/landing/LandingCorePillarsSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { PublicSiteHeader } from "@/components/layout/PublicSiteHeader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const trustStripItems: readonly string[] = [
  "Freelancer",
  "Creative Studio",
  "Consultant",
  "Coach",
  "Personal Brand",
  "Service Business",
  "Agency",
  "Creator",
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface-base)] overflow-hidden selection:bg-white/20 selection:text-white">
      <ScrollProgress />
      <PublicSiteHeader />

      <main className="flex-1 pt-20 md:pt-24 pb-0">
        
        {/* 2. HERO SECTION - Cinematic & Memorable */}
        <section className="relative w-full pt-20 pb-32 md:pt-32 md:pb-40 overflow-visible">
          {/* Ambient Background & Lighting */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Base atmospheric gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04)_0%,transparent_70%)]"></div>
            {/* Cinematic breathing glow behind text */}
            <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[120px] animate-[pulse-slow_10s_ease-in-out_infinite]"></div>
            {/* Stronger spotlight from top right for product illumination */}
            <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] blur-[80px]"></div>
          </div>

          <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
            {/* Asymmetrical Grid: 1fr text, 1fr visual to give preview balance */}
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
              
              {/* Kiri: Copy (Cinematic & Deep, Pushed slightly inward) */}
              <RevealWrapper direction="up" delay={0.1} className="max-w-xl relative lg:pl-4">
                {/* Text Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-medium text-white/80 mb-8 shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="tracking-widest uppercase opacity-90">Tampil Lebih Matang</span>
                </div>
                
                {/* Headline - Typography Emphasis */}
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-6 text-white text-balance drop-shadow-sm">
                  Terlihat saja <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">tidak cukup.</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 text-pretty leading-[1.6] max-w-md font-normal">
                  Yang membedakan adalah bagaimana Anda dipahami. Lynknov membantu menyusun kehadiran digital yang lebih jelas, tenang, dan meyakinkan.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/register" className="h-14 px-8 inline-flex items-center justify-center rounded-full bg-white text-black font-medium text-base hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-400">
                    Mulai Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link href="#showcase" className="h-14 px-8 inline-flex items-center justify-center rounded-full bg-white/5 text-white font-medium text-base hover:bg-white/10 transition-all duration-400 border border-white/10 backdrop-blur-md">
                    <Play className="w-4 h-4 mr-2 fill-white" />
                    Lihat Cara Kerjanya
                  </Link>
                </div>
                
                {/* Microcopy trust */}
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)] font-medium">
                  <div className="flex -space-x-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#121214] bg-[#2a2a2d] overflow-hidden relative z-[4]">
                      <Image src="/images/avatars/avatar-1.jpg" alt="User" width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#121214] bg-[#2a2a2d] overflow-hidden relative z-[3]">
                      <Image src="/images/avatars/avatar-2.jpg" alt="User" width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#121214] bg-[#2a2a2d] overflow-hidden relative z-[2]">
                      <Image src="/images/avatars/avatar-3.jpg" alt="User" width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-9 h-9 rounded-full border-2 border-[#121214] bg-[#2a2a2d] overflow-hidden relative z-[1]">
                      <Image src="/images/avatars/avatar-4.jpg" alt="User" width={36} height={36} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className="text-white/70">Dipercaya <span className="text-white font-semibold">1.000+</span> profesional digital</p>
                </div>
              </RevealWrapper>
              
              {/* Kanan: Cinematic Product Preview (Massive, Overlapping, Layered) */}
              <RevealWrapper direction="up" delay={0.2} duration={1}>
                <div className="relative mt-12 flex h-[620px] w-full justify-center lg:mt-0 lg:h-[760px] lg:justify-end perspective-1500">
                  <div
                    aria-hidden="true"
                    className="hero-halo absolute left-1/2 top-14 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_35%,transparent_72%)] opacity-80 blur-3xl"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="hero-orbit-ring absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/[0.08]"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="hero-orbit-ring absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/[0.04]"
                    style={{ animationDuration: "26s", animationDirection: "reverse" }}
                  ></div>
                  <div
                    aria-hidden="true"
                    className="hero-device-shadow absolute bottom-4 left-1/2 h-20 w-[320px] -translate-x-1/2 rounded-full bg-black/80 blur-[28px] lg:bottom-8 lg:w-[380px]"
                  ></div>

                  <div className="absolute inset-0 translate-x-2 transform-3d sm:translate-x-4 lg:-translate-x-12 lg:scale-105">
                    <div className="hero-device-rig absolute inset-0 isolate transform-3d">
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-12 h-[82%] w-[115%] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[70px]"
                      ></div>

                      <div className="absolute left-1/2 top-0 -translate-x-1/2 transform-3d">
                        <div className="hero-device-shell relative z-10 flex h-[640px] w-[320px] flex-col overflow-hidden rounded-[36px] border-[8px] border-[#1a1a1d] bg-[#070708] shadow-[0_45px_120px_-26px_rgba(0,0,0,0.95),0_16px_48px_-28px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-[700px] sm:w-[360px] lg:h-[780px] lg:w-[400px]">
                          <div
                            aria-hidden="true"
                            className="absolute inset-[1px] rounded-[28px] border border-white/10 opacity-80"
                          ></div>
                          <div
                            aria-hidden="true"
                            className="hero-light-sweep pointer-events-none absolute inset-y-10 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                          ></div>
                          <div
                            aria-hidden="true"
                            className="hero-inner-orb absolute -right-12 top-20 h-48 w-36 rounded-full bg-white/[0.08] blur-[70px]"
                          ></div>
                          <div
                            aria-hidden="true"
                            className="hero-screen-glow absolute left-1/2 top-16 h-24 w-[68%] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[52px]"
                          ></div>

                          <div className="relative z-10 flex h-8 w-full items-center justify-between bg-black/50 px-6 pt-2 backdrop-blur-md">
                            <div className="h-3 w-12 rounded-full bg-white/10"></div>
                            <div className="h-4 w-16 rounded-full bg-black"></div>
                            <div className="flex gap-1">
                              <div className="h-3 w-3 rounded-full bg-white/10"></div>
                              <div className="h-3 w-5 rounded-full bg-white/10"></div>
                            </div>
                          </div>

                          <div className="relative flex-1 overflow-y-hidden bg-gradient-to-b from-[#161618] via-[#0e0e11] to-[#070708] p-6">
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/7 via-white/3 to-transparent"
                            ></div>
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute left-8 right-8 top-20 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                            ></div>

                            <div className="relative z-10 mb-8 mt-6 flex flex-col items-center text-center">
                              <div className="mb-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white/60 backdrop-blur-md">
                                Signature Profile
                              </div>
                              <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-tr from-white/30 via-white/10 to-white/5 p-[2px] shadow-[0_15px_35px_-18px_rgba(255,255,255,0.55)]">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                                  <User className="h-8 w-8 text-white/35" />
                                </div>
                              </div>
                              <div className="mb-2 h-6 w-40 rounded-md bg-white/90"></div>
                              <div className="mb-4 h-4 w-28 rounded-md bg-white/40"></div>
                              <div className="flex gap-2">
                                <div className="h-8 w-20 rounded-full border border-white/10 bg-white/10"></div>
                                <div className="h-8 w-20 rounded-full border border-white/10 bg-white/10"></div>
                              </div>
                            </div>

                            <div className="relative z-10 space-y-4">
                              <div className="relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_38%,rgba(255,255,255,0.02)_100%)] p-4 shadow-[0_22px_40px_-30px_rgba(255,255,255,0.25)]">
                                <div
                                  aria-hidden="true"
                                  className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/8 to-transparent"
                                ></div>
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/12">
                                  <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-2 h-4 w-3/4 rounded bg-white/85"></div>
                                  <div className="h-3 w-1/2 rounded bg-white/40"></div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-white/40" />
                              </div>

                              <div className="flex w-full items-center gap-4 rounded-[24px] border border-white/6 bg-black/35 p-4 backdrop-blur-sm">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/6">
                                  <Briefcase className="h-5 w-5 text-white/50" />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-2 h-4 w-2/3 rounded bg-white/60"></div>
                                  <div className="h-3 w-1/3 rounded bg-white/30"></div>
                                </div>
                              </div>

                              <div className="rounded-[24px] border border-white/6 bg-gradient-to-br from-[#1a1a1d] via-[#111114] to-black p-4 shadow-[0_24px_50px_-35px_rgba(255,255,255,0.18)]">
                                <div className="mb-2 flex gap-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="h-3 w-3 fill-white text-white" />
                                  ))}
                                </div>
                                <div className="mb-1.5 h-3 w-full rounded bg-white/40"></div>
                                <div className="h-3 w-5/6 rounded bg-white/40"></div>
                              </div>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-20 flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-white via-white/95 to-white/85 shadow-[0_14px_44px_-18px_rgba(255,255,255,0.55)]">
                              <div className="h-4 w-32 rounded bg-black"></div>
                            </div>
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-10"
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-0 top-[16%] z-30 sm:-right-2 lg:-right-20">
                        <div
                          className="transform-3d"
                          style={{ transform: "rotateY(-18deg) rotateX(4deg) translateZ(120px)" }}
                        >
                          <div className="hero-card-drift relative w-56 rounded-[28px] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_44%,rgba(8,8,10,0.78)_100%)] p-5 shadow-[0_30px_80px_-26px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:w-64">
                            <div
                              aria-hidden="true"
                              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            ></div>
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <div className="mb-1 text-[10px] uppercase tracking-[0.28em] text-white/45">Total Kunjungan</div>
                                <div className="text-2xl font-medium text-white">12.4k</div>
                              </div>
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-green-400/15 bg-green-400/10">
                                <ArrowUpRight className="h-4 w-4 text-green-400" />
                              </div>
                            </div>
                            <div className="mb-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                            <div className="flex h-12 w-full items-end gap-1.5">
                              {[30, 45, 25, 60, 40, 85, 55].map((h, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-t-[4px] ${i === 5 ? "bg-white" : "bg-white/20"}`}
                                  style={{ height: `${h}%` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-[22%] left-0 z-20 sm:-left-6 lg:-left-20">
                        <div
                          className="transform-3d"
                          style={{ transform: "rotateY(14deg) rotateX(3deg) translateZ(56px)" }}
                        >
                          <div className="hero-card-drift-reverse relative w-52 rounded-[26px] border border-white/10 bg-[linear-gradient(150deg,rgba(18,18,20,0.95)_0%,rgba(18,18,20,0.72)_100%)] p-4 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:w-56">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10">
                                <ShieldCheck className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <div className="mb-0.5 text-sm font-medium text-white">Identitas Valid</div>
                                <div className="text-[10px] text-[var(--color-text-secondary)]">Terverifikasi oleh sistem</div>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"></div>
                              <div className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-emerald-300/80 via-white/20 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </section>

        {/* 3. TRUST STRIP - Premium Marquee */}
        <section className="relative flex flex-col items-center overflow-hidden border-y border-white/5 bg-gradient-to-b from-black/40 via-[#0d0d0f] to-black/20 py-12">
          <div className="absolute inset-0 bg-grid-soft opacity-[0.06] pointer-events-none"></div>
          <div className="ambient-drift absolute left-[12%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[70px] pointer-events-none"></div>
          <div className="ambient-drift-reverse absolute right-[12%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[70px] pointer-events-none"></div>
          <div className="absolute left-0 w-32 lg:w-64 h-full bg-gradient-to-r from-[var(--color-surface-base)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 w-32 lg:w-64 h-full bg-gradient-to-l from-[var(--color-surface-base)] to-transparent z-10 pointer-events-none"></div>

          <div className="flex items-center w-full gap-12 whitespace-nowrap overflow-hidden opacity-60">
            <div className="flex gap-16 items-center animate-[marquee_30s_linear_infinite]">
              {trustStripItems.map((item) => (
                <div key={item} className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  {item}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {trustStripItems.map((item) => (
                <div key={`${item}-dup`} className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROBLEM SECTION - Shifted slightly center for readability */}
        <section className="section-space section-divider-soft relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-grid-soft absolute inset-0 opacity-[0.08]"></div>
            <div className="ambient-drift absolute left-[8%] top-14 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_65%)] blur-[130px]"></div>
            <div className="ambient-drift-reverse absolute bottom-[-14%] right-[-6%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-[160px]"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          <div className="relative mx-auto grid max-w-[1200px] items-start gap-16 px-6 pl-0 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:pl-8">
            <RevealWrapper direction="right" className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.15] text-white">
                Banyak terlihat,<br/>
                <span className="text-[var(--color-text-secondary)]">tapi belum terasa meyakinkan.</span>
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-[1.7] max-w-md font-normal">
                Banyak orang sudah punya audiens, traffic, bahkan perhatian. Tapi ketika orang membuka profil mereka, yang terlihat masih terasa biasa.
                <br/><br/>
                Masalahnya bukan Anda tidak cukup bagus. Masalahnya, kualitas Anda belum tersaji dengan benar.
              </p>
            </RevealWrapper>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Terlihat asal jadi", desc: "Link bio hanya berisi kumpulan tombol tanpa struktur yang jelas, membuat Anda tampak seperti amatir." },
                { title: "Kualitas tak terlihat", desc: "Tidak ada tempat yang benar-benar merepresentasikan kemampuan, karya, atau hasil kerja nyata Anda.", highlight: true },
                { title: "Menebak-nebak", desc: "Calon klien harus mencari tahu sendiri siapa Anda dan layanan apa yang Anda sediakan." },
                { title: "Perhatian berhenti", desc: "Traffic datang berlimpah, tapi tidak ada alur yang mengarah ke aksi atau keputusan konversi." }
              ].map((problem, i) => (
                <RevealWrapper key={i} delay={i * 0.1}>
                  <div className={`p-8 rounded-[24px] transition-all duration-500 group relative overflow-hidden h-full ${problem.highlight ? 'bg-gradient-to-b from-[#1a1a1d] to-[#121214] border border-white/20 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'}`}>
                    {problem.highlight && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full blur-2xl"></div>}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 text-sm font-medium ${problem.highlight ? 'bg-white/10 text-white' : 'bg-black/50 text-white/40 border border-white/10 group-hover:text-white'}`}>
                      0{i+1}
                    </div>
                    <h3 className={`text-lg font-medium mb-3 ${problem.highlight ? 'text-white' : 'text-white/80'}`}>{problem.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{problem.desc}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BEFORE VS AFTER - Visual Storytelling */}
        <section className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
          <RevealWrapper direction="up" className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">Perbedaan yang langsung terasa.</h2>
              <p className="text-[var(--color-text-secondary)] text-lg">Dari tumpukan link acak, menjadi sebuah etalase profesional.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Before */}
              <div className="rounded-3xl bg-[var(--color-surface-base)] border border-white/5 p-8 md:p-12 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 text-white/50 text-sm font-medium mb-8">
                  <XCircle className="w-4 h-4" /> Link Bio Standar
                </div>
                <div className="w-full max-w-[280px] h-[580px] bg-[#121214] rounded-[40px] border-4 border-[#1a1a1d] p-6 flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-4"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                </div>
                
                {/* Comparison Points */}
                <div className="mt-10 flex flex-col gap-3 w-full max-w-[280px]">
                  {[
                    "Link cuma jadi pajangan",
                    "Tampilan monoton",
                    "Alhasil engagement rendah"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/50 text-sm">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="rounded-3xl bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0b] border border-white/15 p-8 md:p-12 shadow-[0_0_80px_rgba(255,255,255,0.03)] relative overflow-hidden flex flex-col items-center group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-8 relative z-10">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Lynknov Presence
                </div>
                <div className="w-full max-w-[280px] h-[580px] bg-black rounded-[40px] border-[6px] border-white/10 p-5 flex flex-col gap-3 relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-white/20 to-white/5"></div>
                    <div className="flex-1">
                      <div className="w-full h-3 rounded bg-white/80 mb-1.5"></div>
                      <div className="w-2/3 h-2 rounded bg-white/40"></div>
                    </div>
                  </div>
                  <div className="w-full h-24 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-end">
                    <div className="w-1/2 h-2 rounded bg-white/40 mb-1"></div>
                    <div className="w-3/4 h-2 rounded bg-white/20"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 rounded-xl bg-white/5 border border-white/5"></div>
                    <div className="h-20 rounded-xl bg-white/5 border border-white/5"></div>
                  </div>
                  <div className="mt-auto w-full h-10 rounded-xl bg-white flex items-center justify-center">
                    <div className="w-1/3 h-2 rounded bg-black/50"></div>
                  </div>
                </div>

                {/* Comparison Points */}
                <div className="mt-10 flex flex-col gap-3 w-full max-w-[280px] relative z-10">
                  {[
                    "Tampilan premium & unik",
                    "Tools bisnis lengkap",
                    "Peluang konversi tinggi"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>
        </section>

        <LandingCorePillarsSection />

        {/* 6. VISION / PLATFORM - Cinematic Mid-Section */}
        <section className="py-40 relative overflow-hidden flex items-center justify-center text-center bg-gradient-to-b from-[#0a0a0b] via-[#050505] to-[#0a0a0b]">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent top-0"></div>
          <div className="absolute inset-0 bg-grid-soft opacity-[0.05] pointer-events-none"></div>
          
          {/* Animated Ambient Orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none animate-[pulse-slow_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-brand-glow)] rounded-full blur-[120px] pointer-events-none animate-[pulse-slow_12s_ease-in-out_infinite_reverse]"></div>
          <div className="ambient-drift absolute top-12 left-1/2 h-20 w-[380px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[44px] pointer-events-none"></div>

          <RevealWrapper direction="up" className="max-w-[1000px] mx-auto px-6 relative z-10">
            <p className="text-[var(--color-text-secondary)] tracking-[0.2em] uppercase text-[11px] font-medium mb-8">Visi Platform</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-10 leading-[1.1] tracking-tight">
              Lebih dari sekadar profil.<br/>
              <span className="relative inline-block mt-2">
                <span className="absolute left-1/2 top-1/2 z-0 h-16 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-[40px]"></span>
                <span className="text-premium-shine relative z-10">Interactive Business OS.</span>
                <span className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent opacity-0 animate-[shimmer_3s_infinite]">Interactive Business OS.</span>
                <span className="absolute left-1/2 top-full mt-3 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"></span>
              </span>
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-normal relative z-10">
              Lynknov dirancang untuk menjadi pusat kendali kehadiran digital Anda. Mengubah setiap impresi menjadi pemahaman, dan interaksi menjadi sebuah peluang bisnis yang nyata.
            </p>
          </RevealWrapper>
        </section>

        {/* 7. SOLUTION / POSITIONING (Concentric Depth) */}
        <section id="solusi" className="section-space section-divider-soft relative overflow-hidden border-t border-white/5 bg-[var(--color-surface-base)] scroll-mt-28">
          {/* Concentric Circles Background - Refined */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
            <div className="w-[300px] h-[300px] border border-white rounded-full absolute"></div>
            <div className="w-[600px] h-[600px] border border-white rounded-full absolute"></div>
            <div className="w-[900px] h-[900px] border border-white/50 rounded-full absolute"></div>
            <div className="w-[1200px] h-[1200px] border border-white/20 rounded-full absolute"></div>
            <div className="w-[1500px] h-[1500px] border border-white/10 rounded-full absolute"></div>
            <div className="w-3 h-3 bg-white rounded-full absolute shadow-[0_0_30px_10px_rgba(255,255,255,0.4)]"></div>
          </div>

          <RevealWrapper direction="up" className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.1] text-white">
              Lynknov bukan sekadar halaman.<br/>
              <span className="text-gradient">Ini cara Anda tampil.</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-16 max-w-2xl mx-auto font-normal">
              Menyusun identitas digital yang lebih terarah, lebih jelas, dan lebih meyakinkan sejak orang pertama kali membuka halaman Anda.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
              {[
                "Identitas yang lebih jelas",
                "Proof yang lebih meyakinkan",
                "CTA yang lebih terarah"
              ].map((point, i) => (
                <div key={i} className="chip-premium hover-lift-soft flex items-center gap-2 px-5 py-2.5 text-white/90 text-sm font-medium cursor-default backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                  {point}
                </div>
              ))}
            </div>
          </RevealWrapper>
        </section>
                {/* 8. SHOWCASE - Journey Flow */}
        <section id="showcase" className="section-space section-divider-soft relative overflow-hidden bg-[#0a0a0b] scroll-mt-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-grid-soft absolute inset-0 opacity-[0.06]"></div>
            <div className="ambient-drift absolute left-[8%] top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-[150px]"></div>
            <div className="ambient-drift-reverse absolute bottom-[-20%] right-[-8%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_72%)] blur-[170px]"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"></div>
          </div>
          <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
            <div className="section-intro flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Bagaimana Lynknov digunakan.</h2>
                <p className="mt-5 text-lg md:text-xl text-[var(--color-text-secondary)] font-normal leading-relaxed">
                  Tiga tahap yang membantu halaman Anda bergerak dari first impression yang rapi menuju peluang yang lebih nyata.
                </p>
              </div>
              <Link href="/showcase" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all border border-white/10 shrink-0">
                Lihat Galeri Lengkap <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-6">
              <RevealWrapper direction="up" delay={0.05}>
                <div className="panel-premium hover-lift-soft h-full rounded-[30px] p-5 sm:p-6 md:rounded-[34px] md:p-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">3-step flow</div>
                  <h3 className="mt-4 text-3xl md:text-4xl font-medium leading-tight text-white">
                    Dari halaman profesional ke peluang yang lebih nyata.
                  </h3>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    Bukan sekadar menaruh link, tetapi menyusun siapa Anda, apa yang Anda tawarkan, dan ke mana orang perlu melangkah.
                  </p>

                  <div className="relative mt-10">
                    <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent"></div>
                    {[
                      {
                        icon: User,
                        title: "Bangun halaman profesional",
                        desc: "Susun identitas, positioning, dan CTA utama dalam satu permukaan yang terasa matang.",
                      },
                      {
                        icon: Briefcase,
                        title: "Susun karya dan penawaran",
                        desc: "Gabungkan proof, offer, dan jalur monetisasi agar orang lebih cepat memahami value Anda.",
                      },
                      {
                        icon: MousePointerClick,
                        title: "Ubah perhatian jadi peluang",
                        desc: "Arahkan orang ke chat, booking, inquiry, atau pembelian dengan langkah yang lebih jelas.",
                      },
                    ].map(({ icon: Icon, title, desc }, index) => (
                      <div key={title} className={`hover-lift-soft relative flex gap-4 rounded-[26px] border p-5 ${index === 1 ? "mb-4 border-white/14 bg-white/[0.06]" : "mb-4 border-white/8 bg-white/[0.03]"}`}>
                        <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/12" : "bg-white/8"}`}>
                          <Icon className="h-5 w-5 text-white/70" />
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.2em] text-white/38">0{index + 1}</div>
                          <h4 className="mt-2 text-lg font-medium text-white">{title}</h4>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={0.1}>
                <div className="panel-premium hover-lift-soft h-full rounded-[30px] p-5 sm:p-6 md:rounded-[36px] md:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Preview Flow</div>
                      <div className="mt-2 text-lg font-medium text-white">Satu permukaan, tiga momen penting</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
                      one surface
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-[560px]">
                    <div className="rounded-[32px] border border-white/10 bg-black/45 p-5 md:p-6 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/10"></div>
                        <div className="flex-1">
                          <div className="mb-2 h-3 w-32 rounded bg-white/80"></div>
                          <div className="h-2 w-24 rounded bg-white/28"></div>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
                        <div className="h-40 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.04)_100%)]"></div>
                        <div className="grid gap-3">
                          <div className="h-[74px] rounded-[20px] border border-white/8 bg-white/[0.05]"></div>
                          <div className="h-[74px] rounded-[20px] border border-white/8 bg-white/[0.05]"></div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                          "Profile",
                          "Offer",
                          "Action",
                        ].map((item) => (
                          <div key={item} className="rounded-[18px] border border-white/8 bg-white/[0.04] px-3 py-3 text-center text-sm text-white/72">
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 h-11 rounded-full bg-white"></div>
                    </div>

                    <div className="absolute -left-4 bottom-12 hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(10,10,12,0.9)_100%)] p-4 backdrop-blur-sm sm:block">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Trust</div>
                      <div className="mt-2 h-2 w-24 rounded bg-white/46"></div>
                      <div className="mt-2 h-2 w-16 rounded bg-white/20"></div>
                    </div>

                    <div className="absolute -right-4 top-10 hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(10,10,12,0.9)_100%)] p-4 backdrop-blur-sm sm:block">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                        <ArrowUpRight className="h-3.5 w-3.5 text-white/55" />
                        Growth
                      </div>
                      <div className="mt-3 h-2 w-20 rounded bg-white/46"></div>
                      <div className="mt-2 h-2 w-12 rounded bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </section>

        {/* 9. CORE FEATURES - Storytelling Unit */}
        <section id="produk" className="section-space section-divider-soft relative overflow-hidden scroll-mt-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-grid-fine absolute inset-0 opacity-[0.05]"></div>
            <div className="ambient-drift absolute right-[-6%] top-12 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-[140px]"></div>
          </div>

          <div className="mx-auto max-w-[1180px] px-6">
            <RevealWrapper direction="up" className="section-intro mx-auto max-w-2xl text-center">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                Tiga lapisan yang paling terasa.
              </h2>
              <p className="mt-5 text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)]">
                Dari first impression, ke trust, lalu ke peluang yang lebih dekat ke inquiry dan monetisasi.
              </p>
            </RevealWrapper>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: LayoutTemplate,
                  title: "Presence",
                  desc: "Orang lebih cepat paham siapa Anda, bagaimana Anda tampil, dan apa yang Anda tawarkan.",
                },
                {
                  icon: ShieldCheck,
                  title: "Trust",
                  desc: "Karya, testimoni, dan struktur offer membantu kualitas Anda terasa lebih meyakinkan.",
                },
                {
                  icon: ArrowUpRight,
                  title: "Growth",
                  desc: "Lead, inquiry, penawaran, dan monetisasi jadi lebih mungkin bergerak ke arah yang nyata.",
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <RevealWrapper key={title} direction="up" delay={0.05 + index * 0.05} className="h-full">
                  <div className={`hover-lift-soft h-full rounded-[30px] border p-8 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.9)] ${index === 2 ? "border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(10,10,12,0.95)_100%)]" : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(10,10,12,0.94)_100%)]"}`}>
                    <Icon className="h-7 w-7 text-white/58" />
                    <h3 className="mt-6 text-2xl font-medium text-white">{title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">{desc}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
        {/* 10. USER JOURNEY - Storytelling */}
        <JourneyAccordionSection />

        {/* 11. WHY LYNKNOV (Differentiation) */}
        <section className="section-space section-divider-soft relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="ambient-drift absolute left-[10%] top-8 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[130px]"></div>
            <div className="ambient-drift-reverse absolute right-[2%] bottom-[-12%] h-[520px] w-[520px] rounded-full bg-white/[0.04] blur-[150px]"></div>
          </div>
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
            <RevealWrapper direction="up" className="w-full">
              <div className="panel-premium relative rounded-[32px] p-8 sm:p-10 md:rounded-[40px] md:p-14 lg:p-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none"></div>
  
              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <div>
                  <div className="text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest mb-6">Kenapa Lynknov?</div>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight text-white">
                    Dibuat untuk trust, bukan sekadar traffic.
                  </h2>
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 font-normal">
                    Banyak platform sekadar mengumpulkan tombol. Kami membangun wadah presentasi profesional yang memastikan Anda tidak dinilai lebih rendah dari kemampuan asli Anda.
                  </p>
                </div>
                <div className="panel-premium-soft rounded-[24px] p-8 backdrop-blur-sm">
                  <ul className="space-y-6">
                    {[
                      "Struktur yang lebih tenang dan lebih jelas",
                      "Dibangun untuk presentasi dan trust",
                      "Lebih dekat ke peluang yang nyata"
                    ].map((point, i) => (
                      <li key={i} className="hover-lift-soft flex items-center gap-4 text-base font-medium text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white/60" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </section>
        {/* 12. TESTIMONIALS - Editorial Trust Grid */}
        <LandingTestimonialsSection />

        {/* 13. PRICING SECTION - Conversion Oriented */}
        <section id="harga" className="section-space section-divider-soft relative overflow-hidden text-center scroll-mt-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="bg-grid-fine absolute inset-0 opacity-[0.05]"></div>
            <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_62%)] blur-[70px]"></div>
            <div className="ambient-drift absolute left-[8%] bottom-[-10%] h-[360px] w-[360px] rounded-full bg-white/[0.04] blur-[120px]"></div>
            <div className="ambient-drift-reverse absolute bottom-[-16%] right-[8%] h-[420px] w-[420px] rounded-full bg-white/[0.03] blur-[130px]"></div>
          </div>
          <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          
            <RevealWrapper direction="up" className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white text-balance">
                Investasi kecil, <br className="hidden md:block" /> impresi profesional yang bertahan lama.
              </h2>
              <p className="section-intro max-w-2xl mx-auto text-xl font-normal text-[var(--color-text-secondary)]">
                Pilih paket yang sesuai dengan tahap perkembangan digital Anda. Upgrade kapan saja saat Anda siap.
              </p>
            </RevealWrapper>
          
            <div className="relative z-10 mx-auto grid max-w-[1000px] gap-6 text-left md:grid-cols-2 lg:gap-8">
        {/* Starter Plan */}
        <RevealWrapper direction="up" delay={0.1}>
          <div className="panel-premium-soft hover-lift-soft group flex h-full flex-col rounded-[28px] p-8 sm:p-10 md:rounded-[32px]">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/80 w-fit mb-6">
              Untuk Pemula & Kreator
            </div>
            <h3 className="text-3xl font-medium text-white mb-2">Starter</h3>
            <p className="text-[var(--color-text-secondary)] mb-8 text-sm">Mulai tampil rapi dan kumpulkan aset digital Anda dalam satu halaman.</p>
            
            <div className="text-5xl font-medium text-white mb-8">
              Gratis
            </div>
            
            <div className="h-px w-full bg-white/5 mb-8"></div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0"/> 
                <span><strong>1 Halaman Publik</strong> dengan profil dasar</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0"/> 
                <span>Bio dan social links tanpa batas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0"/> 
                <span><strong>1 CTA Utama</strong> untuk konversi</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0"/> 
                <span>1 Section penawaran sederhana</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5 text-white/40 shrink-0"/> 
                <span>Analitik kunjungan dasar</span>
              </li>
            </ul>
            
            <Link href="/register" className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors border border-white/10">
              Mulai Gratis Sekarang
            </Link>
          </div>
        </RevealWrapper>
        
        {/* Pro Plan */}
        <RevealWrapper direction="up" delay={0.2}>
          <div className="panel-premium hover-lift-soft group relative flex h-full flex-col rounded-[28px] p-8 shadow-2xl transition-all duration-500 sm:p-10 md:-translate-y-4 md:rounded-[32px]">
            {/* Elegant Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-[80px] group-hover:bg-white/[0.06] transition-colors duration-500 pointer-events-none"></div>
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute top-8 right-8 px-3 py-1 bg-white text-black text-xs font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Paling Populer
            </div>
            
            <div className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium w-fit mb-6 border border-white/20">
              Untuk Profesional & Bisnis
            </div>
            
            <h3 className="text-3xl font-medium text-white mb-2 relative z-10">Growth</h3>
            <p className="text-[var(--color-text-secondary)] mb-8 text-sm relative z-10">Untuk trust maksimal, custom branding, dan konversi yang lebih tinggi.</p>
            
            <div className="flex items-end gap-2 mb-8 relative z-10">
              <div className="text-5xl font-medium text-white tracking-tight">Rp 99rb</div>
              <div className="text-[var(--color-text-secondary)] pb-2 font-medium">/ bln</div>
            </div>
            
            <div className="h-px w-full bg-white/10 mb-8 relative z-10"></div>
            
            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span>Semua fitur Starter</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span><strong>Custom Domain</strong> (yourname.com)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span><strong>Form Lead Capture</strong> untuk kumpulkan kontak klien</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span>Showcase Portfolio & Project eksklusif</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span>Advanced Analytics (Clicks, CTR, Referrers)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0"/> 
                <span>Bebas watermark & Custom Branding penuh</span>
              </li>
            </ul>
            
            <Link href="/pricing" className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white text-black font-medium text-sm hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 relative z-10">
              Upgrade ke Growth
            </Link>
          </div>
        </RevealWrapper>
            </div>
          </div>
        </section>

        {/* 14. FINAL CTA - Cinematic Emotional Closing */}
        <section className="section-space-tight section-divider-soft relative overflow-hidden border-t border-white/5">
          {/* Cinematic Background Glow */}
          <div className="absolute inset-0 bg-black"></div>
          <div className="bg-grid-soft absolute inset-0 opacity-[0.05] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none"></div>
          <div className="ambient-drift absolute top-10 left-[12%] h-[260px] w-[260px] rounded-full bg-white/[0.04] blur-[110px] pointer-events-none"></div>
          <div className="ambient-drift-reverse absolute right-[8%] top-20 h-[320px] w-[320px] rounded-full bg-white/[0.04] blur-[120px] pointer-events-none"></div>`r`n          <div className="relative z-10 mx-auto max-w-[880px] px-6">
            <div className="panel-premium rounded-[34px] px-6 py-10 text-center sm:px-8 sm:py-12 md:px-12 md:py-14">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/68 backdrop-blur-md">
                Build With Clarity
              </div>
              <h2 className="mb-6 text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl">
                Saatnya tampil<br/>lebih serius.
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg font-normal leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
                Bangun ruang digital yang tidak hanya terlihat rapi, tetapi membantu orang lebih cepat memahami dan mempercayai apa yang Anda tawarkan.
              </p>
              <div className="flex flex-col items-center gap-5">
                <Link href="/register" className="inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-lg font-medium text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]">
                  Bangun Presence Anda
                </Link>
                <p className="text-sm font-medium text-[var(--color-text-tertiary)]">
                  Mulai gratis. Setup dalam hitungan menit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}













