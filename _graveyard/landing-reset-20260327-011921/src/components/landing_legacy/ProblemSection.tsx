export default function ProblemSection() {
  return (
    <section className="px-6 py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-4">
            01 — Diagnosis
          </h2>
          <h3 className="text-3xl font-medium text-white mb-6 leading-tight">
            Estetika tidak mendatangkan klien.
          </h3>
          <p className="text-neutral-400 leading-relaxed">
            Sebagian besar landing page dan bio tool berhenti di tampilan. Mereka tidak dirancang untuk membangun kepercayaan atau menangkap leads secara sengaja.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 flex flex-col">
          <div className="border-t border-white/10 py-10">
            <div className="text-blue-500 font-mono text-sm mb-4">01. Fragmentasi</div>
            <h4 className="text-xl font-medium text-white mb-3">Informasi Berantakan</h4>
            <p className="text-neutral-400 leading-relaxed max-w-xl">
              Pengunjung dibingungkan oleh tumpukan link yang tidak dikurasi. Tanpa hierarki yang jelas, audiens Anda kehilangan konteks tentang apa yang sebenarnya Anda tawarkan.
            </p>
          </div>
          <div className="border-t border-white/10 py-10">
            <div className="text-blue-500 font-mono text-sm mb-4">02. Navigasi Pasif</div>
            <h4 className="text-xl font-medium text-white mb-3">Tanpa Alur Konversi</h4>
            <p className="text-neutral-400 leading-relaxed max-w-xl">
              Banyak halaman hanya bertindak sebagai direktori pasif. Tidak ada perjalanan yang disengaja untuk memandu audiens potensial menuju tindakan yang bernilai tinggi.
            </p>
          </div>
          <div className="border-y border-white/10 py-10">
            <div className="text-blue-500 font-mono text-sm mb-4">03. Kebocoran Traffic</div>
            <h4 className="text-xl font-medium text-white mb-3">Kehilangan Prospek</h4>
            <p className="text-neutral-400 leading-relaxed max-w-xl">
              Sistem statis gagal menangkap ketertarikan. Saat pengunjung pergi tanpa meninggalkan kontak, Anda membiarkan prospek menghilang tanpa jejak.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
