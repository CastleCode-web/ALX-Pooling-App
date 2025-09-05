"use client"

import { useAuth } from "@/lib/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session, router])

  if (session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ALX Polly
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and participate in polls
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
