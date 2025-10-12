// app/produits/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, Star, ArrowLeft } from 'lucide-react'

// ✅ Type manquant
type Product = {
  id: number
  name: string
  description?: string
  price: number | null
  originalPrice: number | null
  image: string
  category: string
  slug: string
  rating: number
  reviews: number
  badge: string | null
  inStock: boolean
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'SALON RIHTIM ',
    description: "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/SALLRIHTIM.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.8,
    reviews: 24,
    badge: 'Promo',
    inStock: true
  },
  {
    id: 2,
    name: 'SALON NOBEL',
    description: "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/Sallenobele.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 3,
    name: 'SALON - LION ',
    description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)",
    price: null,
    originalPrice: null,
    image: '/images/salonlion.jpeg',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.9,
    reviews: 31,
    badge: null,
    inStock: true
  },
  {
    id: 4,
    name: 'SALON - LOFT ',
    description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)",
    price: null,
    originalPrice: null,
    image: '/images/salonloft.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.5,
    reviews: 12,
    badge: null,
    inStock: true
  },
  {
    id: 5,
    name: 'Chambre à coucher NEPTUNE',
    description: " Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.7,
    reviews: 42,
    badge: 'Promo',
    inStock: true
  },
  {
    id: 6,
    name: 'LIFESTYLE',
    description: " Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards. Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.",
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },{
    id: 60,
    name: 'BLOCK',
    description: " Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards.  Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.",
    price: null,
    originalPrice: null,
    image: '/images/litblock.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 7,
    name: 'Bureau Moderne',
    description: "Bureau minimaliste et fonctionnel, idéal pour vos journées de travail.",
    price: null,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
    category: 'Bureau',
    slug: 'bureau',
    rating: 4.8,
    reviews: 22,
    badge: null,
    inStock: true
  },
  {
    id: 58,
    name: ' NOBEL',
    description: "une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/salleamangenobel.png',
    category: 'Salle à Manger',
    slug: 'salle-manger',
    rating: 4.9,
    reviews: 35,
    badge: null,
    inStock: true
  },{
    id: 59, // ← corrigé (était 58)
    name: 'RIHTIM',
    description: "une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/alleamangerithmi.png',
    category: 'Salle à Manger',
    slug: 'salle-manger',
    rating: 4.9,
    reviews: 35,
    badge: null,
    inStock: true
  },
  {
    id: 9,
    name: 'Chambre à coucher RIHTIM',
    description :"Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir.Dimensions : largeur 180 - Longueur 200",
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher1.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },  {
    id: 17,
    name: 'Chambre à coucher MILANO',
    description :"Composée de 8 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/CHAMBRETESTE.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 11,
    name: 'Chambre à coucher ETHNA',
    description :"Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/site_photo_03.jpg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  }
  ,
  {
    id: 44,
    name: 'Chambre à coucher NOBEL',
    description :"Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/NOBEL.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 10,
   name: 'SALON PARIS  ',
    description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)",
    price: null,
    originalPrice: null,
    image: '/images/salonesli.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.7,
    reviews: 15,
    badge: null,
    inStock: true
  } ,{
    id: 51,
   name: 'SALON ESLI ',
    description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)",
    price: null,
    originalPrice: null,
    image: '/images/salonparis.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.7,
    reviews: 15,
    badge: null,
    inStock: true
  },
  {
    id: 12,
    name: 'Meuble TV 180cm',
    description: "Meuble télé moderne finition chêne + laqué.",
    price: null,
    originalPrice: null,
    image: '/images/meubletele.jpg',
    category: 'Salon',
    slug: 'meuble-tele',
    rating: 4.5,
    reviews: 12,
    badge: null,
    inStock: true
  },
  {
    id: 13,
    name: 'Matelas Orthopédique  ',
    description: "modèle DIDIM Épaisseur : 28cm Dimensions : 180/200.",
    price: null,
    originalPrice: null,
    image: '/images/matelas.jpeg',
    category: 'Chambre',
    slug: 'matelas',
    rating: 4.8,
    reviews: 22,
    badge: 'Nouveau',
    inStock: true
  },  {
    id: 42,
    name: 'Matelas Orthopédique  ',
    description: "modèle SELTA Coffre fort intégré Dimensions : 160/200 Dimensions : 180/200.Dimensions : 140/190",
    price: null,
    originalPrice: null,
    image: '/images/HOST23.jpeg',
    category: 'Chambre',
    slug: 'matelas',
    rating: 4.8,
    reviews: 22,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 40,
    name: 'Porte Intérieure Chêne',
    description: "Charnières invisibles, design minimal.",
    price: null,
    originalPrice: null,
    image: '/images/porteblindé.jpeg',
    category: 'Portes',
    slug: 'portes-interieures',
    rating: 4.6,
    reviews: 28,
    badge: null,
    inStock: true
  },
  {
    id: 15,
    name: 'Porte Blindée un battant',
    description: " Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : GRISE",
    price: null,
    originalPrice: null,
    image: '/images/posteblindé1.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 30,
    name: 'Porte Blindée un battant',
    description: " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : OCRE",
    price: null,
    originalPrice: null,
    image: '/images/porteblinde2.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },  {
    id: 31,
    name: 'Porte Blindée un battant',
    description: " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : 801",
    price: null,
    originalPrice: null,
    image: '/images/blinde3.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },  {
    id: 33,
    name: 'Porte Blindée un battant',
    description: " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : Marron - Noir",
    price: null,
    originalPrice: null,
    image: '/images/blinde4.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  }, {
    id: 34,
    name: 'Porte Blindée double battants',
    description: " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : 801 sans Vitre",
    price: null,
    originalPrice: null,
    image: '/images/blindesansvitre.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },{
    id: 35, // ← corrigé (était 34)
    name: 'Porte Blindée double battants',
    description: " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : OCRE",
    price: null,
    originalPrice: null,
    image: '/images/doublebatant.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },{
    id: 36, // ← corrigé (était 34)
    name: 'Porte Blindée double battants',
    description: " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : 801 sans Vitre",
    price: null,
    originalPrice: null,
    image: '/images/doublebatant.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },{
    id: 37, // ← corrigé (était 34)
    name: 'Porte Blindée double battants',
    description: " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : Marron - Noir",
    price: null,
    originalPrice: null,
    image: '/images/porteblinddouble.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 16,
    name: 'Tapis Berbère 200x300',
    description: "Laine naturelle, tissé main.",
    price: null,
    originalPrice: null,
    image: '/images/tapis.jpg',
    category: 'Décoration',
    slug: 'tapis',
    rating: 4.7,
    reviews: 15,
    badge: null,
    inStock: true
  }
]

// Filtres
const filters = {
  categories: ['Salon', 'Chambre', 'Bureau', 'Salle à Manger'],
  priceRanges: [
    { label: 'Moins de 200 000 CFA', min: 0, max: 200000 },
    { label: '200 000 - 300 000 CFA', min: 200000, max: 300000 },
    { label: '300 000 - 400 000 CFA', min: 300000, max: 400000 },
    { label: 'Plus de 400 000 CFA', min: 400000, max: Infinity }
  ]
}

const nf = new Intl.NumberFormat('fr-FR')

export default function ProduitsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [includeSurDevis, setIncludeSurDevis] = useState<boolean>(true) // ✅ garder prix null si souhaité
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [promoOnly, setPromoOnly] = useState(false)
  const [productsToShow, setProductsToShow] = useState(6)

  let filteredProducts = [...allProducts]

  // Filtre par prix (compatible prix null)
  if (selectedPriceRange) {
    const priceRange = filters.priceRanges.find(range => range.label === selectedPriceRange)
    if (priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        if (product.price === null) return includeSurDevis
        return product.price >= priceRange.min && product.price <= priceRange.max
      })
    }
  } else if (!includeSurDevis) {
    filteredProducts = filteredProducts.filter(p => p.price !== null)
  }

  // Filtre par catégories
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      selectedCategories.includes(product.category)
    )
  }

  // Filtre par note
  if (selectedRating !== null) {
    filteredProducts = filteredProducts.filter(product => product.rating >= selectedRating)
  }

  // Filtre en stock uniquement
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter(product => product.inStock)
  }

  // Filtre promotion uniquement
  if (promoOnly) {
    filteredProducts = filteredProducts.filter(product => (product.badge || '').toLowerCase() === 'promo')
  }

  // Tri (compatible prix null)
  switch (sortBy) {
    case 'price-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
      break
    case 'price-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
      break
    case 'rating':
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
      break
    default:
      // 'popular' : par nb d'avis puis rating
      filteredProducts = [...filteredProducts].sort((a, b) => {
        if (b.reviews !== a.reviews) return b.reviews - a.reviews
        return b.rating - a.rating
      })
      break
  }

  // Limiter le nombre de produits affichés
  const displayedProducts = filteredProducts.slice(0, productsToShow)
  const hasMoreProducts = filteredProducts.length > productsToShow

  const resetFilters = () => {
    setSelectedPriceRange('')
    setIncludeSurDevis(true)
    setSelectedCategories([])
    setSelectedRating(null)
    setInStockOnly(false)
    setPromoOnly(false)
    setProductsToShow(6)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop"
            alt="Tous nos produits"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Retour à l'accueil</span>
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Tous nos Meubles
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Découvrez notre collection complète de meubles de qualité
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section produits */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            
            {/* Filtres */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'} mb-8 lg:mb-0`}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sticky top-8"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-accent" />
                  Filtres
                </h3>
                
                {/* Filtre par Prix */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Gamme de Prix</h4>
                  <div className="space-y-3">
                    {filters.priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.label}
                          checked={selectedPriceRange === range.label}
                          onChange={(e) => setSelectedPriceRange(e.target.value)}
                          className="text-accent focus:ring-accent focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                    <label className="mt-3 flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSurDevis}
                        onChange={() => setIncludeSurDevis(v => !v)}
                        className="text-accent focus:ring-accent focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        Inclure “Sur devis”
                      </span>
                    </label>
                  </div>
                </div>

                {/* Filtre par Catégorie */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Catégories</h4>
                  <div className="space-y-3">
                    {filters.categories.map((category, index) => (
                      <label key={index} className="flex items-center group cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="text-accent focus:ring-accent focus:ring-2 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtre par Note */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Note minimum</h4>
                  <div className="space-y-3">
                    {[4.5, 4.0, 3.5, 3.0].map((rating, index) => (
                      <label key={index} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                          className="text-accent focus:ring-accent focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            {rating} & plus
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtre par Disponibilité */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Disponibilité</h4>
                  <div className="space-y-3">
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        En stock seulement
                      </span>
                    </label>
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={promoOnly}
                        onChange={(e) => setPromoOnly(e.target.checked)}
                        className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        En promotion
                      </span>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={resetFilters}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            </div>

            {/* Produits */}
            <div className="lg:col-span-4">
              
              {/* Toolbar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 space-y-4 sm:space-y-0"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-3xl font-extrabold text-indigo-600">{displayedProducts.length}</span>
                    <span className="ml-2 text-gray-600">sur {filteredProducts.length} produits</span>
                  </h2>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-6 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
                  >
                    <option value="popular">Les plus populaires</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                  </select>

                  <div className="flex bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-pressed={viewMode === 'grid'}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                          : 'hover:bg-white/50 text-gray-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-pressed={viewMode === 'list'}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                          : 'hover:bg-white/50 text-gray-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Cartes produits */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {displayedProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-accent/30 transform hover:-translate-y-2">

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image || "/images/placeholder-product.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {product.badge && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 text-xs font-bold rounded-full shadow-lg">
                              {product.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="p-8">
                        <div className="space-y-4">
                          <div>
                            <span className="text-xs text-accent font-bold uppercase tracking-wider">
                              {product.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-accent transition-colors leading-tight">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                              Meuble de qualité supérieure pour votre intérieur
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="space-y-1">
                              {/* Prix */}
                              {product.price !== null ? (
                                <div className="text-2xl font-bold text-gray-900">
                                  {nf.format(product.price)}
                                  <span className="text-sm text-gray-500 ml-1 font-medium">CFA</span>
                                </div>
                              ) : (
                                <div className="text-sm font-semibold text-gray-700">Sur devis</div>
                              )}
                              {/* Ancien prix */}
                              {product.originalPrice !== null && (
                                <div className="text-sm text-gray-400 line-through">
                                  {nf.format(product.originalPrice)} CFA
                                </div>
                              )}
                              {/* Note */}
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.reviews} avis)</span>
                              </div>
                            </div>

                            <Link
                              href={`/produits/${product.id}`}
                              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 font-bold text-sm"
                            >
                              Voir Plus
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Bouton "Voir plus" */}
              {hasMoreProducts && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-12"
                >
                  <button
                    onClick={() => setProductsToShow(prev => prev + 6)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Voir plus de produits ({filteredProducts.length - productsToShow} restants)
                  </button>
                </motion.div>
              )}

              {/* Aucun résultat */}
              {displayedProducts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Filter className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">Aucun produit trouvé</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">Aucun produit ne correspond à vos critères de recherche actuels</p>
                    <button 
                      onClick={resetFilters}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
