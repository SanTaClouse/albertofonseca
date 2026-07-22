import { createClient } from '@supabase/supabase-js'

/**
 * Keep-alive de Supabase: el free tier pausa proyectos tras 7 días sin
 * actividad. Un cron diario de Vercel (ver vercel.json) hace un query
 * trivial para que el proyecto nunca se pause.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return Response.json({ ok: false, error: 'Supabase sin configurar' }, { status: 500 })
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { error } = await supabase.from('config').select('clave').limit(1)
    if (error) throw error
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Keepalive error:', error)
    return Response.json({ ok: false }, { status: 500 })
  }
}
