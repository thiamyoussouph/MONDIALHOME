'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CategoryFormProps {
    categoryId?: number;
    initialData?: {
        name: string;
        description: string;
        image: string;
    };
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CategoryForm({
    categoryId,
    initialData,
    onSuccess,
    onCancel,
}: CategoryFormProps) {
    const isEditing = !!categoryId;

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        initialData?.image || null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Réinitialiser le formulaire quand initialData change
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
            });
            setImagePreview(initialData.image);
            setImageFile(null);
        } else {
            resetForm();
        }
        setError(null);
        setSuccess(false);
    }, [categoryId, initialData]);

    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setImageFile(null);
        setImagePreview(null);
        setError(null);
        setSuccess(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Veuillez sélectionner une image valide');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('L\'image ne doit pas dépasser 5MB');
                return;
            }

            setImageFile(file);
            setError(null);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEditing && !imageFile) {
            setError('Veuillez sélectionner une image');
            return;
        }

        if (!formData.name.trim()) {
            setError('Le nom est obligatoire');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            const url = isEditing ? `/api/categories/${categoryId}` : '/api/categories';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formDataToSend,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la sauvegarde');
            }

            setSuccess(true);

            // Notifier le parent
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            }

            // Réinitialiser si création
            if (!isEditing) {
                setTimeout(() => {
                    resetForm();
                }, 1500);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    {isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </h2>
                {isEditing && (
                    <span className="text-sm text-gray-500">ID: {categoryId}</span>
                )}
            </div>

            {/* Messages */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    ⚠️ {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    ✅ Catégorie {isEditing ? 'mise à jour' : 'créée'} avec succès !
                </div>
            )}

            {/* Nom */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom de la catégorie <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Ex: Électronique, Vêtements..."
                    disabled={isSubmitting}
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Décrivez cette catégorie..."
                    disabled={isSubmitting}
                />
            </div>

            {/* Image */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Image de la catégorie{' '}
                    {!isEditing && <span className="text-red-500">*</span>}
                </label>

                {imagePreview && (
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                            src={imagePreview}
                            alt="Aperçu"
                            fill
                            className="object-cover"
                        />
                        {imageFile && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Nouvelle image
                            </div>
                        )}
                    </div>
                )}

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            {isEditing
                                ? 'Changer l\'image (optionnel)'
                                : 'Cliquez pour sélectionner une image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, WEBP • Max 5MB
                        </p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required={!isEditing}
                        disabled={isSubmitting}
                    />
                </label>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting || (!isEditing && !imageFile)}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            {isEditing ? 'Mise à jour...' : 'Création...'}
                        </>
                    ) : (
                        <>
                            {isEditing ? (
                                <>
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Mettre à jour
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Créer la catégorie
                                </>
                            )}
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                >
                    {isEditing ? 'Annuler' : 'Réinitialiser'}
                </button>
            </div>
        </form>
    );
}
