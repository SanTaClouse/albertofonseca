import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Biografía',
  description: 'Conoce la historia de Alberto Fonseca, cantautor venezolano radicado en República Dominicana.',
}

// TODO: reemplazar con la biografía extendida real del artista
const BIOGRAFIA_EXTENDIDA = [
  {
    tipo: 'parrafo' as const,
    texto: 'Alberto Fonseca nació en Venezuela y construyó su voz artística entre la canción de autor, el periodismo y la literatura. Su obra refleja una búsqueda constante por la palabra precisa y la emoción contenida.',
  },
  {
    tipo: 'parrafo' as const,
    texto: 'Radicado en República Dominicana desde hace años, su trabajo musical se nutre de las tradiciones de la canción latinoamericana sin pertenecer del todo a ninguna de ellas. Hay en sus canciones algo de Silvio Rodríguez, algo de Serrat, y mucho de una voz propia que no cede a modas ni formatos.',
  },
  {
    tipo: 'imagen' as const,
    src: '/images/biografia/foto-2.jpg',
    alt: 'Alberto Fonseca en vivo',
    disponible: false,
  },
  {
    tipo: 'parrafo' as const,
    texto: 'En 2005 publicó La llave del alba, su primer álbum, que definió las coordenadas estéticas de todo lo que vendría después: letras densas, arreglos austeros, y una honestidad que incomoda de la manera justa.',
  },
  {
    tipo: 'parrafo' as const,
    texto: 'Diez años después, Amor de la historieta (2015) amplió ese universo. Más maduro, más arriesgado, el disco confirmó a Fonseca como un artista que prefiere el tiempo largo al impacto inmediato.',
  },
  {
    tipo: 'parrafo' as const,
    texto: 'Paralelamente a su carrera musical, ha ejercido el periodismo y la escritura. Sus textos — publicados en revistas y medios digitales — comparten con sus canciones la misma obsesión por el detalle y el ritmo de la frase.',
  },
  {
    tipo: 'imagen' as const,
    src: '/images/biografia/foto-3.jpg',
    alt: 'Alberto Fonseca, retrato',
    disponible: false,
  },
  {
    tipo: 'parrafo' as const,
    texto: 'En 2026 regresa con un nuevo disco. Los detalles llegarán en su momento. Hay cosas que se anuncian solas.',
  },
]

// TODO: cambiar a true cuando llegue la foto principal de /biografia
const FOTO_PRINCIPAL_DISPONIBLE = false

export default function BiografiaPage() {
  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Breadcrumb */}
        <nav className="mb-12 md:mb-16" aria-label="Navegación de retorno">
          <Link
            href="/#sobre-mi"
            className="
              font-sans text-xs uppercase tracking-widest text-text-muted
              hover:text-accent transition-colors duration-200
              inline-flex items-center gap-2
            "
          >
            <span aria-hidden="true">←</span> Volver
          </Link>
        </nav>

        {/* Encabezado */}
        <header className="mb-16 md:mb-20">
          <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
            — El artista
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-text-primary mb-6">
            Biografía
          </h1>
          <div className="w-16 h-px bg-accent" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">

          {/* Columna principal — texto de lectura */}
          <article>
            {BIOGRAFIA_EXTENDIDA.map((bloque, i) => {
              if (bloque.tipo === 'parrafo') {
                return (
                  <p
                    key={i}
                    className="
                      font-sans text-[1.0625rem] md:text-[1.1875rem]
                      text-text-secondary leading-[1.9]
                      max-w-[680px]
                      mb-6
                    "
                  >
                    {bloque.texto}
                  </p>
                )
              }

              if (bloque.tipo === 'imagen') {
                return (
                  <div key={i} className="my-12 md:my-16 max-w-[680px]">
                    {bloque.disponible ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-bg-secondary">
                        <Image
                          src={bloque.src}
                          alt={bloque.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-bg-secondary flex items-center justify-center">
                        <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
                          Foto próximamente
                        </p>
                      </div>
                    )}
                  </div>
                )
              }

              return null
            })}
          </article>

          {/* Columna lateral — foto fija */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
                {FOTO_PRINCIPAL_DISPONIBLE ? (
                  <Image
                    src="/images/biografia/foto-principal.jpg"
                    alt="Alberto Fonseca"
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-px bg-accent" />
                    <p className="font-sans text-xs uppercase tracking-widest text-text-muted text-center px-4">
                      Foto próximamente
                    </p>
                  </div>
                )}
              </div>

              {/* Separador y discografía rápida */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
                  Discografía
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="font-sans text-sm text-text-secondary">La llave del alba — 2005</li>
                  <li className="font-sans text-sm text-text-secondary">Amor de la historieta — 2015</li>
                  <li className="font-sans text-sm text-text-secondary italic text-text-muted">Nuevo álbum — 2026</li>
                </ul>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}
