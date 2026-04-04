import { MessageSquareQuote, Star } from "lucide-react";
import { RevealWrapper } from "@/components/animations/RevealWrapper";

interface TestimonialItem {
  excerpt: string;
  name: string;
  role: string;
}

const spotlightTestimonial = {
  quote:
    "Awalnya saya cuma ingin profil yang lebih rapi. Ternyata dampaknya masuk sampai ke penjualan. Saat link Lynknov saya dibuka, calon klien datang dengan pemahaman yang jauh lebih jelas, jadi percakapan langsung masuk ke kebutuhan, budget, dan langkah kerja. Waktu follow up jadi lebih singkat, closing lebih cepat, dan nilai project yang masuk terasa lebih sehat.",
  name: "Nadia Pramesti",
  role: "brand strategist",
};

const testimonialCards: TestimonialItem[] = [
  {
    excerpt:
      "Calon klien tidak lagi minta deck tambahan. Funnel deal jadi lebih ringkas dan peluang lanjut ke proposal terasa naik.",
    name: "Raka Mahendra",
    role: "architectural photographer",
  },
  {
    excerpt:
      "Struktur ceritanya membuat orang lebih cepat paham value saya, dan itu langsung terasa ke kualitas percakapan bisnis.",
    name: "Citra Anindya",
    role: "performance marketer",
  },
  {
    excerpt:
      "Layanan saya terasa lebih premium, dan inquiry yang masuk jadi lebih serius tanpa banyak berhenti di harga.",
    name: "Gilang Perwira",
    role: "personal finance coach",
  },
  {
    excerpt:
      "Buat kreator, first impression yang rapi bikin campaign dan repeat order terasa lebih mungkin terjadi.",
    name: "Vania Kusumo",
    role: "commercial stylist",
  },
  {
    excerpt:
      "Prospect datang dengan konteks yang lebih jelas, jadi proses menuju deal terasa lebih cepat dan lebih ringan.",
    name: "Dito Ardhana",
    role: "webflow developer",
  },
  {
    excerpt:
      "Project, metodologi, dan CTA terasa lebih menyatu. Lead yang masuk ke konsultasi berbayar juga jadi lebih relevan.",
    name: "Sekar Prabasari",
    role: "interior consultant",
  },
  {
    excerpt:
      "Trust terbentuk lebih cepat, conversion rate terasa naik, dan nilai transaksi rata-rata ikut membaik.",
    name: "Kevin Satrya",
    role: "fractional cmo",
  },
  {
    excerpt:
      "Profil terasa lebih matang, dan kerja sama yang masuk jadi lebih relevan, lebih premium, dan lebih mudah jadi pemasukan.",
    name: "Ayu Lestari",
    role: "executive coach",
  },
  {
    excerpt:
      "Landing dan offer yang lebih tertata membuat audience lebih cepat paham, lalu lebih siap membeli kelas saya.",
    name: "Farrel Wicaksono",
    role: "course creator",
  },
  {
    excerpt:
      "Lead yang masuk jadi lebih qualified, percakapan awal lebih bernilai, dan peluang retainer ikut naik.",
    name: "Mira Handayani",
    role: "growth consultant",
  },
  {
    excerpt:
      "Karya, positioning, dan CTA terasa menyatu. Untuk kreator, itu bikin first impression jauh lebih kuat.",
    name: "Rendy Saputra",
    role: "visual storyteller",
  },
  {
    excerpt:
      "Alur jualannya jadi lebih masuk akal, orang lebih paham paket yang cocok, dan efeknya terasa ke omzet bulanan.",
    name: "Nabila Hartono",
    role: "business coach",
  },
  {
    excerpt:
      "Sebagai mahasiswa, saya jadi lebih pede kirim link jasa saya karena orang langsung paham saya bantu di bagian apa.",
    name: "Livia Putri",
    role: "mahasiswa",
  },
  {
    excerpt:
      "Saya jual kue rumahan. Setelah pakai Lynknov, katalog dan cara order jadi lebih rapi, jadi pembeli tidak banyak tanya hal yang sama.",
    name: "Rina Kartikasari",
    role: "ibu rumah tangga",
  },
  {
    excerpt:
      "Promo, testimoni, dan paket best seller saya terasa lebih enak dilihat. Buat seller online, itu bikin orang lebih cepat pilih.",
    name: "Bayu Prakoso",
    role: "seller online",
  },
  {
    excerpt:
      "Saya masih bangun usaha kecil, tapi halaman yang rapi bikin bisnis saya terasa lebih serius saat dibagikan ke calon pembeli.",
    name: "Salsa Nirmala",
    role: "pemilik usaha rumahan",
  },
];

const testimonialColumnTop = testimonialCards.filter((_, index) => index % 2 === 0);
const testimonialColumnBottom = testimonialCards.filter((_, index) => index % 2 === 1);

const clampStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export function LandingTestimonialsSection() {
  return (
    <section className="section-space section-divider-soft relative overflow-hidden border-t border-white/5 bg-[var(--color-surface-base)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid-soft absolute inset-0 opacity-[0.05]"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"></div>
        <div className="ambient-drift absolute left-[8%] top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_68%)] blur-[150px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1220px] px-6 lg:px-12">
        <RevealWrapper direction="up" className="section-intro text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
            <MessageSquareQuote className="h-3.5 w-3.5 text-white/60" />
            Social Proof
          </div>
          <h2 className="mb-5 text-4xl font-medium tracking-tight text-white md:text-5xl">
            Review yang singkat, tapi langsung terasa.
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
            Lynknov membantu profesional, pelaku usaha kecil, kreator, sampai orang yang baru mulai tampil lebih siap dan lebih meyakinkan.
          </p>
        </RevealWrapper>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-6">
          <RevealWrapper direction="up" delay={0.1} className="h-full">
            <div className="group relative flex h-fit flex-col justify-between overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(145deg,#1a1a1d_0%,#0c0c0e_55%,#070708_100%)] p-7 shadow-[0_35px_100px_-40px_rgba(0,0,0,0.95)] sm:p-8 md:rounded-[34px] md:p-9">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/[0.04] blur-[90px] transition-colors duration-500 group-hover:bg-white/[0.06]"></div>
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1 opacity-95">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-white text-white" />
                    ))}
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
                    <MessageSquareQuote className="h-5 w-5 text-white/70" />
                  </div>
                </div>
                <p className="text-[1.08rem] font-medium leading-[1.6] text-white sm:text-[1.2rem] md:text-[1.42rem] lg:text-[1.56rem]">
                  &quot;{spotlightTestimonial.quote}&quot;
                </p>
              </div>
              <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
                <div className="text-base font-medium text-white">{spotlightTestimonial.name}</div>
                <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{spotlightTestimonial.role}</div>
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={0.16}>
            <div className="relative h-[620px] overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(9,9,11,0.96)_100%)] p-3 backdrop-blur-sm sm:p-4 md:h-[700px] md:rounded-[34px]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[var(--color-surface-base)] via-[var(--color-surface-base)] to-transparent md:h-28"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[var(--color-surface-base)] via-[var(--color-surface-base)] to-transparent md:h-28"></div>

              <div className="grid h-full gap-4 sm:grid-cols-2">
                <div className="group relative h-full overflow-hidden rounded-[26px]">
                  <div
                    className="flex flex-col gap-4 pt-3 will-change-transform animate-[marquee-vertical_42s_linear_infinite] group-hover:[animation-play-state:paused]"
                    style={{ animationDirection: "reverse" }}
                  >
                    {[...testimonialColumnTop, ...testimonialColumnTop].map((testi, i) => (
                      <div
                        key={`${testi.name}-top-${i}`}
                        className="flex h-[210px] w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(12,12,14,0.94)_100%)] p-4 backdrop-blur-sm transition-all duration-500 hover:border-white/14 sm:rounded-[24px] sm:p-5 md:h-[220px]"
                      >
                        <div>
                          <div className="mb-3 flex gap-1 opacity-80">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3.5 w-3.5 fill-white text-white" />
                            ))}
                          </div>
                          <p className="text-sm leading-[1.68] text-[var(--color-text-secondary)]" style={clampStyle}>
                            &quot;{testi.excerpt}&quot;
                          </p>
                        </div>
                        <div className="border-t border-white/8 pt-4">
                          <div className="text-sm font-medium text-white">{testi.name}</div>
                          <div className="mt-1 text-xs text-[var(--color-text-tertiary)]">{testi.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="group relative h-full overflow-hidden rounded-[26px]">
                  <div className="flex flex-col gap-4 pt-3 will-change-transform animate-[marquee-vertical_42s_linear_infinite] group-hover:[animation-play-state:paused]">
                    {[...testimonialColumnBottom, ...testimonialColumnBottom].map((testi, i) => (
                      <div
                        key={`${testi.name}-bottom-${i}`}
                        className="flex h-[210px] w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(12,12,14,0.94)_100%)] p-4 backdrop-blur-sm transition-all duration-500 hover:border-white/14 sm:rounded-[24px] sm:p-5 md:h-[220px]"
                      >
                        <div>
                          <div className="mb-3 flex gap-1 opacity-80">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3.5 w-3.5 fill-white text-white" />
                            ))}
                          </div>
                          <p className="text-sm leading-[1.68] text-[var(--color-text-secondary)]" style={clampStyle}>
                            &quot;{testi.excerpt}&quot;
                          </p>
                        </div>
                        <div className="border-t border-white/8 pt-4">
                          <div className="text-sm font-medium text-white">{testi.name}</div>
                          <div className="mt-1 text-xs text-[var(--color-text-tertiary)]">{testi.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
