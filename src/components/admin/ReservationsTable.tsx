"use client"

import { useState } from "react"
import Link from "next/link"
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

interface ReservationsTableProps {
  reservations: Reservation[]
}

const statusLabels: Record<Reservation["status"], string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
  NO_SHOW: "No asistió",
}

const statusColors: Record<Reservation["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  NO_SHOW: "bg-gray-100 text-gray-700",
}

export default function ReservationsTable({ reservations }: ReservationsTableProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [filter, setFilter] = useState("todos")
  const [dateFilter, setDateFilter] = useState("")

  const filteredReservations = reservations.filter((res) => {
    const statusMatch = filter === "todos" || res.status === filter
    const dateMatch = !dateFilter || res.date.startsWith(dateFilter)
    return statusMatch && dateMatch
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    })
  }

  const updateStatus = async (id: string, status: Reservation["status"]) => {
    try {
      const res = await fetch(`/api/reservaciones/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        showToast(`Reservación ${statusLabels[status].toLowerCase()}`, "success")
        router.refresh()
      }
    } catch {
      showToast("Error al actualizar el estado", "error")
    }
  }

  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {["todos", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                  filter === status
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "todos" ? "Todos" : statusLabels[status as Reservation["status"]]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <label className="text-sm text-gray-500">Fecha:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {filteredReservations.map((res) => {
          const isToday = res.date.startsWith(todayStr)
          const isPast = new Date(res.date) < new Date(todayStr)

          return (
            <div
              key={res.id}
              className={`p-4 ${res.status === "PENDING" ? "bg-yellow-50/50" : ""} ${isToday ? "border-l-4 border-l-red-500" : ""}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-medium text-gray-800">{res.name}</p>
                  <p className="text-xs text-gray-500">{res.phone}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-sm ${isToday ? "text-red-600" : "text-gray-800"}`}>
                    {formatDate(res.date)}
                    {isToday && <span className="ml-1 text-xs">(Hoy)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{res.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {res.guests} personas
                </span>
                {res.notes && (
                  <span className="text-xs text-gray-400 truncate max-w-[150px]" title={res.notes}>
                    • {res.notes}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <select
                  value={res.status}
                  onChange={(e) => updateStatus(res.id, e.target.value as Reservation["status"])}
                  className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[res.status]}`}
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  {res.status === "PENDING" && (
                    <button
                      onClick={() => updateStatus(res.id, "CONFIRMED")}
                      className="text-xs text-green-600 hover:text-green-800 font-medium"
                    >
                      Confirmar
                    </button>
                  )}
                  {res.status === "CONFIRMED" && isPast && (
                    <button
                      onClick={() => updateStatus(res.id, "COMPLETED")}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Completar
                    </button>
                  )}
                  <Link
                    href={`/admin/reservaciones/${res.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver
                  </Link>
                  <a
                    href={`tel:${res.phone}`}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Llamar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
        {filteredReservations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay reservaciones con estos filtros
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cliente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha y Hora
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Personas
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
            {filteredReservations.map((res) => {
              const isToday = res.date.startsWith(todayStr)
              const isPast = new Date(res.date) < new Date(todayStr)

              return (
                <tr
                  key={res.id}
                  className={`hover:bg-gray-50 ${
                    res.status === "PENDING" ? "bg-yellow-50/50" : ""
                  } ${isToday ? "border-l-4 border-l-red-500" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{res.name}</p>
                      <p className="text-sm text-gray-500">{res.phone}</p>
                      {res.notes && (
                        <p className="text-xs text-gray-400 truncate max-w-[200px]" title={res.notes}>
                          {res.notes}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`font-medium ${isToday ? "text-red-600" : "text-gray-800"}`}>
                        {formatDate(res.date)}
                        {isToday && <span className="ml-1 text-xs">(Hoy)</span>}
                      </p>
                      <p className="text-sm text-gray-500">{res.time}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-gray-800">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {res.guests}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={res.status}
                      onChange={(e) => updateStatus(res.id, e.target.value as Reservation["status"])}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[res.status]}`}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {res.status === "PENDING" && (
                        <button
                          onClick={() => updateStatus(res.id, "CONFIRMED")}
                          className="text-sm text-green-600 hover:text-green-800 font-medium"
                        >
                          Confirmar
                        </button>
                      )}
                      {res.status === "CONFIRMED" && isPast && (
                        <button
                          onClick={() => updateStatus(res.id, "COMPLETED")}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Completar
                        </button>
                      )}
                      <Link
                        href={`/admin/reservaciones/${res.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Ver
                      </Link>
                      <a
                        href={`tel:${res.phone}`}
                        className="text-sm text-gray-500 hover:text-gray-700"
                        title="Llamar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay reservaciones con estos filtros
          </div>
        )}
      </div>
    </div>
  )
}
