const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkDB() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: profiles } = await supabase.from('profiles').select('*');
  console.log('--- PROFILES ---');
  console.log(profiles);

  const { data: pages } = await supabase.from('public_pages').select('*');
  console.log('\n--- PUBLIC PAGES ---');
  console.log(pages);
}

checkDB();
