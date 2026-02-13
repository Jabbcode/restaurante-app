"use client"

import { useSession, signOut } from "next-auth/react"
import { useAdmin } from "./AdminContext"
import GlobalSearch from "./GlobalSearch"
import NotificationBell from "./NotificationBell"
import { Menu, LogOut } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()
  const { toggleSidebar } = useAdmin()

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">
              Bienvenido, {session?.user?.name || "Admin"}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <GlobalSearch />
          <NotificationBell />
          <span className="hidden lg:inline text-sm text-gray-500">
            {session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesion</span>
          </button>
        </div>
      </div>
    </header>
  )
}
