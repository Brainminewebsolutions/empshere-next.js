-- =====================================================================
--  Secure House admin - Supabase schema
--  Run this once in Supabase Dashboard -> SQL Editor -> New query.
--  Safe to re-run: every statement is idempotent.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Staff profiles. One row per login, keyed to auth.users. Role decides
-- what the person can do in /admin:
--   admin  - everything, including creating/deleting other logins
--   editor - posts and images only
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text not null default '',
  role        text not null default 'editor' check (role in ('admin', 'editor')),
  created_at  timestamptz not null default now()
);

-- SECURITY DEFINER so policies can check the caller's role without
-- recursing into the profiles table's own RLS policies.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_staff() from public, anon;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own or admin reads all" on public.profiles;
create policy "profiles: read own or admin reads all"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

-- No insert/update/delete policies on purpose: profiles are only ever
-- written by the server with the secret key (Users screen), so a logged-in
-- editor can never promote themselves to admin.

-- ---------------------------------------------------------------------
-- Posts (blog + inspiration share one table and one template).
-- ---------------------------------------------------------------------
create table if not exists public.posts (
  id                  uuid primary key default gen_random_uuid(),
  post_type           text not null default 'blog' check (post_type in ('blog', 'inspiration')),
  status              text not null default 'draft' check (status in ('draft', 'published')),
  title               text not null,
  slug                text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt             text not null default '',
  content_html        text not null default '',
  author_name         text not null default 'Secure House',
  featured_image_url  text,
  featured_image_alt  text not null default '',
  published_at        timestamptz,

  -- SEO (Yoast-style)
  focus_keyphrase     text not null default '',
  meta_title          text not null default '',
  meta_description    text not null default '',
  meta_keywords       text not null default '',
  canonical_url       text not null default '',
  noindex             boolean not null default false,
  og_title            text not null default '',
  og_description      text not null default '',
  og_image_url        text,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  created_by          uuid references auth.users (id) on delete set null,
  updated_by          uuid references auth.users (id) on delete set null,

  unique (post_type, slug)
);

-- FAQs shown after the post body (+ FAQPage structured data):
-- [{ "question": "...", "answer": "..." }, ...]
alter table public.posts
  add column if not exists faqs jsonb not null default '[]'::jsonb;

-- Structured data (JSON-LD) controls, edited in the Schema box:
--   auto_article_schema - output BlogPosting schema built from the post
--   auto_faq_schema     - output FAQPage schema built from the FAQs
--   custom_schemas      - extra blocks: [{ "type": "HowTo", "json": "{...}" }]
alter table public.posts
  add column if not exists auto_article_schema boolean not null default true,
  add column if not exists auto_faq_schema boolean not null default true,
  add column if not exists custom_schemas jsonb not null default '[]'::jsonb;

create index if not exists posts_public_idx
  on public.posts (post_type, status, published_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

-- Website visitors (anon key) only ever see published posts.
drop policy if exists "posts: public reads published" on public.posts;
create policy "posts: public reads published"
  on public.posts for select to anon, authenticated
  using (status = 'published');

drop policy if exists "posts: staff read all" on public.posts;
create policy "posts: staff read all"
  on public.posts for select to authenticated
  using (public.is_staff());

drop policy if exists "posts: staff insert" on public.posts;
create policy "posts: staff insert"
  on public.posts for insert to authenticated
  with check (public.is_staff());

drop policy if exists "posts: staff update" on public.posts;
create policy "posts: staff update"
  on public.posts for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "posts: staff delete" on public.posts;
create policy "posts: staff delete"
  on public.posts for delete to authenticated
  using (public.is_staff());

-- ---------------------------------------------------------------------
-- Old slugs -> post. Written automatically when a published post's slug
-- is changed, so the old URL 301s to the new one instead of 404ing.
-- ---------------------------------------------------------------------
create table if not exists public.post_redirects (
  id          uuid primary key default gen_random_uuid(),
  post_type   text not null check (post_type in ('blog', 'inspiration')),
  old_slug    text not null,
  post_id     uuid not null references public.posts (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (post_type, old_slug)
);

alter table public.post_redirects enable row level security;

drop policy if exists "redirects: public read" on public.post_redirects;
create policy "redirects: public read"
  on public.post_redirects for select to anon, authenticated
  using (true);

drop policy if exists "redirects: staff write" on public.post_redirects;
create policy "redirects: staff write"
  on public.post_redirects for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- ---------------------------------------------------------------------
-- Login throttling. Only the server (secret key) touches this table -
-- RLS is on with no policies, so anon/authenticated can't read or write.
-- ---------------------------------------------------------------------
create table if not exists public.login_attempts (
  id          bigint generated always as identity primary key,
  email       text not null,
  ip          text not null,
  succeeded   boolean not null,
  created_at  timestamptz not null default now()
);

create index if not exists login_attempts_email_idx on public.login_attempts (email, created_at desc);
create index if not exists login_attempts_ip_idx on public.login_attempts (ip, created_at desc);

alter table public.login_attempts enable row level security;

-- ---------------------------------------------------------------------
-- Leads from every site form (app/api/enquiry/route.ts). Written only by
-- the server with the secret key; admins read them in /admin/leads.
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  form_type     text not null,
  form_name     text not null default '',
  name          text not null default '', 
  email         text not null default '',
  phone         text not null default '',
  address       text not null default '',
  interests     text[] not null default '{}',
  message       text not null default '',
  page_title    text not null default '',
  page_url      text not null default '',
  landing_page  text not null default '',
  referrer      text not null default '',
  utm           jsonb not null default '{}'::jsonb,
  device        text not null default '',
  ip            text not null default '',
  email_status  text not null default ''
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "leads: admin read" on public.leads;
create policy "leads: admin read"
  on public.leads for select to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- Table permissions. Newer Supabase projects can be created with "don't
-- auto-expose new tables" - these grants make access explicit either way.
-- RLS policies above still decide WHICH rows each role can touch.
-- ---------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;
grant select on public.posts, public.post_redirects to anon, authenticated;
grant insert, update, delete on public.posts, public.post_redirects to authenticated;
grant select on public.profiles, public.leads to authenticated;
grant all on public.profiles, public.posts, public.post_redirects, public.login_attempts, public.leads to service_role;
grant usage, select on all sequences in schema public to service_role;

-- ---------------------------------------------------------------------
-- Image storage. Public read (images appear on the public blog), write
-- only for staff. SVG is deliberately not allowed (it can carry script).
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  4194304, -- 4 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "blog-images: staff upload" on storage.objects;
create policy "blog-images: staff upload"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images' and public.is_staff());

drop policy if exists "blog-images: staff update" on storage.objects;
create policy "blog-images: staff update"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images' and public.is_staff());

drop policy if exists "blog-images: staff delete" on storage.objects;
create policy "blog-images: staff delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images' and public.is_staff());

-- Make the API see new columns (e.g. faqs) immediately.
notify pgrst, 'reload schema';
