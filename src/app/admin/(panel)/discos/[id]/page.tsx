import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { DiscoRow } from '@/types/db'
import { TituloPagina } from '../../../_components/ui'
import BotonEliminar from '../../../_components/BotonEliminar'
import DiscoForm from '../DiscoForm'
import { eliminarDisco } from '../actions'

export default async function EditarDiscoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('discos').select('*').eq('id', id).single()

  if (!data) notFound()
  const disco = data as DiscoRow

  const eliminarConId = eliminarDisco.bind(null, disco.id)

  return (
    <div>
      <TituloPagina
        titulo="Editar disco"
        accion={<BotonEliminar action={eliminarConId} nombre={disco.titulo} />}
      />
      <DiscoForm disco={disco} />
    </div>
  )
}
