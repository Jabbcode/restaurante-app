import { prisma } from "@/lib/prisma"
import MessagesTable from "@/components/admin/MessagesTable"

export default async function MensajesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  const serializedMessages = messages.map((msg) => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
    readAt: msg.readAt?.toISOString() ?? null,
  }))

  const pendingCount = messages.filter((m) => m.status === "PENDING").length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Mensajes de Contacto
            {pendingCount > 0 && (
              <span className="ml-2 px-2 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                {pendingCount} nuevos
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona los mensajes recibidos del formulario de contacto
          </p>
        </div>
      </div>

      <MessagesTable messages={serializedMessages} />
    </div>
  )
}
