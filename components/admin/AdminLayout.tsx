"use client"

import type React from "react"

import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <AdminSidebar />

      {/* Main content */}
      <main className="pt-16 md:ml-64">
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </main>
    </div>
  )
}
