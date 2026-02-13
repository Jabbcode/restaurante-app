import ReservationsTableSkeleton from "@/components/admin/ReservationsTableSkeleton"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-64" />
      </div>

      <ReservationsTableSkeleton />
    </div>
  )
}
