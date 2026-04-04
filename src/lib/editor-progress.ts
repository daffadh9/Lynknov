import type { EditorSection } from "@/types/editor";

export type EditorWorkspaceKey =
  | "sections"
  | "uploads"
  | "audio"
  | "theme"
  | "settings";

export type SectionHealthStatus = "Lengkap" | "Perlu dilengkapi" | "Kosong";

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  hero: "First impression utama halaman Anda. Headline, avatar, dan CTA harus terasa paling kuat di sini.",
  about: "Ruang untuk memperjelas perspektif, filosofi, dan value utama yang Anda bawa.",
  digital_presence: "Tunjukkan eksistensi digital, audience footprint, dan tempat Anda aktif membangun kredibilitas.",
  showcase: "Tampilkan penawaran atau karya unggulan dalam format yang mudah dipindai dan terasa premium.",
  portfolio: "Validasi kemampuan Anda lewat proyek nyata, studi kasus, dan hasil kerja yang relevan.",
  storyboard: "Bangun narasi perjalanan, milestone, dan cerita di balik layar yang membentuk brand Anda.",
  link_hub: "Satukan tautan penting dalam struktur yang rapi agar visitor cepat menemukan aksi berikutnya.",
  testimonials: "Kuatkan trust dengan social proof dari klien, partner, atau orang yang pernah bekerja bersama Anda.",
  contact: "Arahkan visitor ke aksi lanjutan seperti kontak, booking call, atau kolaborasi.",
  footer: "Penutup halaman untuk link legal, catatan singkat, atau informasi tambahan.",
};

const hasText = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0;

const hasArrayItems = (value: unknown) =>
  Array.isArray(value) && value.length > 0;

const countTruthy = (checks: boolean[]) => checks.filter(Boolean).length;

export function getSectionCompletion(section: EditorSection) {
  const content = section.content as Record<string, unknown>;

  let checks: boolean[] = [];

  switch (section.type) {
    case "hero":
      checks = [
        hasText(content.name),
        hasText(content.headline),
        hasText(content.avatarUrl),
        hasText((content.primaryCta as { label?: string } | undefined)?.label),
      ];
      break;
    case "about":
      checks = [
        hasText(content.title),
        hasText(content.description),
        hasText(content.sideCardTitle),
      ];
      break;
    case "digital_presence": {
      const stats = (content.stats as Array<Record<string, unknown>> | undefined) ?? [];
      checks = [
        hasText(content.title),
        stats.length > 0,
        stats.some((item) => hasText(item.platform) && hasText(item.value)),
      ];
      break;
    }
    case "showcase": {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      checks = [
        hasText(content.title),
        items.length > 0,
        items.some((item) => hasText(item.title)),
      ];
      break;
    }
    case "portfolio": {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      checks = [
        hasText(content.title),
        items.length > 0,
        items.some((item) => hasText(item.title) && hasText(item.description)),
      ];
      break;
    }
    case "storyboard": {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      checks = [
        hasText(content.title),
        items.length > 0,
        items.some((item) => hasText(item.title) && hasText(item.content)),
      ];
      break;
    }
    case "link_hub": {
      const groups = (content.groups as Array<Record<string, unknown>> | undefined) ?? [];
      const linkCount = groups.reduce((total, group) => {
        const links = (group.links as Array<Record<string, unknown>> | undefined) ?? [];
        return total + links.length;
      }, 0);

      checks = [
        hasText(content.title),
        groups.length > 0,
        linkCount > 0,
      ];
      break;
    }
    case "testimonials": {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      checks = [
        hasText(content.title),
        items.length > 0,
        items.some((item) => hasText(item.quote) && hasText(item.author)),
      ];
      break;
    }
    default:
      checks = [hasArrayItems(Object.values(content))];
      break;
  }

  const total = checks.length;
  const completed = countTruthy(checks);
  const ratio = total === 0 ? 0 : completed / total;

  let status: SectionHealthStatus = "Perlu dilengkapi";
  if (completed === 0) {
    status = "Kosong";
  } else if (ratio >= 0.75) {
    status = "Lengkap";
  }

  return {
    completed,
    total,
    ratio,
    status,
  };
}

export function getPageCompletion(sections: EditorSection[]) {
  const visibleSections = sections.filter((section) => section.isEnabled);
  const metrics = sections.map(getSectionCompletion);
  const totalChecks = metrics.reduce((sum, metric) => sum + metric.total, 0);
  const completedChecks = metrics.reduce((sum, metric) => sum + metric.completed, 0);
  const readySections = metrics.filter((metric) => metric.status === "Lengkap").length;

  return {
    totalSections: sections.length,
    visibleSections: visibleSections.length,
    readySections,
    completionPercent:
      totalChecks === 0 ? 0 : Math.round((completedChecks / totalChecks) * 100),
  };
}

export function getAssetOverview(sections: EditorSection[]) {
  let avatarAssets = 0;
  let galleryAssets = 0;
  let projectAssets = 0;

  for (const section of sections) {
    const content = section.content as Record<string, unknown>;

    if (section.type === "hero" && hasText(content.avatarUrl)) {
      avatarAssets += 1;
    }

    if (section.type === "showcase") {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      galleryAssets += items.filter((item) => hasText(item.imageUrl)).length;
    }

    if (section.type === "portfolio" || section.type === "storyboard") {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      projectAssets += items.filter((item) => hasText(item.imageUrl)).length;
    }

    if (section.type === "testimonials") {
      const items = (content.items as Array<Record<string, unknown>> | undefined) ?? [];
      avatarAssets += items.filter((item) => hasText(item.avatarUrl)).length;
    }
  }

  return {
    avatarAssets,
    galleryAssets,
    projectAssets,
    totalAssets: avatarAssets + galleryAssets + projectAssets,
  };
}
