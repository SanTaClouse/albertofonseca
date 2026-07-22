import Link from 'next/link'
import type { ArtistaInfo } from '@/types'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Discografía', href: '/#discografia' },
  { label: 'Videos', href: '/#videos' },
  { label: 'Presentaciones', href: '/#presentaciones' },
  { label: 'Escritos', href: '/escritos' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Footer({ artista }: { artista: ArtistaInfo }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Columna izquierda — nombre y descripción */}
          <div className="max-w-xs">
            <p className="font-serif text-2xl text-text-primary mb-2">
              {artista.nombre}
            </p>
            <p className="font-sans text-sm text-text-secondary">
              {artista.descripcion}
            </p>
          </div>

          {/* Columna central — navegación */}
          <nav aria-label="Navegación del footer">
            <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
              Secciones
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      font-sans text-sm text-text-secondary
                      hover:text-text-primary hover:border-b hover:border-accent
                      transition-colors duration-200
                      pb-0.5 border-b border-transparent
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna derecha — redes sociales */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
              Redes
            </p>
            <ul className="flex flex-col gap-3">
              {artista.instagram && (
                <li>
                  <a
                    href={artista.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {artista.facebook && (
                <li>
                  <a
                    href={artista.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {artista.youtube && (
                <li>
                  <a
                    href={artista.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {artista.spotify && (
                <li>
                  <a
                    href={artista.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    Spotify
                  </a>
                </li>
              )}
              {artista.email && (
                <li>
                  <a
                    href={`mailto:${artista.email}`}
                    className="font-sans text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Separador */}
        <div className="w-full h-px bg-border mt-12 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-sans text-xs text-text-muted">
            © {year} {artista.nombre}. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-text-muted">
            República Dominicana
          </p>
        </div>

      </div>
    </footer>
  )
}
