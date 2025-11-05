'use client';

import { use, useMemo, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, Star, BadgeCheck, Package, Share2 } from 'lucide-react';
import { supaBrowser } from '@/lib/supabase';

type PageProps = {
  params: Promise<{ id: string }>;
};

interface ProductImage {
  id: number;
  url: string;
  produitId: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  originalPrice: number | null;
  image: string;
  category: number;
  rating: number;
  reviews: number;
  badge: string | null;
  inStock: boolean;
  categories?: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  // États
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI States
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [bgPos, setBgPos] = useState('center');
  const zoomRef = useRef<HTMLDivElement | null>(null);

  // Récupérer le produit et ses données associées
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = supaBrowser();

        // 1. Récupérer le produit + catégorie
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select(
            `
          *,
          categories (
            id,
            name,
            slug
          )
        `
          )
          .eq("id", id)
          .single();

        if (productError) {
          if (productError.code === "PGRST116") {
            setError("Produit non trouvé");
            router.replace("/produits");
            return;
          }
          throw productError;
        }

        setProduct(productData);

        // 2. Images du produit
        const { data: imagesData, error: imagesError } = await supabase
          .from("images")
          .select("*")
          .eq("produitId", id)
          .order("created_at", { ascending: true });

        if (imagesError) throw imagesError;
        setProductImages(imagesData || []);

        // 3. Produits liés (même catégorie)
        const categoryId = productData.category;

        if (categoryId) {
          const { data: relatedData, error: relatedError } = await supabase
            .from("products")
            .select(
              `
            *,
            categories (
              id,
              name,
              slug
            )
          `
            )
            .eq("category", categoryId)
            .neq("id", id)
            .limit(3);
          console.log(relatedData);

          if (relatedError) throw relatedError;
          setRelatedProducts(relatedData || []);
        }
      } catch (err: any) {
        console.error("Erreur récupération produit:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  // Construire la galerie d'images (image principale + images additionnelles)
  const images = useMemo<string[]>(() => {
    if (!product) return [];
    const allImages = [product.image, ...productImages.map(img => img.url)];
    return allImages.filter(Boolean) as string[];
  }, [product, productImages]);

  // Zoom-on-hover
  const handleZoomMove = (e: React.MouseEvent) => {
    const el = zoomRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  // Chargement
  if (isLoading) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  // Erreur ou produit non trouvé
  if (!product || error) {
    return null; // Déjà redirigé vers /produits
  }

  // Bloc prix
  const priceBlock =
    product.price !== null ? (
      <div className="flex flex-col">
        <span className="text-3xl font-extrabold text-gray-900">
          {new Intl.NumberFormat('fr-FR').format(product.price)}{' '}
          <span className="text-lg font-semibold text-gray-500">CFA</span>
        </span>
        {product.originalPrice !== null && (
          <span className="text-sm text-gray-400 line-through">
            {new Intl.NumberFormat('fr-FR').format(product.originalPrice)} CFA
          </span>
        )}
      </div>
    ) : (
      <div className="text-xl font-semibold text-gray-800">Sur devis</div>
    );

  return (
    <div className="pt-28 pb-20">
      {/* Fil d'Ariane + retour */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <Link href="/produits" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au catalogue
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        {/* ----- GALERIE ----- */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            {/* Badges */}
            <div className="absolute z-20 top-4 left-4 flex items-center gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur border border-white/40 text-gray-900 shadow">
                  {product.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/90 text-white shadow">
                {product.categories?.name || 'Produit'}
              </span>
            </div>

            {/* Lightbox */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute z-20 top-4 right-4 p-2 rounded-xl bg-white/90 hover:bg-white transition shadow"
              aria-label="Agrandir"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <motion.div
              whileHover={{ rotateX: 3, rotateY: -3 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
            >
              {/* Conteneur zoom */}
              <div
                ref={zoomRef}
                onMouseMove={handleZoomMove}
                onMouseLeave={() => setBgPos('center')}
                className="relative w-full h-[420px] md:h-[520px] cursor-zoom-in"
                style={{
                  backgroundImage: `url(${images[activeIndex]})`,
                  backgroundSize: '140%',
                  backgroundPosition: bgPos,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {/* Image invisible pour accessibilité/lazy */}
                <Image
                  src={images[activeIndex]}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply opacity-0"
                  priority
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-white/0" />
              </div>
            </motion.div>
          </motion.div>

          {/* Thumbnails */}
          {images.length >= 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition ${i === activeIndex
                    ? 'border-orange-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <Image src={src} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ----- INFOS ----- */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 text-gray-700">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <strong>{product.rating}</strong>
                <span className="text-gray-500">/ 5</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="inline-flex items-center gap-1 text-gray-700">
                <BadgeCheck className="w-4 h-4 text-emerald-500" /> Qualité vérifiée
              </span>
              <span className="text-gray-400">•</span>
              <span className="inline-flex items-center gap-1 text-gray-700">
                <Package className="w-4 h-4 text-indigo-500" />{' '}
                {product.inStock ? 'En stock' : 'Sur commande'}
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {product.description || 'Meuble de qualité supérieure pour votre intérieur.'}
          </p>

          {/* Prix / devis + actions */}
          <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4">
              {priceBlock}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: product.name,
                          url: typeof window !== 'undefined' ? window.location.href : '',
                        })
                        .catch(() => { });
                    } else if (typeof window !== 'undefined') {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                  aria-label="Partager"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Livraison Dakar & banlieue • Installation possible • Garantie 2 ans
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Finitions', value: 'Premium' },
              { label: 'Origine', value: 'Turquie' },
              { label: 'Qualité', value: 'Contrôlée' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-4 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">{s.label}</div>
                <div className="text-base font-semibold text-gray-900">{s.value}</div>
              </div>
            ))}
          </div>

          {/* CTAs secondaires */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/produits"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Voir tout le catalogue
            </Link>
            <Link
              href="tel:+221784514040"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              📞 Appeler un conseiller
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition"
            >
              Prendre RDV au showroom
            </Link>
          </div>
        </div>
      </div>

      {/* ----- PRODUITS LIÉS ----- */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dans la même catégorie</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((r) => (
              <Link
                key={r.id}
                href={`/produits/${r.id}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition"
              >
                <div className="relative h-56">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {r.badge && (
                      <span className="px-2.5 py-1 text-[11px] rounded-full bg-white/90 backdrop-blur border border-white/40 font-semibold">
                        {r.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-1 text-[11px] rounded-full bg-orange-500/90 text-white font-semibold">
                      {r.categories?.name || 'Produit'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{r.name}</h3>
                    <span className="flex items-center text-xs text-gray-600">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current mr-1" />
                      {r.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {r.description || 'Meuble de qualité'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ----- LIGHTBOX ----- */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image
              src={images[activeIndex]}
              alt={product.name}
              fill
              className="object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 text-gray-900 hover:bg-white font-semibold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}