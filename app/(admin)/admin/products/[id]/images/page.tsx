'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supaBrowser } from '@/lib/supabase';
import ProductImageGallery from '../../components/ProductImageGallery';

export default function ProductImagesPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);
    const [productName, setProductName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const supabase = supaBrowser();
                const { data, error } = await supabase
                    .from('products')
                    .select('name')
                    .eq('id', productId)
                    .single();

                if (error) throw error;
                setProductName(data.name);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-200 rounded-full transition"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold">Galerie d'images</h1>
                        <p className="text-gray-600">{productName}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <ProductImageGallery productId={productId} />
                </div>
            </div>
        </div>
    );
}