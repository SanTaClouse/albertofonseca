'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/supabase/require-admin'

export interface EstadoForm {
  error?: string
  ok?: boolean
}

const CLAVES = [
  'tagline',
  'sobre_mi',
  'email',
  'whatsapp',
  'youtube',
  'spotify',
  'instagram',
  'facebook',
] as const

export async function guardarTextos(
  _prev: EstadoForm,
  formData: FormData
): Promise<EstadoForm> {
  const supabase = await requireAdmin()

  const filas = CLAVES.map((clave) => ({
    clave,
    valor: String(formData.get(clave) ?? '').trim(),
  }))

  const { error } = await supabase.from('config').upsert(filas)

  if (error) {
    console.error('Error guardando textos:', error)
    return { error: 'No se pudo guardar. Intentá de nuevo en un momento.' }
  }

  revalidatePath('/', 'layout')
  return { ok: true }
}
