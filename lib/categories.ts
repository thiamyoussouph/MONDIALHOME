export type Category = {
  id: number
  name: string
  slug: string
  image: string
  description: string
  productCount: number
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Chambre à Coucher',
    slug: 'chambre-coucher',
    image: '/images/chambreacoucher.jpeg',
    description: 'Lits, armoires, commodes design',
    productCount: 45
  },
  {
    id: 2,
    name: 'Salons Modernes',
    slug: 'salons-modernes',
    image: '/images/salon3.jpeg',
    description: 'Canapés contemporains, design épuré',
    productCount: 38
  },
  {
    id: 3,
    name: 'Salons Royaux - Louis XIV',
    slug: 'salons-royaux',
    image: '/images/luisviton.jpeg',
    description: 'Style classique, luxe et raffinement',
    productCount: 28
  },
  {
    id: 4,
    name: 'Salle à Manger',
    slug: 'salle-manger',
    image: '/images/tables3.jpeg',
    description: 'Tables, chaises, buffets élégants',
    productCount: 32
  },
  {
    id: 5,
    name: 'Salle à Manger',
    slug: 'salle-manger',
    image: '/images/tables.jpeg',
    description: 'Tables, chaises, buffets élégants',
    productCount: 24
  },
  {
    id: 6,
    name: 'Meuble Télé',
    slug: 'meuble-tele',
    image: '/images/meubletele.jpg',
    description: 'Meubles TV modernes et pratiques',
    productCount: 18
  },
  {
    id: 7,
    name: 'Matelas Orthopédiques',
    slug: 'matelas',
    image: '/images/matelas.jpeg',
    description: 'Confort et soutien pour votre sommeil',
    productCount: 15
  },
  {
    id: 8,
    name: 'Portes Intérieures',
    slug: 'portes-interieures',
    image: '/images/porteblindé.jpeg',
    description: 'Portes design pour votre intérieur',
    productCount: 22
  },
  {
    id: 9,
    name: 'Portes Blindées',
    slug: 'portes-blindees',
    image: '/images/port.jpeg',
    description: 'Sécurité et esthétique réunies',
    productCount: 12
  },
  {
    id: 10,
    name: 'Tapis',
    slug: 'tapis',
    image: '/images/tapis.jpg',
    description: 'Tapis décoratifs et confortables',
    productCount: 35
  }
]
