import { NavigationMenu } from "@/components/layout/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
