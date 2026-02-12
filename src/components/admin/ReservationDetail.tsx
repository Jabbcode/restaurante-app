"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/Toast"

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes: string | null
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW"
  createdAt: string
  confirmedAt: string | null
}

interface ReservationDetailProps {
  reservation: Reservation
}

const statusLabels: Record<Reservation["status"], string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
  NO_SHOW: "No asistió",
}

const statusColors: Record<Reservation["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
  NO_SHOW: "bg-gray-100 text-gray-700 border-gray-200",
}

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
]

export default function ReservationDetail({ reservation }: ReservationDetailProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [status, setStatus] = useState(reservation.status)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    date: reservation.date.split("T")[0],
    time: reservation.time,
    guests: reservation.guests,
    notes: reservation.notes || "",
  })
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateStatus = async (newStatus: Reservation["status"]) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/reservaciones/${reservation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatus(newStatus)
        showToast(`Reservación ${statusLabels[newStatus].toLowerCase()}`, "success")
        router.refresh()
      } else {
        showToast("Error al actualizar el estado", "error")
      }
    } catch {
      showToast("Error al actualizar el estado", "error")
    } finally {
      setUpdating(false)
    }
  }

  const saveChanges = async () => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/reservaciones/${reservation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: editData.date,
          time: editData.time,
          guests: editData.guests,
          notes: editData.notes || undefined,
        }),
      })
      if (res.ok) {
        setIsEditing(false)
        showToast("Cambios guardados", "success")
        router.refresh()
      } else {
        showToast("Error al guardar los cambios", "error")
      }
    } catch {
      showToast("Error al guardar los cambios", "error")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar la reservación de "${reservation.name}"?`)) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/reservaciones/${reservation.id}`, { method: "DELETE" })
      if (res.ok) {
        showToast("Reservación eliminada", "success")
        router.push("/admin/reservaciones")
        router.refresh()
      } else {
        showToast("Error al eliminar la reservación", "error")
      }
    } catch {
      showToast("Error al eliminar la reservación", "error")
    } finally {
      setDeleting(false)
    }
  }

  const isPast = new Date(reservation.date) < new Date(new Date().toISOString().split("T")[0])

  return (
    <div className="space-y-6">
      {/* Status and actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Estado:</span>
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value as Reservation["status"])}
            disabled={updating}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border cursor-pointer disabled:opacity-50 ${statusColors[status]}`}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {updating && <span className="text-sm text-gray-400">Guardando...</span>}
        </div>

        <div className="flex items-center gap-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Editar
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {/* Quick actions */}
      {status === "PENDING" && (
        <div className="flex gap-3">
          <button
            onClick={() => updateStatus("CONFIRMED")}
            disabled={updating}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            Confirmar Reservación
          </button>
          <button
            onClick={() => updateStatus("CANCELLED")}
            disabled={updating}
            className="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      )}

      {status === "CONFIRMED" && isPast && (
        <div className="flex gap-3">
          <button
            onClick={() => updateStatus("COMPLETED")}
            disabled={updating}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            Marcar como Completada
          </button>
          <button
            onClick={() => updateStatus("NO_SHOW")}
            disabled={updating}
            className="px-6 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
          >
            No asistió
          </button>
        </div>
      )}

      {/* Reservation details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Client info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Información del cliente
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium text-gray-800">{reservation.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <a
                href={`tel:${reservation.phone}`}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                {reservation.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a
                href={`mailto:${reservation.email}`}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                {reservation.email}
              </a>
            </div>
          </div>
        </div>

        {/* Reservation info */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Detalles de la reservación
          </h3>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Fecha</label>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Hora</label>
                <select
                  value={editData.time}
                  onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Personas</label>
                <select
                  value={editData.guests}
                  onChange={(e) => setEditData({ ...editData, guests: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Notas</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveChanges}
                  disabled={updating}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-2 rounded-lg"
                >
                  {updating ? "Guardando..." : "Guardar"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium text-gray-800">{formatDate(reservation.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hora</p>
                <p className="font-medium text-gray-800">{reservation.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Personas</p>
                <p className="font-medium text-gray-800">{reservation.guests}</p>
              </div>
              {reservation.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notas</p>
                  <p className="text-gray-800">{reservation.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timestamps */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-4 border-t">
        <div>
          <span className="font-medium">Creada:</span>{" "}
          {formatDateTime(reservation.createdAt)}
        </div>
        {reservation.confirmedAt && (
          <div>
            <span className="font-medium">Confirmada:</span>{" "}
            {formatDateTime(reservation.confirmedAt)}
          </div>
        )}
      </div>

      {/* Contact actions */}
      <div className="flex gap-3 pt-4">
        <a
          href={`tel:${reservation.phone}`}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
        >
          Llamar al cliente
        </a>
        <a
          href={`mailto:${reservation.email}?subject=Reservación en Restaurante - ${formatDate(reservation.date)}&body=Hola ${reservation.name},%0A%0AEn relación a tu reservación para el ${formatDate(reservation.date)} a las ${reservation.time}...`}
          className="flex-1 border border-gray-300 hover:bg-gray-50 text-center py-3 px-4 rounded-lg transition-colors font-medium text-gray-700"
        >
          Enviar email
        </a>
      </div>
    </div>
  )
}
