"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useNotifications } from "@/hooks/useNotifications"
import { Bell, Mail, CalendarDays, Check } from "lucide-react"

export default function NotificationBell() {
  const { permission, requestPermission, counts, totalCount } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleEnableNotifications = async () => {
    await requestPermission()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-red-500 rounded-full">
            {totalCount > 9 ? "9+" : totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-modal-enter">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">Notificaciones</h3>
          </div>

          {permission === "default" && (
            <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
              <p className="text-sm text-blue-800 mb-2">
                Activa las notificaciones para recibir alertas de nuevos mensajes y reservaciones.
              </p>
              <button
                onClick={handleEnableNotifications}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Activar notificaciones
              </button>
            </div>
          )}

          {permission === "denied" && (
            <div className="px-4 py-3 bg-yellow-50 border-b border-gray-100">
              <p className="text-sm text-yellow-800">
                Las notificaciones estan bloqueadas. Activalas desde la configuracion de tu navegador.
              </p>
            </div>
          )}

          <div className="py-1">
            {counts.messages > 0 ? (
              <Link
                href="/admin/mensajes"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <Mail className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {counts.messages} mensaje{counts.messages > 1 ? "s" : ""} pendiente{counts.messages > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-gray-500">Clic para ver mensajes</p>
                </div>
              </Link>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No hay mensajes pendientes
              </div>
            )}

            {counts.reservations > 0 ? (
              <Link
                href="/admin/reservaciones"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <CalendarDays className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {counts.reservations} reservacion{counts.reservations > 1 ? "es" : ""} pendiente{counts.reservations > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-gray-500">Clic para ver reservaciones</p>
                </div>
              </Link>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No hay reservaciones pendientes
              </div>
            )}
          </div>

          {permission === "granted" && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Notificaciones activas
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
