'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, Star, ArrowLeft } from 'lucide-react'
import { categories as siteCategories } from '@/lib/categories' // ✅ source unique des catégories

interface PageProps {
  params: Promise<{ slug: string }>
}

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

// --- Tes produits d’origine (id 11 ajouté pour éviter le doublon de 9)
// --- Produits (identiques), slugs mis à jour pour coller au Header
const allProducts: Product[] = [
  {
    id: 1,
    name: 'Canapé 3 Places Moderne',
    description: "Un canapé moderne 3 places en tissu de haute qualité, parfait pour votre salon.",
    price: 450000,
    originalPrice: 520000,
    image: '/images/salon3.jpeg',
    category: 'Salon',
    slug: 'salons-modernes', // ⬅️ ancien: salon-salle-manger
    rating: 4.8,
    reviews: 24,
    badge: 'Promo',
    inStock: true
  },
  {
    id: 2,
    name: 'Table Basse Design',
    description: "Table basse élégante en bois et métal, idéale pour compléter votre salon.",
    price: null,
    originalPrice: null,
    image: '/images/tables3.jpeg',
    category: 'Salon',
    slug: 'salons-modernes', // ⬅️ ancien: salon-salle-manger
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 3,
    name: 'Fauteuil Confort',
    description: "Fauteuil rembourré offrant un confort optimal et un design moderne.",
    price: null,
    originalPrice: null,
    image: '/images/feuteil2.jpeg',
    category: 'Salon',
    slug: 'salons-modernes', // ⬅️ ancien: salon-salle-manger (tu peux le mettre en 'salons-royaux' si tu préfères)
    rating: 4.9,
    reviews: 31,
    badge: null,
    inStock: true
  },
  {
    id: 4,
    name: 'Fauteuils Modernes',
    description: "Lot de fauteuils modernes avec accoudoirs, parfaits pour vos moments de détente.",
    price: null,
    originalPrice: null,
    image: '/images/feuteil1.jpeg',
    category: 'Salon',
    slug: 'salons-modernes', // ⬅️ ancien: salon-salle-manger
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
    name: 'Armoire 3 Portes',
    description: "Grande armoire en bois avec trois portes et espaces de rangement optimisés.",
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher.jpeg',
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
    id: 8,
    name: 'Table à Manger',
    description: "Table à manger spacieuse en bois massif pouvant accueillir jusqu’à 6 personnes.",
    price: null,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop',
    category: 'Salle à Manger',
    slug: 'salle-manger', // ⬅️ ancien: tables-chaises
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
    id: 11, // ⬅️ ancien doublon "9" corrigé pour éviter les clés React dupliquées
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
  },
  {
    id: 10,
    name: 'porteblinde',
    description: "Canapé d'angle en L avec tissu doux et coussins confortables.",
    price: null,
    originalPrice: null,
    image: '/images/porteblinde.jpeg',
    category: 'Salon',
    slug: 'salons-modernes', // ⬅️ ancien: canape-angle
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
    id: 34,
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
    id: 34,
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
    id: 34,
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

export default function CategoryPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>('')
  const [category, setCategory] = useState<CategoryData | null>(null)

  // UI
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Filtres
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')         // label
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])       // multiple
  const [minRating, setMinRating] = useState<number | null>(null)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [promoOnly, setPromoOnly] = useState(false)

  // ⚡ Récupère le slug puis mappe sur la source partagée
  useEffect(() => {
    params.then((resolved) => {
      const s = resolved.slug
      setSlug(s)

      const found = siteCategories.find(c => c.slug === s)
      if (found) {
        setCategory({
          name: found.name,
          description: found.description,
          hero: found.image // on utilise l'image de la catégorie comme hero
        })
      } else {
        // Catégorie inconnue => on met une valeur par défaut
        setCategory({
          name: 'Catégorie introuvable',
          description: 'La catégorie demandée n’existe pas.',
          hero: '/images/placeholder-hero.jpg'
        })
      }
    })
  }, [params])

  // ✅ Toujours calculé AVANT un return conditionnel
  const isLoading = !slug || !category
  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  // ✅ Plus de Hook ici : simple valeur dérivée -> aucun risque d’ordre des Hooks
  const isUnknown = category.name === 'Catégorie introuvable'

  // Produits de la catégorie courante (basés sur le slug)
  const categoryProducts = allProducts.filter(p => p.slug === slug)

  // Catégories disponibles (dynamiques selon les produits trouvés)
  const availableCategories = Array.from(new Set(categoryProducts.map(p => p.category)))

  // Pipeline de filtrage
  let filteredProducts = [...categoryProducts]

  // Prix
  if (selectedPriceRange) {
    const range = filters.priceRanges.find(r => r.label === selectedPriceRange)
    if (range) {
      filteredProducts = filteredProducts.filter(p =>
        p.price !== null && p.price >= range.min && p.price <= range.max
      )
    }
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
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const resetFilters = () => {
    setSelectedPriceRange('')
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

          {/* Si la catégorie n'existe pas */}
          {isUnknown && (
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center mb-10">
              <p className="text-gray-700 mb-4">
                La catégorie demandée n’existe pas ou a été renommée.
              </p>
              <Link href="/#categories" className="text-accent font-semibold underline">
                Voir toutes les catégories
              </Link>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">

            {/* Filtres (cachés si aucun produit) */}
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
                  </div>
                </div>

                {/* Catégories (internes à la page, pas le menu global) */}
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
                        <div className="ml-3 flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            {rating} &nbsp;et plus
                          </span>
                        </div>
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
                      className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-gray-50'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grille/List produits */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={`${product.id}-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
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
                            <p className="text-gray-600 mt-3 leading-relaxed text-sm line-clamp-3">
                              {product.description ?? "Meuble de qualité supérieure pour votre intérieur"}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="space-y-1">
                              {product.price !== null && (
                                <div className="text-2xl font-bold text-gray-900">
                                  {nf.format(product.price)}
                                  <span className="text-sm text-gray-500 ml-1 font-medium">CFA</span>
                                </div>
                              )}
                              {product.originalPrice !== null && (
                                <div className="text-sm text-gray-400 line-through">
                                  {nf.format(product.originalPrice)} CFA
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                                <span className="text-xs text-gray-500">({product.reviews} avis)</span>
                              </div>
                            </div>

                            <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 font-bold text-sm">
                              Voir Plus
                            </button>
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
                  <button
                    onClick={resetFilters}
                    className="bg-accent text-white px-4 py-2 rounded-lg"
                  >
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
