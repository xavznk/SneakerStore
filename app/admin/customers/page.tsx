"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, Mail, Phone, MapPin, ShoppingBag } from "lucide-react"
import AdminLayout from "@/components/admin/AdminLayout"

// Données fictives des clients
const customers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+237 690 123 456",
    address: "Douala, Akwa",
    totalOrders: 5,
    totalSpent: 225000,
    lastOrder: "2024-01-15",
    status: "Actif",
    joinDate: "2023-08-15",
  },
  {
    id: 2,
    name: "Marie Kouam",
    email: "marie.kouam@email.com",
    phone: "+237 691 234 567",
    address: "Yaoundé, Bastos",
    totalOrders: 8,
    totalSpent: 416000,
    lastOrder: "2024-01-14",
    status: "VIP",
    joinDate: "2023-05-20",
  },
  {
    id: 3,
    name: "Paul Mbarga",
    email: "paul.mbarga@email.com",
    phone: "+237 692 345 678",
    address: "Douala, Bonanjo",
    totalOrders: 3,
    totalSpent: 204000,
    lastOrder: "2024-01-13",
    status: "Actif",
    joinDate: "2023-11-10",
  },
  {
    id: 4,
    name: "Sophie Nkomo",
    email: "sophie.nkomo@email.com",
    phone: "+237 693 456 789",
    address: "Yaoundé, Melen",
    totalOrders: 1,
    totalSpent: 25000,
    lastOrder: "2024-01-12",
    status: "Nouveau",
    joinDate: "2024-01-12",
  },
]

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-purple-100 text-purple-700"
      case "Actif":
        return "bg-green-100 text-green-700"
      case "Nouveau":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleViewCustomer = (customerId: number) => {
    console.log("Voir profil client:", customerId)
    // Ouvrir modal de profil ou naviguer vers page de profil
  }

  const handleViewCustomerOrders = (customerId: number) => {
    console.log("Voir commandes du client:", customerId)
    // Naviguer vers les commandes filtrées par client
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des clients</h1>
          <p className="text-slate-600">Gérez votre base de clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
                <p className="text-sm text-slate-600">Total clients</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {customers.filter((c) => c.status === "VIP").length}
                </p>
                <p className="text-sm text-slate-600">Clients VIP</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {customers.filter((c) => c.status === "Nouveau").length}
                </p>
                <p className="text-sm text-slate-600">Nouveaux clients</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
                </p>
                <p className="text-sm text-slate-600">Revenus totaux</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-slate-500">Client depuis {customer.joinDate}</p>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{customer.address}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-900">{customer.totalOrders}</p>
                      <p className="text-xs text-slate-500">Commandes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-blue-600">{formatPrice(customer.totalSpent)}</p>
                      <p className="text-xs text-slate-500">Total dépensé</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewCustomer(customer.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir profil
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewCustomerOrders(customer.id)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Commandes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun client trouvé</h3>
              <p className="text-slate-600 mb-4">Essayez de modifier vos critères de recherche</p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Réinitialiser la recherche
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
