'use client'

import Link from 'next/link'
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react'

const categories = [
  { name: 'Salon & Salle à Manger', slug: 'salon-salle-manger' },
  { name: 'Chambre à Coucher', slug: 'chambre-coucher' },
  { name: 'Meubles de Bureau', slug: 'bureau' },
  { name: 'Tables & Chaises', slug: 'tables-chaises' },
  { name: 'Portes Intérieures', slug: 'portes-interieures' }
]

const quickLinks = [
  // { name: 'À Propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
  { name: 'Livraison', href: '/livraison' },
  { name: 'Garantie', href: '/garantie' },
  { name: 'Service Après-Vente', href: '/service-apres-vente' }
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mondiale Home SN</h3>
                <p className="text-accent text-sm">Qualité & Design</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Votre partenaire de confiance pour des meubles de qualité premium au Sénégal. 
              Nous transformons vos espaces avec élégance et style depuis plus de 10 ans.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Nos Catégories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold">Nous Contacter</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-300 text-sm">
                  Parcelle en face de l&apos;arrêt BRT Police Parcelles <br />
                    Dakar, Sénégal
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a
                    href="tel:+221784514040"
                    className="text-gray-300 text-sm hover:text-accent transition-colors"
                  >
                    +221 78 451 40 40
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:contact@mondialehomesn.com"
                    className="text-gray-300 text-sm hover:text-accent transition-colors"
                  >
                    senmondialhome@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>Lun - Sam: 10h00 - 19h30</p>
                    {/* <p>Dimanche: 9h00 - 17h00</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 className="text-xl font-bold">Newsletter</h4>
            <p className="text-gray-300">
              Restez informé de nos dernières collections et offres spéciales
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium">
                S&apos;abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 Meubles Sénégal. Réalisé par Active Solution. Tous droits réservés
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-xs text-gray-400">
                <Link href="/mentions-legales" className="hover:text-accent transition-colors">
                  Mentions Légales
                </Link>
                <span>•</span>
                <Link href="/politique-confidentialite" className="hover:text-accent transition-colors">
                  Politique de Confidentialité
                </Link>
                <span>•</span>
                <Link href="/cgv" className="hover:text-accent transition-colors">
                  CGV
                </Link>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}