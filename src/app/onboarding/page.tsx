"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { generateSlug } from "@/lib/utils";
import { Check, ArrowRight, Briefcase, Sparkles, UserCircle, Users, Compass, Zap, TrendingUp, Target, RefreshCw, CheckCircle2 } from "lucide-react";

// Use completeOnboarding if available, otherwise simulate
// import { completeOnboarding } from '@/features/onboarding/actions'

const MATURITY_STAGES = [
  { id: "explore", label: "Masih Eksplorasi", icon: Compass, desc: "Belum tahu mau mulai dari mana", feedback: "Kami akan menyiapkan alur sederhana untuk membantu Anda mulai dari dasar." },
  { id: "starting", label: "Mulai Menata", icon: Target, desc: "Punya skill/jasa tapi belum tertata", feedback: "Kami akan bantu menata profil dan portofolio Anda menjadi lebih profesional." },
  { id: "active", label: "Sudah Berjalan", icon: Zap, desc: "Punya penawaran atau bisnis kecil", feedback: "Kami siapkan fitur pengelolaan klien dan penawaran agar bisnis lebih lancar." },
  { id: "scaling", label: "Fokus Scale Up", icon: TrendingUp, desc: "Ingin tampil lebih profesional & grow", feedback: "Kami prioritaskan halaman publik, CTA, dan penawaran agar terlihat lebih siap jual." },
];

const USE_CASES = [
  { id: "freelancer", label: "Freelancer / Jasa", icon: UserCircle, desc: "Menawarkan jasa profesional" },
  { id: "creator", label: "Creator / Produk Digital", icon: Sparkles, desc: "Menjual produk digital atau konten" },
  { id: "consultant", label: "Konsultan / Booking", icon: Briefcase, desc: "Menyediakan sesi konsultasi" },
  { id: "business", label: "Bisnis Kecil", icon: Users, desc: "Membangun identitas bisnis online" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    username: "",
    maturity: "",
    use_case: "",
  });

  const TOTAL_STEPS = 3;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "full_name") {
        const generatedSlug = generateSlug(value);
        next.username = generatedSlug;
        checkSlugAvailability(generatedSlug);
      }
      if (name === "username") {
        checkSlugAvailability(value);
      }
      return next;
    });
  }

  // Mock slug availability check
  const checkSlugAvailability = (slug: string) => {
    if (!slug) {
      setIsSlugAvailable(null);
      return;
    }
    setSlugChecking(true);
    setTimeout(() => {
      // Simulate that 'admin' or 'lynknov' is taken
      if (slug === 'admin' || slug === 'lynknov') {
        setIsSlugAvailable(false);
      } else {
        setIsSlugAvailable(true);
      }
      setSlugChecking(false);
    }, 500);
  };

  async function handleFinish() {
    setLoading(true);
    // Simulate API call to save onboarding data
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const activeMaturityFeedback = MATURITY_STAGES.find(s => s.id === form.maturity)?.feedback;

  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-white flex flex-col relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6366f1]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      {/* Top Navigation / Progress */}
      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between">
        <div className="text-xl font-medium tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <div className="w-3 h-3 rounded-full bg-black"></div>
          </div>
          <span className="hidden sm:inline-block">Lynknov</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">Langkah {step} dari {TOTAL_STEPS}</span>
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i + 1 <= step ? 'w-6 bg-[#a78bfa]' : 'w-2 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 pb-20">
        <div className="w-full max-w-[540px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Identitas */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="mb-10 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Siapa nama Anda?</h1>
                  <p className="text-[var(--color-text-secondary)] text-lg mb-2">Mari mulai dengan identitas utama Anda.</p>
                  <p className="text-xs text-[#a78bfa]/80 bg-[#a78bfa]/10 inline-block px-3 py-1 rounded-full border border-[#a78bfa]/20">
                    Jawaban Anda membantu Lynknov menyiapkan workspace yang paling relevan.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="full_name" className="text-sm font-medium text-[var(--color-text-secondary)]">Nama Lengkap atau Brand</label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Misal: Daffa Studio"
                      className="w-full h-14 px-4 text-lg rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all duration-300"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="username" className="text-sm font-medium text-[var(--color-text-secondary)]">URL Workspace Anda</label>
                      <AnimatePresence>
                        {form.username && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-xs font-medium flex items-center gap-1.5"
                          >
                            {slugChecking ? (
                              <span className="text-[var(--color-text-tertiary)] flex items-center"><RefreshCw className="w-3 h-3 animate-spin mr-1" /> Mengecek...</span>
                            ) : isSlugAvailable ? (
                              <span className="text-[#34d399] flex items-center bg-[#34d399]/10 px-2 py-0.5 rounded-md"><Check className="w-3 h-3 mr-1" /> Tersedia</span>
                            ) : isSlugAvailable === false ? (
                              <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md">Sudah digunakan</span>
                            ) : null}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`flex items-center h-14 overflow-hidden rounded-xl border bg-white/[0.03] transition-all duration-300 ${
                      isSlugAvailable === false ? 'border-red-500/50 focus-within:border-red-500/80 bg-red-500/5' : 
                      isSlugAvailable === true ? 'border-[#34d399]/30 focus-within:border-[#34d399]/50' :
                      'border-white/10 focus-within:border-[#a78bfa]/50 focus-within:bg-white/[0.05]'
                    }`}>
                      <span className={`px-4 select-none transition-colors ${isSlugAvailable === false ? 'text-red-400/70' : 'text-[var(--color-text-secondary)]'}`}>lynknov.com/</span>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="daffa-studio"
                        className="flex-1 h-full bg-transparent px-0 text-white placeholder:text-white/20 outline-none"
                      />
                    </div>
                    {form.username && isSlugAvailable && (
                       <motion.p 
                         initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                         className="text-xs text-[var(--color-text-tertiary)] mt-1.5 ml-1"
                       >
                         Tautan Anda nanti: <span className="text-white/80 font-medium">lynknov.com/{form.username}</span>
                       </motion.p>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!form.full_name || !form.username || isSlugAvailable === false || slugChecking}
                    className="h-12 px-8 rounded-xl bg-white text-black font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Lanjutkan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Maturity */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="mb-10 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Posisi Anda saat ini?</h1>
                  <p className="text-[var(--color-text-secondary)] text-lg mb-2">Pilih yang paling sesuai dengan kondisi Anda sekarang.</p>
                  <p className="text-xs text-[#a78bfa]/80 bg-[#a78bfa]/10 inline-block px-3 py-1 rounded-full border border-[#a78bfa]/20">
                    Agar alur kerja Anda bisa dipersonalisasi dengan tepat.
                  </p>
                </div>

                <div className="space-y-3">
                  {MATURITY_STAGES.map((stage) => {
                    const Icon = stage.icon;
                    const isSelected = form.maturity === stage.id;
                    return (
                      <div
                        key={stage.id}
                        onClick={() => setForm((prev) => ({ ...prev, maturity: stage.id }))}
                        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border flex items-center gap-4 ${
                          isSelected 
                            ? 'border-[#a78bfa] bg-[#a78bfa]/10' 
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg shrink-0 transition-colors duration-300 ${isSelected ? 'bg-[#a78bfa]/20 text-[#a78bfa]' : 'bg-white/5 text-[var(--color-text-secondary)]'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-white">{stage.label}</h3>
                          <p className="text-sm text-[var(--color-text-secondary)]">{stage.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected ? 'border-[#a78bfa] bg-[#a78bfa] scale-110' : 'border-white/20'}`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        
                        {isSelected && (
                          <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(167,139,250,0.1)] pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Micro-feedback toast */}
                <div className="h-10 mt-4 flex items-center justify-center sm:justify-start">
                  <AnimatePresence mode="wait">
                    {activeMaturityFeedback && (
                      <motion.div
                        key={form.maturity}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2 text-sm text-[#a78bfa] bg-[#a78bfa]/5 px-4 py-2 rounded-lg border border-[#a78bfa]/10"
                      >
                        <Sparkles className="w-4 h-4" />
                        {activeMaturityFeedback}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="h-12 px-6 rounded-xl bg-white/[0.03] border border-white/10 text-white font-medium transition-all duration-300 hover:bg-white/[0.06] active:scale-[0.98]"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!form.maturity}
                    className="h-12 px-8 rounded-xl bg-white text-black font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Lanjutkan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Use Case */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="mb-10 text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Apa fokus utama Anda?</h1>
                  <p className="text-[var(--color-text-secondary)] text-lg mb-2">Pilihan ini membantu kami menyiapkan template awal.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {USE_CASES.map((uc) => {
                    const Icon = uc.icon;
                    const isSelected = form.use_case === uc.id;
                    return (
                      <div
                        key={uc.id}
                        onClick={() => setForm((prev) => ({ ...prev, use_case: uc.id }))}
                        className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                          isSelected 
                            ? 'border-[#a78bfa] bg-[#a78bfa]/10' 
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg transition-colors duration-300 ${isSelected ? 'bg-[#a78bfa]/20 text-[#a78bfa]' : 'bg-white/5 text-[var(--color-text-secondary)]'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-[#a78bfa] bg-[#a78bfa] scale-110' : 'border-white/20'}`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1">{uc.label}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">{uc.desc}</p>
                        
                        {/* Selected glow */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(167,139,250,0.1)] pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Mini preview notification */}
                <div className="h-10 mt-4 flex justify-center sm:justify-start">
                  <AnimatePresence>
                    {form.use_case && (
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-[var(--color-text-secondary)] bg-white/5 px-3 py-1.5 rounded-md flex items-center gap-2 border border-white/5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#34d399]" />
                        Workspace Anda akan dioptimasi untuk <strong>{USE_CASES.find(u => u.id === form.use_case)?.label}</strong>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    className="h-12 px-6 rounded-xl bg-white/[0.03] border border-white/10 text-white font-medium transition-all duration-300 hover:bg-white/[0.06] active:scale-[0.98]"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handleFinish}
                    disabled={loading || !form.use_case}
                    className="h-12 px-8 rounded-xl bg-white text-black font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        Menyiapkan...
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      </div>
                    ) : (
                      <>Selesai Setup <Sparkles className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
