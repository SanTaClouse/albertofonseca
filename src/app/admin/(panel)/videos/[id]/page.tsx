import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { VideoRow } from '@/types/db'
import { TituloPagina } from '../../../_components/ui'
import BotonEliminar from '../../../_components/BotonEliminar'
import VideoForm from '../VideoForm'
import { eliminarVideo } from '../actions'

export default async function EditarVideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('id', Number(id))
    .single()

  if (!data) notFound()
  const video = data as VideoRow

  const eliminarConId = eliminarVideo.bind(null, video.id)

  return (
    <div>
      <TituloPagina
        titulo="Editar video"
        accion={
          <BotonEliminar action={eliminarConId} nombre={video.titulo || video.youtube_id} />
        }
      />
      <VideoForm video={video} />
    </div>
  )
}
