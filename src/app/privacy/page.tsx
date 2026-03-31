import React from "react";
import LegalLayout from "@/components/layout/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Bagaimana kami menangani data Anda. Kami berkomitmen untuk memproses informasi pengguna secara wajar, relevan, dan bertanggung jawab."
      lastUpdated="30 Maret 2026"
    >
      <p>
        Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana Lynknov mengumpulkan, menggunakan, menyimpan, dan melindungi informasi yang berkaitan dengan penggunaan layanan kami.
      </p>

      <h2>1. Information We Collect</h2>
      <p>Kami dapat mengumpulkan informasi berikut:</p>

      <h3>a. Information You Provide</h3>
      <p>Informasi yang Anda berikan secara langsung, seperti:</p>
      <ul>
        <li>nama</li>
        <li>alamat email</li>
        <li>informasi profil</li>
        <li>username</li>
        <li>data akun</li>
        <li>informasi lain yang Anda isi saat menggunakan Lynknov</li>
      </ul>

      <h3>b. Usage Information</h3>
      <p>Kami dapat mengumpulkan informasi teknis dan penggunaan, seperti:</p>
      <ul>
        <li>jenis perangkat</li>
        <li>browser</li>
        <li>halaman yang diakses</li>
        <li>interaksi dengan fitur</li>
        <li>waktu akses</li>
        <li>data performa dasar</li>
      </ul>

      <h3>c. Authentication and Security Information</h3>
      <p>
        Jika Anda menggunakan login pihak ketiga atau fitur keamanan tambahan, kami dapat memproses data yang relevan untuk autentikasi, keamanan akun, dan pencegahan penyalahgunaan.
      </p>

      <h2>2. How We Use Information</h2>
      <p>Kami menggunakan informasi untuk:</p>
      <ul>
        <li>menyediakan dan menjalankan layanan</li>
        <li>mengelola akun Anda</li>
        <li>meningkatkan pengalaman pengguna</li>
        <li>menjaga keamanan platform</li>
        <li>mencegah penyalahgunaan dan aktivitas yang mencurigakan</li>
        <li>memberikan dukungan pengguna</li>
        <li>mengembangkan fitur baru</li>
        <li>memenuhi kewajiban hukum jika diperlukan</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>Kami tidak menjual data pribadi Anda.</p>
      <p>Kami dapat membagikan informasi secara terbatas:</p>
      <ul>
        <li>kepada penyedia layanan yang membantu operasional platform</li>
        <li>jika diwajibkan oleh hukum</li>
        <li>untuk melindungi hak, keamanan, dan integritas Lynknov atau pengguna lain</li>
        <li>dalam konteks perubahan bisnis seperti merger, akuisisi, atau restrukturisasi, jika relevan</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>Kami menyimpan informasi selama diperlukan untuk:</p>
      <ul>
        <li>menjalankan layanan</li>
        <li>memenuhi kewajiban hukum</li>
        <li>menyelesaikan sengketa</li>
        <li>menegakkan ketentuan kami</li>
        <li>menjaga keamanan dan rekam aktivitas yang relevan</li>
      </ul>

      <h2>5. Security</h2>
      <p>
        Kami menerapkan langkah-langkah yang wajar untuk melindungi informasi pengguna. Namun, tidak ada sistem digital yang dapat dijamin sepenuhnya aman. Karena itu, pengguna juga bertanggung jawab untuk menjaga keamanan akun dan metode login mereka.
      </p>

      <h2>6. Third-Party Services</h2>
      <p>
        Lynknov dapat menggunakan layanan pihak ketiga untuk autentikasi, infrastruktur, penyimpanan, analitik, atau fitur pendukung lainnya. Data yang diproses melalui layanan tersebut dapat tunduk pada kebijakan mereka masing-masing.
      </p>

      <h2>7. Your Choices</h2>
      <p>Bergantung pada konteks layanan, Anda dapat:</p>
      <ul>
        <li>memperbarui informasi akun</li>
        <li>mengubah preferensi tertentu</li>
        <li>meminta penghapusan akun, jika tersedia</li>
        <li>menghubungi kami terkait pertanyaan privasi</li>
      </ul>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Lynknov tidak ditujukan untuk anak-anak yang tidak memenuhi batas usia yang diizinkan menurut hukum yang berlaku. Kami tidak secara sengaja mengumpulkan data anak-anak tanpa dasar yang sah.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Jika ada perubahan penting, kami dapat memberikan pemberitahuan yang wajar melalui layanan.
      </p>

      <h2>10. Contact</h2>
      <p>
        Untuk pertanyaan terkait privasi atau permintaan terkait data, hubungi:<br/>
        <a href="mailto:hallo@lynknov.com">hallo@lynknov.com</a>
      </p>
    </LegalLayout>
  );
}
