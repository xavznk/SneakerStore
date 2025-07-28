"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { BRANDS, CATEGORIES, CATEGORY_SIZES } from "@/lib/types"
import type { SearchFilters } from "@/lib/types"

interface AdvancedSearchProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onReset: () => void
}

export default function AdvancedSearch({ filters, onFiltersChange, onReset }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const getAvailableSizes = () => {
    if (!filters.category || filters.category === "all") {
      return Object.values(CATEGORY_SIZES).flat()
    }
    return CATEGORY_SIZES[filters.category as keyof typeof CATEGORY_SIZES] || []
  }

  const hasActiveFilters = Object.values(filters).some((value) => value && value !== "all")

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Recherche principale */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Rechercher par nom, marque, référence..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              className="pl-10 pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-slate-500 hover:text-slate-700"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filtres
              </Button>
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Filtres avancés */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              {/* Catégorie */}
              <div>
                <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Marque */}
              <div>
                <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Marque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {BRANDS.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Taille */}
              <div>
                <Select value={filters.size} onValueChange={(value) => handleFilterChange("size", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les tailles</SelectItem>
                    {getAvailableSizes().map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Statut */}
              <div>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Stock faible">Stock faible</SelectItem>
                    <SelectItem value="Rupture">Rupture</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
