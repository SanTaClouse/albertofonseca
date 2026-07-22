'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/supabase/require-admin'

export interface EstadoForm {
  error?: string
}

/** Acepta cualquier formato de link de YouTube o el ID directo. */
function extraerYoutubeId(input: string): string | null {
  const limpio = input.trim()
  if (!limpio) return null
  const match = limpio.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/))([A-Za-z0-9_-]{11})/
  )
  if (match) return match[1]
  if (/^[A-Za-z0-9_-]{11}$/.test(limpio)) return limpio
  return null
}

export async function guardarVideo(
  _prev: EstadoForm,
  formData: FormData
): Promise<EstadoForm> {
  const supabase = await requireAdmin()

  const id = formData.get('id')
  const youtubeId = extraerYoutubeId(String(formData.get('youtube') ?? ''))

  if (!youtubeId) {
    return { error: 'Pegá un link de YouTube válido (ej: https://youtu.be/…).' }
  }

  const datos = {
    youtube_id: youtubeId,
    titulo: String(formData.get('titulo') ?? '').trim(),
    orden: Number(formData.get('orden') ?? 0) || 0,
    activo: formData.get('activo') === 'on',
  }

  const { error } = id
    ? await supabase.from('videos').update(datos).eq('id', Number(id))
    : await supabase.from('videos').insert(datos)

  if (error) {
    console.error('Error guardando video:', error)
    return { error: 'No se pudo guardar. Intentá de nuevo en un momento.' }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/videos')
}

export async function eliminarVideo(id: number) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) {
    console.error('Error eliminando video:', error)
    return
  }
  revalidatePath('/', 'layout')
  redirect('/admin/videos')
}
