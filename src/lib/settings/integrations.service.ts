import { createClient } from '@/lib/supabase/client';
import { User, UserIdentity } from '@supabase/supabase-js';

export interface ProviderState {
  google: boolean;
  github: boolean;
  email: boolean;
  googleIdentity: UserIdentity | null;
  githubIdentity: UserIdentity | null;
}

export function getProviderState(user: User): ProviderState {
  const identities = user.identities ?? [];
  const googleIdentity = identities.find((i) => i.provider === 'google') ?? null;
  const githubIdentity = identities.find((i) => i.provider === 'github') ?? null;
  const emailIdentity = identities.find((i) => i.provider === 'email') ?? null;

  return {
    google: !!googleIdentity,
    github: !!githubIdentity,
    email: !!emailIdentity,
    googleIdentity,
    githubIdentity,
  };
}

export interface SafeUnlinkCheck {
  canUnlink: boolean;
  reason?: string;
}

export function canSafelyUnlink(
  provider: 'google' | 'github',
  providerState: ProviderState,
  hasPassword: boolean
): SafeUnlinkCheck {
  const methods = [
    provider !== 'google' && providerState.google,
    provider !== 'github' && providerState.github,
    hasPassword,
  ].filter(Boolean);

  if (methods.length === 0) {
    return {
      canUnlink: false,
      reason: 'Tambahkan metode masuk lain terlebih dahulu agar akunmu tetap bisa diakses.',
    };
  }

  return { canUnlink: true };
}

export async function unlinkProvider(identity: UserIdentity): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.unlinkIdentity(identity);
  if (error) throw error;
}

export async function linkProvider(provider: 'google' | 'github'): Promise<void> {
  const supabase = createClient();
  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?next=/dashboard/settings`
      : undefined;

  const { error } = await supabase.auth.linkIdentity({
    provider,
    options: { redirectTo },
  });
  if (error) throw error;
}

export async function refreshUser(): Promise<User | null> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
