"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdmin } from "./AdminContext"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/platos", label: "Platos", icon: "🍽️" },
  { href: "/admin/mensajes", label: "Mensajes", icon: "✉️" },
  { href: "/admin/reservaciones", label: "Reservaciones", icon: "📅" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, closeSidebar } = useAdmin()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/admin" className="block" onClick={closeSidebar}>
              <h1 className="font-serif text-xl font-bold text-red-400">
                Restaurante
              </h1>
              <p className="text-gray-400 text-sm">Panel de Administración</p>
            </Link>
          </div>

          <nav className="flex-1 mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    flex items-center gap-3 px-6 py-3 text-sm
                    transition-colors
                    ${isActive
                      ? "bg-red-600 text-white"
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

          <div className="p-4 border-t border-gray-800">
            <Link
              href="/"
              onClick={closeSidebar}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <span>←</span>
              Volver al sitio
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
