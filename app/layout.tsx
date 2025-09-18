// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meubles Sénégal - Mobilier de Qualité Premium',
  description: 'Découvrez notre collection exclusive de meubles au Sénégal : salon, chambre à coucher, bureau, tables et chaises. Qualité premium, design moderne.',
  keywords: 'meubles sénégal, mobilier dakar, salon sénégal, chambre coucher, bureau, tables chaises, discount sénégal, orca sénégal',
  authors: [{ name: 'Meubles Sénégal' }],
  openGraph: {
    title: 'Meubles Sénégal - Mobilier de Qualité Premium',
    description: 'Collection exclusive de meubles de qualité au Sénégal',
    type: 'website',
    locale: 'fr_SN',
    siteName: 'Meubles Sénégal'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FurnitureStore",
              "name": "Meubles Sénégal",
              "description": "Magasin de meubles de qualité au Sénégal",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SN",
                "addressLocality": "Dakar"
              },
              "priceRange": "$$",
              "servesCuisine": ["Furniture", "Home Decor"],
              "telephone": "+221-XX-XXX-XXXX"
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}