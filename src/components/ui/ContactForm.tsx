'use client'

import { useState } from 'react'
import { FORMSPREE_ENDPOINT } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'sending' | 'success' | 'error'

const CAMPOS = [
  { id: 'nombre', label: 'Nombre', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'asunto', label: 'Asunto', type: 'text', required: true },
] as const

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="w-12 h-px bg-accent" />
        <p className="font-serif text-xl text-text-primary">Mensaje recibido.</p>
        <p className="font-sans text-base text-text-secondary">
          Gracias por escribir. Responderé a la brevedad.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-sans text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-200 mt-2"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl">

      {CAMPOS.map(({ id, label, type }) => (
        <div key={id} className="flex flex-col gap-2">
          <label
            htmlFor={id}
            className="font-sans text-xs uppercase tracking-widest text-text-muted"
          >
            {label}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            required
            className="
              bg-transparent border-b border-border
              font-sans text-base text-text-primary
              py-3 px-0
              focus:outline-none focus:border-accent
              transition-colors duration-200
              placeholder:text-text-muted
            "
          />
        </div>
      ))}

      {/* Mensaje */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="mensaje"
          className="font-sans text-xs uppercase tracking-widest text-text-muted"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          className="
            bg-transparent border-b border-border
            font-sans text-base text-text-primary
            py-3 px-0
            focus:outline-none focus:border-accent
            transition-colors duration-200
            resize-none
            placeholder:text-text-muted
          "
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="font-sans text-sm text-red-400">
          Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
        </p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'sending'}
          className={status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </div>

    </form>
  )
}
