import Image from 'next/image'
import Link from 'next/link'
import type { Disco } from '@/types'

interface DiscoCardProps {
  disco: Disco
}

export default function DiscoCard({ disco }: DiscoCardProps) {
  if (disco.proximamente) {
    return (
      <div className="bg-bg-secondary">
        {/* Placeholder portada */}
        <div className="aspect-square bg-bg-card flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-px bg-accent" />
          <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
            Próximamente
          </p>
        </div>
        <div className="p-6">
          <p className="font-sans text-xs text-accent uppercase tracking-widest mb-2">
            {disco.año}
          </p>
          <h3 className="font-serif text-xl text-text-muted italic">
            {disco.titulo || 'Nuevo álbum'}
          </h3>
          <p className="font-sans text-sm text-text-muted mt-2">
            {disco.descripcion}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/discografia/${disco.slug}`} className="group block bg-bg-secondary transition-all duration-300 hover:bg-bg-card">
      {/* Portada */}
      <div className="aspect-square overflow-hidden bg-bg-card">
        {disco.portada ? (
          <Image
            src={disco.portada}
            alt={`Portada de ${disco.titulo}`}
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-px bg-accent" />
            <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
              Sin portada
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="font-sans text-xs text-accent uppercase tracking-widest mb-2">
          {disco.año}
        </p>
        <h3 className="font-serif text-xl text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
          {disco.titulo}
        </h3>
        {disco.canciones && (
          <p className="font-sans text-sm text-text-secondary">
            {disco.canciones} canciones
          </p>
        )}
      </div>
    </Link>
  )
}
