import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// ✅ Helper pour extraire params.id correctement
async function getParams(context: { params: Promise<{ id: string }> }) {
    return await context.params;
}

/* =========================================================
   ✅ GET — Récupérer une catégorie par ID
========================================================= */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await getParams(context);

    try {
        const { data: category, error } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', id)
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

/* =========================================================
   ✅ PUT — Modifier une catégorie
========================================================= */
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await getParams(context);

    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;

        // ✅ 1— Vérifier existance catégorie
        const { data: existingCategory, error: fetchError } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !existingCategory) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        let imageUrl = existingCategory.image;

        // ✅ 2— Upload d'une nouvelle image
        if (imageFile) {
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

            // ✅ 3— Supprimer ancienne image
            const oldPublicId = existingCategory.image
                .split('/')
                .slice(-2)
                .join('/')
                .split('.')[0];

            try {
                await cloudinary.uploader.destroy(oldPublicId);
            } catch { }
        }

        // ✅ 4— Mise à jour DB
        const updateData: any = {
            image: imageUrl
        };

        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;

        const { data: updatedCategory, error: updateError } = await supaBrowser()
            .from('categories')
            .update(updateData)
            .eq('id', id)
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
            { error: error.message ?? 'Erreur lors de la mise à jour' },
            { status: 500 }
        );
    }
}

/* =========================================================
   ✅ DELETE — Supprimer une catégorie
========================================================= */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await getParams(context);

    try {
        // ✅ Vérifier existance
        const { data: category, error: fetchError } = await supaBrowser()
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !category) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        // ✅ Supprimer image Cloudinary
        const publicId = category.image
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch { }

        // ✅ Supprimer en DB
        const { error: deleteError } = await supaBrowser()
            .from('categories')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({
            success: true,
            message: 'Catégorie supprimée avec succès'
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message ?? 'Erreur lors de la suppression' },
            { status: 500 }
        );
    }
}
