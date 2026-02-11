"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/platos", label: "Platos", icon: "🍽️" },
  { href: "/admin/mensajes", label: "Mensajes", icon: "✉️" },
  { href: "/admin/reservaciones", label: "Reservaciones", icon: "📅" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <Link href="/admin" className="block">
          <h1 className="font-serif text-xl font-bold text-orange-400">
            Restaurante
          </h1>
          <p className="text-gray-400 text-sm">Panel de Administración</p>
        </Link>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-6 py-3 text-sm
                transition-colors
                ${isActive
                  ? "bg-orange-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <span>←</span>
          Volver al sitio
        </Link>
      </div>
    </aside>
  )
}
