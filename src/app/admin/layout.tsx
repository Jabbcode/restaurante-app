import { ToastProvider } from "@/components/ui/Toast"
import { AdminProvider } from "@/components/admin/AdminContext"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"
import PublicHeader from "@/components/layout/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <AdminProvider>
        <PublicHeader />
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col lg:ml-0">
            <Header />
            <main className="flex-1 p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </AdminProvider>
    </ToastProvider>
  )
}
