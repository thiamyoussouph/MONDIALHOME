// app/categories/[slug]/page.tsx
'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown, ArrowLeft } from 'lucide-react'

// Mock data - En production, ces données viendraient d'une API ou base de données
const categoryData = {
  'salon-salle-manger': {
    name: 'Salon & Salle à Manger',
    description: 'Découvrez notre collection de mobilier pour salon et salle à manger alliant confort, style et qualité.',
    image: '/images/salon-hero.jpg'
  },
  'chambre-coucher': {
    name: 'Chambre à Coucher',
    description: 'Transformez votre chambre en un havre de paix avec nos meubles élégants et fonctionnels.',
    image: '/images/chambre-hero.jpg'
  },
  'bureau': {
    name: 'Meubles de Bureau',
    description: 'Créez un espace de travail optimal avec notre gamme de mobilier de bureau professionnel.',
    image: '/images/bureau-hero.jpg'
  },
  'tables-chaises': {
    name: 'Tables & Chaises',
    description: 'Tables et chaises pour tous vos espaces, du plus moderne au plus classique.',
    image: '/images/tables-hero.jpg'
  },
  'portes-interieures': {
    name: 'Portes Intérieures',
    description: 'Portes intérieures design pour séparer et embellir vos espaces de vie.',
    image: '/images/portes-hero.jpg'
  }
}

const mockProducts = [
  {
    id: 1,
    name: 'Canapé 3 Places Premium',
    price: 450000,
    originalPrice: 520000,
    image: '/images/canape-1.jpg',
    category: 'Salon',
    rating: 4.8,
    reviews: 24,
    badge: 'Bestseller',
    colors: ['Gris', 'Beige', 'Noir'],
    inStock: true
  },
  {
    id: 2,
    name: 'Table Basse Design',
    price: 180000,
    originalPrice: null,
    image: '/images/table-basse-1.jpg',
    category: 'Salon',
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    colors: ['Chêne', 'Noyer'],
    inStock: true
  },
  {
    id: 3,
    name: 'Fauteuil Relax',
    price: 280000,
    originalPrice: 320000,
    image: '/images/fauteuil-1.jpg',
    category: 'Salon',
    rating: 4.9,
    reviews: 31,
    badge: 'Promo',
    colors: ['Marron', 'Gris', 'Noir'],
    inStock: false
  },
  {
    id: 4,
    name: 'Bibliothèque Moderne',
    price: 320000,
    originalPrice: null,
    image: '/images/biblio-1.jpg',
    category: 'Salon',
    rating: 4.7,
    reviews: 15,
    badge: null,
    colors: ['Blanc', 'Chêne'],
    inStock: true
  },
  {
    id: 5,
    name: 'Canapé d&apos;Angle',
    price: 680000,
    originalPrice: 780000,
    image: '/images/canape-angle-1.jpg',
    category: 'Salon',
    rating: 4.8,
    reviews: 22,
    badge: 'Tendance',
    colors: ['Gris', 'Beige'],
    inStock: true
  },
  {
    id: 6,
    name: 'Table à Manger Extensible',
    price: 380000,
    originalPrice: null,
    image: '/images/table-manger-1.jpg',
    category: 'Salle à Manger',
    rating: 4.9,
    reviews: 28,
    badge: null,
    colors: ['Chêne', 'Noyer', 'Blanc'],
    inStock: true
  }
]

const filters = {
  priceRanges: [
    { label: 'Moins de 200 000 CFA', min: 0, max: 200000 },
    { label: '200 000 - 400 000 CFA', min: 200000, max: 400000 },
    { label: '400 000 - 600 000 CFA', min: 400000, max: 600000 },
    { label: 'Plus de 600 000 CFA', min: 600000, max: Infinity }
  ],
  colors: ['Blanc', 'Noir', 'Gris', 'Beige', 'Marron', 'Chêne', 'Noyer'],
  availability: ['En stock', 'Sur commande']
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Utilisation du hook use() pour résoudre la Promise params dans Next.js 15
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const category = categoryData[slug as keyof typeof categoryData]
  
  if (!category) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Catégorie non trouvée</h1>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  const filteredProducts = mockProducts // En production, appliquer les vrais filtres

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-gray-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-accent hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l&apos;accueil
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {category.description}
            </p>
            
            <div className="mt-8 flex items-center space-x-6 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                {filteredProducts.length} produits disponibles
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Livraison gratuite
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Garantie 2 ans
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-32"
            >
              <h3 className="text-xl font-bold text-primary mb-6">Filtres</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary mb-4">Prix</h4>
                <div className="space-y-3">
                  {filters.priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.label}
                        checked={selectedPriceRange === range.label}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary mb-4">Couleurs</h4>
                <div className="space-y-3">
                  {filters.colors.map((color) => (
                    <label key={color} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value={color}
                        checked={selectedColors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedColors([...selectedColors, color])
                          } else {
                            setSelectedColors(selectedColors.filter(c => c !== color))
                          }
                        }}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary mb-4">Disponibilité</h4>
                <div className="space-y-3">
                  {filters.availability.map((availability) => (
                    <label key={availability} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value={availability}
                        checked={selectedAvailability.includes(availability)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAvailability([...selectedAvailability, availability])
                          } else {
                            setSelectedAvailability(selectedAvailability.filter(a => a !== availability))
                          }
                        }}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="ml-3 text-gray-700">{availability}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                Appliquer les Filtres
              </button>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {filteredProducts.length} produits trouvés
                </h2>
                <p className="text-gray-600">
                  Dans la catégorie {category.name}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="popular">Populaires</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="newest">Nouveautés</option>
                    <option value="rating">Mieux notés</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={viewMode === 'grid' ? 
                'grid md:grid-cols-2 xl:grid-cols-3 gap-8' : 
                'space-y-6'
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                              product.badge === 'Bestseller' ? 'bg-green-500' :
                              product.badge === 'Nouveau' ? 'bg-blue-500' :
                              product.badge === 'Promo' ? 'bg-red-500' : 'bg-accent'
                            }`}>
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* Stock Status */}
                        {!product.inStock && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Rupture
                            </span>
                          </div>
                        )}

                        {/* Placeholder Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl font-bold text-accent">M</span>
                            </div>
                            <p className="text-sm">Image produit</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex space-x-3">
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                            <Link
                              href={`/produits/${product.id}`}
                              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors"
                            >
                              Voir Détails
                            </Link>
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors">
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                            {product.category}
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-600 ml-1">
                              {product.rating}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl font-bold text-accent">
                            {product.price.toLocaleString()} CFA
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              {product.originalPrice.toLocaleString()} CFA
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {product.colors.slice(0, 3).map((color, idx) => (
                              <div
                                key={idx}
                                className="w-4 h-4 rounded-full border-2 border-white shadow-sm bg-gray-300"
                                title={color}
                              ></div>
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs text-gray-500 ml-1">
                                +{product.colors.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <span className={`text-sm font-medium ${
                            product.inStock ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.inStock ? 'En stock' : 'Rupture'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3 aspect-[4/3] md:aspect-square bg-gray-100 relative overflow-hidden">
                          {/* Badge */}
                          {product.badge && (
                            <div className="absolute top-4 left-4 z-10">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                                product.badge === 'Bestseller' ? 'bg-green-500' :
                                product.badge === 'Nouveau' ? 'bg-blue-500' :
                                product.badge === 'Promo' ? 'bg-red-500' : 'bg-accent'
                              }`}>
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {/* Placeholder Image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <span className="text-2xl font-bold text-accent">M</span>
                              </div>
                              <p className="text-sm">Image produit</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-2/3 p-6">
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                                      {product.category}
                                    </span>
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm font-medium text-gray-600 ml-1">
                                        {product.rating}
                                      </span>
                                      <span className="text-xs text-gray-500 ml-1">
                                        ({product.reviews} avis)
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <h3 className="text-xl font-bold text-primary mb-2 hover:text-accent transition-colors">
                                    {product.name}
                                  </h3>
                                  
                                  <p className="text-gray-600 mb-4">
                                    Description du produit avec ses principales caractéristiques et avantages.
                                  </p>
                                </div>

                                <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
                                  <Heart className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl font-bold text-accent">
                                    {product.price.toLocaleString()} CFA
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through">
                                      {product.originalPrice.toLocaleString()} CFA
                                    </span>
                                  )}
                                </div>
                                
                                <span className={`text-sm font-medium px-2 py-1 rounded ${
                                  product.inStock 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-red-100 text-red-600'
                                }`}>
                                  {product.inStock ? 'En stock' : 'Rupture'}
                                </span>
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">Couleurs:</span>
                                  <div className="flex space-x-1">
                                    {product.colors.slice(0, 4).map((color, idx) => (
                                      <div
                                        key={idx}
                                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm bg-gray-300"
                                        title={color}
                                      ></div>
                                    ))}
                                    {product.colors.length > 4 && (
                                      <span className="text-xs text-gray-500 ml-1">
                                        +{product.colors.length - 4}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <Link
                                href={`/produits/${product.id}`}
                                className="flex-1 bg-primary text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                              >
                                Voir Détails
                              </Link>
                              <button className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {filteredProducts.length > 12 && (
              <div className="mt-16 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    ←
                  </button>
                  <button className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    →
                  </button>
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Essayez de modifier vos critères de recherche ou explorez d&apos;autres catégories.
                </p>
                <button 
                  onClick={() => {
                    setSelectedPriceRange('')
                    setSelectedColors([])
                    setSelectedAvailability([])
                  }}
                  className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Réinitialiser les Filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Besoin d&apos;Aide pour Choisir ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nos experts sont là pour vous conseiller et vous aider à trouver le mobilier parfait pour votre intérieur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Contactez un Expert
              </Link>
              <a
                href="tel:+221XXXXXXXX"
                className="border-2 border-accent text-accent px-8 py-4 rounded-lg hover:bg-accent hover:text-white transition-all duration-300 font-semibold text-lg"
              >
                📞 Appeler Maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}