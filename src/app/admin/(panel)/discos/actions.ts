'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/supabase/require-admin'
import { slugify } from '@/lib/utils'

export interface EstadoForm {
  error?: string
}

/** Acepta la URL del álbum de Spotify o el ID directo. */
function extraerSpotifyId(input: string): string | null {
  const limpio = input.trim()
  if (!limpio) return null
  const match = limpio.match(/album\/([A-Za-z0-9]+)/)
  return match ? match[1] : limpio
}

export async function guardarDisco(
  _prev: EstadoForm,
  formData: FormData
): Promise<EstadoForm> {
  const supabase = await requireAdmin()

  const id = formData.get('id')
  const titulo = String(formData.get('titulo') ?? '').trim()
  const anio = Number(formData.get('anio'))
  const canciones = String(formData.get('canciones') ?? '').trim()

  if (!titulo) return { error: 'El título es obligatorio.' }
  if (!anio || anio < 1900 || anio > 2100) return { error: 'Poné un año válido.' }

  const datos = {
    titulo,
    anio,
    canciones: canciones ? Number(canciones) : null,
    descripcion: String(formData.get('descripcion') ?? '').trim(),
    spotify_embed_id: extraerSpotifyId(String(formData.get('spotify') ?? '')),
    portada_url: String(formData.get('portada_url') ?? '').trim() || null,
    proximamente: formData.get('proximamente') === 'on',
    orden: Number(formData.get('orden') ?? 0) || 0,
    activo: formData.get('activo') === 'on',
  }

  const { error } = id
    ? await supabase.from('discos').update(datos).eq('id', String(id))
    : await supabase.from('discos').insert({ ...datos, slug: slugify(titulo) })

  if (error) {
    console.error('Error guardando disco:', error)
    return {
      error: error.code === '23505'
        ? 'Ya existe un disco con ese título.'
        : 'No se pudo guardar. Intentá de nuevo en un momento.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/discos')
}

export async function eliminarDisco(id: string) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('discos').delete().eq('id', id)
  if (error) {
    console.error('Error eliminando disco:', error)
    return
  }
  revalidatePath('/', 'layout')
  redirect('/admin/discos')
}
