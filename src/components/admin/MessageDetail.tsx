"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: "PENDING" | "READ" | "REPLIED" | "ARCHIVED"
  createdAt: string
  readAt: string | null
}

interface MessageDetailProps {
  message: Message
}

const statusLabels: Record<Message["status"], string> = {
  PENDING: "Pendiente",
  READ: "Leído",
  REPLIED: "Respondido",
  ARCHIVED: "Archivado",
}

const statusColors: Record<Message["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  READ: "bg-blue-100 text-blue-700 border-blue-200",
  REPLIED: "bg-green-100 text-green-700 border-green-200",
  ARCHIVED: "bg-gray-100 text-gray-700 border-gray-200",
}

export default function MessageDetail({ message }: MessageDetailProps) {
  const router = useRouter()
  const [status, setStatus] = useState(message.status)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateStatus = async (newStatus: Message["status"]) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/mensajes/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatus(newStatus)
        router.refresh()
      } else {
        alert("Error al actualizar el estado")
      }
    } catch {
      alert("Error al actualizar el estado")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar este mensaje de "${message.name}"?`)) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/mensajes/${message.id}`, { method: "DELETE" })
      if (res.ok) {
        router.push("/admin/mensajes")
        router.refresh()
      } else {
        alert("Error al eliminar el mensaje")
      }
    } catch {
      alert("Error al eliminar el mensaje")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Status and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Estado:</span>
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value as Message["status"])}
            disabled={updating}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border cursor-pointer disabled:opacity-50 ${statusColors[status]}`}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {updating && <span className="text-sm text-gray-400">Guardando...</span>}
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          {deleting ? "Eliminando..." : "Eliminar mensaje"}
        </button>
      </div>

      {/* Sender info */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Información del remitente
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="font-medium text-gray-800">{message.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a
              href={`mailto:${message.email}`}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {message.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            {message.phone ? (
              <a
                href={`tel:${message.phone}`}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                {message.phone}
              </a>
            ) : (
              <p className="text-gray-400">No proporcionado</p>
            )}
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Mensaje
        </h3>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {message.message}
        </p>
      </div>

      {/* Timestamps */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
        <div>
          <span className="font-medium">Recibido:</span>{" "}
          {formatDate(message.createdAt)}
        </div>
        {message.readAt && (
          <div>
            <span className="font-medium">Leído:</span>{" "}
            {formatDate(message.readAt)}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 pt-4">
        <a
          href={`mailto:${message.email}?subject=Re: Mensaje de contacto&body=%0A%0A---%0AEn respuesta a tu mensaje:%0A${encodeURIComponent(message.message)}`}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
          onClick={() => {
            if (status === "PENDING" || status === "READ") {
              updateStatus("REPLIED")
            }
          }}
        >
          Responder por email
        </a>
        {message.phone && (
          <a
            href={`tel:${message.phone}`}
            className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors font-medium text-gray-700"
          >
            Llamar
          </a>
        )}
      </div>
    </div>
  )
}
