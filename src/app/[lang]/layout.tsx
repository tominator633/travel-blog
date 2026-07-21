// app/[lang]/layout.tsx
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import Header from '@/src/components/Header/Header' 
import Footer from "@/src/components/Footer/Footer";
import '../globals.css' // Cesta vede o úroveň výš do kořene app/

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'T-Rex on the go',
  description:
    'Field notes, photos, and stories from trips around the world. One journey at a time.',
  generator: 'v0.app',
  openGraph: {
    title: 'T-Rex on the go',
    description:
      'Field notes, photos, and stories from trips around the world.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#16130f',
}

export default function LanguageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang} className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Footer />
      </body>
    </html>
  )
}