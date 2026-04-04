const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function syncPolishedData() {
  // 1. Load Env
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const url = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
  const key = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
  const supabase = createClient(url, key);

  // 2. Ambil User ID terbaru (Akun Google Anda)
  const { data: profiles } = await supabase.from('profiles').select('id').order('created_at', { ascending: false }).limit(1);
  if (!profiles || profiles.length === 0) {
    console.error('User tidak ditemukan. Pastikan Anda sudah login di browser.');
    return;
  }
  const userId = profiles[0].id;
  const username = 'daffa';

  console.log(`Mensinkronkan data MEWAH ke User ID: ${userId}...`);

  // 3. Persiapkan Seksi Mewah dari mock-profile.ts
  // Saya petakan data dari mockProfile yang Anda sukai ke format database
  const sections = [
    {
      type: 'hero',
      content: {
        name: "Daffa Dhiyaulhaq Khadafi",
        role: "Product Designer & Vibe Coder",
        headline: "Bangun Aplikasi Hebat Dengan Impact Nyata",
        description: "Saya merancang ekosistem aplikasi, produk digital tangguh dan mengubah audiens menjadi peluang bisnis jangka panjang.",
        primaryCta: { label: "Hubungi Saya", url: "mailto:hello@example.com" },
        secondaryCta: { label: "Explore", url: "#portfolio" },
        avatarUrl: "/images/Foto Profile.jpg",
        badgeText: "Open for collab"
      }
    },
    {
      type: 'about',
      content: {
        title: "Tentang Saya",
        description: "Mahasiswa Drop Out, Korban PHK, yg mencoba beralih menjadi Product Designer dengan AI Assisted Development, Suka Bikin Aplikasi, Nulis, Olahraga & Belajar Hal baru.",
        bulletPoints: ["Spesialisasi UI/UX", "AI Assisted Development", "Product Strategy"]
      }
    },
    {
      type: 'showcase',
      content: {
        title: "Layanan & Produk",
        items: [
          { id: "so1", title: "Desain Landing Page Premium", price: "Rp 5.000.000", description: "Mentransformasi bisnis Anda menjadi brand papan atas.", ctaText: "Pesan Sekarang" },
          { id: "so2", title: "Mastering Dark UI E-Book", price: "Rp 120.000", description: "Buku panduan lengkap membongkar rahasia kontras.", ctaText: "Beli E-Book" }
        ]
      }
    },
    {
      type: 'testimonials',
      content: {
        title: "Apa Kata Mereka",
        items: [
          { id: "t1", quote: "Ga nyangka sih kaya serasa bisa punya web mini premium yang seharga jutaan tapi dengan murah.", author: "Rizky Firmansyah", role: "Mahasiswa" },
          { id: "t2", quote: "Ini tuh beneran beda banget deh, designnya tuh premium semua jir, JOSS lah !!!", author: "Nadia Shafira", role: "Youtuber" }
        ]
      }
    }
  ];

  // 4. Update Profile & Page
  await supabase.from('profiles').update({ username: username, full_name: "Daffa Dhiyaulhaq Khadafi", is_onboarded: true }).eq('id', userId);
  
  const { data: page } = await supabase.from('public_pages').upsert({
    owner_id: userId,
    slug: username,
    title: "Daffa Dhiyaulhaq Khadafi",
    status: 'published',
    is_primary: true,
    settings: {
      theme: { accent: "emerald", background: "grid", surface: "soft", typography: "editorial", spacing: "balanced" }
    }
  }, { onConflict: 'owner_id' }).select().single();

  // 5. Simpan Seksi ke Database
  await supabase.from('page_sections').delete().eq('page_id', page.id);
  const sectionsToInsert = sections.map((s, i) => ({
    page_id: page.id,
    section_type: s.type,
    position: i,
    is_visible: true,
    content: s.content
  }));
  await supabase.from('page_sections').insert(sectionsToInsert);

  console.log('SINKRONISASI BERHASIL!');
  console.log(`Link Anda: http://localhost:3000/${username}`);
}

syncPolishedData();
