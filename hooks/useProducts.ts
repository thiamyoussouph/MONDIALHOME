import { useState, useEffect } from 'react';
import { supaBrowser } from '@/lib/supabase';
import { Product } from '@/types/product';

interface ProductWithCategory extends Product {
    categories?: {
        id: number;
        name: string;
        slug: string;
    };
}

export function useProducts(categoryId?: number) {
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const url = categoryId
                ? `/api/products?category_id=${categoryId}`
                : '/api/products';

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des produits');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erreur lors de la suppression');
            }

            await fetchProducts();
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    return {
        products,
        isLoading,
        error,
        refetch: fetchProducts,
        deleteProduct
    };
}