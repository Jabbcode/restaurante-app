"use client"

import { useState, useCallback } from "react"

interface LightboxImage {
  src: string
  alt: string
  title?: string
}

export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = useCallback((index: number = 0) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    images,
  }
}
