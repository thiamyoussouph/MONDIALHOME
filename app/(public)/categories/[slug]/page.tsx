'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, Grid, List } from 'lucide-react'
import { supaBrowser } from '@/lib/supabase'

interface Category {
  id: number
  name: string
  slug: string
  image: string
  description: string
}

interface Product {
  id: number
  name: string
  slug: string
  description: string | null
  price: number | null
  originalPrice: number | null
  image: string
  category: number
  rating: number
  reviews: number
  badge: string | null
  inStock: boolean
}

const nf = new Intl.NumberFormat('fr-FR')

export default function CategoryPage() {
  const params = useParams()
  const slug = (Array.isArray(params?.slug) ? params.slug[0] : params?.slug) as string | undefined

  // États
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // UI : vue & tri
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')

  // Récupérer la catégorie
  useEffect(() => {
    const fetchCategory = async () => {
      if (!slug) return

      try {
        setIsLoadingCategory(true)
        setError(null)

        const supabase = supaBrowser()

        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('id, name, slug, image, description')
          .eq('slug', slug)
          .single()

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // Catégorie non trouvée
            setCategory(null)
            setError('Catégorie introuvable')
          } else {
            throw fetchError
          }
        } else {
          setCategory(data)
        }
      } catch (err: any) {
        console.error('Erreur récupération catégorie:', err)
        setError(err.message)
      } finally {
        setIsLoadingCategory(false)
      }
    }

    fetchCategory()
  }, [slug])

  // Récupérer les produits de la catégorie
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category?.id) {
        setProducts([])
        setIsLoadingProducts(false)
        return
      }

      try {
        setIsLoadingProducts(true)

        const supabase = supaBrowser()

        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('category', category.id) // ✅ Filtrer par l'ID de la catégorie
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setProducts(data || [])
      } catch (err: any) {
        console.error('Erreur récupération produits:', err)
        setError(err.message)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [category?.id])

  // Tri des produits
  const sortedProducts = useMemo(() => {
    const clone = [...products]
    clone.sort((a, b) => {
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
    return clone
  }, [products, sortBy])

  // Chargement initial
  if (isLoadingCategory) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-gray-600">Chargement de la catégorie...</p>
        </div>
      </div>
    )
  }

  // Catégorie introuvable
  if (!category || error === 'Catégorie introuvable') {
    return (
      <div className="pt-20">
        {/* Hero avec message d'erreur */}
        <section className="relative h-80 bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-900/20" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center max-w-3xl mx-auto px-4">
              <Link
                href="/"
                className="inline-flex items-center text-white/80 hover:text-white mb-5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Retour à l'accueil</span>
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                Catégorie introuvable
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                La catégorie demandée n'existe pas ou a été supprimée.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-700 mb-4">Découvrez nos autres catégories disponibles</p>
            <Link
              href="/#categories"
              className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Voir toutes les catégories
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <Image
          src={category.image || '/images/placeholder-hero.jpg'}
          alt={category.name}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60" />
        <div className="relative h-full flex items-center justify-center text-secondary">
          <div className="text-center max-w-3xl mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Retour</span>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-secondary">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-secondary/90">
              {category.description || 'Découvrez notre sélection de produits'}
            </p>
          </div>
        </div>
      </section>

      {/* Section produits */}
      <section className="py-16 bg-gradient-to-br from-secondary via-white to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Toolbar (compteur / tri / vue) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
          >
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl px-6 py-4 shadow-primary border border-white/40">
              <h2 className="text-2xl font-bold text-primary">
                <span className="text-3xl font-extrabold text-accent">{sortedProducts.length}</span>
                <span className="ml-2 text-gray-600">produit{sortedProducts.length > 1 ? 's' : ''}</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white/80 backdrop-blur-xs border border-white/40 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent shadow-primary"
              >
                <option value="popular">Les plus populaires</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>

              <div className="flex bg-white/80 backdrop-blur-xs border border-white/40 rounded-xl overflow-hidden shadow-primary">
                <button
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  className={`p-3 transition-all duration-300 ${viewMode === 'grid'
                    ? 'bg-gradient-accent text-white shadow-md'
                    : 'hover:bg-white/60 text-gray-700'
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  className={`p-3 transition-all duration-300 ${viewMode === 'list'
                    ? 'bg-gradient-accent text-white shadow-md'
                    : 'hover:bg-white/60 text-gray-700'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* État de chargement des produits */}
          {isLoadingProducts ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            // Aucun produit
            <div className="text-center py-16 bg-white rounded-2xl shadow-primary">
              <div className="max-w-md mx-auto px-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Aucun produit disponible</h3>
                <p className="text-gray-600 mb-6">Cette catégorie ne contient pas encore de produits.</p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          ) : (
            // Grille / Liste de produits
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group bg-secondary rounded-3xl overflow-hidden shadow-primary hover:shadow-primary-lg border border-gray-200 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || '/images/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/95 backdrop-blur-xs text-gray-800 px-3 py-2 text-xs font-bold rounded-full shadow-md border border-white/40">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    {/* Badge Stock */}
                    {!product.inStock && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-2 text-xs font-bold rounded-full shadow-md">
                          Rupture de stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-accent font-bold uppercase tracking-wider">
                          {category.name}
                        </span>
                        <h3 className="text-xl font-bold text-primary mt-2 group-hover:text-accent transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mt-3 leading-relaxed text-sm line-clamp-3">
                          {product.description || 'Meuble de qualité supérieure pour votre intérieur'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="space-y-1">
                          {/* Prix */}
                          {product.price !== null ? (
                            <div className="text-2xl font-bold text-primary">
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
                            <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews} avis)</span>
                          </div>
                        </div>

                        {/* Bouton Voir Plus */}
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
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}