import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// GET : Récupérer un produit
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = supaBrowser();

        const { data: product, error } = await supabase
            .from('products')
            .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
            .eq('id', params.id)
            .single();

        if (error) throw error;

        if (!product) {
            return NextResponse.json(
                { error: 'Produit non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// PUT : Mettre à jour un produit
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const formData = await request.formData();
        const supabase = supaBrowser();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const originalPrice = formData.get('original_price') as string;
        const categoryId = formData.get('category_id') as string;
        const badge = formData.get('badge') as string;
        const inStock = formData.get('in_stock') === 'true';
        const imageFile = formData.get('image') as File | null;

        const { data: existingProduct, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', params.id)
            .single();

        if (fetchError || !existingProduct) {
            return NextResponse.json(
                { error: 'Produit non trouvé' },
                { status: 404 }
            );
        }

        let imageUrl = existingProduct.image;

        // Upload nouvelle image si fournie
        if (imageFile) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'products',
                        resource_type: 'image',
                        transformation: [
                            { width: 800, height: 800, crop: 'fill' },
                            { quality: 'auto' },
                            { fetch_format: 'auto' }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            imageUrl = uploadResult.secure_url;

            // Supprimer l'ancienne image
            const oldPublicId = existingProduct.image
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];

            try {
                await cloudinary.uploader.destroy(oldPublicId);
            } catch (deleteError) {
                console.warn('⚠️ Erreur suppression ancienne image:', deleteError);
            }
        }

        // Préparer les données de mise à jour
        const updateData: any = {
            image: imageUrl,
            in_stock: inStock
        };

        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description || null;
        if (price) updateData.price = parseFloat(price);
        if (originalPrice) updateData.original_price = parseFloat(originalPrice);
        if (categoryId) updateData.category_id = parseInt(categoryId);
        if (badge !== undefined) updateData.badge = badge || null;

        const { data: updatedProduct, error: updateError } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', params.id)
            .select()
            .single();

        if (updateError) throw updateError;

        return NextResponse.json({
            success: true,
            product: updatedProduct
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// DELETE : Supprimer un produit
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = supaBrowser();

        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', params.id)
            .single();

        if (fetchError || !product) {
            return NextResponse.json(
                { error: 'Produit non trouvé' },
                { status: 404 }
            );
        }

        // Supprimer l'image de Cloudinary
        const publicId = product.image
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
            console.warn('⚠️ Erreur suppression image:', deleteError);
        }

        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .eq('id', params.id);

        if (deleteError) throw deleteError;

        return NextResponse.json({
            success: true,
            message: 'Produit supprimé avec succès'
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}