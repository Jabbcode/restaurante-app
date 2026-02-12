import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { reservationSchema } from "@/lib/validations/reservation"
import { ReservationStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const date = searchParams.get("date")

    const where: { status?: ReservationStatus; date?: { gte: Date; lt: Date } } = {}

    if (status && status !== "todos") {
      where.status = status as ReservationStatus
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      where.date = { gte: startDate, lt: endDate }
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: [{ date: "asc" }, { time: "asc" }],
    })

    const serialized = reservations.map((r) => ({
      ...r,
      date: r.date.toISOString(),
      createdAt: r.createdAt.toISOString(),
      confirmedAt: r.confirmedAt?.toISOString() ?? null,
    }))

    return NextResponse.json(serialized)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json(
      { error: "Error al obtener las reservaciones" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = reservationSchema.parse(body)

    const reservation = await prisma.reservation.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
      },
    })

    return NextResponse.json(
      {
        ...reservation,
        date: reservation.date.toISOString(),
        createdAt: reservation.createdAt.toISOString(),
        confirmedAt: reservation.confirmedAt?.toISOString() ?? null,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error creating reservation:", error)
    return NextResponse.json(
      { error: "Error al crear la reservación" },
      { status: 500 }
    )
  }
}
