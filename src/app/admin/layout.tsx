import type { Metadata } from 'next'

// El panel nunca debe aparecer en buscadores
export const metadata: Metadata = {
  title: 'Panel de administración',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
