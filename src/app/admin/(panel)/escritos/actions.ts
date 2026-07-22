'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/supabase/require-admin'

export interface EstadoForm {
  error?: string
}

export async function guardarEscrito(
  _prev: EstadoForm,
  formData: FormData
): Promise<EstadoForm> {
  const supabase = await requireAdmin()

  const id = formData.get('id')
  const datos = {
    titulo: String(formData.get('titulo') ?? '').trim(),
    fecha: String(formData.get('fecha') ?? ''),
    resumen: String(formData.get('resumen') ?? '').trim(),
    contenido: String(formData.get('contenido') ?? '').trim(),
    imagen_url: String(formData.get('imagen_url') ?? '').trim() || null,
    activo: formData.get('activo') === 'on',
  }

  if (!datos.titulo) return { error: 'El título es obligatorio.' }
  if (!/^\d{4}-\d{2}$/.test(datos.fecha)) return { error: 'Elegí el mes del escrito.' }

  const { error } = id
    ? await supabase.from('escritos').update(datos).eq('id', Number(id))
    : await supabase.from('escritos').insert(datos)

  if (error) {
    console.error('Error guardando escrito:', error)
    return { error: 'No se pudo guardar. Intentá de nuevo en un momento.' }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/escritos')
}

export async function eliminarEscrito(id: number) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('escritos').delete().eq('id', id)
  if (error) {
    console.error('Error eliminando escrito:', error)
    return
  }
  revalidatePath('/', 'layout')
  redirect('/admin/escritos')
}
