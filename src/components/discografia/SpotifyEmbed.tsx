'use client'

import { useInView } from '@/hooks/useInView'

interface SpotifyEmbedProps {
  albumId: string
  titulo: string
}

export default function SpotifyEmbed({ albumId, titulo }: SpotifyEmbedProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-sm bg-bg-secondary" style={{ height: 352 }}>
      {inView && (
        <iframe
          src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Escuchar ${titulo} en Spotify`}
          className="border-0"
        />
      )}
    </div>
  )
}
