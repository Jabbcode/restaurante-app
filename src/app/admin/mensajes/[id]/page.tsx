import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import MessageDetail from "@/components/admin/MessageDetail"

interface MessagePageProps {
  params: Promise<{ id: string }>
}

export default async function MessagePage({ params }: MessagePageProps) {
  const { id } = await params

  const message = await prisma.contactMessage.findUnique({
    where: { id },
  })

  if (!message) {
    notFound()
  }

  // Mark as read if pending
  if (message.status === "PENDING") {
    await prisma.contactMessage.update({
      where: { id },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    })
    message.status = "READ"
    message.readAt = new Date()
  }

  const serializedMessage = {
    ...message,
    createdAt: message.createdAt.toISOString(),
    readAt: message.readAt?.toISOString() ?? null,
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/mensajes"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a mensajes
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          Mensaje de {message.name}
        </h1>
        <p className="text-gray-600 mt-1">{message.email}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <MessageDetail message={serializedMessage} />
      </div>
    </div>
  )
}
