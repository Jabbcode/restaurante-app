interface StatCardProps {
  title: string
  value: number | string
  icon: string
  description?: string
  highlight?: boolean
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  highlight,
  trend,
}: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border ${highlight ? 'border-orange-300 ring-1 ring-orange-100' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className="text-gray-500 ml-1">vs mes anterior</span>
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
