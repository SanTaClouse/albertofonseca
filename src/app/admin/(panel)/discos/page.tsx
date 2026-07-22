import Link from 'next/link'
/* eslint-disable @next/next/no-img-element -- miniaturas del admin */
import { createClient } from '@/lib/supabase/server'
import type { DiscoRow } from '@/types/db'
import { Badge, TituloPagina } from '../../_components/ui'

export default async function DiscosAdminPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('discos')
    .select('*')
    .order('orden', { ascending: true })

  const discos = (data ?? []) as DiscoRow[]

  return (
    <div>
      <TituloPagina
        titulo="Discos"
        accion={
          <Link
            href="/admin/discos/nuevo"
            className="
              bg-accent text-bg-primary px-6 py-2.5
              font-sans text-xs uppercase tracking-widest
              hover:bg-accent-hover transition-colors duration-200
            "
          >
            + Nuevo disco
          </Link>
        }
      />

      {discos.length === 0 ? (
        <p className="font-sans text-base text-text-muted py-12 text-center border border-border">
          Todavía no hay discos cargados.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {discos.map((disco) => (
            <li key={disco.id}>
              <Link
                href={`/admin/discos/${disco.id}`}
                className="group flex items-center gap-6 py-4 px-2 hover:bg-bg-secondary transition-colors duration-200"
              >
                <div className="w-16 h-16 bg-bg-secondary border border-border shrink-0 overflow-hidden">
                  {disco.portada_url && (
                    <img
                      src={disco.portada_url}
                      alt={`Tapa de ${disco.titulo}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors duration-200 truncate">
                    {disco.titulo}
                  </p>
                  <p className="font-sans text-sm text-text-muted">
                    {disco.anio}
                    {disco.canciones ? ` · ${disco.canciones} canciones` : ''}
                    {disco.proximamente ? ' · Próximamente' : ''}
                  </p>
                </div>
                <Badge activo={disco.activo} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
