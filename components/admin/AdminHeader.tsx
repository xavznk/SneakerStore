"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, LogOut, Home, Bell } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

export default function AdminHeader() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo et nom de la boutique - Responsive */}
        <div className="flex items-center space-x-2 md:space-x-3 ml-12 md:ml-0">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 md:p-2 rounded-lg">
            <Store className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SneakerStore
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">Administration</p>
          </div>
        </div>

        {/* Actions du header */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center p-0">
              3
            </Badge>
          </Button>

          {/* Informations utilisateur - Masqué sur mobile */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{user?.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Home className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Accueil</span>
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
