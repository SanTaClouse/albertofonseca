'use client'

import { useActionState } from 'react'
import type { PresentacionRow } from '@/types/db'
import { guardarPresentacion, type EstadoForm } from './actions'
import { Campo, inputClass, MensajeError, Toggle } from '../../_components/ui'
import SubmitButton from '../../_components/SubmitButton'

export default function PresentacionForm({
  presentacion,
}: {
  presentacion?: PresentacionRow
}) {
  const [estado, formAction] = useActionState<EstadoForm, FormData>(
    guardarPresentacion,
    {}
  )

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-2xl">
      {presentacion && <input type="hidden" name="id" value={presentacion.id} />}

      <div className="grid grid-cols-2 gap-6">
        <Campo label="Fecha">
          <input
            type="date"
            name="fecha"
            defaultValue={presentacion?.fecha ?? ''}
            required
            className={inputClass}
          />
        </Campo>

        <Campo label="Hora">
          <input
            type="time"
            name="hora"
            defaultValue={presentacion?.hora ?? ''}
            className={inputClass}
          />
        </Campo>
      </div>

      <Campo label="Lugar" ayuda="Nombre del teatro, sala o espacio.">
        <input
          type="text"
          name="lugar"
          defaultValue={presentacion?.lugar ?? ''}
          required
          className={inputClass}
        />
      </Campo>

      <Campo label="Ciudad">
        <input
          type="text"
          name="ciudad"
          defaultValue={presentacion?.ciudad ?? ''}
          required
          className={inputClass}
        />
      </Campo>

      <Campo label="Link de entradas (opcional)">
        <input
          type="url"
          name="link_entradas"
          defaultValue={presentacion?.link_entradas ?? ''}
          placeholder="https://…"
          className={inputClass}
        />
      </Campo>

      <Toggle
        name="activo"
        label="Visible en la web"
        defaultChecked={presentacion?.activo ?? true}
      />

      <MensajeError mensaje={estado.error} />

      <div className="pt-2">
        <SubmitButton>
          {presentacion ? 'Guardar cambios' : 'Agregar presentación'}
        </SubmitButton>
      </div>
    </form>
  )
}
