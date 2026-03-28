import { Target, LayoutTemplate, Component, Fingerprint, LucideIcon } from "lucide-react";
import { Service } from "../types/profile";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const props = { className: "w-6 h-6 text-[#A1A1AA] transition-colors duration-300 group-hover:text-white", strokeWidth: 1.5 };
    
    switch (iconName.toLowerCase()) {
      case "target": return <Target {...props} />;
      case "layout-template": return <LayoutTemplate {...props} />;
      case "component": return <Component {...props} />;
      case "fingerprint": return <Fingerprint {...props} />;
      default: return null;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.05] bg-[#0A0A0A] p-8 transition-all duration-400 hover:border-white/[0.15] hover:bg-[#0C0C0C]">
      <div className="mb-12 flex justify-end">
        <div className="transform transition-transform duration-400 group-hover:-translate-y-1 group-hover:translate-x-1">
          {getIcon(service.icon)}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{service.title}</h3>
        <p className="text-sm leading-relaxed text-[#A1A1AA]">{service.description}</p>
      </div>
    </div>
  );
}
