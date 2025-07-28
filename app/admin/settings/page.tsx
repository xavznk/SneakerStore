"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/components/admin/AdminLayout"
import MonthlyGoalsSettings from "@/components/admin/MonthlyGoalsSettings"
import { Save, Store, Bell, Shield, Globe } from "lucide-react"
import type { MonthlyGoal } from "@/lib/types"

// Données fictives des objectifs
const initialGoals: MonthlyGoal[] = [
  { month: "Janvier", year: 2024, target: 2000000, achieved: 1800000 },
  { month: "Février", year: 2024, target: 1500000, achieved: 1650000 },
  { month: "Mars", year: 2024, target: 2200000, achieved: 2100000 },
  { month: "Avril", year: 2024, target: 1800000, achieved: 1900000 },
  { month: "Mai", year: 2024, target: 2500000, achieved: 2300000 },
  { month: "Juin", year: 2024, target: 2800000, achieved: 2600000 },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "SneakerStore",
    storeDescription: "Boutique de chaussures premium au Cameroun",
    storeEmail: "contact@sneakerstore.com",
    storePhone: "+237 656 533 960",
    storeAddress: "Douala, Cameroun",
    currency: "FCFA",
    language: "fr",
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    maintenanceMode: false,
    allowRegistration: true,
  })

  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>(initialGoals)

  const handleSave = () => {
    console.log("Paramètres sauvegardés:", settings)
    alert("Paramètres sauvegardés avec succès!")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoalsSave = (goals: MonthlyGoal[]) => {
    setMonthlyGoals(goals)
    console.log("Objectifs sauvegardés:", goals)
    alert("Objectifs mensuels sauvegardés avec succès!")
  }

  const handleChangePassword = () => {
    console.log("Changement de mot de passe demandé")
    // Ouvrir modal de changement de mot de passe
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Paramètres</h1>
          <p className="text-slate-600">Configurez votre boutique et vos objectifs</p>
        </div>

        <div className="space-y-8">
          {/* Objectifs mensuels - Section principale */}
          <MonthlyGoalsSettings goals={monthlyGoals} onSave={handleGoalsSave} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Store Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle>Informations de la boutique</CardTitle>
                    <CardDescription>Gérez les informations de base</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Nom de la boutique</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => handleInputChange("storeName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeDescription">Description</Label>
                  <Textarea
                    id="storeDescription"
                    value={settings.storeDescription}
                    onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone">Téléphone</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => handleInputChange("storePhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeAddress">Adresse</Label>
                  <Input
                    id="storeAddress"
                    value={settings.storeAddress}
                    onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Localization */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-600" />
                  <div>
                    <CardTitle>Localisation</CardTitle>
                    <CardDescription>Paramètres régionaux</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currency">Devise</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCFA">FCFA (Franc CFA)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="USD">USD (Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Langue</Label>
                  <Select value={settings.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Gérez vos alertes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notifications email</Label>
                    <p className="text-sm text-slate-500">Recevoir les alertes par email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">Notifications SMS</Label>
                    <p className="text-sm text-slate-500">Recevoir les alertes par SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderNotifications">Nouvelles commandes</Label>
                    <p className="text-sm text-slate-500">Alertes pour nouvelles commandes</p>
                  </div>
                  <Switch
                    id="orderNotifications"
                    checked={settings.orderNotifications}
                    onCheckedChange={(checked) => handleInputChange("orderNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lowStockAlerts">Stock faible</Label>
                    <p className="text-sm text-slate-500">Alertes de stock faible</p>
                  </div>
                  <Switch
                    id="lowStockAlerts"
                    checked={settings.lowStockAlerts}
                    onCheckedChange={(checked) => handleInputChange("lowStockAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security & Access */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <CardTitle>Sécurité & Accès</CardTitle>
                    <CardDescription>Paramètres de sécurité</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Mode maintenance</Label>
                    <p className="text-sm text-slate-500">Désactiver temporairement la boutique</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowRegistration">Inscription clients</Label>
                    <p className="text-sm text-slate-500">Permettre aux nouveaux clients de s'inscrire</p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleChangePassword}>
                    Changer le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les paramètres
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
