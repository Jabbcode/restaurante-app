import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { messageUpdateSchema } from "@/lib/validations/message"
import { MessageStatus } from "@prisma/client"

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    })

    if (!message) {
      return NextResponse.json(
        { error: "Mensaje no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error fetching message:", error)
    return NextResponse.json(
      { error: "Error al obtener el mensaje" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = messageUpdateSchema.parse(body)

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    })

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Mensaje no encontrado" },
        { status: 404 }
      )
    }

    const updateData: { status?: MessageStatus; readAt?: Date } = {}

    if (validatedData.status) {
      updateData.status = validatedData.status
      if (validatedData.status === "READ" && !existingMessage.readAt) {
        updateData.readAt = new Date()
      }
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(message)
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error updating message:", error)
    return NextResponse.json(
      { error: "Error al actualizar el mensaje" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    })

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Mensaje no encontrado" },
        { status: 404 }
      )
    }

    await prisma.contactMessage.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Mensaje eliminado correctamente" })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json(
      { error: "Error al eliminar el mensaje" },
      { status: 500 }
    )
  }
}
