'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nos Catégories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre large gamme de meubles soigneusement sélectionnés pour transformer votre intérieur
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent/20">
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 group-hover:from-accent/20 group-hover:to-primary/20 transition-all duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                        {category.productCount} produits
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Voir plus
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
     {/* Showroom Products Section - Design Élégant */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header avec style showroom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                Showroom Dakar
              </span>
              <h2 className="text-5xl font-bold text-primary mb-6 leading-tight">
                Nos Pièces
                <span className="block text-accent">d'Exposition</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Visitez virtuellement notre showroom et découvrez une sélection curatée de meubles 
                exceptionnels, chacun choisi pour sa qualité et son design intemporel.
              </p>
            </div>
          </motion.div>

          {/* Layout Showroom - Grille Asymétrique */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            
            {/* Produit Principal - Grand Format */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-8 relative group"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                
                {/* Image avec effet parallax */}
                <div className="absolute inset-0">
                  <img 
                    src={featuredProducts[0].image || "/images/placeholder-product.jpg"} 
                    alt={featuredProducts[0].name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Badge flottant élégant */}
                <div className="absolute top-8 left-8">
                  <div className="bg-white/95 backdrop-blur-md text-gray-800 px-6 py-3 rounded-2xl shadow-xl border border-white/20">
                    <span className="text-sm font-semibold">{featuredProducts[0].badge}</span>
                  </div>
                </div>

                {/* Informations produit en overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-accent bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {featuredProducts[0].category}
                      </span>
                      <h3 className="text-4xl font-bold mt-3 mb-2">
                        {featuredProducts[0].name}
                      </h3>
                      <p className="text-lg text-white/90 max-w-2xl">
                        {featuredProducts[0].description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold">
                          {featuredProducts[0].price?.toLocaleString()} CFA
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-amber-400 fill-current" />
                          <span className="font-medium">{featuredProducts[0].rating}</span>
                        </div>
                      </div>
                      <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                        Découvrir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Produits Secondaires - Colonne droite */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {featuredProducts.slice(1, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    
                    {/* Image produit */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image || "/images/placeholder-product.jpg"} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 text-xs font-medium rounded-full shadow-md">
                          {product.badge}
                        </span>
                      </div>
                    </div>

                    {/* Contenu produit */}
                    <div className="p-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-accent font-medium uppercase tracking-wide">
                            {product.category}
                          </span>
                          <h4 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-accent transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-xl font-bold text-gray-900">
                              {product.price?.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">CFA</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm font-medium text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-accent hover:text-accent transition-colors text-sm font-medium">
                          Voir en détail
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section Inspiration - Ambiances */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-primary mb-4">
                Inspirez-vous de nos Ambiances
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez comment nos meubles s'intègrent parfaitement dans différents styles d'intérieur
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Salon Moderne",
                  subtitle: "Élégance contemporaine",
                  price: "À partir de 850 000 CFA",
                  icon: "🛋️"
                },
                {
                  title: "Chambre Cocooning", 
                  subtitle: "Confort et sérénité",
                  price: "À partir de 650 000 CFA",
                  icon: "🛏️"
                },
                {
                  title: "Bureau Exécutif",
                  subtitle: "Productivité et style", 
                  price: "À partir de 480 000 CFA",
                  icon: "💼"
                }
              ].map((ambiance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-accent/20">
                    <div className="text-4xl mb-4">{ambiance.icon}</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                      {ambiance.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{ambiance.subtitle}</p>
                    <p className="text-accent font-semibold">{ambiance.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call-to-Action Showroom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-primary to-gray-800 rounded-3xl overflow-hidden">
              <div className="px-8 py-12 lg:px-16 lg:py-16 text-center text-white">
                <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                  Visitez Notre Showroom à Dakar
                </h3>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  Venez toucher, tester et vous imprégner de la qualité de nos meubles. 
                  Notre équipe vous accueille dans un espace de 500m² entièrement dédié à votre inspiration.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-semibold text-lg shadow-lg"
                  >
                    Prendre Rendez-vous
                  </Link>
                  <Link
                    href="/produits"
                    className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary transition-colors font-semibold text-lg"
                  >
                    Catalogue Complet
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    <span>Plateau, Dakar - 500m²</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Lun-Sam 8h-19h</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Parking gratuit</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
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
                Une expérience d'excellence avec des services premium pour votre satisfaction totale depuis plus de 15 ans
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
                  Des données concrètes qui témoignent de notre engagement envers l'excellence
                </p>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: "2500+", label: "Clients Satisfaits", icon: "👥" },
                  { number: "98%", label: "Taux de Satisfaction", icon: "⭐" },
                  { number: "15+", label: "Années d'Expérience", icon: "🏆" },
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
                  Bénéficiez dès aujourd'hui de notre expertise reconnue pour créer l'intérieur de vos rêves
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
              Contactez-nous dès aujourd'hui pour un devis personnalisé et découvrez comment nous pouvons créer l'espace de vos rêves.
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