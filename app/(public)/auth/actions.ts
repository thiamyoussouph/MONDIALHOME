"use server";

import { supaBrowser } from "@/lib/supabase";


export async function signIn({ email, password }: { email: string; password: string }) {
    const supabase = supaBrowser();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
