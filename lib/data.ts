// lib/data.ts

export type Product = {
  id: number
  name: string
  description?: string
  price: number | null
  originalPrice: number | null
  image: string
  category: string
  slug: string
  rating: number
  reviews: number
  badge: string
  inStock: boolean
}

export const allProducts: Product[] = [
    {
    id: 1,
    name: 'SALON  LION ',
    description: 'en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)',
    price: null,
    originalPrice: null,
    image: '/images/capturesalonlion.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.9,
    reviews: 31,
    badge: 'Premium',
    inStock: true
  }
   ,
  {
    id: 2,
    name: 'Salons + Salle à Manger RIHTIM ',
    description:
      "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/SALLRIHTIM.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.8,
    reviews: 24,
    badge: 'Promo',
    inStock: true
  },
   {
    id: 3,
    name: 'Salons + Salle à Manger NOBEL',
    description:
      "composé d’un Salon 8 places (3+3+1+1) + Table Basse + Meuble TV + Buffet et d’une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.",
    price: null,
    originalPrice: null,
    image: '/images/sallenobele.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.6,
    reviews: 18,
    badge: 'Nouveau',
    inStock: true
  }
  ,
  {
    id: 4,
    name: 'SALON  LOFT ',
    description: 'en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)',
    price: null,
    originalPrice: null,
    image: '/images/salonloft.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.5,
    reviews: 12,
    badge: 'Premium',
    inStock: true
  },
 
  {
    id: 5,
    name: 'LIFESTYLE',
    description:
      ' Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards. Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.',
    price: null,
    originalPrice: null,
    image: '/images/chambreacoucher.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
   {
    id: 6,
    name: 'Chambre à coucher OLCA',
    description:
      ' Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir',
    price: null,
    originalPrice: null,
    image: '/images/chambreolca.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.7,
    reviews: 42,
    badge: 'Promo',
    inStock: true
  },
  {
    id: 7,
    name: 'BLOCK',
    description:
      ' Chambre à coucher sans armoire destinée souvent à ceux qui ont déjà des dressings ou des placards.  Ces chambres sont munies d’un coffre de rangement et sont composées de Lit + 2 Chevets + Coiffeuse + Miroir + Banquette.',
    price: null,
    originalPrice: null,
    image: '/images/litblock.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  // {
  //   id: 8,
  //   name: 'Bureau Moderne',
  //   description: 'Bureau minimaliste et fonctionnel, idéal pour vos journées de travail.',
  //   price: null,
  //   originalPrice: null,
  //   image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  //   category: 'Bureau',
  //   slug: 'bureau',
  //   rating: 4.8,
  //   reviews: 22,
  //   badge: 'Premium',
  //   inStock: true
  // },
  {
    id: 9,
    name: ' NOBEL',
    description:
      'une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.',
    price: null,
    originalPrice: null,
    image: '/images/salleamangenobel.png',
    category: 'Salle à Manger',
    slug: 'salle-manger',
    rating: 4.9,
    reviews: 35,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 10,
    name: 'RIHTIM',
    description:
      'une salle à manger complète composée d’une table 6 places + 6 chaises + Buffet + Miroir.',
    price: null,
    originalPrice: null,
    image: '/images/alleamangerithmi.png',
    category: 'Salle à Manger',
    slug: 'salle-manger',
    rating: 4.9,
    reviews: 35,
    badge: 'Bestseller',
    inStock: true
  },
  {
    id: 11,
    name: 'Chambre à coucher RIHTIM',
    description:
      "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir.Dimensions : largeur 180 - Longueur 200",
    price: null,
    originalPrice: null,
    image: '/images/capturechambreRIHTIM.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 12,
    name: 'Chambre à coucher MILANO',
    description:
      "Composée de 8 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/CapturechambreMİLANO.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 13,
    name: 'Chambre à coucher ETHNA',
    description:
      "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/chambreethma.jpeg',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 14,
    name: 'Chambre à coucher NOBEL',
    description:
      "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/NOBEL.png',
    category: 'Chambre',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 15,
    name: 'SALON PARIS  ',
    description: 'en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)',
    price: null,
    originalPrice: null,
    image: '/images/salonparis.png',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.7,
    reviews: 15,
    badge: 'Bestseller',
    inStock: true
  },
  // {
  //   id: 16,
  //   name: 'SALON ESLI ',
  //   description: 'en tissu haut de gamme originaire de Turquie. 8 Places (3+3+1+1)',
  //   price: null,
  //   originalPrice: null,
  //   image: '/images/salonesli.png',
  //   category: 'Salon',
  //   slug: 'salons-modernes',
  //   rating: 4.7,
  //   reviews: 15,
  //   badge: 'Nouveau',
  //   inStock: true
  // },
  {
    id: 17,
    name: 'Meuble TV ',
    description: 'Meuble télé moderne finition chêne + laqué.',
    price: null,
    originalPrice: null,
    image: '/images/meubletele1.jpeg',
    category: 'meuble tele',
    slug: 'meuble-tele',
    rating: 4.5,
    reviews: 12,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 18,
    name: 'Matelas Orthopédique  ',
    description: 'modèle DIDIM Épaisseur : 28cm Dimensions : 180/200.',
    price: null,
    originalPrice: null,
    image: '/images/matelas.jpeg',
    category: 'Chambre',
    slug: 'matelas',
    rating: 4.8,
    reviews: 22,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 19,
    name: 'Matelas Orthopédique  ',
    description:
      'modèle SELTA Coffre fort intégré Dimensions : 160/200 Dimensions : 180/200.Dimensions : 140/190',
    price: null,
    originalPrice: null,
    image: '/images/HOST23.jpeg',
    category: 'Chambre',
    slug: 'matelas',
    rating: 4.8,
    reviews: 22,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 20,
    name: 'Portes intérieures',
    description: 'Portes intérieures en PVC résistantes à l’eau et aux termites. Porte + Cadre + Accessoires',
    price: null,
    originalPrice: null,
    image: '/images/porteinterieure1.jpeg',
    category: 'Portes',
    slug: 'portes-interieures',
    rating: 4.6,
    reviews: 28,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 21,
    name: 'Porte Blindée un battant',
    description: " Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : GRISE",
    price: null,
    originalPrice: null,
    image: '/images/posteblindé1.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 22,
    name: 'Porte Blindée un battant',
    description:
      " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : OCRE",
    price: null,
    originalPrice: null,
    image: '/images/porteblinde2.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 23,
    name: 'Porte Blindée un battant',
    description: " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : 801",
    price: null,
    originalPrice: null,
    image: '/images/blinde3.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 24,
    name: 'Porte Blindée un battant',
    description:
      " Porte Blindée un battant Dimensions : Hauteur : 210cm Largeur : 90 - 100cm Modèle : Marron - Noir",
    price: null,
    originalPrice: null,
    image: '/images/blinde4.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 25,
    name: 'Porte Blindée double battants',
    description:
      " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : 801 sans Vitre",
    price: null,
    originalPrice: null,
    image: '/images/blindesansvitre.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 26,
    name: 'Porte Blindée double battants',
    description:
      " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : OCRE",
    price: null,
    originalPrice: null,
    image: '/images/doublebatant.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  // {
  //   id: 27,
  //   name: 'Porte Blindée double battants',
  //   description:
  //     " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : 801 sans Vitre",
  //   price: null,
  //   originalPrice: null,
  //   image: '/images/doublebatant.jpeg',
  //   category: 'Portes',
  //   slug: 'portes-blindees',
  //   rating: 4.7,
  //   reviews: 18,
  //   badge: 'Premium',
  //   inStock: true
  // },
  {
    id: 28,
    name: 'Porte Blindée double battants',
    description:
      " Porte Blindée double battants Dimensions : Hauteur : 210-215cm Largeur : 130cm Modèle : Marron - Noir",
    price: null,
    originalPrice: null,
    image: '/images/porteblinddouble.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  },
  {
    id: 29,
    name: 'Tapis ',
    description: '',
    price: null,
    originalPrice: null,
    image: '/images/tapisphoto1.jpeg',
    category: 'Décoration',
    slug: 'tapis',
    rating: 4.7,
    reviews: 15,
    badge: 'Nouveau',
    inStock: true
  }, {
    id: 30,
    name: 'Chambre à coucher NEPTUN',
    description:
      "Composée de 9 pièces : Lit + Armoire + 2 Chevets + POUF + Banquette + Meuble de rangement + Miroir debout sur Tiroir",
    price: null,
    originalPrice: null,
    image: '/images/chambreneptun.jpeg',
    category: 'Salone',
    slug: 'chambre-coucher',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
  {
    id: 31,
    name: 'salon cuir',
    description:
      "Salon cuir 8 places: vert, beige,noir et marron",
    price: null,
    originalPrice: null,
    image: '/images/capturesaloncuire.jpeg',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
   {
    id: 32,
    name: 'Ensemble + meuble Tv + table basse',
    description:
      "Ensemble + meuble Tv + table basse",
    price: null,
    originalPrice: null,
    image: '/images/salonmodernecuir.jpeg',
    category: 'Salon',
    slug: 'salons-modernes',
    rating: 4.6,
    reviews: 28,
    badge: 'Nouveau',
    inStock: true
  },
   {
    id: 33,
    name: 'Porte Blindée double battants',
    description:
      "Porte Blindée double battants ensions :Hauteur : 210-215cm Largeur : 130cm Modèle : 801 Vitrée",
    price: null,
    originalPrice: null,
    image: '/images/porteblindevitre.jpeg',
    category: 'Portes',
    slug: 'portes-blindees',
    rating: 4.7,
    reviews: 18,
    badge: 'Premium',
    inStock: true
  }, {
    id: 34,
    name: 'Portes intérieures',
    description: 'Portes intérieures en PVC résistantes à l’eau et aux termites. Porte + Cadre + Accessoires',
    price: null,
    originalPrice: null,
    image: '/images/porteinterieur2.jpeg',
    category: 'Portes',
    slug: 'portes-interieures',
    rating: 4.6,
    reviews: 28,
    badge: 'Premium',
    inStock: true
  }, {
    id: 35,
    name: 'Portes intérieures',
    description: 'Portes intérieures en PVC résistantes à l’eau et aux termites. Porte + Cadre + Accessoires',
    price: null,
    originalPrice: null,
    image: '/images/porteinterieure3.jpeg',
    category: 'Portes',
    slug: 'portes-interieures',
    rating: 4.6,
    reviews: 28,
    badge: 'Premium',
    inStock: true
  }, {
    id: 36,
    name: 'Portes intérieures',
    description: 'Portes intérieures en PVC résistantes à l’eau et aux termites. Porte + Cadre + Accessoires',
    price: null,
    originalPrice: null,
    image: '/images/porteinterieure4.jpeg',
    category: 'Portes',
    slug: 'portes-interieures',
    rating: 4.6,
    reviews: 28,
    badge: 'Premium',
    inStock: true
  },
]

// Sélection pour la Home
export const featuredProducts: Product[] = [
  allProducts.find(p => p.id === 1)!,   // Salon RIHTIM
  allProducts.find(p => p.id === 9)!,   // NOBEL (Salle à Manger)
  allProducts.find(p => p.id === 10)!,  // RIHTIM (Salle à Manger)
  allProducts.find(p => p.id === 15)!,  // SALON PARIS
  allProducts.find(p => p.id === 6)!    // LIFESTYLE (Hero)
]

export function getProductById(id: number): Product | undefined {
  return allProducts.find(p => p.id === id)
}
