import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// GET : Récupérer toutes les images d'un produit
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const supabase = supaBrowser();

        const { data: images, error } = await supabase
            .from('images')
            .select('*')
            .eq('produitId', id) // ✅ Utilisez produitId (votre nom de colonne)
        if (error) throw error;

        return NextResponse.json(images || []);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// POST : Ajouter une ou plusieurs images
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const formData = await request.formData();
        const productId = parseInt(id);

        // Récupérer tous les fichiers
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'Aucune image fournie' },
                { status: 400 }
            );
        }

        const supabase = supaBrowser();

        // Vérifier que le produit existe
        const { data: product, error: productError } = await supabase
            .from('products')
            .select('id')
            .eq('id', productId)
            .single();

        if (productError || !product) {
            return NextResponse.json(
                { error: 'Produit non trouvé' },
                { status: 404 }
            );
        }

        // Obtenir le nombre actuel d'images pour définir l'ordre
        const { count } = await supabase
            .from('images')
            .select('*', { count: 'exact', head: true })
            .eq('produitId', productId); // ✅ produitId

        const startOrder = count || 0;

        // Upload toutes les images vers Cloudinary
        const uploadPromises = files.map(async (file, index) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: `products/${productId}`,
                        resource_type: 'image',
                        transformation: [
                            { width: 1000, height: 1000, crop: 'limit' },
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

            return {
                url: uploadResult.secure_url,
                produitId: productId, // ✅ produitId (nom de votre colonne)
            };
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Insérer dans Supabase
        const { data: images, error: insertError } = await supabase
            .from('images')
            .insert(uploadedImages)
            .select();

        if (insertError) throw insertError;

        return NextResponse.json({
            success: true,
            images,
            count: images.length
        }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Erreur upload images:', error);
        return NextResponse.json(
            { error: error.message || 'Erreur lors de l\'upload' },
            { status: 500 }
        );
    }
}

// DELETE : Supprimer toutes les images d'un produit
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const supabase = supaBrowser();
        const productId = parseInt(id);

        // Récupérer toutes les images
        const { data: images, error: fetchError } = await supabase
            .from('images')
            .select('*')
            .eq('produitId', productId); // ✅ produitId

        if (fetchError) throw fetchError;

        // Supprimer de Cloudinary
        if (images && images.length > 0) {
            await Promise.all(
                images.map(async (image) => {
                    const publicId = image.url
                        .split('/')
                        .slice(-2)
                        .join('/')
                        .split('.')[0];

                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (error) {
                        console.warn('⚠️ Erreur suppression image:', error);
                    }
                })
            );
        }

        // Supprimer de la base de données
        const { error: deleteError } = await supabase
            .from('images')
            .delete()
            .eq('produitId', productId); // ✅ produitId

        if (deleteError) throw deleteError;

        return NextResponse.json({
            success: true,
            message: `${images?.length || 0} image(s) supprimée(s)`
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}