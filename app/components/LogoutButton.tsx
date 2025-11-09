"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signOut();

        setLoading(false);

        if (error) {
            alert("Erreur lors de la déconnexion : " + error.message);
        } else {
            // Redirection vers la page de login
            router.push("/auth");
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 border-2 text-gray-700 border-gray-200 rounded-xl hover:border-accent hover:text-accent transition disabled:opacity-50"
        >
            {loading ? "Déconnexion..." : "Se déconnecter"}
        </button>
    );
}
