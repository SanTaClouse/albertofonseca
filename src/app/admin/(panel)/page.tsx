import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TituloPagina } from '../_components/ui'

const SECCIONES = [
  { tabla: 'escritos', label: 'Escritos', href: '/admin/escritos', descripcion: 'Textos y reflexiones' },
  { tabla: 'discos', label: 'Discos', href: '/admin/discos', descripcion: 'Álbumes con tapa y Spotify' },
  { tabla: 'presentaciones', label: 'Presentaciones', href: '/admin/presentaciones', descripcion: 'Fechas y lugares de shows' },
  { tabla: 'videos', label: 'Videos', href: '/admin/videos', descripcion: 'Videos destacados de YouTube' },
] as const

export default async function AdminDashboard() {
  const supabase = await createClient()

  const conteos = await Promise.all(
    SECCIONES.map(async ({ tabla }) => {
      const { count } = await supabase
        .from(tabla)
        .select('*', { count: 'exact', head: true })
      return count ?? 0
    })
  )

  return (
    <div>
      <TituloPagina titulo="Panel de administración" />

      <p className="font-sans text-base text-text-secondary mb-10 max-w-xl leading-relaxed">
        Desde acá se maneja todo el contenido de la web. Los cambios se
        publican al instante al guardar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SECCIONES.map((seccion, i) => (
          <Link
            key={seccion.href}
            href={seccion.href}
            className="
              group border border-border bg-bg-secondary p-6
              hover:border-accent transition-colors duration-200
            "
          >
            <p className="font-serif text-4xl text-accent mb-3">{conteos[i]}</p>
            <p className="font-serif text-xl text-text-primary group-hover:text-accent transition-colors duration-200">
              {seccion.label}
            </p>
            <p className="font-sans text-sm text-text-muted mt-1">
              {seccion.descripcion}
            </p>
          </Link>
        ))}

        <Link
          href="/admin/textos"
          className="
            group border border-border bg-bg-secondary p-6 sm:col-span-2
            hover:border-accent transition-colors duration-200
          "
        >
          <p className="font-serif text-xl text-text-primary group-hover:text-accent transition-colors duration-200">
            Textos del sitio
          </p>
          <p className="font-sans text-sm text-text-muted mt-1">
            Tagline, sobre mí, contacto y redes sociales
          </p>
        </Link>
      </div>
    </div>
  )
}
