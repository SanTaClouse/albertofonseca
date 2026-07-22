'use client'

import { useActionState } from 'react'
import type { VideoRow } from '@/types/db'
import { guardarVideo, type EstadoForm } from './actions'
import { Campo, inputClass, MensajeError, Toggle } from '../../_components/ui'
import SubmitButton from '../../_components/SubmitButton'

export default function VideoForm({ video }: { video?: VideoRow }) {
  const [estado, formAction] = useActionState<EstadoForm, FormData>(guardarVideo, {})

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">
      {video && <input type="hidden" name="id" value={video.id} />}

      <Campo
        label="Link de YouTube"
        ayuda="Pegá el link del video — el código se extrae solo."
      >
        <input
          type="text"
          name="youtube"
          defaultValue={video?.youtube_id ?? ''}
          placeholder="https://youtu.be/…"
          required
          className={inputClass}
        />
      </Campo>

      <Campo label="Título" ayuda="Aparece debajo del video en la web.">
        <input
          type="text"
          name="titulo"
          defaultValue={video?.titulo ?? ''}
          className={inputClass}
        />
      </Campo>

      <Campo label="Orden" ayuda="Posición en la grilla de videos (1 = primero).">
        <input
          type="number"
          name="orden"
          defaultValue={video?.orden ?? 0}
          className={`${inputClass} max-w-32`}
        />
      </Campo>

      <Toggle
        name="activo"
        label="Visible en la web"
        defaultChecked={video?.activo ?? true}
      />

      <MensajeError mensaje={estado.error} />

      <div className="pt-2">
        <SubmitButton>{video ? 'Guardar cambios' : 'Agregar video'}</SubmitButton>
      </div>
    </form>
  )
}
