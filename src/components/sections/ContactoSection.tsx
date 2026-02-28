import FadeInSection from '@/components/ui/FadeInSection'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/ui/ContactForm'
import { ARTISTA } from '@/lib/constants'

export default function ContactoSection() {
  return (
    <section id="contacto" className="bg-bg-secondary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Columna izquierda — intro */}
          <FadeInSection>
            <SectionHeader subtitulo="Escribir" titulo="Contacto" />

            <p className="font-sans text-base md:text-lg text-text-secondary leading-[1.8] mb-8 max-w-sm">
              Para presentaciones, entrevistas, colaboraciones o cualquier consulta.
            </p>

            {/* Info de contacto directo */}
            <div className="flex flex-col gap-4">
              {ARTISTA.email && (
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${ARTISTA.email}`}
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {ARTISTA.email}
                  </a>
                </div>
              )}

              {ARTISTA.whatsapp && (
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                    WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/${ARTISTA.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {ARTISTA.whatsapp}
                  </a>
                </div>
              )}

              {/* Redes sociales */}
              <div className="flex gap-6 mt-4">
                {ARTISTA.instagram && (
                  <a
                    href={ARTISTA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    Instagram
                  </a>
                )}
                {ARTISTA.youtube && (
                  <a
                    href={ARTISTA.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    YouTube
                  </a>
                )}
                {ARTISTA.spotify && (
                  <a
                    href={ARTISTA.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-200"
                  >
                    Spotify
                  </a>
                )}
              </div>
            </div>
          </FadeInSection>

          {/* Columna derecha — formulario */}
          <FadeInSection delay={200}>
            <ContactForm />
          </FadeInSection>

        </div>
      </div>
    </section>
  )
}
