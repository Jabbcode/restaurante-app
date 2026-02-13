"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { categoryLabels } from "@/types/menu"

interface SearchResults {
  dishes: Array<{
    id: string
    name: string
    category: string
    price: number
    available: boolean
  }>
  messages: Array<{
    id: string
    name: string
    email: string
    status: string
    createdAt: string
  }>
  reservations: Array<{
    id: string
    name: string
    date: string
    time: string
    guests: number
    status: string
  }>
}

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  READ: "Leido",
  REPLIED: "Respondido",
  ARCHIVED: "Archivado",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
}

export default function GlobalSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // All results flattened for keyboard navigation
  const allResults = results
    ? [
        ...results.dishes.map((d) => ({ type: "dish" as const, data: d })),
        ...results.messages.map((m) => ({ type: "message" as const, data: m })),
        ...results.reservations.map((r) => ({ type: "reservation" as const, data: r })),
      ]
    : []

  // Keyboard shortcut to open (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    } else {
      setQuery("")
      setResults(null)
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Search with debounce
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults(null)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
          setSelectedIndex(0)
        }
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const navigateToResult = useCallback(
    (type: string, id: string) => {
      setIsOpen(false)
      switch (type) {
        case "dish":
          router.push(`/admin/platos/${id}`)
          break
        case "message":
          router.push(`/admin/mensajes/${id}`)
          break
        case "reservation":
          router.push(`/admin/reservaciones/${id}`)
          break
      }
    },
    [router]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, allResults.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter" && allResults[selectedIndex]) {
        const item = allResults[selectedIndex]
        navigateToResult(item.type, item.data.id)
      }
    },
    [allResults, selectedIndex, navigateToResult]
  )

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    })
  }

  const hasResults = results && (results.dishes.length > 0 || results.messages.length > 0 || results.reservations.length > 0)
  let currentIndex = -1

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-gray-400 bg-white rounded border border-gray-200">
          <span className="text-xs">Ctrl</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="flex min-h-full items-start justify-center p-4 pt-[10vh]">
            <div
              className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-modal-enter"
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar platos, mensajes, reservaciones..."
                  className="flex-1 text-gray-800 placeholder-gray-400 outline-none"
                />
                {loading && (
                  <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length < 2 && (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    Escribe al menos 2 caracteres para buscar
                  </div>
                )}

                {query.length >= 2 && !loading && !hasResults && (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No se encontraron resultados para &quot;{query}&quot;
                  </div>
                )}

                {hasResults && (
                  <div className="py-2">
                    {/* Dishes */}
                    {results.dishes.length > 0 && (
                      <div>
                        <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase">
                          Platos
                        </div>
                        {results.dishes.map((dish) => {
                          currentIndex++
                          const index = currentIndex
                          return (
                            <button
                              key={dish.id}
                              onClick={() => navigateToResult("dish", dish.id)}
                              className={`w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-50 ${
                                selectedIndex === index ? "bg-gray-100" : ""
                              }`}
                            >
                              <span className="text-lg">🍽️</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{dish.name}</p>
                                <p className="text-xs text-gray-500">
                                  {categoryLabels[dish.category as keyof typeof categoryLabels]} - {dish.price.toFixed(2)} EUR
                                </p>
                              </div>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${dish.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {dish.available ? "Disponible" : "No disponible"}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Messages */}
                    {results.messages.length > 0 && (
                      <div>
                        <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase mt-2">
                          Mensajes
                        </div>
                        {results.messages.map((msg) => {
                          currentIndex++
                          const index = currentIndex
                          return (
                            <button
                              key={msg.id}
                              onClick={() => navigateToResult("message", msg.id)}
                              className={`w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-50 ${
                                selectedIndex === index ? "bg-gray-100" : ""
                              }`}
                            >
                              <span className="text-lg">✉️</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{msg.name}</p>
                                <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                              </div>
                              <span className="text-xs text-gray-400">
                                {statusLabels[msg.status] || msg.status}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Reservations */}
                    {results.reservations.length > 0 && (
                      <div>
                        <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase mt-2">
                          Reservaciones
                        </div>
                        {results.reservations.map((res) => {
                          currentIndex++
                          const index = currentIndex
                          return (
                            <button
                              key={res.id}
                              onClick={() => navigateToResult("reservation", res.id)}
                              className={`w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-50 ${
                                selectedIndex === index ? "bg-gray-100" : ""
                              }`}
                            >
                              <span className="text-lg">📅</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 truncate">{res.name}</p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(res.date)} {res.time} - {res.guests} personas
                                </p>
                              </div>
                              <span className="text-xs text-gray-400">
                                {statusLabels[res.status] || res.status}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-gray-100 rounded">↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Enter</kbd>
                  seleccionar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">ESC</kbd>
                  cerrar
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
