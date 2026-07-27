'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
/* eslint-disable @next/next/no-img-element -- recorte local con object URL */

interface ImageCropperProps {
  file: File
  aspect: number // ancho/alto del marco (1 = cuadrado, 16/9 = panorámico)
  output: { w: number; h: number } // resolución final del recorte
  procesando?: boolean // subiendo el resultado
  onCancel: () => void
  onApply: (blob: Blob) => void
}

const MAX_ZOOM = 5

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

// WebP si el navegador lo soporta (más liviano); si no, JPEG.
function tipoSalida(): 'image/webp' | 'image/jpeg' {
  const c = document.createElement('canvas')
  return c.toDataURL('image/webp').startsWith('data:image/webp')
    ? 'image/webp'
    : 'image/jpeg'
}

/**
 * Recortador interactivo: la imagen se arrastra y se acerca dentro de un
 * marco de proporción fija; al aplicar, se genera el recorte exacto como
 * blob (para subir a Storage). La imagen original nunca sale del navegador.
 *
 * El encuadre inicial (centrado) se deriva de las medidas — no se guarda en
 * estado hasta que el usuario interactúa — para evitar setState en effects.
 */
export default function ImageCropper({
  file,
  aspect,
  output,
  procesando,
  onCancel,
  onApply,
}: ImageCropperProps) {
  const objectUrl = useMemo(() => URL.createObjectURL(file), [file])
  useEffect(() => () => URL.revokeObjectURL(objectUrl), [objectUrl])

  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [frame, setFrame] = useState<{ w: number; h: number } | null>(null)
  const [zoom, setZoom] = useState(1) // >= 1
  const [userOffset, setUserOffset] = useState<{ x: number; y: number } | null>(null)

  // Medir el marco (responsive)
  useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return
    const medir = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (w > 0 && h > 0) setFrame({ w, h })
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const clampOffset = useCallback(
    (x: number, y: number, dW: number, dH: number, f: { w: number; h: number }) => ({
      x: clamp(x, f.w - dW, 0),
      y: clamp(y, f.h - dH, 0),
    }),
    []
  )

  // escala mínima para que la imagen siempre cubra el marco
  const minScale =
    natural && frame ? Math.max(frame.w / natural.w, frame.h / natural.h) : 1
  const scale = minScale * zoom
  const dispW = natural ? natural.w * scale : 0
  const dispH = natural ? natural.h * scale : 0

  // Encuadre centrado por defecto; el override del usuario manda si existe
  const baseOffset =
    natural && frame
      ? { x: (frame.w - dispW) / 2, y: (frame.h - dispH) / 2 }
      : { x: 0, y: 0 }
  const offset =
    natural && frame
      ? clampOffset((userOffset ?? baseOffset).x, (userOffset ?? baseOffset).y, dispW, dispH, frame)
      : baseOffset

  // ─── Arrastre ───
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)

  function onPointerDown(e: React.PointerEvent) {
    if (procesando) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current || !frame) return
    const nx = drag.current.ox + (e.clientX - drag.current.x)
    const ny = drag.current.oy + (e.clientY - drag.current.y)
    setUserOffset(clampOffset(nx, ny, dispW, dispH, frame))
  }
  function onPointerUp(e: React.PointerEvent) {
    drag.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
  }

  // ─── Zoom (mantiene el centro del marco fijo) ───
  function aplicarZoom(nuevoZoom: number) {
    if (!natural || !frame) return
    const z = clamp(nuevoZoom, 1, MAX_ZOOM)
    const scaleNew = minScale * z
    const cx = (frame.w / 2 - offset.x) / scale
    const cy = (frame.h / 2 - offset.y) / scale
    const nx = frame.w / 2 - cx * scaleNew
    const ny = frame.h / 2 - cy * scaleNew
    const dW = natural.w * scaleNew
    const dH = natural.h * scaleNew
    setZoom(z)
    setUserOffset(clampOffset(nx, ny, dW, dH, frame))
  }

  // ─── Aplicar recorte → blob ───
  function aplicar() {
    const img = imgRef.current
    if (!img || !natural || !frame) return

    const sx = -offset.x / scale
    const sy = -offset.y / scale
    const sw = frame.w / scale
    const sh = frame.h / scale

    const canvas = document.createElement('canvas')
    canvas.width = output.w
    canvas.height = output.h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, output.w, output.h)

    canvas.toBlob(
      (blob) => {
        if (blob) onApply(blob)
      },
      tipoSalida(),
      0.9
    )
  }

  const listo = Boolean(natural && frame)

  return (
    <div className="border border-border bg-bg-secondary p-4 flex flex-col gap-4 max-w-md">
      <p className="font-sans text-[0.65rem] uppercase tracking-widest text-accent">
        Encuadrar imagen
      </p>

      {/* Marco de recorte */}
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ aspectRatio: String(aspect) }}
        className="relative w-full overflow-hidden bg-bg-primary border border-border cursor-move touch-none select-none"
      >
        <img
          ref={imgRef}
          src={objectUrl}
          alt="Imagen a encuadrar"
          draggable={false}
          onLoad={(e) =>
            setNatural({
              w: e.currentTarget.naturalWidth,
              h: e.currentTarget.naturalHeight,
            })
          }
          style={{
            position: 'absolute',
            left: offset.x,
            top: offset.y,
            width: dispW || undefined,
            height: dispH || undefined,
            maxWidth: 'none',
          }}
        />
        {/* Guías tercios */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/20" />
          <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/20" />
          <div className="absolute left-0 right-0 top-1/3 h-px bg-white/20" />
          <div className="absolute left-0 right-0 top-2/3 h-px bg-white/20" />
        </div>
      </div>

      {/* Zoom */}
      <label className="flex items-center gap-3">
        <span className="font-sans text-[0.65rem] uppercase tracking-widest text-text-muted">
          Zoom
        </span>
        <input
          type="range"
          min={1}
          max={MAX_ZOOM}
          step={0.01}
          value={zoom}
          disabled={procesando}
          onChange={(e) => aplicarZoom(Number(e.target.value))}
          className="flex-1 accent-[#C9A96E] cursor-pointer"
        />
      </label>

      <p className="font-sans text-xs text-text-muted">
        Arrastrá la foto para moverla y usá el control de zoom para acercar.
        Lo que se ve dentro del marco es lo que se publica.
      </p>

      {/* Acciones */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={aplicar}
          disabled={procesando || !listo}
          className="
            bg-accent text-bg-primary px-6 py-2.5
            font-sans text-xs uppercase tracking-widest
            hover:bg-accent-hover transition-colors duration-200
            disabled:opacity-50 disabled:cursor-wait cursor-pointer
          "
        >
          {procesando ? 'Subiendo…' : 'Aplicar encuadre'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={procesando}
          className="font-sans text-xs uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200 disabled:opacity-50 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
