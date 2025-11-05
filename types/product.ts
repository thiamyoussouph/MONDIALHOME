// types/product.ts
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number | null;
    original_price: number | null;
    image: string;
    category_id: number;
    rating: number;
    reviews: number;
    badge: string | null;
    in_stock: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProductWithCategory extends Product {
    category_name?: string;
    category_slug?: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    original_price: string;
    category_id: string;
    badge: string;
    in_stock: boolean;
}