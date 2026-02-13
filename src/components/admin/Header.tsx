"use client"

import { useSession, signOut } from "next-auth/react"
import { useAdmin } from "./AdminContext"
import GlobalSearch from "./GlobalSearch"

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
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:block">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">
              Bienvenido, {session?.user?.name || "Admin"}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <GlobalSearch />
          <span className="hidden lg:inline text-sm text-gray-500">
            {session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 hover:bg-gray-100 rounded-lg"
          >
            <span className="hidden sm:inline">Cerrar Sesión</span>
            <span className="sm:hidden">Salir</span>
          </button>
        </div>
      </div>
    </header>
  )
}
