import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020202] text-[#E5E5E5] font-sans selection:bg-white/20 selection:text-white flex flex-col overflow-hidden">
      {/* 
        Minimal Top Navigation 
        Strictly functional, high-contrast, perfectly aligned
      */}
      <nav className="w-full max-w-[1400px] mx-auto px-8 md:px-12 py-10 flex items-center justify-between z-50">
        <div className="text-xl tracking-tight font-medium text-white">
          Lynknov<span className="text-white/20">.</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.05em] uppercase text-white/40 font-medium">
          <a href="#" className="hover:text-white transition-colors duration-300">Konsep</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Platform</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Akses</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300">Log in</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left Column: Typography & Intent (Span 6) */}
          <div className="lg:col-span-6 flex flex-col items-start pt-10 lg:pt-0">
            {/* Trust / Proof Line */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[1px] bg-white/20"></div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">
                The Interactive Business OS
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] leading-[1.05] tracking-[-0.04em] font-medium text-white mb-8">
              Strukturkan <br />
              <span className="text-white/30">presence digital Anda.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg md:text-xl text-white/40 leading-[1.6] max-w-[30rem] mb-12 font-light tracking-wide">
              Lynknov mengubah tautan, penawaran, dan operasional Anda menjadi satu sistem bisnis yang elegan, terarah, dan siap membangun kepercayaan.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="bg-white text-black px-10 py-4 text-[13px] uppercase tracking-[0.1em] font-bold hover:bg-white/90 transition-all duration-300">
                Mulai Membangun
              </button>
              <button className="group flex items-center gap-3 px-2 py-4 text-[13px] uppercase tracking-[0.1em] font-bold text-white/50 hover:text-white transition-all duration-300">
                <span>Pelajari Konsep</span>
                <span className="w-8 h-[1px] bg-white/20 group-hover:bg-white/60 group-hover:w-12 transition-all duration-300"></span>
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Concept "The Index" (Span 5, offset 1) */}
          <div className="lg:col-span-5 lg:col-start-8 flex items-center justify-center lg:justify-end pb-20 lg:pb-0">
            <div className="relative w-full max-w-[440px] aspect-[4/5] bg-[#050505] border border-white/[0.08] p-10 flex flex-col justify-between overflow-hidden group">
              
              {/* Subtle dynamic lighting */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.02] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-110"></div>
              
              {/* Header */}
              <div className="flex justify-between items-start relative z-10">
                <div className="w-1.5 h-1.5 bg-white/30 rounded-none"></div>
                <div className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-medium">LNK/OS—01</div>
              </div>

              {/* Central Abstract Architecture */}
              <div className="space-y-14 relative z-10 w-[85%]">
                {/* Layer 1: Identity */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Identitas</span>
                    <span className="text-[9px] text-white/10 font-mono">0.1</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 relative">
                    <div className="absolute top-0 left-0 w-[40%] h-[1px] bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
                  </div>
                </div>
                
                {/* Layer 2: Offers */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Penawaran</span>
                    <span className="text-[9px] text-white/10 font-mono">0.2</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 relative">
                    <div className="absolute top-0 left-[20%] w-[60%] h-[1px] bg-white/40"></div>
                    <div className="absolute -top-1 left-[20%] w-[1px] h-3 bg-white/20"></div>
                    <div className="absolute -top-1 left-[80%] w-[1px] h-3 bg-white/20"></div>
                  </div>
                </div>

                {/* Layer 3: Operations */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Operasional</span>
                    <span className="text-[9px] text-white/10 font-mono">0.3</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 relative">
                    <div className="absolute top-0 right-0 w-[30%] h-[1px] bg-white/20"></div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end relative z-10">
                <div className="flex gap-2">
                  <div className="w-4 h-4 border border-white/10 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white/20"></div>
                  </div>
                  <div className="w-4 h-4 border border-white/10"></div>
                </div>
                <div className="text-white/20 text-[9px] uppercase tracking-widest font-mono">
                  SYS.READY
                </div>
              </div>
              
              {/* Decorative grid overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMikiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

