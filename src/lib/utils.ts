/**
 * Formatea una fecha YYYY-MM-DD en texto legible en español.
 * Ej: "2025-03-15" → "15 de marzo de 2025"
 */
export function formatFecha(fecha: string): string {
  const [year, month, day] = fecha.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Formatea una fecha YYYY-MM en mes y año en español.
 * Ej: "2024-11" → "noviembre 2024"
 */
export function formatFechaMes(fecha: string): string {
  const [year, month] = fecha.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Formatea una fecha YYYY-MM-DD en formato corto.
 * Ej: "2025-03-15" → "15 mar. 2025"
 */
export function formatFechaCorta(fecha: string): string {
  const [year, month, day] = fecha.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Parsea texto plano en párrafos para renderizar.
 * - Una línea en blanco (o más) separa párrafos.
 * - Un salto de línea simple es un salto dentro del mismo párrafo.
 * Devuelve un array de párrafos, cada uno como array de líneas.
 * Ej: "Hola\nmundo\n\nAdiós" → [["Hola", "mundo"], ["Adiós"]]
 */
export function textoAParrafos(texto: string): string[][] {
  return (texto ?? '')
    .replace(/\r\n?/g, '\n') // normaliza saltos de Windows/Mac
    .split(/\n[ \t]*\n+/) // una o más líneas en blanco = nuevo párrafo
    .map((bloque) =>
      bloque
        .split('\n')
        .map((linea) => linea.trim())
        .filter(Boolean)
    )
    .filter((lineas) => lineas.length > 0)
}

/**
 * Convierte un string en slug URL-friendly.
 * Ej: "La llave del alba" → "la-llave-del-alba"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina diacríticos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
