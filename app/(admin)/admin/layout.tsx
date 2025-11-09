import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/app/components/AdminSidebar";
import { AdminHeader } from "@/app/components/AdminHeader";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    // ✅ Client Supabase côté serveur
    const supabase = createServerSupabase();

    // ✅ Récupération de l'utilisateur connecté
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("Utilisateur connecté :", user);

    // ✅ Redirection si pas connecté
    if (!user) {
        redirect("/auth");
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar grande écran */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col flex-1">
                <AdminHeader />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
