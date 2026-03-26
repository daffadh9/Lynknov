import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left: Editorial Copy & CTA */}
        <div className="lg:col-span-5 lg:col-start-1 flex flex-col items-start">
          <div className="mb-6 px-3 py-1 text-xs font-medium uppercase tracking-widest border border-white/10 rounded-full text-neutral-400">
            Business OS Layer
          </div>
          <h1 className="text-[3rem] sm:text-[4rem] leading-[1.05] font-semibold text-white tracking-[-0.03em] mb-6">
            Struktur baru <br />
            untuk bisnis <br />
            <span className="text-neutral-500">independen.</span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 mb-10 max-w-md">
            Ubah penawaran yang berserakan menjadi satu sistem terpusat. Lynknov membantu Anda mengkurasi identitas, menangkap leads, dan membangun alur konversi yang masuk akal.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
            <Link href="/auth/signup" className="bg-white text-black px-7 py-3.5 rounded-full font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto text-center">
              Mulai Gratis
            </Link>
            <Link href="#demo" className="px-7 py-3.5 rounded-full font-medium border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto text-center text-white">
              Lihat Demo
            </Link>
          </div>
          
          {/* Trust Strip embedded directly in the hero rhythm */}
          <div className="flex items-center gap-4 pt-8 border-t border-white/10 w-full">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-[#050505]" />
              <div className="w-8 h-8 rounded-full bg-neutral-700 border border-[#050505]" />
              <div className="w-8 h-8 rounded-full bg-neutral-600 border border-[#050505]" />
            </div>
            <p className="text-sm text-neutral-500">
              Digunakan oleh 100+ solo founder & kreator.
            </p>
          </div>
        </div>

        {/* Right: Tall Conceptual Visual Panel */}
        <div className="lg:col-span-6 lg:col-start-7 relative">
          <div className="aspect-[3/4] sm:aspect-[4/5] w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8 relative flex flex-col shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/[0.05] to-transparent pointer-events-none" />
            
            {/* Polished UI Mockup */}
            <div className="w-full flex-1 flex flex-col gap-6 relative z-10">
              {/* Profile Header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10" />
                <div>
                  <div className="w-32 h-4 bg-white/20 rounded-full mb-2" />
                  <div className="w-20 h-3 bg-white/10 rounded-full" />
                </div>
              </div>

              {/* Action grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 rounded-xl p-4 flex flex-col justify-end">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 mb-auto" />
                  <div className="w-16 h-3 bg-white/20 rounded-full mb-1" />
                  <div className="w-12 h-2 bg-white/10 rounded-full" />
                </div>
                <div className="h-24 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 rounded-xl p-4 flex flex-col justify-end">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 mb-auto" />
                  <div className="w-20 h-3 bg-white/20 rounded-full mb-1" />
                  <div className="w-10 h-2 bg-white/10 rounded-full" />
                </div>
              </div>

              {/* List items */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="h-16 w-full bg-[#111] border border-white/5 rounded-xl flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/5" />
                  <div className="flex-1">
                    <div className="w-24 h-3 bg-white/20 rounded-full mb-1.5" />
                    <div className="w-16 h-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/5" />
                </div>
                <div className="h-16 w-full bg-[#111] border border-white/5 rounded-xl flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/5" />
                  <div className="flex-1">
                    <div className="w-32 h-3 bg-white/20 rounded-full mb-1.5" />
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/5" />
                </div>
                <div className="h-16 w-full bg-[#111] border border-white/5 rounded-xl flex items-center px-4 gap-3 opacity-50">
                  <div className="w-8 h-8 rounded-md bg-white/5" />
                  <div className="flex-1">
                    <div className="w-20 h-3 bg-white/20 rounded-full mb-1.5" />
                    <div className="w-12 h-2 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fade bottom out */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
