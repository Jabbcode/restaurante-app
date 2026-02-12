import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { messageSchema } from "@/lib/validations/message"
import { MessageStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where: { status?: MessageStatus } = {}

    if (status && status !== "todos") {
      where.status = status as MessageStatus
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Error al obtener los mensajes" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = messageSchema.parse(body)

    const message = await prisma.contactMessage.create({
      data: validatedData,
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Datos inválidos", details: error },
        { status: 400 }
      )
    }

    console.error("Error creating message:", error)
    return NextResponse.json(
      { error: "Error al crear el mensaje" },
      { status: 500 }
    )
  }
}
