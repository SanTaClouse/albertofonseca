import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alberto Fonseca — Cantautor · Escritor · Periodista',
    template: '%s | Alberto Fonseca',
  },
  description: 'Sitio oficial de Alberto Fonseca, cantautor venezolano en República Dominicana.',
  openGraph: {
    type: 'website',
    locale: 'es_DO',
    siteName: 'Alberto Fonseca',
    images: [{ url: 'https://res.cloudinary.com/dlw9ocu3b/image/upload/c_fill,w_1200,h_630,g_auto,f_jpg,q_auto/v1772291243/alberto_1.jpg_mckvel.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#0D0D0D" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
