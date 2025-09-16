import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Images du showroom - remplacez par vos vraies images
const showroomImages = [
  {
    id: 1,
    src: "/images/image1.jpeg",
    alt: "Salon moderne avec canapé gris",
    title: "Salon Moderne",
    description: "Découvrez notre collection de salons contemporains",
    category: "Salon"
  },
  {
    id: 2,
    src: "/images/image3.jpeg", 
    alt: "Chambre à coucher élégante",
    title: "Chambre Élégante",
    description: "Des chambres qui allient confort et style",
    category: "Chambre"
  },
  {
    id: 3,
    src: "/images/tables.jpeg",
    alt: "Salle à manger familiale",
    title: "Salle à Manger",
    description: "L'art de recevoir avec nos tables et chaises",
    category: "Salle à Manger"
  },
  {
    id: 4,
    src: "/images/salon.jpeg",
    alt: "salon moderne équipée",
    title: "salon Moderne",
    description: "Des salons fonctionnelles et design",
    category: "Salon"
  },
  {
    id: 5,
    src: "/images/image1.jpeg",
    alt: "Bureau design pour télétravail",
    title: "Espace Bureau",
    description: "Créez votre espace de travail idéal",
    category: "Bureau"
  }
]

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Changement automatique des images
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === showroomImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change toutes les 4 secondes

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? showroomImages.length - 1 : currentIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === showroomImages.length - 1 ? 0 : currentIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      {/* Carrousel d'images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={showroomImages[currentIndex].src}
            alt={showroomImages[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu du hero */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {showroomImages[currentIndex].title}
          </motion.h1>
          
          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            {showroomImages[currentIndex].description}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/produits"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg"
            >
              Découvrir nos produits
            </Link>
            
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Nous contacter
            </Link>
          </motion.div>

          {/* Badge catégorie */}
          <motion.div
            key={`category-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {showroomImages[currentIndex].category}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Image précédente"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Image suivante"
      >
        <ChevronRight size={24} />
      </button>

      {/* Contrôle play/pause */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Indicateurs (dots) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {showroomImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-orange-600 scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30 z-20">
        <motion.div
          className="h-full bg-orange-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </section>
  )
}

export default HeroCarousel