import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import PresentacionRow from '@/components/presentaciones/PresentacionRow'
import type { Presentacion } from '@/types'

interface PresentacionesSectionProps {
  presentaciones: Presentacion[]
}

export default function PresentacionesSection({ presentaciones }: PresentacionesSectionProps) {
  // Solo mostrar presentaciones futuras o de hoy
  const hoy = new Date().toISOString().split('T')[0]
  const proximas = presentaciones.filter((p) => p.fecha >= hoy)

  return (
    <section id="presentaciones" className="bg-bg-secondary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeInSection>
          <SectionHeader subtitulo="En vivo" titulo="Presentaciones" />
        </FadeInSection>

        <FadeInSection delay={100}>
          {proximas.length > 0 ? (
            <div className="border-t border-border">
              {proximas.map((p) => (
                <PresentacionRow key={`${p.fecha}-${p.lugar}`} presentacion={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 py-12 border-t border-border">
              <p className="font-sans text-base text-text-secondary">
                No hay presentaciones programadas por el momento.
              </p>
              <p className="font-sans text-sm text-text-muted">
                Sigue las redes sociales para estar al tanto de las próximas fechas.
              </p>
            </div>
          )}
        </FadeInSection>

      </div>
    </section>
  )
}
