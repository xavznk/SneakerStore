"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import ProductModal from "@/components/admin/ProductModal"
import ProductDetailsModal from "@/components/admin/ProductDetailsModal"
import AdvancedSearch from "@/components/admin/AdvancedSearch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Package } from "lucide-react"
import Image from "next/image"
import type { Product, SearchFilters } from "@/lib/types"

// Données fictives étendues
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 45000,
    images: {
      main: "/placeholder.svg?height=100&width=100&text=Nike+Air+Max",
      secondary: ["/placeholder.svg?height=100&width=100&text=Nike+2", ""],
    },
    category: "chaussures",
    brand: "Nike",
    description: "Chaussures de sport confortables avec technologie Air Max",
    sizes: [
      { size: "38", stock: 3 },
      { size: "39", stock: 5 },
      { size: "40", stock: 2 },
      { size: "41", stock: 8 },
      { size: "42", stock: 4 },
    ],
    status: "Actif",
    sales: 45,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Maillot PSG Domicile",
    price: 35000,
    images: {
      main: "/placeholder.svg?height=100&width=100&text=Maillot+PSG",
      secondary: ["", ""],
    },
    category: "vêtements",
    brand: "Nike",
    description: "Maillot officiel du Paris Saint-Germain saison 2024",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 5 },
    ],
    status: "Actif",
    sales: 32,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Ballon Nike Premier League",
    price: 15000,
    images: {
      main: "/placeholder.svg?height=100&width=100&text=Ballon+Nike",
      secondary: ["", ""],
    },
    category: "ballons",
    brand: "Nike",
    description: "Ballon officiel de la Premier League",
    sizes: [{ size: "Taille 5", stock: 20 }],
    status: "Actif",
    sales: 28,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
  },
  {
    id: 4,
    name: "Casquette Adidas",
    price: 8000,
    images: {
      main: "/placeholder.svg?height=100&width=100&text=Casquette",
      secondary: ["", ""],
    },
    category: "accessoires",
    brand: "Adidas",
    description: "Casquette ajustable en coton",
    sizes: [{ size: "unique", stock: 25 }],
    status: "Stock faible",
    sales: 15,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-28",
  },
]

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    brand: "all",
    size: "all",
    status: "all",
  })

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

  // Fonction de filtrage avancée
  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      !filters.query ||
      product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.query.toLowerCase()) ||
      (product.customBrand && product.customBrand.toLowerCase().includes(filters.query.toLowerCase()))

    const matchesCategory = filters.category === "all" || product.category === filters.category
    const matchesBrand =
      filters.brand === "all" || product.brand === filters.brand || product.customBrand === filters.brand
    const matchesSize = filters.size === "all" || product.sizes.some((s) => s.size === filters.size)
    const matchesStatus = filters.status === "all" || product.status === filters.status

    return matchesQuery && matchesCategory && matchesBrand && matchesSize && matchesStatus
  })

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailsModalOpen(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    }
  }

  const handleSaveProduct = (productData: any) => {
    if (selectedProduct) {
      // Modification
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...productData,
                id: selectedProduct.id,
                sales: selectedProduct.sales,
                createdAt: selectedProduct.createdAt,
                updatedAt: new Date().toISOString(),
              }
            : p,
        ),
      )
    } else {
      // Ajout
      const newProduct: Product = {
        ...productData,
        id: Date.now(),
        sales: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setProducts((prev) => [...prev, newProduct])
    }
  }

  const resetFilters = () => {
    setFilters({
      query: "",
      category: "all",
      brand: "all",
      size: "all",
      status: "all",
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des produits</h1>
            <p className="text-slate-600">Gérez votre catalogue complet</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un produit
          </Button>
        </div>

        {/* Advanced Search */}
        <div className="mb-6">
          <AdvancedSearch filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const totalStock = product.sizes.reduce((sum, size) => sum + size.stock, 0)

            return (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-slate-100">
                      <Image
                        src={product.images.main || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                          <p className="text-sm text-slate-500">
                            {product.customBrand || product.brand} • {product.category}
                          </p>
                        </div>
                        <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Prix:</span>
                          <span className="font-semibold text-slate-900">{formatPrice(product.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Stock total:</span>
                          <span
                            className={`font-semibold ${
                              totalStock === 0 ? "text-red-600" : totalStock < 10 ? "text-orange-600" : "text-green-600"
                            }`}
                          >
                            {totalStock} unités
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Ventes:</span>
                          <span className="font-semibold text-slate-900">{product.sales}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-slate-600 mb-4">
                {Object.values(filters).some((f) => f && f !== "all")
                  ? "Essayez de modifier vos critères de recherche"
                  : "Commencez par ajouter votre premier produit"}
              </p>
              <div className="flex gap-2 justify-center">
                {Object.values(filters).some((f) => f && f !== "all") && (
                  <Button variant="outline" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                )}
                <Button onClick={handleAddProduct} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Modals */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSaveProduct}
        />

        <ProductDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          product={selectedProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </AdminLayout>
  )
}
