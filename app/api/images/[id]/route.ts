import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// GET : Récupérer une image spécifique
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const supabase = supaBrowser();

        const { data: image, error } = await supabase
            .from('images')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!image) {
            return NextResponse.json(
                { error: 'Image non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json(image);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// PUT : Mettre à jour une image (ordre, alt_text)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const { order, alt_text } = await request.json();
        const supabase = supaBrowser();

        const updateData: any = {};
        if (order !== undefined) updateData.order = order;
        if (alt_text !== undefined) updateData.alt_text = alt_text;

        const { data: image, error } = await supabase
            .from('images')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({
            success: true,
            image
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// DELETE : Supprimer une image spécifique
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ✅ Promise
) {
    try {
        const { id } = await params; // ✅ Await params
        const supabase = supaBrowser();

        // Récupérer l'image
        const { data: image, error: fetchError } = await supabase
            .from('images')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !image) {
            return NextResponse.json(
                { error: 'Image non trouvée' },
                { status: 404 }
            );
        }

        // Supprimer de Cloudinary
        const publicId = image.url
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
            console.warn('⚠️ Erreur suppression Cloudinary:', deleteError);
        }

        // Supprimer de la base de données
        const { error: deleteError } = await supabase
            .from('images')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({
            success: true,
            message: 'Image supprimée'
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}