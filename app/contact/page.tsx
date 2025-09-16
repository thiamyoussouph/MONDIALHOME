// app/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, Calendar } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Notre Showroom',
    details: [
      'Rue de la République',
      'Plateau, Dakar',
      'Sénégal'
    ],
    action: 'Voir sur la carte'
  },
  {
    icon: Phone,
    title: 'Téléphone',
    details: [
      '+221 XX XXX XXXX',
      '+221 YY YYY YYYY'
    ],
    action: 'Appeler maintenant'
  },
  {
    icon: Mail,
    title: 'Email',
    details: [
      'contact@meubles-senegal.com',
      'devis@meubles-senegal.com'
    ],
    action: 'Envoyer un email'
  },
  {
    icon: Clock,
    title: 'Horaires d&apos;Ouverture',
    details: [
      'Lun - Sam: 8h00 - 19h00',
      'Dimanche: 9h00 - 17h00',
      'Jours fériés: Fermé'
    ],
    action: 'Prendre RDV'
  }
]

const services = [
  {
    icon: MessageCircle,
    title: 'Conseils Personnalisés',
    description: 'Nos experts vous guident dans le choix de vos meubles selon vos besoins et votre budget.'
  },
  {
    icon: User,
    title: 'Service Client Dédié',
    description: 'Une équipe dédiée pour répondre à toutes vos questions et vous accompagner.'
  },
  {
    icon: Calendar,
    title: 'Prise de RDV',
    description: 'Planifiez une visite de notre showroom ou une consultation à domicile.'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    budget: '',
    visitDate: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form après succès
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        budget: '',
        visitDate: ''
      })
    }, 3000)
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-gray-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Nous sommes là pour vous accompagner dans votre projet d&apos;aménagement. 
              Contactez nos experts pour des conseils personnalisés et un devis gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+221XXXXXXXX"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler Maintenant
              </a>
              <a
                href="mailto:contact@meubles-senegal.com"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyer un Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Demande de Devis Gratuit
                </h2>
                <p className="text-gray-600">
                  Remplissez ce formulaire et nous vous recontacterons dans les 24h pour discuter de votre projet.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Message Envoyé !
                  </h3>
                  <p className="text-gray-600">
                    Merci pour votre demande. Nous vous recontacterons très prochainement.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="+221 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">
                        Catégorie d&apos;Intérêt
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="salon">Salon & Salle à Manger</option>
                        <option value="chambre">Chambre à Coucher</option>
                        <option value="bureau">Meubles de Bureau</option>
                        <option value="tables">Tables & Chaises</option>
                        <option value="portes">Portes Intérieures</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">
                        Budget Approximatif
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="">Sélectionner un budget</option>
                        <option value="moins-500k">Moins de 500 000 CFA</option>
                        <option value="500k-1m">500 000 - 1 000 000 CFA</option>
                        <option value="1m-2m">1 000 000 - 2 000 000 CFA</option>
                        <option value="2m-5m">2 000 000 - 5 000 000 CFA</option>
                        <option value="plus-5m">Plus de 5 000 000 CFA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Objet de votre demande *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Ex: Aménagement salon complet"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Date Souhaitée pour Visite (Optionnel)
                    </label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Détails de votre Projet *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-textarea"
                      placeholder="Décrivez votre projet, vos besoins, vos contraintes, vos préférences de style..."
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        J&apos;accepte que mes données personnelles soient utilisées pour traiter ma demande. 
                        Voir notre <a href="/politique-confidentialite" className="text-accent hover:underline">politique de confidentialité</a>.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Envoyer la Demande</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Services */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information Cards */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-gray-600 mb-3">
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                      <button className="text-accent hover:text-accent/80 font-medium text-sm transition-colors">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Nos Services
              </h3>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d&apos;une Réponse Rapide ?
              </h3>
              <p className="mb-6 opacity-90">
                Pour une réponse immédiate, contactez-nous directement par téléphone ou WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+221XXXXXXXX"
                  className="flex items-center justify-center bg-white text-accent px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </a>
                <a
                  href="https://wa.me/221XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-semibold border border-white/30"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Visitez Notre Showroom
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Venez découvrir notre collection dans notre showroom de 500m² au cœur de Dakar. 
              Nos conseillers vous accueillent pour vous faire découvrir nos meubles.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Carte Interactive</p>
                    <p className="text-sm">Rue de la République, Dakar</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    Voir sur Google Maps
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Showroom Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Informations Pratiques
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Adresse</h4>
                      <p className="text-gray-600">
                        Rue de la République<br />
                        Plateau, Dakar 12500<br />
                        Sénégal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Horaires</h4>
                      <div className="text-gray-600 space-y-1">
                        <p><span className="font-medium">Lun - Ven:</span> 8h00 - 19h00</p>
                        <p><span className="font-medium">Samedi:</span> 9h00 - 18h00</p>
                        <p><span className="font-medium">Dimanche:</span> 10h00 - 17h00</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                    <h4 className="font-semibold text-accent mb-2">
                      🚗 Accès & Parking
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Parking gratuit disponible. Accessible en voiture, taxi ou transport en commun. 
                      Arrêt de bus à 100m.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-primary mb-4">
                    Services Disponibles
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Conseil personnalisé
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Devis gratuit
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Livraison & montage
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Service après-vente
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Quels sont vos délais de livraison ?",
                answer: "Pour Dakar et banlieue : 2-5 jours ouvrés. Pour les autres régions du Sénégal : 5-10 jours ouvrés. Les délais peuvent varier selon la disponibilité des produits."
              },
              {
                question: "Proposez-vous un service de montage ?",
                answer: "Oui, nous proposons un service de livraison et montage professionnel. Nos équipes qualifiées se chargent de l&apos;installation dans les règles de l&apos;art."
              },
              {
                question: "Quelle est votre politique de garantie ?",
                answer: "Tous nos meubles bénéficient d&apos;une garantie de 2 ans couvrant les défauts de fabrication. Nous offrons également un service après-vente complet."
              },
              {
                question: "Puis-je personnaliser mes meubles ?",
                answer: "Absolument ! Nous proposons de nombreuses options de personnalisation : couleurs, finitions, dimensions sur mesure. Contactez-nous pour discuter de vos besoins spécifiques."
              },
              {
                question: "Acceptez-vous les paiements échelonnés ?",
                answer: "Oui, nous proposons plusieurs solutions de financement et de paiement échelonné. Nos conseillers peuvent vous présenter les options disponibles lors de votre visite."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Vous avez d&apos;autres questions ?
            </p>
            <a
              href="mailto:contact@meubles-senegal.com"
              className="btn-primary"
            >
              Contactez-nous directement
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}