'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/features/onboarding/actions'
import { generateSlug } from '@/lib/utils'

const USE_CASES = [
  { id: 'freelancer', label: '🧑‍💻 Freelancer / Solo Operator' },
  { id: 'creator', label: '🎨 Creator / Artist' },
  { id: 'consultant', label: '📊 Consultant / Advisor' },
  { id: 'business', label: '🏢 Small Business Owner' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    full_name: '',
    headline: '',
    username: '',
    use_case: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      // Auto-generate username from full_name
      if (name === 'full_name') {
        next.username = generateSlug(value)
      }
      return next
    })
  }

  async function handleFinish() {
    setLoading(true)
    setError(null)
    const result = await completeOnboarding(form)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-white">
            lynk<span className="text-purple-400">nov</span>
          </span>
          <p className="mt-2 text-sm text-gray-400">
            Step {step} of 2 — Let&apos;s set up your business identity
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-purple-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-gray-300">
                What&apos;s your name?
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="headline" className="mb-1.5 block text-sm font-medium text-gray-300">
                Your professional headline
              </label>
              <input
                id="headline"
                name="headline"
                type="text"
                value={form.headline}
                onChange={handleChange}
                placeholder="Product Designer & Builder"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-300">
                Your page URL
              </label>
              <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <span className="px-3 py-2.5 text-sm text-gray-500">lynknov.com/p/</span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="your-slug"
                  className="flex-1 bg-transparent px-0 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.full_name || !form.username}
              id="btn-onboarding-next"
              className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60 active:scale-95"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="mb-4 text-sm font-medium text-gray-300">
                Which best describes you?
              </p>
              <div className="space-y-3">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc.id}
                    onClick={() => setForm((prev) => ({ ...prev, use_case: uc.id }))}
                    id={`btn-usecase-${uc.id}`}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                      form.use_case === uc.id
                        ? 'border-purple-500 bg-purple-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {uc.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95"
              >
                ← Back
              </button>
              <button
                onClick={handleFinish}
                disabled={loading || !form.use_case}
                id="btn-onboarding-finish"
                className="flex-1 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60 active:scale-95"
              >
                {loading ? 'Setting up…' : 'Launch my page →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
