import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-3xl font-bold tracking-tight text-white">
          lynk<span className="text-purple-400">nov</span>
        </span>
      </div>

      {/* Hero */}
      <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
        Your Interactive{' '}
        <span className="text-purple-400">Business OS</span>
      </h1>
      <p className="mb-10 max-w-lg text-lg text-gray-400">
        Build your professional identity page, showcase your work, and capture
        leads — all in one system.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/auth/signup"
          className="rounded-lg bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-500 active:scale-95"
        >
          Get started free
        </Link>
        <Link
          href="/auth/login"
          className="rounded-lg border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95"
        >
          Sign in
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-xs text-gray-600">
        MVP — founder-first build
      </p>
    </main>
  )
}
