import Link from "next/link"
import DishForm from "@/components/admin/DishForm"

export default function NuevoPlatoPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/platos"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a platos
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Nuevo Plato</h1>
        <p className="text-gray-600 mt-1">Agrega un nuevo plato al menú</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <DishForm />
      </div>
    </div>
  )
}
