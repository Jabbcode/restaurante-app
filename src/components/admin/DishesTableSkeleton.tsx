import { SkeletonTableRow, SkeletonCard } from "@/components/ui/Skeleton"

export default function DishesTableSkeleton() {
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
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Plato
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoría
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Precio
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
              <SkeletonTableRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
