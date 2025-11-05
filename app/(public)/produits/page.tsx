'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supaBrowser } from '@/lib/supabase'

export default function ProduitsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [productsToShow, setProductsToShow] = useState(9)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const displayedProducts = products.slice(0, productsToShow)
  const hasMore = products.length > productsToShow

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const supabase = supaBrowser()

        const { data, error } = await supabase
          .from('products')
          .select(
            `
            *,
            categories (
              id,
              name,
              slug
            )
          `
          )
          .order('created_at', { ascending: false })

        if (error) throw error

        setProducts(data || [])
      } catch (err: any) {
        console.error(err)
        setError('Erreur de récupération des produits')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="pt-28 bg-secondary-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden bg-gradient-primary text-secondary mb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/chambreolca.jpeg"
            alt="Nos produits"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-secondary">Nos Produits</h1>
          <p className="text-lg text-secondary-100 max-w-2xl">
            Découvrez nos collections d’ameublement haut de gamme, design et durables.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-accent text-secondary font-semibold rounded-xl hover:bg-accent-600 transition"
          >
            Retour à l’accueil
          </Link>
        </div>
      </section>

      {/* Catalogue */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-primary text-center mb-12"
        >
          Explorez notre Collection
        </motion.h2>

        {loading && (
          <p className="text-center text-gray-600">Chargement...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* Grille */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-secondary rounded-3xl overflow-hidden shadow-primary hover:shadow-primary-lg border border-gray-200 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image || '/images/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-accent">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                        {product?.categories?.name}
                      </span>
                      <h3 className="text-lg font-bold text-primary mt-1 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-gray-medium text-sm line-clamp-3">
                      {product.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 .587l3.668 7.568L24 9.748l-6 5.846 1.417 8.269L12 19.771 4.583 23.863 6 15.594 0 9.748l8.332-1.593z" />
                        </svg>
                        <span className="text-sm font-bold text-primary">{product.rating}</span>
                        <span className="text-xs text-gray-medium">({product.reviews})</span>
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
                </motion.div>
              ))}
            </div>

            {/* Voir plus global */}
            {hasMore && (
              <div className="text-center mt-16">
                <button
                  onClick={() => setProductsToShow(p => p + 6)}
                  className="px-8 py-4 bg-gradient-accent text-secondary rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-accent hover:shadow-accent-lg"
                >
                  Voir plus de produits ({products.length - productsToShow} restants)
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
