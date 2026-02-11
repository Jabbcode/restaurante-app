import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DishesTable from "@/components/admin/DishesTable"

export default async function PlatosPage() {
  const dishes = await prisma.dish.findMany({
    orderBy: { createdAt: "desc" },
  })

  const serializedDishes = dishes.map((dish) => ({
    ...dish,
    price: Number(dish.price),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platos</h1>
          <p className="text-gray-600 mt-1">Gestiona el menú del restaurante</p>
        </div>
        <Link
          href="/admin/platos/nuevo"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Plato
        </Link>
      </div>

      <DishesTable dishes={serializedDishes} />
    </div>
  )
}
