import type { Presentacion, Escrito } from '@/types'

// URL base del Google Sheet publicado como CSV.
// Formato: https://docs.google.com/spreadsheets/d/[ID]/gviz/tq?tqx=out:csv&sheet=
const SHEET_BASE_URL = process.env.NEXT_PUBLIC_SHEETS_BASE_URL

export async function getPresentaciones(): Promise<Presentacion[]> {
  if (!SHEET_BASE_URL) return []

  try {
    const res = await fetch(`${SHEET_BASE_URL}presentaciones`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const csv = await res.text()
    return parseCSV<Presentacion>(csv)
      .filter((p) => p.activo === true)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  } catch (error) {
    console.error('Error fetching presentaciones:', error)
    return []
  }
}

export async function getEscritos(): Promise<Escrito[]> {
  if (!SHEET_BASE_URL) return []

  try {
    const res = await fetch(`${SHEET_BASE_URL}escritos`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const csv = await res.text()
    return parseCSV<Escrito>(csv)
      .filter((e) => e.activo === true)
      .map((e) => ({ ...e, fecha: parseFechaEscrito(e.fecha) }))
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
  } catch (error) {
    console.error('Error fetching escritos:', error)
    return []
  }
}

// ─── Parser genérico CSV → objetos tipados ───────────────────────────────────

function parseCSV<T>(csv: string): T[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().replace(/"/g, ''))

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line)
    const obj: Record<string, unknown> = {}

    headers.forEach((header, i) => {
      const raw = values[i]?.trim().replace(/^"|"$/g, '') ?? ''
      if (raw === 'TRUE') obj[header] = true
      else if (raw === 'FALSE') obj[header] = false
      else if (raw !== '' && !isNaN(Number(raw))) obj[header] = Number(raw)
      else obj[header] = raw
    })

    return obj as T
  })
}

// Convierte fecha de Excel/Sheets (DD/MM/YYYY) a YYYY-MM
// Si ya viene en formato YYYY-MM o YYYY-MM-DD, la deja como está
function parseFechaEscrito(fecha: string): string {
  if (!fecha) return ''
  // Formato DD/MM/YYYY
  const match = fecha.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (match) return `${match[3]}-${match[2].padStart(2, '0')}`
  // Ya está en YYYY-MM o YYYY-MM-DD → tomar solo YYYY-MM
  return fecha.slice(0, 7)
}

// Respeta campos entrecomillados con comas internas
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
