// Filas de las tablas de Supabase (snake_case, como están en Postgres).
// El sitio público las mapea a los tipos de '@/types' en src/lib/data.ts;
// el panel admin trabaja con estas directamente.

export interface DiscoRow {
  id: string
  slug: string
  titulo: string
  anio: number
  canciones: number | null
  descripcion: string
  spotify_embed_id: string | null
  portada_url: string | null
  proximamente: boolean
  orden: number
  activo: boolean
}

export interface EscritoRow {
  id: number
  titulo: string
  fecha: string // YYYY-MM
  resumen: string
  contenido: string
  imagen_url: string | null
  activo: boolean
  updated_at: string
}

export interface PresentacionRow {
  id: number
  fecha: string // YYYY-MM-DD
  lugar: string
  ciudad: string
  hora: string
  link_entradas: string | null
  activo: boolean
}

export interface VideoRow {
  id: number
  youtube_id: string
  titulo: string
  orden: number
  activo: boolean
}

export interface ConfigRow {
  clave: string
  valor: string
}
