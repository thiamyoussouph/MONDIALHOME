"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export function AdminHeader() {
    const pathname = usePathname();
    const [title, setTitle] = useState("");

    const titles: Record<string, string> = {
        "/admin/categories": "Gestion des catégories",
        "/admin/products": "Gestion des produits",
    };

    const pageTitle =
        Object.entries(titles).find(([path]) => pathname.startsWith(path))?.[1] ??
        "Dashboard";

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white z-20">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-700">{pageTitle}</h1>

            {/* Logout */}
            <LogoutButton />
        </header>
    );
}
