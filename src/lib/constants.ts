import type { ArtistaInfo, Disco, VideoDestacado } from '@/types'

export const ARTISTA: ArtistaInfo = {
  nombre: 'Alberto Fonseca',
  descripcion: 'Cantautor · Escritor · Periodista',
  tagline: '', // TODO: confirmar con el artista
  email: '', // TODO: email de contratación
  whatsapp: '', // TODO: número con código de país ej: +18091234567
  youtube: '', // TODO: URL del canal
  spotify: '', // TODO: URL del perfil
  instagram: '', // TODO: URL del perfil
  facebook: '', // TODO: URL del perfil
}

export const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ''

export const DISCOS: Disco[] = [
  {
    slug: 'la-llave-del-alba',
    titulo: 'La llave del alba',
    año: 2005,
    canciones: 13,
    descripcion: '', // TODO: texto descriptivo del disco
    spotifyEmbedId: '4nM2Km0JcpCFQcZwv2NeBY',
    portada: '/images/discos/la-llave-del-alba.jpg', // TODO: agregar imagen
  },
  {
    slug: 'amor-de-la-historieta',
    titulo: 'Amor de la historieta',
    año: 2015,
    canciones: 13,
    descripcion: '', // TODO: texto descriptivo del disco
    spotifyEmbedId: '0LU0P5LZrTGOebJ2okwbIL',
    portada: '/images/discos/amor-de-la-historieta.jpg',
  },
  {
    slug: 'nuevo-disco-2026',
    titulo: '', // TODO: confirmar nombre con el artista
    año: 2026,
    canciones: null,
    descripcion: 'Próximamente',
    spotifyEmbedId: null,
    portada: null,
    proximamente: true,
  },
]

export const VIDEOS_DESTACADOS: VideoDestacado[] = [
  { youtubeId: 'zKJgjTmBgBU', titulo: 'Amor de historieta' },
  { youtubeId: 'sslkxGdtl4c', titulo: 'Yo no te olvido' },
  { youtubeId: '', titulo: '' }, // TODO: tercer video a confirmar
]
