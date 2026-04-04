const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function forceSyncUser() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const url = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
  const serviceKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();

  const supabase = createClient(url, serviceKey);

  const { data: { users } } = await supabase.auth.admin.listUsers();
  const user = users.find(u => u.email === 'daffakhadafi692@gmail.com');

  if (!user) {
    console.error('Email daffakhadafi692@gmail.com belum terdaftar.');
    return;
  }

  const userId = user.id;
  const username = 'daffa';

  // 1. Profil
  await supabase.from('profiles').upsert({
    id: userId,
    username: username,
    full_name: "Daffa Dhiyaulhaq Khadafi",
    is_onboarded: true
  });

  // 2. Public Page - Gunakan insert/update terpisah agar lebih aman
  let { data: page } = await supabase.from('public_pages').select('id').eq('owner_id', userId).maybeSingle();
  
  if (!page) {
    const { data: newPage, error: insError } = await supabase.from('public_pages').insert({
      owner_id: userId,
      slug: username,
      title: "Daffa Dhiyaulhaq Khadafi",
      status: 'published',
      is_primary: true,
      settings: {}
    }).select().single();
    if (insError) { console.error('Insert page error:', insError); return; }
    page = newPage;
  } else {
    await supabase.from('public_pages').update({ slug: username, status: 'published' }).eq('id', page.id);
  }

  // 3. Sections
  const sections = [
    { type: 'hero', content: { name: "Daffa Dhiyaulhaq Khadafi", role: "Product Designer & Vibe Coder", headline: "Bangun Aplikasi Hebat Dengan Impact Nyata", description: "Saya merancang ekosistem aplikasi, produk digital tangguh dan mengubah audiens menjadi peluang bisnis jangka panjang.", primaryCta: { label: "Hubungi Saya", url: "mailto:hello@example.com" }, secondaryCta: { label: "Explore", url: "#portfolio" }, avatarUrl: "/images/Foto Profile.jpg", badgeText: "Open for collab" } },
    { type: 'about', content: { title: "Tentang Saya", description: "Mahasiswa Drop Out, Korban PHK, yg mencoba beralih menjadi Product Designer dengan AI Assisted Development, Suka Bikin Aplikasi, Nulis, Olahraga & Belajar Hal baru.", bulletPoints: ["Spesialisasi UI/UX", "AI Assisted Development", "Product Strategy"] } },
    { type: 'showcase', content: { title: "Layanan & Produk", items: [{ id: "so1", title: "Desain Landing Page Premium", price: "Rp 5.000.000", description: "Mentransformasi bisnis Anda menjadi brand papan atas.", ctaText: "Pesan Sekarang" }, { id: "so2", title: "Mastering Dark UI E-Book", price: "Rp 120.000", description: "Buku panduan lengkap membongkar rahasia kontras.", ctaText: "Beli E-Book" }] } }
  ];

  await supabase.from('page_sections').delete().eq('page_id', page.id);
  const sectionsToInsert = sections.map((s, i) => ({
    page_id: page.id,
    section_type: s.type,
    position: i,
    is_visible: true,
    content: s.content
  }));
  await supabase.from('page_sections').insert(sectionsToInsert);

  console.log('SINKRONISASI MEWAH BERHASIL!');
}

forceSyncUser();
