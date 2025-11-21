import { MetadataRoute } from 'next'
import { supaBrowser } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mondialehomesn.com'
  const supabase = supaBrowser()

  // --- TEST DEBOGAGE ---
  console.log("🔄 Génération du sitemap...")

  // 1. Récupérer les catégories
  const { data: categoriesData, error: catError } = await supabase
    .from('categories')
    .select('slug')
  
  if (catError) console.error("❌ Erreur Catégories:", catError.message)
  else console.log("✅ Catégories trouvées:", categoriesData?.length)

  // 2. Récupérer les produits
  const { data: productsData, error: prodError } = await supabase
    .from('products')
    .select('id, updated_at')
  
  if (prodError) console.error("❌ Erreur Produits:", prodError.message)
  else console.log("✅ Produits trouvés:", productsData?.length)
  // ---------------------

  // A. Pages Statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/produits`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]

  // B. URLs Catégories
  const categoryUrls: MetadataRoute.Sitemap = (categoriesData || []).map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // C. URLs Produits
  const productUrls: MetadataRoute.Sitemap = (productsData || []).map((product) => ({
    url: `${baseUrl}/produits/${product.id}`,
    // Si updated_at est null, on met la date d'aujourd'hui
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryUrls, ...productUrls]
}