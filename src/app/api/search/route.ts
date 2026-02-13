import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.trim()

    if (!query || query.length < 2) {
      return NextResponse.json({
        dishes: [],
        messages: [],
        reservations: [],
      })
    }

    const [dishes, messages, reservations] = await Promise.all([
      // Search dishes
      prisma.dish.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: {
          id: true,
          name: true,
          category: true,
          price: true,
          available: true,
        },
      }),

      // Search messages
      prisma.contactMessage.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { message: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),

      // Search reservations
      prisma.reservation.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: {
          id: true,
          name: true,
          date: true,
          time: true,
          guests: true,
          status: true,
        },
      }),
    ])

    return NextResponse.json({
      dishes: dishes.map((d) => ({ ...d, price: Number(d.price) })),
      messages,
      reservations: reservations.map((r) => ({
        ...r,
        date: r.date.toISOString(),
      })),
    })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json(
      { error: "Error al buscar" },
      { status: 500 }
    )
  }
}
