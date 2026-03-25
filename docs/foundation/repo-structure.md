# Lynknov Repo Structure

```text
lynknov/
├── README.md
├── app/
│   ├── (marketing)/
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── builder/
│   │   └── settings/
│   └── api/
├── components/
│   ├── ui/
│   └── shared/
├── features/
│   ├── auth/
│   ├── onboarding/
│   ├── identity/
│   ├── portfolio/
│   ├── page-builder/
│   ├── leads/
│   ├── analytics/
│   └── publishing/
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── validations/
│   └── utils/
├── types/
├── public/
├── docs/
│   ├── foundation/
│   ├── strategy/
│   ├── product/
│   ├── engineering/
│   ├── execution/
│   └── delivery/
├── supabase/
│   ├── migrations/
│   └── seed/
├── prompts/
└── scripts/
```

## Prinsip
- `app/` untuk routes dan page composition
- `features/` untuk domain logic per modul
- `components/` untuk shared/presentational components
- `lib/` untuk utilitas, auth, supabase client, validation
- `docs/` sebagai source of truth
- `supabase/` untuk migration dan seed
- `prompts/` untuk prompt agent coding
