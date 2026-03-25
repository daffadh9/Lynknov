# What To Do After These Files Exist

## Jawaban singkat
Ya. Setelah struktur repo, SQL awal, dan prompt agent ini siap, kamu memang bisa langsung mulai build di agent.

Tapi urutannya harus begini:

1. Buat repo project Lynknov
2. Tempel folder `docs/` ke repo
3. Setup Next.js app
4. Setup Supabase project
5. Jalankan migration `0001_initial_schema.sql`
6. Baru jalankan prompt Sprint 0 ke agent
7. Setelah Sprint 0 rapi, lanjut Sprint 1

## Jangan langsung lompat ke UI polish
Fokus dulu ke alur:
- login
- onboarding
- create draft page
- edit sections
- publish page
- receive lead

## Source of truth
Selama build:
- Strategi lihat `docs/strategy/`
- Product execution lihat `docs/product/`
- Technical/build lihat `docs/engineering/` dan `docs/execution/`
