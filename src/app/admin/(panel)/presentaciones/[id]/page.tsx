import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { PresentacionRow } from '@/types/db'
import { TituloPagina } from '../../../_components/ui'
import BotonEliminar from '../../../_components/BotonEliminar'
import PresentacionForm from '../PresentacionForm'
import { eliminarPresentacion } from '../actions'

export default async function EditarPresentacionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('presentaciones')
    .select('*')
    .eq('id', Number(id))
    .single()

  if (!data) notFound()
  const presentacion = data as PresentacionRow

  const eliminarConId = eliminarPresentacion.bind(null, presentacion.id)

  return (
    <div>
      <TituloPagina
        titulo="Editar presentación"
        accion={
          <BotonEliminar
            action={eliminarConId}
            nombre={`${presentacion.lugar} — ${presentacion.fecha}`}
          />
        }
      />
      <PresentacionForm presentacion={presentacion} />
    </div>
  )
}
