import { ProfileData } from "../types/profile";

export const mockProfile: ProfileData = {
  username: "daffa",
  name: "Daffa Dhiyaulhaq Khadafi",
  role: "Product Designer & Vibe Coder",
  headline: "Bangun Aplikasi Hebat Dengan Impact Nyata",
  bio: "Saya merancang ekosistem aplikasi, produk digital tangguh dan mengubah audiens menjadi peluang bisnis jangka panjang.",
  heroImage: "/images/Foto%20Profile.jpg",
  availability: {
    status: "available",
    text: "Open for collab"
  },
  onlineStatus: {
    isOnline: true,
    text: "Active now"
  },
  hasStory: true,
  primaryCta: {
    label: "Hubungi Saya",
    url: "mailto:hello@example.com",
  },
  secondaryCta: {
    label: "Explore",
    url: "#portfolio",
  },
  socialLinks: [
    { 
      platform: "YouTube", 
      url: "https://youtube.com", 
      icon: "youtube", 
      username: "@daffakhadafi", 
      lastSync: "Terbaru hari ini",
      themeColor: "#FF0000",
      stats: [
        { label: "Subscribers", value: "24K" },
        { label: "Total Views", value: "1.2M" }
      ]
    },
    { 
      platform: "Instagram", 
      url: "https://instagram.com", 
      icon: "instagram", 
      username: "@daffakhadafi.design", 
      lastSync: "3 jam lalu",
      themeColor: "#E1306C",
      stats: [
        { label: "Followers", value: "15.2K" },
        { label: "Engagement", value: "4.8%" }
      ]
    },
    { 
      platform: "TikTok", 
      url: "https://tiktok.com", 
      icon: "tiktok", 
      username: "@daffakhadafi", 
      lastSync: "1 hari lalu",
      themeColor: "#25F4EE",
      stats: [
        { label: "Followers", value: "110K" },
        { label: "Likes", value: "2.1M" }
      ]
    },
    { 
      platform: "X", 
      url: "https://twitter.com", 
      icon: "twitter", 
      username: "@daffakhadafi", 
      lastSync: "Baru saja",
      themeColor: "#1DA1F2",
      stats: [
        { label: "Followers", value: "8.5K" },
        { label: "Posts", value: "1,240" }
      ]
    },
  ],
  about: {
    statement: "Mahasiswa Drop Out, Korban PHK, yg mencoba beralih menjadi Product Designer dengan AI Assisted Development, Suka Bikin Aplikasi, Nulis, Olahraga & Belajar Hal baru.",
    base: "Malang, Jawa Timur, Indonesia.",
    notes: [
      {
        title: "Catatan Tambahan",
        content: "Suka makan seafood & indomie goreng. Selalu penasaran dengan interaksi desain yang nggak cuma bagus secara visual, tapi punya 'nyawa' dan bikin orang nyaman pakenya. Kalau nggak lagi ngoding atau nge-desain, biasanya lagi cari referensi desain antarmuka atau mikirin fitur baru.",
      }
    ]
  },
  digitalPresence: {
    featuredPost: {
      platform: "YouTube",
      type: "video",
      title: "How to Build a High-Converting Portfolio in 2026",
      url: "#",
      postedAt: "1 hour ago",
      mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop"
    }
  },
  spotlights: [
    {
      id: "sp1",
      title: "Vibe Coding",
      coverUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "sp2",
      title: "Design Product",
      coverUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "sp3",
      title: "Startup",
      coverUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "sp4",
      title: "UI Explorations",
      coverUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "sp5",
      title: "Behind The Scene",
      coverUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: "sp6",
      title: "Workspaces",
      coverUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=500&auto=format&fit=crop"
    }
  ],
  storyboard: [
    {
      id: "sb1",
      date: "Perjalanan Lynknov",
      title: "Membangun Lynknov dari Nol",
      content: "Lynknov lahir dari rasa frustrasi akan keterbatasan tampilan profile profesional yang ada. Dari ratusan coretan wireframe, gagalnya berbagai pendekatan arsitektur, hingga akhirnya menemukan ritme desain yang solid. Lynknov bukan sekedar link-in-bio, ini adalah wujud nyata dari ambisi untuk menghadirkan Interactive Business OS dengan standar estetika tertinggi. Sebuah perjalanan jatuh bangun mengubah masalah menjadi produk bernilai.",
      status: "in-progress"
    }
  ],
  kickstart: {
    heading: "Mulai Bersama Saya",
    description: "Pilih skenario yang paling cocok dengan kebutuhan Anda dan beri tahu sedikit tentang apa yang bisa kita kerjakan.",
    ctaText: "Mulai Percakapan",
    options: ["Freelance Project (Jasa)", "Kolaborasi & Kemitraan", "Konsultasi 1-on-1", "Pembelian Produk Digital", "Lainnya"]
  },
  showcaseOffers: [
    {
      id: "so1",
      type: "Jasa",
      title: "Desain Landing Page Premium",
      description: "Mentransformasi bisnis Anda menjadi brand papan atas lewat satu halaman komprehensif yang dioptimasi penuh secara UI/UX.",
      ctaText: "Pesan Sekarang",
      pricing: "Rp 5.000.000",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      isFeatured: true,
      tags: ["Digital", "UI/UX"]
    },
    {
      id: "so2",
      type: "E-Course",
      title: "Mastering Dark UI E-Book",
      description: "Buku panduan lengkap membongkar rahasia kontras, hirarki shadow, dan tipografi elit untuk antarmuka mode gelap.",
      ctaText: "Beli E-Book",
      pricing: "Rp 120.000",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      isFeatured: true,
      tags: ["Learning", "Book"]
    },
    {
      id: "so3",
      type: "Event",
      title: "Webinar Design System",
      description: "Sesi live tentang cara membangun design system di Figma yang terstruktur dan hemat waktu.",
      ctaText: "Daftar",
      pricing: "Gratis",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["Live", "Zoom"]
    },
    {
      id: "so4",
      type: "Template",
      title: "Framer Motion Templates",
      description: "Kumpulan template micro-interaction siap pakai untuk web interaktif elegan.",
      ctaText: "Beli Akses",
      pricing: "Rp 350.000",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["Code", "React"]
    },
    {
      id: "so5",
      type: "Jasa",
      title: "Audit UI/UX Website",
      description: "Layanan review dan perombakan arsitektur UX. Cocok bagi startup.",
      ctaText: "Konsultasi",
      pricing: "Rp 2.500.000",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["Consulting", "UX"]
    },
    {
      id: "so6",
      type: "Produk",
      title: "Notion Life Planner",
      description: "Atur hidup, rutinitas, dan tujuan dengan planner super estetik dari dalam Notion.",
      ctaText: "Dapatkan",
      pricing: "Rp 45.000",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["Productivity", "Template"]
    }
  ],
  highlights: [
    {
      id: "h1",
      title: "Lynknov OS",
      category: "Platform Digital",
      description: "Membangun sistem presentasi profil kelas dunia yang membantu praktisi mengubah interaksi menjadi relasi profesional berkelanjutan.",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      date: "Desember 2025"
    },
    {
      id: "h2",
      title: "Dreadnoute",
      category: "Dashboard SaaS",
      description: "Merombak arsitektur antarmuka menjadi lebih lapang dan premium.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      link: "#",
      date: "Oktober 2025"
    },
    {
      id: "h3",
      title: "Fintech Command Center",
      category: "Fintech",
      description: "Mendesain sistem tata kelola data B2B agar lebih efisien dimonitor secara real-time.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      date: "Maret 2026"
    },
    {
      id: "h4",
      title: "Agile Workflow Manager",
      category: "Produktivitas",
      description: "Aplikasi manajemen tugas tim dengan micro-interaksi level wahid.",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      date: "Juni 2024"
    },
    {
      id: "h5",
      title: "Sistem Logistik Cloud",
      category: "Enterprise",
      description: "Pemantauan armada dan gudang berbasis dark mode UI.",
      imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      date: "Juli 2025"
    },
    {
      id: "h6",
      title: "Identitas Startup Web3",
      category: "Branding",
      description: "Desain aset eksploratif untuk startup blockchain generasi baru.",
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      date: "Agustus 2025"
    }
  ],
  linkHub: [
    {
      id: "g1",
      title: "Jualan",
      mode: "product",
      links: [
        { label: "Template Framer Premium", url: "#", badge: "Best Seller", isPinned: true },
        { label: "Buku Panduan UI Dark Mode", url: "#" },
        { label: "Konsultasi 1-on-1 (30 Menit)", url: "#" },
      ]
    },
    {
      id: "g2",
      title: "Work & Portfolio",
      mode: "work",
      links: [
        { label: "Curated Showcase Detail", url: "#", isPinned: true },
        { label: "Dreadnoute SaaS Case Study", url: "#" },
        { label: "Dribbble Profile (Design Shots)", url: "#" },
      ]
    },
    {
      id: "g3",
      title: "Pribadi & Komunitas",
      mode: "personal",
      links: [
        { label: "Tulisan & Opini (Substack)", url: "#", badge: "New" },
        { label: "Podcast Design Stories", url: "#" },
        { label: "Instagram Personal", url: "#" },
      ]
    }
  ],
  testimonials: [
    { id: "t1", quote: "Ga nyangka sih kaya serasa bisa punya web mini premium yang seharga jutaan tapi dengan murah, cuma langganan 100k woi gilaa ... setupnya juga mudah banget lagi, gue beneran rekomendasiin sih asli, bukan gimmick", author: "Rizky Firmansyah", role: "Mahasiswa" },
    { id: "t2", quote: "Ini tuh beneran beda banget deh, awalnya gue kira kaya ahh palingan cuma buat bio tools biasa gitu kan, eh ternyata pas nyobain fitur-fitur di dalemnya tuh kek super duper lengkap banget buat jalanin overall hampir semua bisnis gue, asli jujur ini gue belum pernah liat ada tools selengkap ini, udah gitu designnya tuh premium semua jir, JOSS lah !!!", author: "Nadia Shafira", role: "Youtuber" },
    { id: "t3", quote: "Cuma 3 kata, Premium, Lengkap, Murah", author: "Bima Arya", role: "Freelancer" },
    { id: "t4", quote: "Ini keren sih, di rekomendasiin sama temen eh malah jadi ketagihan hihi, dulu mah gw harus sewa tools sana sini buat handle bisnis gw, pas ketemu nih platform ternyata beneran bisa ngebackup semuanya, rapih lagi cantik tampilannya, suka deh. Please jangan dinaikin harganya developer, udah nyaman banget nih.", author: "Clarissa W.", role: "Business Owner" },
    { id: "t5", quote: "Asli gue sempet mikir ini pasti harganya jutaan pas awal liat UI/UX-nya. Super duper sekelas website international. Klien-klien gue sampe pada notice, kok branding gue sekarang keliatan beda dan jauh lebih pro. Gak nyesel sama sekali nyobain ini!", author: "Adrian Utama", role: "Digital Marketer" },
    { id: "t6", quote: "Wah gila sih ini ngebantu banget buat jualan produk digital gue... Dulu pake linktree dkk kerasa banget flatnya, pas pindah kesini konversi auto naik karena trust dari tampilannya aja udah dapet banget. Goks abis developernya!", author: "Sarah Amalia", role: "Content Creator" },
    { id: "t7", quote: "Sedih sih baru tau sekarang ada platform sebagus ini. Setupnya gampang parah, gue yang gaptek aja cuma butuh waktu 15 menit buat nyusun semua katalog sama profile gue. Smooth banget transisinya kayak pake laptop mahal wkwk.", author: "Indra Hakim", role: "Photographer" },
    { id: "t8", quote: "Gue beneran ngerasa kek dihargai banget jadi pengguna, karena fiturnya itu kayak dibikin sama orang yang emang beneran paham apa masalah kita di lapangan. One-stop solution beneran ini mah. Pake ini udah males ngelirik yang lain.", author: "Kania Putri", role: "UI/UX Designer" },
    { id: "t9", quote: "Sumpah ini racun banget! Awalnya iseng doang claim username, eh keterusan build keseluruhan halamannya karena seenak itu. Warnanya tuh kaya ngasih feel mahal gitu lho guys. Terbaik banget buat personal branding.", author: "Fajar Rizqi", role: "Software Engineer" },
    { id: "t10", quote: "Nge-save duit ratusan ribu tiap bulan karena semua dari showcase, analytics, sampe naruh portofolio udah dapet di sini semua! Jujur aja, ngeliat kompetitor di luaran sana, ini mah jauh menang telak secara visulanya.", author: "Dina Kartika", role: "Consultant" },
    { id: "t11", quote: "Awalnya skeptis, paling ya 11-12 sama yang lain, tapi begitu gue otak-atik dikit, wow... Speechless. Smooth, elegan, gak murahan. Client gue pas nanya portofolio dan ngeliat web mini ini langsung auto deal. Magic bro!", author: "Reza Kusuma", role: "Videographer" },
    { id: "t12", quote: "Udah sering pindah-pindah platform tapi cuma bertahan sebulan dua bulan. Di sini betah banget karena berasa banget kesan eksklusif dan profesionalnya. Feel-nya beda aja gitu kalau linknya aku pajang di bio sosial media.", author: "Tania Aurel", role: "Startup Founder" }
  ],
  gallery: [
    { id: "img1", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", ratio: 'landscape' },
    { id: "img2", url: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop", ratio: 'square' },
    { id: "img3", url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop", ratio: 'portrait' },
    { id: "img4", url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop", ratio: 'landscape' },
    { id: "img5", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop", ratio: 'square' },
    { id: "img6", url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop", ratio: 'portrait' },
    { id: "img7", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", ratio: 'portrait' },
    { id: "img8", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop", ratio: 'landscape' },
    { id: "img9", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", ratio: 'square' },
    { id: "img10", url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop", ratio: 'portrait' },
    { id: "img11", url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop", ratio: 'landscape' },
    { id: "img12", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", ratio: 'square' },
    { id: "img13", url: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2000&auto=format&fit=crop", ratio: 'portrait' },
    { id: "img14", url: "https://images.unsplash.com/photo-1620288627228-5452f4460f38?q=80&w=2070&auto=format&fit=crop", ratio: 'landscape' },
    { id: "img15", url: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop", ratio: 'square' },
  ],
  closingCta: {
    badge: "Design your Success Now.",
    heading: "Berani Tampil Beda,\nSatu Klik,\nDi Semua Monetisasi.",
    supportingText: "Lynknov Di Design Dengan Serius, Untuk Yang Serius, & Mau Bertumbuh Serius",
    labelPrimary: "Coba Sekarang",
    urlPrimary: "#",
    labelSecondary: "Lihat Selengkapnya",
    urlSecondary: "#"
  },
  footerNote: "2026 Daffa Dhiyaulhaq Khadafi — Dibuat Dengan Lynknov"
};

export function getProfileByUsername(username: string): ProfileData | null {
  if (username.toLowerCase() === mockProfile.username) {
    return mockProfile;
  }
  return mockProfile; 
}
