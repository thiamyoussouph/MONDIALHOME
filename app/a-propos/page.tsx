'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-primary mb-6">
              À Propos de Nous
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Page en construction...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}