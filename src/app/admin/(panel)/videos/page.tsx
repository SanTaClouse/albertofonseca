import Link from 'next/link'
/* eslint-disable @next/next/no-img-element -- miniaturas de YouTube */
import { createClient } from '@/lib/supabase/server'
import type { VideoRow } from '@/types/db'
import { Badge, TituloPagina } from '../../_components/ui'

export default async function VideosAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('videos')
    .select('*')
    .order('orden', { ascending: true })

  const videos = (data ?? []) as VideoRow[]

  return (
    <div>
      <TituloPagina
        titulo="Videos destacados"
        accion={
          <Link
            href="/admin/videos/nuevo"
            className="
              bg-accent text-bg-primary px-6 py-2.5
              font-sans text-xs uppercase tracking-widest
              hover:bg-accent-hover transition-colors duration-200
            "
          >
            + Nuevo video
          </Link>
        }
      />

      {videos.length === 0 ? (
        <p className="font-sans text-base text-text-muted py-12 text-center border border-border">
          Todavía no hay videos cargados.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {videos.map((video) => (
            <li key={video.id}>
              <Link
                href={`/admin/videos/${video.id}`}
                className="group flex items-center gap-6 py-4 px-2 hover:bg-bg-secondary transition-colors duration-200"
              >
                <div className="w-24 aspect-video bg-bg-secondary border border-border shrink-0 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                    alt={video.titulo || 'Video de YouTube'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-200 flex-1 min-w-0 truncate">
                  {video.titulo || video.youtube_id}
                </p>
                <Badge activo={video.activo} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
