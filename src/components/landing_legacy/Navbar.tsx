import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-xl font-medium tracking-tight text-white">
          lynk<span className="text-blue-500">nov</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm">
          <Link href="#produk" className="hover:text-white transition-colors text-neutral-300">Produk</Link>
          <Link href="#solusi" className="hover:text-white transition-colors text-neutral-300">Solusi</Link>
          <Link href="#harga" className="hover:text-white transition-colors text-neutral-300">Harga</Link>
        </nav>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/auth/login" className="hidden sm:block hover:text-white transition-colors text-neutral-300">Log in</Link>
        <Link href="/auth/signup" className="text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-full font-medium transition-colors">
          Start building
        </Link>
      </div>
    </header>
  );
}
