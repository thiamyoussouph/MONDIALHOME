"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AdminSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const items = [
        { name: "Catégories", href: "/admin/categories" },
        { name: "Produits", href: "/admin/products" },
    ];

    return (
        <>
            {/* Mobile overlay sidebar */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
          h-full w-48 p-4 bg-white   text-gray-800 z-50
          border-r shadow transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                {/* Logo */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="text-2xl font-bold text-blue-600 tracking-wide"
                    >
                        <img src="/images/logo.png" alt="Logo"  width={48} height={48} 
               
    className="rounded-full border-2 border-accent-600 shadow-md hover:scale-110 transition-transform"/>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="space-y-3">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-2 rounded ${pathname?.startsWith(item.href)
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-300"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile toggle button (Hamburger) */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded shadow"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>
        </>
    );
}
