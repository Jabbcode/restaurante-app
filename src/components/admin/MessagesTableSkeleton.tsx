import { SkeletonMessageRow, Skeleton, SkeletonText } from "@/components/ui/Skeleton"

function SkeletonMessageCard() {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="space-y-1">
          <SkeletonText className="w-28" />
          <SkeletonText className="w-36" />
        </div>
        <SkeletonText className="w-16" />
      </div>
      <div className="space-y-1 mb-3">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-3/4" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-6 rounded-full" />
        <div className="flex items-center gap-3">
          <SkeletonText className="w-8" />
          <SkeletonText className="w-16" />
        </div>
      </div>
    </div>
  )
}

export default function MessagesTableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters skeleton */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-8 w-16 sm:w-20 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonMessageCard key={i} />
        ))}
      </div>

      {/* Desktop Table Skeleton */}
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
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonMessageRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
