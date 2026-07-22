import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ARTISTA } from '@/lib/constants'
import type { Disco, Escrito, Presentacion, VideoDestacado, SiteConfig } from '@/types'
import type { DiscoRow, EscritoRow, PresentacionRow, VideoRow, ConfigRow } from '@/types/db'

/**
 * Lecturas públicas del sitio (sin cookies ni sesión, así las páginas
 * siguen siendo estáticas/ISR). Todas devuelven datos vacíos o defaults
 * si Supabase no responde — el sitio nunca se rompe, sirve el caché.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null

// ─── Discos ──────────────────────────────────────────────────────────

function mapDisco(row: DiscoRow): Disco {
  return {
    slug: row.slug,
    titulo: row.titulo,
    año: row.anio,
    canciones: row.canciones,
    descripcion: row.descripcion,
    spotifyEmbedId: row.spotify_embed_id,
    portada: row.portada_url,
    proximamente: row.proximamente,
  }
}

export const getDiscos = cache(async (): Promise<Disco[]> => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('discos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) throw error
    return (data as DiscoRow[]).map(mapDisco)
  } catch (error) {
    console.error('Error fetching discos:', error)
    return []
  }
})

// ─── Escritos ────────────────────────────────────────────────────────

function mapEscrito(row: EscritoRow): Escrito {
  return {
    id: row.id,
    titulo: row.titulo,
    fecha: row.fecha,
    resumen: row.resumen,
    contenido: row.contenido,
    imagen_url: row.imagen_url ?? undefined,
    activo: row.activo,
  }
}

export const getEscritos = cache(async (): Promise<Escrito[]> => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('escritos')
      .select('*')
      .eq('activo', true)
      .neq('titulo', '')
      .order('fecha', { ascending: false })
      .order('id', { ascending: false })
    if (error) throw error
    return (data as EscritoRow[]).map(mapEscrito)
  } catch (error) {
    console.error('Error fetching escritos:', error)
    return []
  }
})

// ─── Presentaciones ──────────────────────────────────────────────────

export const getPresentaciones = cache(async (): Promise<Presentacion[]> => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('presentaciones')
      .select('*')
      .eq('activo', true)
      .order('fecha', { ascending: true })
    if (error) throw error
    return (data as PresentacionRow[]).map((row) => ({
      fecha: row.fecha,
      lugar: row.lugar,
      ciudad: row.ciudad,
      hora: row.hora,
      link_entradas: row.link_entradas ?? undefined,
      activo: row.activo,
    }))
  } catch (error) {
    console.error('Error fetching presentaciones:', error)
    return []
  }
})

// ─── Videos destacados ───────────────────────────────────────────────

export const getVideos = cache(async (): Promise<VideoDestacado[]> => {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('activo', true)
      .neq('youtube_id', '')
      .order('orden', { ascending: true })
    if (error) throw error
    return (data as VideoRow[]).map((row) => ({
      youtubeId: row.youtube_id,
      titulo: row.titulo,
    }))
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
})

// ─── Configuración del sitio (textos, contacto, redes) ───────────────

const CONFIG_DEFAULTS: SiteConfig = { ...ARTISTA, sobreMi: '' }

export const getArtista = cache(async (): Promise<SiteConfig> => {
  if (!supabase) return CONFIG_DEFAULTS
  try {
    const { data, error } = await supabase.from('config').select('*')
    if (error) throw error

    const valores = Object.fromEntries(
      (data as ConfigRow[]).map((row) => [row.clave, row.valor])
    )

    return {
      ...CONFIG_DEFAULTS,
      tagline: valores.tagline ?? CONFIG_DEFAULTS.tagline,
      sobreMi: valores.sobre_mi ?? '',
      email: valores.email ?? CONFIG_DEFAULTS.email,
      whatsapp: valores.whatsapp ?? CONFIG_DEFAULTS.whatsapp,
      youtube: valores.youtube ?? CONFIG_DEFAULTS.youtube,
      spotify: valores.spotify ?? CONFIG_DEFAULTS.spotify,
      instagram: valores.instagram ?? CONFIG_DEFAULTS.instagram,
      facebook: valores.facebook ?? CONFIG_DEFAULTS.facebook,
    }
  } catch (error) {
    console.error('Error fetching config:', error)
    return CONFIG_DEFAULTS
  }
})
