import type { EditorSection, EditorWorkspaceState } from "@/types/editor";

export const initialSections: EditorSection[] = [
  {
    id: "section-hero",
    type: "hero",
    label: "Hero",
    order: 1,
    isEnabled: true,
    content: {
      name: "Daffa Dhiyaulhaq",
      role: "Product Designer & Builder",
      headline: "Bangun Aplikasi Hebat Dengan Impact Nyata",
      description: "Saya adalah seorang Software Engineer dan Product Designer yang fokus membangun digital experience yang bermakna dan profitable.",
      primaryCta: { label: "Hubungi Saya", url: "#contact" },
      secondaryCta: { label: "Lihat Portfolio", url: "#portfolio" },
      avatarUrl: "/images/Foto Profile.jpg",
      badgeText: "Open to Work",
      trustText: "Dipercaya 20+ klien",
      isVerified: true,
    },
    style: {
      alignment: "left",
      backgroundVariant: "premium-grid",
      avatarShape: "rounded-2xl",
      cardVariant: "glass-dark",
    },
    settings: {
      showBadge: true,
      showAvatar: true,
      showSecondaryCta: true,
      animation: "fade-up",
    },
  },
  {
    id: "section-about",
    type: "about",
    label: "Tentang",
    order: 2,
    isEnabled: true,
    content: {
      title: "Filosofi & Pendekatan",
      description: "Saya percaya desain yang baik tidak hanya terlihat indah, tapi juga memecahkan masalah nyata. Setiap produk yang saya bangun selalu mempertimbangkan user experience dan business goals secara seimbang.",
      bulletPoints: ["Spesialisasi di UI/UX", "Berpengalaman 5+ tahun", "Fokus pada konversi"],
      sideCardTitle: "Design Focus",
      sideCardLabel: "UI/UX & Product",
    },
    style: {
      layout: "split",
      textAlignment: "left",
    },
    settings: {
      showTitle: true,
      showSideCard: true,
      fullWidth: false,
    },
  },
  {
    id: "section-digital-presence",
    type: "digital_presence",
    label: "Digital Presence",
    order: 3,
    isEnabled: true,
    content: {
      title: "Digital Presence",
      description: "Tempat saya aktif membagikan pemikiran dan karya.",
      stats: [
        { platform: "Instagram", value: "2K", label: "Followers", url: "https://instagram.com" },
        { platform: "LinkedIn", value: "500+", label: "Connections", url: "https://linkedin.com" },
        { platform: "GitHub", value: "120+", label: "Commits", url: "https://github.com" },
      ],
    },
    style: {
      layout: "grid",
      columns: 3,
    },
    settings: {
      showTitle: true,
      showMetrics: true,
      maxVisible: 4,
    },
  },
  {
    id: "section-showcase",
    type: "showcase",
    label: "Showcase",
    order: 4,
    isEnabled: true,
    content: {
      title: "Showcase",
      description: "Karya pilihan dan penawaran premium saya.",
      items: [
        {
          id: "shw1",
          title: "UI/UX Design Audit",
          type: "Jasa",
          price: "Mulai Rp 2.5jt",
          description: "Audit komprehensif untuk produk digital Anda.",
          ctaText: "Pesan Sekarang",
        },
        {
          id: "shw2",
          title: "Figma Mastery Course",
          type: "Produk",
          price: "Rp 499rb",
          description: "Belajar desain UI dari nol sampai mahir.",
          ctaText: "Beli Kelas",
        },
      ],
    },
    style: { layout: "cards", columns: 2 },
    settings: {
      showTitle: true,
      showPrice: true,
      showCategory: true,
      showCta: true,
      maxVisible: 4,
    },
  },
  {
    id: "section-storyboard",
    type: "storyboard",
    label: "Storyboard",
    order: 5,
    isEnabled: true,
    content: {
      title: "Perjalanan Saya",
      description: "Milestone dan cerita di balik layar",
      items: [
        { id: "st1", date: "Jan 2026", title: "Membangun Lynknov", content: "Merilis MVP pertama untuk platform OS bisnis interaktif", status: "completed" },
        { id: "st2", date: "Jun 2025", title: "Freelance Full-time", content: "Memutuskan fokus penuh di desain produk dan consulting", status: "completed" },
      ],
    },
    style: { layout: "timeline" },
    settings: {
      showTitle: true,
      showDates: true,
      showMedia: false,
      maxVisible: 5,
    },
  },
  {
    id: "section-portfolio",
    type: "portfolio",
    label: "Project & Portfolio",
    order: 6,
    isEnabled: true,
    content: {
      title: "Project & Portfolio",
      description: "Beberapa project yang pernah saya kerjakan.",
      items: [
        { id: "pf1", title: "Lynknov OS", category: "SaaS", description: "Interactive Business OS untuk modern creator." },
        { id: "pf2", title: "E-Commerce App", category: "Mobile App", description: "Aplikasi belanja dengan fitur AR fitting." },
        { id: "pf3", title: "Finance Dashboard", category: "Web App", description: "Dashboard analytics untuk fintech startup." },
      ],
    },
    style: { layout: "featured" },
    settings: {
      showTitle: true,
      showCategory: true,
      showDescription: true,
      maxVisible: 4,
      featuredMode: true,
    },
  },
  {
    id: "section-link-hub",
    type: "link_hub",
    label: "Dynamic Link Hub",
    order: 7,
    isEnabled: true,
    content: {
      title: "Dynamic Link Hub",
      description: "Temukan semua tautan penting di sini",
      groups: [
        {
          id: "lg1",
          title: "Work & Collab",
          links: [
            { id: "l1", label: "Book a Call", url: "#" },
            { id: "l2", label: "Media Kit", url: "#" },
            { id: "l3", label: "Rate Card", url: "#" },
          ],
        },
        {
          id: "lg2",
          title: "Jualan",
          links: [
            { id: "l4", label: "Figma Course", url: "#" },
            { id: "l5", label: "Template Pack", url: "#" },
          ],
        },
      ],
    },
    style: { layout: "list" },
    settings: {
      showTitle: true,
      showIcons: false,
      showGroups: true,
      openInNewTab: true,
    },
  },
  {
    id: "section-testimonials",
    type: "testimonials",
    label: "Testimoni",
    order: 8,
    isEnabled: true,
    content: {
      title: "Testimoni",
      items: [
        { id: "t1", quote: "Hasil kerjanya sangat luar biasa dan on-time. Desainnya clean dan berasa premium banget.", author: "Budi Santoso", role: "CEO TechStartup" },
        { id: "t2", quote: "Sangat direkomendasikan untuk desain UI/UX. Prosesnya sistematis dan hasilnya melebihi ekspektasi.", author: "Siti Rahayu", role: "Product Manager" },
      ],
    },
    style: { layout: "grid" },
    settings: {
      showTitle: true,
      showAvatar: false,
      showRole: true,
      showCompany: false,
      maxVisible: 3,
    },
  },
];

export const initialWorkspaceState: EditorWorkspaceState = {
  page: {
    status: "published",
    slug: "daffa-dhiyaulhaq",
    pageTitle: "Daffa Dhiyaulhaq",
    metaTitle: "Daffa Dhiyaulhaq - Product Designer & Builder",
    metaDescription:
      "Landing page personal untuk menampilkan positioning, portfolio, dan penawaran secara premium.",
    socialTitle: "Daffa Dhiyaulhaq - Product Designer & Builder",
    socialDescription:
      "Eksplor peran, karya pilihan, dan cara kolaborasi dalam satu halaman yang rapi.",
    visibility: "public",
    seoIndexable: true,
  },
  theme: {
    accent: "emerald",
    background: "grid",
    surface: "soft",
    typography: "editorial",
    spacing: "balanced",
  },
  audio: {
    trackName: "Nocturne Session 01",
    duration: "01:28",
    widgetEnabled: false,
    loopEnabled: false,
    volume: 64,
    placement: "floating",
  },
};
