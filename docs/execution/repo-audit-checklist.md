# Repo Audit Checklist

## Struktur root
- apakah folder root terlalu berantakan?
- apakah docs dipisah jelas?
- apakah prompts dipisah jelas?
- apakah supabase punya folder sendiri?
- apakah config files ada di root yang benar?

## App architecture
- apakah route ada di `app/`?
- apakah domain logic dipisah ke `features/`?
- apakah shared component dipisah ke `components/`?
- apakah helper dan infra logic dipisah ke `lib/`?
- apakah types dipisah ke `types/`?

## Product alignment
- apakah struktur folder masih sesuai MVP?
- apakah ada folder phase-2 yang terlalu cepat muncul?
- apakah ada modul liar yang belum perlu?
- apakah ada naming yang membingungkan?

## Docs discipline
- apakah `docs/` sinkron dengan build?
- apakah `docs/execution/` dipakai?
- apakah prompt sprint tersimpan rapi?
- apakah repo punya source of truth yang jelas?

## Supabase readiness
- apakah migration ada?
- apakah schema file rapi?
- apakah env structure jelas?
- apakah auth dan db logic tidak tercecer?

## Cleanliness
- apakah naming konsisten?
- apakah ada file duplikat / eksperimen liar?
- apakah ada folder kosong yang tidak perlu?
- apakah struktur mudah dibaca agent?

## Hasil audit nanti sebaiknya dibagi jadi:
1. what is already good
2. what is messy
3. what should be renamed
4. what should be moved
5. what should be deleted later
6. recommended target structure
