'use client'

import { useRef, useState } from 'react'
/* eslint-disable @next/next/no-img-element -- preview local con URL dinámica */
import { createClient } from '@/lib/supabase/client'

interface ImageUploadProps {
  name: string // nombre del input hidden que envía la URL al server action
  defaultUrl?: string | null
  carpeta: 'discos' | 'escritos' // subcarpeta dentro del bucket
  aspecto?: 'cuadrado' | 'panoramico'
}

/**
 * Sube una imagen al bucket público `imagenes` de Supabase Storage usando
 * la sesión del admin y deja la URL pública en un input hidden del form.
 */
export default function ImageUpload({
  name,
  defaultUrl,
  carpeta,
  aspecto = 'cuadrado',
}: ImageUploadProps) {
  const [url, setUrl] = useState(defaultUrl ?? '')
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (JPG, PNG o WebP).')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('La imagen pesa más de 4 MB. Achicala antes de subirla.')
      return
    }

    setSubiendo(true)
    try {
      const supabase = createClient()
      const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const ruta = `${carpeta}/${Date.now()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from('imagenes')
        .upload(ruta, file, { cacheControl: '31536000', upsert: false })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('imagenes').getPublicUrl(ruta)
      setUrl(data.publicUrl)
    } catch (e) {
      console.error(e)
      setError('No se pudo subir la imagen. Revisá tu conexión e intentá de nuevo.')
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={url} />

      {/* Preview */}
      <div
        className={`
          relative overflow-hidden bg-bg-secondary border border-border
          ${aspecto === 'cuadrado' ? 'aspect-square max-w-60' : 'aspect-[16/9] max-w-md'}
        `}
      >
        {url ? (
          <img src={url} alt="Vista previa" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-px bg-accent" />
            <p className="font-sans text-xs uppercase tracking-widest text-text-muted">
              Sin imagen
            </p>
          </div>
        )}
        {subiendo && (
          <div className="absolute inset-0 bg-bg-primary/70 flex items-center justify-center">
            <p className="font-sans text-xs uppercase tracking-widest text-accent">
              Subiendo…
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={subiendo}
          onClick={() => fileRef.current?.click()}
          className="
            border border-accent text-accent px-5 py-2
            font-sans text-xs uppercase tracking-widest
            hover:bg-accent hover:text-bg-primary
            transition-all duration-200
            disabled:opacity-50 cursor-pointer
          "
        >
          {url ? 'Cambiar imagen' : 'Subir imagen'}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl('')}
            className="font-sans text-xs uppercase tracking-widest text-text-muted hover:text-red-400 transition-colors duration-200 cursor-pointer"
          >
            Quitar
          </button>
        )}
      </div>

      {error && <p className="font-sans text-sm text-red-400">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
