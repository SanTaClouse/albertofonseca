import type { Presentacion } from '@/types'
import { formatFechaCorta } from '@/lib/utils'

interface PresentacionRowProps {
  presentacion: Presentacion
}

export default function PresentacionRow({ presentacion }: PresentacionRowProps) {
  return (
    <div className="
      grid grid-cols-[auto_1fr_auto] md:grid-cols-[160px_1fr_1fr_auto] items-center
      gap-x-6 gap-y-1
      py-5 border-b border-border
      group
    ">
      {/* Fecha */}
      <p className="font-sans text-sm text-text-muted tabular-nums">
        {formatFechaCorta(presentacion.fecha)}
      </p>

      {/* Lugar */}
      <div className="min-w-0">
        <p className="font-serif text-base md:text-lg text-text-primary truncate">
          {presentacion.lugar}
        </p>
        <p className="font-sans text-sm text-text-secondary md:hidden">
          {presentacion.ciudad}
        </p>
      </div>

      {/* Ciudad — solo desktop */}
      <p className="hidden md:block font-sans text-sm text-text-secondary">
        {presentacion.ciudad}
      </p>

      {/* Hora + link de entradas */}
      <div className="flex flex-col items-end gap-1">
        {presentacion.hora && (
          <p className="font-sans text-sm text-text-muted tabular-nums">
            {presentacion.hora}
          </p>
        )}
        {presentacion.link_entradas && (
          <a
            href={presentacion.link_entradas}
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-sans text-xs uppercase tracking-widest text-accent
              border-b border-accent
              hover:text-accent-hover hover:border-accent-hover
              transition-colors duration-200
              pb-0.5
            "
          >
            Entradas
          </a>
        )}
      </div>
    </div>
  )
}
