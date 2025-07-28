"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <Image
          src={images[selectedImageIndex] || "/placeholder.svg"}
          alt={`${productName} - Vue ${selectedImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* Miniatures */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <Card
            key={index}
            className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
              selectedImageIndex === index
                ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg"
                : "hover:shadow-md opacity-70 hover:opacity-100"
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Miniature ${index + 1}`}
              fill
              className="object-cover"
            />
            {selectedImageIndex === index && (
              <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 rounded-lg" />
            )}
          </Card>
        ))}
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              selectedImageIndex === index ? "bg-blue-500 w-6" : "bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
