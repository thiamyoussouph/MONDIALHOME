'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/image';

interface ProductImageGalleryProps {
    productId: number;
}

export default function ProductImageGallery({ productId }: ProductImageGalleryProps) {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Récupérer les images
    const fetchImages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/products/${productId}/images`);

            if (!response.ok) throw new Error('Erreur lors de la récupération');

            const data = await response.json();
            console.log(data);

            setImages(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchImages();
        }
    }, [productId]);

    // Upload de nouvelles images
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('images', file);
            });

            const response = await fetch(`/api/products/${productId}/images`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erreur lors de l\'upload');
            }

            await fetchImages();

            // Réinitialiser l'input
            e.target.value = '';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Supprimer une image
    const handleDelete = async (imageId: number) => {
        if (!confirm('Supprimer cette image ?')) return;

        try {
            const response = await fetch(`/api/images/${imageId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression');

            await fetchImages();
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Supprimer toutes les images
    const handleDeleteAll = async () => {
        if (!confirm(`Supprimer toutes les ${images.length} image(s) ?`)) return;

        try {
            const response = await fetch(`/api/products/${productId}/images`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression');

            await fetchImages();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    Galerie d'images ({images.length})
                </h3>
                {images.length > 0 && (
                    <button
                        onClick={handleDeleteAll}
                        className="text-sm text-red-600 hover:text-red-700"
                    >
                        Tout supprimer
                    </button>
                )}
            </div>

            {/* Erreur */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Upload */}
            <div>
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                    <div className="text-center">
                        {isUploading ? (
                            <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                <p className="text-sm text-gray-600">Upload en cours...</p>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="mx-auto h-10 w-10 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-600">
                                    Cliquez pour ajouter des images
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, WEBP • Max 5MB par image</p>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                        disabled={isUploading}
                    />
                </label>
            </div>

            {/* Grille d'images */}
            {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition"
                        >
                            <Image
                                src={image.url}
                                alt={image.alt_text || `Image ${image.id}`}
                                className="object-cover"
                                width={500}
                                height={500}
                            />

                            {/* Overlay avec bouton supprimer */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="opacity-0 group-hover:opacity-100 transition p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    title="Supprimer"
                                >
                                    <svg
                                        className="w-5 h-5"
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
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-300 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-sm">Aucune image</p>
                    <p className="text-xs">Ajoutez des images à ce produit</p>
                </div>
            )}
        </div>
    );
}