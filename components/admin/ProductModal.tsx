"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import ImageUploader from "./ImageUploader"
import BrandSelector from "./BrandSelector"
import SizeStockInput from "./SizeStockInput"
import { useImageUpload } from "@/hooks/useImageUpload"
import { CATEGORIES } from "@/lib/types"
import type { Product, SizeStock } from "@/lib/types"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
  onSave: (product: Omit<Product, "id" | "sales" | "createdAt" | "updatedAt"> & { id?: number }) => void
}

export default function ProductModal({ isOpen, onClose, product, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "chaussures" as const,
    brand: "",
    customBrand: "",
    description: "",
    status: "Actif" as const,
  })

  const [sizes, setSizes] = useState<SizeStock[]>([])
  const [isCustomBrand, setIsCustomBrand] = useState(false)

  const { images, handleMainImageUpload, handleSecondaryImageUpload, removeSecondaryImage, setImages } = useImageUpload(
    product?.images,
  )

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.customBrand || product.brand,
        customBrand: product.customBrand || "",
        description: product.description,
        status: product.status,
      })
      setSizes(product.sizes)
      setIsCustomBrand(!!product.customBrand)
      setImages({
        main: product.images.main,
        secondary: product.images.secondary,
        previews: {
          main: product.images.main,
          secondary: product.images.secondary,
        },
      })
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        price: 0,
        category: "chaussures",
        brand: "",
        customBrand: "",
        description: "",
        status: "Actif",
      })
      setSizes([])
      setIsCustomBrand(false)
      setImages({
        main: "",
        secondary: ["", ""],
        previews: {
          main: "",
          secondary: ["", ""],
        },
      })
    }
  }, [product, setImages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.brand || sizes.length === 0 || !images.main) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    const productData = {
      ...formData,
      images: {
        main: images.main,
        secondary: images.secondary,
      },
      sizes,
      brand: isCustomBrand ? "" : formData.brand,
      customBrand: isCustomBrand ? formData.brand : undefined,
      ...(product && { id: product.id }),
    }

    onSave(productData)
    onClose()
  }

  const handleBrandChange = (brand: string, isCustom?: boolean) => {
    setFormData((prev) => ({ ...prev, brand }))
    setIsCustomBrand(!!isCustom)
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category: category as any }))
    setSizes([]) // Reset sizes when category changes
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {product ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <p className="text-slate-600">Remplissez les informations du produit</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              <div>
                <ImageUploader
                  images={images}
                  previews={images.previews}
                  onMainImageUpload={handleMainImageUpload}
                  onSecondaryImageUpload={handleSecondaryImageUpload}
                  onRemoveSecondaryImage={removeSecondaryImage}
                />
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Nike Air Max 270"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Prix (FCFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                      placeholder="45000"
                      required
                    />
                  </div>
                </div>

                {/* Category and Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <BrandSelector
                    value={formData.brand}
                    customBrand={formData.customBrand}
                    onChange={handleBrandChange}
                  />
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">Actif</SelectItem>
                      <SelectItem value="Inactif">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description du produit..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Size and Stock - Full Width */}
            <div className="border-t pt-6">
              <SizeStockInput category={formData.category} value={sizes} onChange={setSizes} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {product ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
