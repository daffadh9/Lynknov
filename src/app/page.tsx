import Link from "next/link";
import { 
  ArrowRight, 
  LayoutTemplate, 
  Briefcase, 
  Store, 
  MessageSquareQuote, 
  MousePointerClick, 
  CheckCircle2,
  User,
  Zap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
  XCircle,
  ChevronRight,
  Star,
  Play
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface-base)] overflow-hidden selection:bg-white/20 selection:text-white">
      
      {/* 1. NAVBAR - Floating Glass Panel */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-medium tracking-tight text-white flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              </div>
              <span className="relative">
                Lynknov
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent opacity-0 group-hover:animate-[shimmer_2s_infinite]">Lynknov</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-secondary)]">
              <Link href="#produk" className="hover:text-white transition-colors">Produk</Link>
              <Link href="#showcase" className="hover:text-white transition-colors">Showcase</Link>
              <Link href="#solusi" className="hover:text-white transition-colors">Solusi</Link>
              <Link href="#harga" className="hover:text-white transition-colors">Harga</Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="h-9 md:h-10 px-5 inline-flex items-center justify-center rounded-full bg-white text-black font-medium text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              Mulai Bangun
            </Link>
          </div>
        </div>
      </header>

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
            {/* Asymmetrical Grid: 1fr text, 1.2fr visual to give preview dominance */}
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-8 items-center">
              
              {/* Kiri: Copy (Cinematic & Deep, Pushed slightly inward) */}
              <div className="max-w-xl relative lg:pl-4" style={{ animation: "var(--animate-fade-up)" }}>
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
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border border-black bg-[var(--color-surface-elevated)] flex items-center justify-center text-[10px] text-white/50">+</div>
                    ))}
                  </div>
                  <p>Bergabung dengan 1.000+ profesional</p>
                </div>
              </div>
              
              {/* Kanan: Cinematic Product Preview (Massive, Overlapping, Layered) */}
              <div className="relative w-full h-[500px] lg:h-[700px] perspective-1500 mt-12 lg:mt-0" style={{ animation: "var(--animate-fade-in) 1s ease-out 0.2s forwards" }}>
                
                {/* Immersive bleed container */}
                <div className="absolute inset-0 transform rotate-y-[-10deg] rotate-x-[5deg] translate-x-4 lg:translate-x-16 lg:scale-110" style={{ animation: "var(--animate-float) 8s ease-in-out infinite" }}>
                  
                  {/* Backdrop blur layer to simulate depth of field */}
                  <div className="absolute top-10 -left-10 w-[120%] h-[120%] bg-white/[0.01] blur-xl rounded-full pointer-events-none"></div>

                  {/* Main Product Device Frame */}
                  <div className="absolute w-[360px] lg:w-[400px] h-[700px] lg:h-[780px] left-1/2 -translate-x-1/2 top-0 rounded-[32px] bg-[#0a0a0b] border-[8px] border-[#1a1a1d] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col">
                    
                    {/* Device Status Bar */}
                    <div className="w-full h-8 flex justify-between items-center px-6 pt-2 bg-black/40">
                      <div className="w-12 h-3 rounded-full bg-white/10"></div>
                      <div className="w-16 h-4 rounded-full bg-black"></div>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-white/10"></div>
                        <div className="w-5 h-3 rounded-full bg-white/10"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 bg-gradient-to-b from-[#121214] to-[#0a0a0b] p-6 relative overflow-y-hidden">
                      {/* Top banner glow inside device */}
                      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                      
                      {/* Profile Section */}
                      <div className="flex flex-col items-center text-center mt-6 mb-8 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/20 to-white/5 p-[2px] mb-4 shadow-lg">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <User className="w-8 h-8 text-white/30" />
                          </div>
                        </div>
                        <div className="w-40 h-6 rounded-md bg-white/90 mb-2"></div>
                        <div className="w-28 h-4 rounded-md bg-white/40 mb-4"></div>
                        <div className="flex gap-2">
                          <div className="w-20 h-8 rounded-full bg-white/10"></div>
                          <div className="w-20 h-8 rounded-full bg-white/10"></div>
                        </div>
                      </div>

                      {/* Content Blocks (Hierarchy) */}
                      <div className="space-y-4 relative z-10">
                        {/* Highlighted Block (e.g. Primary Service) */}
                        <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 relative overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="w-3/4 h-4 rounded bg-white/80 mb-2"></div>
                            <div className="w-1/2 h-3 rounded bg-white/40"></div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/30" />
                        </div>

                        {/* Standard Block */}
                        <div className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5 text-white/50" />
                          </div>
                          <div className="flex-1">
                            <div className="w-2/3 h-4 rounded bg-white/60 mb-2"></div>
                            <div className="w-1/3 h-3 rounded bg-white/30"></div>
                          </div>
                        </div>
                        
                        {/* Trust Snippet inside App */}
                        <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#1a1a1d] to-black border border-white/5">
                          <div className="flex gap-1 mb-2">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
                          </div>
                          <div className="w-full h-3 rounded bg-white/40 mb-1.5"></div>
                          <div className="w-5/6 h-3 rounded bg-white/40"></div>
                        </div>
                      </div>

                      {/* Fixed Bottom CTA in App */}
                      <div className="absolute bottom-6 left-6 right-6 h-14 rounded-2xl bg-white flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] z-20">
                        <div className="w-32 h-4 rounded bg-black"></div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Overlapping Floating Layer 1: "Conversion Insights" (Right, pulled forward) */}
                  <div className="absolute top-[20%] -right-12 lg:-right-24 w-64 p-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transform rotate-y-[-15deg] translate-z-[50px]" style={{ animation: "var(--animate-float-delayed) 9s ease-in-out infinite" }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Total Kunjungan</div>
                        <div className="text-2xl font-medium text-white">12.4k</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                    {/* Mini chart */}
                    <div className="flex items-end gap-1.5 h-12 w-full pt-2 border-t border-white/5">
                      {[30, 45, 25, 60, 40, 85, 55].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-[2px] ${i === 5 ? 'bg-white' : 'bg-white/20'}`} style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>

                  {/* Overlapping Floating Layer 2: "Trust/Verified" (Left, pushed slightly back) */}
                  <div className="absolute bottom-[25%] -left-10 lg:-left-20 w-56 p-4 rounded-2xl bg-[#121214]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] transform rotate-y-[10deg] translate-z-[20px]" style={{ animation: "var(--animate-float) 7s ease-in-out infinite" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white mb-0.5">Identitas Valid</div>
                        <div className="text-[10px] text-[var(--color-text-secondary)]">Terverifikasi oleh sistem</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRUST STRIP - Premium Marquee */}
        <section className="relative py-10 border-y border-white/5 bg-black/20 overflow-hidden">
          <div className="absolute left-0 w-32 lg:w-64 h-full bg-gradient-to-r from-[var(--color-surface-base)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 w-32 lg:w-64 h-full bg-gradient-to-l from-[var(--color-surface-base)] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex items-center w-full gap-12 whitespace-nowrap overflow-hidden opacity-50">
            <div className="flex gap-16 items-center animate-[marquee_30s_linear_infinite]">
              {['Freelancer', 'Creative Studio', 'Consultant', 'Coach', 'Personal Brand', 'Service Business', 'Agency', 'Creator'].map((item) => (
                <div key={item} className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  {item}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {['Freelancer', 'Creative Studio', 'Consultant', 'Coach', 'Personal Brand', 'Service Business', 'Agency', 'Creator'].map((item) => (
                <div key={`${item}-dup`} className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROBLEM SECTION - Shifted slightly center for readability */}
        <section className="py-32 max-w-[1200px] mx-auto px-6 relative">
          <div className="absolute top-1/2 left-[10%] w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none -z-10"></div>
          
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start pl-0 lg:pl-8">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.15] text-white">
                Banyak terlihat,<br/>
                <span className="text-[var(--color-text-secondary)]">tapi belum terasa meyakinkan.</span>
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] leading-[1.7] max-w-md font-normal">
                Banyak orang sudah punya audiens, traffic, bahkan perhatian. Tapi ketika orang membuka profil mereka, yang terlihat masih terasa biasa.
                <br/><br/>
                Masalahnya bukan Anda tidak cukup bagus. Masalahnya, kualitas Anda belum tersaji dengan benar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Terlihat asal jadi", desc: "Link bio hanya berisi kumpulan tombol tanpa struktur yang jelas, membuat Anda tampak seperti amatir." },
                { title: "Kualitas tak terlihat", desc: "Tidak ada tempat yang benar-benar merepresentasikan kemampuan, karya, atau hasil kerja nyata Anda.", highlight: true },
                { title: "Menebak-nebak", desc: "Calon klien harus mencari tahu sendiri siapa Anda dan layanan apa yang Anda sediakan." },
                { title: "Perhatian berhenti", desc: "Traffic datang berlimpah, tapi tidak ada alur yang mengarah ke aksi atau keputusan konversi." }
              ].map((problem, i) => (
                <div key={i} className={`p-8 rounded-[24px] transition-all duration-500 group relative overflow-hidden ${problem.highlight ? 'bg-gradient-to-b from-[#1a1a1d] to-[#121214] border border-white/20 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'}`}>
                  {problem.highlight && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full blur-2xl"></div>}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 text-sm font-medium ${problem.highlight ? 'bg-white/10 text-white' : 'bg-black/50 text-white/40 border border-white/10 group-hover:text-white'}`}>
                    0{i+1}
                  </div>
                  <h3 className={`text-lg font-medium mb-3 ${problem.highlight ? 'text-white' : 'text-white/80'}`}>{problem.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{problem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BEFORE VS AFTER - Visual Storytelling */}
        <section className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
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
                <div className="w-full max-w-[280px] bg-[#121214] rounded-[32px] border-4 border-[#1a1a1d] p-6 flex flex-col gap-4 aspect-[9/16]">
                  <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-4"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                  <div className="w-full h-12 rounded-xl bg-white/5"></div>
                </div>
              </div>

              {/* After */}
              <div className="rounded-3xl bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0b] border border-white/15 p-8 md:p-12 shadow-[0_0_80px_rgba(255,255,255,0.03)] relative overflow-hidden flex flex-col items-center group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-8 relative z-10">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Lynknov Presence
                </div>
                <div className="w-full max-w-[280px] bg-black rounded-[32px] border-4 border-white/10 p-5 flex flex-col gap-3 aspect-[9/16] relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
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
              </div>
            </div>
          </div>
        </section>

        {/* 6. VISION / PLATFORM - Cinematic Mid-Section */}
        <section className="py-40 relative overflow-hidden flex items-center justify-center text-center bg-[#050505]">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent top-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-[1000px] mx-auto px-6 relative z-10">
            <p className="text-[var(--color-text-secondary)] tracking-[0.2em] uppercase text-[11px] font-medium mb-8">Visi Platform</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-10 leading-[1.1] tracking-tight">
              Lebih dari sekadar profil.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/30">Interactive Business OS.</span>
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed font-normal">
              Lynknov dirancang untuk menjadi pusat kendali kehadiran digital Anda. Mengubah setiap impresi menjadi pemahaman, dan interaksi menjadi sebuah peluang bisnis yang nyata.
            </p>
          </div>
        </section>

        {/* 7. SOLUTION / POSITIONING (Concentric Depth) */}
        <section id="solusi" className="py-32 relative bg-[var(--color-surface-base)] border-t border-white/5 overflow-hidden">
          {/* Concentric Circles Background - Refined */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
            <div className="w-[300px] h-[300px] border border-white rounded-full absolute"></div>
            <div className="w-[600px] h-[600px] border border-white rounded-full absolute"></div>
            <div className="w-[900px] h-[900px] border border-white/50 rounded-full absolute"></div>
            <div className="w-[1200px] h-[1200px] border border-white/20 rounded-full absolute"></div>
            <div className="w-[1500px] h-[1500px] border border-white/10 rounded-full absolute"></div>
            <div className="w-3 h-3 bg-white rounded-full absolute shadow-[0_0_30px_10px_rgba(255,255,255,0.4)]"></div>
          </div>

          <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.1] text-white">
              Lynknov bukan sekadar halaman.<br/>
              <span className="text-gradient">Ini cara Anda tampil.</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-16 max-w-2xl mx-auto font-normal">
              Menyusun identitas digital yang lebih terarah. Bukan sekadar menaruh link di satu tempat, tetapi membentuk persepsi orang tentang kualitas kerja Anda dalam satu ruang yang matang.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
              {[
                "Identitas yang rapi",
                "Presentasi profesional",
                "Struktur yang jelas",
                "CTA yang terarah",
                "Ruang digital matang"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/90 text-sm font-medium shadow-sm hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-default backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. SHOWCASE (MAJOR UPGRADE) - Jualan Produk Banget */}
        <section id="showcase" className="py-32 bg-[#0a0a0b] relative">
          <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-5 text-white">Bagaimana Lynknov digunakan.</h2>
                <p className="text-xl text-[var(--color-text-secondary)] font-normal">Satu platform, beragam cara elegan untuk mempresentasikan siapa Anda kepada dunia.</p>
              </div>
              <Link href="/showcase" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all border border-white/10 shrink-0">
                Lihat Galeri Lengkap <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
              
              {/* PRIMARY SHOWCASE PANEL (Massive, High Fidelity) */}
              <div className="group relative rounded-[32px] bg-[#121214] border border-white/10 p-8 lg:p-12 overflow-hidden flex flex-col justify-between min-h-[600px] hover:border-white/20 transition-colors">
                {/* Background Spotlight */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/50 text-[11px] font-medium text-white mb-6 backdrop-blur-md uppercase tracking-wider">
                    Freelancer Profile
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-3">Menyatukan portfolio & layanan</h3>
                  <p className="text-[var(--color-text-secondary)] text-lg max-w-sm">"Orang langsung memahami value Anda, tanpa perlu klik sana-sini."</p>
                </div>

                {/* High Fidelity UI Mockup inside Panel */}
                <div className="relative w-full max-w-[450px] mx-auto mt-auto perspective-1000">
                  <div className="w-full bg-black border-t-4 border-x-4 border-white/10 rounded-t-[32px] pt-8 px-6 pb-0 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform translate-y-8 group-hover:translate-y-4 transition-transform duration-700">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 shadow-inner"></div>
                      <div>
                        <div className="w-32 h-5 rounded-md bg-white/90 mb-2"></div>
                        <div className="w-24 h-3 rounded-md bg-white/40"></div>
                      </div>
                    </div>
                    {/* Mock Gallery inside */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="aspect-[4/3] rounded-xl bg-zinc-900 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 w-1/2 h-2 rounded bg-white/60"></div>
                      </div>
                      <div className="aspect-[4/3] rounded-xl bg-zinc-900 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 w-1/2 h-2 rounded bg-white/60"></div>
                      </div>
                    </div>
                    {/* Mock Service List */}
                    <div className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 mb-6">
                      <div className="w-1/3 h-3 rounded bg-white/60 mb-3"></div>
                      <div className="w-full h-2 rounded bg-white/20 mb-2"></div>
                      <div className="w-4/5 h-2 rounded bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUPPORTING PANELS */}
              <div className="flex flex-col gap-6">
                
                {/* Supporting Panel 1: Consultant */}
                <div className="flex-1 group relative rounded-[32px] bg-[#121214] border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-colors flex flex-col">
                  <div className="relative z-10 mb-8">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-black/50 text-[10px] font-medium text-white mb-4 uppercase tracking-wider">
                      Consultant
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Membangun kredibilitas</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">"Menyusun offer & authority secara elegan."</p>
                  </div>
                  {/* Minimal Mockup */}
                  <div className="mt-auto bg-black rounded-[24px] border border-white/10 p-5 transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                    <div className="w-full h-24 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 mb-3"></div>
                    <div className="w-2/3 h-4 rounded bg-white/80 mb-2"></div>
                    <div className="w-1/3 h-3 rounded bg-white/40"></div>
                  </div>
                </div>

                {/* Supporting Panel 2: Creative Studio */}
                <div className="flex-1 group relative rounded-[32px] bg-gradient-to-br from-[#1a1a1d] to-[#121214] border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-colors flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full"></div>
                  <div className="relative z-10 mb-8">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-black/50 text-[10px] font-medium text-white mb-4 uppercase tracking-wider">
                      Creative Studio
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">First impression matang</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">"Portfolio yang terasa seperti web premium."</p>
                  </div>
                  <div className="mt-auto flex gap-3 transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                     <div className="w-1/2 aspect-square rounded-2xl bg-black border border-white/10 p-3 flex flex-col justify-end">
                       <div className="w-1/2 h-2 rounded bg-white/40"></div>
                     </div>
                     <div className="w-1/2 aspect-square rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col justify-end">
                       <div className="w-1/2 h-2 rounded bg-white/40"></div>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 9. CORE FEATURES - Storytelling Unit */}
        <section id="produk" className="py-32 max-w-[1200px] mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
              Semua yang Anda butuhkan untuk<br/>tampil meyakinkan.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Featured (Large) */}
            <div className="md:col-span-2 p-10 rounded-[32px] bg-[#121214] border border-white/10 hover:border-white/20 transition-colors group relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
              <LayoutTemplate className="w-8 h-8 mb-10 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-medium mb-4 text-white">Smart Bio Page</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-md text-lg">
                Satu halaman yang merangkum identitas, link penting, dan arah tindakan secara terstruktur. Bukan sekadar kumpulan tombol generik.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
              <Briefcase className="w-8 h-8 mb-10 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-3 text-white">Portfolio Curated</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                Tampilkan hasil kerja atau studi kasus dalam format yang terasa elegan.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
              <Store className="w-8 h-8 mb-10 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-3 text-white">Service Blocks</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                Jelaskan layanan Anda dengan susunan yang mudah dipahami tanpa bertele-tele.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
              <MessageSquareQuote className="w-8 h-8 mb-10 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-3 text-white">Social Proof</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                Integrasikan testimoni dan validasi untuk membangun kepercayaan instan.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
              <MousePointerClick className="w-8 h-8 mb-10 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-3 text-white">Conversion CTA</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                Arahkan pengunjung ke langkah nyata dari chat hingga booking secara mulus.
              </p>
            </div>
          </div>
        </section>

        {/* 10. USER JOURNEY - Storytelling */}
        <section className="py-32 bg-black relative border-y border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">Dari klik pertama, hingga closing.</h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-20">Alur yang dirancang untuk mengubah impresi menjadi transaksi.</p>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {[
                { step: "01", title: "Discover", desc: "Klien menemukan link Anda dari sosial media." },
                { step: "02", title: "Understand", desc: "Mereka memahami value & layanan Anda dalam hitungan detik." },
                { step: "03", title: "Trust", desc: "Melihat portfolio dan testimoni yang meyakinkan." },
                { step: "04", title: "Action", desc: "Mereka menekan tombol CTA untuk mulai bekerja sama." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#121214] border border-white/10 flex items-center justify-center text-xl font-medium text-white mb-6 shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. WHY LYNKNOV (Differentiation) */}
        <section className="py-32 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="p-12 md:p-16 lg:p-24 rounded-[40px] bg-gradient-to-br from-[#1a1a1d] to-[#0a0a0b] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center relative z-10">
              <div>
                <div className="text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest mb-6">Kenapa Lynknov?</div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight text-white">
                  Dibuat untuk trust, bukan sekadar traffic.
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 font-normal">
                  Banyak platform sekadar mengumpulkan tombol. Kami membangun wadah presentasi profesional yang memastikan Anda tidak dinilai lebih rendah dari kemampuan asli Anda.
                </p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-[24px] p-8 border border-white/5">
                <ul className="space-y-6">
                  {[
                    "Bukan template statis yang membosankan",
                    "Fokus utama pada presentation & trust",
                    "Lebih dekat ke Digital Presence utuh",
                    "Dibangun untuk menghasilkan peluang"
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-4 text-base font-medium text-white/90">
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
        </section>

        {/* 12. TESTIMONIALS (Dummy) */}
        <section className="py-24 border-t border-white/5 bg-[var(--color-surface-base)]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-medium text-center text-white mb-16">Dipercaya oleh profesional mandiri.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: "Sejak pakai Lynknov, klien nggak nanya-nanya lagi soal portofolio, semuanya udah jelas dan elegan di satu tempat. Konversi naik drastis.", name: "Budi Santoso", role: "UI/UX Designer" },
                { quote: "Jauh lebih premium dari link bio biasa. Berasa punya mini-website seharga puluhan juta tapi setup-nya cuma 10 menit.", name: "Sarah Amalia", role: "Business Consultant" },
                { quote: "Gue pakai buat jualan jasa studio gue. Klien langsung percaya karena first impression-nya dapet banget. Sangat recommended.", name: "Rizky Pratama", role: "Creative Director" }
              ].map((testi, i) => (
                <div key={i} className="p-8 rounded-[24px] bg-[#121214] border border-white/5 flex flex-col justify-between">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-white text-white" />)}
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">"{testi.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-white/10"></div>
                    <div>
                      <div className="text-sm font-medium text-white">{testi.name}</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">{testi.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. PRICING TEASER (Rational Dummy Data) */}
        <section id="harga" className="py-32 max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">Mulai dengan sederhana.</h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-16 font-normal">
            Investasi kecil untuk impresi profesional yang bertahan lama.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Starter Plan */}
            <div className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col hover:border-white/10 transition-colors">
              <h3 className="text-2xl font-medium text-white mb-2">Starter</h3>
              <p className="text-[var(--color-text-secondary)] mb-8 text-sm">Untuk mulai tampil rapi dan tertata.</p>
              <div className="text-5xl font-medium text-white mb-8">Gratis</div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"><CheckCircle2 className="w-4 h-4 text-white/50"/> Profil dasar</li>
                <li className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"><CheckCircle2 className="w-4 h-4 text-white/50"/> Link tak terbatas</li>
                <li className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"><CheckCircle2 className="w-4 h-4 text-white/50"/> Analitik standar</li>
              </ul>
              <Link href="/register" className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors border border-white/10">
                Mulai Gratis
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="p-10 rounded-[32px] bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0b] border border-white/20 flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform md:-translate-y-4">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white/10 via-white/50 to-white/10"></div>
              <div className="absolute top-6 right-6 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">Pro</div>
              
              <h3 className="text-2xl font-medium text-white mb-2">Growth</h3>
              <p className="text-[var(--color-text-secondary)] mb-8 text-sm">Untuk trust dan konversi maksimal.</p>
              <div className="flex items-end gap-2 mb-8">
                <div className="text-5xl font-medium text-white">Rp 99rb</div>
                <div className="text-[var(--color-text-secondary)] pb-2">/ bln</div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 text-white"/> Semua fitur Starter</li>
                <li className="flex items-center gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 text-white"/> Custom Domain</li>
                <li className="flex items-center gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 text-white"/> Layout Portfolio Premium</li>
                <li className="flex items-center gap-3 text-sm text-white/90"><CheckCircle2 className="w-4 h-4 text-white"/> Hapus watermark</li>
              </ul>
              <Link href="/pricing" className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white text-black font-medium text-sm hover:scale-[1.02] transition-transform">
                Pilih Growth
              </Link>
            </div>
          </div>
        </section>

        {/* 14. FINAL CTA - Cinematic Emotional Closing */}
        <section className="py-32 md:py-48 relative overflow-hidden border-t border-white/5">
          {/* Cinematic Background Glow */}
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none"></div>
          
          <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-white leading-[1.1]">
              Saatnya tampil<br/>lebih serius.
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto mb-12 font-normal leading-relaxed">
              Bangun ruang digital yang tidak hanya terlihat rapi, tetapi membantu orang lebih cepat memahami dan mempercayai apa yang Anda tawarkan.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/register" className="h-16 px-10 inline-flex items-center justify-center rounded-full bg-white text-black font-medium text-lg hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] transition-all duration-300">
                Bangun Presence Anda
              </Link>
              <p className="text-sm text-[var(--color-text-tertiary)] font-medium">
                Mulai gratis. Setup dalam hitungan menit.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 15. FOOTER */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="text-2xl font-medium tracking-tight text-white block mb-6 flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                </div>
                <span className="relative">
                  Lynknov
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent opacity-0 group-hover:animate-[shimmer_2s_infinite]">Lynknov</span>
                </span>
              </Link>
              <p className="text-[var(--color-text-secondary)] text-sm max-w-xs leading-relaxed">
                Interactive Business OS.<br/>Membangun identitas digital yang lebih rapi, meyakinkan, dan siap menghasilkan peluang.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 text-white text-sm">Produk</h4>
              <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <li><Link href="#produk" className="hover:text-white transition-colors">Fitur Utama</Link></li>
                <li><Link href="#showcase" className="hover:text-white transition-colors">Showcase</Link></li>
                <li><Link href="#harga" className="hover:text-white transition-colors">Harga</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-white text-sm">Solusi</h4>
              <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <li><Link href="#" className="hover:text-white transition-colors">Freelancer</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Creative Studio</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Konsultan</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-white text-sm">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 text-white text-sm">Legal</h4>
              <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <li><Link href="/ketentuan" className="hover:text-white transition-colors">Ketentuan</Link></li>
                <li><Link href="/privasi" className="hover:text-white transition-colors">Privasi</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-[var(--color-text-tertiary)]">
            <p>© {new Date().getFullYear()} Lynknov. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
