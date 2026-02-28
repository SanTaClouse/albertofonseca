interface SectionHeaderProps {
  subtitulo: string
  titulo: string
  centrado?: boolean
}

export default function SectionHeader({ subtitulo, titulo, centrado = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centrado ? 'text-center' : ''}`}>
      <p className="font-sans text-xs uppercase tracking-widest text-accent mb-3">
        — {subtitulo}
      </p>
      <h2 className="font-serif text-3xl md:text-5xl text-text-primary">
        {titulo}
      </h2>
    </div>
  )
}
