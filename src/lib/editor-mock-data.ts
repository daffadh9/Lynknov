"use client";

import { EditorSection } from "@/types/editor";

export const initialSections: EditorSection[] = [
  {
    id: "section-hero",
    type: "hero",
    label: "Hero / Intro",
    order: 1,
    isEnabled: true,
    content: {
      name: "Daffa Dhiyaulhaq",
      role: "Product Designer & Builder",
      headline: "Bangun Aplikasi Hebat Dengan Impact Nyata",
      description: "Saya adalah seorang Software Engineer dan Product Designer yang fokus membangun digital experience yang bermakna dan profitable.",
      primaryCta: {
        label: "Hubungi Saya",
        url: "#contact",
      },
      secondaryCta: {
        label: "Lihat Portfolio",
        url: "#portfolio",
      },
      avatarUrl: "/images/Foto Profile.jpg",
    },
    style: {
      alignment: "left",
      backgroundVariant: "premium-grid",
      avatarShape: "rounded-2xl",
      cardVariant: "glass-dark",
    },
    settings: {
      showBadge: true,
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
    },
    style: {
      layout: "simple",
    },
    settings: {
      showTitle: false,
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
      description: "Beberapa tempat di mana saya aktif membagikan pemikiran dan karya.",
      stats: [
        { platform: "Instagram", value: "2K", label: "Followers", url: "https://instagram.com" },
        { platform: "LinkedIn", value: "500+", label: "Connections", url: "https://linkedin.com" },
      ],
    },
    style: {
      layout: "grid",
      columns: 2,
    },
    settings: {
      showTitle: true,
    },
  },
  {
    id: "section-showcase",
    type: "showcase",
    label: "Showcase Storefront",
    order: 4,
    isEnabled: true,
    content: {
      title: "Showcase Storefront",
      description: "Karya pilihan dan penawaran premium saya.",
      items: [
        { 
          id: "shw1", 
          title: "UI/UX Design Audit", 
          type: "Jasa", 
          price: "Mulai Rp 2.5jt", 
          description: "Audit komprehensif untuk produk digital Anda untuk meningkatkan konversi.",
          ctaText: "Pesan Sekarang",
        },
        { 
          id: "shw2", 
          title: "Figma Mastery Course", 
          type: "Produk", 
          price: "Rp 499rb", 
          description: "Belajar desain UI dari nol sampai mahir dengan studi kasus nyata.",
          ctaText: "Beli Kelas",
        },
      ]
    },
    style: {
      layout: "cards",
      columns: 2,
    },
    settings: {
      showTitle: true,
    },
  },
  {
    id: "section-storyboard",
    type: "storyboard",
    label: "Storyboard",
    order: 5,
    isEnabled: true,
    content: {
      title: "Storyboard",
      description: "Perjalanan dan pencapaian",
      items: [
        { id: "st1", date: "Jan 2026", title: "Membangun Lynknov", content: "Merilis MVP pertama untuk platform OS bisnis interaktif", status: "completed" },
      ]
    },
    style: {
      layout: "timeline"
    },
    settings: {
      showTitle: true,
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
      ]
    },
    style: {
      layout: "featured"
    },
    settings: {
      showTitle: true,
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
            { id: "l2", label: "Media Kit", url: "#" }
          ]
        }
      ]
    },
    style: {
      layout: "list"
    },
    settings: {
      showTitle: true,
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
        { id: "t1", quote: "Hasil kerjanya sangat luar biasa dan on-time.", author: "Budi", role: "CEO TechStartup" },
        { id: "t2", quote: "Sangat direkomendasikan untuk desain UI/UX.", author: "Siti", role: "Product Manager" },
      ]
    },
    style: {
      layout: "grid"
    },
    settings: {
      showTitle: true,
    },
  }
];
