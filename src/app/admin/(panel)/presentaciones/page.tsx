import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatFechaCorta } from '@/lib/utils'
import type { PresentacionRow } from '@/types/db'
import { Badge, TituloPagina } from '../../_components/ui'

export default async function PresentacionesAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('presentaciones')
    .select('*')
    .order('fecha', { ascending: false })

  const presentaciones = (data ?? []) as PresentacionRow[]
  const hoy = new Date().toISOString().slice(0, 10)

  return (
    <div>
      <TituloPagina
        titulo="Presentaciones"
        accion={
          <Link
            href="/admin/presentaciones/nueva"
            className="
              bg-accent text-bg-primary px-6 py-2.5
              font-sans text-xs uppercase tracking-widest
              hover:bg-accent-hover transition-colors duration-200
            "
          >
            + Nueva presentación
          </Link>
        }
      />

      {presentaciones.length === 0 ? (
        <p className="font-sans text-base text-text-muted py-12 text-center border border-border">
          Todavía no hay presentaciones cargadas.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {presentaciones.map((p) => {
            const pasada = p.fecha < hoy
            return (
              <li key={p.id}>
                <Link
                  href={`/admin/presentaciones/${p.id}`}
                  className={`
                    group flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5 px-2
                    hover:bg-bg-secondary transition-colors duration-200
                    ${pasada ? 'opacity-50' : ''}
                  `}
                >
                  <span className="font-sans text-sm text-text-muted tabular-nums w-28 shrink-0">
                    {formatFechaCorta(p.fecha)}
                  </span>
                  <span className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-200 flex-1 min-w-40">
                    {p.lugar}
                    <span className="font-sans text-sm text-text-muted ml-3">
                      {p.ciudad}{p.hora ? ` · ${p.hora}` : ''}
                    </span>
                  </span>
                  {pasada && (
                    <span className="font-sans text-[0.65rem] uppercase tracking-widest text-text-muted">
                      Pasada
                    </span>
                  )}
                  <Badge activo={p.activo} />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
