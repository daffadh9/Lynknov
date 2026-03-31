"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout, { useAuth } from "@/components/auth/AuthLayout";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { signInWithGoogle, signInWithEmail } from "@/features/auth/actions";

export default function LoginPage() {
  const { setIsFocused } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signInWithEmail(formData);
    
    if (result?.error) {
      alert(result.error);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogle();
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setFocusedField(null);
    setIsFocused(false);
  };

  const loginTitle = (
    <>
      Semua aset bisnismu, <span className="text-white/70">satu tempat.</span>
    </>
  );

  return (
    <AuthLayout
      badgeText="Workspace Bisnis Interaktif"
      title={loginTitle}
      description="Kelola halaman publik, penawaran, leads, dan arah pertumbuhan bisnismu dari satu workspace terpusat."
      features={["Halaman Profesional", "Offers Digital", "Leads & Klien"]}
      metricsType="management"
      animationType="slide"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Selamat Datang Kembali</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Lanjutkan membangun dan mengelola bisnismu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5 relative group">
              <label htmlFor="email" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'email' ? 'text-[#a78bfa]' : 'text-[var(--color-text-secondary)]'}`}>Alamat Email</label>
              <div className="relative">
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="nama@email.com"
                  required
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all duration-300 relative z-10 hover:border-white/20"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-1.5 relative group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'password' ? 'text-[#a78bfa]' : 'text-[var(--color-text-secondary)]'}`}>Sandi Akun</label>
                <Link href="/lupa-password" className="text-xs font-medium text-[var(--color-text-tertiary)] hover:text-white transition-colors">
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative flex items-center">
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className="w-full h-11 pl-4 pr-10 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all duration-300 relative z-10 hover:border-white/20"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 z-20 text-white/40 hover:text-white/80 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <motion.button 
            type="submit" 
            disabled={isLoading || isGoogleLoading}
            whileHover={{ scale: (isLoading || isGoogleLoading) ? 1 : 1.01 }}
            whileTap={{ scale: (isLoading || isGoogleLoading) ? 1 : 0.98 }}
            className="w-full h-11 rounded-xl bg-white text-black font-medium text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : (
              "Masuk ke Workspace"
            )}
          </motion.button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider">Atau masuk dengan</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <motion.button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          whileHover={{ scale: (isLoading || isGoogleLoading) ? 1 : 1.01 }}
          whileTap={{ scale: (isLoading || isGoogleLoading) ? 1 : 0.98 }}
          className="group w-full h-11 inline-flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-white font-medium text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-white/[0.04] hover:border-white/20 relative overflow-hidden shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_4px_15px_-5px_rgba(255,255,255,0.1)]"
        >
          {/* Subtle Shimmer Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-150%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none skew-x-12"></div>
          
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <div className="flex items-center relative z-10">
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </div>
          )}
        </motion.button>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-white hover:text-[#a78bfa] transition-colors">
            Daftar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

