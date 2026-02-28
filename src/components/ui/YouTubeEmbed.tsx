'use client'

import { useInView } from '@/hooks/useInView'

interface YouTubeEmbedProps {
  videoId: string
  titulo: string
}

export default function YouTubeEmbed({ videoId, titulo }: YouTubeEmbedProps) {
  const { ref, inView } = useInView(0.1)

  return (
    <div ref={ref} className="aspect-video bg-bg-secondary overflow-hidden">
      {inView && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={titulo}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
