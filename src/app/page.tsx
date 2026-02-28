import HeroSection from '@/components/sections/HeroSection'
import SobreMiSection from '@/components/sections/SobreMiSection'
import DiscografiaSection from '@/components/sections/DiscografiaSection'
import VideosSection from '@/components/sections/VideosSection'
import PresentacionesSection from '@/components/sections/PresentacionesSection'
import EscritosPreviewSection from '@/components/sections/EscritosPreviewSection'
import ContactoSection from '@/components/sections/ContactoSection'
import { getPresentaciones, getEscritos } from '@/lib/sheets'

export default async function Home() {
  const [presentaciones, escritos] = await Promise.all([
    getPresentaciones(),
    getEscritos(),
  ])

  return (
    <main>
      <HeroSection />
      <SobreMiSection />
      <DiscografiaSection />
      <VideosSection />
      <PresentacionesSection presentaciones={presentaciones} />
      <EscritosPreviewSection escritos={escritos.slice(0, 3)} />
      <ContactoSection />
    </main>
  )
}
