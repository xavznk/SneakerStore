import ProductGrid from "@/components/ProductGrid"
import Header from "@/components/Header"

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 45000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Nike+Air+Max+270+Front",
      "/placeholder.svg?height=400&width=400&text=Nike+Air+Max+270+Side",
      "/placeholder.svg?height=400&width=400&text=Nike+Air+Max+270+Back",
    ],
    description: "Chaussures de sport confortables avec technologie Air Max pour un confort optimal toute la journée",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    brand: "Nike",
    category: "Sport",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 52000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Adidas+Ultraboost+Front",
      "/placeholder.svg?height=400&width=400&text=Adidas+Ultraboost+Side",
      "/placeholder.svg?height=400&width=400&text=Adidas+Ultraboost+Back",
    ],
    description: "Chaussures de course haute performance avec semelle Boost révolutionnaire",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    brand: "Adidas",
    category: "Running",
  },
  {
    id: 3,
    name: "Jordan 1 Retro High",
    price: 68000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Jordan+1+Retro+Front",
      "/placeholder.svg?height=400&width=400&text=Jordan+1+Retro+Side",
      "/placeholder.svg?height=400&width=400&text=Jordan+1+Retro+Back",
    ],
    description: "Baskets iconiques de basketball avec design classique et qualité premium",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45", "46"],
    brand: "Jordan",
    category: "Basketball",
  },
  {
    id: 4,
    name: "Puma RS-X",
    price: 38000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Puma+RS-X+Front",
      "/placeholder.svg?height=400&width=400&text=Puma+RS-X+Side",
      "/placeholder.svg?height=400&width=400&text=Puma+RS-X+Back",
    ],
    description: "Sneakers rétro-futuristes avec design audacieux et technologie moderne",
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    brand: "Puma",
    category: "Lifestyle",
  },
  {
    id: 5,
    name: "Converse Chuck Taylor",
    price: 25000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Converse+Chuck+Front",
      "/placeholder.svg?height=400&width=400&text=Converse+Chuck+Side",
      "/placeholder.svg?height=400&width=400&text=Converse+Chuck+Back",
    ],
    description: "Baskets classiques en toile, intemporelles et polyvalentes pour tous les styles",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    brand: "Converse",
    category: "Casual",
  },
  {
    id: 6,
    name: "New Balance 990v5",
    price: 58000,
    images: [
      "/placeholder.svg?height=400&width=400&text=New+Balance+990+Front",
      "/placeholder.svg?height=400&width=400&text=New+Balance+990+Side",
      "/placeholder.svg?height=400&width=400&text=New+Balance+990+Back",
    ],
    description: "Chaussures premium Made in USA avec confort exceptionnel et durabilité",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    brand: "New Balance",
    category: "Premium",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Collection Premium</h2>
          <p className="text-slate-600">Découvrez nos chaussures de qualité supérieure</p>
        </div>
        <ProductGrid products={products} />
      </main>
    </div>
  )
}
