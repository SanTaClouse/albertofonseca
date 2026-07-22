'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton({
  children = 'Guardar',
}: {
  children?: React.ReactNode
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        bg-accent text-bg-primary
        px-8 py-3
        font-sans text-sm uppercase tracking-widest
        transition-all duration-200
        hover:bg-accent-hover
        disabled:opacity-50 disabled:cursor-wait
        cursor-pointer
      "
    >
      {pending ? 'Guardando…' : children}
    </button>
  )
}
