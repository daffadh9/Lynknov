const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function migrateData() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const url = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
  const key = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

  const supabase = createClient(url, key);

  // 1. Cari user ID berdasarkan email
  // Catatan: admin API atau auth.users tidak bisa diakses via anon key, 
  // tapi kita bisa cari di profiles jika user sudah pernah login/onboarding
  const { data: profiles, error: pError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1); // Kita asumsikan ini akun utama Anda jika hanya ada 1

  if (pError || !profiles || profiles.length === 0) {
    console.error('User profile not found. Please login to the app first!');
    return;
  }

  const userId = profiles[0].id;
  const username = 'daffa'; // URL yang Anda inginkan: localhost:3000/daffa

  console.log(`Migrating data for User ID: ${userId} with username: ${username}...`);

  // 2. Update Profile
  await supabase.from('profiles').update({
    username: username,
    full_name: "Daffa Dhiyaulhaq",
    headline: "Product Designer & Builder",
    is_onboarded: true
  }).eq('id', userId);

  // 3. Create/Update Public Page
  const { data: page, error: pageError } = await supabase.from('public_pages').upsert({
    owner_id: userId,
    slug: username,
    title: "Daffa Dhiyaulhaq",
    status: 'published',
    is_primary: true,
    settings: {
      theme: { accent: "emerald", background: "grid", surface: "soft", typography: "editorial", spacing: "balanced" },
      audio: { trackName: "Nocturne Session 01", duration: "01:28", widgetEnabled: false, loopEnabled: false, volume: 64, placement: "floating" }
    }
  }, { onConflict: 'owner_id' }).select().single();

  if (pageError) {
    console.error('Error upserting page:', pageError);
    return;
  }

  // 4. Masukkan Seksi (Hero, About, dll) dari Mock Data
  // Kita ambil dari initialSections di editor-mock-data (saya hardcode di sini untuk kestabilan)
  const mockSections = [
    { type: 'hero', label: 'Hero', content: { name: "Daffa Dhiyaulhaq", role: "Product Designer & Builder", headline: "Bangun Aplikasi Hebat Dengan Impact Nyata", description: "Saya adalah seorang Software Engineer dan Product Designer yang fokus membangun digital experience yang bermakna dan profitable.", primaryCta: { label: "Hubungi Saya", url: "#contact" }, secondaryCta: { label: "Lihat Portfolio", url: "#portfolio" }, avatarUrl: "/images/Foto Profile.jpg", badgeText: "Open to Work", trustText: "Dipercaya 20+ klien" } },
    { type: 'about', label: 'Tentang', content: { title: "Filosofi & Pendekatan", description: "Saya percaya desain yang baik tidak hanya terlihat indah, tapi juga memecahkan masalah nyata. Setiap produk yang saya bangun selalu mempertimbangkan user experience dan business goals secara seimbang.", bulletPoints: ["Spesialisasi di UI/UX", "Berpengalaman 5+ tahun", "Fokus pada konversi"], sideCardTitle: "Design Focus", sideCardLabel: "UI/UX & Product" } },
    { type: 'digital_presence', label: 'Digital Presence', content: { title: "Digital Presence", description: "Tempat saya aktif membagikan pemikiran dan karya.", stats: [{ platform: "Instagram", value: "2K", label: "Followers", url: "https://instagram.com" }, { platform: "LinkedIn", value: "500+", label: "Connections", url: "https://linkedin.com" }, { platform: "GitHub", value: "120+", label: "Commits", url: "https://github.com" }] } },
    { type: 'portfolio', label: 'Project & Portfolio', content: { title: "Project & Portfolio", description: "Beberapa project yang pernah saya kerjakan.", items: [{ id: "pf1", title: "Lynknov OS", category: "SaaS", description: "Interactive Business OS untuk modern creator." }, { id: "pf2", title: "E-Commerce App", category: "Mobile App", description: "Aplikasi belanja dengan fitur AR fitting." }, { id: "pf3", title: "Finance Dashboard", category: "Web App", description: "Dashboard analytics untuk fintech startup." }] } }
  ];

  const sectionsToInsert = mockSections.map((s, i) => ({
    page_id: page.id,
    section_type: s.type,
    position: i,
    is_visible: true,
    content: s.content
  }));

  // Hapus seksi lama agar tidak duplikat
  await supabase.from('page_sections').delete().eq('page_id', page.id);
  
  // Masukkan seksi baru
  const { error: sError } = await supabase.from('page_sections').insert(sectionsToInsert);

  if (sError) console.error('Error inserting sections:', sError);
  else console.log('Successfully migrated mock data to your account!');
}

migrateData();
