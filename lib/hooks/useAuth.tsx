"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getFromStorage, setToStorage, removeFromStorage } from '@/lib/utils'
import { User } from '@/lib/types'

interface AuthUser extends User {
  accessToken: string
  refreshToken: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (data: { name: string; email: string; password: string }) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const initializeAuth = () => {
      try {
        const storedUser = getFromStorage('user')
        const storedToken = getFromStorage('authToken')

        if (storedUser && storedToken) {
          setUser({
            ...storedUser,
            accessToken: storedToken,
            refreshToken: getFromStorage('refreshToken') || ''
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear corrupted auth data
        removeFromStorage('user')
        removeFromStorage('authToken')
        removeFromStorage('refreshToken')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const { data } = await response.json()
      const { user: userData, tokens } = data

      const authUser: AuthUser = {
        ...userData,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }

      // Store auth data
      setToStorage('user', userData)
      setToStorage('authToken', tokens.accessToken)
      setToStorage('refreshToken', tokens.refreshToken)

      setUser(authUser)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const { data: responseData } = await response.json()
      const { user: userData, tokens } = responseData

      const authUser: AuthUser = {
        ...userData,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }

      // Store auth data
      setToStorage('user', userData)
      setToStorage('authToken', tokens.accessToken)
      setToStorage('refreshToken', tokens.refreshToken)

      setUser(authUser)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    try {
      // TODO: Call logout API endpoint
      fetch('/api/auth', { method: 'DELETE' }).catch(console.error)

      // Clear auth data
      removeFromStorage('user')
      removeFromStorage('authToken')
      removeFromStorage('refreshToken')

      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)

      // Update stored user data (exclude tokens)
      const { accessToken, refreshToken, ...userDataOnly } = updatedUser
      setToStorage('user', userDataOnly)
    }
  }

  const refreshToken = async () => {
    try {
      if (!user?.refreshToken) {
        throw new Error('No refresh token available')
      }

      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const { data } = await response.json()
      const { tokens } = data

      const updatedUser = {
        ...user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }

      // Update stored tokens
      setToStorage('authToken', tokens.accessToken)
      setToStorage('refreshToken', tokens.refreshToken)

      setUser(updatedUser)
    } catch (error) {
      console.error('Token refresh error:', error)
      // Force logout on refresh failure
      logout()
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// HOC for protecting routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      // Redirect to login - in a real app, you might use Next.js redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return null
    }

    return <Component {...props} />
  }

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`
  return AuthenticatedComponent
}

// Hook for checking if user has specific permissions
export function usePermissions() {
  const { user } = useAuth()

  const hasPermission = (permission: string) => {
    // TODO: Implement actual permission checking logic
    // For now, return true for authenticated users
    return !!user
  }

  const hasRole = (role: string) => {
    // TODO: Implement role-based checking
    return !!user
  }

  return {
    hasPermission,
    hasRole
  }
}
