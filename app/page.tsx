'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, Shield, Headphones, Award } from 'lucide-react'
import HeroCarousel from './components/HeroCarousel'

const categories = [
  {
    id: 1,
    name: 'Salon & Salle à Manger',
    slug: 'salon-salle-manger',
    image: '/images/salon.jpeg',
    description: 'Canapés, tables, chaises élégantes',
    productCount: 45
  },
  {
    id: 2,
    name: 'Chambre à Coucher',
    slug: 'chambre-coucher',
    image: '/images/chambre-preview.jpg',
    description: 'Lits, armoires, commodes design',
    productCount: 32
  },
  {
    id: 3,
    name: 'Meubles de Bureau',
    slug: 'bureau',
    image: '/images/bureau-preview.jpg',
    description: 'Bureaux, chaises, rangements',
    productCount: 28
  },
  {
    id: 4,
    name: 'Tables & Chaises',
    slug: 'tables-chaises',
    image: '/images/tables-preview.jpg',
    description: 'Tables à manger, chaises confort',
    productCount: 38
  }
]

const featuredProducts = [
  {
    id: 1,
    name: 'Canapé 3 Places Premium',
    price: 450000,
    originalPrice: 520000,
    image: '/images/salon.jpeg',
    category: 'Salon',
    rating: 4.8,
    badge: 'Bestseller',
    description: 'Design scandinave en tissu premium avec coussins moelleux',
    reviewCount: 124,
    stock: 8
  },
  {
    id: 2,
    name: 'Table à Manger Extensible',
    price: 280000,
    originalPrice: 320000,
    image: '/images/tables.jpeg',
    category: 'Salle à Manger',
    rating: 4.9,
    badge: 'Nouveau',
    description: 'Table rectangulaire 6 personnes en chêne massif',
    reviewCount: 89,
    stock: 12
  },
  {
    id: 3,
    name: 'Lit King Size avec Tête de Lit',
    price: 380000,
    originalPrice: 450000,
    image: '/images/lit-king.jpg',
    category: 'Chambre',
    rating: 4.7,
    badge: 'Promo',
    description: 'Tête de lit capitonnée en velours avec sommier inclus',
    reviewCount: 156,
    stock: 5
  },
  {
    id: 4,
    name: 'Bureau Exécutif Modern',
    price: 320000,
    originalPrice: 380000,
    image: '/images/bureau-executif.jpg',
    category: 'Bureau',
    rating: 4.8,
    badge: 'Premium',
    description: 'Bureau spacieux avec rangements intégrés et finition premium',
    reviewCount: 67,
    stock: 15
  },
  {
    id: 5,
    name: 'Chambre à Coucher',
    price: 320000,
    originalPrice: 380000,
    image: '/images/chambre.jpeg',
    category: 'Chambre',
    rating: 4.8,
    badge: 'Premium',
    description: 'Chambre à coucher moderne avec rangements intégrés et finition premium',
    reviewCount: 67,
    stock: 15
  }

]

const benefits = [
  {
    icon: Truck,
    title: 'Livraison Gratuite',
    description: 'Livraison gratuite à Dakar et banlieue'
  },
  {
    icon: Shield,
    title: 'Garantie Qualité',
    description: 'Garantie 2 ans sur tous nos produits'
  },
  {
    icon: Headphones,
    title: 'Service Client',
    description: 'Support client 7j/7 pour vous accompagner'
  },
  {
    icon: Award,
    title: 'Qualité Premium',
    description: 'Matériaux nobles et finitions soignées'
  }
]

export default function HomePage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wide">
              Notre Collection
            </span>
            <h2 className="text-5xl font-bold text-primary mb-6 leading-tight">
              Explorez Nos
              <span className="block text-accent">Univers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chaque catégorie reflète notre passion pour le design et notre engagement
              envers la qualité exceptionnelle
            </p>
          </motion.div>

          {/* Categories Grid - Layout Amélioré */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            {/* Catégorie Principale - Grande */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:row-span-2"
            >
              <Link href={`/categories/${categories[0].slug}`}>
                <div className="group relative h-full min-h-[500px] bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-accent/30">

                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 group-hover:from-accent/10 group-hover:to-primary/10 transition-all duration-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-500">
                          <span className="text-6xl">🛋️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-400">Image Showroom</h3>
                      </div>
                    </div>
                  </div>

                  {/* Badge Premium */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Collection Phare
                    </span>
                  </div>

                  {/* Compteur Produits */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {categories[0].productCount} modèles
                    </div>
                  </div>

                  {/* Contenu Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-3xl font-bold mb-3">
                      {categories[0].name}
                    </h3>
                    <p className="text-lg text-white/90 mb-6">
                      {categories[0].description}
                    </p>
                    <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-3">Découvrir la collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Catégories Secondaires */}
            <div className="space-y-8">
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/categories/${category.slug}`}>
                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/20 overflow-hidden">

                      <div className="flex items-center p-6">

                        {/* Icon Section */}
                        <div className="flex-shrink-0 mr-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center group-hover:from-accent group-hover:to-accent/80 transition-all duration-500">
                            <span className="text-3xl">
                              {category.id === 2 ? '🛏️' :
                                category.id === 3 ? '💼' : '🪑'}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                              {category.name}
                            </h3>
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {category.productCount} produits
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {category.description}
                          </p>
                          <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform duration-300">
                            <span className="mr-2">Explorer</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary mb-4">
                Services Inclus
              </h3>
              <p className="text-lg text-gray-600">
                Une expérience complète pour votre satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Livraison Gratuite",
                  description: "À Dakar et banlieue"
                },
                {
                  icon: "🔧",
                  title: "Installation Comprise",
                  description: "Par nos équipes expertes"
                },
                {
                  icon: "🛡️",
                  title: "Garantie 2 Ans",
                  description: "Sur tous nos produits"
                }
              ].map((service, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Final */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/produits"
                className="inline-flex items-center px-10 py-4 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Voir Tous les Produits
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-10 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-white transition-colors font-semibold text-lg"
              >
                Conseil Personnalisé
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      {/* Showroom Products Section - Design Élégant */}
      {/* Showroom Section - Design Réorganisé et Embelli */}
      <section className="relative py-32 bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden">

        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Centré et Élégant */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center bg-gradient-to-r from-accent/10 to-primary/10 text-accent px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-accent/20">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></span>
                Showroom Exclusif Dakar
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-primary mb-8 leading-[0.9]">
                Notre Collection
                <span className="block bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                  Signature
                </span>
              </h1>

              <p className="text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto font-light">
                Découvrez l&apos;excellence du design sénégalais dans notre showroom de 500m².
                Chaque pièce raconte une histoire d&apos;artisanat et d&apos;innovation.
              </p>
            </div>
          </motion.header>

          {/* Layout Principal - Réorganisé */}
          <div className="mb-24">

            {/* Produit Hero - Format Cinématographique */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <div className="relative h-[400px] lg:h-[600px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.2)] group">

                {/* Image principale */}
                <div className="absolute inset-0">
                  <Image
                    src={featuredProducts[4].image || "/images/placeholder-product.jpg"}
                    alt={featuredProducts[4].name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-all duration-[3000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Badges flottants */}
                <div className="absolute top-8 left-8 flex flex-col space-y-4">
                  <div className="bg-white/95 backdrop-blur-xl text-gray-800 px-6 py-3 rounded-2xl shadow-2xl border border-white/30">
                    <span className="text-sm font-bold">{featuredProducts[0].badge}</span>
                  </div>
                  <div className="bg-accent/95 backdrop-blur-xl text-white px-6 py-3 rounded-2xl shadow-2xl">
                    <span className="text-sm font-bold">Pièce Signature</span>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="max-w-4xl">
                    <div className="space-y-6 text-white">

                      <div className="space-y-4">
                        <span className="inline-block text-accent bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                          {featuredProducts[0].category}
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                          {featuredProducts[0].name}
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
                          {featuredProducts[0].description}
                        </p>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center space-x-6">
                          <div className="text-4xl font-bold">
                            {featuredProducts[0].price?.toLocaleString()} CFA
                          </div>
                          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Star className="w-5 h-5 text-amber-400 fill-current" />
                            <span className="font-bold">{featuredProducts[0].rating}</span>
                            <span className="text-sm opacity-80">({featuredProducts[0].reviewCount})</span>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Découvrir
                          </button>
                          <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300">
                            Réserver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grille de Produits Secondaires - Layout Amélioré */}
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProducts.slice(1, 4).map((product, index) => (
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

                      <div className="absolute top-4 right-4">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 text-xs font-bold rounded-full shadow-lg">
                          {product.badge}
                        </span>
                      </div>
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
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-gray-900">
                              {product.price?.toLocaleString()}
                              <span className="text-sm text-gray-500 ml-1 font-medium">CFA</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span className="text-sm font-bold text-gray-600">{product.rating}</span>
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
          </div>

          {/* Section Ambiances - Redesignée */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">
                Créez Votre Ambiance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nos experts vous accompagnent pour composer l&apos;univers qui vous ressemble
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Salon Contemporain",
                  subtitle: "Élégance & Modernité",
                  price: "À partir de 850 000 CFA",
                  icon: "🛋️",
                  gradient: "from-blue-500/10 to-indigo-500/10"
                },
                {
                  title: "Chambre Zen",
                  subtitle: "Confort & Sérénité",
                  price: "À partir de 650 000 CFA",
                  icon: "🛏️",
                  gradient: "from-green-500/10 to-emerald-500/10"
                },
                {
                  title: "Bureau Premium",
                  subtitle: "Productivité & Style",
                  price: "À partir de 480 000 CFA",
                  icon: "💼",
                  gradient: "from-orange-500/10 to-red-500/10"
                }
              ].map((ambiance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${ambiance.gradient} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 text-center border border-gray-100 hover:border-accent/30 transform hover:-translate-y-1`}>
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {ambiance.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                      {ambiance.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-lg">{ambiance.subtitle}</p>
                    <p className="text-accent font-bold text-lg">{ambiance.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Final - Redesigné */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-r from-primary via-gray-800 to-primary rounded-[3rem] overflow-hidden shadow-2xl">

              {/* Pattern de fond */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5"></div>
              </div>

              <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                  Visitez Notre Showroom
                  <span className="block text-accent">à Dakar</span>
                </h2>
                <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Plongez dans un univers de 500m² où chaque meuble prend vie.
                  Nos conseillers experts vous accompagnent pour créer l&apos;intérieur de vos rêves.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-accent text-white rounded-2xl hover:bg-accent/90 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Réserver une Visite
                  </Link>
                  <Link
                    href="/produits"
                    className="px-10 py-5 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-primary transition-all duration-300 font-bold text-lg"
                  >
                    Catalogue Digital
                  </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">500m²</div>
                    <div className="text-gray-300">Espace d&apos;exposition</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">Lun-Sam</div>
                    <div className="text-gray-300">8h-19h • Parking gratuit</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">Plateau</div>
                    <div className="text-gray-300">Dakar, Sénégal</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
      {/* Benefits Section */}
      {/* Benefits Section - Organisation CSS Parfaite */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header - Centré et Équilibré */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Badge */}
              <div className="flex justify-center">
                <span className="inline-flex items-center bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                  Excellence & Service
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-5xl font-bold text-primary leading-tight">
                Pourquoi Nous
                <span className="block text-accent">Choisir ?</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Une expérience d&apos;excellence avec des services premium pour votre satisfaction totale depuis plus de 15 ans
              </p>
            </div>
          </motion.header>

          {/* Benefits Grid - Positionnement Parfait */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >

                {/* Card Container */}
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/20">

                  {/* Icon Section - Positionnement Fixe */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 transform group-hover:scale-110">
                        <benefit.icon className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-500" />
                      </div>

                      {/* Decorative Dot */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content Section - Centré */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed min-h-[4.5rem] flex items-center justify-center">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-accent/60 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Statistics Section - Conteneur Centré */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">

              {/* Stats Header */}
              <header className="text-center mb-12">
                <h3 className="text-3xl font-bold text-primary mb-4">
                  Nos Résultats en Chiffres
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Des données concrètes qui témoignent de notre engagement envers l&apos;excellence
                </p>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: "2500+", label: "Clients Satisfaits", icon: "👥" },
                  { number: "98%", label: "Taux de Satisfaction", icon: "⭐" },
                  { number: "15+", label: "Années d&apos;Expérience", icon: "🏆" },
                  { number: "500m²", label: "Showroom à Dakar", icon: "🏢" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>

                    {/* Number */}
                    <div className="text-4xl font-bold text-accent mb-2 group-hover:text-primary transition-colors duration-300">
                      {stat.number}
                    </div>

                    {/* Label */}
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Trust Indicators - Organisation en Colonne */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >

            {/* Trust Header */}
            <header className="text-center mb-12">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Certifications & Garanties
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reconnus par les professionnels du secteur pour notre excellence
              </p>
            </header>

            {/* Trust Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Certification Qualité",
                  description: "Standards internationaux respectés",
                  badge: "ISO"
                },
                {
                  title: "Artisans Certifiés",
                  description: "Savoir-faire traditionnel garanti",
                  badge: "PRO"
                },
                {
                  title: "Garantie Étendue",
                  description: "2 ans sur tous nos produits",
                  badge: "2 ANS"
                }
              ].map((trust, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 text-center h-full">

                    {/* Badge Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                        <span className="text-accent group-hover:text-white font-bold text-sm">
                          {trust.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors min-h-[2.5rem] flex items-center justify-center">
                      {trust.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {trust.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action - Conteneur Final */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary to-gray-800 rounded-3xl px-8 py-12 lg:px-16 lg:py-16 text-white relative overflow-hidden">

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>

              {/* CTA Content */}
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">
                  Rejoignez Plus de 2500 Clients Satisfaits
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Bénéficiez dès aujourd&apos;hui de notre expertise reconnue pour créer l&apos;intérieur de vos rêves
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-semibold text-lg shadow-lg"
                  >
                    Demander un Devis Gratuit
                  </Link>
                  <Link
                    href="tel:+221784514040"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary transition-colors font-semibold text-lg"
                  >
                    Appeler Maintenant
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Prêt à Transformer Votre Intérieur ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Contactez-nous dès aujourd&apos;hui pour un devis personnalisé et découvrez comment nous pouvons créer l&apos;espace de vos rêves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Demander un Devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="tel:+221XXXXXXXX"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold text-lg"
              >
                📞 Appeler Maintenant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}