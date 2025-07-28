"use client"

import { X, Package, User, MapPin, CreditCard, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/types"

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (orderId: string, status: string) => void
}

export default function OrderDetailsModal({ order, isOpen, onClose, onUpdateStatus }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Commande {order.id}</h2>
              <p className="text-slate-600">Détails complets de la commande</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Statut et actions */}
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(order.status)} size="lg">
                {order.status}
              </Badge>
              <div className="flex gap-2">
                {order.status !== "Livré" && order.status !== "Annulé" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(order.id, "En cours")}
                      disabled={order.status === "En cours"}
                    >
                      Marquer en cours
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus(order.id, "Livré")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Marquer livré
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Informations client */}
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Informations client
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-slate-900">{order.customer.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{order.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{order.customer.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span>{order.shippingAddress}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Informations commande */}
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600" />
                    Détails commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Commandé le {new Date(order.date).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total:</p>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(order.total)}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Notes:</p>
                      <p className="text-sm bg-slate-50 p-2 rounded">{order.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Articles commandés */}
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle>Articles commandés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white">
                        <Image
                          src={item.productImage || "/placeholder.svg?height=64&width=64"}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{item.productName}</h4>
                        <p className="text-sm text-slate-600">Taille: {item.size}</p>
                        <p className="text-sm text-slate-600">Quantité: {item.quantity}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{formatPrice(item.price)}</p>
                        <p className="text-sm text-slate-600">x{item.quantity}</p>
                        <p className="font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Total de la commande:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(order.total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
