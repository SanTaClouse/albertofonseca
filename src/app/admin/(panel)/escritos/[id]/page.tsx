import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { EscritoRow } from '@/types/db'
import { TituloPagina } from '../../../_components/ui'
import BotonEliminar from '../../../_components/BotonEliminar'
import EscritoForm from '../EscritoForm'
import { eliminarEscrito } from '../actions'

export default async function EditarEscritoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('escritos')
    .select('*')
    .eq('id', Number(id))
    .single()

  if (!data) notFound()
  const escrito = data as EscritoRow

  const eliminarConId = eliminarEscrito.bind(null, escrito.id)

  return (
    <div>
      <TituloPagina
        titulo="Editar escrito"
        accion={<BotonEliminar action={eliminarConId} nombre={escrito.titulo} />}
      />
      <EscritoForm escrito={escrito} />
    </div>
  )
}
