-- ═══════════════════════════════════════════════════════════════════
-- Esquema de la base de datos — albertofonseca.com
-- Pegar completo en Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- ─── Tablas ──────────────────────────────────────────────────────────

create table public.discos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  anio int not null,
  canciones int,
  descripcion text not null default '',
  spotify_embed_id text,
  portada_url text,
  proximamente boolean not null default false,
  orden int not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.escritos (
  id bigint generated always as identity primary key,
  titulo text not null,
  fecha text not null check (fecha ~ '^\d{4}-\d{2}$'), -- YYYY-MM
  resumen text not null default '',
  contenido text not null default '',
  imagen_url text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.presentaciones (
  id bigint generated always as identity primary key,
  fecha date not null,
  lugar text not null,
  ciudad text not null,
  hora text not null default '',
  link_entradas text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.videos (
  id bigint generated always as identity primary key,
  youtube_id text not null,
  titulo text not null default '',
  orden int not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.config (
  clave text primary key,
  valor text not null default ''
);

-- updated_at automático en escritos
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger escritos_updated_at
  before update on public.escritos
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────
-- Lectura pública (el sitio usa la anon key), escritura solo autenticado
-- (el panel admin usa la sesión de Alberto).

alter table public.discos enable row level security;
alter table public.escritos enable row level security;
alter table public.presentaciones enable row level security;
alter table public.videos enable row level security;
alter table public.config enable row level security;

create policy "lectura publica" on public.discos for select using (true);
create policy "lectura publica" on public.escritos for select using (true);
create policy "lectura publica" on public.presentaciones for select using (true);
create policy "lectura publica" on public.videos for select using (true);
create policy "lectura publica" on public.config for select using (true);

create policy "escritura autenticada" on public.discos
  for all to authenticated using (true) with check (true);
create policy "escritura autenticada" on public.escritos
  for all to authenticated using (true) with check (true);
create policy "escritura autenticada" on public.presentaciones
  for all to authenticated using (true) with check (true);
create policy "escritura autenticada" on public.videos
  for all to authenticated using (true) with check (true);
create policy "escritura autenticada" on public.config
  for all to authenticated using (true) with check (true);

-- ─── Storage: bucket público para imágenes ───────────────────────────

insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true);

create policy "imagenes lectura publica" on storage.objects
  for select using (bucket_id = 'imagenes');
create policy "imagenes subir autenticado" on storage.objects
  for insert to authenticated with check (bucket_id = 'imagenes');
create policy "imagenes actualizar autenticado" on storage.objects
  for update to authenticated using (bucket_id = 'imagenes');
create policy "imagenes borrar autenticado" on storage.objects
  for delete to authenticated using (bucket_id = 'imagenes');
