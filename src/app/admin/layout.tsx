import SessionProvider from "@/components/providers/SessionProvider"
import { ToastProvider } from "@/components/ui/Toast"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ToastProvider>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </SessionProvider>
  )
}
