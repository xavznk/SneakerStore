"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Save, TrendingUp } from "lucide-react"
import type { MonthlyGoal } from "@/lib/types"

interface MonthlyGoalsSettingsProps {
  goals: MonthlyGoal[]
  onSave: (goals: MonthlyGoal[]) => void
}

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

export default function MonthlyGoalsSettings({ goals, onSave }: MonthlyGoalsSettingsProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [monthlyTargets, setMonthlyTargets] = useState<{ [key: string]: number }>(() => {
    const targets: { [key: string]: number } = {}
    goals.forEach((goal) => {
      if (goal.year === selectedYear) {
        targets[goal.month] = goal.target
      }
    })
    return targets
  })

  const handleTargetChange = (month: string, target: number) => {
    setMonthlyTargets((prev) => ({
      ...prev,
      [month]: target,
    }))
  }

  const handleSave = () => {
    const newGoals: MonthlyGoal[] = MONTHS.map((month) => ({
      month,
      year: selectedYear,
      target: monthlyTargets[month] || 0,
      achieved: goals.find((g) => g.month === month && g.year === selectedYear)?.achieved || 0,
    }))

    onSave(newGoals)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const totalYearTarget = Object.values(monthlyTargets).reduce((sum, target) => sum + (target || 0), 0)

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-green-600" />
          <div>
            <CardTitle>Objectifs mensuels</CardTitle>
            <CardDescription>Définissez vos objectifs de vente par mois</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection de l'année */}
        <div className="flex items-center gap-4">
          <Label htmlFor="year">Année:</Label>
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Objectifs par mois */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MONTHS.map((month, index) => {
            const currentGoal = goals.find((g) => g.month === month && g.year === selectedYear)
            const achievement = currentGoal ? (currentGoal.achieved / currentGoal.target) * 100 : 0

            return (
              <Card key={month} className="border border-slate-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">{month}</Label>
                      {currentGoal && currentGoal.target > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="w-3 h-3" />
                          <span className={achievement >= 100 ? "text-green-600" : "text-orange-600"}>
                            {achievement.toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>

                    <Input
                      type="number"
                      placeholder="Objectif (FCFA)"
                      value={monthlyTargets[month] || ""}
                      onChange={(e) => handleTargetChange(month, Number(e.target.value))}
                      className="text-sm"
                    />

                    {currentGoal && currentGoal.achieved > 0 && (
                      <div className="text-xs text-slate-600">Réalisé: {formatPrice(currentGoal.achieved)}</div>
                    )}

                    {currentGoal && currentGoal.target > 0 && (
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${achievement >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                          style={{ width: `${Math.min(achievement, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Résumé annuel */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Objectif annuel {selectedYear}</p>
                <p className="text-sm text-slate-600">Total des objectifs mensuels</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{formatPrice(totalYearTarget)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton de sauvegarde */}
        <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les objectifs
        </Button>
      </CardContent>
    </Card>
  )
}
