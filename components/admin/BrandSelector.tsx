"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { BRANDS } from "@/lib/types"

interface BrandSelectorProps {
  value: string
  customBrand?: string
  onChange: (brand: string, isCustom?: boolean) => void
}

export default function BrandSelector({ value, customBrand, onChange }: BrandSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(!!customBrand)
  const [customBrandValue, setCustomBrandValue] = useState(customBrand || "")

  const handleBrandChange = (selectedBrand: string) => {
    if (selectedBrand === "custom") {
      setShowCustomInput(true)
      onChange("", true)
    } else {
      setShowCustomInput(false)
      setCustomBrandValue("")
      onChange(selectedBrand, false)
    }
  }

  const handleCustomBrandChange = (customValue: string) => {
    setCustomBrandValue(customValue)
    onChange(customValue, true)
  }

  return (
    <div className="space-y-3">
      <Label htmlFor="brand">Marque *</Label>

      {!showCustomInput ? (
        <Select value={value} onValueChange={handleBrandChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une marque" />
          </SelectTrigger>
          <SelectContent>
            {BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
            <SelectItem value="custom" className="text-blue-600 font-medium">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Marque personnalisée
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Entrez une marque personnalisée"
              value={customBrandValue}
              onChange={(e) => handleCustomBrandChange(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCustomInput(false)
                setCustomBrandValue("")
                onChange("", false)
              }}
            >
              Annuler
            </Button>
          </div>
          <p className="text-xs text-slate-500">Cette marque sera ajoutée à la liste pour les prochains produits</p>
        </div>
      )}
    </div>
  )
}
