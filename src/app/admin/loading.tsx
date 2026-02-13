import DashboardSkeleton from "@/components/admin/DashboardSkeleton"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-72" />
      </div>

      <DashboardSkeleton />
    </div>
  )
}
