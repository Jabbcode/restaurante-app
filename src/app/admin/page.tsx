import { getDashboardStats } from "@/lib/stats"
import StatCard from "@/components/admin/StatCard"
import Link from "next/link"

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Resumen general del restaurante
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        />
        <StatCard
          title="Reservaciones"
          value={stats.reservations.total}
          icon="📅"
          description={stats.reservations.pending > 0 ? `${stats.reservations.pending} pendientes` : "Sin pendientes"}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/platos"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <span className="text-2xl">🍽️</span>
            <div>
              <p className="font-medium text-gray-800">Gestionar Platos</p>
              <p className="text-sm text-gray-500">Agregar o editar menú</p>
            </div>
          </Link>
          <Link
            href="/admin/mensajes"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-medium text-gray-800">Ver Mensajes</p>
              <p className="text-sm text-gray-500">Contactos recibidos</p>
            </div>
          </Link>
          <Link
            href="/admin/reservaciones"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-medium text-gray-800">Reservaciones</p>
              <p className="text-sm text-gray-500">Gestionar reservas</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
