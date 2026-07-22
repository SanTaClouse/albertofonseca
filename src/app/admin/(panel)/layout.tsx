import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cerrarSesion } from './actions'

const NAV = [
  { label: 'Inicio', href: '/admin' },
  { label: 'Escritos', href: '/admin/escritos' },
  { label: 'Discos', href: '/admin/discos' },
  { label: 'Presentaciones', href: '/admin/presentaciones' },
  { label: 'Videos', href: '/admin/videos' },
  { label: 'Textos', href: '/admin/textos' },
]

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Supabase sin configurar → el login muestra el aviso
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect('/admin/login')

  // El proxy ya protege /admin; esto es una segunda barrera.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Barra superior */}
      <header className="border-b border-border bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/admin" className="font-serif text-lg text-text-primary">
            Alberto Fonseca
            <span className="font-sans text-xs uppercase tracking-widest text-accent ml-3">
              Admin
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-200"
            >
              Ver sitio ↗
            </a>
            <form action={cerrarSesion}>
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-widest text-text-muted hover:text-red-400 transition-colors duration-200 cursor-pointer"
              >
                Salir
              </button>
            </form>
          </div>
        </div>

        {/* Navegación de secciones */}
        <nav className="max-w-5xl mx-auto px-6 flex gap-6 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                font-sans text-sm text-text-secondary whitespace-nowrap
                py-3 border-b-2 border-transparent
                hover:text-text-primary hover:border-accent
                transition-all duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
