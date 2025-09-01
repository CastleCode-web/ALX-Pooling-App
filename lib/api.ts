"use client"

import { ApiResponse, PaginatedResponse, ApiError } from './types'

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const DEFAULT_TIMEOUT = 10000 // 10 seconds

interface RequestConfig extends RequestInit {
  timeout?: number
  retry?: number
  retryDelay?: number
}

interface ApiClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  interceptors?: {
    request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
    response?: (response: Response) => Response | Promise<Response>
    error?: (error: ApiError) => ApiError | Promise<ApiError>
  }
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number
  private interceptors: ApiClientConfig['interceptors']

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL || API_BASE_URL
    this.defaultTimeout = config.timeout || DEFAULT_TIMEOUT
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    }
    this.interceptors = config.interceptors
  }

  private async makeRequest<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retry = 3,
      retryDelay = 1000,
      headers = {},
      ...restConfig
    } = config

    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`

    let requestConfig: RequestConfig = {
      ...restConfig,
      headers: {
        ...this.defaultHeaders,
        ...headers
      }
    }

    // Apply request interceptor
    if (this.interceptors?.request) {
      requestConfig = await this.interceptors.request(requestConfig)
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    let lastError: Error

    for (let attempt = 0; attempt <= retry; attempt++) {
      try {
        const response = await fetch(url, {
          ...requestConfig,
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        // Apply response interceptor
        let processedResponse = response
        if (this.interceptors?.response) {
          processedResponse = await this.interceptors.response(response)
        }

        if (!processedResponse.ok) {
          const errorData = await this.parseErrorResponse(processedResponse)
          const apiError = new Error(errorData.message || `HTTP ${processedResponse.status}`) as ApiError
          apiError.statusCode = processedResponse.status
          apiError.code = errorData.code || 'HTTP_ERROR'
          apiError.details = errorData.details

          // Apply error interceptor
          if (this.interceptors?.error) {
            throw await this.interceptors.error(apiError)
          }

          throw apiError
        }

        return await this.parseResponse<T>(processedResponse)
      } catch (error) {
        lastError = error as Error

        // Don't retry on client errors (4xx) or abort errors
        if (
          error instanceof Error &&
          (error.name === 'AbortError' ||
           (error as ApiError).statusCode >= 400 && (error as ApiError).statusCode < 500)
        ) {
          throw error
        }

        // Wait before retry
        if (attempt < retry) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)))
        }
      }
    }

    throw lastError!
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      return response.json()
    }

    if (contentType?.includes('text/')) {
      return response.text() as T
    }

    return response.arrayBuffer() as T
  }

  private async parseErrorResponse(response: Response): Promise<Partial<ApiError>> {
    try {
      const contentType = response.headers.get('content-type')

      if (contentType?.includes('application/json')) {
        return await response.json()
      }

      return { message: await response.text() }
    } catch {
      return { message: `HTTP ${response.status} ${response.statusText}` }
    }
  }

  // HTTP Methods
  async get<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // Utility methods
  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.defaultHeaders.Authorization
  }

  setHeader(key: string, value: string) {
    this.defaultHeaders[key] = value
  }

  removeHeader(key: string) {
    delete this.defaultHeaders[key]
  }
}

// Create default API client instance
export const apiClient = new ApiClient({
  interceptors: {
    request: async (config) => {
      // Add auth token if available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken')
        if (token && !config.headers?.Authorization) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        }
      }
      return config
    },
    error: async (error) => {
      // Handle 401 errors (unauthorized)
      if (error.statusCode === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
      return error
    }
  }
})

// Helper functions for common API patterns
export async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error

  for (let i = 0; i <= retries; i++) {
    try {
      return await fetcher()
    } catch (error) {
      lastError = error as Error

      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }

  throw lastError!
}

export function createQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)))
      } else {
        searchParams.set(key, String(value))
      }
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// API response handlers
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || 'API request failed')
  }
  return response.data
}

export function handlePaginatedResponse<T>(
  response: PaginatedResponse<T>
): PaginatedResponse<T> {
  return response
}

// Error handling utilities
export function isApiError(error: any): error is ApiError {
  return error instanceof Error && 'statusCode' in error && 'code' in error
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

// Specific API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth', credentials),

  register: (data: { name: string; email: string; password: string }) =>
    apiClient.put('/auth', data),

  logout: () =>
    apiClient.delete('/auth'),

  refreshToken: () =>
    apiClient.post('/auth/refresh'),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post('/auth/reset-password', { token, password })
}

export const pollsApi = {
  getPolls: (params?: {
    page?: number
    limit?: number
    category?: string
    status?: string
    search?: string
    sortBy?: string
  }) =>
    apiClient.get(`/polls${createQueryString(params || {})}`),

  getPoll: (id: string) =>
    apiClient.get(`/polls/${id}`),

  createPoll: (data: any) =>
    apiClient.post('/polls', data),

  updatePoll: (id: string, data: any) =>
    apiClient.patch(`/polls/${id}`, data),

  deletePoll: (id: string) =>
    apiClient.delete(`/polls/${id}`),

  votePoll: (id: string, optionIds: string[]) =>
    apiClient.post(`/polls/${id}/vote`, { optionIds }),

  getComments: (pollId: string, params?: { page?: number; limit?: number }) =>
    apiClient.get(`/polls/${pollId}/comments${createQueryString(params || {})}`),

  createComment: (pollId: string, data: { content: string; parentId?: string }) =>
    apiClient.post(`/polls/${pollId}/comments`, data),

  updateComment: (pollId: string, commentId: string, data: { content: string }) =>
    apiClient.patch(`/polls/${pollId}/comments/${commentId}`, data),

  deleteComment: (pollId: string, commentId: string) =>
    apiClient.delete(`/polls/${pollId}/comments/${commentId}`)
}

export const userApi = {
  getProfile: () =>
    apiClient.get('/user/profile'),

  updateProfile: (data: any) =>
    apiClient.patch('/user/profile', data),

  getSettings: () =>
    apiClient.get('/user/settings'),

  updateSettings: (data: any) =>
    apiClient.patch('/user/settings', data),

  getDashboard: () =>
    apiClient.get('/user/dashboard'),

  getAnalytics: (params?: { timeRange?: string }) =>
    apiClient.get(`/user/analytics${createQueryString(params || {})}`),

  exportData: () =>
    apiClient.get('/user/export'),

  deleteAccount: () =>
    apiClient.delete('/user/account')
}

export default apiClient
