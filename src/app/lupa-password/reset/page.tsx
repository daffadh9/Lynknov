"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout, { useAuth } from "@/components/auth/AuthLayout";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LupaPasswordResetPage() {
  const { setIsFocused } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Password tidak cocok");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      alert(error.message);
      setIsLoading(false);
    } else {
      alert("Password berhasil diubah. Silakan masuk dengan password baru Anda.");
      router.push("/login");
    }
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
      Buat sandi <span className="text-white/70">baru.</span>
    </>
  );

  return (
    <AuthLayout
      badgeText="Keamanan Akun"
      title={title}
      description="Silakan buat password baru untuk akun Anda. Pastikan untuk menggunakan kombinasi yang kuat dan aman."
      features={["Aman", "Cepat", "Terlindungi"]}
      metricsType="management"
      animationType="slide"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Reset Password</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Buat sandi baru untuk akun Anda.
          </p>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit} 
          className="flex flex-col space-y-5"
        >
          <div className="space-y-4">
            {/* Password Field */}
            <div className="space-y-1.5 relative group">
              <label htmlFor="password" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'password' ? 'text-[#a78bfa]' : 'text-[var(--color-text-secondary)]'}`}>Password Baru</label>
              <div className="relative flex items-center">
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  minLength={6}
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

            {/* Confirm Password Field */}
            <div className="space-y-1.5 relative group">
              <label htmlFor="confirmPassword" className={`text-sm font-medium transition-colors duration-300 ${focusedField === 'confirmPassword' ? 'text-[#a78bfa]' : 'text-[var(--color-text-secondary)]'}`}>Konfirmasi Password Baru</label>
              <div className="relative flex items-center">
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required
                  minLength={6}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                  className="w-full h-11 pl-4 pr-10 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.05] transition-all duration-300 relative z-10 hover:border-white/20"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 z-20 text-white/40 hover:text-white/80 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              "Simpan Password"
            )}
          </motion.button>
        </motion.form>

      </div>
    </AuthLayout>
  );
}
