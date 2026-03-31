import React from "react";
import LegalLayout from "@/components/layout/LegalLayout";

export default function ChangelogPage() {
  return (
    <LegalLayout
      title="Changelog"
      subtitle="Lihat perkembangan terbaru Lynknov. Fitur baru, peningkatan pengalaman, dan perbaikan penting kami rangkum di sini secara lebih transparan."
      lastUpdated="30 Maret 2026"
    >
      <div className="flex flex-col gap-16 mt-8">
        
        {/* Version 0.2.0 */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-semibold tracking-wide">v0.2.0</span>
            <h2 className="!my-0 text-xl font-medium text-white/90">Foundation Update</h2>
            <span className="text-sm text-[var(--color-text-secondary)] ml-auto">30 Maret 2026</span>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="!my-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#a78bfa]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" /> New
              </h3>
              <ul className="!mt-0 space-y-2">
                <li>Halaman Pengaturan kini tersedia dengan struktur yang lebih lengkap, mencakup Akun, Preferensi, Keamanan, dan Integrasi.</li>
                <li>Dukungan login Google telah diaktifkan untuk alur masuk yang lebih cepat.</li>
                <li>Integrasi login GitHub mulai disiapkan sebagai metode masuk tambahan.</li>
                <li>Verifikasi 2 langkah (2FA) berbasis authenticator app telah ditambahkan untuk meningkatkan keamanan akun.</li>
                <li>Riwayat aktivitas keamanan kini mulai tersedia untuk membantu pengguna memahami perubahan penting pada akun mereka.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="!my-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" /> Improved
              </h3>
              <ul className="!mt-0 space-y-2">
                <li>Tampilan dashboard dan settings diperbarui agar terasa lebih premium, tenang, dan konsisten.</li>
                <li>Sidebar dibuat lebih bersih dengan pendekatan navigasi yang lebih minimal.</li>
                <li>Interaksi akun dan integrasi dibuat lebih rapi, termasuk alur connect dan disconnect provider.</li>
                <li>Struktur data pengaturan akun dirapikan agar lebih siap untuk iterasi fitur selanjutnya.</li>
                <li>Konsistensi visual antar card, badge, dan state UI ditingkatkan.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="!my-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Fixed
              </h3>
              <ul className="!mt-0 space-y-2">
                <li>Masalah upload avatar yang sebelumnya gagal akibat konfigurasi bucket kini telah diperbaiki.</li>
                <li>Beberapa state di halaman settings yang sebelumnya masih berupa mockup kini telah dihubungkan ke data nyata.</li>
                <li>Perilaku tombol dan interaksi yang belum fungsional di beberapa area telah dirapikan atau dihapus.</li>
                <li>Sinkronisasi antara metode masuk, status keamanan, dan tampilan UI diperbaiki agar lebih akurat.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Version 0.1.0 */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 text-[var(--color-text-secondary)] text-sm font-semibold tracking-wide">v0.1.0</span>
            <h2 className="!my-0 text-xl font-medium text-white/90">Initial Product Foundation</h2>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="!my-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#a78bfa]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" /> New
              </h3>
              <ul className="!mt-0 space-y-2">
                <li>Fondasi awal Lynknov sebagai Interactive Business OS mulai dibangun.</li>
                <li>Struktur dashboard utama mulai tersedia sebagai basis pengalaman produk.</li>
                <li>Arah visual dark-mode premium mulai diterapkan pada komponen utama.</li>
                <li>Fondasi sistem autentikasi dan onboarding mulai dipersiapkan.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="!my-0 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" /> Improved
              </h3>
              <ul className="!mt-0 space-y-2">
                <li>Identitas visual Lynknov mulai diarahkan ke sistem yang lebih modern, tenang, dan premium.</li>
                <li>Struktur navigasi mulai dirapikan untuk mendukung pertumbuhan fitur jangka panjang.</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mt-2">
              <p className="!my-0 text-sm italic text-[var(--color-text-secondary)]">
                Notes: Versi awal ini berfokus pada penyusunan fondasi produk, sistem, dan arah pengalaman pengguna sebelum masuk ke fitur inti yang lebih besar.
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <div className="mt-8 pt-12 border-t border-white/[0.05] flex flex-col gap-4 items-center text-center">
          <h3 className="!mt-0 !mb-2 text-xl font-medium text-white">What&apos;s Next?</h3>
          <p className="max-w-[500px]">
            Kami akan terus mengembangkan Lynknov secara bertahap, dengan fokus pada pengalaman yang lebih terstruktur, lebih meyakinkan, dan lebih berguna untuk pertumbuhan digital pengguna.
          </p>
          <p className="mt-4">
            Untuk pertanyaan atau masukan terkait update produk, hubungi:<br/>
            <a href="mailto:hallo@lynknov.com" className="text-white hover:text-[#a78bfa] transition-colors font-medium">hallo@lynknov.com</a>
          </p>
        </div>

      </div>
    </LegalLayout>
  );
}
