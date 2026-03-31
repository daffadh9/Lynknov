import React from "react";
import LegalLayout from "@/components/layout/LegalLayout";

export default function ContactPage() {
  return (
    <LegalLayout
      title="Contact Lynknov"
      subtitle="Kami senang menerima pertanyaan, masukan, dan komunikasi yang relevan terkait Lynknov."
    >
      <p>
        Jika Anda ingin menghubungi kami mengenai:
      </p>
      <ul>
        <li>pertanyaan umum</li>
        <li>dukungan penggunaan platform</li>
        <li>kerja sama</li>
        <li>permintaan terkait privasi</li>
        <li>laporan masalah</li>
        <li>kebutuhan legal atau kebijakan</li>
      </ul>

      <p>
        silakan hubungi kami melalui email berikut:<br/>
        <a href="mailto:hallo@lynknov.com" className="text-xl mt-2 inline-block font-medium">hallo@lynknov.com</a>
      </p>

      <h2>Response Expectations</h2>
      <p>
        Kami akan berupaya meninjau dan merespons pesan yang masuk dalam waktu yang wajar. Waktu respons dapat bervariasi tergantung pada jenis pertanyaan dan volume permintaan yang sedang berlangsung.
      </p>

      <h2>Notes</h2>
      <p>
        Untuk membantu kami merespons lebih cepat, mohon sertakan informasi yang relevan di email Anda, seperti:
      </p>
      <ul>
        <li>subjek yang jelas</li>
        <li>detail pertanyaan atau masalah</li>
        <li>tangkapan layar atau konteks tambahan bila diperlukan</li>
      </ul>
    </LegalLayout>
  );
}
