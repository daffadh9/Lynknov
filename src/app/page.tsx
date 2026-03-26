import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="text-sm font-semibold tracking-[0.18em] text-white">
            LYNKNOV
          </div>

          <nav className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            <a href="#diagnosis" className="transition-colors hover:text-white">
              Diagnosis
            </a>
            <a href="#architecture" className="transition-colors hover:text-white">
              Architecture
            </a>
            <a href="#belief" className="transition-colors hover:text-white">
              Belief
            </a>
          </nav>

          <Link
            href="/auth/signup"
            className="rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            Mulai
          </Link>
        </div>
      </header>

      {/* Scene 1 — Opening */}
      <section className="border-b border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-end lg:col-span-7">
            <div className="mb-8 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Interactive Business OS
            </div>

            {/* No forced line breaks, relies on max-width for natural wrap */}
            <h1 className="max-w-[15ch] text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]">
              Presence digital yang bekerja seperti sistem.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
              Lynknov membantu brand, creator, dan bisnis jasa membangun halaman
              yang bukan hanya terlihat rapi, tetapi benar-benar mengarahkan
              audiens, membangun kepercayaan, dan menangkap peluang.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#5B7CFF] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#4a6cff]"
              >
                Bangun Sistem Anda
              </Link>

              <a
                href="#architecture"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:text-white"
              >
                Lihat Cara Kerjanya
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                Struktur lebih jelas
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                Navigasi lebih sengaja
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                Lead lebih terukur
              </span>
            </div>
          </div>

          {/* Right Panel: Logical structure, not a flashy UI mockup */}
          <div className="lg:col-span-5">
            <div className="relative ml-auto flex h-full min-h-[540px] flex-col border border-white/10 bg-[#0A0A0A] p-8">
              <div className="mb-8 flex items-start justify-between border-b border-white/5 pb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Operating Layer
                  </div>
                  <div className="mt-2 text-sm font-medium text-white">
                    Lynknov Workspace
                  </div>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-400">
                  Active
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="border border-white/5 bg-[#0F0F0F] p-5">
                  <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Positioning
                  </div>
                  <div className="text-sm font-medium text-white">
                    Creator Strategi Konten untuk Bisnis Jasa
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/5 bg-[#0F0F0F] p-5">
                    <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Paths
                    </div>
                    <div className="space-y-3 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-neutral-600" /> Portfolio
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-neutral-600" /> Services
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-blue-500/50" /> Lead Form
                      </div>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-[#0F0F0F] p-5">
                    <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Intent
                    </div>
                    <div className="space-y-3 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-neutral-600" /> Discover
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-neutral-600" /> Trust
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-blue-500/50" /> Convert
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 bg-[#0F0F0F] p-5">
                  <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Active Flow
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
                    <span className="border border-white/10 bg-white/5 px-3 py-1.5">Visit</span>
                    <span className="text-neutral-600">→</span>
                    <span className="border border-white/10 bg-white/5 px-3 py-1.5">Explore</span>
                    <span className="text-neutral-600">→</span>
                    <span className="border border-white/10 bg-white/5 px-3 py-1.5">Trust</span>
                    <span className="text-neutral-600">→</span>
                    <span className="border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-blue-400">Contact</span>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Scene 2 — Diagnosis */}
      <section id="diagnosis" className="border-b border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
          <div className="lg:col-span-4">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Diagnosis
            </div>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white lg:text-4xl">
              Tampilan rapi tidak otomatis menciptakan arah.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-400">
              Banyak bio tool dan landing page berhenti di permukaan. Mereka
              terlihat aktif, tetapi tidak benar-benar menyusun konteks,
              perjalanan, dan konversi.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-white/10 py-10">
              <div className="mb-4 text-xs uppercase tracking-[0.1em] text-blue-500">
                01 — Fragmentasi
              </div>
              <h3 className="text-2xl font-medium text-white">
                Informasi tampil, tapi tidak membentuk persepsi yang utuh.
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">
                Audiens melihat banyak hal sekaligus tanpa hierarki yang jelas.
                Akibatnya, mereka tahu Anda ada, tapi tidak benar-benar paham
                nilai yang Anda tawarkan.
              </p>
            </div>

            <div className="border-t border-white/10 py-10">
              <div className="mb-4 text-xs uppercase tracking-[0.1em] text-blue-500">
                02 — Navigasi Pasif
              </div>
              <h3 className="text-2xl font-medium text-white">
                Pengunjung berjalan sendiri, bukan dipandu.
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">
                Halaman berubah menjadi direktori link, bukan sistem yang
                mengarahkan audiens menuju langkah bernilai tinggi.
              </p>
            </div>

            <div className="border-y border-white/10 py-10">
              <div className="mb-4 text-xs uppercase tracking-[0.1em] text-blue-500">
                03 — Kebocoran Minat
              </div>
              <h3 className="text-2xl font-medium text-white">
                Traffic datang, lalu pergi tanpa meninggalkan jejak.
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">
                Saat tidak ada mekanisme penangkapan yang jelas, ketertarikan
                hilang begitu saja dan peluang tidak pernah berubah menjadi
                prospek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3 — Architecture */}
      <section id="architecture" className="border-b border-white/5 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Operating System
            </div>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white lg:text-5xl">
              Bukan halaman tunggal. Sebuah lapisan kerja yang saling terhubung.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              Lynknov menyusun presence digital sebagai sistem: positioning yang
              jelas, alur konversi yang sengaja, dan penangkapan lead yang
              terstruktur.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="border border-white/10 bg-[#0A0A0A] p-8 lg:col-span-7 lg:p-12">
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                Core Layer
              </div>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-white">
                Structured Presence
              </h3>
              <p className="mt-5 max-w-xl leading-relaxed text-neutral-400">
                Semua elemen utama bisnis Anda — value proposition, layanan,
                portofolio, credibility, dan jalur aksi — berada dalam hierarki
                yang bisa dipahami audiens dalam sekali scan.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border border-white/5 bg-[#0F0F0F] p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Identity
                  </div>
                  <div className="mt-3 text-sm font-medium text-white">Positioning</div>
                </div>
                <div className="border border-white/5 bg-[#0F0F0F] p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Offer
                  </div>
                  <div className="mt-3 text-sm font-medium text-white">Services / Proof</div>
                </div>
                <div className="border border-white/5 bg-[#0F0F0F] border-b-2 border-b-blue-500 p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Action
                  </div>
                  <div className="mt-3 text-sm font-medium text-white">Lead Capture</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 border border-white/10 bg-[#0A0A0A] p-8 lg:p-10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Support Layer A
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">
                  Conversion Flow
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-400">
                  Pengunjung diarahkan dengan tujuan yang jelas, bukan dibiarkan
                  memilih sendiri tanpa konteks.
                </p>
              </div>

              <div className="flex-1 border border-white/10 bg-[#0A0A0A] p-8 lg:p-10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Support Layer B
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">
                  Lead Capture
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-400">
                  Minat yang muncul tidak hilang. Sistem menangkapnya dan
                  mengubahnya menjadi prospek yang bisa ditindaklanjuti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4 — Belief */}
      {/* Light rhythm: smaller padding, strictly typographic */}
      <section id="belief" className="border-b border-white/5 bg-[#030303]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl border-l border-white/10 pl-8 lg:pl-12">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
              Belief
            </div>
            <p className="mt-6 text-3xl font-medium leading-[1.2] tracking-[-0.02em] text-white lg:text-4xl">
              Presence digital seharusnya bekerja seperti sistem operasional,
              bukan sekadar halaman statis yang terlihat aktif.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              Ketika struktur, arah, dan aksi disusun dengan benar, halaman Anda
              tidak hanya tampil lebih profesional — ia mulai bekerja menjemput peluang.
            </p>
          </div>
        </div>
      </section>

      {/* Scene 5 — Final CTA */}
      {/* Heavy rhythm: massive final padding */}
      <section className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-48">
        <div className="max-w-4xl">
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-blue-500">
            Get Started
          </div>
          <h2 className="max-w-[15ch] mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
            Bangun fondasi digital yang terarah.
          </h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-neutral-400">
            Tinggalkan halaman yang hanya terlihat rapi. Mulai dengan sistem
            yang membantu audiens memahami, percaya, dan bergerak.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-full bg-[#5B7CFF] px-8 py-4 text-base font-medium text-white transition hover:bg-[#4a6cff]"
            >
              Mulai Sekarang — Gratis
            </Link>

            <a
              href="#architecture"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-base font-medium text-neutral-300 transition hover:border-white/20 hover:text-white"
            >
              Pelajari Sistem
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#030303] px-6 py-12 text-sm text-neutral-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-8">
          <div>© {new Date().getFullYear()} Lynknov. All rights reserved.</div>
          <div className="hidden sm:block">Interactive Business OS</div>
        </div>
      </footer>
    </main>
  );
}