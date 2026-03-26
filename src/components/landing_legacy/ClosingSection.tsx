import Link from 'next/link';

export default function ClosingSection() {
  return (
    <>
      {/* 5. Proof / Positioning Strip */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#030303] text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-medium text-neutral-400 leading-relaxed">
            "Bukan sekadar mengganti warna tombol. Ini tentang memiliki <span className="text-white">layer operasional</span> yang membuat bisnis independen Anda terlihat dan terasa layaknya sebuah institusi."
          </h3>
        </div>
      </section>

      {/* 6. Closing CTA: Massive negative space, purely typographic focus */}
      <section className="py-48 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-8">
          03 — Inisiasi
        </h2>
        <h3 className="text-4xl md:text-[4rem] leading-[1.1] font-semibold text-white tracking-tight mb-8">
          Siap merapikan <br className="hidden sm:block" /> operasi digital Anda?
        </h3>
        <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
          Tinggalkan kekacauan link dan landing page mati. Beralih ke sistem yang mengutamakan konversi dan profesionalitas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/auth/signup" className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-neutral-200 transition-colors w-full sm:w-auto">
            Mulai Sekarang — Gratis
          </Link>
        </div>
      </section>
    </>
  );
}
