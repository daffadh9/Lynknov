export default function SolutionSection() {
  return (
    <section className="px-6 py-32 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-4">
            02 — Arsitektur
          </h2>
          <h3 className="text-3xl md:text-4xl font-medium text-white leading-tight max-w-2xl">
            Sistem yang dirancang untuk bekerja bersama.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Primary Pillar - Large focus block */}
          <div className="lg:col-span-7 bg-[#111] border border-white/5 p-10 md:p-14 flex flex-col justify-between min-h-[480px] relative overflow-hidden group rounded-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
            <div className="relative z-10">
              <h4 className="text-2xl font-medium text-white mb-4">Structured Presence</h4>
              <p className="text-neutral-400 leading-relaxed max-w-md">
                Susun portofolio, layanan, dan aset digital Anda dalam satu hierarki yang masuk akal. Bukan sekadar daftar link, melainkan representasi utuh dari nilai yang Anda bawa.
              </p>
            </div>
            
            {/* Polished Visual Structure Diagram */}
            <div className="mt-12 relative z-10 h-40 w-full flex items-end gap-3">
              <div className="w-1/3 h-full bg-gradient-to-t from-white/10 to-white/5 rounded-t-xl border-x border-t border-white/10 p-4">
                <div className="w-12 h-2 bg-white/20 rounded-full mb-3" />
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-2" />
                <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
              </div>
              <div className="w-1/3 h-3/4 bg-gradient-to-t from-blue-500/10 to-blue-500/5 rounded-t-xl border-x border-t border-blue-500/20 p-4">
                <div className="w-12 h-2 bg-blue-400/40 rounded-full mb-3" />
                <div className="w-full h-1.5 bg-blue-400/20 rounded-full mb-2" />
                <div className="w-2/3 h-1.5 bg-blue-400/20 rounded-full" />
              </div>
              <div className="w-1/3 h-1/2 bg-gradient-to-t from-white/5 to-white/[0.02] rounded-t-xl border-x border-t border-white/5 p-4">
                <div className="w-10 h-2 bg-white/20 rounded-full mb-3" />
                <div className="w-full h-1.5 bg-white/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Supporting Pillars - Stacked for hierarchy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="flex-1 bg-[#111] border border-white/5 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium text-white mb-3">Conversion Flow</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Pandu pengunjung dengan CTA yang jelas dan navigasi yang disengaja. Setiap halaman memiliki tujuan spesifik.
                </p>
              </div>
            </div>

            <div className="flex-1 bg-[#111] border border-white/5 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h4 className="text-xl font-medium text-white mb-3">Lead Capture</h4>
                <p className="text-neutral-400 leading-relaxed">
                  Tangkap data audiens yang tertarik secara otomatis, ubah traffic yang melintas menjadi prospek yang terdata.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
