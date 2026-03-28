"use client";

import { ProfileData } from "../types/profile";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  profile: ProfileData;
}

export function TestimonialsSection({ profile }: TestimonialsSectionProps) {
  if (!profile.testimonials || profile.testimonials.length === 0) return null;

  const featuredTestimonial = profile.testimonials[0];
  const supportingTestimonials = profile.testimonials.slice(1, 3);

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden bg-[#050505]">
      {/* Background Identity for Testimonials */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0A0A0A] to-[#030303] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Testimoni
          </h2>
          <div className="w-8 h-[2px] bg-zinc-700"></div>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Featured Testimonial */}
          <div className="relative p-8 md:p-16 rounded-[2rem] bg-[#0A0A0A] border border-white/[0.08] shadow-2xl text-center flex flex-col items-center group transition-colors duration-500 hover:bg-[#0C0C0C]">
            <Quote className="w-12 h-12 text-zinc-700 mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1} />
            <p className="text-2xl md:text-4xl text-white leading-[1.5] font-medium tracking-tight mb-12">
              "{featuredTestimonial.quote}"
            </p>
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-white mb-1">{featuredTestimonial.author}</span>
              <span className="text-sm text-zinc-500 uppercase tracking-widest">{featuredTestimonial.role}</span>
            </div>
          </div>

          {/* Supporting Testimonials */}
          {supportingTestimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {supportingTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="p-8 md:p-10 rounded-3xl bg-transparent border border-white/[0.05] flex flex-col justify-between"
                >
                  <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <span className="block text-sm font-bold text-white mb-1">{testimonial.author}</span>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">{testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
