"use client"

import { useState } from "react"

interface ImageUploadState {
  main: string
  secondary: string[]
  previews: {
    main: string
    secondary: string[]
  }
}

export function useImageUpload(initialImages?: { main: string; secondary: string[] }) {
  const [images, setImages] = useState<ImageUploadState>({
    main: initialImages?.main || "",
    secondary: initialImages?.secondary || ["", ""],
    previews: {
      main: initialImages?.main || "",
      secondary: initialImages?.secondary || ["", ""],
    },
  })

  const handleMainImageUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    setImages((prev) => ({
      ...prev,
      main: url,
      previews: { ...prev.previews, main: url },
    }))
  }

  const handleSecondaryImageUpload = (file: File, index: number) => {
    const url = URL.createObjectURL(file)
    setImages((prev) => {
      const newSecondary = [...prev.secondary]
      const newPreviews = [...prev.previews.secondary]
      newSecondary[index] = url
      newPreviews[index] = url

      return {
        ...prev,
        secondary: newSecondary,
        previews: { ...prev.previews, secondary: newPreviews },
      }
    })
  }

  const removeSecondaryImage = (index: number) => {
    setImages((prev) => {
      const newSecondary = [...prev.secondary]
      const newPreviews = [...prev.previews.secondary]
      newSecondary[index] = ""
      newPreviews[index] = ""

      return {
        ...prev,
        secondary: newSecondary,
        previews: { ...prev.previews, secondary: newPreviews },
      }
    })
  }

  return {
    images,
    handleMainImageUpload,
    handleSecondaryImageUpload,
    removeSecondaryImage,
    setImages,
  }
}
