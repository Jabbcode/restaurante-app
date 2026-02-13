import MessagesTableSkeleton from "@/components/admin/MessagesTableSkeleton"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-5 w-56" />
      </div>

      <MessagesTableSkeleton />
    </div>
  )
}
