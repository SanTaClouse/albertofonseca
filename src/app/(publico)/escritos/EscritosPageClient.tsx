'use client'

import { useState } from 'react'
import type { Escrito } from '@/types'
import EscritosSidebar from '@/components/escritos/EscritosSidebar'
import EscritoContenido from '@/components/escritos/EscritoContenido'
import EscritosMobileSelect from '@/components/escritos/EscritosMobileSelect'

interface EscritosPageClientProps {
  escritos: Escrito[]
}

export default function EscritosPageClient({ escritos }: EscritosPageClientProps) {
  const [seleccionadoId, setSeleccionadoId] = useState(escritos[0]?.id ?? 0)
  const escrito = escritos.find((e) => e.id === seleccionadoId) ?? escritos[0]

  if (escritos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-12 h-px bg-accent" />
        <p className="font-sans text-sm text-text-muted uppercase tracking-widest">
          No hay escritos disponibles
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-[70vh]">

      {/* Sidebar — fijo 280px en desktop */}
      <aside className="hidden lg:block w-[280px] shrink-0 border-r border-border sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <EscritosSidebar
          escritos={escritos}
          seleccionadoId={seleccionadoId}
          onSeleccionar={setSeleccionadoId}
        />
      </aside>

      {/* Contenido */}
      <div className="flex-1 min-w-0 px-0 lg:px-12 xl:px-16 py-2">
        {/* Select mobile */}
        <EscritosMobileSelect
          escritos={escritos}
          seleccionadoId={seleccionadoId}
          onSeleccionar={setSeleccionadoId}
        />

        {/* Transición suave al cambiar de escrito */}
        <div
          key={seleccionadoId}
          className="animate-[fadeIn_0.25s_ease-in-out]"
        >
          {escrito && <EscritoContenido escrito={escrito} />}
        </div>
      </div>

    </div>
  )
}
