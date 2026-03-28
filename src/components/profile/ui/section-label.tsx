interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA] mb-8 md:mb-12">
      {children}
    </h2>
  );
}
