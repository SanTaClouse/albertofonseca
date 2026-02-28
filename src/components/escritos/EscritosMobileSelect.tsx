import type { Escrito } from '@/types'

interface EscritosMobileSelectProps {
  escritos: Escrito[]
  seleccionadoId: number
  onSeleccionar: (id: number) => void
}

export default function EscritosMobileSelect({ escritos, seleccionadoId, onSeleccionar }: EscritosMobileSelectProps) {
  return (
    <div className="lg:hidden mb-8">
      <label htmlFor="escritos-select" className="font-sans text-xs uppercase tracking-widest text-accent block mb-2">
        Seleccionar escrito
      </label>
      <select
        id="escritos-select"
        value={seleccionadoId}
        onChange={(e) => onSeleccionar(Number(e.target.value))}
        className="
          w-full bg-bg-secondary border border-border
          font-sans text-sm text-text-primary
          px-4 py-3
          focus:outline-none focus:border-accent
          transition-colors duration-200
        "
      >
        {escritos.map((escrito) => (
          <option key={escrito.id} value={escrito.id}>
            {escrito.titulo}
          </option>
        ))}
      </select>
    </div>
  )
}
