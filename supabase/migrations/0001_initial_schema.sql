-- Lynknov initial schema v0
-- Target: founder-first MVP
-- Core: auth profile, public page, portfolio items, leads, analytics events

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  headline text,
  bio text,
  avatar_url text,
  primary_cta_label text default 'Work with me',
  primary_cta_url text,
  contact_email text,
  is_onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.public_pages (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique,
  title text not null,
  subtitle text,
  theme_key text default 'default-dark',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  is_primary boolean not null default true,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.public_pages(id) on delete cascade,
  section_type text not null check (section_type in ('hero','about','portfolio','cta')),
  position integer not null default 0,
  is_visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  page_id uuid references public.public_pages(id) on delete set null,
  title text not null,
  short_description text,
  category text,
  thumbnail_url text,
  project_url text,
  case_study_url text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.public_pages(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text default 'public-page',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references public.public_pages(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('page_view','cta_click','lead_submit')),
  session_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_public_pages_updated_at on public.public_pages;
create trigger trg_public_pages_updated_at
before update on public.public_pages
for each row execute function public.set_updated_at();

drop trigger if exists trg_page_sections_updated_at on public.page_sections;
create trigger trg_page_sections_updated_at
before update on public.page_sections
for each row execute function public.set_updated_at();

drop trigger if exists trg_portfolio_projects_updated_at on public.portfolio_projects;
create trigger trg_portfolio_projects_updated_at
before update on public.portfolio_projects
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.public_pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.leads enable row level security;
alter table public.analytics_events enable row level security;

-- profiles
drop policy if exists "profiles_select_own_or_public" on public.profiles;
create policy "profiles_select_own_or_public"
on public.profiles for select
using (
  auth.uid() = id
  or exists (
    select 1
    from public.public_pages p
    where p.owner_id = profiles.id
      and p.status = 'published'
  )
);

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
on public.profiles for update
using (auth.uid() = id);

-- public_pages
drop policy if exists "pages_public_read_published" on public.public_pages;
create policy "pages_public_read_published"
on public.public_pages for select
using (status = 'published' or auth.uid() = owner_id);

drop policy if exists "pages_insert_own" on public.public_pages;
create policy "pages_insert_own"
on public.public_pages for insert
with check (auth.uid() = owner_id);

drop policy if exists "pages_update_own" on public.public_pages;
create policy "pages_update_own"
on public.public_pages for update
using (auth.uid() = owner_id);

drop policy if exists "pages_delete_own" on public.public_pages;
create policy "pages_delete_own"
on public.public_pages for delete
using (auth.uid() = owner_id);

-- page_sections
drop policy if exists "sections_read_public_or_own" on public.page_sections;
create policy "sections_read_public_or_own"
on public.page_sections for select
using (
  exists (
    select 1 from public.public_pages p
    where p.id = page_sections.page_id
      and (p.status = 'published' or p.owner_id = auth.uid())
  )
);

drop policy if exists "sections_write_own" on public.page_sections;
create policy "sections_write_own"
on public.page_sections for all
using (
  exists (
    select 1 from public.public_pages p
    where p.id = page_sections.page_id
      and p.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.public_pages p
    where p.id = page_sections.page_id
      and p.owner_id = auth.uid()
  )
);

-- portfolio_projects
drop policy if exists "projects_read_public_or_own" on public.portfolio_projects;
create policy "projects_read_public_or_own"
on public.portfolio_projects for select
using (
  auth.uid() = owner_id
  or is_published = true
);

drop policy if exists "projects_write_own" on public.portfolio_projects;
create policy "projects_write_own"
on public.portfolio_projects for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

-- leads
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public"
on public.leads for insert
with check (true);

drop policy if exists "leads_read_own" on public.leads;
create policy "leads_read_own"
on public.leads for select
using (auth.uid() = owner_id);

drop policy if exists "leads_update_own" on public.leads;
create policy "leads_update_own"
on public.leads for update
using (auth.uid() = owner_id);

-- analytics_events
drop policy if exists "analytics_insert_public" on public.analytics_events;
create policy "analytics_insert_public"
on public.analytics_events for insert
with check (true);

drop policy if exists "analytics_read_own" on public.analytics_events;
create policy "analytics_read_own"
on public.analytics_events for select
using (auth.uid() = owner_id);
