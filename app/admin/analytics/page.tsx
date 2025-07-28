"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"

// Données fictives pour les analytics
const monthlyStats = [
  { month: "Jan", sales: 1200000, orders: 45, customers: 12 },
  { month: "Fév", sales: 1800000, orders: 67, customers: 18 },
  { month: "Mar", sales: 2400000, orders: 89, customers: 25 },
  { month: "Avr", sales: 2100000, orders: 78, customers: 22 },
  { month: "Mai", sales: 2800000, orders: 102, customers: 31 },
  { month: "Juin", sales: 3200000, orders: 125, customers: 38 },
]

const topCategories = [
  { name: "Sport", sales: 45, revenue: 2025000, growth: 12 },
  { name: "Running", sales: 32, revenue: 1664000, growth: 8 },
  { name: "Basketball", sales: 28, revenue: 1904000, growth: -3 },
  { name: "Casual", sales: 24, revenue: 600000, growth: 15 },
]

const recentMetrics = [
  {
    title: "Revenus ce mois",
    value: "3.2M FCFA",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Commandes ce mois",
    value: "125",
    change: "+23%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Nouveaux clients",
    value: "38",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Taux de conversion",
    value: "3.2%",
    change: "-0.5%",
    trend: "down",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export default function AdminAnalytics() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Statistiques & Analytics</h1>
          <p className="text-slate-600">Analysez les performances de votre boutique</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {recentMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title} className="border-0 shadow-lg">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs lg:text-sm font-medium text-slate-600 mb-1 truncate">{metric.title}</p>
                      <p className="text-lg lg:text-2xl font-bold text-slate-900 truncate">{metric.value}</p>
                      <div className="flex items-center mt-1">
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                        )}
                        <p
                          className={`text-xs lg:text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                        >
                          {metric.change}
                        </p>
                      </div>
                    </div>
                    <div className={`p-2 lg:p-3 rounded-lg ${metric.bgColor} ml-2`}>
                      <Icon className={`w-4 h-4 lg:w-6 lg:h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Monthly Performance */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance mensuelle</CardTitle>
              <CardDescription>Évolution des ventes sur 6 mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={stat.month} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{stat.month} 2024</p>
                        <p className="text-sm text-slate-500">
                          {stat.orders} commandes • {stat.customers} nouveaux clients
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{formatPrice(stat.sales)}</p>
                      {index > 0 && (
                        <div className="flex items-center justify-end">
                          {stat.sales > monthlyStats[index - 1].sales ? (
                            <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                          )}
                          <p
                            className={`text-xs ${stat.sales > monthlyStats[index - 1].sales ? "text-green-600" : "text-red-600"}`}
                          >
                            {Math.abs(
                              ((stat.sales - monthlyStats[index - 1].sales) / monthlyStats[index - 1].sales) * 100,
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Catégories populaires</CardTitle>
              <CardDescription>Performance par catégorie ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{category.name}</p>
                        <p className="text-sm text-slate-500">{category.sales} ventes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{formatPrice(category.revenue)}</p>
                      <div className="flex items-center justify-end">
                        {category.growth > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                        )}
                        <p className={`text-xs ${category.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {Math.abs(category.growth)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Objectifs du mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Revenus</span>
                    <span className="text-sm font-semibold">80%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Commandes</span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Nouveaux clients</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Produits en rupture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Converse Chuck Taylor</span>
                  <Badge className="bg-red-100 text-red-700">Rupture</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nike Air Force 1</span>
                  <Badge className="bg-orange-100 text-orange-700">Stock faible</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Adidas Stan Smith</span>
                  <Badge className="bg-orange-100 text-orange-700">Stock faible</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Résumé rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Commandes aujourd'hui</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Revenus aujourd'hui</span>
                  <span className="font-semibold">340,000 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Panier moyen</span>
                  <span className="font-semibold">42,500 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Taux de retour</span>
                  <span className="font-semibold">2.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
