export interface Disco {
  slug: string
  titulo: string
  año: number
  canciones: number | null
  descripcion: string
  spotifyEmbedId: string | null
  portada: string | null
  proximamente?: boolean
}

export interface VideoDestacado {
  youtubeId: string
  titulo: string
}

export interface Presentacion {
  fecha: string        // YYYY-MM-DD
  lugar: string
  ciudad: string
  hora: string
  link_entradas?: string
  activo: boolean
}

export interface Escrito {
  id: number
  titulo: string
  fecha: string        // YYYY-MM
  extracto: string
  contenido: string
  imagen_url?: string
  activo: boolean
}

export interface ArtistaInfo {
  nombre: string
  descripcion: string
  tagline: string
  email: string
  whatsapp: string
  youtube: string
  spotify: string
  instagram: string
  facebook: string
}
