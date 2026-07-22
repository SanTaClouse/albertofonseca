/**
 * Primitivas de UI del panel admin — mismos tokens visuales del sitio.
 * Sin 'use client': se usan tanto en server como en client components.
 */

export const inputClass = `
  w-full bg-bg-secondary border border-border text-text-primary
  px-4 py-3 font-sans text-base
  placeholder:text-text-muted
  focus:outline-none focus:border-accent
  transition-colors duration-200
`

export function Campo({
  label,
  ayuda,
  children,
}: {
  label: string
  ayuda?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs uppercase tracking-widest text-accent">
        {label}
      </span>
      {children}
      {ayuda && (
        <span className="font-sans text-xs text-text-muted">{ayuda}</span>
      )}
    </label>
  )
}

export function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="w-5 h-5 accent-[#C9A96E] cursor-pointer"
      />
      <span className="font-sans text-sm text-text-secondary">{label}</span>
    </label>
  )
}

export function Badge({ activo }: { activo: boolean }) {
  return (
    <span
      className={`
        font-sans text-[0.65rem] uppercase tracking-widest px-2 py-1 border
        ${activo ? 'text-accent border-accent/40' : 'text-text-muted border-border'}
      `}
    >
      {activo ? 'Visible' : 'Oculto'}
    </span>
  )
}

export function TituloPagina({
  titulo,
  accion,
}: {
  titulo: string
  accion?: React.ReactNode
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
      <h1 className="font-serif font-bold text-3xl text-text-primary">{titulo}</h1>
      {accion}
    </header>
  )
}

export function MensajeError({ mensaje }: { mensaje?: string }) {
  if (!mensaje) return null
  return (
    <p className="font-sans text-sm text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
      {mensaje}
    </p>
  )
}
