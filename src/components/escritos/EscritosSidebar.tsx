import type { Escrito } from '@/types'
import { formatFechaMes } from '@/lib/utils'

interface EscritosSidebarProps {
  escritos: Escrito[]
  seleccionadoId: number
  onSeleccionar: (id: number) => void
}

export default function EscritosSidebar({ escritos, seleccionadoId, onSeleccionar }: EscritosSidebarProps) {
  return (
    <nav aria-label="Lista de escritos" className="flex flex-col">
      <p className="font-sans text-xs uppercase tracking-widest text-accent mb-6 px-4">
        Todos los escritos
      </p>
      <ul className="flex flex-col">
        {escritos.map((escrito) => {
          const activo = escrito.id === seleccionadoId
          return (
            <li key={escrito.id}>
              <button
                onClick={() => onSeleccionar(escrito.id)}
                className={`
                  w-full text-left px-4 py-4
                  border-l-2 transition-all duration-200
                  flex flex-col gap-1
                  ${activo
                    ? 'border-accent bg-accent-subtle'
                    : 'border-transparent hover:border-border-light hover:bg-bg-secondary'
                  }
                `}
              >
                <span className={`font-sans text-sm leading-snug ${activo ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {escrito.titulo}
                </span>
                <span className="font-sans text-xs text-text-muted">
                  {formatFechaMes(escrito.fecha)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
