'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ARTISTA } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Discografía', href: '/#discografia' },
  { label: 'Videos', href: '/#videos' },
  { label: 'Presentaciones', href: '/#presentaciones' },
  { label: 'Escritos', href: '/escritos' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'bg-bg-secondary/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'}
        `}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-lg text-text-primary hover:text-accent transition-colors duration-200"
          >
            {ARTISTA.nombre}
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    font-sans text-sm uppercase tracking-widest
                    text-text-secondary
                    hover:text-accent
                    transition-colors duration-200
                    pb-0.5 border-b border-transparent hover:border-accent
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              className={`block h-px bg-text-primary transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`block h-px bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px bg-text-primary transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>

        </nav>
      </header>

      {/* Menú full screen (mobile) */}
      <div
        className={`
          fixed inset-0 z-40 bg-bg-primary
          flex flex-col items-center justify-center
          transition-all duration-300
          md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  font-serif text-3xl text-text-primary
                  hover:text-accent
                  transition-colors duration-200
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
