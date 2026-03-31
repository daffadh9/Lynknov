import { ReactNode } from "react";

interface ProfileShellProps {
  children: ReactNode;
}

export function ProfileShell({ children }: ProfileShellProps) {
  return (
    <main className="relative min-h-screen bg-[#030303] text-[#FAFAFA] font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Dynamic Global Dark Premium Aura */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/[0.02] mix-blend-screen blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/[0.015] mix-blend-screen blur-[150px] pointer-events-none z-0 hidden md:block"></div>
      
      {/* Base ambient noise/texture effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="relative z-10 w-full flex flex-col">
        {children}
      </div>
    </main>
  );
}
