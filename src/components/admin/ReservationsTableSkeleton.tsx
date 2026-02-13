import { SkeletonReservationRow, Skeleton, SkeletonText } from "@/components/ui/Skeleton"

function SkeletonReservationCard() {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="space-y-1">
          <SkeletonText className="w-28" />
          <SkeletonText className="w-24" />
        </div>
        <div className="text-right space-y-1">
          <SkeletonText className="w-16" />
          <SkeletonText className="w-12" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <SkeletonText className="w-20" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-6 rounded-full" />
        <div className="flex items-center gap-2">
          <SkeletonText className="w-16" />
          <SkeletonText className="w-8" />
        </div>
      </div>
    </div>
  )
}

export default function ReservationsTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters skeleton */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 w-16 sm:w-20 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <SkeletonText className="w-12" />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonReservationCard key={i} />
        ))}
      </div>

      {/* Desktop Table Skeleton */}
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
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonReservationRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
