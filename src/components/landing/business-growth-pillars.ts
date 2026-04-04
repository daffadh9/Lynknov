export type BusinessGrowthPillarId =
  | "interactive-business-os"
  | "portfolio-showcase"
  | "commerce-hub"
  | "lead-engine"
  | "marketing-suite";

export interface BusinessGrowthPillar {
  id: BusinessGrowthPillarId;
  number: string;
  name: string;
  eyebrow: string;
  selectorDescription: string;
  shortDefinition: string;
  landingDescription: string;
  coreUserValue: string;
  highlights: string[];
  supportingCopy: string;
  outcomeLine: string;
}

export const businessGrowthPillars: BusinessGrowthPillar[] = [
  {
    id: "interactive-business-os",
    number: "01",
    name: "Interactive Business OS",
    eyebrow: "01 - Interactive Business OS",
    selectorDescription: "Pusat halaman publik, CTA, dan first impression bisnis Anda.",
    shortDefinition:
      "Halaman publik profesional untuk menampilkan identitas, CTA, dan penawaran inti dalam satu tempat.",
    landingDescription:
      "Membantu orang lebih cepat memahami siapa Anda dan ke mana mereka harus melangkah.",
    coreUserValue:
      "Bukan sekadar hadir di internet, tetapi terlihat lebih siap dan lebih meyakinkan sejak awal.",
    highlights: [
      "Halaman publik yang lebih profesional",
      "CTA dan link yang lebih strategis",
      "Preview karya dan penawaran dalam satu tempat",
    ],
    supportingCopy:
      "Semua yang paling penting tersusun dalam satu permukaan yang rapi, hidup, dan mudah dipahami.",
    outcomeLine: "Tampil lebih profesional. Lebih jelas. Lebih mudah dikonversi.",
  },
  {
    id: "portfolio-showcase",
    number: "02",
    name: "Portfolio Showcase",
    eyebrow: "02 - Portfolio Showcase",
    selectorDescription: "Susun karya dan proof of work dengan cara yang lebih meyakinkan.",
    shortDefinition:
      "Sistem untuk menampilkan karya, studi kasus, dan hasil kerja secara lebih rapi dan lebih bernilai jual.",
    landingDescription:
      "Karya yang bagus perlu dipresentasikan dengan tepat agar benar-benar membangun kepercayaan.",
    coreUserValue:
      "Portfolio tidak lagi terasa seperti lampiran, tetapi menjadi alasan kuat untuk dipilih.",
    highlights: [
      "Presentasi karya yang lebih premium",
      "Studi kasus yang lebih mudah dipindai",
      "Proof of work yang lebih kuat membangun trust",
    ],
    supportingCopy:
      "Setiap karya tampil sebagai bagian dari narasi kualitas yang lebih utuh dan lebih mudah dipahami.",
    outcomeLine: "Lebih mudah dipercaya. Lebih kuat menunjukkan kualitas.",
  },
  {
    id: "commerce-hub",
    number: "03",
    name: "Commerce Hub",
    eyebrow: "03 - Commerce Hub",
    selectorDescription: "Etalase monetisasi untuk produk, jasa, dan paket penawaran.",
    shortDefinition:
      "Pusat monetisasi untuk menyusun, menawarkan, dan menjual produk atau jasa secara lebih profesional.",
    landingDescription:
      "Saat penawaran tersusun lebih jelas, peluang konversi terasa jauh lebih besar.",
    coreUserValue:
      "Dari sekadar terlihat menjadi benar-benar siap menjual, dengan pengalaman offer yang lebih rapi.",
    highlights: [
      "Etalase produk dan jasa yang lebih jelas",
      "Struktur offer dan paket yang lebih rapi",
      "Fondasi monetisasi untuk kreator dan bisnis",
    ],
    supportingCopy:
      "Semua penawaran terasa lebih siap dipilih, lebih selaras dengan brand, dan lebih enak dipresentasikan.",
    outcomeLine: "Jual lebih rapi. Tawarkan lebih jelas. Monetisasi lebih siap.",
  },
  {
    id: "lead-engine",
    number: "04",
    name: "Lead Engine",
    eyebrow: "04 - Lead Engine",
    selectorDescription: "Bangun pipeline prospek sendiri dengan sistem yang lebih tertata.",
    shortDefinition:
      "Sistem untuk menemukan, mengumpulkan, dan mengelola prospek potensial agar peluang bisnis lebih rapi.",
    landingDescription:
      "Pertumbuhan yang sehat butuh cara yang lebih aktif untuk membangun peluang, bukan hanya menunggu traffic datang.",
    coreUserValue:
      "Lead Engine membantu Anda lebih proaktif dalam menyusun database prospek dan arah pertumbuhan.",
    highlights: [
      "Prospect discovery yang lebih terstruktur",
      "Database lead milik sendiri",
      "Pipeline peluang yang lebih mudah dikelola",
    ],
    supportingCopy:
      "Inilah lapisan yang membuat Lynknov bergerak melampaui bio tool biasa dan terasa lebih strategis.",
    outcomeLine: "Lebih proaktif. Lebih tertata. Lebih siap membangun peluang.",
  },
  {
    id: "marketing-suite",
    number: "05",
    name: "Marketing Suite",
    eyebrow: "05 - Marketing Suite",
    selectorDescription: "Workspace marketing untuk bergerak dari ide ke eksekusi dengan lebih modern.",
    shortDefinition:
      "Workspace pemasaran terintegrasi untuk merancang, menjalankan, dan mengoptimalkan aktivitas marketing.",
    landingDescription:
      "Saat bisnis tumbuh, Anda butuh sistem kerja marketing yang membantu bergerak lebih cepat dan lebih terarah.",
    coreUserValue:
      "Ruang kerja di balik layar untuk produksi aset, campaign, dan optimasi yang lebih efisien.",
    highlights: [
      "Dukungan AI untuk kebutuhan marketing",
      "Workflow campaign dan content execution",
      "Aset marketing yang lebih cepat dibuat",
    ],
    supportingCopy:
      "Pilar ini menjaga pertumbuhan tidak berhenti di halaman publik, tetapi berlanjut ke workflow eksekusi.",
    outcomeLine: "Dari ide ke eksekusi, dengan workflow yang lebih modern.",
  },
];
