import { getDashboardStats } from "@/lib/stats"
import StatCard from "@/components/admin/StatCard"
import Link from "next/link"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Resumen general del restaurante
        </p>
      </div>

      {/* Today's highlight */}
      {stats.reservations.today > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl">📅</span>
              <div>
                <p className="font-medium text-red-800 text-sm sm:text-base">
                  {stats.reservations.today} reservación{stats.reservations.today > 1 ? 'es' : ''} para hoy
                </p>
                <p className="text-xs sm:text-sm text-red-600">
                  {stats.reservations.confirmedToday} confirmada{stats.reservations.confirmedToday !== 1 ? 's' : ''}
                  {stats.reservations.today - stats.reservations.confirmedToday > 0 &&
                    `, ${stats.reservations.today - stats.reservations.confirmedToday} pendiente${stats.reservations.today - stats.reservations.confirmedToday > 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
            <Link
              href="/admin/reservaciones"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium text-center"
            >
              Ver reservaciones
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Platos"
          value={stats.dishes.total}
          icon="🍽️"
          description={`${stats.dishes.available} disponibles`}
        />
        <StatCard
          title="Platos Destacados"
          value={stats.dishes.featured}
          icon="⭐"
        />
        <StatCard
          title="Mensajes"
          value={stats.messages.total}
          icon="✉️"
          description={stats.messages.pending > 0 ? `${stats.messages.pending} sin leer` : "Todos leídos"}
          highlight={stats.messages.pending > 0}
        />
        <StatCard
          title="Reservaciones"
          value={stats.reservations.total}
          icon="📅"
          description={stats.reservations.pending > 0 ? `${stats.reservations.pending} pendientes` : "Sin pendientes"}
          highlight={stats.reservations.pending > 0}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/admin/platos"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <span className="text-xl sm:text-2xl">🍽️</span>
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">Gestionar Platos</p>
              <p className="text-xs sm:text-sm text-gray-500">Agregar o editar menú</p>
            </div>
          </Link>
          <Link
            href="/admin/mensajes"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <span className="text-xl sm:text-2xl">✉️</span>
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">Ver Mensajes</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {stats.messages.pending > 0
                  ? `${stats.messages.pending} sin leer`
                  : "Contactos recibidos"
                }
              </p>
            </div>
          </Link>
          <Link
            href="/admin/reservaciones"
            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <span className="text-xl sm:text-2xl">📅</span>
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">Reservaciones</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {stats.reservations.pending > 0
                  ? `${stats.reservations.pending} pendientes`
                  : "Gestionar reservas"
                }
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
