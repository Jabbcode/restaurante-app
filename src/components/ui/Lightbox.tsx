"use client"

import { useState, useEffect, useCallback } from "react"

interface LightboxProps {
  images: Array<{
    src: string
    alt: string
    title?: string
  }>
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const goToPrevious = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, goToPrevious, goToNext])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Anterior"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Siguiente"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            setIsLoading(false)
            ;(e.target as HTMLImageElement).src = "https://placehold.co/800x600/374151/9ca3af?text=Imagen+no+disponible"
          }}
        />

        {/* Caption */}
        {currentImage.title && (
          <div className="mt-4 text-center">
            <p className="text-white text-lg font-medium">{currentImage.title}</p>
          </div>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="mt-4 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsLoading(true)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="mt-2 text-white/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
