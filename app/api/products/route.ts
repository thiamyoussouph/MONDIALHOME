import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { supaBrowser } from '@/lib/supabase';

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// POST : Créer un produit
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const originalPrice = formData.get('original_price') as string;
        const categoryId = formData.get('category_id') as string;
        const badge = formData.get('badge') as string;
        const inStock = formData.get('in_stock') === 'true';
        const imageFile = formData.get('image') as File;

        // Validation
        if (!name || !imageFile || !categoryId) {
            return NextResponse.json(
                { error: 'Le nom, l\'image et la catégorie sont obligatoires' },
                { status: 400 }
            );
        }

        const slug = generateSlug(name);
        const supabase = supaBrowser();

        // Vérifier si le slug existe déjà
        const { data: existingProduct } = await supabase
            .from('products')
            .select('id')
            .eq('slug', slug)
            .maybeSingle();

        if (existingProduct) {
            return NextResponse.json(
                { error: 'Un produit avec ce nom existe déjà' },
                { status: 409 }
            );
        }

        // Upload image vers Cloudinary
        console.log('📤 Upload image produit...');
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

        const imageUrl = uploadResult.secure_url;
        const publicId = uploadResult.public_id;
        console.log('✅ Image uploadée:', imageUrl);

        // Créer le produit
        const { data: product, error: insertError } = await supabase
            .from('products')
            .insert({
                name,
                slug,
                description: description || null,
                price: price ? parseFloat(price) : null,
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                image: imageUrl,
                category: parseInt(categoryId),
                badge: badge || null,
                inStock: inStock,
                rating: 0,
                reviews: 0
            })
            .select()
            .single();

        if (insertError) {
            console.error('❌ Erreur Supabase:', insertError);
            await cloudinary.uploader.destroy(publicId);
            throw insertError;
        }

        console.log('✅ Produit créé:', product);

        return NextResponse.json({
            success: true,
            product,
            cloudinary: {
                publicId,
                url: imageUrl
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Erreur:', error);
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la création du produit' },
            { status: 500 }
        );
    }
}

// GET : Récupérer tous les produits
export async function GET(request: NextRequest) {
    try {
        const supabase = supaBrowser();
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get('category_id');

        let query = supabase
            .from('products')
            .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
            .order('created_at', { ascending: false });

        // Filtrer par catégorie si fourni
        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        const { data: products, error } = await query;

        if (error) throw error;

        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}