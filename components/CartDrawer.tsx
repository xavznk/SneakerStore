"use client"

import { X, Plus, Minus, MessageCircle, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const updateQuantity = (id: number, size: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, size, quantity },
    })
  }

  const removeItem = (id: number, size: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id, size },
    })
  }

  const handleWhatsAppOrder = () => {
    if (state.items.length === 0) return

    const phoneNumber = "+237656533960"
    let message = "Bonjour! Je souhaite commander:\n\n"

    state.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Pointure: ${item.size}\n`
      message += `   Quantité: ${item.quantity}\n`
      message += `   Prix unitaire: ${formatPrice(item.price)}\n`
      message += `   Sous-total: ${formatPrice(item.price * item.quantity)}\n\n`
    })

    message += `💰 TOTAL: ${formatPrice(state.total)}\n\n`
    message += "Merci de me confirmer la disponibilité et les détails de livraison."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mon Panier</h2>
              <p className="text-slate-600">
                {state.items.length} article{state.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <X className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Panier vide</h3>
                <p className="text-slate-600">Ajoutez des produits pour commencer</p>
              </div>
            ) : (
              state.items.map((item) => (
                <Card key={`${item.id}-${item.size}`} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-slate-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Pointure {item.size}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t bg-white p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(state.total)}
                </span>
              </div>

              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Commander via WhatsApp
              </Button>

              <Button
                variant="outline"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                Vider le panier
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
