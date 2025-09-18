// app/categories/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown, ArrowLeft, Eye, Plus } from 'lucide-react'

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
    hero: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop'
  },
  'chambre-coucher': {
    name: 'Chambre à Coucher', 
    description: 'Meubles de chambre pour un confort optimal',
    hero: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
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
    price: 180000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
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
    price: 280000,
    originalPrice: 320000,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop',
    category: 'Salon',
    slug: 'salon-salle-manger',
    rating: 4.9,
    reviews: 31,
    badge: null,
    inStock: true
  },
  {
    id: 4,
    name: 'Bibliothèque Moderne',
    price: 195000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594736797933-d0d6019b72a3?w=600&h=400&fit=crop',
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
    price: 380000,
    originalPrice: 450000,
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
    price: 320000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
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
    price: 250000,
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
    price: 380000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop',
    category: 'Salle à Manger',
    slug: 'tables-chaises',
    rating: 4.9,
    reviews: 35,
    badge: null,
    inStock: true
  }
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
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    )
  }

  const categoryProducts = allProducts.filter(product => product.slug === slug)
  let filteredProducts = categoryProducts

  if (selectedPriceRange) {
    const priceRange = filters.priceRanges.find(range => range.label === selectedPriceRange)
    if (priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange.min && product.price <= priceRange.max
      )
    }
  }

  switch (sortBy) {
    case 'price-asc':
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  return (
    <div className="pt-20">
      {/* Hero moderne avec gradient overlay */}
      <section className="relative h-80 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={category.hero}
            alt={category.name}
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
                {category.name}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section produits avec background moderne */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            
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

                <button 
                  onClick={() => setSelectedPriceRange('')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Réinitialiser
                </button>
              </motion.div>
            </div>

            {/* Produits */}
            <div className="lg:col-span-4">
              
              {/* Toolbar moderne */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 space-y-4 sm:space-y-0"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-3xl font-extrabold text-indigo-600">{filteredProducts.length}</span>
                    <span className="ml-2 text-gray-600">produits disponibles</span>
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
                    onChange={(e) => setSortBy(e.target.value)}
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

              {/* Cartes produits modernes */}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                      
                      {/* Image avec overlay moderne */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badge moderne */}
                        {product.badge && (
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full text-white shadow-lg backdrop-blur-sm ${
                              product.badge === 'Promo' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                              product.badge === 'Nouveau' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}>
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* Actions overlay */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex flex-col space-y-2">
                            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                              <Heart className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Contenu avec design moderne */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wide bg-indigo-50 px-2 py-1 rounded-lg">
                            {product.category}
                          </span>
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold ml-1 text-yellow-700">{product.rating}</span>
                            <span className="text-xs text-yellow-600 ml-1">({product.reviews})</span>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">CFA</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through ml-2">
                                {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            product.inStock 
                              ? 'text-green-700 bg-green-100' 
                              : 'text-red-700 bg-red-100'
                          }`}>
                            {product.inStock ? '✓ En stock' : '✗ Rupture'}
                          </span>
                          <div className="flex space-x-2">
                            <Link
                              href={`/produits/${product.id}`}
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              Voir détails
                            </Link>
                            <button className="bg-white border-2 border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Aucun résultat avec design moderne */}
              {filteredProducts.length === 0 && (
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
                      onClick={() => setSelectedPriceRange('')}
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