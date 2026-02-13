"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/Toast"
import { useConfirm } from "@/hooks/useConfirm"

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

const ITEMS_PER_PAGE = 10

export default function MessagesTable({ messages }: MessagesTableProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const { confirm, ConfirmDialog } = useConfirm()
  const [filter, setFilter] = useState("todos")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMessages = filter === "todos"
    ? messages
    : messages.filter((msg) => msg.status === filter)

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: "Eliminar mensaje",
      message: `¿Estás seguro de eliminar el mensaje de "${name}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      variant: "danger",
    })

    if (!confirmed) return

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

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    })
  }

  return (
    <>
    <ConfirmDialog />
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {["todos", "PENDING", "READ", "REPLIED", "ARCHIVED"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
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

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {paginatedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 ${msg.status === "PENDING" ? "bg-red-50/50" : ""}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-medium text-gray-800">{msg.name}</p>
                <p className="text-xs text-gray-500">{msg.email}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatDateShort(msg.createdAt)}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {msg.message}
            </p>
            <div className="flex items-center justify-between">
              <select
                value={msg.status}
                onChange={(e) => updateStatus(msg.id, e.target.value as Message["status"])}
                className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[msg.status]}`}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <div className="flex items-center gap-3">
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
            </div>
          </div>
        ))}
        {paginatedMessages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay mensajes con este estado
          </div>
        )}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredMessages.length)} de {filteredMessages.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
            {paginatedMessages.map((msg) => (
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

        {paginatedMessages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay mensajes con este estado
          </div>
        )}

        {/* Desktop Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredMessages.length)} de {filteredMessages.length} mensajes
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
