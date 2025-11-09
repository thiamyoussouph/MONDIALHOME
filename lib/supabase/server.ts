import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * Crée un client Supabase côté serveur pour App Router / Server Components
 */
export const createServerSupabase = () => {
    return createServerComponentClient({
        cookies, // lecture automatique des cookies HTTPOnly de Supabase
    });
};
