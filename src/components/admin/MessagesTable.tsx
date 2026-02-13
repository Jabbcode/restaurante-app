"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/Toast"

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

interface MessagesTableProps {
  messages: Message[]
}

const statusLabels: Record<Message["status"], string> = {
  PENDING: "Pendiente",
  READ: "Leído",
  REPLIED: "Respondido",
  ARCHIVED: "Archivado",
}

const statusColors: Record<Message["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  READ: "bg-blue-100 text-blue-700",
  REPLIED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-gray-100 text-gray-700",
}

export default function MessagesTable({ messages }: MessagesTableProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [filter, setFilter] = useState("todos")
  const [deleting, setDeleting] = useState<string | null>(null)

  const filteredMessages = filter === "todos"
    ? messages
    : messages.filter((msg) => msg.status === filter)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el mensaje de "${name}"?`)) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/mensajes/${id}`, { method: "DELETE" })
      if (res.ok) {
        showToast("Mensaje eliminado correctamente", "success")
        router.refresh()
      } else {
        showToast("Error al eliminar el mensaje", "error")
      }
    } catch {
      showToast("Error al eliminar el mensaje", "error")
    } finally {
      setDeleting(null)
    }
  }

  const updateStatus = async (id: string, status: Message["status"]) => {
    try {
      const res = await fetch(`/api/mensajes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        showToast("Estado actualizado", "success")
        router.refresh()
      }
    } catch {
      showToast("Error al actualizar el estado", "error")
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {["todos", "PENDING", "READ", "REPLIED", "ARCHIVED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                filter === status
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status === "todos" ? "Todos" : statusLabels[status as Message["status"]]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Remitente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mensaje
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMessages.map((msg) => (
              <tr key={msg.id} className={`hover:bg-gray-50 ${msg.status === "PENDING" ? "bg-red-50/50" : ""}`}>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800">{msg.name}</p>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                    {msg.phone && (
                      <p className="text-sm text-gray-400">{msg.phone}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                    {msg.message}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {formatDate(msg.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={msg.status}
                    onChange={(e) => updateStatus(msg.id, e.target.value as Message["status"])}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[msg.status]}`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/mensajes/${msg.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      disabled={deleting === msg.id}
                      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {deleting === msg.id ? "..." : "Eliminar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMessages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay mensajes con este estado
          </div>
        )}
      </div>
    </div>
  )
}
