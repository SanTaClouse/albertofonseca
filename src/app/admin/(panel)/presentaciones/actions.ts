'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/supabase/require-admin'

export interface EstadoForm {
  error?: string
}

export async function guardarPresentacion(
  _prev: EstadoForm,
  formData: FormData
): Promise<EstadoForm> {
  const supabase = await requireAdmin()

  const id = formData.get('id')
  const datos = {
    fecha: String(formData.get('fecha') ?? ''),
    lugar: String(formData.get('lugar') ?? '').trim(),
    ciudad: String(formData.get('ciudad') ?? '').trim(),
    hora: String(formData.get('hora') ?? '').trim(),
    link_entradas: String(formData.get('link_entradas') ?? '').trim() || null,
    activo: formData.get('activo') === 'on',
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha)) return { error: 'Elegí la fecha del show.' }
  if (!datos.lugar) return { error: 'El lugar es obligatorio.' }
  if (!datos.ciudad) return { error: 'La ciudad es obligatoria.' }

  const { error } = id
    ? await supabase.from('presentaciones').update(datos).eq('id', Number(id))
    : await supabase.from('presentaciones').insert(datos)

  if (error) {
    console.error('Error guardando presentación:', error)
    return { error: 'No se pudo guardar. Intentá de nuevo en un momento.' }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/presentaciones')
}

export async function eliminarPresentacion(id: number) {
  const supabase = await requireAdmin()
  const { error } = await supabase.from('presentaciones').delete().eq('id', id)
  if (error) {
    console.error('Error eliminando presentación:', error)
    return
  }
  revalidatePath('/', 'layout')
  redirect('/admin/presentaciones')
}
