'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, Grid, List } from 'lucide-react'

import { allProducts, type Product } from '@/lib/data'
import { categories as siteCategories } from '@/lib/categories'

type CategoryData = {
  name: string
  description: string
  hero: string
}

const nf = new Intl.NumberFormat('fr-FR')

export default function CategoryPage() {
  const params = useParams()
  const slug = (Array.isArray(params?.slug) ? params.slug[0] : params?.slug) as string | undefined

  // Catégorie (depuis la source partagée)
  const category: CategoryData | null = useMemo(() => {
    if (!slug) return null
    const found = siteCategories.find(c => c.slug === slug)
    return found
      ? { name: found.name, description: found.description, hero: found.image }
      : { name: 'Catégorie introuvable', description: 'La catégorie demandée n’existe pas.', hero: '/images/placeholder-hero.jpg' }
  }, [slug])

  // Produits de la catégorie courante (via slug)
  const categoryProducts: Product[] = useMemo(() => {
    if (!slug) return []
    return allProducts.filter(p => p.slug === slug)
  }, [slug])

  // UI: vue & tri (sans sidebar)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')

  // Tri (même logique que page produits)
  const products: Product[] = useMemo(() => {
    const clone = [...categoryProducts]
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
  }, [categoryProducts, sortBy])

  if (!slug || !category) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    )
  }

  const isUnknown = category.name === 'Catégorie introuvable'

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-80 bg-primary overflow-hidden">
        <Image
          src={category.hero}
          alt={category.name}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60" />
        <div className="relative h-full flex items-center justify-center text-secondary">
          <div className="text-center max-w-3xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-5 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Retour</span>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-secondary">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-secondary/90">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Section produits */}
      <section className="py-16 bg-gradient-to-br from-secondary via-white to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Alerte catégorie inconnue */}
          {isUnknown && (
            <div className="bg-white rounded-2xl p-8 shadow-primary border border-gray-100 text-center mb-10">
              <p className="text-gray-700 mb-4">La catégorie demandée n’existe pas ou a été renommée.</p>
              <Link href="/#categories" className="text-accent font-semibold underline">Voir toutes les catégories</Link>
            </div>
          )}

          {/* Toolbar (compteur / tri / vue) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4"
          >
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl px-6 py-4 shadow-primary border border-white/40">
              <h2 className="text-2xl font-bold text-primary">
                <span className="text-3xl font-extrabold text-accent">{products.length}</span>
                <span className="ml-2 text-gray-600">produit{products.length > 1 ? 's' : ''}</span>
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
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-accent text-white shadow-md'
                      : 'hover:bg-white/60 text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-accent text-white shadow-md'
                      : 'hover:bg-white/60 text-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Grille / Liste (même style que la page produits) */}
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group bg-secondary rounded-3xl overflow-hidden shadow-primary hover:shadow-primary-lg border border-gray-200 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image (hauteur fixe, zoom au hover) */}
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
                </div>

                {/* Contenu */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-accent font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-primary mt-2 group-hover:text-accent transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-3 leading-relaxed text-sm line-clamp-3">
                        {product.description ?? 'Meuble de qualité supérieure pour votre intérieur'}
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

                      {/* Bouton Voir Plus (même style que la page produits) */}
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

          {/* Aucun produit */}
          {products.length === 0 && !isUnknown && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Cette catégorie ne contient pas encore d’articles.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
