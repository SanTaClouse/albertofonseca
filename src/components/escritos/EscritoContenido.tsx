import Image from 'next/image'
import type { Escrito } from '@/types'
import { formatFechaMes } from '@/lib/utils'
import TextoFormateado from '@/components/ui/TextoFormateado'

interface EscritoContenidoProps {
  escrito: Escrito
}

export default function EscritoContenido({ escrito }: EscritoContenidoProps) {
  return (
    <article className="min-h-[60vh]">
      {/* Encabezado */}
      <header className="mb-10 md:mb-12">
        <p className="font-sans text-sm text-text-muted mb-4">
          {formatFechaMes(escrito.fecha)}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary leading-[1.2] mb-6">
          {escrito.titulo}
        </h1>
        <div className="w-12 h-px bg-accent" />
      </header>

      {/* Imagen de portada */}
      {escrito.imagen_url && (
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-secondary mb-10">
          <Image
            src={escrito.imagen_url}
            alt={escrito.titulo}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Cuerpo */}
      <TextoFormateado
        texto={escrito.contenido ?? ''}
        className="flex flex-col gap-5 max-w-[680px]"
        parrafoClassName="font-sans text-[1.0625rem] md:text-[1.1875rem] text-text-secondary leading-[1.9]"
      />
    </article>
  )
}
