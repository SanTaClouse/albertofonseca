import type { Metadata } from 'next'
import { getEscritos } from '@/lib/sheets'
import EscritosPageClient from './EscritosPageClient'

export const metadata: Metadata = {
  title: 'Escritos',
  description: 'Textos y reflexiones de Alberto Fonseca — cantautor, escritor y periodista.',
}

export default async function EscritosPage() {
  const escritos = await getEscritos()

  return (
    <main className="bg-bg-primary min-h-screen pt-24 pb-20 md:pt-28 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Encabezado de página */}
        <header className="mb-10 md:mb-12 pb-10 border-b border-border">
          <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
            — Textos
          </p>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-text-primary">
            Escritos
          </h1>
        </header>

        <EscritosPageClient escritos={escritos} />

      </div>
    </main>
  )
}
