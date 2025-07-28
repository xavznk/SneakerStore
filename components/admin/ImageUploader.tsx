"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  images: {
    main: string
    secondary: string[]
  }
  previews: {
    main: string
    secondary: string[]
  }
  onMainImageUpload: (file: File) => void
  onSecondaryImageUpload: (file: File, index: number) => void
  onRemoveSecondaryImage: (index: number) => void
}

export default function ImageUploader({
  images,
  previews,
  onMainImageUpload,
  onSecondaryImageUpload,
  onRemoveSecondaryImage,
}: ImageUploaderProps) {
  const mainInputRef = useRef<HTMLInputElement>(null)
  const secondaryInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleMainImageClick = () => {
    mainInputRef.current?.click()
  }

  const handleSecondaryImageClick = (index: number) => {
    secondaryInputRefs.current[index]?.click()
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onMainImageUpload(file)
    }
  }

  const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      onSecondaryImageUpload(file, index)
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Images du produit *</Label>

      {/* Image principale */}
      <div>
        <Label className="text-sm text-slate-600 mb-2 block">Image principale</Label>
        <Card
          className="w-full h-48 border-2 border-dashed border-slate-300 hover:border-blue-500 cursor-pointer transition-colors"
          onClick={handleMainImageClick}
        >
          <CardContent className="flex items-center justify-center h-full p-4">
            {previews.main ? (
              <div className="relative w-full h-full">
                <Image
                  src={previews.main || "/placeholder.svg"}
                  alt="Image principale"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Cliquez pour ajouter l'image principale</p>
                <p className="text-xs text-slate-400">PNG, JPG jusqu'à 5MB</p>
              </div>
            )}
          </CardContent>
        </Card>
        <input ref={mainInputRef} type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
      </div>

      {/* Images secondaires */}
      <div>
        <Label className="text-sm text-slate-600 mb-2 block">Images secondaires (optionnel)</Label>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((index) => (
            <div key={index} className="relative">
              <Card
                className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-500 cursor-pointer transition-colors"
                onClick={() => handleSecondaryImageClick(index)}
              >
                <CardContent className="flex items-center justify-center h-full p-2">
                  {previews.secondary[index] ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previews.secondary[index] || "/placeholder.svg"}
                        alt={`Image secondaire ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs text-slate-600">Image {index + 1}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {previews.secondary[index] && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveSecondaryImage(index)
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}

              <input
                ref={(el) => (secondaryInputRefs.current[index] = el)}
                type="file"
                accept="image/*"
                onChange={(e) => handleSecondaryImageChange(e, index)}
                className="hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
