"use client"

import { ShoppingBag, Store, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useState } from "react"
import CartDrawer from "./CartDrawer"
import Link from "next/link"

export default function Header() {
  const { state } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SneakerStore
                </h1>
                <p className="text-sm text-slate-500">Premium Collection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin/login">
                <Button variant="outline" size="lg" className="hover:bg-slate-50 border-slate-200 bg-transparent">
                  <User className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-slate-50 border-slate-200"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Panier</span>
                {state.items.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
