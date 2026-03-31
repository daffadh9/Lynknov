import { ProfileData } from "../types/profile";
import { IconLink } from "../ui/icon-link";

interface SocialPresenceProps {
  profile: ProfileData;
}

export function SocialPresence({ profile }: SocialPresenceProps) {
  if (!profile.socialLinks || profile.socialLinks.length === 0) return null;

  return (
    <div className="relative w-full py-8 bg-gradient-to-r from-transparent via-[#0A0A0A] to-transparent border-none z-10 transition-colors">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 xl:px-20">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mr-4 hidden md:block">
            Connect
          </span>
          {profile.socialLinks.map((social, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#050505] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.2] transition-all duration-300">
                <IconLink social={social} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
