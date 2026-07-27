'use client'

import { useActionState } from 'react'
import { guardarTextos, type EstadoForm } from './actions'
import { Campo, inputClass, MensajeError } from '../../_components/ui'
import SubmitButton from '../../_components/SubmitButton'

export default function TextosForm({ valores }: { valores: Record<string, string> }) {
  const [estado, formAction] = useActionState<EstadoForm, FormData>(guardarTextos, {})

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">

      <Campo label="Tagline" ayuda="Frase corta que aparece en la portada, debajo del nombre.">
        <input
          type="text"
          name="tagline"
          defaultValue={valores.tagline ?? ''}
          className={inputClass}
        />
      </Campo>

      <Campo
        label="Sobre mí"
        ayuda="Texto de la sección «Sobre mí» de la portada. Dejá una línea en blanco (Enter dos veces) para separar párrafos."
      >
        <textarea
          name="sobre_mi"
          defaultValue={valores.sobre_mi ?? ''}
          rows={8}
          className={`${inputClass} leading-relaxed`}
        />
      </Campo>

      <div className="pt-4 border-t border-border">
        <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-6">
          Contacto
        </p>
        <div className="flex flex-col gap-6">
          <Campo label="Email de contacto">
            <input type="email" name="email" defaultValue={valores.email ?? ''} className={inputClass} />
          </Campo>
          <Campo label="WhatsApp" ayuda="Con código de país, ej: +18091234567">
            <input type="text" name="whatsapp" defaultValue={valores.whatsapp ?? ''} className={inputClass} />
          </Campo>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="font-sans text-xs uppercase tracking-widest text-text-muted mb-6">
          Redes — dejar vacío para ocultar el link
        </p>
        <div className="flex flex-col gap-6">
          <Campo label="YouTube">
            <input type="url" name="youtube" defaultValue={valores.youtube ?? ''} className={inputClass} />
          </Campo>
          <Campo label="Spotify">
            <input type="url" name="spotify" defaultValue={valores.spotify ?? ''} className={inputClass} />
          </Campo>
          <Campo label="Instagram">
            <input type="url" name="instagram" defaultValue={valores.instagram ?? ''} className={inputClass} />
          </Campo>
          <Campo label="Facebook">
            <input type="url" name="facebook" defaultValue={valores.facebook ?? ''} className={inputClass} />
          </Campo>
        </div>
      </div>

      <MensajeError mensaje={estado.error} />
      {estado.ok && (
        <p className="font-sans text-sm text-accent border border-accent/30 bg-accent-subtle px-4 py-3">
          Cambios guardados — ya están publicados en la web.
        </p>
      )}

      <div className="pt-2">
        <SubmitButton>Guardar textos</SubmitButton>
      </div>
    </form>
  )
}
