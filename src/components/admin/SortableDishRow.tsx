"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Link from "next/link"
import { categoryLabels } from "@/types/menu"

interface Dish {
  id: string
  name: string
  price: number
  image: string
  category: string
  featured: boolean
  available: boolean
}

interface SortableDishRowProps {
  dish: Dish
  onToggleAvailable: (id: string, available: boolean) => void
  onDelete: (id: string, name: string) => void
  isDeleting: boolean
}

export default function SortableDishRow({
  dish,
  onToggleAvailable,
  onDelete,
  isDeleting,
}: SortableDishRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dish.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-gray-50 ${isDragging ? "bg-blue-50" : ""}`}
    >
      <td className="px-2 py-3">
        <button
          {...attributes}
          {...listeners}
          className="p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Arrastrar para reordenar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </td>
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
              <span className="text-xs text-red-600">Destacado</span>
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
          {dish.price.toFixed(2)} EUR
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onToggleAvailable(dish.id, dish.available)}
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
            onClick={() => onDelete(dish.id, dish.name)}
            disabled={isDeleting}
            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {isDeleting ? "..." : "Eliminar"}
          </button>
        </div>
      </td>
    </tr>
  )
}
