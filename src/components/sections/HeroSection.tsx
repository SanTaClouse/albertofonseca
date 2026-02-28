import Image from 'next/image'
import Link from 'next/link'
import { ARTISTA } from '@/lib/constants'

/**
 * VARIANTE ACTIVA:
 * - 'A' → Foto horizontal a pantalla completa con overlay de gradiente
 * - 'B' → Split layout (foto izquierda / texto derecha)
 *
 * Cambiar a 'A' o 'B' cuando lleguen las fotos del artista.
 * Ver DISEÑO.md → "Hero Section — Especificaciones"
 */
const VARIANTE: 'A' | 'B' | 'placeholder' = 'A'

// ─────────────────────────────────────────────
// Variante A — Foto full screen con overlay
// ─────────────────────────────────────────────

function HeroVarianteA() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Foto de fondo */}
      <Image
        src="/images/hero/foto-principal.jpg"
        alt={ARTISTA.nombre}
        fill
        priority
        className="object-cover object-[50%_70%]"
      />

      {/* Overlay gradiente — más denso en mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary opacity-90 md:opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/30 to-transparent" />

      {/* Contenido — esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <HeroTexto />
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────
// Variante B — Split layout (retrato)
// ─────────────────────────────────────────────

function HeroVarianteB() {
  return (
    <section id="hero" className="min-h-screen flex flex-col lg:flex-row">

      {/* Foto — 60vh en mobile, 50% en desktop */}
      <div className="relative h-[60vh] lg:h-auto lg:w-1/2 lg:sticky lg:top-0 lg:min-h-screen overflow-hidden">
        <Image
          src="/images/hero/foto-principal.jpg"
          alt={ARTISTA.nombre}
          fill
          priority
          className="object-cover object-top"
        />
        {/* Gradiente inferior en mobile para transición suave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent lg:hidden" />
      </div>

      {/* Texto — sobre bg-primary */}
      <div className="lg:w-1/2 bg-bg-primary flex items-center">
        <div className="w-full px-6 md:px-12 lg:px-16 py-16 lg:py-0">
          <HeroTexto />
        </div>
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────
// Placeholder — sin foto todavía
// ─────────────────────────────────────────────

function HeroPlaceholder() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden bg-bg-primary">

      {/* Fondo decorativo mientras llega la foto */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-primary" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      {/* Contenido */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-24 pt-40 w-full">
        <HeroTexto />
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────
// Texto del Hero — compartido entre variantes
// ─────────────────────────────────────────────

function HeroTexto() {
  return (
    <div className="max-w-2xl">

      {/* Subtítulo superior */}
      <p className="font-sans text-xs md:text-sm uppercase tracking-[0.15em] text-text-secondary mb-6 md:mb-8">
        {ARTISTA.descripcion}
      </p>

      {/* Nombre del artista con subrayado dorado animado */}
      <h1 className="font-serif font-bold text-[3.5rem] md:text-[6rem] leading-[1.05] text-text-primary mb-6 md:mb-8">
        <span className="relative inline-block">
          {ARTISTA.nombre.split(' ')[0]}
          <span className="absolute bottom-1 left-0 right-0 h-px bg-accent scale-x-0 animate-[expandir_1s_0.5s_ease-out_forwards]" />
        </span>
        {' '}
        <span className="relative inline-block">
          {ARTISTA.nombre.split(' ').slice(1).join(' ')}
          <span className="absolute bottom-1 left-0 right-0 h-px bg-accent scale-x-0 animate-[expandir_1s_0.8s_ease-out_forwards]" />
        </span>
      </h1>

      {/* Tagline */}
      {ARTISTA.tagline && (
        <p className="font-sans text-sm md:text-base text-text-secondary mb-10 md:mb-12 max-w-md leading-relaxed">
          {ARTISTA.tagline}
        </p>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/#discografia"
          className="
            border border-accent text-accent
            px-8 py-3
            font-sans text-sm uppercase tracking-widest
            transition-all duration-200
            hover:bg-accent hover:text-bg-primary
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          "
        >
          Escuchar música
        </Link>
        <Link
          href="/#sobre-mi"
          className="
            text-text-secondary
            font-sans text-sm uppercase tracking-widest
            border-b border-transparent
            transition-all duration-200
            hover:text-text-primary hover:border-accent
            pb-1 self-center
          "
        >
          Sobre mí
        </Link>
      </div>

    </div>
  )
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

export default function HeroSection() {
  if (VARIANTE === 'A') return <HeroVarianteA />
  if (VARIANTE === 'B') return <HeroVarianteB />
  return <HeroPlaceholder />
}
