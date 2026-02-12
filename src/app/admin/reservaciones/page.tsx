import { prisma } from "@/lib/prisma"
import ReservationsTable from "@/components/admin/ReservationsTable"

export default async function ReservacionesPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: [{ date: "asc" }, { time: "asc" }],
  })

  const serializedReservations = reservations.map((res) => ({
    ...res,
    date: res.date.toISOString(),
    createdAt: res.createdAt.toISOString(),
    confirmedAt: res.confirmedAt?.toISOString() ?? null,
  }))

  const pendingCount = reservations.filter((r) => r.status === "PENDING").length
  const todayCount = reservations.filter((r) => {
    const today = new Date().toISOString().split("T")[0]
    return r.date.toISOString().startsWith(today) &&
           (r.status === "PENDING" || r.status === "CONFIRMED")
  }).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reservaciones
            {pendingCount > 0 && (
              <span className="ml-2 px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                {pendingCount} pendientes
              </span>
            )}
            {todayCount > 0 && (
              <span className="ml-2 px-2 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                {todayCount} hoy
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las reservaciones de los clientes
          </p>
        </div>
      </div>

      <ReservationsTable reservations={serializedReservations} />
    </div>
  )
}
