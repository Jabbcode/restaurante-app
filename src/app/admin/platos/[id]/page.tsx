import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import DishForm from "@/components/admin/DishForm"

interface EditDishPageProps {
  params: Promise<{ id: string }>
}

export default async function EditDishPage({ params }: EditDishPageProps) {
  const { id } = await params

  const dish = await prisma.dish.findUnique({
    where: { id },
  })

  if (!dish) {
    notFound()
  }

  const serializedDish = {
    ...dish,
    price: Number(dish.price),
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/platos"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a platos
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Editar Plato</h1>
        <p className="text-gray-600 mt-1">Modifica los datos del plato</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <DishForm dish={serializedDish} />
      </div>
    </div>
  )
}
