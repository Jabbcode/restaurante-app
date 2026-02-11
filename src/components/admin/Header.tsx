"use client"

import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800">
            Bienvenido, {session?.user?.name || "Admin"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {session?.user?.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}
