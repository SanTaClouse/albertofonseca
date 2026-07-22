'use client'

import { useActionState, useState } from 'react'
import { formatFechaMes } from '@/lib/utils'
import type { EscritoRow } from '@/types/db'
import { guardarEscrito, type EstadoForm } from './actions'
import { Campo, inputClass, MensajeError, Toggle } from '../../_components/ui'
import SubmitButton from '../../_components/SubmitButton'
import ImageUpload from '../../_components/ImageUpload'

const mesActual = () => new Date().toISOString().slice(0, 7)

export default function EscritoForm({ escrito }: { escrito?: EscritoRow }) {
  const [estado, formAction] = useActionState<EstadoForm, FormData>(guardarEscrito, {})

  // Estado local solo para la vista previa en vivo
  const [titulo, setTitulo] = useState(escrito?.titulo ?? '')
  const [fecha, setFecha] = useState(escrito?.fecha ?? mesActual())
  const [contenido, setContenido] = useState(escrito?.contenido ?? '')

  const parrafos = contenido
    .split(/\\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      {/* ─── Formulario ─── */}
      <form action={formAction} className="flex flex-col gap-6">
        {escrito && <input type="hidden" name="id" value={escrito.id} />}

        <Campo label="Título">
          <input
            type="text"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className={inputClass}
          />
        </Campo>

        <Campo label="Mes de publicación">
          <input
            type="month"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className={inputClass}
          />
        </Campo>

        <Campo
          label="Resumen"
          ayuda="Texto corto que aparece en la portada del sitio y en la lista de escritos."
        >
          <textarea
            name="resumen"
            defaultValue={escrito?.resumen ?? ''}
            rows={3}
            className={inputClass}
          />
        </Campo>

        <Campo
          label="Contenido"
          ayuda="Cada salto de línea (Enter) crea un párrafo nuevo."
        >
          <textarea
            name="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={18}
            className={`${inputClass} leading-relaxed`}
          />
        </Campo>

        <Campo label="Imagen de portada (opcional)">
          <ImageUpload
            name="imagen_url"
            defaultUrl={escrito?.imagen_url}
            carpeta="escritos"
            aspecto="panoramico"
          />
        </Campo>

        <Toggle
          name="activo"
          label="Visible en la web"
          defaultChecked={escrito?.activo ?? true}
        />

        <MensajeError mensaje={estado.error} />

        <div className="flex items-center gap-6 pt-2">
          <SubmitButton>{escrito ? 'Guardar cambios' : 'Publicar escrito'}</SubmitButton>
        </div>
      </form>

      {/* ─── Vista previa ─── */}
      <aside className="lg:sticky lg:top-10 border border-border bg-bg-secondary p-8 max-h-[80vh] overflow-y-auto">
        <p className="font-sans text-[0.65rem] uppercase tracking-widest text-text-muted mb-8">
          Vista previa — así se ve en la web
        </p>

        {/^\d{4}-\d{2}$/.test(fecha) && (
          <p className="font-sans text-sm text-text-muted mb-4">
            {formatFechaMes(fecha)}
          </p>
        )}
        <h2 className="font-serif text-2xl md:text-3xl text-text-primary leading-[1.2] mb-5">
          {titulo || 'Título del escrito'}
        </h2>
        <div className="w-12 h-px bg-accent mb-8" />

        <div className="flex flex-col gap-5">
          {parrafos.length > 0 ? (
            parrafos.map((parrafo, i) => (
              <p key={i} className="font-sans text-base text-text-secondary leading-[1.9]">
                {parrafo}
              </p>
            ))
          ) : (
            <p className="font-sans text-sm text-text-muted italic">
              El contenido aparecerá acá a medida que escribas…
            </p>
          )}
        </div>
      </aside>

    </div>
  )
}
