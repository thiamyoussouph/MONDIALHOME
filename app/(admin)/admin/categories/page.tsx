'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryForm from './components/CategoryForm';


interface CategoryData {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    // product_count: number;
}

export default function CategoriesPage() {
    const { categories, isLoading, error, deleteCategory, refetch } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
            return;
        }

        const success = await deleteCategory(id);
        if (success && selectedCategory?.id === id) {
            setSelectedCategory(null); // Réinitialiser le formulaire si la catégorie supprimée était sélectionnée
        }
    };

    const handleEdit = (category: CategoryData) => {
        setSelectedCategory(category);
        setIsFormVisible(true);
    };

    const handleNewCategory = () => {
        setSelectedCategory(null);
        setIsFormVisible(true);
    };

    const handleSuccess = () => {
        refetch(); // Rafraîchir la liste
        setSelectedCategory(null); // Réinitialiser le formulaire
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Gestion des Catégories</h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        Erreur : {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LISTE DES CATÉGORIES - GAUCHE */}
                    <div className="lg:col-span-5 xl:col-span-6">
                        <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Catégories ({categories.length})
                                </h2>
                                <button
                                    onClick={handleNewCategory}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    + Nouveau
                                </button>
                            </div>

                            {/* Liste scrollable */}
                            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                                {categories.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>Aucune catégorie</p>
                                        <p className="text-sm">Créez votre première catégorie !</p>
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`border rounded-lg p-3 hover:shadow-md transition cursor-pointer ${selectedCategory?.id === category.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                            onClick={() => handleEdit(category)}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Miniature */}
                                                {/* <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                                                    <Image
                                                        src={category.image}
                                                        alt={category.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div> */}

                                                {/* Infos */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate">
                                                        {category.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                        {category.description || 'Aucune description'}
                                                    </p>
                                                    {/* <p className="text-xs text-gray-400 mt-1">
                                                        {category.product_count} produit(s)
                                                    </p> */}
                                                </div>

                                                {/* Boutons */}
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(category);
                                                        }}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                                                        title="Modifier"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(category.id, category.name);
                                                        }}
                                                        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                                                        title="Supprimer"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* FORMULAIRE - DROITE */}
                    <div className="lg:col-span-7 xl:col-span-6">
                        {isFormVisible ? (
                            <CategoryForm
                                categoryId={selectedCategory?.id}
                                initialData={
                                    selectedCategory
                                        ? {
                                            name: selectedCategory.name,
                                            description: selectedCategory.description,
                                            // image: selectedCategory.image,
                                        }
                                        : undefined
                                }
                                onSuccess={handleSuccess}
                                onCancel={() => setSelectedCategory(null)}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <div className="max-w-md mx-auto">
                                    <svg
                                        className="w-24 h-24 mx-auto text-gray-300 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Sélectionnez une catégorie
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Choisissez une catégorie à modifier ou créez-en une nouvelle
                                    </p>
                                    <button
                                        onClick={handleNewCategory}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        + Nouvelle catégorie
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}