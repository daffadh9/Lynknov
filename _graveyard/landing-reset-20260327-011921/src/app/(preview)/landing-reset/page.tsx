import Link from 'next/link';

export default function LandingResetPreview() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-white/20 overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/[0.03] rounded-full blur-[150px]" />
      </div>

      {/* Minimal Navigation */}
      <header className="relative z-10 w-full">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-8 lg:px-12">
          <div className="text-lg font-medium tracking-tight text-white/90">
            lynk<span className="text-white/50">nov</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium text-white/50">
            <Link href="#" className="hover:text-white transition-colors duration-300">Produk</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Showcase</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Harga</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-300 hidden sm:block">
              Log in
            </Link>
            <Link href="#" className="h-10 px-5 inline-flex items-center justify-center rounded-full bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-transform active:scale-95">
              Mulai Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-32 lg:pt-28 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-white/95 mb-8">
              Identitas digital yang selevel dengan karya Anda.
            </h1>
            
            <p className="text-lg sm:text-xl text-white/50 leading-[1.6] mb-12 max-w-[480px] font-light">
              Berhenti menggunakan halaman statis yang membatasi. Lynknov membantu Anda merangkai portofolio, layanan, dan konversi dalam satu ruang yang elegan.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="#" className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center rounded-full bg-white text-black text-[15px] font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                Bangun Halaman Anda
              </Link>
              <Link href="#" className="w-full sm:w-auto h-14 px-8 inline-flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white text-[15px] font-medium hover:bg-white/[0.08] transition-all duration-300">
                Lihat Contoh
              </Link>
            </div>

            {/* Restrained Trust Strip */}
            <div className="mt-20 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-neutral-800" />
                <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-neutral-700" />
                <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-neutral-600" />
              </div>
              <p className="text-[13px] text-white/40">
                Dipercaya oleh <strong className="text-white/80 font-medium">100+</strong> kreator & profesional.
              </p>
            </div>
          </div>

          {/* Right: Premium Visual Composition */}
          <div className="lg:col-span-6 lg:col-start-7 relative">
            <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/3] lg:aspect-[4/4.5] flex items-center justify-center">
              
              {/* Subtle ambient glow behind the composition */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/[0.03] rounded-full blur-[100px]" />

              {/* Composition Wrapper */}
              <div className="relative w-full max-w-[500px] h-[600px]">
                
                {/* Back Card: Services/List */}
                <div className="absolute top-0 right-0 w-[75%] h-[60%] rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 shadow-2xl p-6 transform translate-x-4 -translate-y-4 rotate-[2deg] opacity-60 backdrop-blur-xl">
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 mb-2" />
                    <div className="w-1/2 h-4 rounded-full bg-white/10" />
                    <div className="w-3/4 h-3 rounded-full bg-white/5" />
                    
                    <div className="mt-auto space-y-3">
                      <div className="w-full h-12 rounded-xl border border-white/5 bg-white/[0.02]" />
                      <div className="w-full h-12 rounded-xl border border-white/5 bg-white/[0.02]" />
                    </div>
                  </div>
                </div>

                {/* Middle Card: Image/Portfolio Focus */}
                <div className="absolute top-[10%] left-0 w-[65%] h-[55%] rounded-2xl bg-[#080808] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden transform -translate-x-4 translate-y-4 -rotate-[4deg] z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-50" />
                  {/* Faux image content */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-[#080808] to-transparent">
                    <div className="w-2/3 h-5 rounded-md bg-white/80 mb-2" />
                    <div className="w-1/3 h-3 rounded-md bg-white/40" />
                  </div>
                </div>

                {/* Front Card: Clean, typographic identity block */}
                <div className="absolute bottom-[5%] right-[5%] w-[80%] rounded-2xl bg-white/[0.02] border border-white/[0.12] backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] p-8 z-20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 border border-white/20" />
                    <div>
                      <div className="text-xl font-medium text-white mb-1">Studio Arsitektur</div>
                      <div className="text-sm text-white/50">Jakarta, ID</div>
                    </div>
                  </div>

                  <p className="text-[15px] leading-relaxed text-white/70 mb-8 font-light">
                    Kami merancang ruang yang berfokus pada ketenangan, minimalisme, dan harmoni dengan alam sekitar.
                  </p>

                  <div className="w-full h-12 rounded-xl bg-white text-black flex items-center justify-center text-[14px] font-medium">
                    Jadwalkan Konsultasi
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
