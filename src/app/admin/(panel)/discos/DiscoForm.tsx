'use client'

import { useActionState } from 'react'
import type { DiscoRow } from '@/types/db'
import { guardarDisco, type EstadoForm } from './actions'
import { Campo, inputClass, MensajeError, Toggle } from '../../_components/ui'
import SubmitButton from '../../_components/SubmitButton'
import ImageUpload from '../../_components/ImageUpload'

export default function DiscoForm({ disco }: { disco?: DiscoRow }) {
  const [estado, formAction] = useActionState<EstadoForm, FormData>(guardarDisco, {})

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">
      {disco && <input type="hidden" name="id" value={disco.id} />}

      <Campo label="Tapa del disco">
        <ImageUpload
          name="portada_url"
          defaultUrl={disco?.portada_url}
          carpeta="discos"
          aspecto="cuadrado"
        />
      </Campo>

      <Campo label="Título">
        <input
          type="text"
          name="titulo"
          defaultValue={disco?.titulo ?? ''}
          required
          className={inputClass}
        />
      </Campo>

      <div className="grid grid-cols-2 gap-6">
        <Campo label="Año">
          <input
            type="number"
            name="anio"
            defaultValue={disco?.anio ?? new Date().getFullYear()}
            required
            min={1900}
            max={2100}
            className={inputClass}
          />
        </Campo>

        <Campo label="Cantidad de canciones" ayuda="Dejar vacío si todavía no se sabe.">
          <input
            type="number"
            name="canciones"
            defaultValue={disco?.canciones ?? ''}
            min={1}
            className={inputClass}
          />
        </Campo>
      </div>

      <Campo label="Descripción" ayuda="Texto que aparece en la página del disco.">
        <textarea
          name="descripcion"
          defaultValue={disco?.descripcion ?? ''}
          rows={5}
          className={inputClass}
        />
      </Campo>

      <Campo
        label="Álbum en Spotify"
        ayuda="Pegá el link del álbum (ej: https://open.spotify.com/album/…) — el código se extrae solo."
      >
        <input
          type="text"
          name="spotify"
          defaultValue={disco?.spotify_embed_id ?? ''}
          placeholder="https://open.spotify.com/album/…"
          className={inputClass}
        />
      </Campo>

      <Campo label="Orden" ayuda="Posición en la grilla de discografía (1 = primero).">
        <input
          type="number"
          name="orden"
          defaultValue={disco?.orden ?? 0}
          className={`${inputClass} max-w-32`}
        />
      </Campo>

      <div className="flex flex-col gap-3">
        <Toggle
          name="proximamente"
          label="Marcar como «Próximamente»"
          defaultChecked={disco?.proximamente ?? false}
        />
        <Toggle
          name="activo"
          label="Visible en la web"
          defaultChecked={disco?.activo ?? true}
        />
      </div>

      <MensajeError mensaje={estado.error} />

      <div className="pt-2">
        <SubmitButton>{disco ? 'Guardar cambios' : 'Crear disco'}</SubmitButton>
      </div>
    </form>
  )
}
