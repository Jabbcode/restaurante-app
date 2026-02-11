import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { dishSchema } from "@/lib/validations/dish"
import { Category } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const available = searchParams.get("available")

    const where: {
      category?: Category
      available?: boolean
    } = {}

    if (category && category !== "todos") {
      where.category = category as Category
    }

    if (available !== null) {
      where.available = available === "true"
    }

    const dishes = await prisma.dish.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    // Convert Decimal to number for JSON response
    const serializedDishes = dishes.map((dish) => ({
      ...dish,
      price: Number(dish.price),
    }))

    return NextResponse.json(serializedDishes)
  } catch (error) {
    console.error("Error fetching dishes:", error)
    return NextResponse.json(
      { error: "Error al obtener los platos" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = dishSchema.parse(body)

    const dish = await prisma.dish.create({
      data: {
        ...validatedData,
        category: validatedData.category as Category,
      },
    })

    return NextResponse.json(
      { ...dish, price: Number(dish.price) },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error creating dish:", error)
    return NextResponse.json(
      { error: "Error al crear el plato" },
      { status: 500 }
    )
  }
}
