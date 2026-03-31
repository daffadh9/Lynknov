// Auth callback handler — used after email confirmation or OAuth redirect
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Check if user has an existing profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_onboarded')
        .eq('id', data.user.id)
        .maybeSingle()

      // If no profile exists (new user) or not onboarded, create profile and go to onboarding
      if (!profile) {
        await supabase.from('profiles').upsert(
          {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
            is_onboarded: false,
          },
          { onConflict: 'id' },
        )
        return NextResponse.redirect(`${origin}/onboarding`)
      }

      if (profile.is_onboarded === false) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }

      // Existing user with completed onboarding
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return to login with error if something went wrong
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
}
