import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import { ARTISTA, VIDEOS_DESTACADOS } from '@/lib/constants'

export default function VideosSection() {
  const videosConId = VIDEOS_DESTACADOS.filter((v) => v.youtubeId)

  return (
    <section id="videos" className="bg-bg-primary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeInSection>
          <SectionHeader subtitulo="En escena" titulo="Videos" />
        </FadeInSection>

        {videosConId.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videosConId.map((video, i) => (
              <FadeInSection key={video.youtubeId} delay={i === 0 ? 0 : i === 1 ? 100 : 200}>
                <div className="flex flex-col gap-3">
                  <YouTubeEmbed videoId={video.youtubeId} titulo={video.titulo} />
                  {video.titulo && (
                    <p className="font-sans text-sm text-text-secondary">
                      {video.titulo}
                    </p>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        ) : (
          // Placeholder mientras se confirman los videos
          <FadeInSection>
            <div className="flex flex-col items-center gap-6 py-16 border border-border">
              <div className="w-16 h-px bg-accent" />
              <p className="font-sans text-sm text-text-muted uppercase tracking-widest">
                Videos próximamente
              </p>
              {ARTISTA.youtube && (
                <a
                  href={ARTISTA.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    font-sans text-sm text-text-secondary uppercase tracking-widest
                    border-b border-transparent pb-0.5
                    hover:text-accent hover:border-accent
                    transition-all duration-200
                  "
                >
                  Ver canal de YouTube
                </a>
              )}
            </div>
          </FadeInSection>
        )}

      </div>
    </section>
  )
}
