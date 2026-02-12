import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ReservationDetail from "@/components/admin/ReservationDetail"

interface ReservationPageProps {
  params: Promise<{ id: string }>
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { id } = await params

  const reservation = await prisma.reservation.findUnique({
    where: { id },
  })

  if (!reservation) {
    notFound()
  }

  const serializedReservation = {
    ...reservation,
    date: reservation.date.toISOString(),
    createdAt: reservation.createdAt.toISOString(),
    confirmedAt: reservation.confirmedAt?.toISOString() ?? null,
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    })
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/reservaciones"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a reservaciones
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          Reservación de {reservation.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {formatDate(reservation.date)} a las {reservation.time} - {reservation.guests} personas
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <ReservationDetail reservation={serializedReservation} />
      </div>
    </div>
  )
}
