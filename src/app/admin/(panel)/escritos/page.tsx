import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatFechaMes } from '@/lib/utils'
import type { EscritoRow } from '@/types/db'
import { Badge, TituloPagina } from '../../_components/ui'

export default async function EscritosAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('escritos')
    .select('*')
    .order('fecha', { ascending: false })
    .order('id', { ascending: false })

  const escritos = (data ?? []) as EscritoRow[]

  return (
    <div>
      <TituloPagina
        titulo="Escritos"
        accion={
          <Link
            href="/admin/escritos/nuevo"
            className="
              bg-accent text-bg-primary px-6 py-2.5
              font-sans text-xs uppercase tracking-widest
              hover:bg-accent-hover transition-colors duration-200
            "
          >
            + Nuevo escrito
          </Link>
        }
      />

      {escritos.length === 0 ? (
        <p className="font-sans text-base text-text-muted py-12 text-center border border-border">
          Todavía no hay escritos. Creá el primero con el botón de arriba.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {escritos.map((escrito) => (
            <li key={escrito.id}>
              <Link
                href={`/admin/escritos/${escrito.id}`}
                className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5 px-2 hover:bg-bg-secondary transition-colors duration-200"
              >
                <span className="font-sans text-sm text-text-muted tabular-nums w-32 shrink-0">
                  {formatFechaMes(escrito.fecha)}
                </span>
                <span className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-200 flex-1 min-w-40">
                  {escrito.titulo || 'Sin título'}
                </span>
                <Badge activo={escrito.activo} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
