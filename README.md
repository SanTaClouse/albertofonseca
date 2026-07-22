# albertofonseca.com

Sitio oficial de Alberto Fonseca — cantautor, escritor y periodista — con panel
de administración propio para manejar todo el contenido sin tocar código.

## Stack

- **Next.js 16** (App Router) + Tailwind CSS 4 — desplegado en **Vercel Hobby** (gratis)
- **Supabase Free** — Postgres (contenido) + Auth (login del panel) + Storage (imágenes)
- Costo total: **$0/mes**

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
```

Variables de entorno: ver [`.env.example`](.env.example).
Setup inicial de Supabase (una sola vez): ver [`SETUP.md`](SETUP.md).

## Panel de administración — manual de uso

Entrar a **`albertofonseca.com/admin`** con email y contraseña.

| Sección | Qué se maneja |
|---|---|
| **Escritos** | Textos con título, mes, resumen, contenido e imagen. Vista previa en vivo mientras se escribe: cada Enter crea un párrafo. |
| **Discos** | Tapa (subir imagen cuadrada), título, año, canciones, descripción y link de Spotify (se pega el link del álbum y listo). |
| **Presentaciones** | Fecha, hora, lugar, ciudad y link de entradas de cada show. Las pasadas quedan atenuadas. |
| **Videos** | Videos destacados de YouTube (se pega el link del video). |
| **Textos** | Tagline de la portada, texto de «Sobre mí», email, WhatsApp y redes. |

Notas:

- **Los cambios se publican al instante** al tocar Guardar.
- El interruptor **«Visible en la web»** permite ocultar algo sin borrarlo.
- **Eliminar** pide confirmación y no se puede deshacer.

## Arquitectura (para el desarrollador)

- `src/app/(publico)/` — sitio público. Lee de Supabase vía [`src/lib/data.ts`](src/lib/data.ts)
  con ISR (5 min) + revalidación on-demand al guardar desde el panel. Si Supabase no
  responde, sirve el caché y hace fallback a los defaults de `src/lib/constants.ts` — nunca se rompe.
- `src/app/admin/` — panel. Protegido por [`src/proxy.ts`](src/proxy.ts) + sesión de
  Supabase Auth. Mutaciones por Server Actions con RLS (sin `service_role`).
- `supabase/schema.sql` + `supabase/seed.sql` — esquema y contenido inicial.
- `/api/keepalive` + cron diario en [`vercel.json`](vercel.json) — evita que el free
  tier de Supabase pause el proyecto por inactividad.
- Imágenes del panel → bucket público `imagenes` de Supabase Storage; la foto del
  hero sigue en Cloudinary.
