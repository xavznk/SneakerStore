"use client"

import { X, Edit, Trash2, Package, TrendingUp, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/types"

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
}

export default function ProductDetailsModal({ product, isOpen, onClose, onEdit, onDelete }: ProductDetailsModalProps) {
  if (!isOpen || !product) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-700"
      case "Stock faible":
        return "bg-orange-100 text-orange-700"
      case "Rupture":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Détails du produit</h2>
              <p className="text-slate-600">Informations complètes</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Images */}
              <div className="space-y-4">
                {/* Image principale */}
                <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image
                    src={product.images.main || "/placeholder.svg?height=400&width=400"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Images secondaires */}
                {product.images.secondary.some((img) => img) && (
                  <div className="grid grid-cols-2 gap-3">
                    {product.images.secondary.map(
                      (image, index) =>
                        image && (
                          <div key={index} className="aspect-square relative rounded-lg overflow-hidden bg-slate-100">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${product.name} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>

              {/* Informations */}
              <div className="space-y-6">
                {/* En-tête produit */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {product.customBrand || product.brand}
                    </Badge>
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">{product.name}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </div>
                </div>

                <Separator />

                {/* Statistiques */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border border-slate-200">
                    <CardContent className="p-4 text-center">
                      <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-slate-900">{totalStock}</p>
                      <p className="text-sm text-slate-600">En stock</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-slate-200">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-slate-900">{product.sales}</p>
                      <p className="text-sm text-slate-600">Vendus</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-slate-200">
                    <CardContent className="p-4 text-center">
                      <Tag className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-slate-900">{product.sizes.length}</p>
                      <p className="text-sm text-slate-600">Tailles</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Stock par taille */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Stock par taille</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((sizeStock, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-700">{sizeStock.size}</span>
                        <Badge
                          variant="outline"
                          className={`${
                            sizeStock.stock === 0
                              ? "border-red-200 text-red-700"
                              : sizeStock.stock < 5
                                ? "border-orange-200 text-orange-700"
                                : "border-green-200 text-green-700"
                          }`}
                        >
                          {sizeStock.stock}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informations système */}
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Créé le {new Date(product.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Modifié le {new Date(product.updatedAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    onClick={() => onEdit(product)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
                        onDelete(product.id)
                        onClose()
                      }
                    }}
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
