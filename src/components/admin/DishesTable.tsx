"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/Toast"
import { categoryLabels } from "@/types/menu"

interface Dish {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
  available: boolean
}

interface DishesTableProps {
  dishes: Dish[]
}

export default function DishesTable({ dishes }: DishesTableProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [filter, setFilter] = useState("todos")
  const [deleting, setDeleting] = useState<string | null>(null)

  const filteredDishes = filter === "todos"
    ? dishes
    : dishes.filter((dish) => dish.category === filter)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/platos/${id}`, { method: "DELETE" })
      if (res.ok) {
        showToast("Plato eliminado correctamente", "success")
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
        router.refresh()
      }
    } catch {
      showToast("Error al actualizar disponibilidad", "error")
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-2 flex-wrap">
          {["todos", "entrantes", "principales", "postres", "bebidas"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === cat
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "todos" ? "Todos" : categoryLabels[cat as keyof typeof categoryLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plato
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoría
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
            {filteredDishes.map((dish) => (
              <tr key={dish.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/48x48/f5f5f5/999?text=🍽️"
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{dish.name}</p>
                      {dish.featured && (
                        <span className="text-xs text-orange-600">⭐ Destacado</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {categoryLabels[dish.category as keyof typeof categoryLabels]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800">
                    {dish.price.toFixed(2)} €
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAvailable(dish.id, dish.available)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dish.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dish.available ? "Disponible" : "No disponible"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDishes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay platos en esta categoría
          </div>
        )}
      </div>
    </div>
  )
}
