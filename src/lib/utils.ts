/**
 * Lynknov utility helpers
 */

/**
 * Generate a URL-safe slug from a display name or free-form text.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
}

/**
 * Return a shortened display name (first name only).
 */
export function getFirstName(fullName: string | null | undefined): string {
  if (!fullName) return 'there'
  return fullName.trim().split(' ')[0]
}

/**
 * Format a number with compact notation (1.2k, 3.4M, etc.)
 */
export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}k`
  return `${(n / 1_000_000).toFixed(1)}M`
}

/**
 * Return relative time string (e.g. "3 minutes ago").
 */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

/**
 * Return the public page URL for a given slug.
 */
export function getPublicPageUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  return `${base}/p/${slug}`
}
