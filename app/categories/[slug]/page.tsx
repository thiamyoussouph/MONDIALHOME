// app/categories/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, Star, Heart, ShoppingCart, ArrowLeft, Eye } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

type CategoryData = {
  name: string
  description: string
  hero: string
}

const categoryData = {
  'salon-salle-manger': {
    name: 'Salon & Salle à Manger',
    description: 'Découvrez notre collection de meubles pour salon et salle à manger',
    hero: '/images/salon4.jpeg'
  },
  'chambre-coucher': {
    name: 'Chambre à Coucher', 
    description: 'Meubles de chambre pour un confort optimal',
    hero: '/images/chambreacoucher.jpeg'
  },
  'bureau': {
    name: 'Meubles de Bureau',
    description: 'Créez votre espace de travail idéal',
    hero: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop'
  },
  'tables-chaises': {
    name: 'Tables & Chaises',
    description: 'Tables et chaises pour tous vos besoins',
    hero: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&h=600&fit=crop'
  }
}

const allProducts = [
  {
    id: 1,
    name: 'Canapé 3 Places Moderne',
    price: 450000,
    originalPrice: 520000,
    image: '/images/salon3.jpeg',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.8,
    reviews: 24,
    badge: 'Promo',
    inStock: true
  },
  {
    id: 2,
    name: 'Table Basse Design',
    price: null,
    originalPrice: null,
    image: '/images/tables3.jpeg',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 3,
    name: 'Fauteuil Confort',
    price: null,
    originalPrice: null,
    image: '/images/feuteil2.jpeg',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.9,
    reviews: 31,
    badge: null,
    inStock: true
  },
  {
    id: 4,
    name: 'fauteuils modernes',
    price: null,
    originalPrice: null,
    image: '/images/feuteil1.jpeg',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.5,
    reviews: 12,
    badge: null,
    inStock: true
  },
  {
    id: 5,
    name: 'Lit King Size',
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
    price: null,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop',
    category: 'Salle à Manger',
    slug: 'tables-chaises',
    rating: 4.9,
    reviews: 35,
    badge: null,
    inStock: true
  },
  {
    id: 9,
    name: 'Armoire 3 Portes',
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher1.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 9,
    name: 'Armoire 3 Portes',
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher2.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 9,
    name: 'Armoire 3 Portes',
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher2.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 2,
    name: 'Table Basse Design',
    price: null,
    originalPrice: null,
    image: '/images/salon2.jpeg',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    inStock: true
  },
]

const filters = {
  priceRanges: [
    { label: 'Moins de 200 000 CFA', min: 0, max: 200000 },
    { label: '200 000 - 300 000 CFA', min: 200000, max: 300000 },
    { label: '300 000 - 400 000 CFA', min: 300000, max: 400000 },
    { label: 'Plus de 400 000 CFA', min: 400000, max: Infinity }
  ]
}

export default function CategoryPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>('')
  const [category, setCategory] = useState<CategoryData | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug)
      setCategory(categoryData[resolvedParams.slug as keyof typeof categoryData])
    })
  }, [params])

  if (!slug || !category) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const categoryProducts = allProducts.filter(product => product.slug === slug)
  let filteredProducts = categoryProducts

  // if (selectedPriceRange) {
  //   const priceRange = filters.priceRanges.find(range => range.label === selectedPriceRange)
  //   if (priceRange) {
  //     filteredProducts = filteredProducts.filter(product => 
  //       product.price >= priceRange.min && product.price <= priceRange.max
  //     )
  //   }
  // }

  // switch (sortBy) {
  //   case 'price-asc':
  //     filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  //     break
  //   case 'price-desc':
  //     filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  //     break
  //   case 'rating':
  //     filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  //     break
  //   default:
  //     break
  // }

  return (
    <div className="pt-20">
      {/* Hero Section */}
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
          
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            
            {/* Filtres avec design moderne */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'} mb-8 lg:mb-0`}>
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
                          className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtre par Catégorie */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-gray-700 text-sm uppercase tracking-wide">Catégories</h4>
                  <div className="space-y-3">
                    {['Salon', 'Chambre', 'Bureau', 'Salle à Manger'].map((cat, index) => (
                      <label key={index} className="flex items-center group cursor-pointer">
                        <input
                          type="checkbox"
                          className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {cat}
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
                          className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
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
                        className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        En stock seulement
                      </span>
                    </label>
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        className="text-indigo-600 focus:ring-indigo-500 focus:ring-2 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        En promotion
                      </span>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPriceRange('')}
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
                <div>
                  <h2 className="text-2xl font-bold">{filteredProducts.length} produits</h2>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
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

              {/* Cartes produits avec le modèle exact demandé */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-accent/30 transform hover:-translate-y-2">

                      {/* Image section */}
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
                              <div className="text-2xl font-bold text-gray-900">
                                {product.price?.toLocaleString()}
                                <span className="text-sm text-gray-500 ml-1 font-medium">CFA</span>
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-400 line-through">
                                  {product.originalPrice.toLocaleString()} CFA
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
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-4">Modifiez vos critères de recherche</p>
                  <button 
                    onClick={() => setSelectedPriceRange('')}
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