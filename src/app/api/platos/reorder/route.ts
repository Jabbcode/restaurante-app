import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body as { items: { id: string; order: number }[] }

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Items array required" },
        { status: 400 }
      )
    }

    // Update all items in a transaction
    await prisma.$transaction(
      items.map((item) =>
        prisma.dish.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering dishes:", error)
    return NextResponse.json(
      { error: "Error al reordenar platos" },
      { status: 500 }
    )
  }
}
