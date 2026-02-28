import DiscoCard from '@/components/discografia/DiscoCard'
import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import { DISCOS } from '@/lib/constants'

export default function DiscografiaSection() {
  return (
    <section id="discografia" className="bg-bg-secondary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <FadeInSection>
          <SectionHeader subtitulo="Obra musical" titulo="Discografía" />
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISCOS.map((disco, i) => (
            <FadeInSection key={disco.slug} delay={i === 0 ? 0 : i === 1 ? 100 : 200}>
              <DiscoCard disco={disco} />
            </FadeInSection>
          ))}
        </div>

      </div>
    </section>
  )
}
