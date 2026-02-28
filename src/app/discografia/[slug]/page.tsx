import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SpotifyEmbed from '@/components/discografia/SpotifyEmbed'
import { DISCOS } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return DISCOS.map((disco) => ({ slug: disco.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const disco = DISCOS.find((d) => d.slug === slug)
  if (!disco) return {}
  return {
    title: disco.titulo || 'Próximamente',
    description: disco.descripcion || `Álbum de Alberto Fonseca — ${disco.año}`,
  }
}

export default async function DiscoPage({ params }: Props) {
  const { slug } = await params
  const disco = DISCOS.find((d) => d.slug === slug)
  if (!disco) notFound()

  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Breadcrumb */}
        <nav className="mb-12 md:mb-16" aria-label="Navegación de retorno">
          <Link
            href="/#discografia"
            className="
              font-sans text-xs uppercase tracking-widest text-text-muted
              hover:text-accent transition-colors duration-200
              inline-flex items-center gap-2
            "
          >
            <span aria-hidden="true">←</span> Discografía
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Portada */}
          <div className="relative aspect-square overflow-hidden bg-bg-secondary max-w-md mx-auto w-full lg:mx-0">
            {disco.portada ? (
              <Image
                src={disco.portada}
                alt={`Portada de ${disco.titulo}`}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-px bg-accent" />
                <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
                  {disco.proximamente ? 'Próximamente' : 'Sin portada'}
                </p>
              </div>
            )}
          </div>

          {/* Info + Spotify */}
          <div className="flex flex-col gap-8">

            {/* Encabezado */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
                — {disco.año}{disco.canciones ? ` · ${disco.canciones} canciones` : ''}
              </p>
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-text-primary mb-4">
                {disco.titulo || 'Nuevo álbum'}
              </h1>
              <div className="w-12 h-px bg-accent" />
            </div>

            {/* Descripción */}
            {disco.descripcion && (
              <p className="font-sans text-base md:text-lg text-text-secondary leading-[1.8] max-w-lg">
                {disco.descripcion}
              </p>
            )}

            {/* Spotify embed */}
            {disco.spotifyEmbedId ? (
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
                  Escuchar en Spotify
                </p>
                <SpotifyEmbed albumId={disco.spotifyEmbedId} titulo={disco.titulo} />
              </div>
            ) : !disco.proximamente && (
              <p className="font-sans text-sm text-text-muted italic">
                Enlace de Spotify próximamente.
              </p>
            )}

          </div>
        </div>

        {/* Separador y navegación entre discos */}
        <div className="mt-20 md:mt-28 pt-8 border-t border-border">
          <p className="font-sans text-xs uppercase tracking-widest text-accent mb-6">
            Más discos
          </p>
          <div className="flex flex-wrap gap-6">
            {DISCOS.filter((d) => d.slug !== slug).map((d) => (
              <Link
                key={d.slug}
                href={`/discografia/${d.slug}`}
                className="
                  font-sans text-sm text-text-secondary
                  border-b border-transparent pb-0.5
                  hover:text-text-primary hover:border-accent
                  transition-all duration-200
                "
              >
                {d.titulo || 'Nuevo álbum'} — {d.año}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
