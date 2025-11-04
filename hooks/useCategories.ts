import { useState, useEffect } from 'react';
import { supaBrowser } from '@/lib/supabase';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    // product_count: number;
    created_at: string;
    updated_at: string;
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supaBrowser()
                .from('categories')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setCategories(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            // Rafraîchir la liste
            await fetchCategories();
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        isLoading,
        error,
        refetch: fetchCategories,
        deleteCategory
    };
}