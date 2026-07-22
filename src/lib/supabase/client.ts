'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente Supabase para componentes cliente del panel admin
 * (login y subida de imágenes a Storage).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
