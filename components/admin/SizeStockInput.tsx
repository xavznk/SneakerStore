"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { CATEGORY_SIZES } from "@/lib/types"
import type { SizeStock } from "@/lib/types"

interface SizeStockInputProps {
  category: string
  value: SizeStock[]
  onChange: (sizes: SizeStock[]) => void
}

export default function SizeStockInput({ category, value, onChange }: SizeStockInputProps) {
  const [quickInput, setQuickInput] = useState("")
  const [sizeStocks, setSizeStocks] = useState<SizeStock[]>(value)

  useEffect(() => {
    setSizeStocks(value)
  }, [value])

  const availableSizes = CATEGORY_SIZES[category as keyof typeof CATEGORY_SIZES] || []

  const handleQuickInputParse = () => {
    if (!quickInput.trim()) return

    try {
      // Parse format: "45*3, 42*7, 43*1"
      const entries = quickInput.split(",").map((entry) => entry.trim())
      const newSizeStocks: SizeStock[] = []

      entries.forEach((entry) => {
        const [size, stock] = entry.split("*").map((s) => s.trim())
        if (size && stock && !isNaN(Number(stock))) {
          newSizeStocks.push({
            size,
            stock: Number(stock),
          })
        }
      })

      if (newSizeStocks.length > 0) {
        const updatedSizes = [...sizeStocks]

        newSizeStocks.forEach((newSize) => {
          const existingIndex = updatedSizes.findIndex((s) => s.size === newSize.size)
          if (existingIndex >= 0) {
            updatedSizes[existingIndex] = newSize
          } else {
            updatedSizes.push(newSize)
          }
        })

        setSizeStocks(updatedSizes)
        onChange(updatedSizes)
        setQuickInput("")
      }
    } catch (error) {
      console.error("Erreur lors du parsing:", error)
    }
  }

  const handleSizeStockChange = (size: string, stock: number) => {
    const updatedSizes = sizeStocks.filter((s) => s.size !== size)
    if (stock > 0) {
      updatedSizes.push({ size, stock })
    }

    setSizeStocks(updatedSizes)
    onChange(updatedSizes)
  }

  const addCustomSize = (customSize: string, stock: number) => {
    if (customSize && stock > 0) {
      handleSizeStockChange(customSize, stock)
    }
  }

  if (category === "accessoires") {
    return (
      <div className="space-y-2">
        <Label>Stock total</Label>
        <Input
          type="number"
          placeholder="Quantité en stock"
          value={sizeStocks[0]?.stock || ""}
          onChange={(e) => handleSizeStockChange("unique", Number(e.target.value))}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Stock par taille *</Label>

      {/* Saisie rapide */}
      <div className="space-y-2">
        <Label className="text-sm text-slate-600">Saisie rapide (ex: 45*3, 42*7, 43*1)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="45*3, 42*7, 43*1"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            className="flex-1"
          />
          <Button type="button" onClick={handleQuickInputParse} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Tailles disponibles */}
      {availableSizes.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-slate-600">Tailles standard</Label>
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map((size) => {
              const currentStock = sizeStocks.find((s) => s.size === size)?.stock || 0
              return (
                <div key={size} className="flex items-center gap-1">
                  <Label className="text-xs w-8">{size}</Label>
                  <Input
                    type="number"
                    min="0"
                    value={currentStock}
                    onChange={(e) => handleSizeStockChange(size, Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Stock actuel */}
      {sizeStocks.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-slate-600">Stock actuel</Label>
          <div className="flex flex-wrap gap-2">
            {sizeStocks.map((sizeStock, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {sizeStock.size}: {sizeStock.stock}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-red-100"
                  onClick={() => handleSizeStockChange(sizeStock.size, 0)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-slate-500">Total: {sizeStocks.reduce((sum, s) => sum + s.stock, 0)} unités</p>
        </div>
      )}
    </div>
  )
}
