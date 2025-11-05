'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductForm from './components/ProductForm';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number | null;
    original_price: number | null;
    image: string;
    category_id: number;
    badge: string | null;
    in_stock: boolean;
    categories?: {
        id: number;
        name: string;
        slug: string;
    };
}

export default function ProductsPage() {
    const router = useRouter();
    const { products, isLoading, error, deleteProduct, refetch } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
            return;
        }

        const success = await deleteProduct(id);
        if (success && selectedProduct?.id === id) {
            setSelectedProduct(null);
        }
    };

    const handleEdit = (product: ProductData) => {
        setSelectedProduct(product);
        setIsFormVisible(true);
    };

    const handleNewProduct = () => {
        setSelectedProduct(null);
        setIsFormVisible(true);
    };

    const handleSuccess = () => {
        refetch();
        setSelectedProduct(null);
    };

    // ✅ Nouvelle fonction pour gérer les images
    const handleManageImages = (e: React.MouseEvent, productId: number) => {
        e.stopPropagation();
        router.push(`/admin/products/${productId}/images`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Gestion des Produits</h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        Erreur : {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LISTE DES PRODUITS - GAUCHE */}
                    <div className="lg:col-span-5 xl:col-span-6">
                        <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Produits ({products.length})
                                </h2>
                                <button
                                    onClick={handleNewProduct}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    + Nouveau
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                                {products.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>Aucun produit</p>
                                        <p className="text-sm">Créez votre premier produit !</p>
                                    </div>
                                ) : (
                                    products.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`border rounded-lg p-3 hover:shadow-md transition cursor-pointer ${selectedProduct?.id === product.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                            onClick={() => handleEdit(product)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        {product.categories?.name || 'Sans catégorie'}
                                                    </p>
                                                    <p className="text-xs font-medium text-blue-600 mt-1">
                                                        {product.price
                                                            ? `${product.price.toLocaleString()} FCFA`
                                                            : 'Prix non défini'}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded ${product.in_stock
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                                }`}
                                                        >
                                                            {product.in_stock ? 'En stock' : 'Rupture'}
                                                        </span>
                                                        {product.badge && (
                                                            <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* ✅ BOUTONS D'ACTION AVEC GESTION DES IMAGES */}
                                                <div className="flex flex-col gap-1">
                                                    {/* Bouton Galerie d'images */}
                                                    <button
                                                        onClick={(e) => handleManageImages(e, product.id)}
                                                        className="p-1.5 text-purple-600 hover:bg-purple-100 rounded transition"
                                                        title="Gérer les images"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/* Bouton Modifier */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(product);
                                                        }}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                                                        title="Modifier"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/* Bouton Supprimer */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(product.id, product.name);
                                                        }}
                                                        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                                                        title="Supprimer"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FORMULAIRE - DROITE */}
                    <div className="lg:col-span-7 xl:col-span-6">
                        {isFormVisible ? (
                            <ProductForm
                                productId={selectedProduct?.id}
                                initialData={
                                    selectedProduct
                                        ? {
                                            name: selectedProduct.name,
                                            description: selectedProduct.description || '',
                                            price: selectedProduct.price,
                                            original_price: selectedProduct.original_price,
                                            category_id: selectedProduct.category_id,
                                            image: selectedProduct.image,
                                            badge: selectedProduct.badge || '',
                                            in_stock: selectedProduct.in_stock,
                                        }
                                        : undefined
                                }
                                onSuccess={handleSuccess}
                                onCancel={() => setSelectedProduct(null)}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <div className="max-w-md mx-auto">
                                    <svg
                                        className="w-24 h-24 mx-auto text-gray-300 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Sélectionnez un produit
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Choisissez un produit à modifier ou créez-en un nouveau
                                    </p>
                                    <button
                                        onClick={handleNewProduct}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        + Nouveau produit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
