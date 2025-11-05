// types/image.ts
export interface ProductImage {
    id: number;
    url: string;
    produitId: number; // ✅ Changé de product_id à produitId
    order: number;
    alt_text?: string | null;
    created_at: string;
}

export interface ProductImageUpload {
    file: File;
    alt_text?: string;
}