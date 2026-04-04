import { createClient } from './src/lib/supabase/server'

async function checkUser() {
  const supabase = await createClient()
  
  // Ambil semua profil
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*')
  console.log('--- PROFILES ---')
  console.log(profiles || pError)

  // Ambil semua halaman publik
  const { data: pages, error: pgError } = await supabase.from('public_pages').select('*')
  console.log('\n--- PUBLIC PAGES ---')
  console.log(pages || pgError)
}

checkUser()
