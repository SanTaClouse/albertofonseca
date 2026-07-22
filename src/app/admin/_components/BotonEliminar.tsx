'use client'

import { useTransition } from 'react'

/**
 * Botón de borrado con confirmación. Recibe una server action ya ligada
 * al id del registro (con .bind) desde el componente servidor.
 */
export default function BotonEliminar({
  action,
  nombre,
}: {
  action: () => Promise<void>
  nombre: string
}) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
          startTransition(async () => {
            await action()
          })
        }
      }}
      className="
        font-sans text-sm uppercase tracking-widest text-red-400/80
        border-b border-transparent pb-0.5
        hover:text-red-400 hover:border-red-400
        transition-all duration-200
        disabled:opacity-50 cursor-pointer
      "
    >
      {pending ? 'Eliminando…' : 'Eliminar'}
    </button>
  )
}
