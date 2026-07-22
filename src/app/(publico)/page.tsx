import HeroSection from '@/components/sections/HeroSection'
import SobreMiSection from '@/components/sections/SobreMiSection'
import DiscografiaSection from '@/components/sections/DiscografiaSection'
import VideosSection from '@/components/sections/VideosSection'
import PresentacionesSection from '@/components/sections/PresentacionesSection'
import EscritosPreviewSection from '@/components/sections/EscritosPreviewSection'
import ContactoSection from '@/components/sections/ContactoSection'
import { getArtista, getDiscos, getEscritos, getPresentaciones, getVideos } from '@/lib/data'

// ISR de respaldo — el panel admin además revalida on-demand al guardar
export const revalidate = 300

export default async function Home() {
  const [artista, discos, escritos, presentaciones, videos] = await Promise.all([
    getArtista(),
    getDiscos(),
    getEscritos(),
    getPresentaciones(),
    getVideos(),
  ])

  return (
    <main>
      <HeroSection tagline={artista.tagline} />
      <SobreMiSection sobreMi={artista.sobreMi} />
      <DiscografiaSection discos={discos} />
      <VideosSection videos={videos} youtubeUrl={artista.youtube} />
      <PresentacionesSection presentaciones={presentaciones} />
      <EscritosPreviewSection escritos={escritos.slice(0, 3)} />
      <ContactoSection artista={artista} />
    </main>
  )
}
