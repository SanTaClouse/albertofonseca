import { Fragment } from 'react'
import { textoAParrafos } from '@/lib/utils'

interface TextoFormateadoProps {
  texto: string
  /** clases del contenedor (ej. separación entre párrafos) */
  className?: string
  /** clases de cada párrafo */
  parrafoClassName?: string
}

/**
 * Renderiza texto plano respetando el formato de párrafos:
 * línea en blanco = párrafo nuevo, salto simple = <br/> dentro del párrafo.
 * Sirve en Server y Client Components (sin estado ni APIs del navegador),
 * así la vista previa del panel coincide exactamente con la web.
 */
export default function TextoFormateado({
  texto,
  className,
  parrafoClassName,
}: TextoFormateadoProps) {
  const parrafos = textoAParrafos(texto)
  if (parrafos.length === 0) return null

  return (
    <div className={className}>
      {parrafos.map((lineas, i) => (
        <p key={i} className={parrafoClassName}>
          {lineas.map((linea, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {linea}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}
