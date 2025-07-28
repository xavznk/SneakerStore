"use client"

import { useState } from "react"
import { X, ShoppingCart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import type { Product } from "./ProductGrid"
import ImageGallery from "./ImageGallery"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const { dispatch } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une pointure")
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
      },
    })

    alert("Produit ajouté au panier!")
    onClose()
  }

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une pointure")
      return
    }

    const phoneNumber = "+237656533960"
    const message =
      `Bonjour! Je souhaite commander:\n\n` +
      `📦 Produit: ${product.name}\n` +
      `👟 Pointure: ${selectedSize}\n` +
      `💰 Prix: ${formatPrice(product.price)}\n\n` +
      `Merci de me confirmer la disponibilité.`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Détails du produit</h2>
              <p className="text-slate-600">Choisissez votre pointure</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="space-y-4">
                <ImageGallery images={product.images} productName={product.name} />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">{product.brand}</Badge>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">{product.name}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-slate-900">Choisir la pointure *</label>
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 font-semibold transition-all ${
                          selectedSize === size
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "hover:border-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg"
                    disabled={!selectedSize}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au panier
                  </Button>

                  <Button
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 py-3 text-lg font-semibold bg-transparent"
                    disabled={!selectedSize}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Commander via WhatsApp
                  </Button>

                  {!selectedSize && (
                    <p className="text-sm text-red-500 text-center">Veuillez sélectionner une pointure</p>
                  )}
                </div>

                {/* Additional Info */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Informations de livraison</h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Livraison gratuite à Douala et Yaoundé
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Délai de livraison: 24-48h
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Paiement à la livraison disponible
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        Échange possible sous 7 jours
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
