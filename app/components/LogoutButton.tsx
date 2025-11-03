"use client";

import { supaBrowser } from "@/lib/supabase";

export function LogoutButton() {

    const supa = supaBrowser()

    const signOut = async () => {
        await supa.auth.signOut()
    }

    return (
        <button
            onClick={signOut}
            className="px-4 py-2 border-2 text-gray-700 border-gray-200 rounded-xl hover:border-accent hover:text-accent transition"
        >
            Se déconnecter
        </button>
    );
}
