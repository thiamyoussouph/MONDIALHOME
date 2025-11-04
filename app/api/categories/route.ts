import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

// Fonction pour générer un slug
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprimer accents
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// POST : Créer une catégorie
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File;

        // Validation
        if (!name || !imageFile) {
            return NextResponse.json(
                { error: 'Le nom et l\'image sont obligatoires' },
                { status: 400 }
            );
        }

        // Générer le slug
        const slug = generateSlug(name);

        // Vérifier si le slug existe déjà
        const { data: existingCategory } = await supaBrowser()
            .from('categories')
            .select('id')
            .eq('slug', slug)
            .single();

        if (existingCategory) {
            return NextResponse.json(
                { error: 'Une catégorie avec ce nom existe déjà' },
                { status: 409 }
            );
        }

        // 1️⃣ UPLOAD IMAGE VERS CLOUDINARY
        console.log('📤 Upload image vers Cloudinary...');
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

        const imageUrl = uploadResult.secure_url;
        const publicId = uploadResult.public_id;
        console.log('✅ Image uploadée:', imageUrl);

        // 2️⃣ CRÉER LA CATÉGORIE DANS SUPABASE
        console.log('💾 Création de la catégorie dans Supabase...');
        const { data: category, error: insertError } = await supaBrowser()
            .from('categories')
            .insert({
                name,
                slug,
                image: imageUrl,
                description: description || '',
            })
            .select()
            .single();

        if (insertError) {
            console.error('Erreur Supabase:', insertError);
            // Supprimer l'image de Cloudinary en cas d'erreur
            await cloudinary.uploader.destroy(publicId);
            throw insertError;
        }

        console.log('✅ Catégorie créée:', category);

        return NextResponse.json({
            success: true,
            category,
            cloudinary: {
                publicId,
                url: imageUrl
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Erreur lors de la création:', error);
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la création de la catégorie' },
            { status: 500 }
        );
    }
}

// GET : Récupérer toutes les catégories
export async function GET() {
    try {
        const { data: categories, error } = await supaBrowser()
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(categories);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la récupération' },
            { status: 500 }
        );
    }
}