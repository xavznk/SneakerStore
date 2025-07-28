"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/admin/AdminLayout"
import { Package, ShoppingCart, Users, TrendingUp, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Données fictives pour le dashboard
const stats = [
  {
    title: "Produits",
    value: "24",
    change: "+2 ce mois",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Commandes",
    value: "156",
    change: "+12 cette semaine",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Clients",
    value: "89",
    change: "+5 ce mois",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Revenus",
    value: "2.4M FCFA",
    change: "+18% ce mois",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const recentOrders = [
  {
    id: "CMD-001",
    customer: "Jean Dupont",
    product: "Nike Air Max 270",
    amount: "45,000 FCFA",
    status: "En cours",
    date: "Il y a 2h",
  },
  {
    id: "CMD-002",
    customer: "Marie Kouam",
    product: "Adidas Ultraboost 22",
    amount: "52,000 FCFA",
    status: "Livré",
    date: "Il y a 4h",
  },
  {
    id: "CMD-003",
    customer: "Paul Mbarga",
    product: "Jordan 1 Retro High",
    amount: "68,000 FCFA",
    status: "En attente",
    date: "Il y a 6h",
  },
]

const topProducts = [
  { name: "Nike Air Max 270", sales: 45, revenue: "2,025,000 FCFA" },
  { name: "Adidas Ultraboost 22", sales: 32, revenue: "1,664,000 FCFA" },
  { name: "Jordan 1 Retro High", sales: 28, revenue: "1,904,000 FCFA" },
  { name: "Converse Chuck Taylor", sales: 24, revenue: "600,000 FCFA" },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Aperçu de votre boutique SneakerStore</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-600 mb-1 truncate">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 truncate">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1 truncate">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor} ml-4`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Commandes récentes</CardTitle>
                  <CardDescription>Les dernières commandes reçues</CardDescription>
                </div>
                <Link href="/admin/orders">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir tout
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-slate-900">{order.id}</span>
                        <Badge
                          variant={
                            order.status === "Livré" ? "default" : order.status === "En cours" ? "secondary" : "outline"
                          }
                          className={`text-xs ${
                            order.status === "Livré"
                              ? "bg-green-100 text-green-700"
                              : order.status === "En cours"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{order.customer}</p>
                      <p className="text-sm text-slate-500 truncate">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{order.amount}</p>
                      <p className="text-sm text-slate-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Produits populaires</CardTitle>
                  <CardDescription>Les meilleures ventes ce mois</CardDescription>
                </div>
                <Link href="/admin/products">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.sales} ventes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
