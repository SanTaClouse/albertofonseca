'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Campo, inputClass, MensajeError } from '../_components/ui'

// Inlined en build — si falta, Supabase todavía no está configurado
const SUPABASE_CONFIGURADO = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  if (!SUPABASE_CONFIGURADO) {
    return (
      <main className="bg-bg-primary min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
            — Panel de administración
          </p>
          <p className="font-sans text-base text-text-secondary leading-relaxed">
            Supabase todavía no está configurado. Completá{' '}
            <code className="text-accent">NEXT_PUBLIC_SUPABASE_URL</code> y{' '}
            <code className="text-accent">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
            en las variables de entorno (ver <code className="text-accent">SETUP.md</code>).
          </p>
        </div>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setCargando(false)
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Email o contraseña incorrectos.'
          : 'No se pudo iniciar sesión. Intentá de nuevo en un momento.'
      )
      return
    }

    // Navegación completa para que el servidor lea las cookies nuevas
    window.location.href = '/admin'
  }

  return (
    <main className="bg-bg-primary min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <header className="mb-10 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-accent mb-4">
            — Panel de administración
          </p>
          <h1 className="font-serif font-bold text-3xl text-text-primary">
            Alberto Fonseca
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Campo label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
            />
          </Campo>

          <Campo label="Contraseña">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </Campo>

          <MensajeError mensaje={error} />

          <button
            type="submit"
            disabled={cargando}
            className="
              bg-accent text-bg-primary px-8 py-3
              font-sans text-sm uppercase tracking-widest
              hover:bg-accent-hover transition-all duration-200
              disabled:opacity-50 disabled:cursor-wait cursor-pointer
            "
          >
            {cargando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
