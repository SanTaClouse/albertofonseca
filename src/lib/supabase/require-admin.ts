import { redirect } from 'next/navigation'
import { createClient } from './server'

/**
 * Guard para Server Actions del panel: valida la sesión contra Supabase
 * y devuelve el cliente (las mutaciones igual pasan por RLS).
 */
export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  return supabase
}
