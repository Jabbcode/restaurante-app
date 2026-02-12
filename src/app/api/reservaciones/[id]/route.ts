import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { reservationUpdateSchema } from "@/lib/validations/reservation"
import { ReservationStatus } from "@prisma/client"

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const reservation = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservación no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...reservation,
      date: reservation.date.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      confirmedAt: reservation.confirmedAt?.toISOString() ?? null,
    })
  } catch (error) {
    console.error("Error fetching reservation:", error)
    return NextResponse.json(
      { error: "Error al obtener la reservación" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = reservationUpdateSchema.parse(body)

    const existing = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Reservación no encontrada" },
        { status: 404 }
      )
    }

    const updateData: {
      status?: ReservationStatus
      date?: Date
      time?: string
      guests?: number
      notes?: string
      confirmedAt?: Date
    } = {}

    if (validatedData.status) {
      updateData.status = validatedData.status
      if (validatedData.status === "CONFIRMED" && !existing.confirmedAt) {
        updateData.confirmedAt = new Date()
      }
    }

    if (validatedData.date) {
      updateData.date = new Date(validatedData.date)
    }

    if (validatedData.time) {
      updateData.time = validatedData.time
    }

    if (validatedData.guests) {
      updateData.guests = validatedData.guests
    }

    if (validatedData.notes !== undefined) {
      updateData.notes = validatedData.notes
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      ...reservation,
      date: reservation.date.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      confirmedAt: reservation.confirmedAt?.toISOString() ?? null,
    })
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error updating reservation:", error)
    return NextResponse.json(
      { error: "Error al actualizar la reservación" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const existing = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Reservación no encontrada" },
        { status: 404 }
      )
    }

    await prisma.reservation.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Reservación eliminada correctamente" })
  } catch (error) {
    console.error("Error deleting reservation:", error)
    return NextResponse.json(
      { error: "Error al eliminar la reservación" },
      { status: 500 }
    )
  }
}
