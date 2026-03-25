'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { generateSlug } from '@/lib/utils'

interface OnboardingData {
  full_name: string
  headline: string
  username: string
  use_case: string
}

export async function completeOnboarding(data: OnboardingData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const slug = generateSlug(data.username || data.full_name)

  // Update profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: data.full_name,
      headline: data.headline,
      username: data.username,
      is_onboarded: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // Create default primary page with slug
  const { data: existingPage } = await supabase
    .from('public_pages')
    .select('id')
    .eq('owner_id', user.id)
    .eq('is_primary', true)
    .single()

  if (!existingPage) {
    const { error: pageError } = await supabase.from('public_pages').insert({
      owner_id: user.id,
      slug,
      title: data.full_name || 'My Page',
      status: 'draft',
      is_primary: true,
    })

    if (pageError) {
      return { error: pageError.message }
    }
  }

  redirect('/dashboard')
}
