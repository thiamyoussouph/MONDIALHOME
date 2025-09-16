'use client'

import { use } from 'react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Produit #{id}
        </h1>
        <p className="text-xl text-gray-600">
          Page en construction...
        </p>
      </div>
    </div>
  )
}