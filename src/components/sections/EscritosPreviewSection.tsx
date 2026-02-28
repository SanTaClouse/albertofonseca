import Link from 'next/link'
import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Escrito } from '@/types'
import { formatFechaMes } from '@/lib/utils'

interface EscritosPreviewSectionProps {
  escritos: Escrito[]
}

export default function EscritosPreviewSection({ escritos }: EscritosPreviewSectionProps) {
  return (
    <section id="escritos-preview" className="bg-bg-primary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
            <SectionHeader subtitulo="Textos" titulo="Escritos" />
            <Link
              href="/escritos"
              className="
                font-sans text-sm uppercase tracking-widest text-text-secondary
                border-b border-transparent pb-0.5
                hover:text-accent hover:border-accent
                transition-all duration-200
                self-start sm:self-auto mb-12 sm:mb-0
              "
            >
              Ver todos
            </Link>
          </div>
        </FadeInSection>

        {escritos.length > 0 ? (
          <div className="flex flex-col divide-y divide-border">
            {escritos.map((escrito, i) => (
              <FadeInSection key={escrito.id} delay={i === 0 ? 0 : i === 1 ? 100 : 200}>
                <Link
                  href="/escritos"
                  className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 py-8 hover:bg-transparent"
                >
                  <p className="font-sans text-sm text-text-muted tabular-nums shrink-0 md:w-28">
                    {formatFechaMes(escrito.fecha)}
                  </p>
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="font-serif text-xl md:text-2xl text-text-primary group-hover:text-accent transition-colors duration-200">
                      {escrito.titulo}
                    </h3>
                    {escrito.extracto && (
                      <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-2">
                        {escrito.extracto}
                      </p>
                    )}
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        ) : (
          <FadeInSection>
            <div className="flex flex-col items-start gap-4 py-12 border-t border-border">
              <p className="font-sans text-base text-text-secondary">
                Los escritos se cargarán desde Google Sheets una vez configurado.
              </p>
              <Link
                href="/escritos"
                className="font-sans text-sm uppercase tracking-widest text-accent border-b border-accent pb-0.5 hover:text-accent-hover transition-colors duration-200"
              >
                Ir a escritos
              </Link>
            </div>
          </FadeInSection>
        )}

      </div>
    </section>
  )
}
