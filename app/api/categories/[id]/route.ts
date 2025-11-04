import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// GET : Récupérer une catégorie
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data: category, error } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error) throw error;

        if (!category) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// PUT : Mettre à jour une catégorie
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;

        const categoryId = params.id;

        // Récupérer la catégorie existante
        const { data: existingCategory, error: fetchError } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', categoryId)
            .single();

        if (fetchError || !existingCategory) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        let imageUrl = existingCategory.image;

        // Si une nouvelle image est fournie
        if (imageFile) {
            console.log('📤 Upload nouvelle image...');

            // Upload nouvelle image
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'categories',
                        resource_type: 'image',
                        transformation: [
                            { width: 600, height: 600, crop: 'fill' },
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

            // Supprimer l'ancienne image de Cloudinary
            const oldPublicId = existingCategory.image
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];

            try {
                await cloudinary.uploader.destroy(oldPublicId);
                console.log('🗑️ Ancienne image supprimée');
            } catch (deleteError) {
                console.warn('⚠️ Erreur suppression ancienne image:', deleteError);
            }
        }

        // Mettre à jour dans Supabase
        const updateData: any = {
            image: imageUrl
        };

        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;

        const { data: updatedCategory, error: updateError } = await supaBrowser()
            .from('categories')
            .update(updateData)
            .eq('id', categoryId)
            .select()
            .single();

        if (updateError) throw updateError;

        return NextResponse.json({
            success: true,
            category: updatedCategory
        });

    } catch (error: any) {
        console.error('❌ Erreur mise à jour:', error);
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}

// DELETE : Supprimer une catégorie
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Récupérer la catégorie
        const { data: category, error: fetchError } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', params.id)
            .single();

        if (fetchError || !category) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        // Supprimer l'image de Cloudinary
        const publicId = category.image
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];

        try {
            await cloudinary.uploader.destroy(publicId);
            console.log('🗑️ Image supprimée de Cloudinary');
        } catch (deleteError) {
            console.warn('⚠️ Erreur suppression image:', deleteError);
        }

        // Supprimer de Supabase
        const { error: deleteError } = await supaBrowser()
            .from('categories')
            .delete()
            .eq('id', params.id);

        if (deleteError) throw deleteError;

        return NextResponse.json({
            success: true,
            message: 'Catégorie supprimée avec succès'
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}