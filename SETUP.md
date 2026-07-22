# Setup de Supabase — paso a paso (una sola vez)

Todo el proyecto funciona con el **plan Free de Supabase** y **Vercel Hobby**: $0/mes.
Estos pasos se hacen una única vez, tardan ~10 minutos.

## 1. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y logueate con la **cuenta de Google de Alberto**
   (así el proyecto queda a su nombre).
2. **New project** → nombre: `alberto-fonseca` → región: `East US (North Virginia)`
   (la más cercana a República Dominicana) → generá la contraseña de la base y **guardala**.
3. Esperá 1-2 minutos a que el proyecto termine de crearse.

## 2. Crear las tablas y cargar el contenido actual

1. En el menú lateral: **SQL Editor** → **New query**.
2. Pegá el contenido completo de [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   Debe decir "Success. No rows returned".
3. Nueva query → pegá [`supabase/seed.sql`](supabase/seed.sql) → **Run**.
   Esto carga los 3 discos, los 2 videos, la presentación del Sheet y los textos actuales.

## 3. Crear el usuario de Alberto y cerrar el registro

1. **Authentication → Sign In / Providers**: en *Email*, dejá habilitado el provider.
2. **Authentication → Sign In / Providers → Auth settings** (o *Settings*):
   **desactivá "Allow new users to sign up"** ← importante: solo el usuario creado a mano
   puede entrar al panel.
3. **Authentication → Users → Add user → Create new user**:
   - Email: el Gmail de Alberto
   - Password: una contraseña segura (compartísela por un medio seguro)
   - Marcá **Auto Confirm User**
4. (Opcional) Creá un segundo usuario con tu email para administrar vos también.

## 4. Copiar las credenciales

En **Settings → API** (o **Project Settings → API Keys**):

- **Project URL** → va en `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key** (o "Publishable key" en proyectos nuevos) → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Local (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (o sb_publishable_...)
```

Reiniciá `npm run dev` después de completarlas.

### Vercel

**Project → Settings → Environment Variables** → agregá las mismas dos variables
(en Production, Preview y Development) → **Redeploy**.

> La anon key es pública por diseño: la seguridad la aplican las políticas RLS
> de la base (lectura pública, escritura solo con sesión). Nunca uses la
> `service_role` key en el código.

## 5. Verificar

1. `npm run dev` → [http://localhost:3000/admin](http://localhost:3000/admin)
2. Entrá con el email y contraseña creados en el paso 3.
3. Probá editar un texto en **Textos** y guardá — el cambio aparece al instante en la web.

## Keep-alive (ya configurado, solo para saber)

El free tier de Supabase **pausa los proyectos tras 7 días sin actividad**.
Para que nunca pase, [`vercel.json`](vercel.json) define un cron diario que llama a
`/api/keepalive` y hace una consulta mínima. Con el sitio desplegado en Vercel,
no hay que hacer nada más.

## Límites del plan Free (referencia)

| Recurso | Límite | Uso estimado del sitio |
|---|---|---|
| Base de datos | 500 MB | < 5 MB |
| Storage (imágenes) | 1 GB | tapas + fotos de escritos |
| Transferencia | 5 GB/mes | de sobra con el caché de Vercel |
| Usuarios auth | 50.000/mes | 1-2 |
