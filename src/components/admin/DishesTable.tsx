"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useToast } from "@/components/ui/Toast"
import { useConfirm } from "@/hooks/useConfirm"
import { categoryLabels } from "@/types/menu"
import SortableDishRow from "./SortableDishRow"

interface Dish {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
  available: boolean
  order?: number
}

interface DishesTableProps {
  dishes: Dish[]
}

const ITEMS_PER_PAGE = 10

export default function DishesTable({ dishes: initialDishes }: DishesTableProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const { confirm, ConfirmDialog } = useConfirm()
  const [dishes, setDishes] = useState(initialDishes)
  const [filter, setFilter] = useState("todos")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredDishes = filter === "todos"
    ? dishes
    : dishes.filter((dish) => dish.category === filter)

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedDishes = filteredDishes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = filteredDishes.findIndex((d) => d.id === active.id)
      const newIndex = filteredDishes.findIndex((d) => d.id === over.id)

      const newFilteredDishes = arrayMove(filteredDishes, oldIndex, newIndex)

      // Update local state
      if (filter === "todos") {
        setDishes(newFilteredDishes)
      } else {
        // For filtered view, update the full dishes array
        const otherDishes = dishes.filter((d) => d.category !== filter)
        setDishes([...otherDishes, ...newFilteredDishes])
      }

      // Save to server
      setIsSaving(true)
      try {
        const items = newFilteredDishes.map((dish, index) => ({
          id: dish.id,
          order: index,
        }))

        const res = await fetch("/api/platos/reorder", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        })

        if (res.ok) {
          showToast("Orden actualizado", "success")
        } else {
          showToast("Error al guardar el orden", "error")
        }
      } catch {
        showToast("Error al guardar el orden", "error")
      } finally {
        setIsSaving(false)
      }
    }
  }, [filteredDishes, dishes, filter, showToast])

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: "Eliminar plato",
      message: `¿Estás seguro de eliminar "${name}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      variant: "danger",
    })

    if (!confirmed) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/platos/${id}`, { method: "DELETE" })
      if (res.ok) {
        showToast("Plato eliminado correctamente", "success")
        setDishes(dishes.filter((d) => d.id !== id))
        router.refresh()
      } else {
        showToast("Error al eliminar el plato", "error")
      }
    } catch {
      showToast("Error al eliminar el plato", "error")
    } finally {
      setDeleting(null)
    }
  }

  const toggleAvailable = async (id: string, available: boolean) => {
    try {
      const res = await fetch(`/api/platos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !available }),
      })
      if (res.ok) {
        showToast(available ? "Plato marcado como no disponible" : "Plato marcado como disponible", "success")
        setDishes(dishes.map((d) => d.id === id ? { ...d, available: !available } : d))
        router.refresh()
      }
    } catch {
      showToast("Error al actualizar disponibilidad", "error")
    }
  }

  return (
    <>
    <ConfirmDialog />
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {["todos", "entrantes", "principales", "postres", "bebidas"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                  filter === cat
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "todos" ? "Todos" : categoryLabels[cat as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
          {isSaving && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Guardando...
            </span>
          )}
        </div>
      </div>

      {/* Mobile Cards (no drag and drop) */}
      <div className="md:hidden divide-y divide-gray-100">
        {paginatedDishes.map((dish) => (
          <div key={dish.id} className="p-4">
            <div className="flex gap-3">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/64x64/f5f5f5/999?text=🍽️"
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-800">{dish.name}</p>
                    {dish.featured && (
                      <span className="text-xs text-red-600">Destacado</span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-800 whitespace-nowrap">
                    {dish.price.toFixed(2)} EUR
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {categoryLabels[dish.category as keyof typeof categoryLabels]}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => toggleAvailable(dish.id, dish.available)}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      dish.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dish.available ? "Disponible" : "No disponible"}
                  </button>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/platos/${dish.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(dish.id, dish.name)}
                      disabled={deleting === dish.id}
                      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {deleting === dish.id ? "..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {paginatedDishes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay platos en esta categoria
          </div>
        )}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredDishes.length)} de {filteredDishes.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table with Drag and Drop */}
      <div className="hidden md:block overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">
                  <span className="sr-only">Ordenar</span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Plato
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <SortableContext
                items={paginatedDishes.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                {paginatedDishes.map((dish) => (
                  <SortableDishRow
                    key={dish.id}
                    dish={dish}
                    onToggleAvailable={toggleAvailable}
                    onDelete={handleDelete}
                    isDeleting={deleting === dish.id}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>

        {paginatedDishes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay platos en esta categoria
          </div>
        )}

        {/* Desktop Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredDishes.length)} de {filteredDishes.length} platos
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Pagina {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
