'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Search, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supaBrowser } from '@/lib/supabase'

interface Category {
  id: number
  name: string
  slug: string
  image: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true)
        const supabase = supaBrowser()

        const { data, error } = await supabase
          .from('categories')
          .select('id, name, slug, image')
          .order('name', { ascending: true })

        if (error) throw error

        setCategories(data || [])
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="hidden md:flex items-center gap-4">
            <span>📍 Dakar, Sénégal</span>
            <span>⏰ Lun-Sam: 10h-19h30</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-4 h-4" />
            <span>+221 78 451 40 40</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Meubles Sénégal Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Mondiale Home SN</h1>
                <p className="text-xs text-gray-600">Qualité & Design</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-accent transition-colors font-medium">
                Accueil
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  className="flex items-center text-gray-900 hover:text-accent transition-colors font-medium"
                >
                  Catégories
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                    >
                      {isLoadingCategories ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent mx-auto"></div>
                          <p className="mt-2 text-sm">Chargement...</p>
                        </div>
                      ) : categories.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <p className="text-sm">Aucune catégorie disponible</p>
                        </div>
                      ) : (
                        categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/a-propos" className="text-gray-900 hover:text-accent transition-colors font-medium">
                À Propos
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-accent transition-colors font-medium">
                Contact
              </Link>
            </div>

            {/* Search & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent w-64"
                />
              </div>
              <Link
                href="/contact"
                className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Devis Gratuit
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  <Link
                    href="/"
                    className="block text-lg font-medium text-gray-900 hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </Link>

                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">Catégories</p>
                    <div className="pl-4 space-y-2">
                      {isLoadingCategories ? (
                        <p className="text-sm text-gray-500">Chargement...</p>
                      ) : categories.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucune catégorie</p>
                      ) : (
                        categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="block text-gray-600 hover:text-accent"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  <Link
                    href="/a-propos"
                    className="block text-lg font-medium text-gray-900 hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    À Propos
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-lg font-medium text-gray-900 hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>

                {/* Mobile CTA */}
                <Link
                  href="/contact"
                  className="block w-full bg-accent text-white text-center px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Devis Gratuit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}