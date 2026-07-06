import type { ArtistaInfo, Disco, VideoDestacado, Escrito } from '@/types'

export const ARTISTA: ArtistaInfo = {
  nombre: 'Alberto Fonseca',
  descripcion: 'Cantautor · Escritor · Periodista',
  tagline: '', // TODO: confirmar con el artista
  email: 'contacto@albertofonseca.com', // TODO: email de contratación
  whatsapp: '+18295709979', // TODO: número con código de país ej: +18091234567
  youtube: 'https://www.youtube.com/@AlbertoFonsecaoficial', // TODO: URL del canal
  spotify: 'https://open.spotify.com/intl-es/artist/7ccai3pF77t9Tr9jEKjCO5?si=21rQgWz5S7KVYoEHaNNLCg', // TODO: URL del perfil
  instagram: 'https://www.instagram.com/albertofonseca.ve/', // TODO: URL del perfil
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
    portada: '/images/discos/la-llave-del-alba.png',
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
    titulo: 'Brujería',
    año: 2026,
    canciones: null,
    descripcion: 'Próximamente',
    spotifyEmbedId: null,
    portada: '/images/discos/brujeria.jpeg',
    proximamente: true,
  },
]

export const ESCRITOS: Escrito[] = [
  {
    id: 1,
    titulo: '', // TODO: título del primer escrito
    fecha: '', // formato: YYYY-MM (ej: '2026-03')
    resumen: '', // texto corto que aparece en el preview de la landing
    contenido: '', // texto completo. Usar \n\n para separar párrafos
    imagen_url: '', // opcional, dejar vacío si no hay
    activo: true,
  },
  {
    id: 2,
    titulo: '', // TODO: título del segundo escrito
    fecha: '',
    resumen: '',
    contenido: '',
    imagen_url: '',
    activo: true,
  },
]

export const VIDEOS_DESTACADOS: VideoDestacado[] = [
  { youtubeId: 'zKJgjTmBgBU', titulo: 'Amor de historieta' },
  { youtubeId: 'sslkxGdtl4c', titulo: 'Yo no te olvido' },
  { youtubeId: '', titulo: '' }, // TODO: tercer video a confirmar
]
