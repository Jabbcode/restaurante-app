interface UnderConstructionProps {
  title: string
  description?: string
}

export default function UnderConstruction({
  title,
  description = "Esta sección estará disponible próximamente."
}: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-8xl mb-6">🚧</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
        <span className="animate-pulse">●</span>
        En construcción
      </div>
    </div>
  )
}
