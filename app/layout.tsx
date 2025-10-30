// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // ✅ important
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),

  // ✅ canonical via API Metadata (remplace <link rel="canonical">)
  alternates: {
    canonical: '/', // sera résolu en https://mondialehomesn.com/
  },

  title: {
    default: 'Mondialehome - Meilleur Magasin de Meubles au Sénégal | Dakar',
    template: '%s | Mondialehome Sénégal'
  },
  description:
    "Mondialehome : N°1 des meubles de qualité au Sénégal. Salon, chambre, bureau, tables. Showroom 500m² à Dakar. Livraison gratuite. ✓ 15 ans d'expérience ✓ 2500+ clients satisfaits",
  keywords: [
    'meubles sénégal','mobilier dakar','magasin meubles dakar','mondialehome',
    'salon sénégal','chambre coucher dakar','tables chaises sénégal','bureau sénégal',
    'canapé dakar','lit sénégal','armoire dakar','table manger sénégal',
    'meubles plateau dakar','mobilier parcelles assainies','meubles almadies',
    'showroom meubles dakar','magasin mobilier sénégal',
    'meubles modernes sénégal','mobilier contemporain dakar','meubles design sénégal',
    'salon moderne dakar','chambre moderne sénégal',
    'livraison meubles dakar','montage meubles sénégal','garantie meubles dakar',
    'meubles pas cher sénégal','discount meubles dakar','promo meubles sénégal'
  ],
  authors: [{ name: 'Mondialehome Sénégal' }],
  creator: 'Mondialehome',
  publisher: 'Mondialehome Sénégal',

  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://mondialehomesn.com',
    siteName: 'Mondialehome Sénégal',
    title: 'Mondialehome - N°1 des Meubles de Qualité au Sénégal',
    description: 'Découvrez notre showroom de 500m² à Dakar. Plus de 2500 clients satisfaits. Salon, chambre, bureau, tables. Livraison gratuite à Dakar.',
    images: [
      {
        url: '/images/og-image.jpg', // sera résolu avec metadataBase
        width: 1200,
        height: 630,
        alt: 'Showroom Mondialehome Dakar - Meubles de Qualité',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@mondialehome_sn',
    creator: '@mondialehome_sn',
    title: 'Mondialehome - N°1 des Meubles de Qualité au Sénégal',
    description: 'Showroom 500m² à Dakar. Plus de 2500 clients satisfaits. Salon, chambre, bureau. Livraison gratuite.',
    images: ['/images/twitter-card.jpg'], // résolu via metadataBase
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

  other: {
    'geo.region': 'SN-DK',
    'geo.placename': 'Dakar, Sénégal',
    'geo.position': '14.6928;-17.4467',
  },

  verification: {
    google: 'your-google-verification-code',
  },

  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
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

        {/* Données structurées JSON-LD */}
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
                  "alternateName": "Mondiale Home Sénégal",
                  "description": "Magasin de meubles premium au Sénégal. Showroom 500m² à Dakar avec plus de 2500 clients satisfaits.",
                  "url": "https://mondialehomesn.com",
                  "telephone": "+221784514040",
                  "email": "senmondialhome@gmail.com",
                  "logo": "https://mondialehomesn.com/images/logo.png",
                  "image": [
                    "https://mondialehomesn.com/images/showroom-1.jpg",
                    "https://mondialehomesn.com/images/showroom-2.jpg"
                  ],
                  "priceRange": "$$",
                  "currenciesAccepted": "CFA",
                  "paymentAccepted": ["Cash", "Credit Card"],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Parcelle en face de l'arrêt BRT Police Parcelles",
                    "addressLocality": "Dakar",
                    "addressRegion": "Dakar",
                    "addressCountry": "SN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 14.6928,
                    "longitude": -17.4467
                  },
                  "openingHoursSpecification": [
                    { "@type": "OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens": "08:00","closes": "19:00" },
                    { "@type": "OpeningHoursSpecification","dayOfWeek": "Saturday","opens": "08:00","closes": "19:00" },
                    { "@type": "OpeningHoursSpecification","dayOfWeek": "Sunday","opens": "09:00","closes": "17:00" }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/mondialehome",
                    "https://www.instagram.com/mondialehome_sn"
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Catalogue Mondialehome",
                    "itemListElement": [
                      { "@type": "Offer","itemOffered": { "@type": "Product","name": "Meubles de salon","category": "Mobilier" } },
                      { "@type": "Offer","itemOffered": { "@type": "Product","name": "Meubles de chambre","category": "Mobilier" } },
                      { "@type": "Offer","itemOffered": { "@type": "Product","name": "Meubles de bureau","category": "Mobilier" } }
                    ]
                  },
                  "aggregateRating": { "@type": "AggregateRating","ratingValue": "4.8","reviewCount": "2500","bestRating": "5","worstRating": "1" }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mondialehomesn.com/#website",
                  "url": "https://mondialehomesn.com",
                  "name": "Mondialehome Sénégal",
                  "description": "N°1 des meubles de qualité au Sénégal",
                  "publisher": { "@id": "https://mondialehomesn.com/#business" },
                  "inLanguage": "fr-SN",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint","urlTemplate": "https://mondialehomesn.com/search?q={search_term_string}" },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />

        {/* Infos supplémentaires */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#f59e0b" />

        {/* ❌ plus besoin de <link rel="canonical">, géré par alternates */}
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
