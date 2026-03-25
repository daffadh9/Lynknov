import { requireAuth } from '@/lib/auth'

export const metadata = {
  title: 'Leads',
}

export default async function LeadsPage() {
  await requireAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f11] px-6">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-2 text-sm text-gray-400">
          Coming in Sprint 1 — view all incoming inquiry submissions from your public page.
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-block rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-white transition hover:bg-white/10"
        >
          ← Back to dashboard
        </a>
      </div>
    </div>
  )
}
