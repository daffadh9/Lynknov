"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout, { useAuth } from "@/components/auth/AuthLayout";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resetPasswordForEmail } from "@/features/auth/actions";

export default function LupaPasswordPage() {
  const { setIsFocused } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    const result = await resetPasswordForEmail(email);
    
    if (result?.error) {
      alert(result.error);
    } else {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setFocusedField(null);
    setIsFocused(false);
  };

  const title = (
    <>
      Pemulihan akses <span className="text-white/70">akun.</span>
    </>
  );

  return (
    <AuthLayout
      badgeText="Keamanan Akun"
      title={title}
      description="Masukkan alamat email yang terdaftar, dan kami akan mengirimkan instruksi untuk mengatur ulang password Anda."
      features={["Aman", "Cepat", "Terlindungi"]}
      metricsType="management"
      animationType="slide"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-[var(--color-text-tertiary)] hover:text-white transition-colors w-fit mb-2">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Kembali ke Login
          </Link>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Lupa Password?</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Jangan khawatir, kami akan membantu memulihkan akun Anda.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-3"
            >
              <h3 className="text-sm font-semibold text-emerald-400">Email Terkirim!</h3>
              <p className="text-sm text-emerald-400/80 leading-relaxed">
                Silakan periksa kotak masuk email Anda untuk instruksi pemulihan password. Tautan tersebut hanya berlaku selama 24 jam.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="flex flex-col space-y-5"
            >
              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5 relative group">
                  <label htmlFor="email" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'email' ? 'text-[#a78bfa]' : 'text-[var(--color-text-secondary)]'}`}>Email</label>
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
              </div>

              <motion.button 
                type="submit" 
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full h-11 rounded-xl bg-white text-black font-medium text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  "Kirim Instruksi"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </AuthLayout>
  );
}
