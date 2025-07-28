export interface Product {
  id: number
  name: string
  price: number
  images: {
    main: string
    secondary: string[]
  }
  category: "chaussures" | "ballons" | "vêtements" | "accessoires"
  brand: string
  customBrand?: string
  description: string
  sizes: SizeStock[]
  status: "Actif" | "Inactif" | "Stock faible" | "Rupture"
  sales: number
  createdAt: string
  updatedAt: string
}

export interface SizeStock {
  size: string
  stock: number
}

export interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  total: number
  status: "En attente" | "En cours" | "Livré" | "Annulé"
  date: string
  shippingAddress: string
  paymentMethod: string
  notes?: string
}

export interface OrderItem {
  productId: number
  productName: string
  productImage: string
  size: string
  quantity: number
  price: number
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: "VIP" | "Actif" | "Nouveau" | "Inactif"
  joinDate: string
  notes?: string
}

export interface MonthlyGoal {
  month: string
  year: number
  target: number
  achieved: number
}

export interface SearchFilters {
  query: string
  category: string
  brand: string
  size: string
  status: string
}

export const CATEGORY_SIZES = {
  chaussures: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"],
  vêtements: ["XS", "S", "M", "L", "XL", "XXL"],
  ballons: ["Taille 3", "Taille 4", "Taille 5"],
  accessoires: [],
}

export const BRANDS = ["Nike", "Adidas", "Jordan", "Puma", "Converse", "New Balance", "Vans", "Reebok"]

export const CATEGORIES = [
  { value: "chaussures", label: "Chaussures" },
  { value: "vêtements", label: "Vêtements" },
  { value: "ballons", label: "Ballons" },
  { value: "accessoires", label: "Accessoires" },
]
