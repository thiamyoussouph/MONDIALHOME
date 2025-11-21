import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// --- TES MÉTADONNÉES (Je les garde intactes) ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  alternates: { canonical: '/' },
  title: { default: 'Mondialehome - Meilleur Magasin de Meubles au Sénégal | Dakar', template: '%s | Mondialehome Sénégal' },
  description: "Mondialehome : N°1 des meubles de qualité au Sénégal. Salon, chambre, bureau, tables. Showroom 500m² à Dakar. Livraison gratuite.",
  keywords: ['meubles sénégal', 'mobilier dakar', 'magasin meubles dakar', 'mondialehome', 'salon sénégal', 'chambre coucher dakar', 'canapé dakar', 'lit sénégal', 'armoire dakar', 'meubles plateau dakar', 'meubles almadies', 'showroom meubles dakar', 'livraison meubles dakar'],
  authors: [{ name: 'Mondialehome Sénégal' }],
  creator: 'Mondialehome',
  publisher: 'Mondialehome Sénégal',
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://mondialehomesn.com',
    siteName: 'Mondialehome Sénégal',
    title: 'Mondialehome - N°1 des Meubles de Qualité au Sénégal',
    description: 'Découvrez notre showroom de 500m² à Dakar.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Showroom Mondialehome Dakar' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mondialehome_sn',
    creator: '@mondialehome_sn',
    title: 'Mondialehome - N°1 des Meubles de Qualité au Sénégal',
    description: 'Showroom 500m² à Dakar.',
    images: ['/images/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: {
    'geo.region': 'SN-DK',
    'geo.placename': 'Dakar, Sénégal',
    'geo.position': '14.6928;-17.4467',
  },
  verification: {
    google: 'G-5F1EV734MH',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  category: 'Ameublement',
  classification: 'Magasin de meubles',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* JSON-LD pour le SEO Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://mondialehomesn.com/#business",
                  "name": "Mondialehome",
                  "telephone": "+221784514040",
                  "image": ["https://mondialehomesn.com/images/showroom-1.jpg"],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Parcelle en face de l'arrêt BRT Police Parcelles",
                    "addressLocality": "Dakar",
                    "addressCountry": "SN"
                  },
                  "priceRange": "$$",
                  "openingHoursSpecification": [
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "19:00" },
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "19:00" },
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "09:00", "closes": "17:00" }
                  ]
                }
              ]
            })
          }}
        />
      </head>

      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`} suppressHydrationWarning>
        {/* ⚠️ IMPORTANT : Pas de Header ni Footer ici ! */}
        {children}
      </body>

      <GoogleAnalytics gaId="G-5F1EV734MH" />
    </html>
  )
}