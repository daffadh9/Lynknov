import React from "react";
import LegalLayout from "@/components/layout/LegalLayout";

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Batasan tanggung jawab dan ekspektasi penggunaan. Lynknov membantu membangun sistem digital yang lebih baik, tetapi tidak menjanjikan hasil bisnis tertentu."
      lastUpdated="30 Maret 2026"
    >
      <p>
        Lynknov menyediakan alat, tampilan, sistem, dan fitur yang dirancang untuk membantu pengguna membangun dan mengelola kehadiran digital mereka secara lebih terstruktur. Namun, penggunaan Lynknov tidak dapat diartikan sebagai jaminan atas hasil tertentu.
      </p>

      <h2>1. No Guaranteed Results</h2>
      <p>Lynknov tidak menjamin bahwa penggunaan platform akan secara otomatis:</p>
      <ul>
        <li>meningkatkan pendapatan</li>
        <li>menghasilkan klien</li>
        <li>meningkatkan penjualan</li>
        <li>meningkatkan trafik</li>
        <li>mempercepat pertumbuhan bisnis</li>
        <li>menghasilkan outcome tertentu</li>
      </ul>
      <p>
        Setiap hasil tetap bergantung pada banyak faktor, termasuk strategi pengguna, kualitas penawaran, konsistensi penggunaan, kondisi pasar, dan faktor eksternal lainnya.
      </p>

      <h2>2. Informational and Platform Use Only</h2>
      <p>
        Konten, struktur, rekomendasi, atau fitur yang tersedia di Lynknov disediakan untuk mendukung penggunaan platform dan pengelolaan kehadiran digital. Lynknov bukan pengganti nasihat hukum, keuangan, bisnis, atau profesional lain yang spesifik.
      </p>

      <h2>3. User Responsibility</h2>
      <p>Pengguna tetap bertanggung jawab penuh atas:</p>
      <ul>
        <li>konten yang dipublikasikan</li>
        <li>keputusan bisnis yang diambil</li>
        <li>cara menggunakan fitur platform</li>
        <li>kepatuhan terhadap hukum dan regulasi yang berlaku</li>
      </ul>

      <h2>4. Third-Party Integrations</h2>
      <p>
        Jika Lynknov terhubung dengan layanan pihak ketiga, Lynknov tidak bertanggung jawab atas akurasi, ketersediaan, perubahan, atau kerugian yang timbul dari layanan pihak ketiga tersebut.
      </p>

      <h2>5. As-Is Basis</h2>
      <p>
        Layanan disediakan sebagaimana adanya dan sebagaimana tersedia. Meskipun kami berupaya menjaga kualitas layanan, kami tidak menjamin bahwa seluruh fitur akan selalu tersedia, bebas gangguan, atau sepenuhnya sesuai untuk semua kebutuhan pengguna.
      </p>

      <h2>6. Contact</h2>
      <p>
        Jika Anda memiliki pertanyaan mengenai disclaimer ini, hubungi:<br/>
        <a href="mailto:hallo@lynknov.com">hallo@lynknov.com</a>
      </p>
    </LegalLayout>
  );
}
