'use client'

import { useRef, useState } from 'react'
/* eslint-disable @next/next/no-img-element -- preview local con URL dinámica */
import { createClient } from '@/lib/supabase/client'
import ImageCropper from './ImageCropper'

interface ImageUploadProps {
  name: string // nombre del input hidden que envía la URL al server action
  defaultUrl?: string | null
  carpeta: 'discos' | 'escritos' // subcarpeta dentro del bucket
  aspecto?: 'cuadrado' | 'panoramico'
}

// Proporción del marco y resolución final según el destino de la imagen
const ENCUADRE = {
  cuadrado: { aspect: 1, output: { w: 1200, h: 1200 } },
  panoramico: { aspect: 16 / 9, output: { w: 1600, h: 900 } },
} as const

/**
 * Sube una imagen al bucket público `imagenes` de Supabase Storage usando
 * la sesión del admin. Antes de subir, la imagen pasa por un recortador
 * interactivo (ver ImageCropper) para encuadrarla a la proporción exacta.
 * Deja la URL pública del recorte en un input hidden del form.
 */
export default function ImageUpload({
  name,
  defaultUrl,
  carpeta,
  aspecto = 'cuadrado',
}: ImageUploadProps) {
  const [url, setUrl] = useState(defaultUrl ?? '')
  const [archivo, setArchivo] = useState<File | null>(null) // en proceso de encuadre
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const { aspect, output } = ENCUADRE[aspecto]

  async function subirBlob(blob: Blob): Promise<boolean> {
    setError('')
    setProcesando(true)
    try {
      const supabase = createClient()
      const extension = blob.type === 'image/webp' ? 'webp' : 'jpg'
      const ruta = `${carpeta}/${Date.now()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from('imagenes')
        .upload(ruta, blob, {
          cacheControl: '31536000',
          upsert: false,
          contentType: blob.type,
        })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('imagenes').getPublicUrl(ruta)
      setUrl(data.publicUrl)
      return true
    } catch (e) {
      console.error(e)
      setError('No se pudo subir la imagen. Revisá tu conexión e intentá de nuevo.')
      return false
    } finally {
      setProcesando(false)
    }
  }

  function elegirArchivo(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (JPG, PNG o WebP).')
      return
    }
    if (file.size > 25 * 1024 * 1024) {
      setError('La imagen es demasiado grande (máximo 25 MB).')
      return
    }
    setError('')
    setArchivo(file)
  }

  // ─── Modo encuadre ───
  if (archivo) {
    return (
      <div className="flex flex-col gap-3">
        <input type="hidden" name={name} value={url} />
        <ImageCropper
          file={archivo}
          aspect={aspect}
          output={output}
          procesando={procesando}
          onCancel={() => {
            setArchivo(null)
            setError('')
          }}
          onApply={async (blob) => {
            const ok = await subirBlob(blob)
            if (ok) setArchivo(null)
          }}
        />
        {error && <p className="font-sans text-sm text-red-400">{error}</p>}
      </div>
    )
  }

  // ─── Modo normal (preview + botones) ───
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
        {procesando && (
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
          disabled={procesando}
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
          if (file) elegirArchivo(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
