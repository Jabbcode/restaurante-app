import DishesTableSkeleton from "@/components/admin/DishesTableSkeleton"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-56" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <DishesTableSkeleton />
    </div>
  )
}
