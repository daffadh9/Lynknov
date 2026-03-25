# Folder Architecture Guide

## Tujuan

Struktur folder harus membantu tiga hal sekaligus:

1. memudahkan pencarian dokumen
2. menjaga konsistensi antara strategi, desain, dan engineering
3. memudahkan agent coding membaca konteks proyek

## Rekomendasi Root

```text
E:\Lynknov
```

## Struktur yang Direkomendasikan

```text
E:\Lynknov
├── docs
│   ├── foundation
│   ├── strategy
│   ├── product
│   ├── engineering
│   ├── execution
│   └── shared
├── app
├── packages
├── public
├── assets
├── scripts
├── database
├── tests
└── archive
```

## Fungsi Tiap Folder

### `docs/foundation`
Tempat menyimpan dokumen inti yang menjelaskan bagaimana paket dokumentasi dipakai.

### `docs/strategy`
Semua keputusan tingkat atas:
- positioning
- blueprint produk
- monetization
- GTM assumptions
- strategic notes

### `docs/product`
Semua keputusan yang memengaruhi pengalaman user:
- scope fitur
- user journey
- information architecture
- UX notes
- wireframe descriptions

### `docs/engineering`
Semua keputusan implementasi:
- technical architecture
- schema notes
- API contracts
- deployment notes
- infra decisions

### `docs/execution`
Semua hal yang sifatnya eksekusi:
- roadmap
- sprint plans
- launch checklist
- release notes

### `docs/shared`
Dokumen lintas domain:
- naming rules
- shared glossary
- folder tree
- templates

## Rekomendasi Naming

Gunakan lowercase dan kebab-case agar aman di berbagai environment.

### Contoh yang baik
- `brand-identity-positioning.md`
- `product-master-blueprint.md`
- `business-model-monetization.md`

### Hindari
- spasi pada nama file
- nama file terlalu panjang
- variasi penamaan yang tidak konsisten

## Aturan Versioning

Untuk dokumen yang sudah masuk fase revisi besar, gunakan pola:

- `brand-identity-positioning.v1.md`
- `brand-identity-positioning.v2.md`

Untuk dokumen aktif yang menjadi source of truth, pakai nama tanpa suffix versi. Saat revisi besar selesai, file utama ditimpa oleh versi terbaru dan versi lama dipindah ke `archive/`.

## Aturan Arsip

```text
archive/
├── docs-v1
├── deprecated-directions
└── old-roadmaps
```

Jangan menghapus keputusan lama yang pernah memengaruhi build. Pindahkan ke archive agar jejak keputusan tetap ada.

## Struktur Repo yang Lebih Lengkap

```text
Lynknov/
├── README.md
├── docs/
│   ├── foundation/
│   ├── strategy/
│   ├── product/
│   ├── engineering/
│   ├── execution/
│   └── shared/
├── app/
│   ├── (marketing)/
│   ├── dashboard/
│   ├── onboarding/
│   ├── builder/
│   ├── checkout/
│   └── api/
├── packages/
│   ├── ui/
│   ├── config/
│   ├── analytics/
│   └── core/
├── public/
├── assets/
├── database/
│   ├── migrations/
│   └── seeds/
├── scripts/
├── tests/
└── archive/
```

## Prinsip Utama

Folder bukan hanya tempat menyimpan file. Folder adalah cara menjaga kejernihan berpikir.

Jika struktur folder berantakan, biasanya keputusan produk juga ikut berantakan.
