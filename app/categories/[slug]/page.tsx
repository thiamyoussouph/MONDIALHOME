'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Star, ArrowLeft } from 'lucide-react'
import { categories as siteCategories } from '@/lib/categories' // ✅ source unique des catégories

type CategoryData = {
  name: string
  description: string
  hero: string
}

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

/**
 * ⚠️ Si tu utilises des images distantes (Unsplash, etc.),
 * pense à whitelister le domaine dans next.config.js:
 * images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
 */

// --- Produits (IDs uniques + slugs alignés sur le menu)
const allProducts: Product[] = [
  { id: 1, name: 'SALON RIHTIM', description: "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.", price: null, originalPrice: null, image: '/images/SALLRIHTIM.png', category: 'Salon', slug: 'salons-modernes', rating: 4.8, reviews: 24, badge: 'Promo', inStock: true },
  { id: 2, name: 'SALON NOBEL', description: "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.", price: null, originalPrice: null, image: '/images/Sallenobele.png', category: 'Salon', slug: 'salons-modernes', rating: 4.6, reviews: 18, badge: 'Nouveau', inStock: true },
  { id: 3, name: 'SALON - LION', description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)", price: null, originalPrice: null, image: '/images/salonlion.jpeg', category: 'Salon', slug: 'salons-modernes', rating: 4.9, reviews: 31, badge: null, inStock: true },
  { id: 4, name: 'SALON - LOFT', description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)", price: null, originalPrice: null, image: '/images/salonloft.png', category: 'Salon', slug: 'salons-modernes', rating: 4.5, reviews: 12, badge: null, inStock: true },
  { id: 5, name: 'Chambre à coucher NEPTUNE', description: "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir", price: null, originalPrice: null, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop', category: 'Chambre', slug: 'chambre-coucher', rating: 4.7, reviews: 42, badge: 'Promo', inStock: true },
  { id: 6, name: 'LIFESTYLE', description: " Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards.Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.", price: null, originalPrice: null, image: '/images/chambreacoucher.jpeg', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 7, name: 'BLOCK', description: " Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards.Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.", price: null, originalPrice: null, image: '/images/litblock.png', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 8, name: 'Bureau Moderne', description: "Bureau minimaliste et fonctionnel, idéal pour vos journées de travail.", price: null, originalPrice: null, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', category: 'Bureau', slug: 'bureau', rating: 4.8, reviews: 22, badge: null, inStock: true },
  { id: 9, name: 'Salle à manger NOBEL', description: "Salle à manger complète : table 6 places + 6 chaises + Buffet + Miroir.", price: null, originalPrice: null, image: '/images/salleamangenobel.png', category: 'Salle à Manger', slug: 'salle-manger', rating: 4.9, reviews: 35, badge: null, inStock: true },
  { id: 10, name: 'Salle à manger RIHTIM', description: "Salle à manger complète : table 6 places + 6 chaises + Buffet + Miroir.", price: null, originalPrice: null, image: '/images/alleamangerithmi.png', category: 'Salle à Manger', slug: 'salle-manger', rating: 4.9, reviews: 35, badge: null, inStock: true },
  { id: 11, name: 'Chambre à coucher RIHTIM', description: "ffComposée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir. Dimensions : 180 x 200", price: null, originalPrice: null, image: '/images/rithmichambres.png', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 12, name: 'Chambre à coucher MILANO', description: "Composée de 8 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir", price: null, originalPrice: null, image: '/images/milanochambre.png', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 13, name: 'Chambre à coucher ETHNA', description: "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir", price: null, originalPrice: null, image: '/images/site_photo_03.jpg', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 14, name: 'Chambre à coucher NOBEL', description: "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir", price: null, originalPrice: null, image: '/images/NOBEL.png', category: 'Chambre', slug: 'chambre-coucher', rating: 4.6, reviews: 28, badge: 'Nouveau', inStock: true },
  { id: 15, name: 'SALON PARIS', description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)", price: null, originalPrice: null, image: '/images/salonesli.png', category: 'Salon', slug: 'salons-modernes', rating: 4.7, reviews: 15, badge: null, inStock: true },
  { id: 16, name: 'SALON ESLI', description: "en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)", price: null, originalPrice: null, image: '/images/salonparis.png', category: 'Salon', slug: 'salons-modernes', rating: 4.7, reviews: 15, badge: null, inStock: true },
  { id: 17, name: 'Meuble TV 180cm', description: "Meuble télé moderne finition chêne + laqué.", price: null, originalPrice: null, image: '/images/meubletele.jpg', category: 'Salon', slug: 'meuble-tele', rating: 4.5, reviews: 12, badge: null, inStock: true },
  { id: 18, name: 'Matelas Orthopédique DIDIM', description: "Épaisseur : 28cm — Dimensions : 180/200.", price: null, originalPrice: null, image: '/images/matelas.jpeg', category: 'Chambre', slug: 'matelas', rating: 4.8, reviews: 22, badge: 'Nouveau', inStock: true },
  { id: 19, name: 'Matelas Orthopédique SELTA', description: "Coffre fort intégré — Dimensions : 140/190, 160/200, 180/200.", price: null, originalPrice: null, image: '/images/HOST23.jpeg', category: 'Chambre', slug: 'matelas', rating: 4.8, reviews: 22, badge: 'Nouveau', inStock: true },
  { id: 20, name: 'Porte Intérieure Chêne', description: "Charnières invisibles, design minimal.", price: null, originalPrice: null, image: '/images/porteblindé.jpeg', category: 'Portes', slug: 'portes-interieures', rating: 4.6, reviews: 28, badge: null, inStock: true },
  { id: 21, name: 'Porte Blindée un battant — GRISE', description: "Hauteur : 210cm — Largeur : 90–100cm.", price: null, originalPrice: null, image: '/images/posteblindé1.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 22, name: 'Porte Blindée un battant — OCRE', description: "Hauteur : 210cm — Largeur : 90–100cm.", price: null, originalPrice: null, image: '/images/porteblinde2.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 23, name: 'Porte Blindée un battant — 801', description: "Hauteur : 210cm — Largeur : 90–100cm.", price: null, originalPrice: null, image: '/images/blinde3.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 24, name: 'Porte Blindée un battant — Marron/Noir', description: "Hauteur : 210cm — Largeur : 90–100cm.", price: null, originalPrice: null, image: '/images/blinde4.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 25, name: 'Porte Blindée double battants — 801 (sans vitre)', description: "Hauteur : 210–215cm — Largeur : 130cm.", price: null, originalPrice: null, image: '/images/blindesansvitre.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 26, name: 'Porte Blindée double battants — OCRE', description: "Hauteur : 210–215cm — Largeur : 130cm.", price: null, originalPrice: null, image: '/images/doublebatant.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 27, name: 'Porte Blindée double battants — Marron/Noir', description: "Hauteur : 210–215cm — Largeur : 130cm.", price: null, originalPrice: null, image: '/images/porteblinddouble.jpeg', category: 'Portes', slug: 'portes-blindees', rating: 4.7, reviews: 18, badge: 'Premium', inStock: true },
  { id: 28, name: 'Tapis Berbère 200x300', description: "Laine naturelle, tissé main.", price: null, originalPrice: null, image: '/images/tapis.jpg', category: 'Décoration', slug: 'tapis', rating: 4.7, reviews: 15, badge: null, inStock: true }
]

// Filtres prix
const filters = {
  priceRanges: [
    { label: 'Moins de 200 000 CFA', min: 0, max: 200000 },
    { label: '200 000 - 300 000 CFA', min: 200000, max: 300000 },
    { label: '300 000 - 400 000 CFA', min: 300000, max: 400000 },
    { label: 'Plus de 400 000 CFA', min: 400000, max: Infinity }
  ]
}

const nf = new Intl.NumberFormat('fr-FR')

export default function CategoryPage() {
  const params = useParams()
  const slugParam = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string | undefined)
  const slug = slugParam ?? ''

  // --- Catégorie issue de la source partagée
  const category: CategoryData | null = useMemo(() => {
    if (!slug) return null
    const found = siteCategories.find(c => c.slug === slug)
    return found
      ? { name: found.name, description: found.description, hero: found.image }
      : { name: 'Catégorie introuvable', description: 'La catégorie demandée n’existe pas.', hero: '/images/placeholder-hero.jpg' }
  }, [slug])

  // UI
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Filtres
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('') // label
  const [includeSurDevis, setIncludeSurDevis] = useState<boolean>(true)    // ✅ inclure les prix null
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [promoOnly, setPromoOnly] = useState(false)

  const isLoading = !slug || !category
  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    )
  }

  const isUnknown = category.name === 'Catégorie introuvable'

  // Produits de la catégorie courante (basés sur le slug)
  const categoryProducts = allProducts.filter(p => p.slug === slug)

  // Catégories disponibles (dynamiques selon les produits trouvés)
  const availableCategories = Array.from(new Set(categoryProducts.map(p => p.category)))

  // --- Pipeline de filtrage
  let filteredProducts = [...categoryProducts]

  // Prix
  if (selectedPriceRange) {
    const range = filters.priceRanges.find(r => r.label === selectedPriceRange)
    if (range) {
      filteredProducts = filteredProducts.filter(p => {
        if (p.price === null) return includeSurDevis // ✅ garde les "sur devis" si coché
        return p.price >= range.min && p.price <= range.max
      })
    }
  } else if (!includeSurDevis) {
    // Sans tranche sélectionnée mais "sur devis" décoché => exclure les null
    filteredProducts = filteredProducts.filter(p => p.price !== null)
  }

  // Catégorie(s)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category))
  }

  // Note minimale
  if (minRating !== null) {
    filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
  }

  // Disponibilité
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.inStock)
  }

  // Promotion
  if (promoOnly) {
    filteredProducts = filteredProducts.filter(p => (p.badge || '').toLowerCase() === 'promo')
  }

  // Tri
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price ?? Infinity) - (b.price ?? Infinity)
      case 'price-desc':
        return (b.price ?? -Infinity) - (a.price ?? -Infinity)
      case 'rating':
        return b.rating - a.rating
      case 'popular':
      default:
        if (b.reviews !== a.reviews) return b.reviews - a.reviews
        return b.rating - a.rating
    }
  })

  // Helpers
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => (prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]))
  }

  const resetFilters = () => {
    setSelectedPriceRange('')
    setIncludeSurDevis(true)
    setSelectedCategories([])
    setMinRating(null)
    setInStockOnly(false)
    setPromoOnly(false)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-64 bg-gray-900 overflow-hidden">
        <Image
          src={category.hero}
          alt={category.name}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg text-white/90">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Section produits */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Catégorie inconnue */}
          {isUnknown && (
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center mb-10">
              <p className="text-gray-700 mb-4">La catégorie demandée n’existe pas ou a été renommée.</p>
              <Link href="/#categories" className="text-accent font-semibold underline">Voir toutes les catégories</Link>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filtres */}
            <div className={`lg:col-span-1 ${filteredProducts.length ? (showFilters ? 'block' : 'hidden lg:block') : 'hidden'} mb-8 lg:mb-0`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 sticky top-8"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-indigo-600" />
                  Filtres
                </h3>

                {/* Prix */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Gamme de Prix</h4>
                  <div className="space-y-3">
                    {filters.priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.label}
                          checked={selectedPriceRange === range.label}
                          onChange={(e) => setSelectedPriceRange(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                    <button
                      onClick={() => setSelectedPriceRange('')}
                      className="mt-2 text-xs underline text-gray-500 hover:text-gray-700"
                    >
                      Effacer la gamme de prix
                    </button>

                    <label className="mt-3 flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSurDevis}
                        onChange={() => setIncludeSurDevis(v => !v)}
                        className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        Inclure “Sur devis”
                      </span>
                    </label>
                  </div>
                </div>

                {/* Catégories (internes à la page) */}
                {availableCategories.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Catégories</h4>
                    <div className="space-y-3">
                      {availableCategories.map((cat) => (
                        <label key={cat} className="flex items-center group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note mini */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Note minimum</h4>
                  <div className="space-y-3">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className="ml-3 flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          <Star className="w-4 h-4 mr-1 text-amber-400 fill-current" />
                          {rating} et plus
                        </span>
                      </label>
                    ))}
                    <button
                      onClick={() => setMinRating(null)}
                      className="mt-2 text-xs underline text-gray-500 hover:text-gray-700"
                    >
                      Effacer la note minimum
                    </button>
                  </div>
                </div>

                {/* Disponibilité */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Disponibilité</h4>
                  <div className="space-y-3">
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(v => !v)}
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
                        onChange={() => setPromoOnly(v => !v)}
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
                  Réinitialiser tous les filtres
                </button>
              </motion.div>
            </div>

            {/* Produits */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold">{filteredProducts.length} produits</h2>

                <div className="flex items-center space-x-4">
                  {filteredProducts.length > 0 && (
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                    </button>
                  )}

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="border rounded-lg px-4 py-2"
                  >
                    <option value="popular">Populaires</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                  </select>

                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-pressed={viewMode === 'grid'}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-gray-50'}`}
                    >
                      <Grid className="w-4 h-4" />
                      <span className="sr-only">Vue grille</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-pressed={viewMode === 'list'}
                      className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                      <span className="sr-only">Vue liste</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Grille/Liste */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                  <motion.article
                    key={product.id} // ✅ clé stable
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-accent/30 transform hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image || '/images/placeholder-product.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
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
                            <span className="text-xs text-accent font-bold uppercase tracking-wider">{product.category}</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-accent transition-colors leading-tight">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mt-3 leading-relaxed text-sm line-clamp-3">
                              {product.description ?? 'Meuble de qualité supérieure pour votre intérieur'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="space-y-1">
                              {/* Prix actuel */}
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

                              {/* Rating */}
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.reviews} avis)</span>
                              </div>
                            </div>

                            <Link
                              href={`/produits/${product.id}`}
                              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 font-bold text-sm"
                              aria-label={`Voir plus sur ${product.name}`}
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

              {/* Aucun résultat */}
              {filteredProducts.length === 0 && !isUnknown && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-4">Modifiez vos critères de recherche</p>
                  <button onClick={resetFilters} className="bg-accent text-white px-4 py-2 rounded-lg">
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
