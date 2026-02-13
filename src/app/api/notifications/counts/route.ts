import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [pendingMessages, pendingReservations] = await Promise.all([
      prisma.contactMessage.count({
        where: { status: "PENDING" },
      }),
      prisma.reservation.count({
        where: { status: "PENDING" },
      }),
    ])

    return NextResponse.json({
      messages: pendingMessages,
      reservations: pendingReservations,
    })
  } catch (error) {
    console.error("Error fetching notification counts:", error)
    return NextResponse.json(
      { error: "Error al obtener contadores" },
      { status: 500 }
    )
  }
}
