import Image from 'next/image'
import Link from 'next/link'
import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import TextoFormateado from '@/components/ui/TextoFormateado'

// Respaldo si la config de Supabase todavía no tiene texto de "sobre mí"
const BIO_CORTA =
  'Alberto Fonseca es un cantautor, escritor y periodista venezolano radicado en República Dominicana. Su obra transita entre la canción de autor y la literatura, construyendo un universo propio donde la palabra es el centro.\n\nCon más de dos décadas de trayectoria, ha publicado dos álbumes — La llave del alba (2005) y Amor de la historieta (2015) — que lo posicionan como una voz íntima y singular en el panorama musical latinoamericano.'

// TODO: reemplazar con foto real en /public/images/sobre-mi/
const FOTO_SOBRE_MI = '/images/sobre-mi/foto.jpg'
const FOTO_DISPONIBLE = true

export default function SobreMiSection({ sobreMi }: { sobreMi?: string }) {
  const bio = sobreMi?.trim() ? sobreMi : BIO_CORTA
  return (
    <section
      id="sobre-mi"
      className="bg-bg-primary py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Columna izquierda — texto */}
          <FadeInSection>
            <SectionHeader subtitulo="El artista" titulo="Sobre mí" />

            {/* Línea decorativa dorada + párrafos */}
            <div className="flex gap-6">
              <div className="w-px bg-accent self-stretch shrink-0" />
              <TextoFormateado
                texto={bio}
                className="flex flex-col gap-5"
                parrafoClassName="font-sans text-base md:text-lg text-text-secondary leading-[1.8]"
              />
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/biografia"
                className="
                  text-text-secondary
                  font-sans text-sm uppercase tracking-widest
                  border-b border-transparent
                  transition-all duration-200
                  hover:text-text-primary hover:border-accent
                  pb-1
                "
              >
                Leer biografía completa
              </Link>
            </div>
          </FadeInSection>

          {/* Columna derecha — foto */}
          <FadeInSection delay={200}>
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 lg:ml-auto overflow-hidden bg-bg-secondary">
              {FOTO_DISPONIBLE ? (
                <Image
                  src={FOTO_SOBRE_MI}
                  alt="Alberto Fonseca"
                  fill
                  className="object-cover object-top"
                />
              ) : (
                // Placeholder hasta que llegue la foto
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-px bg-accent" />
                  <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
                    Foto próximamente
                  </p>
                </div>
              )}
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
