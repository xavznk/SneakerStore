"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Truck, Package, CheckCircle, XCircle, Filter } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"

// Données fictives des commandes
const orders = [
  {
    id: "CMD-001",
    customer: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+237 690 123 456",
    product: "Nike Air Max 270",
    size: "42",
    quantity: 1,
    amount: 45000,
    status: "En cours",
    date: "2024-01-15",
    address: "Douala, Akwa",
  },
  {
    id: "CMD-002",
    customer: "Marie Kouam",
    email: "marie.kouam@email.com",
    phone: "+237 691 234 567",
    product: "Adidas Ultraboost 22",
    size: "38",
    quantity: 2,
    amount: 104000,
    status: "Livré",
    date: "2024-01-14",
    address: "Yaoundé, Bastos",
  },
  {
    id: "CMD-003",
    customer: "Paul Mbarga",
    email: "paul.mbarga@email.com",
    phone: "+237 692 345 678",
    product: "Jordan 1 Retro High",
    size: "44",
    quantity: 1,
    amount: 68000,
    status: "En attente",
    date: "2024-01-13",
    address: "Douala, Bonanjo",
  },
  {
    id: "CMD-004",
    customer: "Sophie Nkomo",
    email: "sophie.nkomo@email.com",
    phone: "+237 693 456 789",
    product: "Converse Chuck Taylor",
    size: "37",
    quantity: 1,
    amount: 25000,
    status: "Annulé",
    date: "2024-01-12",
    address: "Yaoundé, Melen",
  },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-700"
      case "En cours":
        return "bg-blue-100 text-blue-700"
      case "En attente":
        return "bg-orange-100 text-orange-700"
      case "Annulé":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Livré":
        return <CheckCircle className="w-4 h-4" />
      case "En cours":
        return <Truck className="w-4 h-4" />
      case "En attente":
        return <Package className="w-4 h-4" />
      case "Annulé":
        return <XCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Mise à jour commande ${orderId} vers ${newStatus}`)
    // Ici vous pourriez mettre à jour l'état local ou faire un appel API
  }

  const handleViewOrder = (orderId: string) => {
    console.log("Voir commande:", orderId)
    // Ouvrir modal de détails ou naviguer vers page de détails
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des commandes</h1>
          <p className="text-slate-600">Suivez et gérez toutes les commandes</p>
        </div>

        {/* Rest of the existing content... */}
        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher une commande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Livré">Livré</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Client:</span> {order.customer}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {order.email}
                      </p>
                      <p>
                        <span className="font-medium">Téléphone:</span> {order.phone}
                      </p>
                      <p>
                        <span className="font-medium">Adresse:</span> {order.address}
                      </p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Produit</h4>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{order.product}</p>
                      <p>Pointure: {order.size}</p>
                      <p>Quantité: {order.quantity}</p>
                      <p className="font-semibold text-blue-600">{formatPrice(order.amount)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 mb-2">Commandé le {order.date}</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Button>
                      <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="h-8">
                          <Edit className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Changer statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="En attente">En attente</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Livré">Livré</SelectItem>
                          <SelectItem value="Annulé">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune commande trouvée</h3>
              <p className="text-slate-600 mb-4">Essayez de modifier vos critères de recherche</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
