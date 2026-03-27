"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout, { useAuth } from "@/components/auth/AuthLayout";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const { setIsFocused } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate API call
    setTimeout(() => setIsGoogleLoading(false), 1500);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setFocusedField(null);
    setIsFocused(false);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <h2 className="text-2xl font-medium tracking-tight text-white">Buat akun Lynknov</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Mulai membangun kehadiran digital Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="space-y-4">
            
            {/* Name Field */}
            <div className="space-y-2 relative group">
              <label htmlFor="name" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-400' : 'text-white/80'}`}>Nama Lengkap</label>
              <div className="relative">
                <input 
                  id="name"
                  type="text" 
                  placeholder="John Doe"
                  required
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 relative z-10 hover:border-white/20 hover:bg-white/[0.03]"
                />
                <AnimatePresence>
                  {focusedField === 'name' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.15),inset_0_0_0_1px_rgba(59,130,246,0.3)] z-0 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 relative group">
              <label htmlFor="email" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-400' : 'text-white/80'}`}>Email</label>
              <div className="relative">
                <input 
                  id="email"
                  type="email" 
                  placeholder="nama@email.com"
                  required
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 relative z-10 hover:border-white/20 hover:bg-white/[0.03]"
                />
                <AnimatePresence>
                  {focusedField === 'email' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.15),inset_0_0_0_1px_rgba(59,130,246,0.3)] z-0 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2 relative group">
              <label htmlFor="password" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'password' ? 'text-blue-400' : 'text-white/80'}`}>Password</label>
              <div className="relative">
                <input 
                  id="password"
                  type="password" 
                  placeholder="Buat password yang kuat"
                  required
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 relative z-10 hover:border-white/20 hover:bg-white/[0.03]"
                />
                <AnimatePresence>
                  {focusedField === 'password' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.15),inset_0_0_0_1px_rgba(59,130,246,0.3)] z-0 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.button 
            type="submit" 
            disabled={isLoading || isGoogleLoading}
            whileHover={{ scale: (isLoading || isGoogleLoading) ? 1 : 1.02, boxShadow: "0 0 25px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: (isLoading || isGoogleLoading) ? 1 : 0.97 }}
            className="relative w-full h-12 rounded-xl bg-white text-black font-medium text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                </motion.div>
              ) : (
                <motion.div 
                  key="text" 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Buat akun
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Shimmer effect inside button on loading */}
            {isLoading && (
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12 animate-[shimmer_1s_infinite]"></div>
            )}
            {/* Subtle light sweep on hover */}
            {!isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
            )}
          </motion.button>
        </form>

        <div className="relative group">
          <div className="absolute inset-0 flex items-center">
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="w-full border-t border-white/10 transition-colors duration-500 group-hover:border-white/20 origin-center" 
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050505] px-2 text-[var(--color-text-tertiary)] transition-colors duration-300 group-hover:text-white/60 rounded-full backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              atau daftar dengan
            </span>
          </div>
        </div>

        <motion.button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          whileHover={{ 
            scale: (isLoading || isGoogleLoading) ? 1 : 1.02, 
            backgroundColor: "rgba(255,255,255,0.06)",
            boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
          }}
          whileTap={{ scale: (isLoading || isGoogleLoading) ? 1 : 0.97 }}
          className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-white font-medium text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isGoogleLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 className="w-5 h-5 animate-spin" />
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center relative z-10">
                <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </motion.div>
            )}
          </AnimatePresence>
          {isGoogleLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[shimmer_1.5s_infinite]"></div>
          )}
        </motion.button>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-white hover:text-blue-400 transition-colors underline-offset-4 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
