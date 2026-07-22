import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getArtista } from '@/lib/data'

/**
 * Layout del sitio público (Navbar + Footer). El panel /admin tiene el suyo.
 * El route group (publico) no afecta las URLs.
 */
export default async function PublicoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const artista = await getArtista()

  return (
    <>
      <Navbar />
      {children}
      <Footer artista={artista} />
    </>
  )
}
