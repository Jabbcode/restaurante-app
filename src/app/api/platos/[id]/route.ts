import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { dishUpdateSchema } from "@/lib/validations/dish"
import { Category } from "@prisma/client"

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const dish = await prisma.dish.findUnique({
      where: { id },
    })

    if (!dish) {
      return NextResponse.json(
        { error: "Plato no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ ...dish, price: Number(dish.price) })
  } catch (error) {
    console.error("Error fetching dish:", error)
    return NextResponse.json(
      { error: "Error al obtener el plato" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = dishUpdateSchema.parse(body)

    const existingDish = await prisma.dish.findUnique({
      where: { id },
    })

    if (!existingDish) {
      return NextResponse.json(
        { error: "Plato no encontrado" },
        { status: 404 }
      )
    }

    const dish = await prisma.dish.update({
      where: { id },
      data: {
        ...validatedData,
        category: validatedData.category as Category | undefined,
      },
    })

    return NextResponse.json({ ...dish, price: Number(dish.price) })
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error updating dish:", error)
    return NextResponse.json(
      { error: "Error al actualizar el plato" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const existingDish = await prisma.dish.findUnique({
      where: { id },
    })

    if (!existingDish) {
      return NextResponse.json(
        { error: "Plato no encontrado" },
        { status: 404 }
      )
    }

    await prisma.dish.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Plato eliminado correctamente" })
  } catch (error) {
    console.error("Error deleting dish:", error)
    return NextResponse.json(
      { error: "Error al eliminar el plato" },
      { status: 500 }
    )
  }
}
