"use client"

import { ReactNode, useState } from "react"
import { AdminSidebar } from "../../components/AdminSidebar"
import { AdminHeader } from "../../components/AdminHeader"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100 ">
            {/* Sidebar en grand écran */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Sidebar mobile (sheet) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative z-50 w-64 bg-white dark:bg-gray-800">
                        <AdminSidebar />
                    </div>
                </div>
            )}

            <div className="flex flex-col flex-1">
                <AdminHeader />
                <main className="">{children}</main>
            </div>
        </div>
    )
}
