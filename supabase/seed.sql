-- ═══════════════════════════════════════════════════════════════════
-- Datos iniciales — contenido actual del sitio
-- Pegar DESPUÉS de schema.sql en Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- ─── Discos (desde src/lib/constants.ts) ─────────────────────────────

insert into public.discos (slug, titulo, anio, canciones, descripcion, spotify_embed_id, portada_url, proximamente, orden) values
  ('la-llave-del-alba', 'La llave del alba', 2005, 13, '', '4nM2Km0JcpCFQcZwv2NeBY', '/images/discos/la-llave-del-alba.png', false, 1),
  ('amor-de-la-historieta', 'Amor de la historieta', 2015, 13, '', '0LU0P5LZrTGOebJ2okwbIL', '/images/discos/amor-de-la-historieta.jpg', false, 2),
  ('nuevo-disco-2026', 'Brujería', 2026, null, 'Próximamente', null, '/images/discos/brujeria.jpeg', true, 3);

-- ─── Videos destacados ───────────────────────────────────────────────

insert into public.videos (youtube_id, titulo, orden) values
  ('zKJgjTmBgBU', 'Amor de historieta', 1),
  ('sslkxGdtl4c', 'Yo no te olvido', 2);

-- ─── Presentaciones (migradas del Google Sheet) ──────────────────────

insert into public.presentaciones (fecha, lugar, ciudad, hora, link_entradas, activo) values
  ('2026-06-15', 'Teatro Nacional', 'Santo Domingo', '20:00', null, true);

-- ─── Configuración del sitio ─────────────────────────────────────────

insert into public.config (clave, valor) values
  ('tagline', 'Canciones que buscan un lugar en el mundo'),
  ('sobre_mi', 'Alberto Fonseca es un cantautor, escritor y periodista venezolano radicado en República Dominicana. Su obra transita entre la canción de autor y la literatura, construyendo un universo propio donde la palabra es el centro.
Con más de dos décadas de trayectoria, ha publicado dos álbumes — La llave del alba (2005) y Amor de la historieta (2015) — que lo posicionan como una voz íntima y singular en el panorama musical latinoamericano.'),
  ('email', 'contacto@albertofonseca.com'),
  ('whatsapp', '+18295709979'),
  ('youtube', 'https://www.youtube.com/@AlbertoFonsecaoficial'),
  ('spotify', 'https://open.spotify.com/intl-es/artist/7ccai3pF77t9Tr9jEKjCO5?si=21rQgWz5S7KVYoEHaNNLCg'),
  ('instagram', 'https://www.instagram.com/albertofonseca.ve/'),
  ('facebook', '');
