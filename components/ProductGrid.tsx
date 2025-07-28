"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"

export interface Product {
  id: number
  name: string
  price: number
  images: string[]
  description: string
  sizes: string[]
  brand: string
  category: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
        ))}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </>
  )
}
