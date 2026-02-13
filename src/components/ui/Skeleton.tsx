interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  )
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />
}

export function SkeletonCircle({ className = "" }: SkeletonProps) {
  return <Skeleton className={`rounded-full ${className}`} />
}

// Skeleton for table rows
export function SkeletonTableRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <SkeletonText className="w-32" />
            <SkeletonText className="w-20" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <SkeletonText className="w-24" />
      </td>
      <td className="px-4 py-3">
        <SkeletonText className="w-16" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-6 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <SkeletonText className="w-12" />
          <SkeletonText className="w-16" />
        </div>
      </td>
    </tr>
  )
}

// Skeleton for mobile cards
export function SkeletonCard() {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex gap-3">
        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <SkeletonText className="w-28" />
            <SkeletonText className="w-16" />
          </div>
          <SkeletonText className="w-20" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <div className="flex gap-3">
              <SkeletonText className="w-12" />
              <SkeletonText className="w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for stat cards
export function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonText className="w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="w-12 h-12 rounded-xl" />
      </div>
    </div>
  )
}

// Skeleton for dish cards in menu
export function SkeletonDishCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <SkeletonText className="w-32 h-5" />
          <SkeletonText className="w-16 h-5" />
        </div>
        <SkeletonText className="w-full" />
        <SkeletonText className="w-3/4" />
      </div>
    </div>
  )
}

// Skeleton for reservations table row
export function SkeletonReservationRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="space-y-1">
          <SkeletonText className="w-28" />
          <SkeletonText className="w-24" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <SkeletonText className="w-20" />
          <SkeletonText className="w-12" />
        </div>
      </td>
      <td className="px-4 py-3">
        <SkeletonText className="w-8" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-24 h-6 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <SkeletonText className="w-16" />
          <SkeletonText className="w-8" />
        </div>
      </td>
    </tr>
  )
}

// Skeleton for messages table row
export function SkeletonMessageRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="space-y-1">
          <SkeletonText className="w-28" />
          <SkeletonText className="w-36" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <SkeletonText className="w-full max-w-xs" />
          <SkeletonText className="w-3/4 max-w-xs" />
        </div>
      </td>
      <td className="px-4 py-3">
        <SkeletonText className="w-24" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-6 rounded-full" />
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <SkeletonText className="w-8" />
          <SkeletonText className="w-16" />
        </div>
      </td>
    </tr>
  )
}
