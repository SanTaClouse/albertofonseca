import type { ArtistaInfo } from '@/types'

/**
 * Defaults del artista — el contenido editable vive en Supabase (tabla
 * `config`) y se administra desde /admin. Estos valores solo se usan como
 * respaldo si Supabase no responde (ver getArtista en src/lib/data.ts).
 */
export const ARTISTA: ArtistaInfo = {
  nombre: 'Alberto Fonseca',
  descripcion: 'Cantautor · Escritor · Periodista',
  tagline: '',
  email: 'contacto@albertofonseca.com',
  whatsapp: '+18295709979',
  youtube: 'https://www.youtube.com/@AlbertoFonsecaoficial',
  spotify: 'https://open.spotify.com/intl-es/artist/7ccai3pF77t9Tr9jEKjCO5?si=21rQgWz5S7KVYoEHaNNLCg',
  instagram: 'https://www.instagram.com/albertofonseca.ve/',
  facebook: '',
}

export const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''
